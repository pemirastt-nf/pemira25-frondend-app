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
               <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[60vh]">
                    <Card className="max-w-md w-full shadow-2xl border-slate-200">
                         <CardHeader className="text-center pb-2">
                              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                   <CalendarClock className="w-8 h-8 text-red-600" />
                              </div>
                              <CardTitle className="text-2xl font-bold text-slate-800">Gagal Memuat Jadwal</CardTitle>
                         </CardHeader>
                         <CardContent className="text-center space-y-6">
                              <p className="text-slate-600">
                                   Terjadi kesalahan saat memeriksa jadwal pemilihan. Mohon coba beberapa saat lagi.
                              </p>
                              <Link href="/">
                                   <Button className="w-full bg-primary hover:bg-primary-light h-12 text-lg">
                                        Kembali ke Beranda
                                   </Button>
                              </Link>
                         </CardContent>
                    </Card>
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
               <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[60vh]">
                    <Card className="max-w-md w-full shadow-2xl border-slate-200">
                         <CardHeader className="text-center pb-2">
                              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                   <CalendarClock className="w-8 h-8 text-red-600" />
                              </div>
                              <CardTitle className="text-2xl font-bold text-slate-800">Pemilihan Belum Dibuka</CardTitle>
                         </CardHeader>
                         <CardContent className="text-center space-y-6">
                              <p className="text-slate-600">
                                   Mohon maaf, sesi pemilihan belum dimulai atau sudah berakhir. Silakan cek jadwal pemilihan atau tunggu informasi selanjutnya.
                              </p>

                              <Link href="/">
                                   <Button className="w-full bg-primary hover:bg-primary-light h-12 text-lg">
                                        Kembali ke Beranda
                                   </Button>
                              </Link>
                         </CardContent>
                    </Card>
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
