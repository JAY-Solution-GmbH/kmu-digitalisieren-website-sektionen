# Design System – kmu-digitalisieren.com

Dieses Dokument enthält alle Design-Tokens, Farbwerte, Typografie-Regeln, Abstände, Animationen und Komponenten-Muster, die für die Website-Sektionen von `kmu-digitalisieren.com` verwendet wurden. Es dient als Referenz für zukünftige Erweiterungen und neue Projekte.

---

## 1. Typografie

### Schriftart
```
font-family: 'Cabin Condensed', sans-serif;
```
Geladen über Google Fonts (sollte global im Baukasten eingebunden sein):
```
https://fonts.googleapis.com/css2?family=Cabin+Condensed:wght@400;600;700&display=swap
```

### Schriftgewichte
| Gewicht | Verwendung |
|---|---|
| `400` | Fließtext, Labels, Zitate |
| `600` | Zwischenüberschriften, Hinweise |
| `700` | Hauptüberschriften, Listentitel |

### Schriftgrößen
| Element | Größe |
|---|---|
| Basis-Fließtext | `16px` |
| Kleiner Fließtext (Mobile) | `15px` |
| Branchen-Label | `11px` |
| Vorschau-Badge | `13px` |
| Kachel-Cardtext | `16px` |
| Kachel-Kartentitel (h3) | `20px` |
| Listentitel (h2) | `28px` / `24px` Tablet / `22px` Mobil |
| Sektions-Titel (h3) | `2.2rem` (≈ 35px) |
| Zitat-Text | `1.15rem` |
| Zitat-Quelle (cite) | `0.9rem` |

### Zeilenhöhen
```css
line-height: 1.5;   /* Fließtext */
line-height: 1.2;   /* Überschriften */
line-height: 1.6;   /* Zitate */
line-height: 1.1;   /* Große Sektions-Titel */
```

---

## 2. Farben

### Primärfarben
| Name | Hex / RGB | Verwendung |
|---|---|---|
| Primary Dark | `#191B41` | Überschriften, Akzente, Linien |
| Reinweiß | `#ffffff` | Hintergründe, Icon-Farbe auf dunklen Kacheln |
| Schwarz | `#000000` | Standard-Fließtext |
| Dunkelgrau | `#333333` | Sekundärer Text, Labels |

### Hintergrundfarben
| Name | Hex | Verwendung |
|---|---|---|
| Seitenbackground | `#ffffff` | Alle Sektionen |
| Label-Hintergrund | `#f2f2f2` | Branchen-Badges |
| Label-Hover | `#e6e6e6` | Hover-State von Badges |
| Meta-Info-Box | `#f0f2f5` | Fakten-Box in Referenz-Sektion |
| Negative Kachel | `#f4f4f4` | „Ohne JAY"-Vergleichskachel |

### Akzentfarben
| Name | Hex | Verwendung |
|---|---|---|
| Rot (negativ) | `#d32f2f` | X-Icons in Vergleichssektion |
| Grün (positiv) | `#4caf50` | Checkmark-Icons in Vergleichssektion |

### Farbverläufe (Gradients)
```css
/* Primärer Dark-Gradient – Verwendung: Kacheln, Zitat-Boxen, Feature-Cards */
background: radial-gradient(circle at center, rgb(70, 68, 111) 0%, rgb(0, 0, 26) 100%);

/* Innerer Glanz-Overlay auf Feature-Cards (::before) */
background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.07) 0%,
    rgba(255, 255, 255, 0) 60%
);
```

---

## 3. Abstände & Layout

### Max-Width
```css
max-width: 1200px;
margin: 0 auto;
```

### Sektion-Padding
```css
/* Standard-Sektion */
padding: 60px 20px 0 20px;   /* Website-Referenz */
padding: 40px 20px;           /* Vergleichssektion, Vorteile Schweiz */

/* Tablet */
padding: 30px 16px;

/* Mobil */
padding: 20px 14px;
```

### Grid-Abstände
```css
gap: 40px;   /* Zweispaltig (Referenz-Sektion) */
gap: 30px;   /* Tablet */
gap: 24px;   /* Feature-Cards Grid */
gap: 16px;   /* Mobil */
```

### Kachel-Innenabstand
```css
padding: 50px 40px;   /* Vergleichskacheln Desktop */
padding: 40px 30px;   /* Feature-Cards */
padding: 30px;        /* Zitat-Box */
padding: 20px;        /* Meta-Info-Box */
padding: 36px 28px;   /* Kacheln Tablet */
padding: 28px 20px;   /* Kacheln Mobil */
```

---

## 4. Border-Radius

| Verwendung | Wert |
|---|---|
| Kacheln, Cards, iFrame | `16px` |
| Kacheln auf Mobile | `14px` |
| Meta-Info-Box | `0 16px 16px 0` (nur rechts gerundet) |
| Branchen-Badge | `4px` |
| Vorschau-Badge (Pill) | `999px` |
| Dezente Linie | `2px` |

---

## 5. Box-Shadows

```css
/* Ruhezustand */
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);

/* Mittlerer Schatten */
box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);

/* Starker Schatten (Hover, iFrame) */
box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
box-shadow: 0 30px 60px rgba(0, 0, 0, 0.22);

/* Farbige Hover-Schatten */
box-shadow: 0 15px 35px rgba(211, 47, 47, 0.12);  /* Rot (negativ) */
box-shadow: 0 15px 35px rgba(76, 175, 80, 0.18);   /* Grün (positiv) */
box-shadow: 0 22px 50px rgba(25, 27, 65, 0.45);    /* Primary Dark */

/* Icon-Glow */
filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.3));
filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.6));  /* Hover */
```

