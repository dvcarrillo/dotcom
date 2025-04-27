document.addEventListener("DOMContentLoaded", function () {
    // Card toggle
    document.querySelectorAll('.card .toggle-content').forEach(button => {
        button.addEventListener('click', function () {
            const card = button.closest('.card');
            const content = card.querySelector('.card-content');
            const description = content.querySelector('p');
            const icon = button.querySelector('svg');

            // Check if the icon is present
            if (icon) {
                // Card expansion
                if (description.classList.contains('hidden')) {
                    icon.setAttribute('data-feather', 'x');
                    button.classList.add('btn-primary');
                    button.classList.remove('btn-flat');
                    description.style.opacity = '1';
                    content.style.maxHeight = '400px';
                }
                // Card collapse
                else {
                    icon.setAttribute('data-feather', 'plus');
                    button.classList.remove('btn-primary');
                    button.classList.add('btn-flat');
                    description.style.opacity = '0';
                    content.style.maxHeight = '0px';
                }
                // Toggle the hidden class
                description.classList.toggle('hidden');
                // Replace the icon
                feather.replace({ 'svg': icon });
            }

        });
    });
});