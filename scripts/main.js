// Set the initial color scheme
window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? document.documentElement.setAttribute('data-theme', 'dark') : document.documentElement.setAttribute('data-theme', 'light');

// Watch for changes on color scheme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    event.matches ? document.documentElement.setAttribute('data-theme', 'dark') : document.documentElement.setAttribute('data-theme', 'light');
});

// Load Feather icons
document.addEventListener("DOMContentLoaded", function () {
    feather.replace();
});