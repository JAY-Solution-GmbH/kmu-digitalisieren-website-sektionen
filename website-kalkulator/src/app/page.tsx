"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info,
  ChevronDown,
  Calendar,
  Calculator,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/shared/PageTransition";

const beispielWebsites = [
  {
    name: "Ötzi Transport",
    url: "https://oetzi-transport-website.vercel.app/",
    branche: "Transport & Umzüge",
  },
  {
    name: "Schnellentruempler",
    url: "https://www.schnellentruempler.at/",
    branche: "Entrümpelung",
  },
  {
    name: "Lang Car & Bike",
    url: "https://lang-car-bike.vercel.app/",
    branche: "Autohandel",
  },
  {
    name: "Beautiful Me",
    url: "https://www.beautifulme.at/",
    branche: "Kosmetik & Beauty",
  },
];

export default function Schritt1() {
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-primary/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-primary-light/[0.04] blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <PageTransition className="w-full max-w-3xl mx-auto">
          {/* Header badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/[0.06] border border-brand-primary/10">
              <Calculator className="w-4 h-4 text-brand-primary" />
              <span className="text-xs font-semibold text-brand-primary tracking-wide uppercase">
                Website-Kalkulator
              </span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-brand-primary text-center leading-tight mb-4"
          >
            Deine Website.
            <br />
            <span className="bg-gradient-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent">
              Individuell kalkuliert.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center text-brand-text-muted text-base sm:text-lg mb-8 max-w-xl mx-auto"
          >
            In nur 2 Minuten zu deinem individuellen Angebot – ganz ohne
            Kontaktdaten.
          </motion.p>

          {/* Info notice */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative overflow-hidden rounded-2xl border border-brand-primary/10 bg-gradient-to-br from-brand-primary/[0.04] to-transparent p-5 sm:p-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/[0.03] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-primary text-sm mb-1.5">
                    Kurzer Hinweis bevor du loslegst
                  </h3>
                  <p className="text-sm text-brand-text-secondary leading-relaxed">
                    Unser Website-Kalkulator ist gedacht für klassische Websites.
                    Nicht immer der Preissieger, aber aus der Hand von
                    Marketingexperten.{" "}
                    <span className="font-semibold text-brand-primary">
                      Kein Baukasten, keine angepassten Vorlagen
                    </span>{" "}
                    – immer individuell!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Examples Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8"
          >
            <button
              onClick={() => setIsExamplesOpen(!isExamplesOpen)}
              className="w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-border bg-white hover:bg-brand-card/50 transition-all duration-300 group"
              id="examples-toggle"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center shadow-md">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-brand-primary text-sm sm:text-base">
                  Beispiele für Kalkulator-Websites
                </span>
              </div>
              <motion.div
                animate={{ rotate: isExamplesOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-brand-text-muted group-hover:text-brand-primary transition-colors" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isExamplesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {beispielWebsites.map((site, index) => (
                      <motion.div
                        key={site.name}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="group"
                      >
                        <div className="rounded-2xl border border-border overflow-hidden bg-white hover:shadow-lg transition-all duration-400 hover:-translate-y-1">
                          {/* Scrollable iFrame preview */}
                          <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-gray-50 rounded-t-2xl">
                            <iframe
                              src={site.url}
                              title={`${site.name} – Website-Vorschau`}
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              className="absolute inset-0 w-[400%] h-[400%] origin-top-left scale-[0.25]"
                              style={{
                                border: "none",
                              }}
                            />
                          </div>
                          {/* Card info */}
                          <div className="p-4">
                            <h4 className="font-bold text-brand-primary text-sm">
                              {site.name}
                            </h4>
                            <p className="text-xs text-brand-text-muted mt-0.5">
                              {site.branche}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Consultation hint */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200/80">
              <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 leading-relaxed">
                Für große Websites, ausgefallene Funktionen und besondere
                Design-Vorstellungen ist der Kalkulator nicht gemacht – nutze
                dafür unser{" "}
                <span className="font-semibold text-brand-primary">
                  kostenloses Erstgespräch
                </span>
                .
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            {/* CTA 1: Kalkulator starten */}
            <Link href="/schritt-2" className="w-full sm:w-auto" id="cta-kalkulator-starten">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 text-base"
                style={{
                  background:
                    "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)",
                }}
              >
                <Calculator className="w-4 h-4" />
                Kalkulator starten
              </Button>
            </Link>

            {/* CTA 2: Erstgespräch */}
            <a
              href="#erstgespraech"
              className="w-full sm:w-auto"
              id="cta-erstgespraech"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto gap-2 text-base"
              >
                <Calendar className="w-4 h-4" />
                Erstgespräch buchen
              </Button>
            </a>
          </motion.div>

          {/* Sub-info under CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex items-center justify-center gap-4 mt-4 text-xs text-brand-text-muted"
          >
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Dauer: 2 Minuten
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-text-muted/40" />
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Preise direkt online, ohne Angabe von Kontaktdaten
            </span>
          </motion.div>
        </PageTransition>
      </div>
    </main>
  );
}
