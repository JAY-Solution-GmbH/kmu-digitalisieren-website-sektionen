(function () {
    'use strict';

    var STAGGER_MS = 180;

    // Wird für jede .cs-section und .cs-cta-divider aufgerufen
    function initAnimatedElements(container) {
        var elements = container.querySelectorAll('.cs-animate');
        if (!elements.length) {
            // Der Container selbst könnte .cs-animate sein (z.B. CTA-Divider)
            if (container.classList.contains('cs-animate')) {
                elements = [container];
            } else {
                return;
            }
        }

        // Startzustand setzen
        if (elements.forEach) {
            elements.forEach(function (el) {
                el.classList.add('js-ready');
            });
        } else {
            // NodeList-Fallback für einzelne Elemente
            elements[0] && elements[0].classList.add('js-ready');
        }

        // Fallback ohne IntersectionObserver
        if (!('IntersectionObserver' in window)) {
            if (elements.forEach) {
                elements.forEach(function (el) {
                    el.classList.remove('js-ready');
                    el.classList.add('is-visible');
                });
            }
            return;
        }

        // IntersectionObserver für jedes animierte Element
        var toObserve = elements.forEach ? elements : [elements[0]];
        if (toObserve.forEach) {
            toObserve.forEach(function (el) {
                var index = parseInt(el.dataset.index, 10) || 0;
                var obs = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) return;
                        setTimeout(function () {
                            el.classList.remove('js-ready');
                            el.classList.add('is-visible');
                        }, index * STAGGER_MS);
                        obs.unobserve(el);
                    });
                }, {
                    threshold: 0.05,
                    rootMargin: '0px 0px -60px 0px'
                });
                obs.observe(el);
            });
        }
    }

    function init() {
        // Alle Referenz-Sektionen animieren
        var sections = document.querySelectorAll('.cs-section');
        sections.forEach(function (section) {
            initAnimatedElements(section);
        });

        // Alle CTA-Divider animieren
        var ctas = document.querySelectorAll('.cs-cta-divider');
        ctas.forEach(function (cta) {
            // CTA-Divider hat selbst die Klasse .cs-animate
            cta.classList.add('js-ready');

            if (!('IntersectionObserver' in window)) {
                cta.classList.remove('js-ready');
                cta.classList.add('is-visible');
                return;
            }

            var obs = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    cta.classList.remove('js-ready');
                    cta.classList.add('is-visible');
                    obs.unobserve(cta);
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            });
            obs.observe(cta);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
