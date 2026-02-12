"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";



export default function Navbar() {
     const pathname = usePathname();
     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
     const menuRef = useRef<HTMLDivElement>(null);

     const navItems = [
          { name: "Beranda", path: "/#home" },
          { name: "About", path: "/#about" },
          // { name: "Live Count", path: "/#livetrack" },
          { name: "Kandidat", path: "/#candidates" },
          { name: "Timeline", path: "/#timeline" },
     ];

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
          <motion.nav
               initial={{ y: -100 }}
               animate={{ y: 0 }}
               transition={{ duration: 0.5, ease: "circOut" }}
               className="sticky top-0 z-50 w-full bg-white border-b-4 border-black px-6 md:px-12 h-20 flex items-center justify-between"
          >
               <div className="flex-1 flex justify-between items-center relative w-full">
                    {/* Logo Section */}
                    <div className="shrink-0 flex items-center">
                         <Link href="/" className="flex items-center gap-3 group">
                              <div className="relative w-10 h-10 border-2 border-black flex items-center justify-center neo-shadow-sm group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
                                   <Image src="https://cdn.pemira.oktaa.my.id/pemira-logo.svg" alt="Logo" width={24} height={24} className="w-6 h-6" />
                              </div>
                              <span className="font-heading text-2xl text-black uppercase tracking-tighter group-hover:text-primary transition-colors">
                                   PEMIRA<span className="text-secondary">2025</span>
                              </span>
                         </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-2">
                         {navItems.map((item) => {
                              return (
                                   <Link
                                        key={item.path}
                                        href={item.path}
                                        className="px-4 py-2 font-mono font-bold text-sm uppercase tracking-wider border-2 border-transparent hover:border-black hover:bg-neutral-cream transition-all duration-200"
                                   >
                                        {item.name}
                                   </Link>

                              );
                         })}
                         <Link
                              href="/vote"
                              className="ml-4 px-6 py-2 font-heading font-bold text-sm uppercase tracking-wider border-2 border-black bg-primary text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-primary-light transition-all"
                         >
                              Vote Sekarang
                         </Link>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex lg:hidden" ref={menuRef}>
                         <button
                              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                              className="p-2 border-2 border-black bg-white hover:bg-accent-blue transition-colors neo-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                         >
                              {isMobileMenuOpen ? (
                                   <X className="h-6 w-6" />
                              ) : (
                                   <Menu className="h-6 w-6" />
                              )}
                         </button>

                         {/* Mobile Dropdown Menu */}
                         <AnimatePresence>
                              {isMobileMenuOpen && (
                                   <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                        className="absolute top-16 right-0 w-64 bg-white border-4 border-black neo-shadow-lg p-0 origin-top-right z-50"
                                   >
                                        <div className="flex flex-col">
                                             {navItems.map((item) => {
                                                  return (
                                                       <Link
                                                            key={item.path}
                                                            href={item.path}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="px-6 py-4 font-mono font-bold text-sm uppercase border-b-2 border-black hover:bg-accent-blue transition-colors text-black"
                                                       >
                                                            &gt; {item.name}
                                                       </Link>
                                                  );
                                             })}
                                             <Link
                                                  href="/vote"
                                                  onClick={() => setIsMobileMenuOpen(false)}
                                                  className="px-6 py-4 font-heading font-bold text-sm uppercase bg-primary text-white hover:bg-primary-light transition-colors border-b-2 border-black"
                                             >
                                                  &gt; VOTE SEKARANG
                                             </Link>
                                        </div>
                                   </motion.div>
                              )}
                         </AnimatePresence>
                    </div>
               </div>
          </motion.nav>
     );
}
