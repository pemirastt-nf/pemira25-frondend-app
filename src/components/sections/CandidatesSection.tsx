"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface Candidate {
    id: string;
    name: string;
    vision: string;
    mission: string;
    photoUrl: string | null;
    orderNumber: number;
    programs: string[] | null;
    isBlankBox?: boolean;
}

interface CandidatesSectionProps {
    candidates?: Candidate[];
}

export default function CandidatesSection({ candidates = [] }: CandidatesSectionProps) {
     return (
          <section id="candidates" className="py-24 bg-white relative overflow-hidden">
               {/* Background Elements */}
               <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>
               <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10"></div>
               <div className="absolute left-0 bottom-1/4 w-1/4 h-1/4 bg-purple-50/50 rounded-full blur-3xl pointer-events-none -z-10"></div>
               
               <Star className="absolute bottom-20 right-10 w-8 h-8 text-blue-500/20 animate-pulse hidden md:block -rotate-12" fill="currentColor" />

               <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                         <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                              Kenali Calon Pemimpin Anda
                         </h2>
                         <p className="text-gray-600 text-lg leading-relaxed">
                              Pelajari visi, misi, dan program kerja mereka untuk masa depan organisasi yang lebih baik.
                         </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-10">
                         {candidates.map((candidate) => (
                              <div 
                                   key={candidate.id} 
                                   className="group w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                              >
                                   {/* Image Container */}
                                   <div className="relative aspect-4/5 w-full bg-gray-100 overflow-hidden">
                                        <Image
                                             src={candidate.photoUrl || '/assets/placeholder-candidate.png'}
                                             alt={candidate.name}
                                             fill
                                             className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
                                        
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 w-12 h-12 flex items-center justify-center rounded-xl font-bold text-xl shadow-lg shadow-black/5">
                                             {candidate.orderNumber}
                                        </div>

                                        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                                             {candidate.isBlankBox ? (
                                                  <>
                                                       <h3 className="text-2xl font-bold leading-tight mb-1 text-white">Kotak Kosong</h3>
                                                       <p className="text-white/70 text-sm font-medium uppercase tracking-wider">Tidak memilih kandidat manapun</p>
                                                  </>
                                             ) : (
                                                  <>
                                                       <h3 className="text-2xl font-bold leading-tight mb-1 text-white">
                                                            {candidate.name}
                                                       </h3>
                                                       <p className="text-white/80 text-sm font-medium uppercase tracking-wider">
                                                            Calon PRESMA & WAPRESMA BEM IM STTNF
                                                       </p>
                                                  </>
                                             )}
                                        </div>
                                   </div>

                                   {/* Content */}
                                   {!candidate.isBlankBox && (
                                   <div className="p-6">
                                        <Accordion type="single" collapsible className="w-full">
                                             <AccordionItem value="details" className="border-b-0">
                                                  <AccordionTrigger className="hover:no-underline py-2 group-data-[state=open]:text-primary">
                                                       <span className="font-semibold text-gray-700 text-sm">Lihat Visi & Misi Lengkap</span>
                                                  </AccordionTrigger>
                                                  <AccordionContent className="pt-4 space-y-6">
                                                       <div>
                                                            <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">
                                                                 <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                                                 Visi
                                                            </h4>
                                                            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                                 {candidate.vision}
                                                            </p>
                                                       </div>
                                                       
                                                       <div>
                                                            <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">
                                                                 <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                                                 Misi
                                                            </h4>
                                                            <ul className="space-y-2 text-sm text-gray-600 pl-1">
                                                                 {candidate.mission.split('\n').map((m, i) => (
                                                                      <li key={i} className="flex gap-3">
                                                                           <span className="shrink-0 w-5 h-5 rounded-full bg-gray-100 text-gray-500 font-bold text-[10px] flex items-center justify-center mt-0.5">
                                                                                {i + 1}
                                                                           </span>
                                                                           <span className="leading-relaxed">{m}</span>
                                                                      </li>
                                                                 ))}
                                                            </ul>
                                                       </div>

                                                       {candidate.programs && candidate.programs.length > 0 && (
                                                            <div>
                                                                 <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">
                                                                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                                                      Program Unggulan
                                                                 </h4>
                                                                 <ul className="space-y-2 text-sm text-gray-600 pl-1">
                                                                      {candidate.programs!.map((program, i) => (
                                                                           <li key={i} className="flex gap-3">
                                                                                <span className="shrink-0 w-5 h-5 rounded-full bg-blue-50 text-blue-600 font-bold text-[10px] flex items-center justify-center mt-0.5">
                                                                                     ★
                                                                                </span>
                                                                                <span className="leading-relaxed">{program}</span>
                                                                           </li>
                                                                      ))}
                                                                 </ul>
                                                            </div>
                                                       )}
                                                  </AccordionContent>
                                             </AccordionItem>
                                        </Accordion>
                                   </div>
                                   )}
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
}
