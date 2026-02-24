"use client";

import { motion } from "framer-motion";
import { BASE_URL } from "@/lib/api";
import Image from "next/image";

interface WinnerSectionProps {
     winnerData?: {
          status: string;
          winner?: {
               id: string;
               name: string;
               orderNumber: number;
               votes: number;
               percentage: number;
               photo: string | null;
               vision: string;
               mission: string;
          } | null;
          totalValidVotes?: number;
     } | null;
}

export default function WinnerSection({ winnerData }: WinnerSectionProps) {
     if (!winnerData || winnerData.status !== "published" || !winnerData.winner) {
          return null;
     }

     const { winner } = winnerData;
     const photoSrc = winner.photo
          ? (winner.photo.startsWith('http') ? winner.photo : `${BASE_URL}${winner.photo}`)
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(winner.name)}&background=random&size=256`;

     return (
          <section id="winner" className="py-12 lg:py-20 bg-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-full h-100 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.03),transparent_50%)]" />
               <div className="absolute bottom-0 left-0 w-full h-100 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.03),transparent_50%)]" />

               <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                         initial={{ opacity: 0, y: 30 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.8, ease: "easeOut" }}
                         className="max-w-5xl mx-auto"
                    >
                         <div className="text-center mb-10 space-y-2">
                              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                                   Selamat Kepada{' '}
                                   <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-400 block sm:inline">
                                        Kandidat Terpilih
                                   </span>
                              </h2>
                         </div>

                         <div className="bg-white rounded-4xl shadow-xl shadow-blue-900/5 border border-slate-100 p-6 md:p-8 overflow-hidden relative">
                              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">

                                   <div className="w-full max-w-70 md:w-5/12 shrink-0 relative group mx-auto md:mx-0">
                                        <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-lg shadow-blue-900/10 border-4 border-white bg-slate-50 transform transition-transform duration-700 group-hover:scale-[1.02]">
                                             <Image
                                                  src={photoSrc}
                                                  alt={`Foto ${winner.name}`}
                                                  fill
                                                  className="w-full h-full object-cover object-top"
                                             />
                                             <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                                        </div>

                                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/90 backdrop-blur-md text-gray-900 rounded-xl flex flex-col items-center justify-center shadow-lg border border-slate-100 transform transition-transform group-hover:rotate-0 group-hover:scale-110">
                                             <span className="text-2xl font-black leading-none">{winner.orderNumber}</span>
                                        </div>
                                   </div>

                                   <div className="w-full md:w-7/12 text-center md:text-left space-y-6">
                                        <div className="flex flex-col items-center md:items-start space-y-4">
                                             <div className="inline-flex items-center ">
                                                  <div className="text-xs font-bold uppercase tracking-wider">Calon PRESMA & WAPRESMA <span className="text-[#041BB5]">BEM IM STTNF</span></div>
                                             </div>
                                             <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                                                  {winner.name}
                                             </h3>
                                             <p className="text-slate-600 text-base md:text-lg leading-relaxed pt-2">
                                                  Terima kasih kepada seluruh mahasiswa yang telah memberikan hak pilihnya. <span className="font-bold text-black">PEMIRA</span><span className="font-bold text-primary">2025</span> telah usai, kini saatnya kita kembali bersatu mengawal amanah kepemimpinan yang baru demi kemajuan kampus tercinta.
                                             </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                             <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors group text-left">
                                                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 group-hover:text-blue-600 transition-colors">Total Suara</p>
                                                  <div className="text-2xl lg:text-3xl font-black text-slate-900 tabular-nums">
                                                       {winner.votes.toLocaleString('id-ID')}
                                                  </div>
                                             </div>
                                             <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors group text-left">
                                                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 group-hover:text-blue-600 transition-colors">Persentase</p>
                                                  <div className="text-2xl lg:text-3xl font-black text-slate-900 tabular-nums">
                                                       {Math.round(winner.percentage)}%
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                              </div>
                         </div>
                    </motion.div>
               </div>
          </section>
     );
}
