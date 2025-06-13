// Hint/Help/Guide System
function getEl(id) {
  const el = document.getElementById(id);
  if (!el) console.error(`Element with id "${id}" not found.`);
  return el;
}

function showHint() {
  let hintBox = getEl('hint-box');
  if (!hintBox) return;

  let node = null;

  // 1. Branching dialogue system
  if (window.currentKey && window.dialogues && window.dialogues[window.currentKey]) {
    node = window.dialogues[window.currentKey];
  }
  // 2. Mission dialogue system (multi-level)
  else if (window.currentLevel && window.currentNPC && window.missionDialogues
           && window.missionDialogues[window.currentLevel]
           && window.missionDialogues[window.currentLevel][window.currentNPC]) {
    node = window.missionDialogues[window.currentLevel][window.currentNPC];
  }

  if (node && node.hint) {
    hintBox.innerText = node.hint;
    hintBox.style.display = 'block';
  } else {
    hintBox.innerText = 'No hint available for this step.';
    hintBox.style.display = 'block';
  }
}

function hideHint() {
  let hintBox = getEl('hint-box');
  if (hintBox) hintBox.style.display = 'none';
}

function showHelpModal() {
  let modal = getEl('help-modal');
  let helpText = getEl('help-text');
  if (!modal || !helpText) return;
  // Map mission keys to personalized help messages
  const helpTexts = {
    'level1': 'Mission 1: Start by checking the server logs for unusual activity...',
    'level2': 'Mission 2: Investigate the website defacement by analyzing suspicious JavaScript...',
    'level3': 'Mission 3: Trace the origins of the ransomware by examining suspicious emails...',
    'level4': 'Mission 4: Audit recent code changes in the repository and talk to DevOps...',
    'level5': 'Mission 5: Scan the government server for malware and interview the sysadmin...',
    'level6': 'Mission 6: Check SCADA system logs for remote access and interview operators...',
    'level7': 'Mission 7: Investigate possible insider threats by reviewing access logs...',
    'level8': 'Mission 8: Monitor dark web forums for chatter about PH4NT0M...',
    'level9': 'Mission 9: Investigate the transit system hack by checking the control center...',
    'level10': 'Final Mission: This is the showdown with Ghostline. Review all clues...'
  };
  // Try to get the current mission key from window.currentLevel or fallback to window.currentKey
  let missionKey = (window.currentLevel || (window.currentKey || '').split('_')[0]);
  helpText.textContent = helpTexts[missionKey] || 'Use your investigation tools and follow the clues to solve the mission.';
  modal.style.display = 'block';
}

function hideHelpModal() {
  let modal = getEl('help-modal');
  if (modal) modal.style.display = 'none';
}

// Add event listeners for help/hint buttons if present
window.addEventListener('DOMContentLoaded', function() {
  let helpBtn = getEl('help-btn');
  if (helpBtn) helpBtn.onclick = showHelpModal;
  let closeBtn = getEl('help-close');
  if (closeBtn) closeBtn.onclick = hideHelpModal;
  let hintBtn = getEl('hint-btn');
  if (hintBtn) hintBtn.onclick = showHint;
}); 