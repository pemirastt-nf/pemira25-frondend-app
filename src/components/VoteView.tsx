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
import { CheckCircle2, Loader2, Mail, Lock, Info, X, Key,  Rocket, CheckCircle, ChevronLeft } from "lucide-react";
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

interface Candidate {
     id: number | string;
     name: string;
     photoUrl: string;
     orderNumber: number;
     vision: string;
     mission: string;
     programs?: string[];
     isBlankBox?: boolean;
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
               storage.removeItem("token");
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
               console.error("OTP Request Error:", err);
               setError(err.message || "Gagal mengirim OTP. Layanan mungkin sedang sibuk.");
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
          return (
               <div className="min-h-screen flex items-center justify-center bg-slate-50">
                    <Loader2 className="animate-spin h-12 w-12 text-primary/80" />
               </div>
          );
     }

     if (authStage === 'voted') {
          return (
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center min-h-[60vh] relative">
                    {/* Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-green-500/5 rounded-full blur-[100px] -z-10" />

                    <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 0.5 }}
                         className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 relative overflow-hidden ring-1 ring-green-100 text-center"
                    >
                         <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-green-400 via-emerald-500 to-teal-500"></div>

                         <div className="w-24 h-24 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner rotate-3">
                              <CheckCircle2 className="h-12 w-12 drop-shadow-sm" />
                         </div>
                         
                         <h2 className="text-3xl font-heading font-bold text-slate-900 mb-3 tracking-tight">
                              Terima Kasih!
                         </h2>
                         
                         <div className="bg-green-50/50 rounded-2xl p-6 mb-8 text-slate-600 leading-relaxed border border-green-100/50 shadow-sm">
                              <p className="mb-2 font-medium text-slate-900">
                                   Suara Anda telah berhasil direkam.
                              </p>
                              <p className="text-sm">
                                   Partisipasi Anda sangat berarti untuk <span className="font-bold text-primary">PEMIRA IM STTNF 2025</span>.
                              </p>
                         </div>

                         <Button 
                              onClick={() => window.location.href = "/"} 
                              className="w-full h-12 rounded-xl text-base font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 hover:shadow-xl hover:-translate-y-0.5"
                         >
                              Kembali ke Beranda
                         </Button>
                    </motion.div>
               </div>
          );
     }

     if (authStage === 'email_input') {
          return (
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 flex items-center justify-center min-h-[70vh] relative">
                    {/* Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-primary/5 rounded-full blur-[100px] -z-10" />

                    <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 0.5 }}
                         className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10 relative overflow-hidden ring-1 ring-gray-100"
                    >
                         <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary via-blue-400 to-secondary"></div>
                         
                         <div className="text-center mb-10">
                              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 shadow-sm">
                                   <Mail className="w-8 h-8" />
                              </div>
                              <h1 className="text-3xl font-heading font-bold text-slate-900 mb-2 tracking-tight">Login Pemilih</h1>
                              <p className="text-slate-500 font-medium text-sm">Masuk untuk menggunakan hak suara Anda.</p>
                         </div>

                         <form onSubmit={handleRequestOtp} className="space-y-6">
                              <div className="space-y-2">
                                   <label className="text-sm font-semibold text-gray-700 block text-left">Email Student</label>
                                   <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                             type="email"
                                             placeholder="nim@student.nurulfikri.ac.id"
                                             pattern=".+@student\.nurulfikri\.ac\.id"
                                             title="Gunakan email mahasiswa (emailkamu@student.nurulfikri.ac.id)"
                                             required
                                             className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none text-sm transition-all text-gray-900 placeholder:text-gray-400"
                                             value={email}
                                             onChange={(e) => setEmail(e.target.value)}
                                        />
                                   </div>
                              </div>

                              {error && (
                                   <div className="bg-red-50 border border-red-100 p-3 rounded-lg text-red-600 text-sm font-medium flex items-center gap-2 justify-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 block"></span>
                                        {error}
                                   </div>
                              )}

                              <Button type="submit" className="w-full h-12 rounded-xl text-base font-bold bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]" disabled={isSubmitting}>
                                   {isSubmitting ? <Loader2 className="animate-spin" /> : "Kirim Kode OTP"}
                              </Button>

                              <div className="relative py-2">
                                   <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-gray-200" />
                                   </div>
                                   <div className="relative flex justify-center text-xs uppercase font-semibold text-gray-400 tracking-wider">
                                        <span className="bg-white px-3">Atau</span>
                                   </div>
                              </div>

                              <Button
                                   type="button"
                                   variant="ghost"
                                   className="w-full h-12 text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-900 rounded-xl"
                                   onClick={() => {
                                        setAuthStage('manual_otp');
                                        setError("");
                                   }}
                              >
                                   Sudah Punya Kode?
                              </Button>
                         </form>
                    </motion.div>
               </div>
          );
     }

     if (authStage === 'otp_input') {
          return (
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 flex items-center justify-center min-h-[70vh] relative">
                    {/* Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-blue-500/5 rounded-full blur-[100px] -z-10" />

                    <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 0.5 }}
                         className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10 relative overflow-hidden ring-1 ring-blue-100"
                    >
                         <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-blue-400 via-primary to-purple-500"></div>

                         <div className="text-center mb-10">
                              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 -rotate-3 shadow-sm border border-blue-100">
                                   <Key className="w-8 h-8" />
                              </div>
                              <h1 className="text-2xl font-heading font-bold text-slate-900 mb-2">Verifikasi OTP</h1>
                              <p className="text-slate-500 text-sm font-medium">
                                   Kode dikirim ke: <br />
                                   <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg mt-2 inline-block shadow-sm border border-slate-200/50">{email}</span>
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

                              {error && (
                                   <div className="bg-red-50 border border-red-100 p-3 rounded-lg text-red-600 text-sm font-medium flex items-center gap-2 justify-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 block"></span>
                                        {error}
                                   </div>
                              )}

                              <Button
                                   onClick={(e) => handleVerifyOtp(e)}
                                   className="w-full h-12 rounded-xl text-base font-bold bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                                   disabled={isSubmitting || !email || otp.length !== 6}
                              >
                                   {isSubmitting ? <Loader2 className="animate-spin" /> : "Verifikasi & Masuk"}
                              </Button>

                              <Button
                                   type="button"
                                   variant="ghost"
                                   onClick={() => {
                                        setAuthStage('email_input');
                                        sessionStorage.removeItem("voting_state");
                                   }}
                                   className="w-full h-12 text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"
                              >
                                   &lt; Ganti Email
                              </Button>
                         </div>
                    </motion.div>
               </div>
          );
     }

     if (authStage === 'manual_otp') {
          return (
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 flex items-center justify-center min-h-[70vh] relative">
                    {/* Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-yellow-500/5 rounded-full blur-[100px] -z-10" />

                    <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 0.5 }}
                         className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10 relative overflow-hidden ring-1 ring-yellow-100"
                    >
                         <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-yellow-400 via-orange-400 to-red-400"></div>

                         <div className="text-center mb-10">
                              <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 shadow-sm border border-yellow-100">
                                   <Key className="w-8 h-8" />
                              </div>
                              <h1 className="text-2xl font-heading font-bold text-slate-900 mb-2">Input Manual</h1>
                              <p className="text-slate-500 text-sm font-medium">Masukkan OTP yang diterima dari panitia/email.</p>
                         </div>

                         <div className="space-y-6">
                              <div className="space-y-2">
                                   <label className="text-sm font-semibold text-slate-700 block text-left">Email Student</label>
                                   <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                             type="email"
                                             placeholder="nim@student.nurulfikri.ac.id"
                                             required
                                             className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 focus:bg-white outline-none text-sm transition-all text-slate-900 placeholder:text-gray-400"
                                             value={email}
                                             onChange={(e) => setEmail(e.target.value)}
                                        />
                                   </div>
                              </div>

                              <div className="space-y-2">
                                   <label className="text-sm font-semibold text-slate-700 block text-left">Kode OTP</label>
                                   <div className="flex justify-center pt-2">
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
                                   <div className="bg-red-50 border border-red-100 p-3 rounded-lg text-red-600 text-sm font-medium flex items-center gap-2 justify-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 block"></span>
                                        {error}
                                   </div>
                              )}

                              <Button
                                   onClick={(e) => handleVerifyOtp(e)}
                                   className="w-full h-12 rounded-xl text-base font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10 transition-all hover:scale-[1.02]"
                                   disabled={isSubmitting || !email || otp.length !== 6}
                              >
                                   {isSubmitting ? <Loader2 className="animate-spin" /> : "Verifikasi & Masuk"}
                              </Button>

                              <Button
                                   type="button"
                                   variant="ghost"
                                   className="w-full h-12 text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"
                                   onClick={() => {
                                        setAuthStage('email_input');
                                        setError("");
                                   }}
                              >
                                   Kembali
                              </Button>
                         </div>
                    </motion.div>
               </div>
          );
     }

     return (
          <div className="py-12 md:py-20 bg-slate-50 min-h-screen relative overflow-hidden">
               {/* Background Decorations */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-125 bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
               <div className="absolute bottom-0 right-0 w-125 h-125 bg-blue-400/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
                    <div className="text-center mb-16">
                         <motion.h1 
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6 tracking-tight leading-tight"
                         >
                              Pilih Pemimpinmu, <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">Tentukan Arah</span>
                         </motion.h1>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-10 max-w-6xl mx-auto mb-20">
                         {candidates.map((candidate, idx) => (
                              <motion.div
                                   initial={{ y: 50, opacity: 0 }}
                                   animate={{ y: 0, opacity: 1 }}
                                   transition={{ delay: 0.3 + (idx * 0.1) }}
                                   key={candidate.id}
                                   className="group relative bg-white rounded-4xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 flex flex-col w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] overflow-hidden border border-slate-100"
                              >
                                   {/* Number Badge */}
                                   <div className="absolute top-4 left-4 w-14 h-14 bg-white/90 backdrop-blur text-primary rounded-2xl shadow-lg border border-white/50 flex items-center justify-center z-20 font-heading font-bold text-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        0{candidate.orderNumber}
                                   </div>

                                   {/* Image */}
                                   <div className="relative aspect-4/5 w-full bg-slate-100 overflow-hidden">
                                        <Image
                                             src={candidate.photoUrl || "https://placehold.co/800x1000/png"}
                                             alt={candidate.name}
                                             fill
                                             className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                        
                                        {/* Name Overlay (Bottom) */}
                                        {candidate.isBlankBox ? (
                                             <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                                                  <h3 className="text-2xl font-heading font-bold text-white leading-tight drop-shadow-md">Kotak Kosong</h3>
                                                  <p className="text-white/70 text-sm font-medium mt-1">Tidak memilih kandidat manapun</p>
                                             </div>
                                        ) : (
                                             <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                  <h3 className="text-2xl font-heading font-bold text-white leading-tight drop-shadow-md">
                                                       {candidate.name.split('&')[0]?.trim()}
                                                       {candidate.name.includes('&') && (
                                                            <>
                                                                 <span className="text-primary-light mx-2">&</span>
                                                                 <br/>
                                                                 {candidate.name.split('&')[1]?.trim()}
                                                            </>
                                                       )}
                                                  </h3>
                                                  <p className="text-white/80 text-sm font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                       Kandidat Ketua & Wakil Ketua
                                                  </p>
                                             </div>
                                        )}
                                   </div>

                                   {/* Actions */}
                                   <div className="p-5 bg-white border-t border-slate-50 relative z-10">
                                        <div className={`grid gap-3 ${candidate.isBlankBox ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                             {!candidate.isBlankBox && (
                                                  <Button
                                                       variant="secondary"
                                                       className="h-12 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
                                                       onClick={() => setViewCandidate(candidate)}
                                                  >
                                                       Visi & Misi
                                                  </Button>
                                             )}
                                             <Button
                                                  onClick={() => setSelectedId(candidate.id)}
                                                  className="h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:bg-primary-light hover:shadow-primary/40 transition-all border border-transparent"
                                             >
                                                  Pilih
                                             </Button>
                                        </div>
                                   </div>
                              </motion.div>
                         ))}
                    </div>
               </div>

               {/* Confirmation Dialog */}
               <AlertDialog open={!!selectedId} onOpenChange={(open) => !open && setSelectedId(null)}>
                    <AlertDialogContent className="max-w-md bg-white/95 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-0 overflow-hidden ring-1 ring-slate-200">
                         <AlertDialogHeader className="bg-gray-50 border-b border-gray-100 p-8 text-center space-y-4">
                              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2">
                                   <CheckCircle className="w-8 h-8" />
                              </div>
                              <AlertDialogTitle className="text-2xl font-bold text-gray-900">Konfirmasi Pilihan</AlertDialogTitle>
                         </AlertDialogHeader>

                         <div className="p-8 text-center">
                              <p className="text-gray-500 mb-6">Anda akan memilih kandidat nomor urut:</p>
                              
                              <div className="text-5xl font-bold text-primary mb-2">
                                   {candidates.find(c => c.id === selectedId)?.orderNumber}
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-6 max-w-xs mx-auto leading-tight">
                                   {candidates.find(c => c.id === selectedId)?.name}
                              </h3>

                              <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-sm border border-yellow-100 flex gap-3 text-left">
                                   <Info className="w-5 h-5 shrink-0 text-yellow-600" />
                                   <p>Pilihan tidak dapat diubah setelah Anda menekan tombol &quot;Ya, Pilih&quot;.</p>
                              </div>
                         </div>

                         <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-4">
                              <AlertDialogCancel
                                   className="flex-1 h-12 rounded-xl border-gray-200 hover:bg-white hover:text-red-600 hover:border-red-200 transition-colors"
                                   onClick={() => setSelectedId(null)}
                              >
                                   Batal
                              </AlertDialogCancel>
                              <AlertDialogAction
                                   className="flex-1 h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all hover:scale-[1.02]"
                                   onClick={handleVote}
                                   disabled={isSubmitting}
                              >
                                   {isSubmitting ? <Loader2 className="animate-spin" /> : "Ya, Pilih"}
                              </AlertDialogAction>
                         </div>
                    </AlertDialogContent>
               </AlertDialog>

               {/* Vision Mission Modal */}
               <Dialog open={!!viewCandidate} onOpenChange={(open) => !open && setViewCandidate(null)}>
                    <DialogContent className="max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl p-0 gap-0 overflow-hidden border-none">
                         <div className="grid md:grid-cols-2 h-[90vh] max-h-[90vh]">
                              {/* Left Column: Image & Basic Info */}
                              <div className="relative bg-neutral-100 h-full hidden md:block">
                                   <Image
                                        src={viewCandidate?.photoUrl || "https://placehold.co/800x1000/png"}
                                        alt={viewCandidate?.name || "Candidate"}
                                        fill
                                        className="object-cover"
                                   />
                                   <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
                                        <div className="inline-block self-start px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-lg border border-white/20 text-white text-xs font-bold mb-4">
                                             KANDIDAT NO. {viewCandidate?.orderNumber}
                                        </div>

                                        <div className="flex justify-between items-end gap-4 border-t border-white/20 pt-6">
                                             <div className="text-left flex-1 min-w-0">
                                                  <p className="text-white/60 text-xs uppercase font-medium mb-1 tracking-wider">Ketua</p>
                                                  <h2 className="text-xl font-bold text-white leading-tight">
                                                       {viewCandidate?.name.split('&')[0]?.trim() || viewCandidate?.name}
                                                  </h2>
                                             </div>
                                             {viewCandidate?.name.includes('&') && (
                                                  <div className="text-right flex-1 min-w-0">
                                                       <p className="text-white/60 text-xs uppercase font-medium mb-1 tracking-wider">Wakil</p>
                                                       <h2 className="text-xl font-bold text-white leading-tight">
                                                            {viewCandidate?.name.split('&')[1]?.trim()}
                                                       </h2>
                                                  </div>
                                             )}
                                        </div>
                                   </div>
                              </div>

                              {/* Right Column: Visi Misi */}
                              <div className="flex flex-col h-full overflow-hidden bg-white">
                                   <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center md:hidden">
                                        <h2 className="font-bold text-lg text-gray-900">Kandidat No. {viewCandidate?.orderNumber}</h2>
                                        <DialogClose className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                             <X className="w-5 h-5 text-gray-500" />
                                        </DialogClose>
                                   </div>

                                   <div className="p-6 md:p-8 flex flex-col h-full overflow-y-auto custom-scrollbar">
                                        <DialogHeader className="mb-6">
                                             <DialogTitle className="text-2xl font-bold text-gray-900">
                                                  Visi & Misi
                                             </DialogTitle>
                                        </DialogHeader>

                                        <div className="space-y-8 grow">
                                             <div className="space-y-3">
                                                  <h4 className="font-bold text-lg text-primary flex items-center gap-2">
                                                       <CheckCircle2 className="w-5 h-5" />
                                                       Visi
                                                  </h4>
                                                  <div className="bg-blue-50/50 p-5 rounded-xl text-gray-700 leading-relaxed border border-blue-100/50">
                                                       {viewCandidate?.vision}
                                                  </div>
                                             </div>

                                             <div className="space-y-3">
                                                  <h4 className="font-bold text-lg text-primary flex items-center gap-2">
                                                       <Rocket className="w-5 h-5" />
                                                       Misi
                                                  </h4>
                                                  <div className="space-y-3 pl-1">
                                                       {viewCandidate?.mission.split('\n').map((m, i) => (
                                                            <div key={i} className="flex gap-4 text-gray-600 leading-relaxed">
                                                                 <div className="shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center mt-0.5">
                                                                      {i + 1}
                                                                 </div>
                                                                 <p>{m}</p>
                                                            </div>
                                                       ))}
                                                  </div>
                                             </div>

                                             {/* Flagship Programs Section */}
                                             <div className="space-y-3 pt-2">
                                                  <h4 className="font-bold text-lg text-primary flex items-center gap-2">
                                                       <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-primary text-xs">★</span>
                                                       Program Unggulan
                                                  </h4>
                                                  {viewCandidate?.programs && Array.isArray(viewCandidate.programs) && viewCandidate.programs.length > 0 ? (
                                                       <div className="grid gap-3">
                                                            {viewCandidate.programs.map((program, i) => (
                                                                 <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                                      <span className="shrink-0 w-6 h-6 bg-white text-primary border border-gray-200 rounded-full font-bold flex items-center justify-center text-xs shadow-sm">
                                                                           {i + 1}
                                                                      </span>
                                                                      <span className="text-gray-700 font-medium">{program}</span>
                                                                 </div>
                                                            ))}
                                                       </div>
                                                  ) : (
                                                       <div className="text-center py-6 text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                            Belum ada data program unggulan
                                                       </div>
                                                  )}
                                             </div>
                                        </div>

                                        <div className="pt-6 mt-6 border-t border-gray-100 sticky bottom-0 bg-white/80 backdrop-blur-md">
                                             <Button
                                                  onClick={() => {
                                                       if (viewCandidate) {
                                                            setSelectedId(viewCandidate.id);
                                                            setViewCandidate(null);
                                                       }
                                                  }}
                                                  className="w-full h-14 rounded-xl text-lg font-semibold bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-light"
                                             >
                                                  Pilih Kandidat Ini
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
