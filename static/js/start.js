// Typing Animation Logic
const welcomeText = "Welcome Agent,";
const missionText = "Loading mission briefing...";
let welcomeIndex = 0;
let missionIndex = 0;

function typeWriterWelcome() {
    if (welcomeIndex < welcomeText.length) {
        document.getElementById("welcome-text").innerHTML += welcomeText.charAt(welcomeIndex);
        welcomeIndex++;
        setTimeout(typeWriterWelcome, 100); 
    } else {
        // Remove blinking cursor after text is done
        document.getElementById("welcome-text").classList.remove("blinking-cursor");
        // Start typing the mission text after welcome is done
        setTimeout(typeWriterMission, 500); 
    }
}

function typeWriterMission() {
    if (missionIndex < missionText.length) {
        document.getElementById("mission-text").innerHTML += missionText.charAt(missionIndex);
        missionIndex++;
        setTimeout(typeWriterMission, 100); 
    } else {
        // Remove blinking cursor after text is done
        document.getElementById("mission-text").classList.remove("blinking-cursor");
        // Smoothly fade in buttons
        document.querySelector(".mission-buttons").style.opacity = 1;
    }
}

// Start typing when the page loads
window.onload = typeWriterWelcome;
