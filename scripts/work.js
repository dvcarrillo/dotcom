(() => {
    // Navbar behavior on scroll for subpages
    document.addEventListener('DOMContentLoaded', () => {
        const navbar = document.querySelector('.navbar.nav-subpage');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            navbar.classList.toggle('navbar-scrolled', window.scrollY > 94);
        });
    });

    // Sequential reveal animation after everything is loaded
    Promise.all([
        document.fonts.ready,
        new Promise(resolve => window.addEventListener('load', resolve))
    ]).then(() => {
        try {
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            const title = document.querySelector('.project-title.reveal');
            const properties = document.querySelector('.project-properties.reveal');
            const mainImage = document.querySelector('.project-main-image.reveal');
            const mainAction = document.querySelector('.project-main-action.reveal');
            const notice = document.querySelector('.project-notice.reveal');
            const body = document.querySelector('.project-body.reveal');

            const sequence = [title, properties, mainImage, mainAction, notice, body].filter(Boolean);
            const addVisible = el => el?.classList.add('is-visible');

            if (prefersReduced) {
                sequence.forEach(el => {
                    addVisible(el);
                    if (el === body) {
                        el.querySelectorAll('.section').forEach(addVisible);
                    }
                });
                return;
            }

            const baseDelay = 140;
            const step = 80;

            sequence.forEach((el, idx) => {
                const delay = baseDelay + idx * step;
                setTimeout(() => {
                    addVisible(el);

                    if (el === body) {
                        el.querySelectorAll('.section').forEach((sec, sidx) => {
                            setTimeout(() => addVisible(sec), sidx * 100);
                        });
                    }
                }, delay);
            });
        } catch (e) {
            // Fail quietly if DOM structure differs
        }
    });
})();

// Slideshow integration for image carousels used in project pages
document.addEventListener('DOMContentLoaded', () => {
    try {
        document.querySelectorAll('.image-slideshow').forEach((container) => {
            const track = container.querySelector('.slideshow-view');
            const slides = Array.from(container.querySelectorAll('.slide'));
            const prevBtn = container.querySelector('.slideshow-prev');
            const nextBtn = container.querySelector('.slideshow-next');
            let idx = slides.findIndex(s => s.classList.contains('active'));
            if (idx < 0) idx = 0;

            // create indicators if missing
            let indicators = container.querySelector('.slideshow-indicators');
            if (!indicators) {
                indicators = document.createElement('div');
                indicators.className = 'slideshow-indicators';
                // place indicators after the track
                if (track && track.parentNode) track.parentNode.insertBefore(indicators, track.nextSibling);
                else container.appendChild(indicators);
            }

            // build indicator buttons
            indicators.innerHTML = '';
            slides.forEach((s, si) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'indicator';
                btn.setAttribute('aria-label', `Go to slide ${si + 1}`);
                btn.dataset.index = String(si);
                btn.addEventListener('click', () => {
                    idx = si;
                    update();
                });
                indicators.appendChild(btn);
            });

            const indicatorButtons = Array.from(indicators.querySelectorAll('.indicator'));

            const update = () => {
                const x = -idx * 100;
                if (track) track.style.transform = `translateX(${x}%)`;
                slides.forEach((s, si) => s.setAttribute('aria-hidden', si !== idx));
                indicatorButtons.forEach((b, bi) => b.classList.toggle('active', bi === idx));

                // Disable prev/next when at the boundaries (no looping)
                if (prevBtn) prevBtn.disabled = (idx === 0);
                if (nextBtn) nextBtn.disabled = (idx === slides.length - 1);
            };

            const prev = () => { if (idx > 0) { idx -= 1; update(); } };
            const next = () => { if (idx < slides.length - 1) { idx += 1; update(); } };

            prevBtn && prevBtn.addEventListener('click', prev);
            nextBtn && nextBtn.addEventListener('click', next);

            container.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') { prev(); e.preventDefault(); }
                if (e.key === 'ArrowRight') { next(); e.preventDefault(); }
            });

            if (!container.hasAttribute('tabindex')) container.tabIndex = 0;

            update();

            // Touch / pointer drag support (use pointer events when available)
            (function attachDrag() {
                let isDragging = false;
                let startX = 0;
                let startY = 0;
                let lastPercent = 0;

                const getWidth = () => container.clientWidth || (track ? track.offsetWidth : 1);

                function onPointerDown(e) {
                    // Only handle touch pointers to avoid interfering with mouse drag
                    if (e.pointerType && e.pointerType !== 'touch') return;
                    isDragging = true;
                    startX = e.clientX;
                    startY = e.clientY;
                    lastPercent = 0;
                    if (e.pointerId && container.setPointerCapture) container.setPointerCapture(e.pointerId);
                    if (track) track.style.transition = 'none';
                }

                function onPointerMove(e) {
                    if (!isDragging) return;
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;
                    // If vertical scrolling is dominant, don't treat as horizontal swipe
                    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 6) return;
                    const percent = (dx / getWidth()) * 100;
                    lastPercent = percent;
                    if (track) track.style.transform = `translateX(${ -idx * 100 + percent }%)`;
                    e.preventDefault();
                }

                function onPointerUp(e) {
                    if (!isDragging) return;
                    isDragging = false;
                    if (e.pointerId && container.releasePointerCapture) {
                        try { container.releasePointerCapture(e.pointerId); } catch (err) {}
                    }
                    if (track) track.style.transition = '';
                    // threshold: 20% of width
                    if (lastPercent > 20) { prev(); }
                    else if (lastPercent < -20) { next(); }
                    else { update(); }
                }

                // Pointer events
                container.addEventListener('pointerdown', onPointerDown, { passive: true });
                container.addEventListener('pointermove', onPointerMove, { passive: false });
                container.addEventListener('pointerup', onPointerUp);
                container.addEventListener('pointercancel', onPointerUp);

                // Fallback for older browsers: touch events
                container.addEventListener('touchstart', function (e) {
                    if (e.touches && e.touches[0]) {
                        startX = e.touches[0].clientX;
                        startY = e.touches[0].clientY;
                        lastPercent = 0;
                        isDragging = true;
                        if (track) track.style.transition = 'none';
                    }
                }, { passive: true });

                container.addEventListener('touchmove', function (e) {
                    if (!isDragging) return;
                    if (!e.touches || !e.touches[0]) return;
                    const dx = e.touches[0].clientX - startX;
                    const dy = e.touches[0].clientY - startY;
                    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 6) return;
                    const percent = (dx / getWidth()) * 100;
                    lastPercent = percent;
                    if (track) track.style.transform = `translateX(${ -idx * 100 + percent }%)`;
                    e.preventDefault();
                }, { passive: false });

                container.addEventListener('touchend', function () {
                    if (!isDragging) return;
                    isDragging = false;
                    if (track) track.style.transition = '';
                    if (lastPercent > 20) { prev(); }
                    else if (lastPercent < -20) { next(); }
                    else { update(); }
                });
            })();
        });
    } catch (e) {
        // Fail quietly
    }
});

