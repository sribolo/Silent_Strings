// Investigation Page Script
// Handles background, menu, modals, dialogue, objectives, and notes

// --- Location Background ---
function setBackgroundImage() {
    const bgDiv = document.querySelector('.location-background');
    if (!bgDiv) return;
    const locKey = bgDiv.dataset.location || 'hq';
    const map = {
        'hq': 'hq',
        'news': 'company_1',
        'bank': 'bank',
        'cafe': 'cafe',
        'transport': 'transport',
        'school': 'school',
        'government': 'government',
        'hospital': 'hospital',
        'company': 'company',
        'global': 'hq'
    };
    const bgName = map[locKey] || 'hq';
    const imageUrl = `/static/images/backgrounds/${bgName}.png`;
    // Preload image and fallback if missing
    const img = new window.Image();
    img.onload = function() {
        bgDiv.style.backgroundImage = `url('${imageUrl}')`;
        bgDiv.style.backgroundColor = '';
    };
    img.onerror = function() {
        bgDiv.style.backgroundImage = 'none';
        bgDiv.style.backgroundColor = '#222'; // fallback color
    };
    img.src = imageUrl;
}

// --- Menu & Modal Logic ---
// Map keywords in objectives to tool button IDs
const objectiveToolMap = {
  scan: 'scan-btn',
  scanner: 'scan-btn',
  analyze: 'analyze-btn',
  analysis: 'analyze-btn',
  recover: 'scan-btn', // or a specific recovery tool if you have one
  credential: 'analyze-btn',
  password: 'analyze-btn',
  interview: 'interview-btn',
  note: 'notes-btn',
  log: 'analyze-btn',
  // Add more mappings as needed
};

function getToolsForObjectives(objectives) {
  const toolSet = new Set(['interview-btn', 'notes-btn']); // Always include interview and notes
  objectives.forEach(obj => {
    for (const [keyword, toolId] of Object.entries(objectiveToolMap)) {
      if (obj.toLowerCase().includes(keyword)) {
        toolSet.add(toolId);
      }
    }
  });
  return Array.from(toolSet);
}

function getCompletedObjectives(levelKey) {
    return JSON.parse(localStorage.getItem('completedObjectives_' + levelKey)) || [];
  }
  function setCompletedObjectives(levelKey, arr) {
    localStorage.setItem('completedObjectives_' + levelKey, JSON.stringify(arr));
  }  

  function setupMenuAndModals() {
    const hamburger = document.getElementById('hamburger-menu');
    const dropdown = document.getElementById('dropdown-menu');

    // Hamburger menu robust logic
    if (hamburger && dropdown) {
        // Hamburger toggles dropdown
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        });

        // Prevent dropdown from closing when clicking inside
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Close on outside click
        document.addEventListener('click', function() {
            dropdown.classList.add('hidden');
        });

        // Close on menu item click
        const menuItems = dropdown.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                dropdown.classList.add('hidden');
            });
        });
    }

    // Tool modals
    addToolEvent('interview-btn', showInterviewMenu);
    addToolEvent('scan-btn', () => showToolModal('Evidence Scanner',
        `<button id="run-scan-btn" class="action-btn"><i class="fas fa-search"></i> Run System Scan</button><div id="scan-result" class="result-container"></div>`));
    addToolEvent('analyze-btn', () => showToolModal('Digital Analysis',
        `<button id="run-analysis-btn" class="action-btn"><i class="fas fa-microscope"></i> Analyze Evidence</button><div id="analysis-result" class="result-container"></div>`));
    addToolEvent('notes-btn', () => {
        const notes = localStorage.getItem('investigationNotes') || '';
        showToolModal('Mission Notes',
            `<textarea id="notes-text" placeholder="Record your findings..." class="notes-textarea">${notes}</textarea>
            <button id="save-notes-btn" class="action-btn notes-save-btn"><i class="fas fa-save"></i> Save Notes</button>`);
    });

    // Show/hide tools based on objectives
    const bg = document.querySelector('.location-background');
    const loc = bg ? bg.dataset.location : 'hq';
    const levelKey = locationToLevel[loc] || 'level1';
    const objectives = window.missionObjectives[levelKey] || [];
    const allowed = getToolsForObjectives(objectives);
    const allToolIds = ['interview-btn', 'scan-btn', 'analyze-btn', 'notes-btn'];
    allToolIds.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.style.display = allowed.includes(id) ? '' : 'none';
    });

    // Modal close for tool modal
    const closeModal = document.getElementById('close-modal');
    if (closeModal) closeModal.onclick = () => document.getElementById('tool-modal').classList.add('hidden');

    // Help modal logic
    const helpBtn = document.getElementById('help-btn');
    const helpModal = document.getElementById('help-modal');
    const helpClose = document.getElementById('help-close');
    if (helpBtn && helpModal) helpBtn.addEventListener('click', () => {
        helpModal.classList.add('active');
        helpModal.style.display = 'flex';
    });
    if (helpClose && helpModal) helpClose.addEventListener('click', () => {
        helpModal.classList.remove('active');
        helpModal.style.display = 'none';
    });
    if (helpModal) helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal) {
            helpModal.classList.remove('active');
            helpModal.style.display = 'none';
        }
    });

    // Hint modal
    const hintBtn = document.getElementById('hint-btn');
    const hintBox = document.getElementById('hint-box');
    if (hintBtn && hintBox) hintBtn.addEventListener('click', () => { showHint(); });
}

