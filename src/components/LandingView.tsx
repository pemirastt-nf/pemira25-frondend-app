"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { timeline } from "@/lib/data";
import AboutSection from "@/components/AboutSection";
import { Calendar, Users, Vote, TrendingUp, ChevronRight } from "lucide-react";
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
                                   Suaramu <span className="underline decoration-secondary decoration-4 underline-offset-4">Menentukan</span> <br />
                                   <span className="text-primary">Masa Depan.</span>
                              </h1>

                              <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                   Wujudkan demokrasi kampus yang jujur, adil, dan transparan. Satu suara darimu adalah langkah besar untuk STT Terpadu Nurul Fikri yang lebih gemilang.
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

                         {/* Right: Floating Visual (CSS Only) */}
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
                              <motion.div
                                   animate={{ y: [0, -20, 0] }}
                                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                   className="relative z-20 w-80 h-80 md:w-96 md:h-96"
                              >
                                   <Image
                                        src="/pemira-logo.png"
                                        alt="Logo PEMIRA STTNF"
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        priority
                                   />
                              </motion.div>
                         </motion.div>
                    </div>
               </section>

               {/* Stats Section */}
               <section id="stats" className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 }}
                         >
                              <Card className="bg-surface shadow-xl shadow-slate-200/50 border-slate-100 hover:border-primary/20 transition-colors group">
                                   <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium text-neutral-slate">Total Pemilih</CardTitle>
                                        <Users className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                                   </CardHeader>
                                   <CardContent>
                                        <div className="text-4xl font-bold text-slate-900">{stats.totalVoters}</div>
                                        <p className="text-xs text-slate-400 mt-1">Mahasiswa aktif</p>
                                   </CardContent>
                              </Card>
                         </motion.div>
                         <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 }}
                         >
                              <Card className="bg-surface shadow-xl shadow-slate-200/50 border-slate-100 hover:border-green-100 transition-colors group">
                                   <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium text-neutral-slate">Suara Masuk</CardTitle>
                                        <Vote className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform" />
                                   </CardHeader>
                                   <CardContent>
                                        <div className="text-4xl font-bold text-slate-900">{stats.votesCast}</div>
                                        <p className="text-xs text-slate-400 mt-1">Telah menggunakan hak pilih</p>
                                   </CardContent>
                              </Card>
                         </motion.div>
                         <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 }}
                         >
                              <Card className="bg-surface shadow-xl shadow-slate-200/50 border-slate-100 hover:border-secondary/50 transition-colors group">
                                   <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium text-neutral-slate">Partisipasi</CardTitle>
                                        <TrendingUp className="h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
                                   </CardHeader>
                                   <CardContent>
                                        <div className="text-4xl font-bold text-slate-900">{stats.turnout}</div>
                                        <p className="text-xs text-slate-400 mt-1">Dari total pemilih</p>
                                   </CardContent>
                              </Card>
                         </motion.div>
                    </div>
               </section>

               {/* About Section */}
               <AboutSection />

               {/* Timeline Section */}
               <section id="timeline" className="container mx-auto px-4">
                    <div className="text-center mb-16">
                         <h2 className="text-3xl font-bold mb-4 text-slate-900">Jadwal PEMIRA</h2>
                         <p className="text-neutral-slate">Catat tanggal-tanggal penting berikut ini</p>
                    </div>
                    <div className="grid md:grid-cols-5 gap-6">
                         {timeline.map((item, index) => (
                              <motion.div
                                   key={index}
                                   initial={{ opacity: 0, scale: 0.9 }}
                                   whileInView={{ opacity: 1, scale: 1 }}
                                   viewport={{ once: true }}
                                   transition={{ delay: index * 0.1 }}
                                   className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-surface border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                              >
                                   <div className="w-14 h-14 rounded-2xl bg-neutral-cream text-primary flex items-center justify-center mb-4 rotate-3 group-hover:rotate-6 transition-transform">
                                        <Calendar className="h-7 w-7" />
                                   </div>
                                   <h3 className="font-bold text-slate-900 mb-2">{item.event}</h3>
                                   <p className="text-sm text-slate-500 font-medium bg-slate-50 px-3 py-1 rounded-full">{item.date}</p>
                              </motion.div>
                         ))}
                    </div>
               </section>

               {/* Tutorial Section */}
               <section id="tutorial" className="container mx-auto px-4">
                    <div className="text-center mb-16">
                         <h2 className="text-3xl font-bold mb-4 text-slate-900">Tutorial Voting</h2>
                         <p className="text-neutral-slate">Simak video panduan berikut untuk tata cara pemilihan</p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                         <div className="relative w-full pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
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
               </section>

          </div>
     );
}
