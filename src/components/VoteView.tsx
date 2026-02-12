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
import { storage } from "@/lib/storage";
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
     DialogClose,
} from "@/components/ui/dialog";
import {
     AlertDialog,
     AlertDialogAction,
     AlertDialogCancel,
     AlertDialogContent,
     AlertDialogDescription,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogTitle,
     AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CheckCircle, Rocket } from "lucide-react";

interface Candidate {
     id: number | string;
     name: string;
     photoUrl: string;
     orderNumber: number;
     vision: string;
     mission: string;
     programs?: string[];
}

type AuthStage = 'check_auth' | 'email_input' | 'otp_input' | 'manual_otp' | 'voting' | 'voted';

export default function VoteView({ initialCandidates }: { initialCandidates: Candidate[] }) {
     const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
     const [selectedId, setSelectedId] = useState<number | string | null>(null);
     const [viewCandidate, setViewCandidate] = useState<Candidate | null>(null);
     const [showConfirmation, setShowConfirmation] = useState(false);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [error, setError] = useState("");
     const router = useRouter();

     const [authStage, setAuthStage] = useState<AuthStage>('check_auth');
     const [email, setEmail] = useState("");
     const [otp, setOtp] = useState("");

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
          const token = storage.getItem("token");
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
               storage.setItem("token", res.token);

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
               const token = storage.getItem("token");
               if (!token) throw new Error("Sesi habis, silakan login ulang");

               await api.vote(selectedId.toString(), token);
               setShowConfirmation(false);
               setAuthStage('voted');
          } catch (err: any) {
               alert(err.message || "Gagal memilih");
               setShowConfirmation(false);
               if (err.message?.includes('jwt') || err.message?.includes('token')) {
                    storage.removeItem("token");
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
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center min-h-[60vh] flex items-center justify-center">
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
                              Suara anda telah berhasil direkam. Terima kasih telah berpartisipasi dalam <span className="font-bold">PEMIRA IM STTNF 2025</span>.
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
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex items-center justify-center min-h-[80vh]">
                    <div className="max-w-md w-full bg-white border-4 border-black neo-shadow-lg p-8 relative">
                         {/* Decorative Corner */}
                         <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent-blue border-2 border-black z-10"></div>

                         <div className="text-center mb-8">
                              <h1 className="text-3xl font-heading uppercase mb-2">Login Pemilih</h1>
                              <div className="h-1 w-20 bg-black mx-auto mb-4"></div>
                              <p className="font-mono text-sm">Masuk untuk menggunakan hak suara anda.</p>
                         </div>

                         <form onSubmit={handleRequestOtp} className="space-y-6">
                              <div className="space-y-2">
                                   <label className="font-bold font-mono uppercase text-sm border-l-4 border-primary pl-2">Email Student</label>
                                   <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black" />
                                        <input
                                             type="email"
                                             placeholder="nim@student.nurulfikri.ac.id"
                                             pattern=".+@student\.nurulfikri\.ac\.id"
                                             title="Gunakan email mahasiswa (emailkamu@student.nurulfikri.ac.id)"
                                             required
                                             className="w-full h-12 pl-12 pr-4 border-2 border-black neo-shadow-sm focus:bg-blue-50 outline-none font-mono text-sm transition-all placeholder:text-gray-500"
                                             value={email}
                                             onChange={(e) => setEmail(e.target.value)}
                                        />
                                   </div>
                              </div>

                              {error && (
                                   <div className="bg-red-100 border-2 border-black p-3 text-red-600 font-bold font-mono text-sm text-center">
                                        ⚠️ {error}
                                   </div>
                              )}

                              <Button type="submit" className="w-full h-14 neo-button hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none text-lg" disabled={isSubmitting}>
                                   {isSubmitting ? <Loader2 className="animate-spin" /> : "KIRIM KODE OTP"}
                              </Button>

                              <div className="relative py-2">
                                   <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t-2 border-black border-dashed" />
                                   </div>
                                   <div className="relative flex justify-center text-xs uppercase font-bold">
                                        <span className="bg-white px-2 border-2 border-black">Atau</span>
                                   </div>
                              </div>

                              <Button
                                   type="button"
                                   variant="ghost"
                                   className="w-full h-12 font-mono font-bold border-2 border-black hover:bg-neutral-cream rounded-none"
                                   onClick={() => {
                                        setAuthStage('manual_otp');
                                        setError("");
                                   }}
                              >
                                   SUDAH PUNYA KODE?
                              </Button>
                         </form>
                    </div>
               </div>
          );
     }

     if (authStage === 'otp_input') {
          return (
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex items-center justify-center min-h-[80vh]">
                    <div className="max-w-md w-full bg-white border-4 border-black neo-shadow-lg p-8 relative">
                         <div className="text-center mb-8">
                              <h1 className="text-3xl font-heading uppercase mb-2">Verifikasi OTP</h1>
                              <p className="font-mono text-sm mb-4">
                                   Kode dikirim ke: <br />
                                   <span className="font-bold bg-accent-blue/20 px-1">{email}</span>
                              </p>
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
                                   <div className="bg-black text-white p-2 text-center font-mono font-bold animate-pulse">
                                        MEMERIKSA KODE...
                                   </div>
                              )}

                              {error && (
                                   <div className="bg-red-100 border-2 border-black p-3 text-red-600 font-bold font-mono text-sm text-center">
                                        ⚠️ {error}
                                   </div>
                              )}

                              <Button
                                   type="button"
                                   variant="ghost"
                                   onClick={() => {
                                        setAuthStage('email_input');
                                        sessionStorage.removeItem("voting_state");
                                   }}
                                   className="w-full font-mono font-bold underline hover:bg-transparent hover:text-primary"
                              >
                                   &lt; GANTI EMAIL
                              </Button>
                         </div>
                    </div>
               </div>
          );
     }

     if (authStage === 'manual_otp') {
          return (
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex items-center justify-center min-h-[80vh]">
                    <div className="max-w-md w-full bg-white border-4 border-black neo-shadow-lg p-8 relative">
                         <div className="text-center mb-8">
                              <h1 className="text-3xl font-heading uppercase mb-2">INPUT MANUAL</h1>
                              <p className="font-mono text-sm">Masukkan kredensial anda secara manual.</p>
                         </div>

                         <div className="space-y-6">
                              <div className="space-y-2">
                                   <label className="font-bold font-mono uppercase text-sm border-l-4 border-primary pl-2">Email</label>
                                   <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black" />
                                        <input
                                             type="email"
                                             placeholder="email@student.nurulfikri.ac.id"
                                             required
                                             className="w-full h-12 pl-12 pr-4 border-2 border-black neo-shadow-sm focus:bg-yellow-50 outline-none font-mono text-sm transition-all"
                                             value={email}
                                             onChange={(e) => setEmail(e.target.value)}
                                        />
                                   </div>
                              </div>

                              <div className="space-y-2">
                                   <label className="font-bold font-mono uppercase text-sm border-l-4 border-primary pl-2">Kode OTP</label>
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

                              {error && (
                                   <div className="bg-red-100 border-2 border-black p-3 text-red-600 font-bold font-mono text-sm text-center">
                                        ⚠️ {error}
                                   </div>
                              )}

                              <Button
                                   onClick={(e) => handleVerifyOtp(e)}
                                   className="w-full h-14 neo-button hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none text-lg"
                                   disabled={isSubmitting || !email || otp.length !== 6}
                              >
                                   {isSubmitting ? <Loader2 className="animate-spin" /> : "VERIFIKASI MASUK"}
                              </Button>

                              <Button
                                   type="button"
                                   variant="ghost"
                                   className="w-full font-mono font-bold border-2 border-black hover:bg-neutral-cream rounded-none mt-2"
                                   onClick={() => {
                                        setAuthStage('email_input');
                                        setError("");
                                   }}
                              >
                                   KEMBALI
                              </Button>
                         </div>
                    </div>
               </div>
          );
     }

     return (
          <div className="py-8 md:py-12 pb-20 bg-neutral-cream min-h-screen">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                         <div className="inline-block bg-black text-white px-4 py-1 font-mono font-bold text-sm mb-4 transform -rotate-2">
                              PEMIRA 2025
                         </div>
                         <h1 className="text-5xl md:text-6xl font-heading uppercase mb-4 text-stroke-black text-center">
                              KERTAS SUARA
                         </h1>
                         <p className="font-mono max-w-2xl mx-auto">
                              Silakan tentukan pilihan anda dengan bijak. Satu suara menentukan masa depan.
                         </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-6xl mx-auto mb-16">
                         {candidates.map((candidate) => (
                              <div
                                   key={candidate.id}
                                   className="group relative bg-white border-4 border-black neo-shadow-lg hover:-translate-y-2 hover:neo-shadow-xl transition-all duration-300 flex flex-col w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)]"
                              >
                                   {/* Number Badge */}
                                   <div className="absolute -top-6 -left-6 w-16 h-16 bg-black text-white border-4 border-white neo-shadow-sm flex items-center justify-center z-10 transform -rotate-6 group-hover:rotate-0 transition-transform">
                                        <span className="font-heading text-3xl">{candidate.orderNumber}</span>
                                   </div>

                                   {/* Image */}
                                   <div className="relative aspect-4/5 w-full border-b-4 border-black overflow-hidden bg-gray-100">
                                        <Image
                                             src={candidate.photoUrl || "https://placehold.co/800x1000/png"}
                                             alt={candidate.name}
                                             fill
                                             className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-primary-light/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                   </div>

                                   {/* Content */}
                                   <div className="p-6 flex flex-col grow text-center">
                                        <h3 className="text-2xl font-heading uppercase leading-tight mb-2 min-h-14 flex items-center justify-center">
                                             {candidate.name.split('&')[0]?.trim()}
                                             {candidate.name.includes('&') && (
                                                  <>
                                                       <span className="text-primary mx-2">&</span>
                                                       {candidate.name.split('&')[1]?.trim()}
                                                  </>
                                             )}
                                        </h3>

                                        <div className="mt-auto space-y-3 pt-6">
                                             <Button
                                                  variant="outline"
                                                  className="w-full h-12 font-mono font-bold border-2 border-black hover:bg-neutral-cream rounded-none text-xs tracking-wider"
                                                  onClick={() => setViewCandidate(candidate)}
                                             >
                                                  LIHAT VISI & MISI
                                             </Button>

                                             <Button
                                                  onClick={() => setSelectedId(candidate.id)}
                                                  className="w-full h-14 neo-button text-xl hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none bg-primary hover:bg-primary-light"
                                             >
                                                  PILIH KANDIDAT
                                             </Button>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>

               {/* Confirmation Dialog */}
               <AlertDialog open={!!selectedId} onOpenChange={(open) => !open && setSelectedId(null)}>
                    <AlertDialogContent className="max-w-md bg-white border-4 border-black neo-shadow-xl p-0 gap-0 sm:rounded-none">
                         <AlertDialogHeader className="bg-primary/20 border-b-4 border-black p-6 text-center space-y-0 text-black">
                              <CheckCircle className="w-16 h-16 mx-auto mb-2" />
                              <AlertDialogTitle className="text-2xl font-heading uppercase text-center">Konfirmasi Pilihan</AlertDialogTitle>
                         </AlertDialogHeader>

                         <div className="p-8 text-center">
                              <p className="font-mono mb-2">Anda akan memilih kandidat nomor urut:</p>
                              <div className="text-6xl font-heading mb-2 text-primary text-stroke-black">
                                   {candidates.find(c => c.id === selectedId)?.orderNumber}
                              </div>
                              <h3 className="text-xl font-heading uppercase mb-6 max-w-xs mx-auto leading-tight">
                                   {candidates.find(c => c.id === selectedId)?.name}
                              </h3>
                              <p className="font-mono text-sm text-gray-500 bg-yellow-50 p-2 border border-yellow-200">
                                   ⚠️ Pilihan tidak dapat diubah setelah anda menekan tombol &quot;YA, PILIH&quot;.
                              </p>
                         </div>

                         <div className="p-4 border-t-4 border-black bg-gray-50 flex gap-4">
                              <AlertDialogCancel
                                   className="flex-1 font-mono font-bold border-2 border-black hover:bg-neutral-cream rounded-none h-12 mt-0"
                                   onClick={() => setSelectedId(null)}
                              >
                                   BATAL
                              </AlertDialogCancel>
                              <AlertDialogAction
                                   className="flex-1 neo-button h-12 text-lg hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none bg-primary hover:bg-primary-light"
                                   onClick={handleVote}
                                   disabled={isSubmitting}
                              >
                                   {isSubmitting ? <Loader2 className="animate-spin" /> : "YA, PILIH"}
                              </AlertDialogAction>
                         </div>
                    </AlertDialogContent>
               </AlertDialog>

               {/* Vision Mission Modal */}
               <Dialog open={!!viewCandidate} onOpenChange={(open) => !open && setViewCandidate(null)}>
                    <DialogContent className="max-w-4xl max-h-[90vh] bg-white border-4 border-black neo-shadow-xl p-0 gap-0 overflow-hidden sm:rounded-none">
                         <div className="grid md:grid-cols-2 h-full max-h-[90vh]">
                              {/* Left Column: Image & Basic Info */}
                              <div className="relative bg-neutral-100 h-64 md:h-full hidden md:block">
                                   <Image
                                        src={viewCandidate?.photoUrl || "https://placehold.co/800x1000/png"}
                                        alt={viewCandidate?.name || "Candidate"}
                                        fill
                                        className="object-cover"
                                   />
                                   <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8 text-white">
                                        <div className="inline-block self-start px-3 py-1 bg-primary rounded-none border-2 border-black text-black text-xs font-bold mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                             KANDIDAT NO. {viewCandidate?.orderNumber}
                                        </div>

                                        <div className="flex justify-between items-end gap-4 border-t-2 border-white/50 pt-4">
                                             <div className="text-left flex-1 min-w-0">
                                                  <p className="text-white/80 text-xs uppercase font-medium mb-1 font-mono">Ketua</p>
                                                  <h2 className="text-xl font-heading leading-tight">
                                                       {viewCandidate?.name.split('&')[0]?.trim() || viewCandidate?.name}
                                                  </h2>
                                             </div>
                                             {viewCandidate?.name.includes('&') && (
                                                  <div className="text-right flex-1 min-w-0">
                                                       <p className="text-white/80 text-xs uppercase font-medium mb-1 font-mono">Wakil</p>
                                                       <h2 className="text-xl font-heading leading-tight">
                                                            {viewCandidate?.name.split('&')[1]?.trim()}
                                                       </h2>
                                                  </div>
                                             )}
                                        </div>
                                   </div>
                              </div>

                              {/* Right Column: Visi Misi */}
                              <div className="flex flex-col h-full overflow-hidden">
                                   <div className="p-6 border-b-4 border-black bg-accent-blue flex justify-between items-center md:hidden">
                                        <h2 className="font-heading uppercase text-xl">Kandidat No. {viewCandidate?.orderNumber}</h2>
                                        <DialogClose className="p-2 hover:bg-black/10 rounded-full">
                                             <CheckCircle className="w-6 h-6 rotate-45" />
                                        </DialogClose>
                                   </div>

                                   <div className="p-6 md:p-8 flex flex-col h-full overflow-y-auto custom-scrollbar">
                                        <DialogHeader className="mb-6">
                                             <DialogTitle className="text-2xl font-heading uppercase text-black border-b-4 border-black pb-4 inline-block">
                                                  Visi & Misi
                                             </DialogTitle>
                                        </DialogHeader>

                                        <div className="space-y-6 grow">
                                             <div className="bg-neutral-cream p-5 border-2 border-black neo-shadow-sm">
                                                  <h4 className="font-heading uppercase text-lg mb-3 flex items-center gap-2">
                                                       <span className="bg-black text-white p-1"><CheckCircle2 className="w-4 h-4" /></span>
                                                       Visi
                                                  </h4>
                                                  <p className="font-mono text-sm leading-relaxed whitespace-pre-line">
                                                       {viewCandidate?.vision}
                                                  </p>
                                             </div>

                                             <div className="bg-white p-5 border-2 border-black neo-shadow-sm">
                                                  <h4 className="font-heading uppercase text-lg mb-3 flex items-center gap-2">
                                                       <span className="bg-black text-white p-1"><Rocket className="w-4 h-4" /></span>
                                                       Misi
                                                  </h4>
                                                  <ul className="grid gap-2">
                                                       {viewCandidate?.mission.split('\n').map((m, i) => (
                                                            <li key={i} className="flex items-start gap-3 font-mono text-sm leading-relaxed">
                                                                 <span className="mt-1.5 w-2 h-2 bg-black shrink-0" />
                                                                 {m}
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>

                                             {/* Flagship Programs Section */}
                                             <div className="bg-blue-50 p-5 border-2 border-black neo-shadow-sm">
                                                  <h4 className="font-heading uppercase text-lg mb-3 flex items-center gap-2 text-blue-800">
                                                       <span className="bg-blue-800 text-white p-1"><Rocket className="w-4 h-4" /></span>
                                                       Program Unggulan
                                                  </h4>
                                                  {viewCandidate?.programs && Array.isArray(viewCandidate.programs) && viewCandidate.programs.length > 0 ? (
                                                       <div className="grid gap-3">
                                                            {viewCandidate.programs.map((program, i) => (
                                                                 <div key={i} className="flex items-start gap-3 bg-white p-3 border-2 border-black shadow-sm">
                                                                      <span className="shrink-0 w-6 h-6 bg-black text-white font-mono font-bold flex items-center justify-center text-xs">
                                                                           {i + 1}
                                                                      </span>
                                                                      <span className="font-mono text-sm">{program}</span>
                                                                 </div>
                                                            ))}
                                                       </div>
                                                  ) : (
                                                       <div className="text-center py-4 text-gray-500 italic font-mono text-sm">
                                                            Belum ada data program unggulan
                                                       </div>
                                                  )}
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
                                                  className="w-full h-14 neo-button text-lg bg-primary hover:bg-primary-light hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                                             >
                                                  PILIH KANDIDAT INI
                                             </Button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </DialogContent>
               </Dialog>
          </div>
     );

}
