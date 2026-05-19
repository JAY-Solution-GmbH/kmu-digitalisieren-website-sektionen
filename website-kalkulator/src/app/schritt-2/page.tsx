"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Users,
  UserPlus,
  ShoppingBag,
  Store,
  HelpCircle,
  Check,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Calendar,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKalkulator } from "@/lib/kalkulator-context";
import PageTransition from "@/components/shared/PageTransition";
import ProgressBar from "@/components/shared/ProgressBar";

/* ──────────────── Data ──────────────── */

interface ZielOption {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const zielOptionen: ZielOption[] = [
  {
    id: "image",
    title: "Image / Präsentation",
    description:
      "Du bist auf deine Website nicht angewiesen, aber ein professioneller Auftritt ist dir dennoch wichtig.",
    icon: Award,
  },
  {
    id: "neukundengewinnung",
    title: "Neukundengewinnung",
    description:
      "Du willst aktiv mehr Kundenanfragen (Leads) über deine Website generieren.",
    icon: Users,
  },
  {
    id: "mitarbeitergewinnung",
    title: "Mitarbeitergewinnung",
    description:
      "Du hast genügend Aufträge, aber willst dich als attraktiver Arbeitgeber positionieren.",
    icon: UserPlus,
  },
  {
    id: "produktverkauf",
    title: "Produktverkauf",
    description:
      "Du hast wenige Produkte, die du online verkaufen möchtest, benötigst allerdings keinen vollwertigen Online-Shop.",
    icon: ShoppingBag,
  },
  {
    id: "online-shop",
    title: "Online-Shop",
    description:
      "Du willst einen vollwertigen Online-Shop (Shopify oder ähnliches).",
    icon: Store,
  },
  {
    id: "sonstiges",
    title: "Sonstiges / noch nicht sicher",
    description:
      "Du bist dir noch nicht ganz sicher, was für deine aktuelle Situation Priorität hat.",
    icon: HelpCircle,
  },
];

/* ──────────────── Component ──────────────── */

export default function Schritt2() {
  const { state, toggleZiel } = useKalkulator();
  const [showOnlineShopHint, setShowOnlineShopHint] = useState(false);

  const handleZielClick = (zielId: string) => {
    if (zielId === "online-shop") {
      if (state.ziele.includes("online-shop")) {
        toggleZiel(zielId);
        setShowOnlineShopHint(false);
      } else {
        toggleZiel(zielId);
        setShowOnlineShopHint(true);
      }
    } else {
      toggleZiel(zielId);
    }
  };

  const canProceed = state.ziele.length > 0;

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
            <ProgressBar currentStep={2} totalSteps={12} />
          </motion.div>

          <PageTransition>
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary leading-tight mb-2">
                Erzähle uns erstmal was zu deiner Zielsetzung
              </h1>
              <p className="text-sm text-brand-text-muted">
                Wähle alle zutreffenden Ziele aus. Mehrfachauswahl möglich.
              </p>
            </div>

            {/* ── Ziel-Auswahl (Multi-Select Cards) ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {zielOptionen.map((ziel, index) => {
                const isSelected = state.ziele.includes(ziel.id);
                const Icon = ziel.icon;

                return (
                  <motion.button
                    key={ziel.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => handleZielClick(ziel.id)}
                    className={`
                      relative text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 group
                      ${
                        isSelected
                          ? "border-brand-primary bg-brand-primary/[0.04] shadow-md"
                          : "border-border bg-white hover:border-brand-primary/30 hover:shadow-sm"
                      }
                    `}
                    id={`ziel-${ziel.id}`}
                  >
                    <div
                      className={`
                        absolute top-3 right-3 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300
                        ${
                          isSelected
                            ? "bg-brand-primary text-white scale-100"
                            : "bg-brand-card text-transparent scale-90"
                        }
                      `}
                    >
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>

                    <div className="flex items-start gap-3 pr-6">
                      <div
                        className={`
                          flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                          ${
                            isSelected
                              ? "bg-brand-primary text-white shadow-lg"
                              : "bg-brand-card text-brand-primary group-hover:bg-brand-primary/10"
                          }
                        `}
                        style={
                          isSelected
                            ? {
                                background:
                                  "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)",
                              }
                            : undefined
                        }
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3
                          className={`font-bold text-sm mb-1 transition-colors ${
                            isSelected
                              ? "text-brand-primary"
                              : "text-brand-text"
                          }`}
                        >
                          {ziel.title}
                        </h3>
                        <p className="text-xs text-brand-text-muted leading-relaxed">
                          {ziel.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Online-Shop Hint */}
            <AnimatePresence>
              {showOnlineShopHint && state.ziele.includes("online-shop") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden mb-6"
                >
                  <div className="p-5 rounded-2xl border-2 border-amber-300/60 bg-amber-50/50">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-800 text-sm mb-1">
                          Hinweis zu Online-Shops
                        </h4>
                        <p className="text-sm text-amber-700 leading-relaxed mb-3">
                          Für Online-Shops haben wir nur sehr begrenzte
                          Kapazität. Wir empfehlen dir ein kostenloses
                          Erstgespräch zur individuellen Abklärung.
                        </p>
                        <a href="#erstgespraech" id="cta-online-shop-erstgespraech">
                          <Button
                            size="sm"
                            className="gap-2"
                            style={{
                              background:
                                "radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%)",
                            }}
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            Erstgespräch buchen
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Navigation ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center justify-between pt-4 border-t border-border mt-4"
            >
              <Link href="/" id="btn-zurueck">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück
                </Button>
              </Link>

              <Link href="/schritt-3">
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
