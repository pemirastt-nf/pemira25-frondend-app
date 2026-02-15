"use client";

import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface Candidate {
    id: string;
    name: string;
    vision: string;
    mission: string;
    photoUrl: string | null;
    orderNumber: number;
    programs: string | null;
}

interface CandidatesSectionProps {
    candidates?: Candidate[];
}

export default function CandidatesSection({ candidates = [] }: CandidatesSectionProps) {
     return (
          <section id="candidates" className="scroll-mt-24 py-20 md:py-32 bg-white border-b-4 border-black">
               <div className="container mx-auto px-4">
                    {/* Header Label */}
                    <div className="mb-20 flex justify-center">
                         <div className="relative bg-accent-blue border-4 border-black p-6 md:p-8 neo-shadow-lg max-w-4xl w-full text-center">
                              {/* Tape Effect */}
                              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/10 rotate-2 backdrop-blur-sm border-l-2 border-r-2 border-white/20"></div>

                              <h2 className="font-heading text-5xl md:text-7xl uppercase tracking-tighter mb-2">
                                   THE CANDIDATES
                              </h2>
                              <div className="inline-block bg-black text-white px-4 py-1 transform rotate-1">
                                   <p className="font-mono text-sm md:text-lg font-bold uppercase tracking-widest">
                                        KENALI CALON PRESMA dan WA-PRESMA
                                   </p>
                              </div>
                         </div>
                    </div>

                    <div className="flex flex-wrap justify-center items-start gap-8 md:gap-12">
                         {candidates.map((candidate) => (
                              <div key={candidate.id} className="group relative w-full max-w-sm grow-0">
                                   {/* The Card */}
                                   <div className="h-full bg-neutral-cream border-4 border-black p-4 neo-shadow-lg transition-transform duration-200 group-hover:-translate-y-2 group-hover:translate-x-1 flex flex-col">
                                        {/* Mugshot Area */}
                                        <div className="bg-slate-200 border-2 border-black aspect-3/4 mb-4 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 shrink-0">
                                             <Image
                                                  src={candidate.photoUrl || '/assets/placeholder-candidate.png'}
                                                  alt={candidate.name}
                                                  fill
                                                  className="object-cover object-top"
                                             />
                                             <div className="absolute top-2 left-2 bg-black text-white px-3 py-1 font-heading text-xl md:text-2xl border-2 border-white">
                                                  #{candidate.orderNumber}
                                             </div>
                                        </div>

                                        {/* Name Plate */}
                                        <div className="text-center mb-6">
                                             <h3 className="font-heading text-2xl md:text-3xl leading-none mb-1 uppercase bg-white border-2 border-black inline-block px-2 rotate-1">
                                                  {candidate.name}
                                             </h3>
                                        </div>

                                        {/* Details Accordion */}
                                        <Accordion type="single" collapsible className="w-full bg-white border-2 border-black">
                                             <AccordionItem value="visimisi" className="border-b-0">
                                                  <AccordionTrigger className="px-4 py-3 font-mono font-bold hover:bg-yellow-100 hover:no-underline border-b-2 border-black">
                                                       &gt; LIHAT GRAND DESAIN KANDIDAT
                                                  </AccordionTrigger>
                                                  <AccordionContent className="px-4 py-4 font-mono text-sm bg-neutral-50">
                                                       <div className="mb-4">
                                                            <strong className="block uppercase border-b border-black mb-1">VISI:</strong>
                                                            <p>{candidate.vision}</p>
                                                       </div>
                                                       <div>
                                                            <strong className="block uppercase border-b border-black mb-1">MISI:</strong>
                                                            <ul className="list-disc pl-4 space-y-1">
                                                                 {candidate.mission.split('\n').map((m, i) => (
                                                                      <li key={i}>{m}</li>
                                                                 ))}
                                                            </ul>
                                                       </div>
                                                       {candidate.programs && (
                                                            <div className="mt-4">
                                                                 <strong className="block uppercase border-b border-black mb-1">PROGRAM UNGGULAN:</strong>
                                                                 <ul className="list-disc pl-4 space-y-1">
                                                                      {candidate.programs.split('\n').map((program, i) => (
                                                                           <li key={i}>{program}</li>
                                                                      ))}
                                                                 </ul>
                                                            </div>
                                                       )}
                                                  </AccordionContent>
                                             </AccordionItem>
                                        </Accordion>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
}
