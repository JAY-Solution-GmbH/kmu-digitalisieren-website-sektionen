"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useKalkulator } from "@/lib/kalkulator-context";
import PageTransition from "@/components/shared/PageTransition";
import ProgressBar from "@/components/shared/ProgressBar";

/* ──────────────── Data ──────────────── */

interface AusgangszustandOption {
  id: string;
  title: string;
  hasUrlInput: boolean;
}

const ausgangszustandOptionen: AusgangszustandOption[] = [
  {
    id: "keine",
    title: "Keine Website vorhanden",
    hasUrlInput: false,
  },
  {
    id: "veraltet",
    title: "Bestehende Website (aber veraltet)",
    hasUrlInput: true,
  },
  {
    id: "unzufrieden",
    title: "Bestehende Website (aber nicht mehr zufrieden)",
    hasUrlInput: true,
  },
];

/* ──────────────── Component ──────────────── */

export default function Schritt3() {
  const { state, setAusgangszustand, setAktuelleSeite } = useKalkulator();

  const handleAusgangszustand = (id: string) => {
    setAusgangszustand(id);
    if (!ausgangszustandOptionen.find((o) => o.id === id)?.hasUrlInput) {
      setAktuelleSeite("");
    }
  };

  const canProceed = state.ausgangszustand !== "";

  return (
    <main className="min-h-screen flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-primary/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-primary-light/[0.04] blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <ProgressBar currentStep={3} totalSteps={12} />
          </motion.div>

          <PageTransition>
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary leading-tight mb-2">
                Wie ist deine Ausgangssituation?
              </h1>
              <p className="text-sm text-brand-text-muted">
                Wo stehst du aktuell mit deiner Website? Wähle eine Option.
              </p>
            </div>

            {/* ── Ausgangszustand (Single-Select) ── */}
            <div className="space-y-3 mb-10">
              {ausgangszustandOptionen.map((option, index) => {
                const isSelected = state.ausgangszustand === option.id;

                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <button
                      onClick={() => handleAusgangszustand(option.id)}
                      className={`
                        w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 group
                        ${
                          isSelected
                            ? "border-brand-primary bg-brand-primary/[0.04] shadow-md"
                            : "border-border bg-white hover:border-brand-primary/30 hover:shadow-sm"
                        }
                      `}
                      id={`ausgangszustand-${option.id}`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Radio indicator */}
                        <div
                          className={`
                            flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
                            ${
                              isSelected
                                ? "border-brand-primary bg-brand-primary"
                                : "border-gray-300 bg-white group-hover:border-brand-primary/40"
                            }
                          `}
                        >
                          <motion.div
                            initial={false}
                            animate={{
                              scale: isSelected ? 1 : 0,
                              opacity: isSelected ? 1 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="w-2 h-2 rounded-full bg-white"
                          />
                        </div>

                        <div className="flex items-center gap-2 flex-1">
                          <Globe
                            className={`w-4 h-4 flex-shrink-0 transition-colors ${
                              isSelected
                                ? "text-brand-primary"
                                : "text-brand-text-muted"
                            }`}
                          />
                          <span
                            className={`font-semibold text-sm transition-colors ${
                              isSelected
                                ? "text-brand-primary"
                                : "text-brand-text"
                            }`}
                          >
                            {option.title}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* Optional URL Input */}
                    <AnimatePresence>
                      {isSelected && option.hasUrlInput && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 pl-8 sm:pl-12">
                            <label className="text-xs font-semibold text-brand-text-muted mb-1.5 block">
                              Nenne uns die aktuelle Seite{" "}
                              <span className="text-brand-text-muted/60">
                                (optional)
                              </span>
                            </label>
                            <Input
                              type="url"
                              placeholder="z.B. www.deine-website.at"
                              value={state.aktuelleSeite}
                              onChange={(e) =>
                                setAktuelleSeite(e.target.value)
                              }
                              className="max-w-sm"
                              id="input-aktuelle-seite"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* ── Navigation ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center justify-between pt-4 border-t border-border"
            >
              <Link href="/schritt-2" id="btn-zurueck">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück
                </Button>
              </Link>

              <Link href="/schritt-4">
                <Button
                  size="lg"
                  disabled={!canProceed}
                  className="gap-2"
                  style={
                    canProceed
                      ? {
                          background:
                            "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)",
                        }
                      : undefined
                  }
                  id="btn-weiter"
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
