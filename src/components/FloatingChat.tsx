/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { io, Socket } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils'; // Ensure utils exists or use standard classnames
import { initSocket } from '@/lib/api';

interface Message {
     id: string;
     message: string;
     senderType: 'student' | 'admin' | 'system';
     createdAt: string;
}

export default function FloatingChat() {
     const [isOpen, setIsOpen] = useState(false);
     const socketRef = useRef<Socket | null>(null);
     const [messages, setMessages] = useState<Message[]>([]);
     const [inputValue, setInputValue] = useState("");
     const [isConnected, setIsConnected] = useState(false);
     const [sessionId, setSessionId] = useState<string | null>(null);

     // Guest State
     const [guestName, setGuestName] = useState("");
     const [guestEmail, setGuestEmail] = useState("");
     const [showGuestForm, setShowGuestForm] = useState(false);

     const messagesEndRef = useRef<HTMLDivElement>(null);

     const scrollToBottom = () => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
     };

     useEffect(() => {
          scrollToBottom();
     }, [messages, isOpen]);

     useEffect(() => {
          const token = localStorage.getItem("token");
          const storedSessionId = localStorage.getItem("chat_session_id");

          if (!token && !storedSessionId) {
               // Defer to avoid sync state update warning in effect
               setTimeout(() => setShowGuestForm(true), 0);
          }

          const newSocket = initSocket(token);

          newSocket.on('connect', () => {
               console.log('Connected to socket server');
               setIsConnected(true);

               // Try to restore session from localStorage
               const storedSessionId = localStorage.getItem('chat_session_id');

               if (token) {
                    try {
                         const user = jwtDecode<{ id: string }>(token);
                         newSocket.emit('join_student', {
                              studentId: user.id,
                              sessionId: storedSessionId // Send stored session ID if exists
                         });
                    } catch (e) {
                         console.error("Invalid token", e);
                         setTimeout(() => setShowGuestForm(true), 0);
                    }
               } else if (storedSessionId) {
                    // If guest but has stored session, try to rejoin
                    newSocket.emit('join_student', {
                         sessionId: storedSessionId
                    });
               } else {
                    // Only show guest form if no token AND no stored session
                    setTimeout(() => setShowGuestForm(true), 0);
               }
          });

          newSocket.on('disconnect', () => {
               setIsConnected(false);
          });

          newSocket.on('session_joined', (data: { sessionId: string }) => {
               console.log("Session joined:", data.sessionId);
               setSessionId(data.sessionId);
               localStorage.setItem('chat_session_id', data.sessionId); // Persist session ID
               setShowGuestForm(false);
          });

          newSocket.on('session_join_failed', () => {
               console.warn("Session resume failed. Clearing generic session.");
               localStorage.removeItem('chat_session_id');
               setShowGuestForm(true);
          });

          newSocket.on('session_ended', () => {
               console.log("Session ended by admin.");
               // Clear local session data
               setSessionId(null);
               localStorage.removeItem('chat_session_id');
               setMessages([]);

               const currentToken = localStorage.getItem("token");
               if (currentToken) {
                    // If student, auto-start new session immediately
                    try {
                         const user = jwtDecode<{ id: string }>(currentToken);
                         newSocket.emit('join_student', { studentId: user.id });
                    } catch (e) {
                         setShowGuestForm(false); // Or true?
                    }
               } else {
                    // If guest, show form to start over
                    setShowGuestForm(true);
               }
          });

          newSocket.on('error', (err: string) => {
               console.error("Socket error:", err);
               // If error relates to invalid session, maybe clear localStorage?
               if (err === 'Session not found' || err === 'Failed to join chat') {
                    // Optional: localStorage.removeItem('chat_session_id'); 
               }
          });

          newSocket.on('message_history', (history: Message[]) => {
               setMessages(history);
               scrollToBottom();
          });

          newSocket.on('new_message', (msg: Message) => {
               setMessages((prev) => [...prev, msg]);
          });

          newSocket.on('error', (err: string) => {
               console.error("Socket error:", err);
               // Simple toast or alert?
          });

          socketRef.current = newSocket;

          return () => {
               newSocket.disconnect();
               socketRef.current = null;
          };
     }, []);

     const handleGuestJoin = (e: React.FormEvent) => {
          e.preventDefault();
          if (!socketRef.current) return;
          if (!guestName || !guestEmail) return;

          socketRef.current.emit('join_student', {
               guestInfo: { name: guestName, email: guestEmail }
          });
     };

     const handleSendMessage = (e: React.FormEvent) => {
          e.preventDefault();
          if (!inputValue.trim() || !socketRef.current || !sessionId) return;

          socketRef.current.emit('send_message', {
               message: inputValue,
               sessionId
          });
          setInputValue("");
     };

     return (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
               <AnimatePresence>
                    {isOpen && (
                         <motion.div
                              initial={{ opacity: 0, y: 20, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 20, scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                              className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-87.5 h-125 flex flex-col overflow-hidden"
                         >
                              {/* Header */}
                              <div className="bg-primary p-4 text-white flex justify-between items-center shadow-md">
                                   <div className="flex items-center gap-3">
                                        <div className="bg-white/20 p-2 rounded-full">
                                             <MessageCircle size={20} />
                                        </div>
                                        <div>
                                             <h3 className="font-bold text-sm">Live Chat Panitia</h3>
                                             <p className="text-xs text-white/80 flex items-center gap-1">
                                                  {isConnected ? (
                                                       <><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Online</>
                                                  ) : (
                                                       <><span className="w-2 h-2 bg-red-400 rounded-full" /> Offline</>
                                                  )}
                                             </p>
                                        </div>
                                   </div>
                                   <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors">
                                        <X size={20} />
                                   </button>
                              </div>

                              {/* Body */}
                              <div className="flex-1 bg-neutral-50 p-4 overflow-y-auto relative">
                                   {showGuestForm ? (
                                        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center p-6">
                                             <div className="bg-white p-6 rounded-xl shadow-lg border border-neutral-100 w-full">
                                                  <h4 className="font-bold text-center mb-4 text-slate-800">Mulai Chat</h4>
                                                  <form onSubmit={handleGuestJoin} className="space-y-4">
                                                       <div>
                                                            <label className="text-xs font-semibold text-slate-500 ml-1">Nama</label>
                                                            <Input
                                                                 value={guestName}
                                                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGuestName(e.target.value)}
                                                                 placeholder="Nama Anda"
                                                                 required
                                                                 className="h-10"
                                                            />
                                                       </div>
                                                       <div>
                                                            <label className="text-xs font-semibold text-slate-500 ml-1">Email</label>
                                                            <Input
                                                                 value={guestEmail}
                                                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGuestEmail(e.target.value)}
                                                                 type="email"
                                                                 placeholder="email@student.nurulfikri.ac.id"
                                                                 required
                                                                 className="h-10"
                                                            />
                                                       </div>
                                                       <Button className="w-full bg-primary hover:bg-primary-light h-10 rounded-lg font-bold">
                                                            Mulai Obrolan
                                                       </Button>
                                                  </form>
                                             </div>
                                        </div>
                                   ) : (
                                        <div className="space-y-4 min-h-full flex flex-col justify-end">
                                             {messages.map((msg) => (
                                                  <div
                                                       key={msg.id}
                                                       className={cn(
                                                            "flex w-full mb-2",
                                                            msg.senderType === 'student' ? "justify-end" : "justify-start"
                                                       )}
                                                  >
                                                       <div className={cn(
                                                            "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
                                                            msg.senderType === 'student'
                                                                 ? "bg-primary text-white rounded-br-none"
                                                                 : "bg-white text-slate-700 border border-slate-100 rounded-bl-none"
                                                       )}>
                                                            {msg.message}
                                                            <div className={cn(
                                                                 "text-[10px] mt-1 text-right opacity-70",
                                                                 msg.senderType === 'student' ? "text-white" : "text-slate-400"
                                                            )}>
                                                                 {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </div>
                                                       </div>
                                                  </div>
                                             ))}
                                             <div ref={messagesEndRef} />
                                        </div>
                                   )}
                              </div>

                              {/* Footer */}
                              <div className="p-3 bg-white border-t border-neutral-100">
                                   <form onSubmit={handleSendMessage} className="flex gap-2">
                                        <Input
                                             value={inputValue}
                                             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                                             placeholder="Ketik pesan..."
                                             className="rounded-full bg-slate-50 border-slate-200 focus:bg-white transition-all pl-4"
                                             disabled={showGuestForm || !isConnected}
                                        />
                                        <Button
                                             size="icon"
                                             type="submit"
                                             disabled={showGuestForm || !isConnected || !inputValue.trim()}
                                             className="rounded-full aspect-square bg-primary hover:bg-primary-light shrink-0"
                                        >
                                             <Send size={18} />
                                        </Button>
                                   </form>
                              </div>
                         </motion.div>
                    )}
               </AnimatePresence>

               <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                         "group flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-secondary/30",
                         isOpen ? "bg-slate-800 rotate-90" : "bg-primary hover:bg-primary-light hover:scale-105"
                    )}
               >
                    {isOpen ? (
                         <X className="text-white" size={24} />
                    ) : (
                         <MessageCircle className="text-white animate-pulse-slow" size={28} />
                    )}

                    {/* Unread Badge (Mockup logic needed if we want persistence of unread) */}
                    {/* <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span> */}
               </button>
          </div>
     );
}