---

## 6. Animationen & Transitions

### Easing-Kurven
```css
/* Standard-Hover */
transition: ... 0.3s ease;

/* Lift-Effekt (Kacheln hochschweben) */
transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
            box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

/* Scroll-Reveal Einblendung */
transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);

/* Bounce (Icon-Hover) */
transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Scroll-Reveal Animation (Slide-in von rechts)
```css
/* Startzustand (unsichtbar, rechts versetzt) */
.cs-animate.js-ready {
    opacity: 0;
    transform: translateX(110px) scale(0.92) translateY(16px);
    will-change: transform, opacity;
}

/* Endzustand (sichtbar) */
.cs-animate.is-visible {
    opacity: 1;
    transform: translateX(0) scale(1) translateY(0);
    will-change: auto;
}
```

### Hover-Lift
```css
transform: translateY(-6px);   /* Kacheln */
transform: translateY(-8px);   /* Zitat-Box */
transform: translateX(4px);    /* Listenelemente */
transform: translateX(3px);    /* Meta-Info-Box */
```

### Stagger-Delay (gestaffelte Animation)
```
data-index="0"  →  Delay: 0ms    (Label)
data-index="1"  →  Delay: 180ms  (Titel)
data-index="2"  →  Delay: 360ms  (Fakten-Box)
data-index="3"  →  Delay: 540ms  (Zitat)
data-index="4"  →  Delay: 720ms  (iFrame-Vorschau)
```

### Keyframe: Pulse (Badge-Animation)
```css
@keyframes csHintPulse {
    0%   { transform: scale(1); }
    50%  { transform: scale(1.05); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
    100% { transform: scale(1); }
}
animation: csHintPulse 2.5s infinite ease-in-out;
```

---

## 7. Responsive Breakpoints

| Breakpoint | Breite | Anpassungen |
|---|---|---|
| Desktop | `> 900px` | Vollständiges zweispaltiges Grid |
| Tablet | `≤ 900px` | Einspaltig, reduzierte Abstände |
| Smartphone | `≤ 640px` | Einspaltig, keine Hover-Effekte, kleinere Schrift |
| Mobil (Feature-Grid) | `≤ 768px` | Einspaltig, kein 3D-Tilt |

### Hover-Effekte auf Touch-Geräten deaktivieren
```css
@media (max-width: 640px) {
    .jay-card {
        transition: none;
    }
    .jay-card:hover {
        transform: none;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
    }
}
```

---

## 8. Icons

### Icon-Stil
Alle Icons sind **SVG-Stroke-Icons** mit einheitlicher Designsprache:
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  ...
</svg>
```

### Icon-Größen
```css
width: 24px; height: 24px;   /* Vergleichssektion */
width: 32px; height: 32px;   /* Feature-Cards */
width: 22px; height: 22px;   /* Mobil */
```

### Wichtig für Mobile-Kompatibilität
Immer `width` und `height` direkt auf dem `<svg>`-Element angeben:
```html
<svg width="24" height="24" viewBox="0 0 24 24" ...>
```

---

## 9. iFrame-Einbindung (Website-Vorschau)

```html
<iframe
  src="https://www.beispiel.at/"
  title="Beschreibung"
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

```css
.cs-preview-full {
    width: 100%;
    height: 600px;   /* Desktop */
    /* Tablet: 450px */
    position: relative;
    border-radius: 16px;
    overflow: hidden;
}
```

---

## 10. JavaScript-Muster

### IntersectionObserver (Scroll-Reveal)
```js
(function () {
    var STAGGER_MS = 180;

    function initSection(section) {
        var elements = section.querySelectorAll('.cs-animate');
        if (!elements.length) return;

        elements.forEach(function(el) { el.classList.add('js-ready'); });

        elements.forEach(function(el) {
            var index = parseInt(el.dataset.index, 10) || 0;
            var obs = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (!entry.isIntersecting) return;
                    setTimeout(function() {
                        el.classList.remove('js-ready');
                        el.classList.add('is-visible');
                    }, index * STAGGER_MS);
                    obs.unobserve(el);
                });
            }, { threshold: 0.05, rootMargin: '0px 0px -60px 0px' });
            obs.observe(el);
        });
    }

    function init() {
        document.querySelectorAll('.cs-section').forEach(initSection);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
```

### Wichtige Regeln für Page-Builder-Kompatibilität
- `var` statt `let`/`const` verwenden (maximale Abwärtskompatibilität)
- `document.querySelectorAll()` statt `querySelector()` wenn mehrere Sektionen auf einer Seite existieren
- JavaScript immer mit `DOMContentLoaded` + `readyState`-Check sichern
- Animationsklassen (`js-ready`, `is-visible`) dürfen im HTML-Editor des Baukastens nie verloren gehen

---

## 11. Sektion-Übersicht

| Sektion | CSS-Klasse | Beschreibung |
|---|---|---|
| Vergleichssektion | `.jay-comparison-section` | Zweispaltig: Ohne / Mit JAY Solution |
| Website-Referenz | `.cs-section` | Case-Study mit iFrame-Vorschau |
| Vorteile Schweiz | `.features-section` | Feature-Cards Grid (6 Kacheln) |
| Rezensionen | *(eigene Klassen)* | Trustpilot + Google Bewertungen |

---

*Zuletzt aktualisiert: Mai 2026*
