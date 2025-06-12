// --- DIALOGUE DATA & SYSTEMS (COMBINED) ---
// Mission-specific dialogues with proper NPC names for visual novel system
window.missionDialogues = {
    // ... (same as in dialogues.js, omitted for brevity)
};

// Legacy dialogue system (keeping for backwards compatibility)
const levelDialogues = {
    // ... (same as in dialogues.js, omitted for brevity)
};

// Branching intro, tutorial, and mission story
defineBranchingDialogues();

function defineBranchingDialogues() {
  window.dialogues = {
    // ... (same as in dialogues.js, omitted for brevity)
  };
}

// --- NPC Avatar Randomizer ---
let npcAvatars = {};
let npcSpriteData = null;
function fetchNpcSpriteData(callback) {
  if (npcSpriteData) return callback(npcSpriteData);
  fetch('/get_sprites')
    .then(res => res.json())
    .then(data => {
      npcSpriteData = data;
      callback(data);
    });
}
function randomizeNpcAvatar() {
  const avatar = {};
  if (npcSpriteData.characters && npcSpriteData.characters.length > 0) {
    const randChar = npcSpriteData.characters[Math.floor(Math.random() * npcSpriteData.characters.length)];
    avatar.characters = { name: randChar.name, img: randChar.img };
  }
  ["clothes", "hair", "face", "acc"].forEach(cat => {
    if (npcSpriteData[cat]) {
      const subcats = Object.keys(npcSpriteData[cat]);
      if (subcats.length > 0) {
        const randSubcat = subcats[Math.floor(Math.random() * subcats.length)];
        const options = npcSpriteData[cat][randSubcat];
        if (options && options.length > 0) {
          const randOpt = options[Math.floor(Math.random() * options.length)];
          if (!avatar[cat]) avatar[cat] = {};
          avatar[cat][randSubcat] = { name: randOpt.name, img: randOpt.img };
        }
      }
    }
  });
  return avatar;
}
function renderNpcAvatar(avatar, container) {
  container.innerHTML = '';
  if (avatar.characters && avatar.characters.img) {
    const img = document.createElement('img');
    img.src = avatar.characters.img;
    img.className = 'avatar-layer';
    container.appendChild(img);
  }
  const LAYER_ORDER = ['clothes', 'hair', 'face', 'acc'];
  LAYER_ORDER.forEach(category => {
    if (avatar[category]) {
      if (typeof avatar[category] === 'object' && !Array.isArray(avatar[category])) {
        Object.values(avatar[category]).forEach(sel => {
          if (sel && sel.img) {
            const img = document.createElement('img');
            img.src = sel.img;
            img.className = 'avatar-layer';
            img.onerror = function() { this.style.display = 'none'; };
            container.appendChild(img);
          }
        });
      }
    }
  });
}

