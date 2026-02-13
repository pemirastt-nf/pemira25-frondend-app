import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Outfit, Archivo_Black, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import AlertBanner from "@/components/AlertBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo" });
const space = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space" });

const metadataBase = new URL("https://pemira-sttnf.vercel.app");
const metadataTitle = "PEMIRA STTNF 2025 | Pemilihan Raya Mahasiswa STT Terpadu Nurul Fikri";
const metadataDescription = "Pemilihan Raya Mahasiswa STT Terpadu Nurul Fikri atau PEMIRA 2025 adalah acara pemilihan mahasiswa STTNF untuk memilih calon PRESMA (Presiden Mahasiswa) dan WAKIL PRESMA (Wakil Presiden Mahasiswa) dari STTNF untuk masa 2025.";

export const metadata: Metadata = {
    title: metadataTitle,
    description: metadataDescription,
    icons: {
        icon: "/icons/favicon.ico",
        apple: "/icons/apple-touch-icon.png"
    },
    keywords: [
        "pemira sttnf",
        "pemira sttnf 2025",
        "pemira nurul fikri",
        "pemilihan raya mahasiswa sttnf",
        "pemilihan raya mahasiswa nurul fikri",
        "website pemira sttnf",
        "login pemira sttnf",
        "e-voting pemira sttnf",
        "pemira online sttnf",
        "hasil pemira sttnf",
        "stt terpadu nurul fikri",
        "kampus nurul fikri",
        "pemilihan raya mahasiswa website"
    ],
    manifest: "/icons/site.webmanifest",
    openGraph: {
        title: metadataTitle,
        description: metadataDescription,
        siteName: metadataTitle,
        url: metadataBase,
        type: "website",
        images: [
            {
                url: "https://cdn.pemira.oktaa.my.id/og-banner.png",
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
                url: "https://cdn.pemira.oktaa.my.id/og-banner.png",
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
            <body className={`${inter.variable} ${outfit.variable} ${archivo.variable} ${space.variable} font-sans antialiased`}>
                <div className="flex flex-col min-h-screen">
                    <AlertBanner />
                    <Navbar />
                    <main className="grow">
                        {/* Background Decor */}
                        {children}
                    </main>
                    <Footer />
                    <FloatingChat />
                </div>
                <Script
                    src="https://cloud.umami.is/script.js"
                    data-website-id="895c8390-4014-4558-864d-051df20f1cbf"
                    strategy="afterInteractive"
                />
            </body>
        </html>
    );
}
