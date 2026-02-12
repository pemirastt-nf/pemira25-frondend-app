"use client";

import { timeline } from "@/lib/data";

export default function TimelineSection() {
     return (
          <section id="timeline" className="scroll-mt-24 py-20 md:py-32 bg-neutral-cream border-b-4 border-black">
               <div className="container mx-auto px-4 max-w-5xl">
                    {/* Header Label */}
                    <div className="mb-20 flex justify-center">
                         <div className="relative inline-block bg-neutral-cream border-4 border-black p-6 neo-shadow-lg transform -rotate-1">
                              <h2 className="font-heading text-4xl md:text-7xl uppercase leading-none text-center mb-2 text-stroke-black text-white drop-shadow-none">
                                   TIMELINE
                              </h2>
                              <div className="flex justify-center">
                                   <div className="bg-black text-white px-4 py-1 md:px-6 transform rotate-2 border-2 border-white">
                                        <p className="font-mono text-xs md:text-base font-bold uppercase tracking-widest">
                                             JADWAL PELAKSANAAN
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <div className="relative">
                         {/* Central/Left Line */}
                         <div className="absolute left-4.75 md:left-1/2 top-0 bottom-0 w-1 bg-black md:-ml-0.5 z-0"></div>

                         <div className="space-y-12">
                              {timeline.map((item, index) => (
                                   <div key={index} className={`relative flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                        {/* Spacer for Desktop */}
                                        <div className="hidden md:block md:w-1/2"></div>

                                        {/* Node Point */}
                                        <div className="absolute left-0.5 md:left-1/2 md:-translate-x-1/2 w-10 h-10 flex items-center justify-center z-10">
                                             <div className="w-6 h-6 bg-white border-4 border-black rotate-45 group-hover:bg-accent-blue group-hover:scale-125 transition-all"></div>
                                        </div>

                                        {/* Content Box Wrapper */}
                                        <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                             <div className={`bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.75 hover:translate-y-0.75 transition-all group w-full ${index % 2 === 0 ? 'items-end' : 'items-start'}`}>
                                                  <div className="inline-block bg-black text-white px-2 py-1 font-mono text-sm font-bold mb-2">
                                                       {item.date}
                                                  </div>
                                                  <h3 className="font-heading text-xl md:text-2xl uppercase leading-tight mb-2 group-hover:text-primary transition-colors">
                                                       {item.event}
                                                  </h3>
                                                  <div className={`h-1 w-12 bg-primary mb-2 ${index % 2 === 0 ? 'md:ml-auto md:mr-0' : 'mr-auto'}`}></div>
                                             </div>
                                        </div>

                                   </div>
                              ))}
                         </div>
                    </div>

                    {/* Footer Connect */}
                    <div className="mt-16 text-center">
                         <div className="inline-block border-4 border-black p-4 bg-white font-mono font-bold rotate-2 neo-shadow">
                              MASA DEPAN DIMULAI SEKARANG
                         </div>
                    </div>
               </div>


          </section>
     );
}
