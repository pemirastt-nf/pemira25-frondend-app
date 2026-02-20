"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function TutorialSection() {
     return (
          <section id="tutorial" className="scroll-mt-24 py-20 md:py-32 bg-white border-b-4 border-black">
               <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                         
                         {/* Text Content */}
                         <div className="w-full md:w-1/2 space-y-6">
                              <motion.div
                                   initial={{ opacity: 0, x: -50 }}
                                   whileInView={{ opacity: 1, x: 0 }}
                                   viewport={{ once: true }}
                                   transition={{ duration: 0.8 }}
                              >
                                   <div className="inline-block bg-primary text-white border-2 border-black px-4 py-1 mb-4 font-mono font-bold text-sm transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        PANDUAN PEMILIHAN
                                   </div>
                                   <h2 className="font-heading text-5xl md:text-7xl uppercase leading-none mb-6 text-stroke-black">
                                        CARA MEMILIH <br/>
                                        <span className="text-primary text-stroke-black">DI PEMIRA</span>
                                   </h2>
                                   <p className="font-mono text-lg leading-relaxed border-l-4 border-black pl-4 mb-8">
                                        Bingung cara menggunakan hak suaramu? Tonton video panduan singkat ini agar suaramu sah dan terhitung! Jangan sampai salah langkah.
                                   </p>
                                   
                                   <div className="flex flex-wrap gap-4 font-mono font-bold text-sm">
                                        <div className="flex items-center gap-2 bg-neutral-cream border-2 border-black px-3 py-2 neo-shadow-sm">
                                             <span className="w-6 h-6 bg-black text-white flex items-center justify-center rounded-full">1</span>
                                             LOGIN
                                        </div>
                                        <div className="flex items-center gap-2 bg-neutral-cream border-2 border-black px-3 py-2 neo-shadow-sm">
                                             <span className="w-6 h-6 bg-black text-white flex items-center justify-center rounded-full">2</span>
                                             PILIH
                                        </div>
                                        <div className="flex items-center gap-2 bg-neutral-cream border-2 border-black px-3 py-2 neo-shadow-sm">
                                             <span className="w-6 h-6 bg-black text-white flex items-center justify-center rounded-full">3</span>
                                             KONFIRMASI
                                        </div>
                                   </div>
                              </motion.div>
                         </div>

                         {/* Video Content */}
                         <motion.div 
                              className="w-full md:w-1/2"
                              initial={{ opacity: 0, x: 50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                         >
                              <div className="relative bg-black p-2 border-4 border-black neo-shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                                   <div className="absolute -top-6 -right-6 bg-accent-blue w-16 h-16 border-4 border-black flex items-center justify-center z-10 neo-shadow-sm">
                                        <Play className="w-8 h-8 text-black fill-current" />
                                   </div>
                                   
                                   <div className="relative w-full aspect-video bg-gray-900 border-2 border-white/20 overflow-hidden">
                                        <iframe 
                                             width="100%" 
                                             height="100%" 
                                             src="https://www.youtube.com/embed/bf8t8FW4Ri4?si=6C6lEUXMGM4p-HrP" 
                                             title="Panduan Pemira" 
                                             frameBorder="0" 
                                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                             referrerPolicy="strict-origin-when-cross-origin" 
                                             allowFullScreen
                                             className="absolute inset-0 w-full h-full object-cover"
                                        ></iframe>
                                   </div>
                              </div>
                         </motion.div>
                    </div>
               </div>
          </section>
     );
}
