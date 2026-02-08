import Link from "next/link";

export default function Footer() {
     return (
          <footer className="bg-white py-8 mt-auto">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} PEMIRA IM STT Terpadu <a href="https://nurulfikri.ac.id" className="hover:underline-offset-1 hover:underline transition-colors" target="_blank" rel="noopener noreferrer">Nurul Fikri</a>.</p>
                    <div className="flex items-center gap-6">
                         <Link href="https://www.instagram.com/pemirasttnf/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</Link>
                         <Link href="https://www.youtube.com/@KPRSTTNF" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Youtube</Link>
                    </div>
               </div>
          </footer>
     );
}