function addToolEvent(id, handler) {
    const btn = document.getElementById(id);
    const dropdown = document.getElementById('dropdown-menu');
    if (btn) {
        btn.addEventListener('click', () => {
            dropdown.classList.add('hidden');
            try { handler(); } catch (error) { console.error(`Error in handler for ${id}:`, error); }
        });
    }
}
function showToolModal(title, content) {
    const modal = document.getElementById('tool-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalTitle || !modalBody) return alert(`${title}: Feature not available`);
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.classList.remove('hidden');
    // Attach modal button events
    if (title === 'Evidence Scanner') {
        const runScanBtn = document.getElementById('run-scan-btn');
        if (runScanBtn) runScanBtn.onclick = runScan;
    } else if (title === 'Digital Analysis') {
        const runAnalysisBtn = document.getElementById('run-analysis-btn');
        if (runAnalysisBtn) runAnalysisBtn.onclick = runAnalysis;
    } else if (title === 'Mission Notes') {
        const saveNotesBtn = document.getElementById('save-notes-btn');
        if (saveNotesBtn) saveNotesBtn.onclick = saveNotes;
    }
}

// --- Objectives UI ---
function markObjectiveComplete(idx) {
    const bg = document.querySelector('.location-background');
    const loc = bg ? bg.dataset.location : 'hq';
    const levelKey = locationToLevel[loc] || 'level1';

    // Get & update completed objectives for this level
    let completed = getCompletedObjectives(levelKey);
    if (!completed.includes(idx)) {
        completed.push(idx);
        setCompletedObjectives(levelKey, completed);
    }

    // Always re-render objectives so UI is in sync!
    renderObjectives(levelKey);

    // Show a popup for feedback (optional)
    const objectives = window.missionObjectives[levelKey] || [];
    if (objectives[idx]) showPopup("Objective completed: " + objectives[idx]);

    if (completed.length === objectives.length) {
        setTimeout(showCelebrationModal, 800);
    }
}


// --- Dialogue/Storyboard System ---
// Use only the /static/dialogues/levelX.js files as the source of truth.
// Dynamically load the correct dialogue object and use its .nodes property.

// Map location keys to dialogue keys
const locationToLevel = {
  hq: 'level1',
  news: 'level2',
  bank: 'level3',
  company: 'level4',
  government: 'level5',
  school: 'level6',
  cafe: 'level7',
  hospital: 'level8',
  transport: 'level9',
  global: 'level10'
};

// Helper to get the current dialogue nodes object
function getCurrentDialogueNodes() {
    const bg = document.querySelector('.location-background');
    const loc = bg ? bg.dataset.location : 'hq';
    const levelKey = locationToLevel[loc] || 'level1';
    // The dialogue file should define e.g. window.level1Dialogues
    const dialogueObj = window[levelKey + 'Dialogues'];
    return dialogueObj && dialogueObj.nodes ? dialogueObj.nodes : {};
}

// Helper to get the current level key
function getCurrentLevelKey() {
    const bg = document.querySelector('.location-background');
    const loc = bg ? bg.dataset.location : 'hq';
    return locationToLevel[loc] || 'level1';
}

// Show the interview menu (list of NPCs)
function showInterviewMenu() {
    renderObjectives(getCurrentLevelKey());
    const nodes = getCurrentDialogueNodes();
    // NPCs are all keys except 'start', 'objectives', and any meta/failStates
    const npcNames = Object.keys(nodes).filter(k => !['start','objectives'].includes(k) && typeof nodes[k] === 'object' && nodes[k].options);
    const choices = npcNames.map(n => ({
        text: `Talk to ${n}` + (n === lastInterviewedNpc ? ' (again)' : ''),
        action: () => {
            lastInterviewedNpc = n;
            showMissionInterview(n, 'intro');
        }
    }));
    choices.push({ text: 'Show Summary', action: showSummary });
    showDialogue('Contact Selection', 'Who would you like to interview next?', choices);
}

// Show a summary of interviewed NPCs and objectives
function showSummary() {
    const nodes = getCurrentDialogueNodes();
    const npcNames = Object.keys(nodes).filter(k => !['start','objectives'].includes(k) && typeof nodes[k] === 'object' && nodes[k].options);
    let summary = '<strong>Interviewed NPCs:</strong><ul>';
    npcNames.forEach(n => { summary += `<li>${n}</li>`; });
    summary += '</ul>';
    const objectivesList = document.getElementById('objectives-list');
    if (objectivesList) {
        summary += '<strong>Objectives:</strong><ul>';
        objectivesList.querySelectorAll('li').forEach(li => {
            const status = li.classList.contains('completed') ? '✅' : '❌';
            summary += `<li>${status} ${li.textContent.trim()}</li>`;
        });
        summary += '</ul>';
    }
    showDialogue('Summary', summary, [{ text: 'Back to Interview Menu', action: showInterviewMenu }]);
}

// Show a dialogue node for a given NPC and nodeKey
function showMissionInterview(npc, nodeKey = 'intro') {
    const nodes = getCurrentDialogueNodes();
    // If nodeKey is not found, fallback to the NPC's main node
    let node = nodes[nodeKey] || nodes[npc] || nodes['start'];
    if (!node) {
        alert('Dialogue not found!');
        return;
    }
    // Set currentLevel and currentNPC for hints.js compatibility
    window.currentLevel = getCurrentLevelKey();
    window.currentNPC = nodeKey;
    // Sync NPC name in both the dialogue bubble and the portrait label
    const npcNameEl = document.getElementById('npc-name');
    const bubbleNpcNameEl = document.getElementById('bubble-npc-name');
    const npcNameLabelEl = document.getElementById('npc-name-label');
    if (npcNameEl) npcNameEl.innerText = npc;
    if (bubbleNpcNameEl) bubbleNpcNameEl.innerText = npc;
    if (npcNameLabelEl) npcNameLabelEl.innerText = npc;
    renderInvestigationNpcPortrait(npc);
    // Typing effect for dialogue text
    const textEl = document.getElementById('dialogue-text');
    if (textEl) typeText(node.text || '', textEl);
    // Render choices
    const optionsEl = document.getElementById('dialogue-choices');
    if (optionsEl) optionsEl.innerHTML = '';
    if (Array.isArray(node.options) && node.options.length > 0) {
        node.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = option.text;
            btn.onclick = () => {
                if (option.next) {
                    showMissionInterview(npc, option.next);
                } else if (option.action) {
                    option.action();
                } else {
                    showInterviewMenu();
                }
            };
            optionsEl.appendChild(btn);
        });
    } else {
        if (optionsEl) optionsEl.innerHTML = '<em>End of interview.</em>';
    }
    if (node.clue) showPopup(`Clue obtained: ${node.clue}`);
}

