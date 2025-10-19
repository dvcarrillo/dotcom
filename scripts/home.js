document.addEventListener('DOMContentLoaded', function () {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    const page = document.querySelector('.page');
    const signature = document.querySelector('.signature');
    const paths = document.querySelectorAll('.signature-path');

    if (!page) return;

    const hash = window.location.hash?.trim();
    const comingFromSelectedWorks = hash === '#selected-works';

    if (comingFromSelectedWorks) {
        // Instantly show page without animation
        page.classList.add('instant', 'reveal');

        // Instantly show signature without animation
        if (signature) {
            signature.style.animation = 'none';
            signature.style.opacity = '1';
        }
        paths.forEach(path => {
            path.style.animation = 'none';
            path.style.strokeDashoffset = '0';
        });
    } else {
        // Delay reveal to sync with signature animation
        setTimeout(() => {
            page.classList.add('reveal');
        }, 400);
    }
});