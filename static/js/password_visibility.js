// Password Visibility Toggle JavaScript
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.show-password-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const inputId = btn.getAttribute('data-target');
            var pwInput = document.getElementById(inputId);
            var icon = btn.querySelector('i');
            if (pwInput && icon) {
                const isHidden = pwInput.type === 'password';
                pwInput.type = isHidden ? 'text' : 'password';
                icon.classList.toggle('fa-eye', !isHidden);
                icon.classList.toggle('fa-eye-slash', isHidden);
            }
        });
    });
}); 