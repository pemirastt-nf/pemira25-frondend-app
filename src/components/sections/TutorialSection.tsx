"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function TutorialSection() {
     return (
          <section id="tutorial" className="py-24 bg-gray-50 overflow-hidden relative">
               <Star className="absolute top-20 right-[5%] w-8 h-8 text-yellow-400/40 animate-pulse hidden md:block rotate-12" fill="currentColor" />
               <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                         
                         {/* Text Content */}
                         <div className="w-full lg:w-1/2 space-y-8">
                              <motion.div
                                   initial={{ opacity: 0, y: 20 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true }}
                                   transition={{ duration: 0.6 }}
                              >
                                   <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                                        Cara Menggunakan <span className="text-secondary">Hak Suara</span> Anda
                                   </h2>
                                   <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                        Ikuti langkah-langkah mudah berikut untuk berpartisipasi dalam Pemira 2025. Suara Anda sangat berarti.
                                   </p>
                                   
                                   <div className="space-y-6">
                                        {[
                                             { title: "Login", desc: "Masuk menggunakan email mahasiswa NF.", icon: "1" },
                                             { title: "Pilih Kandidat", desc: "Pelajari visi misi dan tentukan pilihan.", icon: "2" },
                                             { title: "Konfirmasi", desc: "Verifikasi pilihan Anda untuk menyelesaikan.", icon: "3" }
                                        ].map((step, i) => (
                                             <div key={i} className="flex gap-4 items-start group">
                                                  <div className="shrink-0 w-10 h-10 rounded-full bg-white border border-gray-200 text-primary font-bold flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                                                       {step.icon}
                                                  </div>
                                                  <div>
                                                       <h4 className="font-bold text-gray-900 text-lg">{step.title}</h4>
                                                       <p className="text-gray-500">{step.desc}</p>
                                                  </div>
                                             </div>
                                        ))}
                                   </div>
                              </motion.div>
                         </div>

                         {/* Video Content */}
                         <motion.div 
                              className="w-full lg:w-1/2"
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8 }}
                         >
                              <div className="relative group rounded-2xl overflow-hidden shadow-2xl shadow-gray-200">
                                   <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none z-10"></div>
                                   
                                   <div className="relative w-full aspect-video bg-gray-900">
                                        <iframe 
                                             width="100%" 
                                             height="100%" 
                                             src="https://www.youtube.com/embed/aEQNsgxnIS4?si=beRpqcxTZt4e-eXe" 
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
