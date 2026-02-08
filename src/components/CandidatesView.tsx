/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import CandidateCard from "@/components/CandidateCard";

export default function CandidatesView({ candidatesData }: { candidatesData: any[] }) {
     return (
          <div className="py-16 md:py-24 pb-20">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="text-center mb-12 md:mb-16"
                    >
                         <h1 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">Kandidat <span className="text-primary">PRESMA</span> & <span className="text-primary">WA-PRESMA</span></h1>
                         <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                              Kenali calon pemimpinmu. Pelajari visi, misi, dan program kerja mereka sebelum menentukan pilihan.
                         </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
                         {candidatesData.map((candidate, index) => (
                              <motion.div
                                   key={candidate.id}
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ delay: index * 0.2 }}
                                   className="w-full max-w-[320px]"
                              >
                                   <CandidateCard candidate={candidate} />
                              </motion.div>
                         ))}
                    </div>
               </div>
          </div>
     );
}
