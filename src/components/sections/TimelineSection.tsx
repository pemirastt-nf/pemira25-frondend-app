"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { timeline } from "@/lib/data";

export default function TimelineSection() {
     return (
          <section id="timeline" className="py-24 bg-white relative overflow-hidden">
               <Star className="absolute top-20 right-[15%] w-8 h-8 text-yellow-400/50 animate-pulse hidden md:block rotate-12" fill="currentColor" />
               <div className="container mx-auto px-4 max-w-5xl">
                    
                    <div className="text-center mb-16">
                         <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                              Timeline <span className="text-primary">PEMIRA 2025</span>
                         </h2>
                    </div>

                    <div className="relative">
                         {/* Vertical Line */}
                         <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gray-100 -translate-x-1/2"></div>

                         <div className="space-y-8">
                              {timeline.map((item, index) => (
                                   <div key={index} className={`relative flex items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                                        
                                        {/* Spacer for desktop alignment */}
                                        <div className="hidden md:block md:w-1/2"></div>
                                        
                                        {/* Dot */}
                                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white ring-4 ring-gray-50 bg-primary z-10 mt-1.5 md:mt-0 shadow-sm"></div>
                                        
                                        {/* Content */}
                                        <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                             <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                                                  <span className="inline-block px-3 py-1 bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-lg mb-2 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                                                       {item.date}
                                                  </span>
                                                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                                                       {item.event}
                                                  </h3>
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>

                    <div className="mt-20 text-center">
                         <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 max-w-2xl mx-auto">
                              <h3 className="text-xl font-bold text-gray-900 mb-2">Jangan Lewatkan Hak Pilih Anda!</h3>
                              
                              <Link
                                   href="/vote"
                                   className="inline-flex items-center justify-center h-12 px-8 rounded-xl font-semibold bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-light transition-all hover:-translate-y-0.5"
                              >
                                   Mulai Memilih
                              </Link>
                         </div>
                    </div>
               </div>
          </section>
     );
}