// Show a generic dialogue (e.g., system messages, menus)
function showDialogue(npc, text, choices = []) {
    // Sync NPC name in both the dialogue bubble and the portrait label
    const npcNameEl = document.getElementById('npc-name');
    const bubbleNpcNameEl = document.getElementById('bubble-npc-name');
    const npcNameLabelEl = document.getElementById('npc-name-label');
    if (npcNameEl) npcNameEl.innerText = npc;
    if (bubbleNpcNameEl) bubbleNpcNameEl.innerText = npc;
    if (npcNameLabelEl) npcNameLabelEl.innerText = npc;
    // Typing effect for dialogue text
    const textEl = document.getElementById('dialogue-text');
    if (textEl) typeText(text || '', textEl);
    // Render choices
    const optionsEl = document.getElementById('dialogue-choices');
    if (optionsEl) optionsEl.innerHTML = '';
    if (Array.isArray(choices) && choices.length > 0) {
        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = choice.text;
            btn.onclick = () => {
                if (choice.action) choice.action();
            };
            optionsEl.appendChild(btn);
        });
    } else {
        if (optionsEl) optionsEl.innerHTML = '<em>Continue...</em>';
    }
}

// --- NPC Portrait Rendering (using game.js logic) ---
const AVATAR_SIZE = 128;
let investigationSpriteData = null;
let investigationNpcAvatars = {};

