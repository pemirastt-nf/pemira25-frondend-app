"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

export default function HeroSection() {
     const { scrollY } = useScroll();
     const y = useTransform(scrollY, [0, 500], [0, 200]);

     return (
          <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-white pb-20 pt-10">
               <div id="home" className="absolute top-0 left-0 w-full h-1 -translate-y-32" />

               {/* Vivid Background Elements */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(15,98,254,0.1),rgba(255,255,255,0))]" />
               <motion.div style={{ y }} className="absolute top-20 right-[10%] w-72 h-72 bg-linear-to-br from-primary/20 to-secondary/20 rounded-full blur-[100px] opacity-60" />
               <motion.div style={{ y: useTransform(scrollY, [0, 500], [0, -100]) }} className="absolute bottom-20 left-[10%] w-96 h-96 bg-linear-to-tr from-accent-blue/20 to-accent-yellow/10 rounded-full blur-[120px] opacity-60" />

               <div className="container mx-auto px-4 z-10 text-center relative">
                    <motion.div
                         initial={{ opacity: 0, y: 30 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.8, ease: "easeOut" }}
                         className="relative"
                    >
                         {/* Decorative Elements */}
                         <Star className="absolute -top-8 left-[15%] w-8 h-8 text-accent-yellow animate-pulse hidden md:block rotate-12" fill="currentColor" />
                         <Star className="absolute bottom-10 right-[20%] w-6 h-6 text-secondary hidden md:block -rotate-12 opactiy-80" fill="currentColor" />

                         <h1 className="font-heading font-extrabold text-5xl sm:text-7xl lg:text-8xl leading-[1.1] md:leading-[1.1] text-slate-900 mb-8 tracking-tight">
                              Pemilihan Raya<br className="hidden md:block" />
                              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-blue-500 to-secondary animate-gradient-x">
                                   2025
                              </span>
                         </h1>

                         <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                              Gunakan hak suara Anda dalam <span className="text-primary font-bold">PEMIRA IM STT NF</span> dengan bijak.
                              Suara Anda menetukan arah kebijakan Organisasi Kemahasiswaan STT NF pada periode mendatang.
                         </p>

                         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                              <Link href="/vote" className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-primary px-8 font-medium text-white shadow-lg transition-all hover:bg-primary-light hover:scale-105 hover:shadow-primary/30">
                                   <span className="mr-2 text-lg font-bold">Vote Sekarang</span>
                                   <ArrowRight className="mx-auto block transition-all group-hover:translate-x-1" />
                                   <div className="absolute inset-0 -z-10 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:animate-shimmer" />
                              </Link>

                              <Link href="#candidates" className="inline-flex h-14 items-center justify-center rounded-full border-2 border-slate-200 bg-transparent px-8 text-lg font-bold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900">
                                   Lihat Kandidat
                              </Link>
                         </div>
                    </motion.div>
               </div>

               {/* Bottom Blur Fade */}
               <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-white to-transparent" />
          </section>
     );
}
