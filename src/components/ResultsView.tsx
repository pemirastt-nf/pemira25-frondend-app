/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { motion } from "framer-motion";

interface ResultsViewProps {
     initialResults: any[];
     initialStats: {
          totalVoters: number;
          votesCast: number;
          turnout: string;
          onlineVotes: number;
          offlineVotes: number;
     };
}

export default function ResultsView({ initialResults, initialStats }: ResultsViewProps) {
     const [results, setResults] = useState<any[]>(initialResults);
     const [stats, setStats] = useState(initialStats);
     const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const [statsData, resultsData] = await Promise.all([
                         api.getStats(),
                         api.getResults()
                    ]);
                    setStats(statsData);
                    setResults(resultsData);
                    setLastUpdated(new Date());
               } catch (e) {
                    console.error("Failed to fetch results", e);
               }
          };

          // Poll every 30 seconds
          const interval = setInterval(fetchData, 30000);
          return () => clearInterval(interval);
     }, []);

     return (
          <div className="container mx-auto px-4 py-10 pb-20">
               <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
               >
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-slate-900">Hasil Sementara <span className="text-primary">PEMIRA</span></h1>
                    <p className="text-slate-500 text-sm md:text-base flex items-center justify-center gap-2">
                         <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                         </span>
                         Terakhir diperbarui: {lastUpdated.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </p>
               </motion.div>

               <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <motion.div
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.2 }}
                    >
                         <Card className="border-none shadow-xl shadow-slate-200/50 rounded-2xl h-full">
                              <CardHeader>
                                   <CardTitle className="text-slate-900">Perolehan Suara (Online & Offline)</CardTitle>
                              </CardHeader>
                              <CardContent className="h-87.5">
                                   <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={results} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                             <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                                             <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                             <Tooltip
                                                  cursor={{ fill: '#f8fafc' }}
                                                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                                  itemStyle={{ fontSize: '14px', fontWeight: 500 }}
                                             />
                                             <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                                             {/* Stacked Bars */}
                                             <Bar dataKey="onlineVotes" name="Suara Online" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                                             <Bar dataKey="offlineVotes" name="Suara Offline" stackId="a" fill="#f97316" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                   </ResponsiveContainer>
                              </CardContent>
                         </Card>
                    </motion.div>

                    <motion.div
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.3 }}
                    >
                         <Card className="border-none shadow-xl shadow-slate-200/50 rounded-2xl h-full">
                              <CardHeader>
                                   <CardTitle className="text-slate-900">Persentase Total Suara</CardTitle>
                              </CardHeader>
                              <CardContent className="h-87.5">
                                   <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                             <Pie
                                                  data={results}
                                                  cx="50%"
                                                  cy="50%"
                                                  innerRadius={60}
                                                  outerRadius={100}
                                                  paddingAngle={5}
                                                  dataKey="votes"
                                             >
                                                  {results.map((entry, index) => (
                                                       <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
                                                  ))}
                                             </Pie>
                                             <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                             <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                        </PieChart>
                                   </ResponsiveContainer>
                              </CardContent>
                         </Card>
                    </motion.div>
               </div>

               <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-surface p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50"
               >
                    <h3 className="text-xl font-bold mb-8 text-center text-slate-900">Statistik Pemilihan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
                         <div className="py-4 md:py-0">
                              <div className="text-4xl font-bold text-primary mb-2">{stats.totalVoters}</div>
                              <div className="text-sm font-medium text-neutral-slate uppercase tracking-wide">Total DPT</div>
                         </div>
                         <div className="py-4 md:py-0">
                              <div className="text-4xl font-bold text-green-600 mb-2">{stats.votesCast}</div>
                              <div className="text-sm font-medium text-neutral-slate uppercase tracking-wide">Total Suara Masuk</div>
                              <div className="mt-2 text-xs text-slate-400 flex justify-center gap-3">
                                   <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Online: {stats.onlineVotes || 0}</span>
                                   <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Offline: {stats.offlineVotes || 0}</span>
                              </div>
                         </div>
                         <div className="py-4 md:py-0">
                              <div className="text-4xl font-bold text-orange-600 mb-2">{stats.turnout}</div>
                              <div className="text-sm font-medium text-neutral-slate uppercase tracking-wide">Partisipasi</div>
                         </div>
                    </div>
               </motion.div>
          </div>
     );
}
