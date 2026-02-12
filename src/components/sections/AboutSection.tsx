"use client";

import { Handshake, FileText, Megaphone } from "lucide-react";

export default function AboutSection() {
     return (
          <section id="about" className="scroll-mt-24 py-20 md:py-32 bg-white border-b-4 border-black">
               <div className="container mx-auto px-4">
                    {/* Header Label */}
                    {/* Header Label */}
                    <div className="mb-20 flex justify-center">
                         <div className="relative inline-block bg-white border-4 border-black p-6 neo-shadow-lg transform rotate-1">
                              {/* Decorative Corners */}
                              <div className="absolute -top-3 -left-3 w-6 h-6 bg-black border-2 border-white"></div>
                              <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-black border-2 border-white"></div>

                              <h2 className="font-heading text-4xl md:text-7xl uppercase leading-none text-center mb-2">
                                   ABOUT <span className="text-secondary">PEMIRA</span>
                              </h2>
                              <div className="bg-black text-white px-4 py-1 inline-block transform -rotate-2">
                                   <p className="font-mono text-sm md:text-base font-bold uppercase tracking-widest">
                                        TENTANG PEMIRA
                                   </p>
                              </div>
                         </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                         {/* Main Content Card (Folder Style) */}
                         <div className="relative group mt-8 lg:mt-0">
                              {/* Tab */}
                              <div className="absolute -top-8 left-0 bg-black text-white px-4 py-1 md:px-6 md:py-2 font-mono text-sm md:text-base font-bold border-2 border-black border-b-0">
                                   DEFINISI.TXT
                              </div>
                              <div className="neo-card p-6 md:p-12 relative z-10 bg-neutral-cream h-full">
                                   <h3 className="font-heading text-3xl md:text-5xl mb-4 md:mb-6">APA ITU PEMIRA?</h3>
                                   <p className="font-mono text-sm md:text-lg leading-relaxed mb-6">
                                        Wujud nyata demokrasi mahasiswa. Di sini, setiap suara punya kuasa untuk menunjuk pemimpin masa depan. Mari ciptakan ekosistem politik kampus yang sehat, transparan, dan berintegritas tinggi.
                                   </p>
                                   <div className="bg-accent-blue/20 p-4 border-2 border-black neo-shadow-sm font-bold -skew-x-2">
                                        &quot;DARI MAHASISWA, OLEH MAHASISWA, UNTUK MAHASISWA.&quot;
                                   </div>
                              </div>
                              {/* Shadow Element */}
                              <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 -z-10 border-2 border-black"></div>
                         </div>

                         {/* Side Grid - Bento Style */}
                         <div className="grid grid-cols-1 gap-6">
                              {/* Card 1 */}
                              <div className="bg-primary text-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-start gap-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                                   <Handshake size={48} strokeWidth={2.5} className="text-accent-blue" />
                                   <div>
                                        <h4 className="font-heading text-2xl mb-2">KEDAULATAN</h4>
                                        <p className="font-mono text-sm leading-tight text-white/90">Wujud tertinggi aspirasi mahasiswa dalam menentukan pemimpin masa depan.</p>
                                   </div>
                              </div>

                              {/* Card 2 */}
                              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-start gap-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                                   <FileText size={48} strokeWidth={2.5} className="text-primary-light" />
                                   <div>
                                        <h4 className="font-heading text-2xl mb-2">LUBER JURDIL</h4>
                                        <p className="font-mono text-sm leading-tight text-slate-700">Langsung, Umum, Bebas, Rahasia, Jujur, dan Adil sebagai landasan demokrasi.</p>
                                   </div>
                              </div>

                              {/* Card 3 */}
                              <div className="bg-accent-orange border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-start gap-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                                   <Megaphone size={48} strokeWidth={2.5} className="text-black" />
                                   <div>
                                        <h4 className="font-heading text-2xl mb-2">AKUNTABILITAS</h4>
                                        <p className="font-mono text-sm leading-tight text-black">Penyelenggaraan yang transparan dan dapat dipertanggungjawabkan.</p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}
