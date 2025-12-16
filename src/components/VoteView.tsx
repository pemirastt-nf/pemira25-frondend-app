/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import { CheckCircle2, Loader2, Mail, Lock, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { OtpInput } from "@/components/ui/otp-input";
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog";

interface Candidate {
     id: number | string;
     name: string;
     photoUrl: string;
     orderNumber: number;
     vision: string;
     mission: string;
}

type AuthStage = 'check_auth' | 'email_input' | 'otp_input' | 'manual_otp' | 'voting' | 'voted';

export default function VoteView({ initialCandidates }: { initialCandidates: Candidate[] }) {
     const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
     const [selectedId, setSelectedId] = useState<number | string | null>(null);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [error, setError] = useState("");
     const router = useRouter();

     const [authStage, setAuthStage] = useState<AuthStage>('check_auth');
     const [email, setEmail] = useState("");
     const [otp, setOtp] = useState("");
     const [viewCandidate, setViewCandidate] = useState<Candidate | null>(null);

     useEffect(() => {
          const savedState = sessionStorage.getItem("voting_state");
          if (savedState) {
               const { stage, savedEmail } = JSON.parse(savedState);
               if (stage === 'otp_input' && savedEmail) {
                    setAuthStage('otp_input');
                    setEmail(savedEmail);
               }
          }
          checkAuth();
     }, []);

     const checkAuth = async () => {
          const token = localStorage.getItem("token");
          if (!token) {
               const savedState = sessionStorage.getItem("voting_state");
               if (!savedState) {
                    setAuthStage('email_input');
               }
               return;
          }

          try {
               const status = await api.getVoteStatus(token);
               if (status.hasVoted) {
                    setAuthStage('voted');
                    sessionStorage.removeItem("voting_state");
               } else {
                    if (candidates.length === 0) {
                         const data = await api.getCandidates();
                         setCandidates(data);
                    }
                    setAuthStage('voting');
                    sessionStorage.removeItem("voting_state");
               }
          } catch (err) {
               console.error(err);
               localStorage.removeItem("token");
               sessionStorage.removeItem("voting_state");
               setAuthStage('email_input');
          }
     };

     const handleRequestOtp = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsSubmitting(true);
          setError("");
          try {
               const res = await api.requestOtp(email);
               if (res.devOtp) {
                    console.log("DEV OTP:", res.devOtp);
                    alert(`DEV OTP: ${res.devOtp}`);
               }

               setAuthStage('otp_input');
               sessionStorage.setItem("voting_state", JSON.stringify({
                    stage: 'otp_input',
                    savedEmail: email
               }));

          } catch (err: any) {
               setError(err.message || "Gagal mengirim OTP");
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleVerifyOtp = async (e?: React.FormEvent, otpValue?: string) => {
          if (e) e.preventDefault();
          const tokenToVerify = otpValue || otp;
          if (!tokenToVerify || tokenToVerify.length !== 6) return;

          setIsSubmitting(true);
          setError("");
          try {
               const res = await api.verifyOtp(email, tokenToVerify);
               localStorage.setItem("token", res.token);

               sessionStorage.removeItem("voting_state");

               if (res.user.has_voted) {
                    setAuthStage('voted');
               } else {
                    if (candidates.length === 0) {
                         const data = await api.getCandidates();
                         setCandidates(data);
                    }
                    setAuthStage('voting');
               }
          } catch (err: any) {
               setError(err.message || "OTP Salah atau Kadaluarsa");
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleVote = async () => {
          if (!selectedId) return;

          setIsSubmitting(true);
          try {
               const token = localStorage.getItem("token");
               if (!token) throw new Error("Sesi habis, silakan login ulang");

               await api.vote(selectedId.toString(), token);
               setAuthStage('voted');
          } catch (err: any) {
               alert(err.message || "Gagal memilih");
               if (err.message?.includes('jwt') || err.message?.includes('token')) {
                    localStorage.removeItem("token");
                    setAuthStage('email_input');
               }
          } finally {
               setIsSubmitting(false);
          }
     };

     if (authStage === 'check_auth') {
          return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>;
     }

     if (authStage === 'voted') {
          return (
               <div className="container mx-auto px-4 py-24 text-center min-h-[60vh] flex items-center justify-center">
                    <motion.div
                         initial={{ scale: 0.8, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         className="max-w-md w-full bg-surface p-10 rounded-3xl shadow-2xl shadow-blue-100 border border-blue-50"
                    >
                         <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                              <CheckCircle2 className="h-12 w-12" />
                         </div>
                         <h2 className="text-3xl font-bold mb-4 text-slate-900">Terima Kasih!</h2>
                         <p className="text-neutral-slate mb-10 text-lg">
                              Suara anda telah berhasil direkam. Terima kasih telah berpartisipasi dalam PEMIRA STTNF 2025.
                         </p>
                         <Button onClick={() => window.location.href = "/"} className="w-full h-12 text-lg rounded-full bg-primary hover:bg-primary-light">
                              Kembali ke Beranda
                         </Button>
                    </motion.div>
               </div>
          );
     }

     if (authStage === 'email_input') {
          return (
               <div className="container mx-auto px-4 py-32 flex items-center justify-center min-h-[80vh]">
                    <Card className="max-w-md w-full p-8 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-sm border-blue-50">
                         <div className="text-center mb-8">
                              <h1 className="text-2xl font-bold text-slate-900 mb-2">Masuk untuk Memilih</h1>
                              <p className="text-slate-500">Masukkan email yang terdaftar di sistem.</p>
                         </div>

                         <form onSubmit={handleRequestOtp} className="space-y-6">
                              <div className="space-y-2">
                                   <label className="text-sm font-medium text-slate-700 ml-1">Email</label>
                                   <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        <input
                                             type="email"
                                             placeholder="nim@student.nurulfikri.ac.id"
                                             pattern=".+@student\.nurulfikri\.ac\.id"
                                             title="Gunakan email mahasiswa (@student.nurulfikri.ac.id)"
                                             required
                                             className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                             value={email}
                                             onChange={(e) => setEmail(e.target.value)}
                                        />
                                   </div>
                              </div>

                              {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</p>}

                              <Button type="submit" className="w-full h-12 text-lg rounded-xl bg-primary hover:bg-primary-light" disabled={isSubmitting}>
                                   {isSubmitting ? <Loader2 className="animate-spin" /> : "Kirim Kode OTP"}
                              </Button>

                              <div className="relative">
                                   <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-slate-200" />
                                   </div>
                                   <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-2 text-slate-500">Atau</span>
                                   </div>
                              </div>

                              <Button
                                   type="button"
                                   variant="outline"
                                   className="w-full h-12 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                                   onClick={() => {
                                        setAuthStage('manual_otp');
                                        setError("");
                                   }}
                              >
                                   Sudah punya kode OTP?
                              </Button>
                         </form>
                    </Card>
               </div>
          );
     }

     if (authStage === 'otp_input') {
          return (
               <div className="container mx-auto px-4 py-32 flex items-center justify-center min-h-[80vh]">
                    <Card className="max-w-md w-full p-8 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-sm border-blue-50">
                         <div className="text-center mb-8">
                              <h1 className="text-2xl font-bold text-slate-900 mb-2">Verifikasi OTP</h1>
                              <p className="text-slate-500 mb-2">Masukkan kode OTP yang dikirim ke <span className="font-semibold text-primary">{email}</span></p>
                              <p className="text-xs text-slate-400 italic">Periksa folder Inbox atau Spam/Junk jika email tidak masuk.</p>
                         </div>

                         <div className="space-y-8">
                              <div className="flex justify-center">
                                   <OtpInput
                                        length={6}
                                        value={otp}
                                        onChange={(val) => {
                                             setOtp(val);
                                             if (error) setError("");
                                        }}
                                        onComplete={(val) => {
                                             handleVerifyOtp(undefined, val);
                                        }}
                                        disabled={isSubmitting}
                                   />
                              </div>

                              {isSubmitting && (
                                   <div className="flex justify-center text-primary animate-pulse">
                                        <Loader2 className="animate-spin mr-2" /> Verifikasi...
                                   </div>
                              )}

                              {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</p>}

                              <div className="flex flex-col gap-3">
                                   <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => {
                                             setAuthStage('email_input');
                                             sessionStorage.removeItem("voting_state");
                                        }}
                                        className="w-full text-slate-500 hover:text-slate-800"
                                   >
                                        Ganti Email
                                   </Button>
                              </div>
                         </div>
                    </Card>
               </div>
          );
     }

     if (authStage === 'manual_otp') {
          return (
               <div className="container mx-auto px-4 py-32 flex items-center justify-center min-h-[80vh]">
                    <Card className="max-w-md w-full p-8 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-sm border-blue-50">
                         <div className="text-center mb-8">
                              <h1 className="text-2xl font-bold text-slate-900 mb-2">Verifikasi Manual</h1>
                              <p className="text-slate-500">Masukkan email dan kode OTP yang anda miliki.</p>
                         </div>

                         <div className="space-y-6">
                              <div className="space-y-2">
                                   <label className="text-sm font-medium text-slate-700 ml-1">Email</label>
                                   <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        <input
                                             type="email"
                                             placeholder="nim@student.nurulfikri.ac.id"
                                             required
                                             className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                             value={email}
                                             onChange={(e) => setEmail(e.target.value)}
                                        />
                                   </div>
                              </div>

                              <div className="space-y-2">
                                   <label className="text-sm font-medium text-slate-700 ml-1">Kode OTP</label>
                                   <div className="flex justify-center">
                                        <OtpInput
                                             length={6}
                                             value={otp}
                                             onChange={(val) => {
                                                  setOtp(val);
                                                  if (error) setError("");
                                             }}
                                             onComplete={(val) => {
                                             }}
                                             disabled={isSubmitting}
                                        />
                                   </div>
                              </div>

                              {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</p>}

                              <Button
                                   onClick={(e) => handleVerifyOtp(e)}
                                   className="w-full h-12 text-lg rounded-xl bg-primary hover:bg-primary-light"
                                   disabled={isSubmitting || !email || otp.length !== 6}
                              >
                                   {isSubmitting ? <Loader2 className="animate-spin" /> : "Verifikasi"}
                              </Button>

                              <Button
                                   type="button"
                                   variant="ghost"
                                   className="w-full h-12 rounded-xl text-slate-600 hover:bg-slate-50"
                                   onClick={() => {
                                        setAuthStage('email_input');
                                        setError("");
                                   }}
                              >
                                   Kembali
                              </Button>
                         </div>
                    </Card>
               </div>
          );
     }

     return (
          <div className="container mx-auto px-4 py-6 pb-20 md:py-10 md:pb-32">
               <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
               >
                    <h1 className="text-2xl md:text-4xl font-bold mb-2 text-slate-900">Bilik Suara Digital</h1>
                    <p className="text-neutral-slate text-lg">
                         Silakan pilih salah satu pasangan calon di bawah ini.
                    </p>
               </motion.div>

               <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-5xl mx-auto mb-12">
                    {candidates.map((candidate) => (
                         <motion.div
                              key={candidate.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setSelectedId(candidate.id)}
                              className={cn(
                                   "w-full max-w-[320px] cursor-pointer transition-all duration-300 relative",
                                   selectedId === candidate.id ? "ring-4 ring-primary ring-offset-4 rounded-2xl" : "opacity-80 hover:opacity-100"
                              )}
                         >
                              <Card className="overflow-hidden h-full border-none shadow-xl shadow-slate-200/50 rounded-2xl bg-surface group">
                                   <div className="relative aspect-4/5 bg-neutral-cream w-full overflow-hidden">
                                        <Image
                                             src={candidate.photoUrl || "https://placehold.co/800x1000/png"}
                                             alt={candidate.name}
                                             fill
                                             className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        {/* Order Number Badge */}
                                        <div className="absolute top-4 left-4 z-20">
                                             <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-primary font-bold text-xl border border-white/50">
                                                  {candidate.orderNumber}
                                             </div>
                                        </div>

                                        {/* Gradient & Names Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-5 pt-24 text-white">
                                             <div className="flex justify-between items-end gap-4">
                                                  <div className="text-left flex-1 min-w-0">
                                                       <p className="text-white/80 text-[10px] uppercase font-medium mb-0.5">Ketua</p>
                                                       <p className="font-bold text-sm leading-tight truncate">
                                                            {candidate.name.split('&')[0]?.trim() || candidate.name}
                                                       </p>
                                                  </div>
                                                  {candidate.name.includes('&') && (
                                                       <div className="text-right flex-1 min-w-0">
                                                            <p className="text-white/80 text-[10px] uppercase font-medium mb-0.5">Wakil</p>
                                                            <p className="font-bold text-sm leading-tight truncate">
                                                                 {candidate.name.split('&')[1]?.trim()}
                                                            </p>
                                                       </div>
                                                  )}
                                             </div>
                                        </div>
                                   </div>

                                   {selectedId === candidate.id && (
                                        <motion.div
                                             initial={{ opacity: 0, scale: 0.5 }}
                                             animate={{ opacity: 1, scale: 1 }}
                                             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-primary text-white p-4 rounded-full shadow-2xl ring-4 ring-white/50"
                                        >
                                             <CheckCircle2 className="h-8 w-8" />
                                        </motion.div>
                                   )}

                                   <Button
                                        variant="secondary"
                                        size="icon"
                                        className="absolute top-4 right-4 z-20 rounded-full shadow-lg shadow-black/20 hover:scale-110 transition-transform bg-white text-primary hover:bg-slate-50 border border-slate-100"
                                        onClick={(e) => {
                                             e.stopPropagation();
                                             setViewCandidate(candidate);
                                        }}
                                   >
                                        <Info className="h-6 w-6" />
                                   </Button>
                              </Card>
                         </motion.div>
                    ))}
               </div>

               <AnimatePresence>
                    {selectedId && (
                         <motion.div
                              initial={{ y: 100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: 100, opacity: 0 }}
                              className="fixed bottom-8 left-0 right-0 px-4 z-40"
                         >
                              <div className="container mx-auto max-w-xl bg-white/90 backdrop-blur-md p-4 rounded-full shadow-2xl border border-blue-100 flex items-center justify-between pl-8">
                                   <div className="text-sm font-medium text-slate-600">
                                        Pilihan Anda: <span className="font-bold text-primary">No. {candidates.find(c => c.id === selectedId)?.orderNumber}</span>
                                   </div>
                                   <Button
                                        size="lg"
                                        disabled={isSubmitting}
                                        onClick={handleVote}
                                        className="min-w-35 rounded-full bg-primary hover:bg-primary-light h-12"
                                   >
                                        {isSubmitting ? (
                                             <>
                                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                  Mengirim...
                                             </>
                                        ) : (
                                             "Kirim Suara"
                                        )}
                                   </Button>
                              </div>
                         </motion.div>
                    )}
               </AnimatePresence>

               <Dialog open={!!viewCandidate} onOpenChange={(open) => !open && setViewCandidate(null)}>
                    <DialogContent aria-description="" className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white p-0 overflow-hidden rounded-2xl">
                         <div className="grid md:grid-cols-2 h-full">
                              {/* Left Column: Image & Basic Info */}
                              <div className="relative bg-neutral-100 md:h-full h-87.5 md:min-h-100">
                                   <Image
                                        src={viewCandidate?.photoUrl || "https://placehold.co/800x1000/png"}
                                        alt={viewCandidate?.name || "Candidate"}
                                        fill
                                        className="object-cover"
                                   />
                                   <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8 text-white">
                                        <div className="inline-block self-start px-3 py-1 bg-primary rounded-full text-xs font-bold mb-4 shadow-lg border border-white/20">
                                             Kandidat No. {viewCandidate?.orderNumber}
                                        </div>

                                        <div className="flex justify-between items-end gap-4 border-t border-white/20 pt-4">
                                             <div className="text-left flex-1 min-w-0">
                                                  <p className="text-white/80 text-xs uppercase font-medium mb-1">Ketua</p>
                                                  <h2 className="text-xl font-bold leading-tight shadow-black drop-shadow-md">
                                                       {viewCandidate?.name.split('&')[0]?.trim() || viewCandidate?.name}
                                                  </h2>
                                             </div>
                                             {viewCandidate?.name.includes('&') && (
                                                  <div className="text-right flex-1 min-w-0">
                                                       <p className="text-white/80 text-xs uppercase font-medium mb-1">Wakil</p>
                                                       <h2 className="text-xl font-bold leading-tight shadow-black drop-shadow-md">
                                                            {viewCandidate?.name.split('&')[1]?.trim()}
                                                       </h2>
                                                  </div>
                                             )}
                                        </div>
                                   </div>
                              </div>

                              {/* Right Column: Visi Misi */}
                              <div className="p-8 flex flex-col h-full overflow-y-auto max-h-[60vh] md:max-h-[85vh]">
                                   <DialogHeader className="mb-6">
                                        <DialogTitle className="text-2xl font-bold text-slate-900 border-b pb-4">
                                             Visi & Misi
                                        </DialogTitle>
                                   </DialogHeader>

                                   <div className="space-y-6 grow">
                                        <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                                             <h4 className="font-bold text-primary mb-3 flex items-center gap-2 text-lg">
                                                  <span className="p-1.5 bg-white rounded-lg shadow-sm"><CheckCircle2 className="w-4 h-4 text-primary" /></span>
                                                  Visi
                                             </h4>
                                             <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                                                  {viewCandidate?.vision}
                                             </p>
                                        </div>

                                        <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-100">
                                             <h4 className="font-bold text-secondary mb-3 flex items-center gap-2 text-lg">
                                                  <span className="p-1.5 bg-white rounded-lg shadow-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /></span>
                                                  Misi
                                             </h4>
                                             <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                                                  {viewCandidate?.mission}
                                             </p>
                                        </div>
                                   </div>

                                   <div className="pt-8 mt-auto sticky bottom-0 bg-white">
                                        <Button
                                             onClick={() => {
                                                  if (viewCandidate) {
                                                       setSelectedId(viewCandidate.id);
                                                       setViewCandidate(null);
                                                  }
                                             }}
                                             className="w-full h-12 text-lg rounded-xl font-bold bg-primary hover:bg-primary-light shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
                                        >
                                             Pilih Kandidat Ini
                                        </Button>
                                   </div>
                              </div>
                         </div>
                    </DialogContent>
               </Dialog>
          </div >
     );
}
