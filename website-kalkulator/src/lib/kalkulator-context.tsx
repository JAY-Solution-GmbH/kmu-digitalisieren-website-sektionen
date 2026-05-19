"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

/* ──────────────── Types ──────────────── */

export interface SeitenDetail {
  aktiv: boolean;
  modus: "separat" | "gesammelt";
  anzahl: number;
}

export interface KontaktDetail {
  aktiv: boolean;
  optionen: string[];
}

export interface SonstigeDetail {
  aktiv: boolean;
  anzahl: number;
}

export interface SeitenConfig {
  leistungen: SeitenDetail;
  referenzen: SeitenDetail;
  produkte: SeitenDetail;
  ueberUns: boolean;
  karriere: boolean;
  kontakt: KontaktDetail;
  blog: boolean;
  sonstige: SonstigeDetail;
  agb: boolean;
}

export interface AddOns {
  sprache: boolean;
  toolIntegration: boolean;
  kalender: boolean;
  newsletter: boolean;
  zahlung: boolean;
}

export interface KalkulatorState {
  // Schritt 2
  ziele: string[];
  ausgangszustand: string;
  aktuelleSeite: string;
  // Schritt 3
  strukturModus: "grob" | "genau";
  grobeStruktur: string;
  seiten: SeitenConfig;
  // Schritt 4
  fotos: string;
  logo: string;
  // Schritt 6
  addOns: AddOns;
  // Schritt 7
  wartungModus: "keine-aenderungen" | "selbst-aendern" | "anderes" | "";
  wartungSupport: boolean;
  // Schritt 8
  zahlungsVariante: "sparfuchs" | "klassiker" | "leasing" | "";
  // Schritt 9
  vorname: string;
  nachname: string;
  unternehmen: string;
  email: string;
  telefon: string;
}

interface KalkulatorContextType {
  state: KalkulatorState;
  updateState: (partial: Partial<KalkulatorState>) => void;
  setZiele: (ziele: string[]) => void;
  toggleZiel: (ziel: string) => void;
  setAusgangszustand: (zustand: string) => void;
  setAktuelleSeite: (url: string) => void;
  updateSeiten: (partial: Partial<SeitenConfig>) => void;
  resetState: () => void;
}

const initialSeiten: SeitenConfig = {
  leistungen: { aktiv: false, modus: "gesammelt", anzahl: 2 },
  referenzen: { aktiv: false, modus: "gesammelt", anzahl: 2 },
  produkte: { aktiv: false, modus: "gesammelt", anzahl: 2 },
  ueberUns: false,
  karriere: false,
  kontakt: { aktiv: false, optionen: [] },
  blog: false,
  sonstige: { aktiv: false, anzahl: 1 },
  agb: false,
};

const initialAddOns: AddOns = {
  sprache: false,
  toolIntegration: false,
  kalender: false,
  newsletter: false,
  zahlung: false,
};

const initialState: KalkulatorState = {
  ziele: [],
  ausgangszustand: "",
  aktuelleSeite: "",
  strukturModus: "grob",
  grobeStruktur: "",
  seiten: initialSeiten,
  fotos: "",
  logo: "",
  addOns: initialAddOns,
  wartungModus: "",
  wartungSupport: false,
  zahlungsVariante: "",
  vorname: "",
  nachname: "",
  unternehmen: "",
  email: "",
  telefon: "",
};

/* ────── Pricing Logic ────── */

