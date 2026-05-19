"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  PiggyBank,
  HandCoins,
  CalendarRange,
  ArrowLeft,
  Star,
  Clock,
  Phone,
  FileText,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKalkulator, berechnePreis } from "@/lib/kalkulator-context";
import PageTransition from "@/components/shared/PageTransition";
import ProgressBar from "@/components/shared/ProgressBar";

/* ──────────── Helpers ──────────── */

function formatPreis(n: number) {
  return n.toLocaleString("de-AT", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

/* ══════════════════════════════════════════ */

export default function Schritt8() {
  const { state, updateState } = useKalkulator();
  const { websitePreis, monatlich, monatlichDetails } = berechnePreis(state);

  const selected = state.zahlungsVariante;

  // Variante calculations
  const sparfuchsPreis = Math.round(websitePreis * 0.95);
  const klassikerHaelfte = Math.round(websitePreis / 2);
  const leasingAnzahlung = Math.round(websitePreis * 0.25);
  const leasingRest = websitePreis - leasingAnzahlung;
  const leasingZins = 0.08;
  const leasingMonate = 24;
  const monatlicheRate = Math.round((leasingRest * (1 + leasingZins * (leasingMonate / 12))) / leasingMonate);

  const varianten = [
    {
      id: "sparfuchs" as const,
      title: "Der Sparfuchs",
      icon: PiggyBank,
      badge: null,
      highlights: ["Einmalzahlung bei Beauftragung", "5% Skonto bei Einmalzahlung"],
      preisLabel: "Einmalzahlung",
      preis: sparfuchsPreis,
      preisInfo: `statt ${formatPreis(websitePreis)} €`,
    },
    {
      id: "klassiker" as const,
      title: "Der Klassiker",
      icon: HandCoins,
      badge: "Am beliebtesten",
      highlights: ["50% bei Beauftragung", "50% bei Abschluss"],
      preisLabel: "Gesamtpreis",
      preis: websitePreis,
      preisInfo: `2× ${formatPreis(klassikerHaelfte)} €`,
    },
    {
      id: "leasing" as const,
      title: "Das Leasing",
      icon: CalendarRange,
      badge: null,
      highlights: ["25% bei Beauftragung", "Rest in 24 monatlichen Raten", "8% Verzinsung p.a."],
      preisLabel: "Anzahlung",
      preis: leasingAnzahlung,
      preisInfo: `+ ${formatPreis(monatlicheRate)} €/Monat`,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-primary/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-primary-light/[0.04] blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <ProgressBar currentStep={10} totalSteps={12} />
          </motion.div>

          <PageTransition>
            {/* ── Price Hero ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-4"
            >
              <p className="text-sm text-brand-text-muted mb-2">Dein individueller Websitepreis</p>
              <div className="text-5xl sm:text-6xl font-bold text-brand-primary tracking-tight">
                {websitePreis > 0 ? `${formatPreis(websitePreis)} €` : "–"}
              </div>
              {state.fotos === "videoshooting" || state.logo === "komplex" ? (
                <p className="text-sm text-amber-600 font-semibold mt-2">
                  + individuelle Leistungen nach Aufwand
                </p>
              ) : null}
            </motion.div>

            {/* Monatliche Kosten */}
            {monatlich > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-3"
              >
                <span className="text-lg font-bold text-brand-primary">{formatPreis(monatlich)} €/Monat</span>
                <div className="flex flex-col items-center gap-0.5 mt-1">
                  {monatlichDetails.map((d, i) => (
                    <span key={i} className="text-xs text-brand-text-muted">{d}</span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Umsetzungsdauer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex justify-center mb-10"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-card border border-border text-xs font-semibold text-brand-text-muted">
                <Clock className="w-3 h-3" />
                Umsetzungsdauer: 3–4 Wochen
              </div>
            </motion.div>

            {/* ── Pricing Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {varianten.map((v, i) => {
                const isSelected = selected === v.id;
                const isPopular = v.badge !== null;
                const Icon = v.icon;

                return (
                  <motion.button
                    key={v.id}
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    onClick={() => updateState({ zahlungsVariante: v.id })}
                    className={`relative text-left rounded-2xl border-2 p-5 sm:p-6 transition-all duration-300 group flex flex-col ${
                      isSelected
                        ? "border-brand-primary bg-brand-primary/[0.04] shadow-xl scale-[1.02]"
                        : isPopular
                        ? "border-brand-primary/40 bg-white shadow-md hover:shadow-lg"
                        : "border-border bg-white hover:border-brand-primary/30 hover:shadow-md"
                    }`}
                    id={`variante-${v.id}`}
                  >
                    {/* Badge */}
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-lg" style={{ background: "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)" }}>
                          <Star className="w-3 h-3" fill="currentColor" />
                          {v.badge}
                        </div>
                      </div>
                    )}

                    {/* Selection indicator */}
                    <div className={`absolute top-4 right-4 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${isSelected ? "bg-brand-primary text-white" : "bg-brand-card text-transparent"}`}>
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isSelected ? "text-white shadow-lg" : "bg-brand-card text-brand-primary"}`}
                        style={isSelected ? { background: "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)" } : undefined}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className={`font-bold text-base ${isSelected ? "text-brand-primary" : "text-brand-text"}`}>{v.title}</h3>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <p className="text-[11px] text-brand-text-muted uppercase tracking-wide font-semibold mb-1">{v.preisLabel}</p>
                      <div className="text-2xl sm:text-3xl font-bold text-brand-primary">
                        {formatPreis(v.preis)} €
                      </div>
                      <p className="text-xs text-brand-text-muted mt-0.5">{v.preisInfo}</p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2 mt-auto">
                      {v.highlights.map((h, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-brand-primary" strokeWidth={3} />
                          </div>
                          <span className="text-xs text-brand-text-secondary leading-relaxed">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Monthly below card */}
                    {monatlich > 0 && (
                      <div className="mt-4 pt-3 border-t border-border/60">
                        <p className="text-[11px] text-brand-text-muted">
                          + <span className="font-bold text-brand-primary">{formatPreis(monatlich)} €/Monat</span> laufende Kosten
                        </p>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* ── CTA Text ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center mb-8"
            >
              <p className="text-sm text-brand-text-muted leading-relaxed max-w-lg mx-auto">
                Du willst nicht nur schauen, sondern dein Projekt mit uns gemeinsam in die Realität umsetzen? Wähle oben eine Variante und los geht&apos;s!
              </p>
            </motion.div>

            {/* ── CTAs ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-10"
            >
              <Link href="/schritt-11" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  disabled={!selected}
                  className="w-full sm:w-auto gap-2 text-base"
                  style={selected ? { background: "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)" } : undefined}
                >
                  <FileText className="w-4 h-4" />
                  Angebot anfordern
                </Button>
              </Link>
              <Link href="/schritt-11" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base">
                  <Phone className="w-4 h-4" />
                  Kundenberater kontaktieren
                </Button>
              </Link>
            </motion.div>

            {/* ── Navigation ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-between pt-4 border-t border-border"
            >
              <Link href="/schritt-9" id="btn-zurueck">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />Zurück
                </Button>
              </Link>
            </motion.div>
          </PageTransition>
        </div>
      </div>
    </main>
  );
}
