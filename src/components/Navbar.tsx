"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

const navItems = [
     { name: "Beranda", path: "/" },
     { name: "Kandidat", path: "/candidates" },
     { name: "Vote", path: "/vote" },
     { name: "Hasil", path: "/results" },
];

export default function Navbar() {
     const pathname = usePathname();
     const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
     const [topOffset, setTopOffset] = useState(24);
     const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

     // Helper function for matching paths
     const isActiveLink = (itemPath: string, currentPath: string) => {
          if (!currentPath) return false;
          if (itemPath === "/") return currentPath === "/" || currentPath === "";
          return currentPath.startsWith(itemPath);
     };

     const activeIndex = navItems.findIndex((item) => isActiveLink(item.path, pathname));

     useEffect(() => {
          const el = itemRefs.current[activeIndex];

          if (el) {
               setPillStyle({
                    left: el.offsetLeft,
                    width: el.offsetWidth,
                    opacity: 1,
               });
          } else {
               setPillStyle((prev) => ({ ...prev, opacity: 0 }));
          }
     }, [activeIndex]);

     useEffect(() => {
          const updatePosition = () => {
               const bannerHeightStr = getComputedStyle(document.documentElement).getPropertyValue('--alert-banner-height').trim();
               const bannerHeight = parseFloat(bannerHeightStr) || 0;
               const scrollY = window.scrollY;

               const newTop = Math.max(24, 24 + bannerHeight - scrollY);
               setTopOffset(newTop);
          };

          window.addEventListener('scroll', updatePosition);
          updatePosition();

          const interval = setInterval(updatePosition, 500);

          return () => {
               window.removeEventListener('scroll', updatePosition);
               clearInterval(interval);
          };
     }, []);

     return (
          <div
               className="fixed left-0 right-0 z-50 flex justify-center px-4 will-change-[top]"
               style={{ top: `${topOffset}px` }}
          >
               <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-full px-6 py-3 flex items-center gap-2 md:gap-8"
               >
                    <Link href="/" className="font-bold text-primary mr-2 md:mr-4 flex items-center gap-2">
                         <Image src="/pemira-logo.svg" alt="Logo" width={24} height={24} />
                         <span className="hidden md:inline">PEMIRA</span>
                    </Link>

                    <div className="relative flex items-center gap-1 bg-neutral-cream/50 p-1 rounded-full overflow-x-auto max-w-70 md:max-w-none scrollbar-hide">
                         {/* Animated Pill */}
                         <motion.div
                              className="absolute top-1 bottom-1 bg-primary rounded-full z-0"
                              initial={false}
                              animate={pillStyle}
                              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                         />

                         {navItems.map((item, index) => {
                              const isActive = index === activeIndex;
                              return (
                                   <Link
                                        key={item.path}
                                        href={item.path}
                                        ref={(el) => { itemRefs.current[index] = el; }}
                                        className={cn(
                                             "relative px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-colors z-10 whitespace-nowrap",
                                             isActive ? "text-white" : "text-black hover:text-primary"
                                        )}
                                   >
                                        {item.name}
                                   </Link>
                              );
                         })}
                    </div>
               </motion.nav>
          </div>
     );
}
