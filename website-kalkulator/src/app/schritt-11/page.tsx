"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Send,
  User,
  Building2,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useKalkulator } from "@/lib/kalkulator-context";
import PageTransition from "@/components/shared/PageTransition";
import ProgressBar from "@/components/shared/ProgressBar";

/* ══════════════════════════════════════════ */

export default function Schritt9() {
  const router = useRouter();
  const { state, updateState } = useKalkulator();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { vorname, nachname, unternehmen, email, telefon } = state;

  const canSubmit =
    vorname.trim() !== "" &&
    nachname.trim() !== "" &&
    email.trim() !== "" &&
    telefon.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);

    // Simulate sending (replace with actual API call later)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    router.push("/schritt-12");
  };

  const inputClass =
    "h-12 rounded-2xl border-2 border-border bg-white px-4 text-sm font-medium text-brand-text placeholder:text-brand-text-muted/50 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all duration-200";

  return (
    <main className="min-h-screen flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-primary/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-primary-light/[0.04] blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <ProgressBar currentStep={11} totalSteps={12} />
          </motion.div>

          <PageTransition>
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary leading-tight mb-2">
                Fast geschafft – Kontaktdaten
              </h1>
              <p className="text-sm text-brand-text-muted">
                Damit wir dir das Angebot zusenden können, brauchen wir noch deine Kontaktdaten.
              </p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mb-8">
                {/* Vorname + Nachname */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div>
                    <label htmlFor="vorname" className="text-xs font-semibold text-brand-text-muted mb-1.5 block">
                      Vorname <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted/40" />
                      <Input
                        id="vorname"
                        type="text"
                        placeholder="Max"
                        value={vorname}
                        onChange={(e) => updateState({ vorname: e.target.value })}
                        className={`${inputClass} pl-10`}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="nachname" className="text-xs font-semibold text-brand-text-muted mb-1.5 block">
                      Nachname <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted/40" />
                      <Input
                        id="nachname"
                        type="text"
                        placeholder="Mustermann"
                        value={nachname}
                        onChange={(e) => updateState({ nachname: e.target.value })}
                        className={`${inputClass} pl-10`}
                        required
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Unternehmen */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <label htmlFor="unternehmen" className="text-xs font-semibold text-brand-text-muted mb-1.5 block">
                    Unternehmensname
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted/40" />
                    <Input
                      id="unternehmen"
                      type="text"
                      placeholder="Musterfirma GmbH"
                      value={unternehmen}
                      onChange={(e) => updateState({ unternehmen: e.target.value })}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </motion.div>

                {/* E-Mail */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="email" className="text-xs font-semibold text-brand-text-muted mb-1.5 block">
                    E-Mail <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted/40" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="max@musterfirma.at"
                      value={email}
                      onChange={(e) => updateState({ email: e.target.value })}
                      className={`${inputClass} pl-10`}
                      required
                    />
                  </div>
                </motion.div>

                {/* Telefon */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <label htmlFor="telefon" className="text-xs font-semibold text-brand-text-muted mb-1.5 block">
                    Telefonnummer <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted/40" />
                    <Input
                      id="telefon"
                      type="tel"
                      placeholder="+43 660 123 4567"
                      value={telefon}
                      onChange={(e) => updateState({ telefon: e.target.value })}
                      className={`${inputClass} pl-10`}
                      required
                    />
                  </div>
                </motion.div>
              </div>

              {/* ── Submit ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mb-10"
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={!canSubmit || isSubmitting}
                  className="w-full gap-2 text-base h-14 rounded-2xl"
                  style={
                    canSubmit && !isSubmitting
                      ? { background: "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)" }
                      : undefined
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Angebot anfordern
                    </>
                  )}
                </Button>
              </motion.div>

              {/* ── Navigation ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between pt-4 border-t border-border"
              >
                <Link href="/schritt-10" id="btn-zurueck">
                  <Button type="button" variant="ghost" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />Zurück
                  </Button>
                </Link>
              </motion.div>
            </form>
          </PageTransition>
        </div>
      </div>
    </main>
  );
}
