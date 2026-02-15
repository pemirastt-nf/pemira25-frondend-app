"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
     return (
          <section className="relative min-h-[70vh] md:min-h-[90vh] flex flex-col justify-center items-center overflow-hidden border-b-4 border-black bg-neutral-cream pb-16">
               <div id="home" className="absolute top-0 left-0 w-full h-1 -translate-y-32" />
               {/* Background Decor */}
               {/* <div className="absolute inset-0 dot-pattern pointer-events-none" /> */}

               {/* Abstract Shapes */}
               <div className="absolute top-10 right-5 md:top-20 md:right-10 w-20 h-20 md:w-32 md:h-32 bg-primary-light border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-50 blur-sm" />
               <div className="hidden md:flex absolute bottom-20 left-5 md:bottom-30 md:left-10 w-24 h-24 md:w-48 md:h-48 bg-accent-blue/20 border-2 border-black rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />

               <div className="container mx-auto px-4 z-10 text-center">
                    <motion.div
                         initial={{ opacity: 0, y: 50 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                         <h1 className="font-heading text-8xl lg:text-[10rem] leading-[0.9] text-black uppercase mb-6 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                              PEMIRA <br />
                              <span className="text-primary text-stroke-black">2025</span>
                         </h1>
                         <p className="font-mono text-xs sm:text-sm md:text-lg max-w-xl mx-auto mb-10 border-l-4 border-black pl-4 text-center bg-white/50 p-4 neo-shadow-sm">
                             SUKSESKAN, TUNTASKAN! TENTUKAN PILIHANMU HARI INI.
                         </p>

                         <Link href="/vote" className="neo-button text-xl md:text-2xl py-4 px-10 md:px-12 hover:bg-white hover:text-black">
                              VOTE SEKARANG
                         </Link>
                    </motion.div>
               </div>

               {/* Marquee */}
               <div className="absolute bottom-0 left-0 w-full bg-black text-white py-3 border-t-4 border-black overflow-hidden whitespace-nowrap">
                    <div className="animate-marquee inline-block font-mono font-bold text-lg md:text-xl">
                         • GUNAKAN HAK PILIH • JANGAN GOLPUT • PEMIRA IM STT-NF 2025 • TRANSMISI KEBAIKAN • SUARA MAHASISWA • DEMOKRASI •
                         GUNAKAN HAK PILIH • JANGAN GOLPUT • PEMIRA IM STT-NF 2025 • TRANSMISI KEBAIKAN • SUARA MAHASISWA • DEMOKRASI •
                    </div>
               </div>


          </section>
     );
}
