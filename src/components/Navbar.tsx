"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navItems = [
     { name: "Beranda", path: "/" },
     { name: "Kandidat", path: "/candidates" },
     { name: "Vote", path: "/vote" },
     { name: "Hasil", path: "/results" },
];

export default function Navbar() {
     const pathname = usePathname();
     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
     const menuRef = useRef<HTMLDivElement>(null);

     // Helper function for matching paths
     const isActiveLink = (itemPath: string, currentPath: string) => {
          if (!currentPath) return false;
          // Strict match for root
          if (itemPath === "/") return currentPath === "/" || currentPath === "";
          // Subpath match
          return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
     };

     // Close mobile menu on clicking outside
     useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
               if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                    setIsMobileMenuOpen(false);
               }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, []);

     // Close mobile menu on route change
     useEffect(() => {
          if (isMobileMenuOpen) {
               setIsMobileMenuOpen(false);
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [pathname]);

     return (
          <motion.nav
               initial={{ y: -100 }}
               animate={{ y: 0 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
               className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 shadow-sm"
          >
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                         {/* Logo Section */}
                         <div className="shrink-0 flex items-center">
                              <Link href="/" className="flex items-center gap-2">
                                   <Image src="/pemira-logo.svg" alt="Logo" width={32} height={32} />
                                   <span className="font-bold text-xl text-primary tracking-tight">PEMIRA</span>
                              </Link>
                         </div>

                         {/* Desktop Menu */}
                         <div className="hidden md:flex items-center space-x-1">
                              {navItems.map((item) => {
                                   const isActive = isActiveLink(item.path, pathname);
                                   return (
                                        <Link
                                             key={item.path}
                                             href={item.path}
                                             className={cn(
                                                  "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                                                  isActive
                                                       ? "text-primary bg-primary/5 font-semibold"
                                                       : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                                             )}
                                        >
                                             {item.name}
                                        </Link>
                                   );
                              })}
                         </div>

                         {/* Mobile Hamburger Button */}
                         <div className="flex md:hidden" ref={menuRef}>
                              <button
                                   onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                   className="p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-hidden"
                              >
                                   {isMobileMenuOpen ? (
                                        <X className="h-6 w-6" />
                                   ) : (
                                        <Menu className="h-6 w-6" />
                                   )}
                              </button>

                              {/* Mobile Dropdown Menu (Popover Style) */}
                              <AnimatePresence>
                                   {isMobileMenuOpen && (
                                        <motion.div
                                             initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                             animate={{ opacity: 1, scale: 1, y: 0 }}
                                             exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                             transition={{ duration: 0.15 }}
                                             className="absolute top-16 right-4 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 ring-1 ring-black/5 overflow-hidden origin-top-right"
                                        >
                                             <div className="py-2 flex flex-col">
                                                  {navItems.map((item) => {
                                                       const isActive = isActiveLink(item.path, pathname);
                                                       return (
                                                            <Link
                                                                 key={item.path}
                                                                 href={item.path}
                                                                 className={cn(
                                                                      "px-4 py-3 text-sm font-medium transition-colors hover:bg-neutral-50",
                                                                      isActive
                                                                           ? "text-primary bg-primary/5 border-l-4 border-primary pl-3"
                                                                           : "text-neutral-600 border-l-4 border-transparent"
                                                                 )}
                                                            >
                                                                 {item.name}
                                                            </Link>
                                                       );
                                                  })}
                                             </div>
                                        </motion.div>
                                   )}
                              </AnimatePresence>
                         </div>
                    </div>
               </div>
          </motion.nav>
     );
}
