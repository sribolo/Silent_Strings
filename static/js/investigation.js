// Investigation page JavaScript (moved from inline to external to satisfy CSP)

// -------------------- GLOBAL VARIABLES --------------------
let objectivesCompleted = 0;
const totalObjectives = 4;

// Avatar sprite data fetched from the backend
let spriteData = null;

// Map location keys to background filenames
const levelToLocationMap = {
  'hq': 'hq',
  'news': 'company_1',
  'bank': 'bank',
  'cafe': 'cafe',
  'transport': 'transport',
  'school': 'school',
  'government': 'government',
  'hospital': 'company',
  'company': 'company',
  'global': 'hq'
};

// -------------------- DOM READY --------------------
window.addEventListener('DOMContentLoaded', () => {
  console.log('investigation.js loaded');
  setBackgroundImage();
  setupEvents();

  // Fetch sprite data first, then spawn NPC portrait
  fetch('/get_sprites')
    .then(res => res.json())
    .then(data => {
      spriteData = data;
      generateNpcPortrait();
    })
    .catch(err => {
      console.error('Failed to fetch sprites', err);
    });
});

// -------------------- BACKGROUND --------------------
function setBackgroundImage() {
  const bgDiv = document.querySelector('.location-background');
  if (!bgDiv) return;
  const locKey = bgDiv.dataset.location;
  const actual = levelToLocationMap[locKey] || 'hq';
  const url = `/static/images/backgrounds/${actual}.png`;
  const img = new Image();
  img.onload = () => (bgDiv.style.backgroundImage = `url('${url}')`);
  img.onerror = () => (bgDiv.style.backgroundImage = `url('/static/images/backgrounds/hq.png')`);
  img.src = url;
}

// -------------------- NPC PORTRAIT --------------------
function generateNpcPortrait() {
  const npcContainer = document.getElementById('speaker-npc');
  if (!npcContainer || !spriteData) return;
  const npcAvatar = randomNpcAvatar(spriteData);
  renderAvatarLayers(npcContainer, npcAvatar);
  renderPlayerBubbleAvatar();
  setActiveSpeaker(false);
}

// Helper: render layered avatar (adapted from game.js)
function renderAvatarLayers(container, avatar) {
  container.innerHTML = '';
  const addLayer = (src) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'avatar-layer';
    img.onerror = () => (img.style.display = 'none');
    container.appendChild(img);
  };

  // Base character
  if (avatar.characters && avatar.characters.img) {
    addLayer(avatar.characters.img);
  }

  // Clothes, hair, face, acc
  ['clothes', 'hair', 'face', 'acc'].forEach(category => {
    if (avatar[category]) {
      Object.values(avatar[category]).forEach(sel => {
        if (sel && sel.img) addLayer(sel.img);
      });
    }
  });
}

// Utility helpers (copied from game.js)
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNpcAvatar(spriteData) {
  const avatar = {};

  // Base character
  if (spriteData.characters && spriteData.characters.length > 0) {
    const char = getRandomElement(spriteData.characters);
    avatar.characters = { name: char.name, img: char.img };
  }

  // Clothes setup
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

  // Hair
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

  // Face
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

  // Accessories
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

  // Shoes optional
  if (spriteData.clothes && spriteData.clothes.shoes && spriteData.clothes.shoes.length > 0) {
    const shoes = getRandomElement(spriteData.clothes.shoes);
    avatar.clothes.shoes = { name: shoes.name, img: shoes.img };
  }

  return avatar;
}

// -------------------- EVENTS --------------------
function setupEvents() {
  const hamburger = document.getElementById('hamburger-menu');
  const dropdown = document.getElementById('dropdown-menu');
  if (hamburger && dropdown) {
    hamburger.addEventListener('click', e => {
      e.stopPropagation();
      dropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.hamburger-menu') && !e.target.closest('.dropdown-menu')) {
        dropdown.classList.add('hidden');
      }
    });
  }

  addToolEvent('interview-btn', startInterview);
  addToolEvent('scan-btn', () => showToolModal('Evidence Scanner', `
      <button onclick="runScan()" class="action-btn"><i class="fas fa-search"></i> Run System Scan</button>
      <div id="scan-result" class="result-container"></div>`));
  addToolEvent('analyze-btn', () => showToolModal('Digital Analysis', `
      <button onclick="runAnalysis()" class="action-btn"><i class="fas fa-microscope"></i> Analyze Evidence</button>
      <div id="analysis-result" class="result-container"></div>`));
  addToolEvent('notes-btn', () => {
    const notes = localStorage.getItem('investigationNotes') || '';
    showToolModal('Mission Notes', `
      <textarea id="notes-text" placeholder="Record your findings..." class="notes-textarea">${notes}</textarea>
      <button onclick="saveNotes()" class="action-btn notes-save-btn"><i class="fas fa-save"></i> Save Notes</button>`);
  });

  const closeModal = document.getElementById('close-modal');
  if (closeModal) closeModal.onclick = () => document.getElementById('tool-modal').classList.add('hidden');

  const continueEl = document.getElementById('dialogue-continue');
  if (continueEl) continueEl.onclick = () => continueEl.classList.add('hidden');
}

function addToolEvent(id, handler) {
  const btn = document.getElementById(id);
  const dropdown = document.getElementById('dropdown-menu');
  if (btn) {
    console.log(`Setting up event for ${id}`);
    btn.addEventListener('click', () => { 
      console.log(`Button ${id} clicked`);
      dropdown.classList.add('hidden'); 
      try {
        handler(); 
      } catch (error) {
        console.error(`Error in handler for ${id}:`, error);
      }
    });
  } else {
    console.error(`Button with id ${id} not found`);
  }
}

