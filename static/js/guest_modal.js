
document.addEventListener('DOMContentLoaded', function() {
    const guestBtn = document.getElementById('guestBtn');
    const guestModal = document.getElementById('guestModal');
    const cancelGuest = document.getElementById('cancelGuest');
    
    if (guestBtn) {
        guestBtn.addEventListener('click', function() {
            if (guestModal) {
                guestModal.style.display = 'block';
            }
        });
    }
    
    if (cancelGuest) {
        cancelGuest.addEventListener('click', function() {
            if (guestModal) {
                guestModal.style.display = 'none';
            }
        });
    }
}); 