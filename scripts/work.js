// Navbar behavior on scroll for subpages
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar.nav-subpage');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 90) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
});