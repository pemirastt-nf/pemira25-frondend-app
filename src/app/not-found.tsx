"use client";

import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
     return (
          <div className="flex-1 flex items-center justify-center min-h-[70vh] px-4 sm:px-6 lg:px-8 py-28 relative overflow-hidden">
               {/* Background Elements */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-primary/5 rounded-full blur-[100px] -z-10" />

               <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10 relative overflow-hidden ring-1 ring-slate-100 text-center">

                    <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-inner border border-slate-100">
                         <SearchX className="w-10 h-10 drop-shadow-sm" />
                    </div>

                    <h1 className="text-6xl font-heading font-bold text-slate-900 mb-2 tracking-tighter">404</h1>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Tidak Ditemukan</h2>

                    <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">
                         Seperti dia yang pergi tanpa kabar, halaman ini pun hilang tak berjejak. Mungkin sudah saatnya kamu melangkah pulang.
                         <span className="text-xs text-gray-300"> When yh...</span>
                    </p>

                    <div className="space-y-3">
                         <Button asChild className="w-full h-12 rounded-xl text-base font-bold bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5">
                              <Link href="/">
                                   <Home className="w-4 h-4 mr-2" />
                                   Ke Beranda
                              </Link>
                         </Button>
                         <Button asChild variant="ghost" className="w-full h-11 text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors">
                              <button onClick={() => window.history.back()}>
                                   <ArrowLeft className="w-4 h-4 mr-2" />
                                   Kembali
                              </button>
                         </Button>
                    </div>
               </div>
          </div>
     );
}
