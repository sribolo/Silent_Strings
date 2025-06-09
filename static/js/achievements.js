// Achievements and Unlocks System
const allAchievements = {
  pizza_lover: { name: "Pizza Lover", description: "Ordered pizza in every level!" },
  donut_detective: { name: "Donut Detective", description: "Ate a donut during an investigation." },
  usb_safety: { name: "USB Safety", description: "Quarantined a suspicious USB." },
  cat_video: { name: "Cat Video Victim", description: "Got distracted by cat videos." },
  ghostline_foe: { name: "Ghostline Foe", description: "Confronted GHOSTLINE in the final showdown." }
};

function unlockAchievement(key) {
  let achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
  if (!achievements.includes(key)) {
    achievements.push(key);
    localStorage.setItem('achievements', JSON.stringify(achievements));
    showAchievementPopup(allAchievements[key].name, allAchievements[key].description);
    if (window.isLoggedIn) syncAchievementsToBackend();
  }
}

function syncAchievementsToBackend() {
  fetch('/api/achievements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),
      unlocks: JSON.parse(localStorage.getItem('unlocks') || '[]')
    })
  });
}

function isAchievementUnlocked(key) {
  let achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
  return achievements.includes(key);
}

function renderAchievements(containerId) {
  let achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
  let container = document.getElementById(containerId);
  container.innerHTML = '';
  achievements.forEach(key => {
    let ach = allAchievements[key];
    if (ach) {
      let div = document.createElement('div');
      div.className = 'achievement';
      div.innerHTML = `<strong>${ach.name}</strong>: ${ach.description}`;
      container.appendChild(div);
    }
  });
}

function showAchievementPopup(name, description) {
  let popup = document.createElement('div');
  popup.className = 'achievement-popup';
  popup.innerHTML = `<strong>Achievement Unlocked!</strong><br>${name}<br><em>${description}</em>`;
  document.body.appendChild(popup);
  setTimeout(() => { popup.remove(); }, 3500);
}

// Example usage: unlockAchievement('pizza_lover'); 