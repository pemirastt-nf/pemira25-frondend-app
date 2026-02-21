"use client";

import { RefreshCw, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface CandidateResult {
     id: string;
     name: string;
     orderNumber: number;
     votes: number;
}

interface LiveTrackProps {
     stats: {
          totalVoters: number;
          votesCast: number;
          turnout: string;
     };
     results?: CandidateResult[];
}

export default function LiveTrackSection({ stats, results = [] }: LiveTrackProps) {
     const sortedResults = [...results].sort((a, b) => a.orderNumber - b.orderNumber);

     return (
          <section id="livetrack" className="py-24 bg-white relative overflow-hidden">
               {/* Background Elements */}
               <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>
               <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-blue-50/50 rounded-full blur-3xl pointer-events-none"></div>
               <Star className="absolute top-10 left-[10%] w-6 h-6 text-purple-400/30 animate-pulse hidden md:block -rotate-6" fill="currentColor" />

               <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                         <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                              Pantau Hasil <span className="text-primary">Real-Time</span>
                         </h2>
                         <p className="text-gray-600 text-lg leading-relaxed">
                              Pantau perkembangan pemilihan secara langsung. Lihat statistik partisipasi dan hasil sementara untuk setiap kandidat.
                         </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                         {/* Main Stat Card - Turnout Only */}
                         <div className="lg:col-span-1 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden flex flex-col justify-between group hover:border-primary/20 transition-all duration-300">
                              <div>
                                   <div className="flex items-center gap-3 mb-2">
                                        
                                        <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wider">Partisipasi Mahasiswa</h3>
                                   </div>
                                   <div className="text-6xl font-bold tracking-tight text-gray-900 mb-2">
                                        {stats.turnout}
                                   </div>
                                   <p className="text-gray-400 text-sm">
                                        Mahasiswa telah menggunakan hak suaranya.
                                   </p>
                              </div>
                              
                              <div className="mt-8 pt-8 border-t border-gray-50">
                                   <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="font-medium text-gray-700">Progress</span>
                                        <span className="text-primary font-bold">{stats.turnout}</span>
                                   </div>
                                   <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                             initial={{ width: 0 }}
                                             whileInView={{ width: stats.turnout }}
                                             transition={{ duration: 1.5, ease: "circOut" }}
                                             className="h-full bg-primary rounded-full"
                                        />
                                   </div>
                              </div>
                         </div>

                         {/* Candidate Leaderboard - Simplified & Clean */}
                         <div className="lg:col-span-2 flex flex-col justify-center gap-4">
                              {sortedResults.length > 0 ? (
                                   sortedResults.map((candidate) => {
                                        const percentage = stats.votesCast > 0
                                             ? Math.round((candidate.votes / stats.votesCast) * 100)
                                             : 0;

                                        return (
                                             <div key={candidate.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                                                  <div className="relative z-10 flex items-center justify-between gap-4">
                                                       <div className="flex items-center gap-4 min-w-0">
                                                            <div className="shrink-0 w-10 h-10 bg-gray-50 text-gray-500 rounded-full flex items-center justify-center font-bold border border-gray-200 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                                                                 {candidate.orderNumber}
                                                            </div>
                                                            <div className="min-w-0">
                                                                 <h4 className="font-bold text-gray-900 text-lg truncate group-hover:text-primary transition-colors">
                                                                      {candidate.name}
                                                                 </h4>
                                                                 <p className="text-xs text-gray-400 font-medium">Kandidat No. Urut {candidate.orderNumber}</p>
                                                            </div>
                                                       </div>
                                                       
                                                       <div className="text-right shrink-0">
                                                            <div className="text-2xl font-bold text-gray-900">{percentage}%</div>
                                                       </div>
                                                  </div>

                                                  {/* Background Progress Bar */}
                                                  <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-50">
                                                       <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${percentage}%` }}
                                                            transition={{ duration: 1, delay: 0.2 }}
                                                            className="h-full bg-primary"
                                                       />
                                                  </div>
                                             </div>
                                        );
                                   })
                              ) : (
                                   <div className="h-full bg-gray-50 rounded-3xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-8">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                             <RefreshCw className="text-gray-400 animate-spin-slow" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-1">Menunggu Data Suara</h3>
                                        <p className="text-gray-500 text-sm max-w-xs">Data perolehan suara akan muncul di sini setelah pemungutan suara dimulai.</p>
                                   </div>
                              )}
                         </div>
                    </div>
               </div>
          </section>
     );
}