// -------------------- TOOL ACTIONS --------------------
function runScan() {
  console.log('runScan called');
  completeObjective();
  const el = document.getElementById('scan-result');
  if (el) el.innerHTML = '<div class="success-message"><strong>Scan Complete:</strong> Suspicious files detected.</div>';
}

function runAnalysis() {
  console.log('runAnalysis called');
  completeObjective();
  const el = document.getElementById('analysis-result');
  if (el) el.innerHTML = '<div class="warning-message"><strong>Analysis Complete:</strong> Malware signatures found.</div>';
}

function saveNotes() {
  console.log('saveNotes called');
  const notes = document.getElementById('notes-text').value;
  localStorage.setItem('investigationNotes', notes);
  showToast('Notes saved!');
}

function completeObjective() {
  objectivesCompleted = Math.min(objectivesCompleted + 1, totalObjectives);
  showToast(`Objective completed! (${objectivesCompleted}/${totalObjectives})`);
}

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#28a745;color:#fff;padding:12px 24px;border-radius:8px;z-index:9999;font-family:\'Share Tech Mono\',monospace;animation:fadeInOut 3s ease-in-out;';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function showToolModal(title, content) {
  console.log('showToolModal called with title:', title);
  const modal = document.getElementById('tool-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  
  if (!modal || !modalTitle || !modalBody) {
    console.error('Modal elements not found');
    alert(`${title}: Feature not available`);
    return;
  }
  
  modalTitle.textContent = title;
  modalBody.innerHTML = content;
  modal.classList.remove('hidden');
}

// -------------------- DIALOGUE --------------------
function startInterview() {
  console.log('startInterview called');
  const bg = document.querySelector('.location-background');
  const missionLocation = bg ? bg.dataset.location : 'hq';
  const levelKey = getDialogueLevelKey(missionLocation);
  if (window.missionDialogues && window.missionDialogues[levelKey]) {
    const dialogues = window.missionDialogues[levelKey];
    const npcNames = Object.keys(dialogues);
    if (npcNames.length === 1) {
      const npc = npcNames[0];
      showDialogue(npc, dialogues[npc].text, dialogues[npc].choices);
    } else if (npcNames.length > 1) {
      showDialogue('Contact Selection', 'Who would you like to interview?', npcNames.map(n => ({
        text: `Talk to ${n}`,
        nextDialogue: { npc: n, text: dialogues[n].text, choices: dialogues[n].choices }
      })));
    } else {
      showDialogue('No Contacts', 'No contacts available at this location.', []);
    }
  } else {
    const name = bg ? bg.dataset.locationName : 'this location';
    showDialogue('Local Contact', `Welcome to ${name}. The situation is critical.`, [{ text: "I'll investigate immediately.", action: () => {} }]);
  }
}

function showDialogue(npc, text, choices = []) {
  document.getElementById('npc-name').textContent = npc;
  typeText(text, document.getElementById('dialogue-text'));
  const choicesBox = document.getElementById('dialogue-choices');
  const continueEl = document.getElementById('dialogue-continue');
  choicesBox.innerHTML = '';
  if (choices.length) {
    continueEl.classList.add('hidden');
    choices.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = c.text;
      btn.onclick = () => {
        if (c.action) c.action();
        if (c.nextDialogue) showDialogue(c.nextDialogue.npc, c.nextDialogue.text, c.nextDialogue.choices);
        else resetDialogue();
      };
      choicesBox.appendChild(btn);
    });
  } else {
    continueEl.classList.remove('hidden');
  }
}

function resetDialogue() {
  document.getElementById('npc-name').textContent = 'SECTOR-9 Command';
  document.getElementById('dialogue-text').textContent = 'Investigation ongoing. Use the menu for additional tools.';
  document.getElementById('dialogue-choices').innerHTML = '';
  document.getElementById('dialogue-continue').classList.add('hidden');
}

function typeText(txt, el) {
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += txt.charAt(i);
    i++;
    if (i >= txt.length) clearInterval(timer);
  }, 30);
}

function getDialogueLevelKey(loc) {
  const map = {
    hq: 'level1', news: 'level2', bank: 'level3', cafe: 'level4', transport: 'level5',
    school: 'level6', government: 'level7', hospital: 'level8', company: 'level9', global: 'level10'
  };
  return map[loc] || 'level1';
}

// Export for other scripts if needed
window.markObjectiveComplete = () => completeObjective();

function renderPlayerBubbleAvatar() {
  const playerSrcLayers = Array.from(document.querySelectorAll('#player-avatar img')).map(img => img.src);
  const playerContainer = document.getElementById('speaker-player');
  if (!playerContainer) return;
  playerContainer.innerHTML = '';
  playerSrcLayers.forEach(src => {
    const img = document.createElement('img');
    img.className = 'avatar-layer';
    img.src = src;
    img.onerror = () => (img.style.display = 'none');
    playerContainer.appendChild(img);
  });
}

function setActiveSpeaker(isPlayer) {
  const p = document.getElementById('speaker-player');
  const n = document.getElementById('speaker-npc');
  if (!p || !n) return;
  if (isPlayer) {
    p.classList.remove('inactive');
    n.classList.add('inactive');
  } else {
    n.classList.remove('inactive');
    p.classList.add('inactive');
  }
}

// Make functions globally accessible for onclick handlers
window.runScan = runScan;
window.runAnalysis = runAnalysis;
window.saveNotes = saveNotes; 