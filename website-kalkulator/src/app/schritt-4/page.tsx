"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Layers,
  Building2,
  Rocket,
  ArrowLeft,
  ArrowRight,
  Info,
  Briefcase,
  FolderOpen,
  ShoppingBag,
  Users,
  UserPlus,
  Mail,
  PenTool,
  FilePlus,
  Scale,
  Shield,
  ScrollText,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { useKalkulator } from "@/lib/kalkulator-context";
import type { SeitenDetail } from "@/lib/kalkulator-context";
import PageTransition from "@/components/shared/PageTransition";
import ProgressBar from "@/components/shared/ProgressBar";
import ToggleSwitch from "@/components/shared/ToggleSwitch";

/* ──────────── Grobe Struktur Data ──────────── */

const grobeOptionen = [
  {
    id: "onepager",
    title: "Onepager",
    desc: "Eine Hauptseite + Impressum/Datenschutz (keine Unterseiten)",
    gewaehlt: "Neugründer und Ein-Personen-Unternehmen",
    ziel: "Grundlegende Online-Präsenz",
    icon: FileText,
  },
  {
    id: "klein",
    title: "Kleine Website",
    desc: "Startseite mit 2–4 Unterseiten (Leistungen, Über uns, Kontakt, etc.) + Impressum/Datenschutz",
    gewaehlt: "Neugründern, Ein-Personen-Unternehmen, kleine regionale Unternehmen",
    ziel: "Präsentation & grundlegende Kundengewinnung",
    icon: Layers,
  },
  {
    id: "mittel",
    title: "Mittlere Website",
    desc: "Startseite mit 5–10 Unterseiten (Leistung A, B, C, Referenzen, Karriere, Über uns, Kontakt, etc.) + Impressum/Datenschutz",
    gewaehlt: "Etablierte regionale Unternehmen; überregional tätige Unternehmen",
    ziel: "Image, Professionalität & effektive Kundengewinnung",
    icon: Building2,
  },
  {
    id: "gross",
    title: "Große Website",
    desc: "Startseite mit 11–20 Unterseiten (Leistung A, B, C, Referenz A, B, C, Über uns, Team, Karriere, Kontakt, etc.) + Impressum/Datenschutz",
    gewaehlt: "Wachstumsorientierte Unternehmen; regional und überregional erfolgreiche Unternehmen",
    ziel: "Image, aktive Neukundengewinnung & effektive Arbeitgeberpositionierung",
    icon: Rocket,
  },
];

/* ──────────── Kontakt-Optionen ──────────── */
const kontaktOptionen = [
  { id: "kontaktdaten", label: "Nur Kontaktdaten" },
  { id: "formular", label: "Einfaches Kontaktformular" },
  { id: "kalkulator", label: "Komplexes Kontaktformular (Kalkulator, oÄ)" },
];

