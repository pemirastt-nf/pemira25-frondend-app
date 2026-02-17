import { Heart, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
     return (
          <footer className="bg-black text-white border-t-8 border-primary mt-auto py-8">
               <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-center md:text-left">

                    {/* Left Content */}
                    <div className="font-mono text-sm md:text-base flex flex-col items-center md:items-start gap-1">
                         <div className="font-heading text-2xl md:text-3xl uppercase tracking-tighter mb-1">
                              PEMIRA<span className="text-accent-orange">2025</span>
                         </div>
                         <div className="text-neutral-400 font-semibold text-xs md:text-sm font-mono">&copy; PEMIRA IM STT <a href="https://nurulfikri.ac.id/">Nurul Fikri</a> {new Date().getFullYear()}. All Right Reserved.</div>
                    </div>

                    {/* Right Content */}
                    <div className="flex flex-col items-center md:items-end gap-5 font-mono text-sm md:text-base">
                         <Link
                              href="https://www.instagram.com/pemirasttnf/"
                              target="_blank"
                              className="flex items-center gap-2 text-neutral-400 hover:text-accent-blue transition-colors font-semibold"
                         >
                              <Instagram className="w-5 h-5" />
                              @pemirasttnf
                         </Link>

                         <div className="flex items-center gap-1.5 text-neutral-400 font-semibold text-xs md:text-sm">
                              <span>Made with</span>
                              <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
                              <span>By IT Support PEMIRA IM STTNF</span>
                         </div>
                    </div>
               </div>
          </footer>
     );
}
