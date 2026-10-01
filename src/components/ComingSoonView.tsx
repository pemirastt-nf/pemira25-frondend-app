"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

export default function ComingSoonView() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-neutral-cream selection:bg-primary/20 selection:text-primary">
      {/* Ambient Background & Grid */}
      <div className="absolute inset-0 dot-pattern pointer-events-none -z-10" />

      {/* Vibrant Floating Blur Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 right-[5%] w-80 sm:w-[480px] h-80 sm:h-[480px] bg-linear-to-br from-primary/20 via-blue-400/15 to-secondary/15 rounded-full blur-[110px] pointer-events-none -z-10"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-24 left-[5%] w-80 sm:w-[500px] h-80 sm:h-[500px] bg-linear-to-tr from-accent-blue/30 via-primary/10 to-accent-yellow/15 rounded-full blur-[120px] pointer-events-none -z-10"
      />

      {/* Main Hero & Content (Integrated Logo Teaser) */}
      <main className="grow flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl w-full mx-auto text-center flex flex-col items-center">
          {/* Integrated Brand Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-100 p-3 sm:p-4">
              <Image
                src="https://cdn.pemira.oktaa.my.id/pemira-logo.svg"
                alt="Logo PEMIRA STTNF"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-slate-900 leading-[1.08] mb-6"
          >
            Pemilihan Raya <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-blue-600 to-secondary">
              2026 Coming Soon
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Satu suara menentukan arah pergerakan dan masa depan kampus. Seluruh
            layanan pemilihan saat ini sedang dipersiapkan untuk menyambut{" "}
            <span className="text-primary font-bold">PEMIRA IM STTNF 2026</span>
            .
          </motion.p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 sm:px-8 border-t border-slate-200/60 bg-white/50 backdrop-blur-xs relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              &copy; 2026{" "}
              <strong className="text-slate-800">
                PEMIRA IM STT Terpadu Nurul Fikri
              </strong>
              . All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="https://www.instagram.com/pemirasttnf/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>@pemirasttnf</span>
            </Link>
            <Link
              href="https://nurulfikri.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
            >
              nurulfikri.ac.id
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
