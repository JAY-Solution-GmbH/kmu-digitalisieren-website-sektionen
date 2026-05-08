(function () {
    'use strict';

    // ── 1. Scroll-triggered Kaskaden-Animation ──────────────────────────────
    const STAGGER_MS = 120;   // Verzögerung zwischen den Karten in ms
    const THRESHOLD  = 0.12;  // Wie viel der Karte sichtbar sein muss (12%)

    function initScrollReveal() {
        const cards = document.querySelectorAll('.feature-card');
        if (!cards.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const card  = entry.target;
                const index = parseInt(card.dataset.index, 10) || 0;

                setTimeout(() => {
                    card.classList.add('is-visible');
                    initTilt(card); // Tilt erst aktivieren wenn Karte sichtbar
                }, index * STAGGER_MS);

                observer.unobserve(card);
            });
        }, { threshold: THRESHOLD });

        cards.forEach((card) => observer.observe(card));
    }

    // ── 2. 3D-Tilt Maus-Tracking ───────────────────────────────────────────
    const MAX_TILT   = 10;   // Maximale Neigung in Grad
    const SCALE_UP   = 1.03; // Leichte Vergrösserung beim Hovern
    const TILT_SPEED = '0.12s cubic-bezier(0.23, 1, 0.32, 1)';
    const REST_SPEED = '0.55s cubic-bezier(0.23, 1, 0.32, 1)';

    function initTilt(card) {
        // Mobil: kein Tilt
        if (window.matchMedia('(max-width: 768px)').matches) return;

        card.addEventListener('mousemove', onMouseMove);
        card.addEventListener('mouseleave', onMouseLeave);
    }

    function onMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();

        // Relative Mausposition innerhalb der Karte (−1 bis +1)
        const relX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
        const relY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;

        const rotateY =  relX * MAX_TILT;
        const rotateX = -relY * MAX_TILT;

        card.style.transition = `transform ${TILT_SPEED}, box-shadow 0.3s ease`;
        card.style.transform  = `
            perspective(800px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(${SCALE_UP})
        `;
    }

    function onMouseLeave(e) {
        const card = e.currentTarget;
        card.style.transition = `transform ${REST_SPEED}, box-shadow 0.4s ease`;
        card.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    }

    // ── 3. Start ────────────────────────────────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollReveal);
    } else {
        // DOM bereits bereit (Script nachgeladen)
        initScrollReveal();
    }

})();
