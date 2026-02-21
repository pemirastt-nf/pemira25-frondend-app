/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { io, Socket } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { initSocket } from '@/lib/api';
import { storage } from '@/lib/storage';

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
     const [isSending, setIsSending] = useState(false);
     const [errorMsg, setErrorMsg] = useState<string | null>(null);

     // Guest State
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
          const token = storage.getItem("token");
          const storedSessionId = storage.getItem("chat_session_id");

          if (!token && !storedSessionId) {
               // Defer to avoid sync state update warning in effect
               setTimeout(() => setShowGuestForm(true), 0);
          }

          const newSocket = initSocket(token);

          newSocket.on('connect', () => {
               // Connected to socket
               setIsConnected(true);

               // Try to restore session from localStorage
               const storedSessionId = storage.getItem('chat_session_id');

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
               // Session joined
               setSessionId(data.sessionId);
               storage.setItem('chat_session_id', data.sessionId); // Persist session ID
               setShowGuestForm(false);


               // Request message history for this session
               newSocket.emit('get_message_history', { sessionId: data.sessionId });
          });

          // Add message event handlers
          newSocket.on('message_history', (messages: Message[]) => {
               setMessages(messages || []);
          });

          newSocket.on('new_message', (message: Message) => {
               setMessages(prev => [...prev, message]);
          });

          newSocket.on('message_sent', (message: Message) => {
               // Update the optimistic message with the real one
               setMessages(prev => {
                    const filtered = prev.filter(m => m.id !== Date.now().toString());
                    return [...filtered, message];
               });
          });

          newSocket.on('session_join_failed', () => {
               console.warn("Session resume failed. Clearing generic session.");
               storage.removeItem('chat_session_id');
               setShowGuestForm(true);
          });

          newSocket.on('session_ended', () => {
               // Session ended by admin
               // Clear local session data
               setSessionId(null);
               storage.removeItem('chat_session_id');
               setMessages([]);

               const currentToken = storage.getItem("token");
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

               // Handle specific errors
               if (err.includes('Email')) {
                    setErrorMsg(err);
                    setShowGuestForm(true);
               } else if (err === 'User not found. Please re-login.' || err === 'Authentication failed') {
                    // Clear invalid credentials
                    storage.removeItem('token');
                    storage.removeItem('chat_session_id');
                    storage.removeItem('user'); // If any other user data exists

                    // Force reload/logout to ensure clean state
                    window.location.reload();
               } else if (err === 'Session not found' || err === 'Failed to join chat') {
                    storage.removeItem('chat_session_id');
                    setSessionId(null);
                    setTimeout(() => setShowGuestForm(true), 0);
               }
          });

          socketRef.current = newSocket;

          return () => {
               newSocket.disconnect();
               socketRef.current = null;
          };
     }, []);

     const handleGuestJoin = (e: React.FormEvent) => {
          e.preventDefault();
          setErrorMsg(null);
          if (!socketRef.current) return;
          if (!guestEmail) return;

          socketRef.current.emit('join_student', {
               guestInfo: { email: guestEmail }
          });
     };

     const handleSendMessage = (e: React.FormEvent) => {
          e.preventDefault();
          if (!inputValue.trim() || !socketRef.current || !sessionId || isSending) return;

          setIsSending(true);

          // Store message content before clearing
          const messageContent = inputValue.trim();
          setInputValue("");

          // Send message to socket
          socketRef.current.emit('send_message', {
               message: messageContent,
               sessionId
          });

          setTimeout(() => setIsSending(false), 1000); // 1s cooldown
     };

     return (
          <div
               className="fixed bottom-6 right-6 flex flex-col items-end gap-4"
               style={{ zIndex: 9999, position: 'fixed' }}
          >
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
                                             <h3 className="font-bold text-sm text-white">Live Chat Panitia</h3>
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
                                                  <form onSubmit={handleGuestJoin} className="space-y-4">
                                                       {errorMsg && (
                                                            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100">
                                                                 {errorMsg}
                                                            </div>
                                                       )}
                                                       <div>
                                                            <label className="text-xs font-semibold text-slate-500 ml-1">Email kamu</label>
                                                            <Input
                                                                 value={guestEmail}
                                                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGuestEmail(e.target.value)}
                                                                 type="email"
                                                                 placeholder="emailkamu@student.nurulfikri.ac.id"
                                                                 required
                                                                 className="h-10"
                                                                 autoComplete="email"
                                                            />
                                                       </div>
                                                       <Button className="w-full bg-primary hover:bg-primary-light h-10 rounded-lg font-bold">
                                                            Yuk Chat!
                                                       </Button>
                                                  </form>
                                             </div>
                                        </div>
                                   ) : (
                                        <div className="space-y-4 min-h-full flex flex-col justify-end">
                                             {messages.length === 0 ? (
                                                  <div className="flex-1 flex items-center justify-center">
                                                       <div className="text-center text-gray-500">
                                                            <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
                                                            <p className="text-sm">Belum ada pesan</p>
                                                            <p className="text-xs">Mulai percakapan dengan panitia</p>
                                                       </div>
                                                  </div>
                                             ) : (
                                                  messages.map((msg) => (
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
                                                  ))
                                             )}
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
                                             disabled={showGuestForm || !isConnected || isSending}
                                        />
                                        <Button
                                             size="icon"
                                             type="submit"
                                             disabled={showGuestForm || !isConnected || !inputValue.trim() || isSending}
                                             className={cn(
                                                  "rounded-full aspect-square bg-primary hover:bg-primary-light shrink-0 transition-all",
                                                  isSending && "opacity-70 cursor-not-allowed"
                                             )}
                                        >
                                             {isSending ? (
                                                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                             ) : (
                                                  <Send size={18} />
                                             )}
                                        </Button>
                                   </form>
                              </div>
                         </motion.div>
                    )}
               </AnimatePresence>

               <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                         "group flex items-center justify-center w-16 h-16 rounded-full shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-secondary/30 border-2 border-white/20",
                         isOpen ? "bg-slate-800 rotate-90" : "bg-primary hover:bg-primary-light hover:scale-105"
                    )}
                    style={{ zIndex: 9999 }}
               >
                    {isOpen ? (
                         <X className="text-white" size={24} />
                    ) : (
                         <MessageCircle className="text-white animate-pulse" size={32} />
                    )}

               </button>
          </div>
     );
}
