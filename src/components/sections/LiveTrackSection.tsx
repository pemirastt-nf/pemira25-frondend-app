"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { RefreshCw, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const COLORS = ['#023E8A', '#333333']; // Blue vs Dark Gray

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
     // Sort results by order number
     const sortedResults = [...results].sort((a, b) => a.orderNumber - b.orderNumber);

     return (
          <section id="livetrack" className="scroll-mt-24 py-20 md:py-32 bg-neutral-cream border-b-4 border-black relative overflow-hidden">
               {/* Background Pattern */}
               <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 dot-pattern opacity-30"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-yellow/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
               </div>

               <div className="container mx-auto px-4 relative z-10">
                    {/* Header Label */}
                    <div className="mb-20 flex justify-center">
                         <div className="relative bg-white border-4 border-black p-6 md:p-8 neo-shadow-lg max-w-2xl w-full text-center">
                              {/* Tape Effect */}
                              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-accent-yellow rotate-2 backdrop-blur-sm border-l-2 border-r-2 border-black/20"></div>

                              <h2 className="font-heading text-4xl md:text-7xl uppercase tracking-tighter mb-2">
                                   LIVE TRACK
                              </h2>
                              <div className="inline-block bg-black text-white px-2 md:px-4 py-1 transform -rotate-1">
                                   <p className="font-mono text-xs md:text-lg font-bold uppercase tracking-widest">
                                        PANTAU HASIL SECARA REAL-TIME
                                   </p>
                              </div>
                         </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                         {/* Main Stat Card - Turnout */}
                         <div className="lg:col-span-2 bg-black text-white border-4 border-black neo-shadow-lg p-6 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
                         <div className="absolute top-4 right-4 animate-spin-slow">
                              <RefreshCw size={24} className="text-neutral-500 md:w-8 md:h-8" />
                         </div>

                         <div className="flex-1 w-full text-center md:text-left">
                              <h3 className="font-mono text-lg md:text-xl text-neutral-400 mb-2 uppercase">Partisipasi Mahasiswa</h3>
                              <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-4 justify-center md:justify-start">
                                   <span className="font-heading text-6xl md:text-8xl text-primary-light">{stats.turnout}</span>
                                   <span className="font-mono text-lg md:text-xl text-neutral-500">TURN OUT</span>
                              </div>

                              <div className="w-full bg-neutral-800 h-6 mt-8 border-2 border-neutral-600 relative rounded-sm overflow-hidden">
                                   <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: stats.turnout }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className="h-full bg-primary relative"
                                   >
                                        {/* Stripes on bar */}
                                        <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg,rgba(0,0,0,.15) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.15) 50%,rgba(0,0,0,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
                                   </motion.div>
                              </div>
                         </div>

                         {/* Chart Area */}
                         {/* Chart Data Calculation */}
                         <div className="w-48 h-48 relative">
                              {(() => {
                                   // If stats are 0 (start of event), let's show empty state or small data to avoid broken chart
                                   const data = [
                                        { name: 'Sudah Memilih', value: stats.votesCast },
                                        { name: 'Belum Memilih', value: Math.max(0, stats.totalVoters - stats.votesCast) },
                                   ];

                                   // Fallback if total is 0
                                   const chartData = stats.totalVoters > 0 ? data : [{ name: 'Menunggu Data', value: 1 }];
                                   const chartColors = stats.totalVoters > 0 ? COLORS : ['#e5e5e5'];

                                   return (
                                        <ResponsiveContainer width="100%" height="100%">
                                             <PieChart>
                                                  <Pie
                                                       data={chartData}
                                                       innerRadius={60}
                                                       outerRadius={80}
                                                       paddingAngle={5}
                                                       dataKey="value"
                                                       stroke="none"
                                                  >
                                                       {chartData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                                                       ))}
                                                  </Pie>
                                                  <Tooltip
                                                       contentStyle={{ backgroundColor: '#000', border: '2px solid #fff', borderRadius: '0px' }}
                                                       itemStyle={{ color: '#fff', fontFamily: 'monospace' }}
                                                  />
                                             </PieChart>
                                        </ResponsiveContainer>
                                   );
                              })()}
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                   <div className="text-center">
                                        <span className="block text-2xl font-bold text-white">{stats.totalVoters > 0 ? stats.turnout : '0%'}</span>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Side Widgets */}
                         <div className="flex flex-col gap-6">
                              {/* Total Voters */}
                              <div className="bg-white border-4 border-black p-6 neo-shadow flex-1 flex flex-col justify-center items-center text-center">
                                   <Users size={32} className="mb-2 md:w-10 md:h-10" />
                                   <span className="font-heading text-4xl md:text-5xl">{stats.totalVoters}</span>
                                   <span className="font-mono text-xs md:text-sm uppercase font-bold bg-neutral-200 px-2">Total DPT</span>
                              </div>

                              {/* Votes Cast */}
                              <div className="bg-white border-4 border-black p-6 neo-shadow flex-1 flex flex-col justify-center items-center text-center">
                                   <TrendingUp size={32} className="mb-2 text-green-600 md:w-10 md:h-10" />
                                   <span className="font-heading text-4xl md:text-5xl">{stats.votesCast}</span>
                                   <span className="font-mono text-xs md:text-sm uppercase font-bold bg-green-200 text-green-900 px-2">Suara Masuk</span>
                              </div>
                         </div>
                    </div>

                    {/* Candidate Leaderboard */}
                    {results.length > 0 && (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                              {sortedResults.map((candidate) => {
                                   const percentage = stats.votesCast > 0
                                        ? ((candidate.votes / stats.votesCast) * 100).toFixed(1)
                                        : "0.0";

                                   return (
                                        <div key={candidate.id} className="bg-white p-5 md:p-6 neo-shadow-lg relative overflow-hidden group hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
                                             <div className="flex justify-between items-start mb-4 relative z-10">
                                                  <div>
                                                       <span className="font-mono text-[10px] md:text-xs font-bold bg-black text-white px-2 py-1 mb-2 inline-block">
                                                            NO. {candidate.orderNumber}
                                                       </span>
                                                       <h3 className="font-heading text-xl md:text-3xl uppercase leading-none mt-1">
                                                            {candidate.name}
                                                       </h3>
                                                  </div>
                                                  <div className="text-right ml-2">
                                                       <span className="font-heading text-3xl md:text-5xl block text-primary">
                                                            {candidate.votes}
                                                       </span>
                                                       <span className="font-mono text-[10px] md:text-xs font-bold text-neutral-500">SUARA</span>
                                                  </div>
                                             </div>

                                             {/* Progress Bar */}
                                             <div className="w-full bg-neutral-200 h-4 border-2 border-black relative rounded-full overflow-hidden">
                                                  <motion.div
                                                       initial={{ width: 0 }}
                                                       whileInView={{ width: `${percentage}%` }}
                                                       transition={{ duration: 1, delay: 0.2 }}
                                                       className="h-full bg-accent-blue relative"
                                                  >
                                                  </motion.div>
                                             </div>
                                             <p className="font-mono text-right text-xs font-bold mt-1 text-neutral-500">{percentage}%</p>

                                             {/* Background Decoration */}
                                             <div className="absolute -bottom-4 -right-4 text-9xl font-heading text-black/5 opacity-20 pointer-events-none select-none">
                                                  {candidate.orderNumber}
                                             </div>
                                        </div>
                                   );
                              })}
                         </div>
                    )}
               </div>
          </section>
     );
}
