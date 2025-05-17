// static/js/main.js
document.addEventListener("DOMContentLoaded", () => {
    // START button on the landing page
    const startBtn = document.getElementById("startBtn");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        window.location.href = "/start";
      });
    }
  
    // PLAY AS GUEST button + modal controls on the /start page
    const playGuest = document.getElementById("playGuest");
    const guestModal = document.getElementById("guestModal");
    const cancelGuest = document.getElementById("cancelGuest");
  
    if (playGuest) {
      playGuest.addEventListener("click", () => {
        guestModal.style.display = "block";
      });
    }
    if (cancelGuest) {
      cancelGuest.addEventListener("click", () => {
        guestModal.style.display = "none";
      });
    }
  });
  