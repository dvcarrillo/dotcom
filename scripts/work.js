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
            };

            const prev = () => { idx = (idx - 1 + slides.length) % slides.length; update(); };
            const next = () => { idx = (idx + 1) % slides.length; update(); };

            prevBtn && prevBtn.addEventListener('click', prev);
            nextBtn && nextBtn.addEventListener('click', next);

            container.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') { prev(); e.preventDefault(); }
                if (e.key === 'ArrowRight') { next(); e.preventDefault(); }
            });

            if (!container.hasAttribute('tabindex')) container.tabIndex = 0;

            update();
        });
    } catch (e) {
        // Fail quietly
    }
});

