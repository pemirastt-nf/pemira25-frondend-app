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
                    <div className="max-w-md w-full bg-white border-4 border-black neo-shadow-lg p-8 text-center">
                         <div className="mx-auto w-20 h-20 bg-red-600 border-2 border-black rounded-full flex items-center justify-center mb-6 text-white neo-shadow-sm">
                              <CalendarClock className="w-10 h-10" />
                         </div>
                         <h2 className="text-3xl font-heading uppercase mb-4">Gagal Memuat Jadwal</h2>
                         <p className="font-mono text-sm mb-8">
                              Terjadi kesalahan saat memeriksa jadwal pemilihan. Mohon coba beberapa saat lagi.
                         </p>
                         <Link href="/">
                              <Button className="w-full h-12 neo-button hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none">
                                   KEMBALI KE BERANDA
                              </Button>
                         </Link>
                    </div>
               </div>
          );
     }

     const now = new Date();
     const startDate = settings.startDate ? new Date(settings.startDate) : null;
     const endDate = settings.endDate ? new Date(settings.endDate) : null;

     const inSchedule = startDate && endDate && now >= startDate && now <= endDate;
     const isOpen = settings.isVoteOpen || inSchedule;

     if (!isOpen) {
          return (
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center min-h-[60vh]">
                    <div className="max-w-md w-full bg-white border-4 border-black neo-shadow-lg p-8 text-center">
                         <div className="mx-auto w-20 h-20 bg-accent-yellow border-2 border-black rounded-full flex items-center justify-center mb-6 neo-shadow-sm">
                              <CalendarClock className="w-10 h-10 text-black" />
                         </div>
                         <h2 className="text-3xl font-heading uppercase mb-4">Pemilihan Belum Dibuka</h2>
                         <p className="font-mono text-sm mb-8">
                              Sesi pemilihan belum dimulai atau sudah berakhir. Silakan cek jadwal pemilihan.
                         </p>

                         <Link href="/#timeline">
                              <Button className="w-full h-12 neo-button hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none mb-4">
                                   LIHAT JADWAL
                              </Button>
                         </Link>
                         <Link href="/">
                              <Button variant="outline" className="w-full h-12 font-bold font-mono border-2 border-black hover:bg-neutral-cream rounded-none">
                                   KEMBALI
                              </Button>
                         </Link>
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
