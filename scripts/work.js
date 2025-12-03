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