export function berechnePreis(state: KalkulatorState) {
  let websitePreis = 0;

  // Struktur
  if (state.strukturModus === "grob") {
    const preise: Record<string, number> = { onepager: 1250, klein: 1500, mittel: 2300, gross: 2900 };
    websitePreis += preise[state.grobeStruktur] || 0;
  } else {
    // Genau-Modus: Startseite als Basis
    websitePreis += 1250; // Startseite (inkl. Impressum + Datenschutz)
    const s = state.seiten;
    if (s.leistungen.aktiv) websitePreis += s.leistungen.modus === "separat" ? 75 + s.leistungen.anzahl * 25 : 75;
    if (s.referenzen.aktiv) websitePreis += s.referenzen.modus === "separat" ? 150 + s.referenzen.anzahl * 35 : 150;
    if (s.produkte.aktiv) websitePreis += s.produkte.modus === "separat" ? 150 + s.produkte.anzahl * 35 : 150;
    if (s.ueberUns) websitePreis += 150;
    if (s.karriere) websitePreis += 150;
    if (s.kontakt.aktiv) {
      if (s.kontakt.optionen.includes("kontaktdaten")) websitePreis += 75;
      if (s.kontakt.optionen.includes("formular")) websitePreis += 125;
      if (s.kontakt.optionen.includes("kalkulator")) websitePreis += 200;
    }
    if (s.blog) websitePreis += 150;
    if (s.sonstige.aktiv) websitePreis += s.sonstige.anzahl * 75;
    if (s.agb) websitePreis += 50;
  }

  // Fotos
  if (state.fotos === "fotoshooting") websitePreis += 490;

  // Logo
  if (state.logo === "einfach") websitePreis += 280;

  // Add-Ons
  if (state.addOns.sprache) websitePreis += 290;
  if (state.addOns.toolIntegration) websitePreis += 90;
  if (state.addOns.kalender) websitePreis += 90;
  if (state.addOns.newsletter) websitePreis += 90;
  if (state.addOns.zahlung) websitePreis += 250;

  // CMS Aufschlag
  if (state.wartungModus === "selbst-aendern") {
    websitePreis = Math.round(websitePreis * 1.3);
  }

  // Monatliche Kosten
  let monatlich = 0;
  const monatlichDetails: string[] = [];
  if (state.wartungModus === "keine-aenderungen") {
    monatlich = 35;
    monatlichDetails.push("10 € Webhosting, SSL-Zertifikat, etc.");
    monatlichDetails.push("25 € Unbegrenzte Änderungen, Wartung & Support");
  } else if (state.wartungModus === "selbst-aendern") {
    monatlich = 25;
    monatlichDetails.push("25 € CMS, Webhosting, SSL-Zertifikat, etc.");
    if (state.wartungSupport) {
      monatlich += 25;
      monatlichDetails.push("25 € Unbegrenzte Änderungen, Wartung & Support");
    }
  }

  return { websitePreis, monatlich, monatlichDetails };
}

const KalkulatorContext = createContext<KalkulatorContextType | undefined>(
  undefined
);

export function KalkulatorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<KalkulatorState>(initialState);

  const updateState = (partial: Partial<KalkulatorState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  };

  const setZiele = (ziele: string[]) => {
    setState((prev) => ({ ...prev, ziele }));
  };

  const toggleZiel = (ziel: string) => {
    setState((prev) => ({
      ...prev,
      ziele: prev.ziele.includes(ziel)
        ? prev.ziele.filter((z) => z !== ziel)
        : [...prev.ziele, ziel],
    }));
  };

  const setAusgangszustand = (zustand: string) => {
    setState((prev) => ({ ...prev, ausgangszustand: zustand }));
  };

  const setAktuelleSeite = (url: string) => {
    setState((prev) => ({ ...prev, aktuelleSeite: url }));
  };

  const updateSeiten = (partial: Partial<SeitenConfig>) => {
    setState((prev) => ({
      ...prev,
      seiten: { ...prev.seiten, ...partial },
    }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return (
    <KalkulatorContext.Provider
      value={{
        state,
        updateState,
        setZiele,
        toggleZiel,
        setAusgangszustand,
        setAktuelleSeite,
        updateSeiten,
        resetState,
      }}
    >
      {children}
    </KalkulatorContext.Provider>
  );
}

export function useKalkulator() {
  const context = useContext(KalkulatorContext);
  if (!context) {
    throw new Error(
      "useKalkulator must be used within a KalkulatorProvider"
    );
  }
  return context;
}
