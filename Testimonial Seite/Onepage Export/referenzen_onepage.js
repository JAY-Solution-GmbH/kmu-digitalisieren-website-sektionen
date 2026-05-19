(function () {
    'use strict';

    var STAGGER_MS = 180;

    /* ================================================================
       Toggle-Switch: Webseiten-Referenzen ↔ Video-Testimonials
       ================================================================ */
    function initToggle() {
        var toggle      = document.getElementById('refToggle');
        var pill        = document.getElementById('refTogglePill');
        var btnWebsites = document.getElementById('btnWebsites');
        var btnVideos   = document.getElementById('btnVideos');
        var tabWebsites = document.getElementById('tabWebsites');
        var tabVideos   = document.getElementById('tabVideos');

        if (!toggle || !pill || !btnWebsites || !btnVideos) return;

        // Position pill on initial load
        positionPill(btnWebsites);

        function positionPill(activeBtn) {
            pill.style.left  = activeBtn.offsetLeft + 'px';
            pill.style.width = activeBtn.offsetWidth + 'px';
        }

        function switchTab(activeBtn, inactiveBtn, showTab, hideTab) {
            activeBtn.classList.add('is-active');
            inactiveBtn.classList.remove('is-active');
            positionPill(activeBtn);

            hideTab.classList.remove('is-active');
            showTab.classList.add('is-active');

            // Re-trigger scroll animations for the newly visible tab
            initScrollAnimations(showTab);
        }

        btnWebsites.addEventListener('click', function () {
            if (btnWebsites.classList.contains('is-active')) return;
            switchTab(btnWebsites, btnVideos, tabWebsites, tabVideos);
        });

        btnVideos.addEventListener('click', function () {
            if (btnVideos.classList.contains('is-active')) return;
            switchTab(btnVideos, btnWebsites, tabVideos, tabWebsites);
        });

        // Re-position pill on window resize
        window.addEventListener('resize', function () {
            var activeBtn = toggle.querySelector('.ref-toggle-btn.is-active');
            if (activeBtn) positionPill(activeBtn);
        });
    }

    /* ================================================================
       Details-Toggle (Video-Testimonials)
       ================================================================ */
    function initDetailsToggles() {
        var toggles = document.querySelectorAll('.ref-details-toggle');
        toggles.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var content = btn.nextElementSibling;
                if (!content || !content.classList.contains('ref-details-content')) return;

                var isOpen = btn.classList.contains('is-open');

                if (isOpen) {
                    // Close
                    content.style.maxHeight = '0px';
                    content.classList.remove('is-open');
                    btn.classList.remove('is-open');
                    btn.setAttribute('aria-expanded', 'false');
                } else {
                    // Open
                    var inner = content.querySelector('.ref-details-inner');
                    var height = inner ? inner.scrollHeight + 20 : 200;
                    content.style.maxHeight = height + 'px';
                    content.classList.add('is-open');
                    btn.classList.add('is-open');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    /* ================================================================
       Scroll-Animationen (IntersectionObserver)
       ================================================================ */
    function initScrollAnimations(scope) {
        var root = scope || document;
        var elements = root.querySelectorAll('.ref-animate');
        if (!elements.length) return;

        elements.forEach(function (el) {
            // Nur noch nicht animierte Elemente behandeln
            if (el.classList.contains('is-visible')) return;
            el.classList.add('js-ready');
        });

        if (!('IntersectionObserver' in window)) {
            elements.forEach(function (el) {
                el.classList.remove('js-ready');
                el.classList.add('is-visible');
            });
            return;
        }

        elements.forEach(function (el) {
            if (el.classList.contains('is-visible')) return;

            var index = parseInt(el.dataset.index, 10) || 0;

            // CTA-Divider: leichterer Threshold
            var threshold = el.classList.contains('ref-cta-divider') ? 0.15 : 0.05;
            var rootMargin = el.classList.contains('ref-cta-divider')
                ? '0px 0px -40px 0px'
                : '0px 0px -60px 0px';

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
                threshold: threshold,
                rootMargin: rootMargin
            });
            obs.observe(el);
        });
    }

    /* ================================================================
       iFrame Desktop-Skalierung
       Rendert bei 1440px Breite und skaliert auf Container-Breite
       ================================================================ */
    function scaleIframes() {
        var wraps = document.querySelectorAll('.ref-iframe-wrap');
        wraps.forEach(function (wrap) {
            var iframe = wrap.querySelector('iframe');
            if (!iframe) return;
            var containerWidth = wrap.clientWidth;
            var scale = containerWidth / 1440;
            iframe.style.transform = 'scale(' + scale + ')';
            iframe.style.height = (wrap.clientHeight / scale) + 'px';
        });
    }

    /* ================================================================
       Init
       ================================================================ */
    function init() {
        initToggle();
        initDetailsToggles();
        scaleIframes();

        // Nur den aktiven Tab animieren
        var activeTab = document.querySelector('.ref-tab-content.is-active');
        if (activeTab) {
            initScrollAnimations(activeTab);
        }

        // Re-scale iframes on resize
        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(scaleIframes, 150);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
