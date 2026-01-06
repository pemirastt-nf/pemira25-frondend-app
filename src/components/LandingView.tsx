/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { timeline, tutorialSteps } from "@/lib/data";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingView({ stats }: { stats: { totalVoters: number; votesCast: number; turnout: string } }) {

     return (
          <div className="flex flex-col gap-16 md:gap-24 pb-24">
               {/* Hero Section */}
               <section id="hero" className="relative pt-8 pb-12 lg:pt-20 lg:pb-24 overflow-hidden">

                    {/* Background Pattern - Dot Grid */}
                    <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-cream bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                         {/* Left: Text Content */}
                         <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.8 }}
                              className="text-center lg:text-left z-10"
                         >

                              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-slate-900 leading-[1.1]">
                                   Saatnya <span className="text-primary">Memilih</span><br />
                                   <span className="text-primary">Pemimpin </span>Baru
                              </h1>

                              <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                   PEMIRA STT Terpadu Nurul Fikri merupakan sarana resmi pemilihan pimpinan mahasiswa yang menjunjung tinggi nilai integritas, partisipasi aktif, dan tanggung jawab bersama demi masa depan kampus yang lebih baik.
                              </p>

                              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                                   <Link href="/vote" className="w-full sm:w-auto">
                                        <Button size="lg" className="w-full sm:w-auto rounded-full text-base font-bold h-14 px-8 bg-primary hover:bg-primary-light text-white shadow-xl shadow-primary/20 hover:scale-105 transition-all duration-300">
                                             Vote Sekarang <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                   </Link>
                                   <Link href="/candidates" className="w-full sm:w-auto">
                                        <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base font-bold h-14 px-8 bg-white/50 border-slate-300 hover:bg-white hover:text-primary transition-all duration-300">
                                             Lihat Kandidat
                                        </Button>
                                   </Link>
                              </div>
                         </motion.div>

                         {/* Right: Floating Visual (Logo) */}
                         <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="relative hidden lg:flex items-center justify-center h-125 w-full"
                         >
                              {/* Abstract Decorative blobs */}
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-primary/10 rounded-full blur-3xl -z-10" />

                              {/* Floating Logo */}
                              <div
                                   className="relative z-20 w-96 h-96 lg:w-125 lg:h-125"
                              >
                                   <Image
                                        src="https://cdn.pemira.oktaa.my.id/pemira-logo-text.svg"
                                        alt="Logo PEMIRA STTNF"
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        priority
                                   />
                              </div>
                         </motion.div>
                    </div>
               </section>

               {/* About & Timeline Section (User Requested Design) */}
               <section id="about" className="container mx-auto px-4 py-8">
                    <div className="mb-16 text-center max-w-3xl mx-auto">
                         <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                              Tentang <span className="text-primary">PEMIRA</span>
                         </h2>
                         <p className="text-lg text-slate-600 leading-relaxed">
                              PEMIRA STT Terpadu Nurul Fikri merupakan sarana resmi pemilihan pimpinan mahasiswa yang menjunjung tinggi nilai demokrasi, integritas, dan transparansi demi masa depan kampus yang lebih baik.
                         </p>
                    </div>

                    <div className="relative">
                         {/* Mobile Vertical Line */}
                         <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary -translate-x-1/2 md:hidden rounded-full"></div>

                         <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-6">
                              {timeline.length === 0 ? (
                                   <div className="col-span-full py-12 text-center">
                                        <p className="text-slate-500 italic">Belum ada informasi jadwal yang tersedia saat ini.</p>
                                   </div>
                              ) : (
                                   timeline.map((item: { event: string; date: string }, i: number) => {
                                        const styles = [
                                             { bg: "bg-blue-100" },
                                             { bg: "bg-blue-200" },
                                             { bg: "bg-orange-100" },
                                             { bg: "bg-orange-200" }
                                        ];
                                        const style = styles[i % styles.length];
                                        const isEven = i % 2 === 0;

                                        return (
                                             <div key={i} className={`
                                             relative flex items-center md:flex-col md:h-full group
                                             ${isEven ? 'flex-row' : 'flex-row-reverse'}
                                             mb-8 md:mb-0
                                        `}>
                                                  {/* Card Content */}
                                                  <div className={`
                                                  w-[calc(50%-5px)] hover:-translate-y-2 md:w-full
                                                  ${isEven ? 'text-right pr-4 md:text-center md:pr-0' : 'text-left pl-4 md:text-center md:pl-0'}
                                                  transition-all duration-300 z-10 md:h-full md:flex md:flex-col md:justify-center
                                             `}>
                                                       <div className={`${style.bg} w-full rounded-xl p-4 md:p-6 shadow-sm border border-white/50 hover:shadow-md transition-shadow`}>
                                                            <h3 className="font-bold text-slate-800 text-sm md:text-base mb-1">{item.event}</h3>
                                                            <p className="text-xs font-semibold text-slate-600 bg-white/40 inline-block px-2 py-0.5 rounded-md">{item.date}</p>
                                                       </div>
                                                  </div>

                                                  {/* Center Dot (Mobile) & Connector (Desktop) */}
                                                  <div className={`
                                                  absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                                                  md:static md:translate-x-0 md:translate-y-0 md:w-full md:flex md:items-center md:justify-center md:-mt-3
                                                  z-20
                                             `}>
                                                       {/* Desktop Connecting Line */}
                                                       {i < timeline.length - 1 && (
                                                            <div className="hidden md:block absolute top-1/2 left-1/2 w-[calc(100%+1.5rem)] h-2 -translate-y-1/2 z-0 bg-slate-600">
                                                                 <div className="w-full h-full bg-primary"></div>
                                                            </div>
                                                       )}

                                                       {/* The Dot */}
                                                       <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm z-20 md:relative ${style.bg.replace('bg-', 'bg-slate-400')}`}>
                                                            <div className={`w-full h-full rounded-full ${style.bg.replace('bg-', 'text-') === 'text-white' ? 'bg-slate-500' : 'bg-current'}`}></div>
                                                       </div>
                                                  </div>

                                                  {/* Mobile Spacer (to balance the flex row) */}
                                                  <div className="w-[calc(50%-20px)] md:hidden"></div>
                                             </div>
                                        );
                                   })
                              )}
                         </div>
                    </div>
               </section >

               {/* Tutorial Section (Redesigned) */}
               <section id="tutorial" className="container mx-auto px-4 py-20">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                         <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                              Cara Melakukan <span className="text-primary">Voting</span>
                         </h2>
                         <p className="text-lg text-p leading-relaxed">
                              Ikuti 4 langkah mudah berikut untuk menggunakan hak suaramu.
                         </p>
                    </div>

                    {/* Step Cards with Illustration Style */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 relative z-10">
                         {tutorialSteps.map((item, index) => (
                              <div key={index} className="bg-white rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col group overflow-hidden">
                                   {/* Illustration Area (Full Bleed) */}
                                   <div className={`w-full aspect-video relative ${item.color} flex items-center justify-center overflow-hidden`}>
                                        <div className="w-full h-full relative">
                                             <Image
                                                  src={item.image}
                                                  alt={item.title}
                                                  fill
                                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                  className="object-cover"
                                             />
                                        </div>

                                        {/* Step Badge */}
                                        <div className={`absolute top-4 left-4 w-10 h-10 rounded-full ${item.badge} text-white flex items-center justify-center font-bold text-lg shadow-md border-2 border-white ring-2 ring-white/20 z-10`}>
                                             {item.step}
                                        </div>
                                   </div>

                                   {/* Content */}
                                   <div className="p-4 text-center flex-1 flex flex-col">
                                        <h3 className="font-bold text-slate-900 text-lg mb-2 leading-tight flex items-center justify-center">
                                             {item.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">
                                             {item.desc}
                                        </p>
                                   </div>
                              </div>
                         ))}
                    </div>

                    {/* Video Container (Optional Detail) */}
                    <div className="text-center mb-8">
                         <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-4">— Atau tonton video selengkapnya —</p>
                    </div>

                    <motion.div
                         initial={{ opacity: 0, scale: 0.95 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.8 }}
                         className="max-w-4xl mx-auto"
                    >
                         {/* Browser Window Frame */}
                         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200/60 ring-1 ring-slate-900/5">
                              {/* Browser Header */}
                              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                                   <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                   </div>
                                   <div className="mx-auto bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-400 font-medium flex items-center gap-1.5 min-w-50 justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                             <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.696l5.925-2.662 5.925 2.662a.75.75 0 001.075-.696V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clipRule="evenodd" />
                                        </svg>
                                        panduan-pemira.mp4
                                   </div>
                              </div>

                              {/* Video Container */}
                              <div className="relative w-full pb-[56.25%] bg-slate-900">
                                   <iframe
                                        src="https://www.youtube.com/embed/ym1GnhgPJ_g?si=CvfbcHRbP1tSIwsj"
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                        className="absolute top-0 left-0 w-full h-full"
                                   ></iframe>
                              </div>
                         </div>
                    </motion.div>
               </section>

               {/* FAQ Section */}
               <section id="faq" className="container mx-auto px-4 pb-24 pt-10">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                         <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                              Tanya Jawab <span className="text-primary">Umum</span>
                         </h2>
                         <p className="text-lg text-slate-600 leading-relaxed">
                              Jawaban untuk pertanyaan yang sering diajukan seputar PEMIRA.
                         </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                         <Accordion type="single" collapsible className="space-y-4">
                              <AccordionItem value="item-1" className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden px-2">
                                   <AccordionTrigger className="text-left text-lg font-semibold text-slate-800 hover:text-primary hover:no-underline px-6">
                                        Apa itu PEMIRA STT-NF?
                                   </AccordionTrigger>
                                   <AccordionContent className="text-slate-600 text-base leading-relaxed px-6 pb-6">
                                        PEMIRA (Pemilihan Raya) STT-NF adalah pesta demokrasi mahasiswa untuk memilih Presiden Mahasiswa (Presma) dan Wakil Presiden Mahasiswa (Wapresma) periode selanjutnya. Ini adalah kesempatan bagimu untuk menentukan masa depan kampus.
                                   </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-2" className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden px-2">
                                   <AccordionTrigger className="text-left text-lg font-semibold text-slate-800 hover:text-primary hover:no-underline px-6">
                                        Siapa yang berhak memilih?
                                   </AccordionTrigger>
                                   <AccordionContent className="text-slate-600 text-base leading-relaxed px-6 pb-6">
                                        Seluruh mahasiswa aktif STT Terpadu Nurul Fikri yang terdaftar pada semester berjalan berhak memberikan suaranya dalam PEMIRA. Pastikan status kemahasiswaanmu aktif.
                                   </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-3" className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden px-2">
                                   <AccordionTrigger className="text-left text-lg font-semibold text-slate-800 hover:text-primary hover:no-underline px-6">
                                        Bagaimana cara login untuk voting?
                                   </AccordionTrigger>
                                   <AccordionContent className="text-slate-600 text-base leading-relaxed px-6 pb-6">
                                        Kamu bisa login menggunakan akun email mahasiswa STT-NF. Sistem akan mengirimkan kode OTP (One-Time Password) ke email tersebut sebagai verifikasi keamanan sebelum kamu bisa memberikan suara.
                                   </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-4" className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden px-2">
                                   <AccordionTrigger className="text-left text-lg font-semibold text-slate-800 hover:text-primary hover:no-underline px-6">
                                        Apakah pilihan saya bersifat rahasia?
                                   </AccordionTrigger>
                                   <AccordionContent className="text-slate-600 text-base leading-relaxed px-6 pb-6">
                                        Ya, mutlak! Sistem kami menggunakan enkripsi untuk memastikan pilihanmu tersimpan secara anonim. Tidak ada yang bisa melihat siapa yang kamu pilih, bahkan panitia sekalipun. LUBER JURDIL!
                                   </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-5" className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden px-2">
                                   <AccordionTrigger className="text-left text-lg font-semibold text-slate-800 hover:text-primary hover:no-underline px-6">
                                        Kapan hasil pemilihan diumumkan?
                                   </AccordionTrigger>
                                   <AccordionContent className="text-slate-600 text-base leading-relaxed px-6 pb-6">
                                        Hasil pemilihan akan diumumkan secara Real Count setelah periode voting ditutup, sesuai dengan jadwal yang tertera pada bagian Timeline di halaman ini. Pantau terus websitenya!
                                   </AccordionContent>
                              </AccordionItem>
                         </Accordion>
                    </div>
               </section>
          </div>
     );
}
