// ---- Constants ----
const AVATAR_SIZE = 128;
const POPUP_DURATION = 2200;

// ---- 1. Background Image Logic ----
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
    const img = new window.Image();
    img.onload = () => {
        bgDiv.style.backgroundImage = `url('${imageUrl}')`;
        bgDiv.style.backgroundColor = '';
    };
    img.onerror = () => {
        bgDiv.style.backgroundImage = 'none';
        bgDiv.style.backgroundColor = '#222';
    };
    img.src = imageUrl;
}

// ---- 2. Tool Sidebar Logic ----
const tools = [
    { name: "Network Scanner", description: "Scan for active connections and breach points.", icon: "🛰️", unlocked: true },
    { name: "Log Analyzer", description: "Parse and highlight suspicious logins.", icon: "📜", unlocked: true },
    { name: "Password Cracker", description: "Crack/reset compromised accounts.", icon: "🔑", unlocked: false },
    { name: "File Recovery Tool", description: "Recover deleted system logs.", icon: "💾", unlocked: false }
];
let selectedTool = null;

function renderToolSidebar() {
    const ul = document.getElementById("tool-list");
    if (!ul) return;
    ul.innerHTML = "";
    tools.forEach((tool, idx) => {
        const li = document.createElement("li");
        li.className = "tool-item" + (tool.unlocked ? "" : " locked") + (selectedTool === idx ? " selected" : "");
        li.innerHTML = `
            <span class="tool-icon">${tool.icon}</span>
            <span class="tool-name">${tool.name}</span>
            <span class="tool-desc">${tool.description}</span>
        `;
        if (tool.unlocked) {
            li.onclick = () => selectTool(idx);
        }
        ul.appendChild(li);
    });
    const equipped = document.getElementById("equipped-tool");
    if (equipped) equipped.innerText = selectedTool !== null ? tools[selectedTool].name : "None";
}

function selectTool(idx) {
    if (!tools[idx].unlocked) return;
    selectedTool = idx;
    renderToolSidebar();
}

function unlockTool(toolName) {
    const tool = tools.find(t => t.name === toolName);
    if (tool) tool.unlocked = true;
    renderToolSidebar();
}

// ---- 3. Menu and Modals ----
function setupMenuAndModals() {
    // Hamburger dropdown menu logic
    const hamburger = document.getElementById('hamburger-menu');
    const dropdown = document.getElementById('dropdown-menu');
    if (hamburger && dropdown) {
        hamburger.onclick = function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        };
        dropdown.onclick = e => e.stopPropagation();
        document.addEventListener('click', () => dropdown.classList.add('hidden'));
        dropdown.querySelectorAll('.menu-item').forEach(item => {
            item.onclick = () => dropdown.classList.add('hidden');
        });
    }

    // Tool modal logic
    addToolEvent('interview-btn', showInvestigationIntro);
    addToolEvent('scan-btn', () => showToolModal('Evidence Scanner', `
        <button id="run-scan-btn" class="action-btn"><i class="fas fa-search"></i> Run System Scan</button>
        <div id="scan-result" class="result-container"></div>`));
    addToolEvent('analyze-btn', () => showToolModal('Digital Analysis', `
        <button id="run-analysis-btn" class="action-btn"><i class="fas fa-microscope"></i> Analyze Evidence</button>
        <div id="analysis-result" class="result-container"></div>`));
    addToolEvent('notes-btn', () => {
        const notes = localStorage.getItem('investigationNotes') || '';
        showToolModal('Mission Notes', `
            <textarea id="notes-text" placeholder="Record your findings..." class="notes-textarea">${notes}</textarea>
            <button id="save-notes-btn" class="action-btn notes-save-btn"><i class="fas fa-save"></i> Save Notes</button>`);
    });

    // Modal close logic
    const closeModal = document.getElementById('close-modal');
    if (closeModal) closeModal.onclick = () => document.getElementById('tool-modal').classList.add('hidden');

    // Help & hint modal logic
    const helpBtn = document.getElementById('help-btn');
    const helpModal = document.getElementById('help-modal');
    const helpClose = document.getElementById('help-close');
    if (helpBtn && helpModal) helpBtn.onclick = () => { helpModal.classList.add('active'); helpModal.style.display = 'flex'; };
    if (helpClose && helpModal) helpClose.onclick = () => { helpModal.classList.remove('active'); helpModal.style.display = 'none'; };
    if (helpModal) helpModal.onclick = e => { if (e.target === helpModal) { helpModal.classList.remove('active'); helpModal.style.display = 'none'; } };
    const hintBtn = document.getElementById('hint-btn');
    if (hintBtn) hintBtn.onclick = showHint;
}

