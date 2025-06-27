// Achievements and Unlocks System
const allAchievements = {
    // Time-based achievements
    speed_demon: { 
        name: "Speed Demon", 
        description: "Complete a mission with 50% time remaining",
        reward: "Unlock fast-forward feature"
    },
    time_master: { 
        name: "Time Master", 
        description: "Complete 5 missions with time bonus",
        reward: "Unlock time freeze power-up"
    },
    
    // Skill-based achievements
    perfect_investigation: { 
        name: "Perfect Investigation", 
        description: "Find all required evidence in a mission",
        reward: "Unlock evidence scanner upgrade"
    },
    tool_master: { 
        name: "Tool Master", 
        description: "Use every available tool in a mission",
        reward: "Unlock tool combination feature"
    },
    
    // Story achievements
    ghostline_foe: { 
        name: "Ghostline Foe", 
        description: "Confront GHOSTLINE in the final showdown",
        reward: "Unlock special ending"
    },
    sector_hero: { 
        name: "SECTOR-9 Hero", 
        description: "Complete all missions with 3-star rating",
        reward: "Unlock special agent badge"
    },
    
    // Hidden achievements
    easter_egg: { 
        name: "Easter Egg Hunter", 
        description: "Find a hidden easter egg",
        reward: "Unlock secret level"
    },
    secret_ending: { 
        name: "Secret Ending", 
        description: "Discover the secret ending",
        reward: "Unlock special avatar"
    }
};

// Unlockable rewards
const unlockableRewards = {
    fast_forward: {
        name: "Fast Forward",
        description: "Skip through dialogue faster",
        unlocked: false
    },
    time_freeze: {
        name: "Time Freeze",
        description: "Freeze time for 30 seconds once per mission",
        unlocked: false
    },
    evidence_scanner: {
        name: "Evidence Scanner",
        description: "Highlight important evidence",
        unlocked: false
    },
    tool_combinations: {
        name: "Tool Combinations",
        description: "Combine tools for special effects",
        unlocked: false
    },
    special_badge: {
        name: "Special Agent Badge",
        description: "Custom badge for your profile",
        unlocked: false
    },
    secret_avatar: {
        name: "Secret Avatar",
        description: "Special character skin",
        unlocked: false
    }
};

function unlockAchievement(key) {
    let achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
    if (!achievements.includes(key)) {
        achievements.push(key);
        localStorage.setItem('achievements', JSON.stringify(achievements));
        
        // Show achievement popup
        showAchievementPopup(allAchievements[key].name, allAchievements[key].description);
        
        // Check for reward
        if (allAchievements[key].reward) {
            unlockReward(allAchievements[key].reward);
        }
        
        // Sync to backend if logged in
        if (window.isLoggedIn) {
            syncAchievementsToBackend();
        }
    }
}

function unlockReward(rewardName) {
    let rewards = JSON.parse(localStorage.getItem('unlockedRewards') || '[]');
    if (!rewards.includes(rewardName)) {
        rewards.push(rewardName);
        localStorage.setItem('unlockedRewards', JSON.stringify(rewards));
        
        // Show reward popup
        showRewardPopup(rewardName);
        
        // Update UI to reflect new reward
        updateRewardsUI();
    }
}

function showRewardPopup(rewardName) {
    const reward = unlockableRewards[rewardName.toLowerCase().replace(/\s+/g, '_')];
    if (reward) {
        const popup = document.createElement('div');
        popup.className = 'reward-popup';
        popup.innerHTML = `
            <h3>New Reward Unlocked!</h3>
            <p><strong>${reward.name}</strong></p>
            <p>${reward.description}</p>
        `;
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 4000);
    }
}

function updateRewardsUI() {
    const rewardsContainer = document.getElementById('rewards-container');
    if (!rewardsContainer) return;
    
    const rewards = JSON.parse(localStorage.getItem('unlockedRewards') || '[]');
    rewardsContainer.innerHTML = '';
    
    rewards.forEach(rewardName => {
        const reward = unlockableRewards[rewardName.toLowerCase().replace(/\s+/g, '_')];
        if (reward) {
            const div = document.createElement('div');
            div.className = 'reward-item';
            div.innerHTML = `
                <h4>${reward.name}</h4>
                <p>${reward.description}</p>
            `;
            rewardsContainer.appendChild(div);
        }
    });
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
    if (!container) return;
    
    container.innerHTML = '';
    achievements.forEach(key => {
        let ach = allAchievements[key];
        if (ach) {
            let div = document.createElement('div');
            div.className = 'achievement';
            div.innerHTML = `
                <strong>${ach.name}</strong>
                <p>${ach.description}</p>
                ${ach.reward ? `<em>Reward: ${ach.reward}</em>` : ''}
            `;
            container.appendChild(div);
        }
    });
}

function showAchievementPopup(name, description) {
    let popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
        <strong>Achievement Unlocked!</strong><br>
        ${name}<br>
        <em>${description}</em>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 3500);
}