function renderInvestigationNpcPortrait(npcName) {
    const container = document.getElementById('speaker-npc');
    if (!container) return;
    if (!investigationSpriteData) {
        fetch('/get_sprites')
            .then(res => res.json())
            .then(data => {
                investigationSpriteData = data;
                renderInvestigationNpcPortrait(npcName);
            });
        return;
    }
    if (!investigationNpcAvatars[npcName]) {
        investigationNpcAvatars[npcName] = randomNpcAvatar(investigationSpriteData);
    }
    renderAvatarLayers(container, investigationNpcAvatars[npcName]);
}

function renderAvatarLayers(container, avatar) {
    container.innerHTML = '';
    if (avatar.characters && avatar.characters.img) {
        const charImg = document.createElement('img');
        charImg.src = avatar.characters.img;
        charImg.className = 'avatar-layer';
        charImg.style.width = `${AVATAR_SIZE}px`;
        charImg.style.height = `${AVATAR_SIZE}px`;
        container.appendChild(charImg);
    }
    ['clothes', 'hair', 'face', 'acc'].forEach(category => {
        if (avatar[category]) {
            Object.values(avatar[category]).forEach(sel => {
                if (sel && sel.img) {
                    const img = document.createElement('img');
                    img.src = sel.img;
                    img.className = 'avatar-layer';
                    img.style.width = `${AVATAR_SIZE}px`;
                    img.style.height = `${AVATAR_SIZE}px`;
                    img.onerror = function() { this.style.display = 'none'; };
                    container.appendChild(img);
                }
            });
        }
    });
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomNpcAvatar(spriteData) {
    const avatar = {};
    if (spriteData.characters && spriteData.characters.length > 0) {
        const char = getRandomElement(spriteData.characters);
        avatar.characters = { name: char.name, img: char.img };
    }
    avatar.clothes = {};
    let hasDress = false;
    if (spriteData.clothes && spriteData.clothes.dress && spriteData.clothes.dress.length > 0 && Math.random() < 0.5) {
        const dress = getRandomElement(spriteData.clothes.dress);
        avatar.clothes.dress = { name: dress.name, img: dress.img };
        hasDress = true;
    }
    if (!hasDress && spriteData.clothes) {
        if (spriteData.clothes.basic && spriteData.clothes.basic.length > 0) {
            const shirt = getRandomElement(spriteData.clothes.basic);
            avatar.clothes.basic = { name: shirt.name, img: shirt.img };
        }
        if (spriteData.clothes.pants && spriteData.clothes.pants.length > 0) {
            const pants = getRandomElement(spriteData.clothes.pants);
            avatar.clothes.pants = { name: pants.name, img: pants.img };
        } else if (spriteData.clothes.skirts && spriteData.clothes.skirts.length > 0) {
            const skirt = getRandomElement(spriteData.clothes.skirts);
            avatar.clothes.skirts = { name: skirt.name, img: skirt.img };
        }
    }
    if (spriteData.hair) {
        const subcats = Object.keys(spriteData.hair);
        if (subcats.length > 0) {
            const randSubcat = getRandomElement(subcats);
            const options = spriteData.hair[randSubcat];
            if (options && options.length > 0) {
                avatar.hair = {};
                const randOpt = getRandomElement(options);
                avatar.hair[randSubcat] = { name: randOpt.name, img: randOpt.img };
            }
        }
    }
    if (spriteData.face) {
        const subcats = Object.keys(spriteData.face);
        if (subcats.length > 0) {
            const randSubcat = getRandomElement(subcats);
            const options = spriteData.face[randSubcat];
            if (options && options.length > 0) {
                avatar.face = {};
                const randOpt = getRandomElement(options);
                avatar.face[randSubcat] = { name: randOpt.name, img: randOpt.img };
            }
        }
    }
    if (spriteData.acc) {
        const subcats = Object.keys(spriteData.acc);
        if (subcats.length > 0) {
            const randSubcat = getRandomElement(subcats);
            const options = spriteData.acc[randSubcat];
            if (options && options.length > 0) {
                avatar.acc = {};
                const randOpt = getRandomElement(options);
                avatar.acc[randSubcat] = { name: randOpt.name, img: randOpt.img };
            }
        }
    }
    if (spriteData.clothes && spriteData.clothes.shoes && spriteData.clothes.shoes.length > 0) {
        const shoes = getRandomElement(spriteData.clothes.shoes);
        avatar.clothes.shoes = { name: shoes.name, img: shoes.img };
    }
    return avatar;
}

// On page load, show a default NPC portrait
function setNpcPortrait() {
    renderInvestigationNpcPortrait('SECTOR-9 Command');
}

// --- Tool Actions ---
function runScan() {
    markObjectiveComplete(0);
    const el = document.getElementById('scan-result');
    if (el) el.innerHTML = '<div class="success-message"><strong>Scan Complete:</strong> Suspicious files detected.</div>';
}
function runAnalysis() {
    markObjectiveComplete(1);
    const el = document.getElementById('analysis-result');
    if (el) el.innerHTML = '<div class="warning-message"><strong>Analysis Complete:</strong> Malware signatures found.</div>';
}
function saveNotes() {
    const notes = document.getElementById('notes-text').value;
    localStorage.setItem('investigationNotes', notes);
    showToast('Notes saved!');
}
function showToast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#28a745;color:#fff;padding:12px 24px;border-radius:8px;z-index:9999;font-family:\'Share Tech Mono\',monospace;animation:fadeInOut 3s ease-in-out;';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}


// --- Hint System (placeholder) ---
function showHint() {
    const hintBox = document.getElementById('hint-box');
    const hintContent = document.getElementById('hint-content');
    if (hintBox && hintContent) {
        hintContent.textContent = 'Try interviewing all available NPCs and using your tools!';
        hintBox.classList.remove('hidden');
        hintBox.style.display = 'flex';
        setTimeout(() => { hintBox.classList.add('hidden'); hintBox.style.display = 'none'; }, 4000);
    }
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    setBackgroundImage();
    setupMenuAndModals();
    setNpcPortrait();
    // Show the start node from the loaded dialogue file
    const nodes = getCurrentDialogueNodes();
    if (nodes['start']) {
        showDialogue('System', nodes['start'].text, [
            { text: 'Begin Investigation', action: showInterviewMenu }
        ]);
    } else {
        showInterviewMenu();
    }
});