function addToolEvent(id, handler) {
    const btn = document.getElementById(id);
    const dropdown = document.getElementById('dropdown-menu');
    if (btn) {
        btn.onclick = () => {
            if (dropdown) dropdown.classList.add('hidden');
            try { handler(); } catch (e) { console.error(e); }
        };
    }
}

function showToolModal(title, content) {
    const modal = document.getElementById('tool-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalTitle || !modalBody) return;
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

// ---- 4. Objective Tracking ----
function getCompletedObjectives(levelKey) {
    return JSON.parse(localStorage.getItem('completedObjectives_' + levelKey)) || [];
}

function setCompletedObjectives(levelKey, arr) {
    localStorage.setItem('completedObjectives_' + levelKey, JSON.stringify(arr));
}

function markObjectiveComplete(idx) {
    const bg = document.querySelector('.location-background');
    const loc = bg ? bg.dataset.location : 'hq';
    const levelKey = locationToLevel[loc] || 'level1';
    let completed = getCompletedObjectives(levelKey);
    if (!completed.includes(idx)) {
        completed.push(idx);
        setCompletedObjectives(levelKey, completed);
    }
    renderObjectives(levelKey);
    const objectives = window.missionObjectives[levelKey] || [];
    if (objectives[idx]) showPopup("Objective completed: " + objectives[idx]);
    if (completed.length === objectives.length) setTimeout(showCelebrationModal, 800);
}

function renderObjectives(levelKey) {
    const objectives = window.missionObjectives[levelKey] || [];
    const objectivesList = document.getElementById('objectives-list');
    if (!objectivesList) return;
    objectivesList.innerHTML = '';
    const completed = getCompletedObjectives(levelKey);
    objectives.forEach((obj, idx) => {
        const li = document.createElement('li');
        li.dataset.index = idx;
        const isDone = completed.includes(idx);
        li.className = isDone ? 'completed' : '';
        li.innerHTML = `<span class="objective-status">${isDone ? '[✓]' : '[ ]'}</span> ${obj}`;
        objectivesList.appendChild(li);
    });
}

// ---- 5. Dialogue/Interview System ----
let lastInterviewedNpc = null;

/**
 * Show the menu for selecting an NPC to interview.
 */
function showInterviewMenu() {
    const bg = document.querySelector('.location-background');
    const loc = bg ? bg.dataset.location : 'hq';
    const levelKey = locationToLevel[loc] || 'level1';
    renderObjectives(levelKey);
    const dialogues = window.missionDialogues[levelKey];
    if (!dialogues || typeof dialogues !== 'object') {
        showDialogue('System', 'No NPCs available for interview at this location.', []);
        return;
    }
    const npcNames = Object.keys(dialogues);
    const choices = npcNames.map(n => ({
        text: `Talk to ${n}` + (n === lastInterviewedNpc ? ' (again)' : ''),
        action: () => {
            lastInterviewedNpc = n;
            showMissionInterview(levelKey, n);
        }
    }));
    choices.push({ text: 'Show Summary', action: showSummary });
    showDialogue('Contact Selection', 'Who would you like to interview next?', choices);
}

function showSummary() {
    const bg = document.querySelector('.location-background');
    const loc = bg ? bg.dataset.location : 'hq';
    const levelKey = locationToLevel[loc] || 'level1';
    const dialogues = window.missionDialogues[levelKey];
    const npcNames = Object.keys(dialogues);
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

function showMissionInterview(level, npc, node = null) {
    if (!node) node = window.missionDialogues[level][npc];
    if (!node) return;
    const speakerEl = document.getElementById('npc-name');
    const textEl = document.getElementById('dialogue-text');
    const optionsEl = document.getElementById('dialogue-choices');
    if (speakerEl) speakerEl.innerText = npc;
    if (textEl) textEl.innerText = node.text || "";
    if (optionsEl) optionsEl.innerHTML = "";
    if (Array.isArray(node.choices) && node.choices.length > 0) {
        node.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = choice.text;
            btn.onclick = () => {
                if (typeof choice.action === "function") choice.action();
                if (choice.nextDialogue) {
                    showMissionInterview(level, npc, choice.nextDialogue);
                } else if (!choice.action) {
                    if (textEl) textEl.innerText = "End of dialogue.";
                }
            };
            optionsEl.appendChild(btn);
        });
    } else {
        if (optionsEl) optionsEl.innerHTML = "<em>End of interview.</em>";
    }
    if (node.clue) showPopup(`Clue obtained: ${node.clue}`);
}

function showDialogue(npc, text, choices = []) {
    const npcNameEl = document.getElementById('npc-name');
    const dialogueTextEl = document.getElementById('dialogue-text');
    const choicesContainer = document.getElementById('dialogue-choices');
    const continueEl = document.getElementById('dialogue-continue');
    if (npcNameEl) npcNameEl.textContent = npc || 'Unknown';
    if (dialogueTextEl) dialogueTextEl.textContent = text || '...';
    if (choicesContainer) choicesContainer.innerHTML = '';
    if (Array.isArray(choices) && choices.length > 0) {
        if (continueEl) continueEl.classList.add('hidden');
        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text || 'Continue';
            btn.onclick = () => {
                if (typeof choice.action === 'function') choice.action();
                if (choice.nextDialogue) {
                    showDialogue(choice.nextDialogue.npc, choice.nextDialogue.text, choice.nextDialogue.choices);
                } else if (!choice.action) {
                    if (dialogueTextEl) dialogueTextEl.textContent = 'End of dialogue.';
                }
            };
            choicesContainer.appendChild(btn);
        });
    } else {
        if (continueEl) continueEl.classList.remove('hidden');
    }
}

