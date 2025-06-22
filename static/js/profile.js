// Profile Page JavaScript
function loadAchievementsFromBackend() {
    fetch('/api/achievements')
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('achievements', JSON.stringify(data.achievements || []));
            localStorage.setItem('unlocks', JSON.stringify(data.unlocks || []));
            renderAchievements('achievements-list');
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const userData = document.getElementById('user-data');
    const isLoggedIn = userData ? JSON.parse(userData.dataset.loggedIn) : false;
    
    if (isLoggedIn) {
        loadAchievementsFromBackend();
    } else {
        renderAchievements('achievements-list');
    }
}); 