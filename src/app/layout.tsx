import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import { CartProvider } from "@/components/CartContext";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
import SmoothScroll from "@/components/SmoothScroll";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Lumina Jewelry",
  description: "Premium Jewelry E-commerce Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans transition-colors duration-700 bg-white text-[#1A1A1A] dark:bg-[#050505] dark:text-[#F3F1EE]">
        <Providers>
          <SmoothScroll>
            <CartProvider>
              {children}
              <FloatingWhatsApp />
              <CookieBanner />
              <Toaster position="bottom-right" toastOptions={{
                style: {
                  background: '#111',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0px',
                  fontSize: '12px'
                }
              }} />
            </CartProvider>
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
