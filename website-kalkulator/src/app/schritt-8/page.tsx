"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Languages,
  Plug,
  CalendarDays,
  Newspaper,
  CreditCard,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKalkulator } from "@/lib/kalkulator-context";
import type { AddOns } from "@/lib/kalkulator-context";
import PageTransition from "@/components/shared/PageTransition";
import ProgressBar from "@/components/shared/ProgressBar";

/* ──────────── Data ──────────── */

const addOnOptionen: {
  id: keyof AddOns;
  title: string;
  kurzinfo?: string;
  icon: React.ElementType;
}[] = [
  {
    id: "sprache",
    title: "Zusätzliche Sprache",
    kurzinfo: "Wähle beliebig viele weitere Sprachen.",
    icon: Languages,
  },
  {
    id: "toolIntegration",
    title: "Tool Integration (externe Software)",
    kurzinfo: "Reservierungen, Immobilieneinbettung, etc.",
    icon: Plug,
  },
  {
    id: "kalender",
    title: "Kalender Integration (externe Software)",
    kurzinfo: "Calendly, Google Kalender, Tidycal, etc.",
    icon: CalendarDays,
  },
  {
    id: "newsletter",
    title: "Newsletter Formular",
    icon: Newspaper,
  },
  {
    id: "zahlung",
    title: "Zahlungsmöglichkeit",
    kurzinfo: "Für max. 10 Produkte (kein vollintegrierter Online Shop)",
    icon: CreditCard,
  },
];

/* ──────────── ON/OFF Switch ──────────── */

function OnOffSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-7 rounded-full transition-all duration-300 flex-shrink-0 cursor-pointer ${checked ? "bg-brand-primary" : "bg-gray-200"}`}
    >
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md"
        animate={{ left: checked ? "calc(100% - 26px)" : "2px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

/* ══════════════════════════════════════════ */

export default function Schritt6() {
  const { state, updateState } = useKalkulator();
  const addOns = state.addOns;

  const toggleAddOn = (id: keyof AddOns) => {
    updateState({
      addOns: { ...addOns, [id]: !addOns[id] },
    });
  };

  const selectedCount = Object.values(addOns).filter(Boolean).length;

  return (
    <main className="min-h-screen flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-primary/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-primary-light/[0.04] blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <ProgressBar currentStep={8} totalSteps={12} />
          </motion.div>

          <PageTransition>
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary leading-tight mb-2">
                Welche sonstigen Add-Ons hättest du gern?
              </h1>
              <p className="text-sm text-brand-text-muted">
                Mehrfachauswahl möglich. Alle Add-Ons sind optional.
              </p>
            </div>

            {/* ── Add-On Liste ── */}
            <div className="space-y-3 mb-10">
              {addOnOptionen.map((item, i) => {
                const Icon = item.icon;
                const isActive = addOns[item.id];

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAddOn(item.id)}
                      className={`w-full text-left rounded-2xl border-2 transition-all duration-300 ${isActive ? "border-brand-primary/30 bg-brand-primary/[0.03] shadow-md" : "border-border bg-white hover:border-brand-primary/20 hover:shadow-sm"}`}
                    >
                      <div className="flex items-center gap-3 p-4 sm:p-5">
                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? "text-white shadow-lg" : "bg-brand-card text-brand-primary"}`}
                          style={
                            isActive
                              ? { background: "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)" }
                              : undefined
                          }
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <span className={`font-bold text-sm transition-colors ${isActive ? "text-brand-primary" : "text-brand-text"}`}>
                            {item.title}
                          </span>
                          {item.kurzinfo && (
                            <p className="text-xs text-brand-text-muted mt-0.5 leading-relaxed">
                              {item.kurzinfo}
                            </p>
                          )}
                        </div>

                        {/* Switch */}
                        <OnOffSwitch checked={isActive} onChange={() => toggleAddOn(item.id)} />
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* ── Auswahl Info ── */}
            {selectedCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-primary/[0.04] border border-brand-primary/10">
                  <span className="text-xs font-semibold text-brand-primary">
                    {selectedCount} Add-On{selectedCount !== 1 ? "s" : ""} ausgewählt
                  </span>
                </div>
              </motion.div>
            )}

            {/* ── Navigation ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between pt-4 border-t border-border"
            >
              <Link href="/schritt-7" id="btn-zurueck">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück
                </Button>
              </Link>
              <Link href="/schritt-9" id="btn-weiter">
                <Button
                  size="lg"
                  className="gap-2"
                  style={{
                    background: "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)",
                  }}
                >
                  Weiter
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </PageTransition>
        </div>
      </div>
    </main>
  );
}
