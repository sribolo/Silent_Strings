// Hint/Help/Guide System
function getEl(id) {
  const el = document.getElementById(id);
  if (!el) console.error(`Element with id "${id}" not found.`);
  return el;
}

function showHint(currentKey, dialogues) {
  let hintBox = getEl('hint-box');
  if (!hintBox) return;
  if (!dialogues || !currentKey) {
    hintBox.innerText = 'No hint available for this step.';
    hintBox.style.display = 'block';
    return;
  }
  let node = dialogues[currentKey];
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
  // Try to get the current mission key from window.currentKey or fallback
  let missionKey = (window.currentKey || '').split('_')[0];
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
  if (hintBtn) hintBtn.onclick = function() {
    // You must provide currentKey and dialogues in your dialogue system
    showHint(window.currentKey, window.dialogues);
  };
}); 