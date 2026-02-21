import { Heart, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
     return (
          <footer className="bg-white border-t border-gray-100 py-12">
               <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                         
                         {/* Brand */}
                         <div className="text-center md:text-left">
                              <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
                                   PEMIRA <span className="text-primary">2025</span>
                              </h3>
                              <p className="text-gray-500 text-sm font-medium">
                                   &copy; {new Date().getFullYear()} PEMIRA IM STT-NF. All rights reserved.
                              </p>
                         </div>

                         {/* Links */}
                         <div className="flex flex-col items-center md:items-end gap-3">
                              <Link
                                   href="https://www.instagram.com/pemirasttnf/"
                                   target="_blank"
                                   className="inline-flex items-center gap-2 text-gray-600 text-sm font-medium"
                              >
                                   <Instagram className="w-4 h-4" />
                                   @pemirasttnf
                              </Link>

                              <div className="flex items-center gap-1.5 text-gray-400 text-sm font-medium">
                                   <span>Made with</span>
                                   <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                                   <span>by IT Support PEMIRA</span>
                              </div>
                         </div>
                    </div>
               </div>
          </footer>
     );
}
