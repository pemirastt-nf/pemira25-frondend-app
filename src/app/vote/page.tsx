/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/lib/api";
import VoteView from "@/components/VoteView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CalendarClock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const revalidate = 0; // Dynamic

export default async function VotePage() {
     let settings = null;
     try {
          settings = await api.getSettings({ cache: 'no-store' });
     } catch (e) {
          console.error("Failed to fetch settings for vote page:", e);
     }

     if (!settings) {
          return (
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center min-h-[60vh]">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center border border-gray-100">
                         <div className="mx-auto w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-50/50">
                              <AlertCircle className="w-10 h-10" />
                         </div>
                         <h2 className="text-2xl font-bold text-gray-900 mb-3">Gagal Memuat Jadwal</h2>
                         <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                              Terjadi kesalahan saat memeriksa jadwal pemilihan. Mohon coba beberapa saat lagi.
                         </p>
                         <Link href="/">
                              <Button className="w-full h-12 rounded-xl text-base font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
                                   Kembali ke Beranda
                              </Button>
                         </Link>
                    </div>
               </div>
          );
     }

     const now = new Date();

     // Check multi-day schedule first
     const votingSchedules = settings.votingSchedules as { dates: string[]; startTime: string; endTime: string } | null;
     let inSchedule = false;

     if (votingSchedules?.dates?.length && votingSchedules.startTime && votingSchedules.endTime) {
          const todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(now);
          if (votingSchedules.dates.includes(todayStr)) {
               const [sh, sm] = votingSchedules.startTime.split(':').map(Number);
               const [eh, em] = votingSchedules.endTime.split(':').map(Number);
               const wibTime = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
               const [wibH, wibM] = wibTime.split(':').map(Number);
               const nowMin = wibH * 60 + wibM;
               inSchedule = nowMin >= sh * 60 + sm && nowMin <= eh * 60 + em;
          }
     } else {
          // Legacy fallback: single startDate / endDate
          const startDate = settings.startDate ? new Date(settings.startDate) : null;
          const endDate = settings.endDate ? new Date(settings.endDate) : null;
          inSchedule = !!(startDate && endDate && now >= startDate && now <= endDate);
     }

     const isOpen = settings.isVoteOpen || inSchedule;

     if (!isOpen) {
          return (
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center min-h-[60vh]">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center border border-gray-100 relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-yellow-400 to-orange-500"></div>
                         
                         <div className="mx-auto w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-6 ring-8 ring-orange-50/50">
                              <CalendarClock className="w-10 h-10" />
                         </div>
                         <h2 className="text-2xl font-bold text-gray-900 mb-3">Pemilihan Belum Dibuka</h2>
                         <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                              Sesi pemilihan belum dimulai atau sudah berakhir. Silakan cek jadwal pemilihan untuk informasi lebih lanjut.
                         </p>

                         <div className="space-y-3">
                              <Link href="/#timeline" className="block w-full">
                                   <Button className="w-full h-12 rounded-xl text-base font-semibold bg-primary text-white hover:bg-primary-light transition-all shadow-lg shadow-primary/20">
                                        Lihat Jadwal
                                   </Button>
                              </Link>
                              
                              <Link href="/" className="block w-full">
                                   <Button variant="ghost" className="w-full h-12 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium">
                                        Kembali
                                   </Button>
                              </Link>
                         </div>
                    </div>
               </div>
          );
     }

     let candidates = [];
     try {
          candidates = await api.getCandidates({ next: { revalidate: 60 } });
     } catch (err) {
          console.error("Failed to fetch candidates for vote page:", err);
     }

     return <VoteView initialCandidates={candidates} />;
}
