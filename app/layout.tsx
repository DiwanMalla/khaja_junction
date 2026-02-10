import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google"; // Import new fonts
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "DB Dai Ko Khaja Junction | Authentic Nepalese Street Food in Campsie",
  description: "Experience the real taste of Nepal in Sydney. Serve delicious Momo, Sekuwa, Chowmein and more at DB Dai Ko Khaja Junction, 156 Beamish St, Campsie.",
  keywords: ["Nepalese Food", "Momo", "Campsie Restaurant", "DB Dai Ko Khaja Junction", "Street Food", "Sydney Eats", "Khaja Set", "Jhol Momo"],
  openGraph: {
    title: "DB Dai Ko Khaja Junction - Authentic Nepalese Taste",
    description: "Order delicious Momo, Sekuwa, and Newari Khaja Sets directly on WhatsApp!",
    url: "https://db-dai-campsie.com", 
    siteName: "DB Dai Ko Khaja Junction",
    images: [
      {
        url: "logo.jpeg", 
        width: 1200,
        height: 630,
        alt: "Authentic Nepalese Momo",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-stone-50 antialiased">{children}</body>
    </html>
  );
}
