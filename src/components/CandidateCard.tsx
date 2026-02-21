import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogTitle,
     DialogTrigger,
     DialogClose,
} from "@/components/ui/dialog";
import { SquareCheckBig, CheckCircle, Rocket } from "lucide-react";
import { motion } from "framer-motion";

interface Candidate {
     id: number;
     president: {
          name: string;
          photo: string;
          major: string;
          batch: string;
     };
     vicePresident: {
          name: string;
          photo: string;
          major: string;
          batch: string;
     };
     vision: string;
     mission: string[];
     programs?: string[];
}

export default function CandidateCard({ candidate }: { candidate: Candidate }) {
     return (
          <motion.div
               whileHover={{ y: -8 }}
               transition={{ duration: 0.3 }}
               className="h-full w-full"
          >
               <Card className="overflow-hidden border border-white/50 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm rounded-3xl h-full flex flex-col group transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20">
                    <div className="relative aspect-4/5 bg-slate-100 w-full overflow-hidden">
                         <Image
                              src={candidate.president.photo}
                              alt={`Pasangan Calon ${candidate.id} `}
                              fill
                              loading="eager"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                         />
                         <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                         
                         <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                              NO. {candidate.id}
                         </div>

                         <div className="absolute inset-x-0 bottom-0 p-5 pt-10 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              <div className="flex justify-between items-end gap-3">
                                   <div className="text-left flex-1 min-w-0">
                                        <p className="text-white/60 text-[10px] uppercase font-bold tracking-wider mb-1">Presma</p>
                                        <p className="font-heading font-bold text-lg leading-tight truncate drop-shadow-md">{candidate.president.name}</p>
                                   </div>
                                   <div className="text-right flex-1 min-w-0">
                                        <p className="text-white/60 text-[10px] uppercase font-bold tracking-wider mb-1">Wapresma</p>
                                        <p className="font-heading font-bold text-lg leading-tight truncate drop-shadow-md">{candidate.vicePresident.name}</p>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <CardContent className="px-6 py-6 grow flex flex-col relative bg-transparent">
                         <div className="mb-6 text-center">
                              <div className="inline-block p-1 px-3 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                                   Visi Singkat
                              </div>
                              <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-3">
                                   &quot;{candidate.vision}&quot;
                              </p>
                         </div>

                         <div className="mt-auto">
                              <Dialog>
                                   <DialogTrigger asChild>
                                        <Button className="w-full h-12 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:text-primary hover:border-primary/50 hover:bg-slate-50 transition-all shadow-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-primary/30">
                                             Lihat Detail Lengkap
                                        </Button>
                                   </DialogTrigger>
                                   <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden rounded-4xl bg-white border-0 shadow-2xl flex flex-col md:flex-row gap-0">

                                        {/* Accessibility: Hidden Title & Description */}
                                        <div className="sr-only">
                                             <DialogTitle>Detail Pasangan Calon {candidate.id}</DialogTitle>
                                             <DialogDescription>
                                                  Visi dan Misi lengkap dari pasangan calon nomor urut {candidate.id}, {candidate.president.name} dan {candidate.vicePresident.name}.
                                             </DialogDescription>
                                        </div>

                                        {/* Left Side: Photo (Fixed on Desktop, Top on Mobile) */}
                                        <div className="relative w-full md:w-5/12 h-64 md:h-auto bg-neutral-100 shrink-0">
                                             <Image
                                                  src={candidate.president.photo}
                                                  alt={`Pasangan Calon ${candidate.id} `}
                                                  fill
                                                  className="object-cover"
                                             />
                                             <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8 text-white">
                                                  <div className="inline-block self-start px-3 py-1 bg-primary rounded-full text-xs font-bold mb-4 shadow-lg border border-white/20">
                                                       Kandidat No. {candidate.id}
                                                  </div>

                                                  <div className="flex justify-between items-end gap-4 border-t border-white/20 pt-4">
                                                       <div className="text-left flex-1 min-w-0">
                                                            <p className="text-white/80 text-xs uppercase font-medium mb-1">Ketua</p>
                                                            <h2 className="text-xl font-bold leading-tight shadow-black drop-shadow-md">
                                                                 {candidate.president.name}
                                                            </h2>
                                                       </div>
                                                       <div className="text-right flex-1 min-w-0">
                                                            <p className="text-white/80 text-xs uppercase font-medium mb-1">Wakil</p>
                                                            <h2 className="text-xl font-bold leading-tight shadow-black drop-shadow-md">
                                                                 {candidate.vicePresident.name}
                                                            </h2>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>

                                        {/* Right Side: Content (Scrollable) */}
                                        <div className="w-full md:w-7/12 flex flex-col max-h-[60vh] md:max-h-[85vh] overflow-y-auto bg-white/50">
                                             <div className="p-8 md:p-10 space-y-8">

                                                  {/* Vision & Mission Section */}
                                                  <div>
                                                       <div className="flex items-center gap-3 mb-6">
                                                            <div className="p-2.5 bg-blue-50 rounded-xl text-primary">
                                                                 <SquareCheckBig className="w-6 h-6" />
                                                            </div>
                                                            <h1 className="text-2xl font-heading font-bold text-slate-900">
                                                                 Visi & Misi
                                                            </h1>
                                                       </div>

                                                       <div className="space-y-8">
                                                            {/* Visi */}
                                                            <div>
                                                                 <p className="text-slate-700 text-lg leading-relaxed italic bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                                                                      &quot;{candidate.vision}&quot;
                                                                 </p>
                                                            </div>

                                                            {/* Misi */}
                                                            <div>
                                                                 <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                                                      <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                                                                      Misi
                                                                 </h3>

                                                                 <ul className="grid gap-3">
                                                                      {candidate.mission.map((m: string, i: number) => (
                                                                           <li key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                                                                <div className="shrink-0 mt-0.5">
                                                                                     <CheckCircle className="w-5 h-5 text-primary" />
                                                                                </div>
                                                                                <span className="text-slate-600 leading-relaxed text-base">{m}</span>
                                                                           </li>
                                                                      ))}
                                                                 </ul>
                                                            </div>
                                                       </div>
                                                  </div>

                                                  {/* Flagship Programs Section */}
                                                  <div>
                                                       <div className="flex items-center gap-3 mb-6">
                                                            <div className="p-2.5 bg-orange-50 rounded-xl text-orange-500">
                                                                 <Rocket className="w-6 h-6" />
                                                            </div>
                                                            <h1 className="text-2xl font-bold text-slate-900">
                                                                 Program Unggulan
                                                            </h1>
                                                       </div>

                                                       <div className="grid gap-4">
                                                            {candidate.programs && candidate.programs.length > 0 ? (
                                                                 candidate.programs.map((program, i) => (
                                                                      <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-orange-50/50 border border-orange-100">
                                                                           <span className="shrink-0 w-8 h-8 rounded-lg bg-white text-orange-500 font-bold flex items-center justify-center shadow-sm text-sm border border-orange-100">
                                                                                {i + 1}
                                                                           </span>
                                                                           <span className="text-slate-700 font-medium pt-1">{program}</span>
                                                                      </div>
                                                                 ))
                                                            ) : (
                                                                 <div className="text-center py-6 text-slate-400 ">
                                                                      Belum ada data program unggulan
                                                                 </div>
                                                            )}
                                                       </div>
                                                  </div>

                                                  {/* Close Button */}
                                                  <div className="pt-4 border-t border-slate-100">
                                                       <DialogClose asChild>
                                                            <Button className="w-full h-12 rounded-xl text-base font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-lg shadow-slate-200">
                                                                 Tutup
                                                            </Button>
                                                       </DialogClose>
                                                  </div>
                                             </div>
                                        </div>
                                   </DialogContent>
                              </Dialog>
                         </div>
                    </CardContent>
               </Card>
          </motion.div>
     );
}