/* ──────────── Number Stepper ──────────── */
function NumberStepper({ value, onChange, min = 1, max = 30 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl border-2 border-border bg-white">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="w-9 h-9 flex items-center justify-center text-brand-text-muted hover:text-brand-primary transition-colors rounded-l-lg hover:bg-brand-card" disabled={value <= min}>
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="w-10 text-center text-sm font-bold text-brand-primary tabular-nums">{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className="w-9 h-9 flex items-center justify-center text-brand-text-muted hover:text-brand-primary transition-colors rounded-r-lg hover:bg-brand-card" disabled={value >= max}>
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ──────────── ON/OFF Switch ──────────── */
function OnOffSwitch({ checked, onChange, disabled = false }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      className={`relative w-12 h-7 rounded-full transition-all duration-300 flex-shrink-0 ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} ${checked ? (disabled ? "bg-gray-400" : "bg-brand-primary") : "bg-gray-200"}`}
    >
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md"
        animate={{ left: checked ? "calc(100% - 26px)" : "2px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

/* ──────────── Info Tooltip ──────────── */
function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button type="button" onClick={() => setOpen(!open)} className="w-5 h-5 rounded-full bg-brand-card hover:bg-brand-primary/10 flex items-center justify-center transition-colors">
        <Info className="w-3 h-3 text-brand-text-muted" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} className="absolute left-0 sm:left-auto sm:right-0 top-7 z-50 w-64 p-3 rounded-xl bg-white border border-border shadow-xl text-xs text-brand-text-secondary leading-relaxed">
            {text}
            <button type="button" onClick={() => setOpen(false)} className="block mt-2 text-brand-primary font-semibold text-[11px]">Schließen</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────── Seiten-Zeile mit Detail-Optionen ──────────── */
interface SeitenRowProps {
  icon: React.ElementType;
  label: string;
  kurzinfo: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  locked?: boolean;
  hinweis?: string;
  infoText?: string;
  children?: React.ReactNode;
}

function SeitenRow({ icon: Icon, label, kurzinfo, checked, onChange, locked, hinweis, infoText, children }: SeitenRowProps) {
  return (
    <div className={`rounded-2xl border-2 transition-all duration-300 ${checked ? "border-brand-primary/30 bg-brand-primary/[0.02]" : "border-border bg-white"}`}>
      <div className="flex items-center gap-3 p-4">
        <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${checked ? "bg-brand-primary text-white" : "bg-brand-card text-brand-text-muted"}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`font-bold text-sm transition-colors ${checked ? "text-brand-primary" : "text-brand-text"}`}>{label}</span>
            {locked && <span className="text-[10px] font-semibold text-brand-primary/60 bg-brand-primary/[0.06] px-1.5 py-0.5 rounded">Pflicht</span>}
            {infoText && <InfoTooltip text={infoText} />}
          </div>
          <p className="text-xs text-brand-text-muted mt-0.5 leading-relaxed">{kurzinfo}</p>
          {hinweis && checked && <p className="text-[11px] text-brand-primary/70 mt-1 italic">{hinweis}</p>}
        </div>
        <OnOffSwitch checked={checked} onChange={onChange} disabled={locked} />
      </div>
      <AnimatePresence>
        {checked && children && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <div className="px-4 pb-4 pt-0 ml-12">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────── Detail-Optionen (Separat/Gesammelt + Anzahl) ──────────── */
function DetailOptionen({ detail, onChange, separatLabel, gesammeltLabel }: { detail: SeitenDetail; onChange: (d: SeitenDetail) => void; separatLabel: string; gesammeltLabel: string }) {
  return (
    <div className="space-y-3">
      <ToggleSwitch
        leftLabel={gesammeltLabel}
        rightLabel={separatLabel}
        value={detail.modus === "gesammelt" ? "left" : "right"}
        onChange={(v) => onChange({ ...detail, modus: v === "left" ? "gesammelt" : "separat" })}
        className="w-full"
      />
      <AnimatePresence>
        {detail.modus === "separat" && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-semibold text-brand-text-muted">Anzahl Seiten:</span>
              <NumberStepper value={detail.anzahl} onChange={(v) => onChange({ ...detail, anzahl: v })} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════ */
/*              HAUPTKOMPONENTE              */
/* ══════════════════════════════════════════ */

export default function Schritt4() {
  const { state, updateState, updateSeiten } = useKalkulator();

  const modus = state.strukturModus;
  const seiten = state.seiten;

  const canProceed = modus === "grob" ? state.grobeStruktur !== "" : true;

  /* Helper zum Update von verschachtelten Seiten-Details */
  const updateLeistungen = (d: SeitenDetail) => updateSeiten({ leistungen: d });
  const updateReferenzen = (d: SeitenDetail) => updateSeiten({ referenzen: d });
  const updateProdukte = (d: SeitenDetail) => updateSeiten({ produkte: d });

  const toggleKontaktOption = (optId: string) => {
    const current = seiten.kontakt.optionen;
    const next = current.includes(optId) ? current.filter((o) => o !== optId) : [...current, optId];
    updateSeiten({ kontakt: { ...seiten.kontakt, optionen: next } });
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-primary/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-primary-light/[0.04] blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <ProgressBar currentStep={4} totalSteps={12} />
          </motion.div>

          <PageTransition>
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary leading-tight mb-2">
                Weißt du schon, wie groß deine Website werden soll?
              </h1>
            </div>

            {/* ── Modus Toggle ── */}
            <div className="mb-8 flex justify-center">
              <ToggleSwitch
                leftLabel="Habe eine grobe Vorstellung"
                rightLabel="Weiß genau wie viele Unterseiten"
                value={modus === "grob" ? "left" : "right"}
                onChange={(v) => updateState({ strukturModus: v === "left" ? "grob" : "genau" })}
                className="w-full max-w-lg"
              />
            </div>

            <AnimatePresence mode="wait">
              {modus === "grob" ? (
                /* ═══ GROBE VORSTELLUNG ═══ */
                <motion.div key="grob" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                  <div className="space-y-3">
                    {grobeOptionen.map((opt, i) => {
                      const isSelected = state.grobeStruktur === opt.id;
                      const Icon = opt.icon;
                      return (
                        <motion.button
                          key={opt.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.4 }}
                          onClick={() => updateState({ grobeStruktur: opt.id })}
                          className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 group ${isSelected ? "border-brand-primary bg-brand-primary/[0.04] shadow-md" : "border-border bg-white hover:border-brand-primary/30 hover:shadow-sm"}`}
                          id={`grob-${opt.id}`}
                        >
                          <div className="absolute top-3 right-3 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300" style={{ position: "absolute" }}>
                            {isSelected && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-lg bg-brand-primary flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                              </motion.div>
                            )}
                          </div>
                          <div className="flex items-start gap-3 pr-8 relative">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isSelected ? "text-white shadow-lg" : "bg-brand-card text-brand-primary group-hover:bg-brand-primary/10"}`} style={isSelected ? { background: "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)" } : undefined}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className={`font-bold text-sm mb-1 ${isSelected ? "text-brand-primary" : "text-brand-text"}`}>{opt.title}</h3>
                              <p className="text-xs text-brand-text-muted leading-relaxed mb-2">{opt.desc}</p>
                              <div className="flex flex-col sm:flex-row sm:gap-4 gap-1 text-[11px]">
                                <span className="text-brand-text-muted"><span className="font-semibold text-brand-primary/70">Gern gewählt von:</span> {opt.gewaehlt}</span>
                              </div>
                              <div className="mt-1 text-[11px] text-brand-text-muted">
                                <span className="font-semibold text-brand-primary/70">Zielsetzung:</span> {opt.ziel}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                /* ═══ GENAUE SEITENAUSWAHL ═══ */
                <motion.div key="genau" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                  <div className="space-y-2.5">
                    <SeitenRow icon={FileText} label="Startseite" kurzinfo="Die Hauptseite deiner Website" checked={true} onChange={() => {}} locked />

                    <SeitenRow
                      icon={Briefcase}
                      label="Leistungen"
                      kurzinfo="Deine Leistungen / Angebote, auf einer oder mehreren Seiten"
                      checked={seiten.leistungen.aktiv}
                      onChange={(v) => updateSeiten({ leistungen: { ...seiten.leistungen, aktiv: v } })}
                    >
                      <DetailOptionen detail={seiten.leistungen} onChange={updateLeistungen} separatLabel="Mehrere separate Seiten" gesammeltLabel="Auf einer Seite" />
                    </SeitenRow>

                    <SeitenRow
                      icon={FolderOpen}
                      label="Referenzen / Projekte"
                      kurzinfo="Immobilien (als Baufirma/Architekt), Projekte (als Handwerker) oder Ähnliches"
                      checked={seiten.referenzen.aktiv}
                      onChange={(v) => updateSeiten({ referenzen: { ...seiten.referenzen, aktiv: v } })}
                      infoText="Eine oder mehrere Seiten, wo du Referenzen / Projekte darstellen kannst. Zum Beispiel gebaute Immobilien (Baufirma, Architekt), umgesetzte Projekte (Handwerker, etc.) oder Kundenprojekte (Dienstleister, Agenturen, etc.)."
                    >
                      <DetailOptionen detail={seiten.referenzen} onChange={updateReferenzen} separatLabel="Mehrere separate Seiten" gesammeltLabel="Auf einer Seite" />
                    </SeitenRow>

                    <SeitenRow
                      icon={ShoppingBag}
                      label="Produkte"
                      kurzinfo="Autos (als KFZ-Handel), Immobilien (als Makler/Bauträger) oder Ähnliches"
                      checked={seiten.produkte.aktiv}
                      onChange={(v) => updateSeiten({ produkte: { ...seiten.produkte, aktiv: v } })}
                      infoText="Hier kannst du deine aktuellen Produkte vorstellen. Zum Beispiel Autos, die aktuell zum Verkauf stehen (KFZ-Handel), verfügbare Immobilien (Makler, Bauträger, etc.) oder Vorträge/Seminare (Dienstleister, etc.)."
                    >
                      <DetailOptionen detail={seiten.produkte} onChange={updateProdukte} separatLabel="Mehrere separate Seiten" gesammeltLabel="Auf einer Seite" />
                    </SeitenRow>

                    <SeitenRow icon={Users} label="Über uns" kurzinfo="Vorstellung, Firmengeschichte, Team, etc." checked={seiten.ueberUns} onChange={(v) => updateSeiten({ ueberUns: v })} />

                    <SeitenRow icon={UserPlus} label="Karriere" kurzinfo="Seite mit Jobs und Arbeitgebervorstellung" checked={seiten.karriere} onChange={(v) => updateSeiten({ karriere: v })} />

                    <SeitenRow
                      icon={Mail}
                      label="Kontakt"
                      kurzinfo="Kontaktseite mit verschiedenen Optionen"
                      checked={seiten.kontakt.aktiv}
                      onChange={(v) => updateSeiten({ kontakt: { ...seiten.kontakt, aktiv: v } })}
                    >
                      <div className="space-y-2">
                        {kontaktOptionen.map((opt) => {
                          const isChecked = seiten.kontakt.optionen.includes(opt.id);
                          return (
                            <button key={opt.id} type="button" onClick={() => toggleKontaktOption(opt.id)} className={`w-full text-left px-3 py-2.5 rounded-xl border-2 text-xs font-semibold transition-all duration-200 ${isChecked ? "border-brand-primary bg-brand-primary/[0.04] text-brand-primary" : "border-border bg-white text-brand-text-muted hover:border-brand-primary/30"}`}>
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded flex items-center justify-center transition-all ${isChecked ? "bg-brand-primary text-white" : "bg-brand-card"}`}>
                                  {isChecked && <Check className="w-2.5 h-2.5" strokeWidth={3} />}
                                </div>
                                {opt.label}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </SeitenRow>

                    <SeitenRow icon={PenTool} label="Blog" kurzinfo="Regelmäßige Beiträge und Artikel" checked={seiten.blog} onChange={(v) => updateSeiten({ blog: v })} />

                    <SeitenRow
                      icon={FilePlus}
                      label="Sonstige Seiten"
                      kurzinfo="Weitere Seiten, die oben nicht abgedeckt sind"
                      checked={seiten.sonstige.aktiv}
                      onChange={(v) => updateSeiten({ sonstige: { ...seiten.sonstige, aktiv: v } })}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-brand-text-muted">Anzahl:</span>
                        <NumberStepper value={seiten.sonstige.anzahl} onChange={(v) => updateSeiten({ sonstige: { ...seiten.sonstige, anzahl: v } })} />
                      </div>
                    </SeitenRow>

                    <div className="relative my-4 !mt-6">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                      <div className="relative flex justify-center"><span className="bg-white px-3 text-[10px] font-semibold text-brand-text-muted tracking-wide uppercase">Rechtliches</span></div>
                    </div>

                    <SeitenRow icon={ScrollText} label="Impressum" kurzinfo="Umfangreiche Vorlage wird von uns zur Verfügung gestellt." checked={true} onChange={() => {}} locked hinweis="Umfangreiche Vorlage wird von uns zur Verfügung gestellt." />
                    <SeitenRow icon={Shield} label="Datenschutz" kurzinfo="Umfangreiche Vorlage wird von uns zur Verfügung gestellt." checked={true} onChange={() => {}} locked hinweis="Umfangreiche Vorlage wird von uns zur Verfügung gestellt." />
                    <SeitenRow icon={Scale} label="AGB" kurzinfo="Wird von dir zur Verfügung gestellt, rechtlich nicht notwendig." checked={seiten.agb} onChange={(v) => updateSeiten({ agb: v })} hinweis="Wird von dir zur Verfügung gestellt, rechtlich nicht notwendig." />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Navigation ── */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-center justify-between pt-8 mt-8 border-t border-border">
              <Link href="/schritt-3" id="btn-zurueck">
                <Button variant="ghost" className="gap-2"><ArrowLeft className="w-4 h-4" />Zurück</Button>
              </Link>
              <Link href="/schritt-5" id="btn-weiter">
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
