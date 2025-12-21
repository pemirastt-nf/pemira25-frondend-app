import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import AlertBanner from "@/components/AlertBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

const metadataBase = new URL("https://pemira-sttnf.vercel.app");
const metadataTitle = "#AyoVote | PEMILIHAN RAYA MAHASISWA STTNF 2025";
const metadataDescription = "Pemilihan Raya Mahasiswa STT Terpadu Nurul Fikri atau PEMIRA 2025 adalah acara pemilihan mahasiswa STTNF untuk memilih calon PRESMA (Presiden Mahasiswa) dan WAKIL PRESMA (Wakil Presiden Mahasiswa) dari STTNF untuk masa 2025-2026.";

export const metadata: Metadata = {
    title: metadataTitle,
    description: metadataDescription,
    icons: {
        icon: "/icons/favicon.ico",
        apple: "/icons/apple-touch-icon.png"
    },
    keywords: [
        "pemira sttnf",
        "pemira 2025",
        "pemilihan raya mahasiswa website",
        "pemilihan raya sttnf",
        "pemilihan raya sttnf 2025",
        "stt terpadu nurul fikri",
        "pemilihan raya sttnf 2025"
    ],
    openGraph: {
        title: metadataTitle,
        description: metadataDescription,
        siteName: metadataTitle,
        url: metadataBase,
        type: "website",
        images: [
            {
                url: "/icons/favicon.ico",
                width: 1200,
                height: 630,
                alt: metadataTitle
            }
        ]
    },
    twitter: {
        title: metadataTitle,
        description: metadataDescription,
        card: "summary_large_image",
        images: [
            {
                url: "/icons/favicon.ico",
                width: 1200,
                height: 630,
                alt: metadataTitle
            }
        ]
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
                <div className="flex flex-col min-h-screen">
                    <AlertBanner />
                    <Navbar />
                    <main className="grow pt-24">
                        {children}
                    </main>
                    <Footer />
                    <FloatingChat />
                </div>
            </body>
        </html>
    );
}
