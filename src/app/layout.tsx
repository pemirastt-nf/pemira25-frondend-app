import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

const metadataBase = new URL("https://pemira-sttnf.vercel.app");
const metadataTitle = "PEMIRA IM STTNF 2026 - Coming Soon";
const metadataDescription = "Portal Resmi Pemilihan Raya Mahasiswa STT Terpadu Nurul Fikri 2026. Segera hadir untuk memilih Presiden & Wakil Presiden Mahasiswa periode 2026–2027.";

export const metadata: Metadata = {
    title: metadataTitle,
    description: metadataDescription,
    icons: {
        icon: "/icons/favicon.ico",
        apple: "/icons/apple-touch-icon.png"
    },
    keywords: [
        "pemira sttnf",
        "pemira sttnf 2026",
        "pemira nurul fikri",
        "pemilihan raya mahasiswa sttnf",
        "pemilihan raya mahasiswa stt terpadu nurul fikri",
        "website pemira sttnf",
        "e-voting pemira sttnf",
        "voting online sttnf",
        "stt terpadu nurul fikri",
        "kampus nurul fikri"
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
            <body className={`${plusJakarta.variable} ${outfit.variable} font-sans antialiased text-slate-900 bg-neutral-cream min-h-screen`}>
                {children}
                <Script
                    src="https://cloud.umami.is/script.js"
                    data-website-id="895c8390-4014-4558-864d-051df20f1cbf"
                    strategy="afterInteractive"
                />
            </body>
        </html>
    );
}
