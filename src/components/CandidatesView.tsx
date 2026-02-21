/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import CandidateCard from "@/components/CandidateCard";

export default function CandidatesView({ candidatesData }: { candidatesData: any[] }) {
     return (
          <div className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
               {/* Background Blobs */}
               <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 translate-x-[-50%]" />
               <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-[100px] -z-10 translate-x-[50%]" />

               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.6 }}
                         className="text-center mb-16 md:mb-20"
                    >
                         <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide mb-4">
                              KENALI KANDIDAT
                         </span>
                         <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-slate-900 tracking-tight leading-tight">
                              Calon Pemimpin <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">Masa Depan</span>
                         </h1>
                         <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                              Pelajari visi, misi, dan program kerja mereka. Pilihan Anda menentukan arah organisasi satu tahun ke depan.
                         </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 place-items-center">
                         {candidatesData.map((candidate, index) => (
                              <motion.div
                                   key={candidate.id}
                                   initial={{ opacity: 0, y: 30 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true }}
                                   transition={{ delay: index * 0.2, duration: 0.5 }}
                                   className="w-full h-full max-w-87.5 flex"
                              >
                                   <CandidateCard candidate={candidate} />
                              </motion.div>
                         ))}
                    </div>
               </div>
          </div>
     );
}
