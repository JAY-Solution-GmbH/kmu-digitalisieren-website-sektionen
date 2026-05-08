document.addEventListener("DOMContentLoaded", () => {
    // Einstellungen für den Beobachter
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Startet, sobald 15% der Kachel sichtbar sind
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {

                // Fügt einen leichten "Kaskaden-Effekt" hinzu, wenn mehrere gleichzeitig erscheinen
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 100);

                // Hört auf, die Karte zu beobachten, damit die Animation nur 1x läuft
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Suche alle Feature-Cards und beobachte sie
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Lazy Load iFrame: lädt erst wenn sichtbar
(function() {
    var iframe = document.querySelector('.cs-preview-full iframe[data-src]');
    if (!iframe) return;
    if ('IntersectionObserver' in window) {
        var iframeObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    iframe.src = iframe.dataset.src;
                    iframeObserver.unobserve(iframe);
                }
            });
        }, { threshold: 0.1 });
        iframeObserver.observe(iframe);
    } else {
        iframe.src = iframe.dataset.src; // Fallback für ältere Browser
    }
})();
