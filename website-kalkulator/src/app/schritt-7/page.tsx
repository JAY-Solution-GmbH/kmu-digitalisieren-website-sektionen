"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenTool,
  Search,
  Bot,
  Headphones,
  ArrowRight,
  ArrowLeft,
  Info,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/shared/PageTransition";
import ProgressBar from "@/components/shared/ProgressBar";

/* ──────────── Data ──────────── */

const inklusivLeistungen = [
  {
    id: "texterstellung",
    title: "Texterstellung",
    preis: "+0 €",
    icon: PenTool,
    kurzinfo: "Maximale Zeitersparnis, bestmögliche Inhalte.",
    info: "Auf Wunsch kümmern wir uns um deine Texte, die nicht einfach so generiert werden, sondern auf deine Wünsche und die perfekte Suchwort Strategie abgestimmt werden, um dich als Anbieter bestmöglich auffindbar zu machen.",
  },
  {
    id: "seo",
    title: "SEO (Suchmaschinenoptimierung)",
    preis: "+0 €",
    icon: Search,
    kurzinfo: "In Google besser auffindbar als die Konkurrenz.",
    info: "Wir starten mit einer Suchwortanalyse, optimieren die Texte und gestalten die technische Struktur der Website, sodass deine Seite vor der Konkurrenz auf Google rankt.",
  },
  {
    id: "geo",
    title: "GEO (KI-Optimierung)",
    preis: "+0 €",
    icon: Bot,
    kurzinfo: "Wir bringen dich in die Top-3 auf ChatGPT, Gemini und Co.",
    info: "Wir hinterlegen die essentielle llms.txt Datei für dich und optimieren den Aufbau und die Struktur der Seite so, dass du mit hoher Wahrscheinlichkeit als einer der Top-3 Anbieter bei KI-Suchanfragen auftauchst.",
  },
  {
    id: "beratung",
    title: "Beratung & Support",
    preis: "+0 €",
    icon: Headphones,
    kurzinfo: "Persönliche Beratung und direkter Kontakt zur Geschäftsführung.",
    info: "Zu viele Marketingmöglichkeiten, aber keine Ahnung was wirklich sinnvoll ist? Unser Geschäftsführer und die Kundenberater stehen dir 24/7 in der Whatsapp Gruppe, per Telefon und E-Mail zur Verfügung.",
  },
];

/* ──────────── Info-Panel ──────────── */

function InfoPanel({ text, isOpen, onClose }: { text: string; isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="mt-3 p-4 rounded-xl bg-brand-primary/[0.04] border border-brand-primary/10">
            <p className="text-xs text-brand-text-secondary leading-relaxed">{text}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 text-[11px] font-semibold text-brand-primary hover:underline"
            >
              Schließen
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ──────────── ON/OFF Switch (locked ON) ──────────── */

function LockedOnSwitch() {
  return (
    <div className="relative w-12 h-7 rounded-full bg-gray-400 flex-shrink-0 opacity-60 cursor-not-allowed">
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md"
        style={{ left: "calc(100% - 26px)" }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════ */

export default function Schritt5() {
  const [openInfo, setOpenInfo] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-primary/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-primary-light/[0.04] blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <ProgressBar currentStep={7} totalSteps={12} />
          </motion.div>

          <PageTransition>
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary leading-tight mb-2">
                Was bei jeder unserer Websites inklusive ist
              </h1>
              <p className="text-sm text-brand-text-muted">
                Alle folgenden Leistungen sind standardmäßig enthalten – ohne Aufpreis.
              </p>
            </div>

            {/* ── Inklusiv-Leistungen ── */}
            <div className="space-y-3 mb-10">
              {inklusivLeistungen.map((item, i) => {
                const Icon = item.icon;
                const isInfoOpen = openInfo === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <div className="rounded-2xl border-2 border-brand-primary/20 bg-brand-primary/[0.02] transition-all duration-300">
                      <div className="flex items-center gap-3 p-4 sm:p-5">
                        {/* Icon */}
                        <div
                          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
                          style={{
                            background: "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)",
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-brand-primary">{item.title}</span>
                            <span className="text-[10px] font-semibold text-brand-primary/60 bg-brand-primary/[0.06] px-1.5 py-0.5 rounded">
                              Inklusive
                            </span>
                            <button
                              type="button"
                              onClick={() => setOpenInfo(isInfoOpen ? null : item.id)}
                              className="w-5 h-5 rounded-full bg-brand-card hover:bg-brand-primary/10 flex items-center justify-center transition-colors"
                            >
                              <Info className="w-3 h-3 text-brand-text-muted" />
                            </button>
                          </div>
                          <p className="text-xs text-brand-text-muted mt-0.5 leading-relaxed">{item.kurzinfo}</p>
                        </div>

                        {/* Preis + Locked Switch */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full hidden sm:inline-block">
                            {item.preis}
                          </span>
                          <LockedOnSwitch />
                        </div>
                      </div>

                      {/* Info Panel */}
                      <div className="px-4 sm:px-5">
                        <InfoPanel
                          text={item.info}
                          isOpen={isInfoOpen}
                          onClose={() => setOpenInfo(null)}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* ── Zusammenfassung ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  <span className="font-bold">4 Premium-Leistungen inklusive</span> – ohne Zusatzkosten. So bekommst du eine Website, die nicht nur gut aussieht, sondern auch gefunden wird.
                </p>
              </div>
            </motion.div>

            {/* ── Navigation ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between pt-4 border-t border-border"
            >
              <Link href="/schritt-6" id="btn-zurueck">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück
                </Button>
              </Link>
              <Link href="/schritt-8" id="btn-weiter">
                <Button
                  size="lg"
                  className="gap-2"
                  style={{
                    background: "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)",
                  }}
                >
                  <Check className="w-4 h-4" />
                  Klingt super, weiter geht&apos;s!
                </Button>
              </Link>
            </motion.div>
          </PageTransition>
        </div>
      </div>
    </main>
  );
}
