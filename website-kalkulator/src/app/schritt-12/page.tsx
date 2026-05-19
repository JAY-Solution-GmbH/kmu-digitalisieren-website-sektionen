"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/shared/PageTransition";
import ProgressBar from "@/components/shared/ProgressBar";

/* ══════════════════════════════════════════ */

export default function Schritt10() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-primary/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-primary-light/[0.04] blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <ProgressBar currentStep={12} totalSteps={12} />
          </motion.div>

          <PageTransition>
            <div className="text-center">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="mb-8 inline-flex"
              >
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
                  style={{
                    background: "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)",
                  }}
                >
                  <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={1.5} />
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-2xl sm:text-3xl font-bold text-brand-primary leading-tight mb-4"
              >
                Eine gute Entscheidung!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-base text-brand-text-secondary leading-relaxed mb-10 max-w-md mx-auto"
              >
                Wir haben deine Informationen erhalten.
              </motion.p>

              {/* Info Cards */}
              <div className="space-y-4 mb-10 max-w-md mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-border text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-brand-primary mb-1">Innerhalb von 1 Werktag</h3>
                    <p className="text-xs text-brand-text-muted leading-relaxed">
                      Unser Geschäftsführer oder einer unserer Kundenberater macht das Angebot für dich fertig und meldet sich bei dir.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-border text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-brand-primary mb-1">Persönliche Betreuung</h3>
                    <p className="text-xs text-brand-text-muted leading-relaxed">
                      Du erhältst ein individuelles Angebot – zugeschnitten auf deine Wünsche und Anforderungen.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
              >
                <a href="https://kmu-digitalisieren.com" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="gap-2 text-base"
                    style={{
                      background: "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)",
                    }}
                  >
                    Zur Hauptseite
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </motion.div>
            </div>
          </PageTransition>
        </div>
      </div>
    </main>
  );
}
