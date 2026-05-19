"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Palette,
  PenTool,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKalkulator } from "@/lib/kalkulator-context";
import PageTransition from "@/components/shared/PageTransition";
import ProgressBar from "@/components/shared/ProgressBar";

/* ──────────── Data ──────────── */

const logoOptionen = [
  {
    id: "vorhanden",
    title: "Logo ist vorhanden",
    preis: "+0 €",
    icon: Palette,
  },
  {
    id: "einfach",
    title: "Einfaches Logo gestalten lassen",
    preis: "+280 €",
    icon: PenTool,
  },
  {
    id: "komplex",
    title: "Komplexes Logo gestalten lassen",
    preis: "nach Aufwand",
    icon: MessageSquare,
  },
];

/* ══════════════════════════════════════════ */

export default function Schritt5() {
  const { state, updateState } = useKalkulator();

  const canProceed = state.logo !== "";

  return (
    <main className="min-h-screen flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-primary/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-primary-light/[0.04] blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <ProgressBar currentStep={5} totalSteps={12} />
          </motion.div>

          <PageTransition>
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary leading-tight mb-2">
                Wie steht es um das Logo deiner Firma?
              </h1>
              <p className="text-sm text-brand-text-muted">Wähle eine Option.</p>
            </div>

            <div className="space-y-3 mb-10">
              {logoOptionen.map((opt, i) => {
                const isSelected = state.logo === opt.id;
                const Icon = opt.icon;
                return (
                  <motion.button
                    key={opt.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    onClick={() => updateState({ logo: opt.id })}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 group ${isSelected ? "border-brand-primary bg-brand-primary/[0.04] shadow-md" : "border-border bg-white hover:border-brand-primary/30 hover:shadow-sm"}`}
                    id={`logo-${opt.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? "border-brand-primary bg-brand-primary" : "border-gray-300 bg-white group-hover:border-brand-primary/40"}`}>
                        <motion.div initial={false} animate={{ scale: isSelected ? 1 : 0 }} transition={{ duration: 0.2 }} className="w-2 h-2 rounded-full bg-white" />
                      </div>

                      <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${isSelected ? "text-white shadow-md" : "bg-brand-card text-brand-primary group-hover:bg-brand-primary/10"}`} style={isSelected ? { background: "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)" } : undefined}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1">
                        <span className={`font-bold text-sm transition-colors ${isSelected ? "text-brand-primary" : "text-brand-text"}`}>{opt.title}</span>
                      </div>

                      <span className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${isSelected ? "bg-brand-primary/10 text-brand-primary" : "bg-brand-card text-brand-text-muted"}`}>
                        {opt.preis}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* ── Navigation ── */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center justify-between pt-4 border-t border-border">
              <Link href="/schritt-4" id="btn-zurueck">
                <Button variant="ghost" className="gap-2"><ArrowLeft className="w-4 h-4" />Zurück</Button>
              </Link>
              <Link href="/schritt-6" id="btn-weiter">
                <Button size="lg" disabled={!canProceed} className="gap-2" style={canProceed ? { background: "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)" } : undefined}>
                  Weiter<ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </PageTransition>
        </div>
      </div>
    </main>
  );
}