// ---- 6. Other UI ----
function showPopup(message, duration = POPUP_DURATION) {
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

function showCelebrationModal() {
    const oldModal = document.getElementById('celebration-modal');
    if (oldModal) oldModal.remove();
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
        window.location.href = '/game';
    };
}

(function addCelebrationModalCSS() {
    if (document.getElementById('celebration-modal-style')) return;
    const style = document.createElement('style');
    style.id = 'celebration-modal-style';
    style.textContent = `
        .celebration-modal { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.85); z-index: 9999; display: flex; align-items: center; justify-content: center; }
        .celebration-content { background: #232336; color: #FFD700; padding: 40px 60px; border-radius: 18px; text-align: center;
        box-shadow: 0 8px 32px #0008; }
        .celebration-content h2 { margin-top: 0; }
        .celebration-content button {
        margin-top: 24px; padding: 12px 32px; font-size: 1.2em; border-radius: 8px; border: none; background: #6C5CE7; color: white; cursor: pointer;
        }
    `;
    document.head.appendChild(style);
})();

// ---- 7. On Page Load ----
document.addEventListener('DOMContentLoaded', () => {
    setBackgroundImage();
    setupMenuAndModals();
    setNpcPortrait();
    if (typeof defineBranchingDialogues === 'function') defineBranchingDialogues();
    if (typeof showDialogueNode === 'function') showDialogueNode('investigation_intro');
    renderToolSidebar();
});

// ---- 8. NPC Portrait Rendering (using game.js logic) ----
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
            })
            .catch(err => console.error('Failed to fetch sprite data:', err));
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