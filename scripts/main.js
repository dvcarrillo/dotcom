// Set the initial color scheme
window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? document.documentElement.setAttribute('data-theme', 'dark') : document.documentElement.setAttribute('data-theme', 'light');

// Initialize icons
document.addEventListener("DOMContentLoaded", function () {
    feather.replace();
});

// Watch for changes on color scheme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    event.matches ? document.documentElement.setAttribute('data-theme', 'dark') : document.documentElement.setAttribute('data-theme', 'light');
});