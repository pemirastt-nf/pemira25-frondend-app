"use client";

import Image from "next/image";

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
                              <div className="neo-card p-6 md:p-12 relative z-10 bg-neutral-cream h-full">
                                   <h3 className="font-heading text-3xl md:text-5xl mb-4 md:mb-6">APA ITU PEMIRA?</h3>
                                   <p className="font-mono text-sm md:text-lg leading-relaxed mb-6">
                                        PEMIRA (Pemilihan Raya) adalah mekanisme demokrasi internal yang diselenggarakan oleh Ikatan Mahasiswa (IM) STT-NF untuk memilih Presiden Mahasiswa (Presma) dan Wakil Presiden Mahasiswa (Wa-Presma) periode 2026-2027. PEMIRA merupakan wujud nyata dari kedaulatan mahasiswa dalam menentukan pemimpin masa depan yang akan mewakili aspirasi dan kepentingan seluruh mahasiswa di lingkungan kampus.
                                   </p>
                                   <div className="bg-accent-blue/20 p-4 border-2 border-black neo-shadow-sm font-bold -skew-x-2">
                                        &quot;DARI MAHASISWA, OLEH MAHASISWA, UNTUK MAHASISWA.&quot;
                                   </div>
                              </div>
                              {/* Shadow Element */}
                              <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 -z-10 border-2 border-black"></div>
                         </div>

                         {/* Side Grid - Tape Collage Style */}
                         <div className="relative h-125 md:h-full w-full flex items-center justify-center p-8">
                              
                              {/* Background Pattern */}
                              <div className="absolute inset-0 opacity-10" 
                                   style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                              </div>

                              {/* Photo 1: Logic / Tech Vibe (Bottom Layer) */}
                              <div className="absolute top-10 right-10 w-48 md:w-64 aspect-video bg-white z-0 transform rotate-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] grayscale hover:grayscale-0 transition-all duration-500">
                                   <div className="p-2 h-full">
                                        <div className="h-full w-full relative bg-neutral-200 overflow-hidden">
                                             <Image 
                                                  src="https://i.ibb.co.com/nsrQNkGB/IMG-7105.jpg" 
                                                  alt="Kegiatan 2" 
                                                  fill
                                                  className="object-cover"
                                             />
                                        </div>
                                   </div>
                                   {/* Tape Element */}
                                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-300/80 transform -rotate-2 shadow-sm border border-black/10"></div>
                              </div>

                              {/* Photo 2: Discussion Vibe (Middle Layer) */}
                              <div className="absolute bottom-16 left-4 w-44 md:w-60 aspect-4/5 bg-white z-10 transform -rotate-3 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105 hover:z-30">
                                   <div className="p-2 h-full flex flex-col">
                                        <div className="grow w-full relative bg-neutral-200 overflow-hidden mb-2">
                                             <Image 
                                                  src="https://i.ibb.co.com/WNWLRdWV/IMG-7330.jpg" 
                                                  alt="Kegiatan 3" 
                                                  fill
                                                  className="object-cover"
                                             />
                                        </div>
                                   </div>
                                   {/* Tape Element */}
                                   <div className="absolute -top-4 right-10 w-20 h-8 bg-pink-400/80 transform rotate-12 shadow-sm border border-black/10"></div>
                              </div>

                              {/* Photo 3: Main Event (Top Layer) */}
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 md:w-72 aspect-square bg-white z-20 transform -rotate-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-all duration-500">
                                   <div className="p-3 h-full">
                                        <div className="h-full w-full relative bg-neutral-200 overflow-hidden border-2 border-black">
                                             <Image 
                                                  src="https://i.ibb.co.com/zHBHMtqz/IMG-7456.jpg" 
                                                  alt="Kegiatan 1" 
                                                  fill
                                                  className="object-cover"
                                             />
                                        </div>
                                   </div>
                                   {/* Corner Accent */}
                                   <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent-orange border-2 border-black"></div>
                                   <div className="absolute -top-2 -left-2 w-8 h-8 bg-accent-blue border-2 border-black"></div>
                                   
                              </div>

                              {/* Decorative 'Sticker' */}
                              <div className="absolute bottom-10 right-10 z-30 animate-bounce-slow">
                                   <div className="bg-yellow-400 text-black border-2 border-black rounded-full w-20 h-20 flex items-center justify-center font-bold text-xs text-center p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-12">
                                        SUARA<br/>KITA
                                   </div>
                              </div>

                         </div>
                    </div>
               </div>
          </section>
     );
}
