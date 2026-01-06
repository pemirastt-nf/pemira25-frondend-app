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

     // Adjust Navbar position based on AlertBanner
     const navContainerRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
          const updatePosition = () => {
               if (!navContainerRef.current) return;
               const bannerHeightVal = getComputedStyle(document.documentElement).getPropertyValue('--alert-banner-height');
               const bannerHeight = parseFloat(bannerHeightVal) || 0;
               const scrollY = window.scrollY;

               // Logic: Initial top is 1.5rem (24px).
               // If banner exists (height > 0), start at 1.5rem + bannerHeight.
               // As we scroll, subtract scrollY from the banner part, clamping at 0.
               const offset = Math.max(0, bannerHeight - scrollY);
               navContainerRef.current.style.top = `calc(1.5rem + ${offset}px)`;
          };

          window.addEventListener('scroll', updatePosition);
          window.addEventListener('resize', updatePosition);

          // Observe changes to --alert-banner-height (set on html style)
          const observer = new MutationObserver(updatePosition);
          observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

          updatePosition();

          return () => {
               window.removeEventListener('scroll', updatePosition);
               window.removeEventListener('resize', updatePosition);
               observer.disconnect();
          };
     }, []);

     return (
          <div ref={navContainerRef} className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-[top] duration-100 ease-linear">
               <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-7xl bg-white/90 backdrop-blur-xl border border-white/20 shadow-lg rounded-full px-6 md:px-8 h-16 flex items-center justify-between"
               >
                    <div className="flex-1 flex justify-between items-center relative">
                         {/* Logo Section */}
                         <div className="shrink-0 flex items-center">
                              <Link href="/" className="flex items-center gap-2 group">
                                   <div className="relative w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Image src="https://cdn.pemira.oktaa.my.id/pemira-logo.svg" alt="Logo" width={20} height={20} className="w-5 h-5 text-primary" />
                                   </div>
                                   <span className="font-bold text-xl text-slate-800 tracking-tight group-hover:text-primary transition-colors">PEMIRA</span>
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
                                                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                                  isActive
                                                       ? "text-primary bg-primary/10 font-semibold"
                                                       : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
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
                                   className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden transition-colors"
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
                                             transition={{ duration: 0.15, ease: "easeOut" }}
                                             className="absolute top-16 right-0 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 ring-1 ring-black/5 overflow-hidden origin-top-right z-50 p-2"
                                        >
                                             <div className="flex flex-col space-y-1">
                                                  {navItems.map((item) => {
                                                       const isActive = isActiveLink(item.path, pathname);
                                                       return (
                                                            <Link
                                                                 key={item.path}
                                                                 href={item.path}
                                                                 className={cn(
                                                                      "px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                                                                      isActive
                                                                           ? "text-primary bg-primary/10 font-semibold"
                                                                           : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
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
               </motion.nav>
          </div>
     );
}
