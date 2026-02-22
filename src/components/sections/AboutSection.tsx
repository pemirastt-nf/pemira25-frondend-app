"use client";

import Image from "next/image";
import { Star } from "lucide-react";

export default function AboutSection() {
     return (
          <section id="about" className="py-24 bg-gray-50 overflow-hidden relative">
               <Star className="absolute top-12 left-10 w-6 h-6 text-yellow-400/60 animate-pulse hidden md:block rotate-12" fill="currentColor" />

               <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                         
                         {/* Text Content */}
                         <div className="w-full lg:w-1/2">
                              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                                   Mewujudkan <span className="text-primary">Demokrasi</span> dalam Bingkai <span className="text-secondary">Kemahasiswaan</span>
                              </h2>
                              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                   <p>
                                        <span className="text-primary font-bold">Pemilihan Raya</span> adalah pesta demokrasi tertinggi di IM STT NF yang diselenggarakan oleh Penyelenggara PEMIRA untuk memilih Anggota <span className="text-orange-500 font-bold">DPM IM STT NF</span> serta Presiden Mahasiswa dan Wakil Presiden Mahasiswa <span className="text-[#041BB5] font-bold">BEM IM STT NF</span>.
                                   </p>
                                   <p>
                                        Ini momentum bagi setiap mahasiswa untuk menggunakan hak suaranya dalam menentukan arah gerak, advokasi dan kepemimpinan mahasiswa STT NF.
                                   </p>
                              </div>
                         </div>

                         {/* Visual Collage */}
                         <div className="w-full lg:w-1/2 relative min-h-100">
                              {/* Background Blob */}
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>

                              <div className="grid grid-cols-2 gap-8">
                                   <div className="space-y-4 pt-8">
                                        <div className="relative aspect-3/4 w-full bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition-transform duration-500">
                                             <Image 
                                                  src="https://i.ibb.co.com/nsrQNkGB/IMG-7105.jpg" 
                                                  alt="Kegiatan Mahasiswa 1" 
                                                  fill
                                                  className="object-cover"
                                             />
                                        </div>
                                        <div className="relative aspect-square w-full bg-white rounded-2xl shadow-lg overflow-hidden translate-x-4">
                                             <Image 
                                                  src="https://i.ibb.co.com/WNWLRdWV/IMG-7330.jpg" 
                                                  alt="Kegiatan Mahasiswa 2" 
                                                  fill
                                                  className="object-cover"
                                             />
                                        </div>
                                   </div>
                                   <div className="space-y-4">
                                        <div className="relative aspect-square w-full bg-white rounded-2xl shadow-lg overflow-hidden -translate-x-4">
                                             <Image 
                                                  src="https://i.ibb.co.com/zHBHMtqz/IMG-7456.jpg" 
                                                  alt="Kegiatan Mahasiswa 3" 
                                                  fill
                                                  className="object-cover"
                                             />
                                        </div>
                                        <div className="relative aspect-3/4 w-full bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition-transform duration-500">
                                             <Image 
                                                  src="https://i.ibb.co.com/dwRJnz8m/MG-9392.jpg"
                                                  alt="Demokrasi Kampus" 
                                                  fill
                                                  className="object-cover"
                                             />
                                             <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}
