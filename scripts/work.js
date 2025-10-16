// Navbar behavior on scroll for subpages
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar.nav-subpage');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 94) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Sequential reveal animation
    try {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const title = document.querySelector('.project-title.reveal');
        const properties = document.querySelector('.project-properties.reveal');
        const mainImage = document.querySelector('.project-main-image.reveal');
        const mainAction = document.querySelector('.project-main-action.reveal');
        const body = document.querySelector('.project-body.reveal');

        const sequence = [title, properties, mainImage, mainAction, body].filter(Boolean);

        if (prefersReduced) {
            // Show everything immediately for reduced motion
            sequence.forEach(el => {
                if (el.classList) el.classList.add('is-visible');
                // Also ensure child sections are visible
                if (el === body) {
                    el.querySelectorAll('.section').forEach(s => s.classList.add('is-visible'));
                }
            });
            return;
        }

        // Staggering timing
        const baseDelay = 140; // ms before first item
        const step = 80; // ms between items

        sequence.forEach((el, idx) => {
            const delay = baseDelay + idx * step;
            setTimeout(() => {
                if (el.classList) el.classList.add('is-visible');

                // If this is the body, reveal its sections slightly staggered
                if (el === body) {
                    const sections = Array.from(el.querySelectorAll('.section'));
                    sections.forEach((sec, sidx) => {
                        setTimeout(() => sec.classList.add('is-visible'), sidx * 100);
                    });
                }
            }, delay);
        });
    } catch (e) {
        // Fail quietly if DOM structure differs
    }
});