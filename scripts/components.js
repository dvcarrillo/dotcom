document.addEventListener("DOMContentLoaded", function () {
    // Card toggle
    document.querySelectorAll('.card .toggle-content').forEach(button => {
        button.addEventListener('click', function () {
            const card = button.closest('.card');
            const content = card.querySelector('.card-content');
            const icon = button.querySelector('svg'); // Buscar el <svg> generado por Feather.js

            // Toggle the hidden class
            content.classList.toggle('hidden');

            // Update the icon and button class
            if (icon) {
                if (content.classList.contains('hidden')) {
                    icon.setAttribute('data-feather', 'plus');
                    button.classList.remove('btn-primary');
                    button.classList.add('btn-flat');
                } else {
                    icon.setAttribute('data-feather', 'x');
                    button.classList.remove('btn-flat');
                    button.classList.add('btn-primary');
                }

                // Re-render Feather icons
                feather.replace();
            }
        });
    });
});