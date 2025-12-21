"use client"

import { useEffect, useState, useRef } from "react";
import { api } from "@/lib/api";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Settings {
     announcementMessage: string | null;
     showAnnouncement: boolean;
     isVoteOpen: boolean;
}

export default function AlertBanner() {
     const [settings, setSettings] = useState<Settings | null>(null);
     const [isVisible, setIsVisible] = useState(true);
     const bannerRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
          const fetchSettings = async () => {
               try {
                    const data = await api.getSettings();
                    setSettings(data);
               } catch (error) {
                    console.error("Failed to fetch settings:", error);
               }
          };

          fetchSettings();
          const interval = setInterval(fetchSettings, 60000);
          return () => clearInterval(interval);
     }, []);

     useEffect(() => {
          if (!bannerRef.current) return;

          const updateHeight = () => {
               const height = bannerRef.current?.offsetHeight || 0;
               document.documentElement.style.setProperty('--alert-banner-height', `${height}px`);
          };

          const observer = new ResizeObserver(updateHeight);
          observer.observe(bannerRef.current);
          updateHeight();

          return () => {
               observer.disconnect();
               document.documentElement.style.setProperty('--alert-banner-height', '0px');
          };
     }, [settings, isVisible]);

     // Handle cleanup when closed or unmounted
     useEffect(() => {
          if (!isVisible || !settings?.showAnnouncement) {
               document.documentElement.style.setProperty('--alert-banner-height', '0px');
          }
     }, [isVisible, settings]);

     if (!settings || !isVisible) return null;

     if (!settings.showAnnouncement || !settings.announcementMessage) return null;

     return (
          <AnimatePresence>
               {isVisible && (
                    <motion.div
                         ref={bannerRef}
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         className="bg-primary text-white relative z-50 shadow-sm"
                    >
                         <div className="mx-auto px-4 py-3 flex items-center justify-center relative">
                              <span className="text-sm md:text-base font-medium text-center pr-8 leading-snug">
                                   {settings.announcementMessage}
                              </span>
                              <button
                                   onClick={() => setIsVisible(false)}
                                   className="absolute right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
                              >
                                   <X className="h-4 w-4" />
                                   <span className="sr-only">Close</span>
                              </button>
                         </div>
                    </motion.div>
               )}
          </AnimatePresence>
     );
}
