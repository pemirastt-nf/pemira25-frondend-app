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
               className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 md:px-12 h-20 flex items-center justify-between"
          >
               <div className="flex-1 flex justify-between items-center relative w-full">
                    {/* Logo Section */}
                    <div className="shrink-0 flex items-center">
                         <Link href="/" className="flex items-center gap-3 group">
                              <div className="relative w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all">
                                   <Image src="https://cdn.pemira.oktaa.my.id/pemira-logo.svg" alt="Logo" width={24} height={24} className="w-6 h-6" />
                              </div>
                              <span className="font-bold text-xl text-gray-900 tracking-tight">
                                   PEMIRA<span className="text-primary">2025</span>
                              </span>
                         </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-1">
                         {navItems.map((item) => {
                              return (
                                   <Link
                                        key={item.path}
                                        href={item.path}
                                        className="px-4 py-2 font-medium text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200"
                                   >
                                        {item.name}
                                   </Link>

                              );
                         })}
                         <Link
                              href="/vote"
                              className="ml-4 px-6 py-2 font-medium text-sm bg-primary text-white hover:bg-primary-light transition-all rounded-full shadow-sm shadow-primary/20"
                         >
                              Vote Sekarang
                         </Link>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex lg:hidden" ref={menuRef}>
                         <button
                              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                              className="p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
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
                                        className="absolute top-16 right-0 w-64 bg-white border border-gray-100 shadow-xl rounded-xl p-2 origin-top-right z-50 overflow-hidden"
                                   >
                                        <div className="flex flex-col space-y-1">
                                             {navItems.map((item) => {
                                                  return (
                                                       <Link
                                                            key={item.path}
                                                            href={item.path}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="px-4 py-3 font-medium text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                                                       >
                                                            {item.name}
                                                       </Link>
                                                  );
                                             })}
                                             <div className="pt-2 mt-2 border-t border-gray-100">
                                                  <Link
                                                       href="/vote"
                                                       onClick={() => setIsMobileMenuOpen(false)}
                                                       className="block w-full text-center px-4 py-3 font-bold text-sm bg-primary text-white hover:bg-primary-light transition-colors rounded-lg shadow-sm"
                                                  >
                                                       Vote Sekarang
                                                  </Link>
                                             </div>
                                        </div>
                                   </motion.div>
                              )}
                         </AnimatePresence>
                    </div>
               </div>
          </motion.nav>
     );
}