let lastInterviewedNpc = null;

function showPopup(message, duration = 2200) {
  const popup = document.getElementById('popup-notification');
  if (!popup) return;
  popup.textContent = message;
  popup.classList.add('show');
  popup.classList.remove('hidden');
  setTimeout(() => {
    popup.classList.remove('show');
    popup.classList.add('hidden');
  }, duration);
}

document.addEventListener('DOMContentLoaded', setupMenuAndModals);

document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('show-achievements-btn');
  if (btn) {
    btn.onclick = function() {
      renderAchievements('achievements-list');
      document.getElementById('achievements-modal').style.display = 'block';
    };
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var hamburger = document.getElementById('hamburger-menu');
  var dropdown = document.getElementById('dropdown-menu');
  if (hamburger && dropdown) {
    hamburger.onclick = function() {
      dropdown.classList.toggle('hidden');
    };
    // Optional: close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target) && e.target !== hamburger) {
        dropdown.classList.add('hidden');
      }
    });
  }
});

function showCelebrationModal() {
  // Remove any existing modal
  const oldModal = document.getElementById('celebration-modal');
  if (oldModal) oldModal.remove();
  // Create modal
  const modal = document.createElement('div');
  modal.id = 'celebration-modal';
  modal.className = 'celebration-modal';
  modal.innerHTML = `
    <div class="celebration-content">
      <h2>🎉 Mission Complete! 🎉</h2>
      <p>All objectives accomplished. Great job, Agent!</p>
      <button id="exit-mission-btn">Exit</button>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById('exit-mission-btn').onclick = function() {
    window.location.href = '/game'; // Change this to your desired exit location
  };
}

// Add CSS for the modal
(function addCelebrationModalCSS() {
  if (document.getElementById('celebration-modal-style')) return;
  const style = document.createElement('style');
  style.id = 'celebration-modal-style';
  style.textContent = `
    .celebration-modal {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.85); z-index: 9999; display: flex; align-items: center; justify-content: center;
    }
    .celebration-content {
      background: #232336; color: #FFD700; padding: 40px 60px; border-radius: 18px; text-align: center;
      box-shadow: 0 8px 32px #0008;
    }
    .celebration-content h2 { margin-top: 0; }
    .celebration-content button {
      margin-top: 24px; padding: 12px 32px; font-size: 1.2em; border-radius: 8px; border: none; background: #6C5CE7; color: white; cursor: pointer;
    }
  `;
  document.head.appendChild(style);
})();
