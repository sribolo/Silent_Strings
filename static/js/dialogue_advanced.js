// Advanced Dialogue System
// Assumes levelDialogues and dialogues objects are loaded from dialogues.js

const DIALOGUE_STATE_KEY = 'dialogue_progress';

function saveDialogueState(state) {
  localStorage.setItem(DIALOGUE_STATE_KEY, JSON.stringify(state));
}

function loadDialogueState() {
  const state = localStorage.getItem(DIALOGUE_STATE_KEY);
  return state ? JSON.parse(state) : null;
}

function setBackground(levelKey) {
  // Example: backgrounds/level1.jpg
  document.body.style.backgroundImage = `url('/static/backgrounds/${levelKey}.jpg')`;
  document.body.style.backgroundSize = 'cover';
}

function setPortrait(npcKey) {
  // Example: portraits/IT_Analyst.png
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
  // For dialogues object (branching, not NPC)
  setBackground('default');
  document.getElementById('dialoguePortrait').style.display = 'none';
  const d = dialogues[key];
  document.getElementById('dialogueSpeaker').innerText = '';
  document.getElementById('dialogueText').innerText = d.text;
  const opts = document.getElementById('dialogueOptions');
  opts.innerHTML = '';
  d.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerText = opt;
    btn.onclick = () => {
      saveDialogueState({ branchKey: d.next[i] });
      showBranchingDialogue(d.next[i]);
    };
    opts.appendChild(btn);
  });
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
    // Default: show branching intro, or first NPC dialogue
    if (typeof dialogues !== 'undefined' && dialogues.intro) {
      showBranchingDialogue('intro');
    } else {
      showDialogue('level1', Object.keys(levelDialogues['level1'])[0]);
    }
  }
}); 