import type { Metadata } from "next";
import "./globals.css";
import { KalkulatorProvider } from "@/lib/kalkulator-context";

export const metadata: Metadata = {
  title: "Website-Kalkulator | KMU Digitalisieren",
  description:
    "Berechne in 2 Minuten den Preis für deine individuelle Website. Kein Baukasten, keine Vorlagen – maßgeschneidert von Marketingexperten.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white">
        <KalkulatorProvider>{children}</KalkulatorProvider>
      </body>
    </html>
  );
}
