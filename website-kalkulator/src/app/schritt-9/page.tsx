"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartHandshake,
  MonitorCog,
  MessageCircleQuestion,
  ArrowLeft,
  ArrowRight,
  Info,
  ShieldCheck,
  Server,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKalkulator } from "@/lib/kalkulator-context";
import PageTransition from "@/components/shared/PageTransition";
import ProgressBar from "@/components/shared/ProgressBar";

/* ──────────── Locked ON/OFF Switch ──────────── */

function LockedSwitch({ checked }: { checked: boolean }) {
  return (
    <div className={`relative w-12 h-7 rounded-full flex-shrink-0 cursor-not-allowed opacity-60 ${checked ? "bg-gray-400" : "bg-gray-300"}`}>
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md"
        animate={{ left: checked ? "calc(100% - 26px)" : "2px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
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

/* ──────────── Sub-Row ──────────── */

function SubRow({ icon: Icon, label, preis, locked, checked, onChange }: {
  icon: React.ElementType;
  label: string;
  preis: string;
  locked?: boolean;
  checked?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-card/60 border border-border/60">
      <div className="w-7 h-7 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-brand-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs font-semibold text-brand-text">{label}</span>
      </div>
      <span className="text-xs font-bold text-brand-primary bg-brand-primary/[0.06] px-2 py-0.5 rounded-full flex-shrink-0">
        {preis}
      </span>
      {locked ? (
        <LockedSwitch checked={true} />
      ) : (
        <ToggleSwitch checked={checked ?? false} onChange={onChange ?? (() => {})} />
      )}
    </div>
  );
}

/* ──────────── Info Toggle ──────────── */

function InfoToggle({ text, id, openId, setOpenId }: { text: string; id: string; openId: string | null; setOpenId: (v: string | null) => void }) {
  const isOpen = openId === id;
  return (
    <>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpenId(isOpen ? null : id); }}
        className="w-5 h-5 rounded-full bg-brand-card hover:bg-brand-primary/10 flex items-center justify-center transition-colors flex-shrink-0"
      >
        <Info className="w-3 h-3 text-brand-text-muted" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden col-span-full"
          >
            <div className="mt-2 p-3 rounded-xl bg-brand-primary/[0.04] border border-brand-primary/10">
              <p className="text-xs text-brand-text-secondary leading-relaxed">{text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ──────────── Data ──────────── */

const wartungOptionen = [
  {
    id: "keine-aenderungen" as const,
    title: "Nein, will mich nicht darum kümmern müssen",
    kurzinfo: "Du meldest dich bei uns, wir kümmern uns um Änderungen.",
    info: "Mit unserer Betreuungspauschale nehmen wir unbegrenzte Änderungen an deinen Bildern und Texten für dich vor. Du gibst uns Bescheid, wir pflegen alles innerhalb von einem Werktag ein.",
    icon: HeartHandshake,
  },
  {
    id: "selbst-aendern" as const,
    title: "Ja, ich will selbst Änderungen vornehmen",
    kurzinfo: "Es wird ein CMS aufgesetzt (ca. 30% höhere initiale Kosten, höhere Softwarekosten)",
    info: "Wir programmieren ein CMS (Content Management System), damit du Änderungen vornehmen kannst. Du bekommst zudem natürlich eine Einschulung, damit du dich zurecht findest. Du kannst dann laufend Texte und Bilder ändern.",
    icon: MonitorCog,
  },
  {
    id: "anderes" as const,
    title: "Ich will etwas ganz anderes",
    kurzinfo: "Unser Kundenberater findet eine Lösung.",
    icon: MessageCircleQuestion,
  },
];

/* ══════════════════════════════════════════ */

export default function Schritt7() {
  const { state, updateState } = useKalkulator();
  const [openInfo, setOpenInfo] = useState<string | null>(null);

  const selected = state.wartungModus;
  const canProceed = selected !== "";

  return (
    <main className="min-h-screen flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-primary/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-primary-light/[0.04] blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <ProgressBar currentStep={9} totalSteps={12} />
          </motion.div>

          <PageTransition>
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary leading-tight mb-2">
                Willst du auf deiner Website selbst Änderungen vornehmen?
              </h1>
            </div>

            {/* ── Options ── */}
            <div className="space-y-3 mb-6">
              {wartungOptionen.map((opt, i) => {
                const isSelected = selected === opt.id;
                const Icon = opt.icon;

                return (
                  <motion.div
                    key={opt.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => updateState({ wartungModus: opt.id, wartungSupport: false })}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); updateState({ wartungModus: opt.id, wartungSupport: false }); } }}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 group cursor-pointer ${isSelected ? "border-brand-primary bg-brand-primary/[0.04] shadow-md" : "border-border bg-white hover:border-brand-primary/30 hover:shadow-sm"}`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Radio */}
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-0.5 ${isSelected ? "border-brand-primary bg-brand-primary" : "border-gray-300 bg-white group-hover:border-brand-primary/40"}`}>
                          <motion.div initial={false} animate={{ scale: isSelected ? 1 : 0 }} transition={{ duration: 0.2 }} className="w-2 h-2 rounded-full bg-white" />
                        </div>

                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isSelected ? "text-white shadow-lg" : "bg-brand-card text-brand-primary group-hover:bg-brand-primary/10"}`}
                          style={isSelected ? { background: "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)" } : undefined}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-bold text-sm transition-colors ${isSelected ? "text-brand-primary" : "text-brand-text"}`}>
                              {opt.title}
                            </span>
                            {opt.info && (
                              <InfoToggle text={opt.info} id={opt.id} openId={openInfo} setOpenId={setOpenInfo} />
                            )}
                          </div>
                          <p className="text-xs text-brand-text-muted mt-1 leading-relaxed">{opt.kurzinfo}</p>
                        </div>
                      </div>
                    </div>

                    {/* ── Conditional Sub-Options ── */}
                    <AnimatePresence>
                      {isSelected && opt.id === "keine-aenderungen" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pl-8 sm:pl-12 pt-3 space-y-2">
                            <SubRow icon={Server} label="Webhosting, SSL-Zertifikat, etc." preis="10 €/Monat" locked />
                            <SubRow icon={Wrench} label="Unbegrenzte Änderungen, Wartung & Support" preis="25 €/Monat" locked />
                          </div>
                        </motion.div>
                      )}

                      {isSelected && opt.id === "selbst-aendern" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pl-8 sm:pl-12 pt-3 space-y-2">
                            <SubRow icon={MonitorCog} label="Ca. 30% Mehrkosten bei initialer Erstellung" preis="einmalig" locked />
                            <SubRow icon={Server} label="CMS, Webhosting, SSL-Zertifikat, etc." preis="25 €/Monat" locked />
                            <SubRow
                              icon={Wrench}
                              label="Unbegrenzte Änderungen, Wartung & Support"
                              preis="25 €/Monat"
                              checked={state.wartungSupport}
                              onChange={(v) => updateState({ wartungSupport: v })}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* ── Eigentums-Hinweis ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-10"
            >
              <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  <span className="font-bold">Wichtig:</span> Egal was du hier wählst, das Eigentum an der Website liegt immer zu 100% bei dir. Du bist nicht von uns abhängig, hast keine Kündigungsfristen oder Bindungen zu beachten.
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
              <Link href="/schritt-8" id="btn-zurueck">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />Zurück
                </Button>
              </Link>
              <Link href="/schritt-10" id="btn-weiter">
                <Button
                  size="lg"
                  disabled={!canProceed}
                  className="gap-2"
                  style={canProceed ? { background: "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)" } : undefined}
                >
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
