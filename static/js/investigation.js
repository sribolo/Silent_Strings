// Investigation page JavaScript (moved from inline to external to satisfy CSP)

// -------------------- GLOBAL VARIABLES --------------------
let objectivesCompleted = 0;
const totalObjectives = 4;

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
  generateNPC();
  setupEvents();
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
function generateNPC() {
  const portrait = document.getElementById('npc-portrait');
  if (!portrait) return;
  portrait.innerHTML = '';
  ['character', 'hair', 'clothes', 'face'].forEach(layer => {
    const img = document.createElement('img');
    img.className = 'avatar-layer';
    img.src = `/static/images/avatar_parts/${layer}/${getRandomVariant(layer)}.png`;
    img.onerror = () => (img.style.display = 'none');
    portrait.appendChild(img);
  });
}

function getRandomVariant(layer) {
  const variants = {
    character: ['character1', 'character2', 'character3'],
    hair: ['hair1', 'hair2', 'hair3', 'hair4'],
    clothes: ['clothes1', 'clothes2', 'clothes3', 'clothes4'],
    face: ['face1', 'face2', 'face3']
  };
  const arr = variants[layer] || ['default'];
  return arr[Math.floor(Math.random() * arr.length)];
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
  if (btn) btn.addEventListener('click', () => { dropdown.classList.add('hidden'); handler(); });
}

// -------------------- TOOL ACTIONS --------------------
function runScan() {
  completeObjective();
  const el = document.getElementById('scan-result');
  if (el) el.innerHTML = '<div class="success-message"><strong>Scan Complete:</strong> Suspicious files detected.</div>';
}

function runAnalysis() {
  completeObjective();
  const el = document.getElementById('analysis-result');
  if (el) el.innerHTML = '<div class="warning-message"><strong>Analysis Complete:</strong> Malware signatures found.</div>';
}

function saveNotes() {
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
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = content;
  document.getElementById('tool-modal').classList.remove('hidden');
}

// -------------------- DIALOGUE --------------------
function startInterview() {
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