// --- ADVANCED DIALOGUE SYSTEM ---
const DIALOGUE_STATE_KEY = 'dialogue_progress';
function saveDialogueState(state) {
  localStorage.setItem(DIALOGUE_STATE_KEY, JSON.stringify(state));
}
function loadDialogueState() {
  const state = localStorage.getItem(DIALOGUE_STATE_KEY);
  return state ? JSON.parse(state) : null;
}
function setBackground(levelKey) {
  document.body.style.backgroundImage = `url('/static/backgrounds/${levelKey}.jpg')`;
  document.body.style.backgroundSize = 'cover';
}
function setPortrait(npcKey) {
  const portrait = document.getElementById('dialoguePortrait');
  portrait.src = `/static/portraits/${npcKey}.png`;
  portrait.style.display = 'block';
}
function showDialogue(levelKey, npcKey, lineIdx = 0) {
  setBackground(levelKey);
  setPortrait(npcKey);
  const npcLines = levelDialogues[levelKey][npcKey];
  let idx = lineIdx;
  function renderLine() {
    const line = npcLines[idx];
    document.getElementById('dialogueSpeaker').innerText = npcKey.replace(/_/g, ' ');
    document.getElementById('dialogueText').innerText = line.text;
    const opts = document.getElementById('dialogueOptions');
    opts.innerHTML = '';
    if (line.choices) {
      line.choices.forEach((choice, i) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = choice.text;
        btn.onclick = () => {
          saveDialogueState({ levelKey, npcKey, idx: choice.next });
          idx = choice.next;
          renderLine();
        };
        opts.appendChild(btn);
      });
    } else {
      if (idx > 0) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'choice-btn';
        prevBtn.innerText = 'Previous';
        prevBtn.onclick = () => { idx--; renderLine(); };
        opts.appendChild(prevBtn);
      }
      if (idx < npcLines.length - 1) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'choice-btn';
        nextBtn.innerText = 'Next';
        nextBtn.onclick = () => {
          saveDialogueState({ levelKey, npcKey, idx: idx + 1 });
          idx++;
          renderLine();
        };
        opts.appendChild(nextBtn);
      }
    }
    saveDialogueState({ levelKey, npcKey, idx });
  }
  renderLine();
}
function showBranchingDialogue(key) {
  setBackground('default');
  const portrait = document.getElementById('dialoguePortrait');
  if (portrait) portrait.style.display = 'none';
  const d = window.dialogues[key];
  if (!d) {
    console.error(`Dialogue key '${key}' not found in dialogues.`);
    return;
  }
  const speaker = document.getElementById('dialogueSpeaker');
  const text = document.getElementById('dialogueText');
  const opts = document.getElementById('dialogueOptions');
  if (speaker) speaker.innerText = '';
  if (text) text.innerText = d.text || '';
  if (opts) opts.innerHTML = '';
  if (Array.isArray(d.options)) {
    d.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerText = opt;
      btn.onclick = () => {
        saveDialogueState({ branchKey: d.next[i] });
        showBranchingDialogue(d.next[i]);
      };
      if (opts) opts.appendChild(btn);
    });
  }
}
window.addEventListener('DOMContentLoaded', () => {
  const state = loadDialogueState();
  if (state) {
    if (state.branchKey) {
      showBranchingDialogue(state.branchKey);
    } else {
      showDialogue(state.levelKey, state.npcKey, state.idx);
    }
  } else {
    if (typeof window.dialogues !== 'undefined' && window.dialogues.intro) {
      showBranchingDialogue('intro');
    } else {
      showDialogue('level1', Object.keys(levelDialogues['level1'])[0]);
    }
  }
});
// === Utility Functions ===
function getEl(id) {
  const el = document.getElementById(id);
  if (!el) console.error(`Element with id "${id}" not found.`);
  return el;
}
function safeSetText(el, text) {
  if (el) el.textContent = text;
}
function safeSetHTML(el, html) {
  if (el) el.innerHTML = html;
}
function createChoiceButton(text, onClick) {
  const btn = document.createElement("button");
  btn.className = "dialogue-choice-btn";
  btn.textContent = text;
  btn.onclick = onClick;
  return btn;
}
// === Refactored Dialogue Display ===
function showDialogueRefactored(npcName, dialogueText, choices = []) {
  const npcNameEl = getEl('npc-name');
  const dialogueTextEl = getEl('dialogue-text');
  const choicesContainer = getEl('dialogue-choices');
  const continueEl = getEl('dialogue-continue');
  safeSetText(npcNameEl, npcName || "Unknown");
  safeSetText(dialogueTextEl, dialogueText || "...");
  safeSetHTML(choicesContainer, "");
  if (Array.isArray(choices) && choices.length > 0) {
    if (continueEl) continueEl.style.display = 'none';
    choices.forEach(choice => {
      const btn = createChoiceButton(choice.text || "Continue", () => {
        if (typeof choice.action === "function") choice.action();
        if (choice.nextDialogue) {
          showDialogueRefactored(choice.nextDialogue.npc, choice.nextDialogue.text, choice.nextDialogue.choices);
        } else if (!choice.action) {
          safeSetText(dialogueTextEl, "End of dialogue.");
        }
      });
      if (choicesContainer) choicesContainer.appendChild(btn);
    });
  } else {
    if (continueEl) continueEl.style.display = '';
  }
} 