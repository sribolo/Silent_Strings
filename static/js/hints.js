// Hint/Help/Guide System
function showHint(currentKey, dialogues) {
  let hintBox = document.getElementById('hint-box');
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
  let hintBox = document.getElementById('hint-box');
  hintBox.style.display = 'none';
}

function showHelpModal() {
  let modal = document.getElementById('help-modal');
  let helpText = document.getElementById('help-text');
  // Map mission keys to personalized help messages
  const helpTexts = {
    'level1': 'Mission 1: Start by checking the server logs for unusual activity, then question the night guard for physical evidence like USB drives. Remember to consider both digital and physical clues, and don’t get distracted by irrelevant options.',
    'level2': 'Mission 2: Investigate the website defacement by analyzing suspicious JavaScript and interviewing the web team. Look for phishing attempts and check admin panel access logs for unauthorized changes.',
    'level3': 'Mission 3: Trace the origins of the ransomware by examining suspicious emails and isolating affected machines. Interview staff to find out who received the phishing email and check for multiple infection points.',
    'level4': 'Mission 4: Audit recent code changes in the repository and talk to DevOps about any unapproved commits. Watch for credential reuse and investigate any warnings in the CI/CD pipeline.',
    'level5': 'Mission 5: Scan the government server for malware and interview the sysadmin about suspicious admin requests. Analyze any suspicious files you find and warn the team about phishing attempts.',
    'level6': 'Mission 6: Check SCADA system logs for remote access and interview operators about unusual activity. Examine any USBs found in the control room and be cautious with unknown files.',
    'level7': 'Mission 7: Investigate possible insider threats by reviewing access logs and questioning HR about recent staff behavior. Look for encrypted notes or strange processes on terminals.',
    'level8': 'Mission 8: Monitor dark web forums for chatter about PH4NT0M and contact informants for hidden clues. Trace posts to hidden servers and investigate links in .onion marketplaces.',
    'level9': 'Mission 9: Investigate the transit system hack by checking the control center and interviewing supervisors. Look for rogue devices on the WiFi and trace attack messages to their source.',
    'level10': 'Final Mission: This is the showdown with Ghostline. Review all clues from previous missions, analyze every piece of evidence, and make careful choices to prevent global catastrophe. Trust your instincts and use everything you’ve learned.'
  };
  // Try to get the current mission key from window.currentKey or fallback
  let missionKey = (window.currentKey || '').split('_')[0];
  helpText.textContent = helpTexts[missionKey] || 'Use your investigation tools and follow the clues to solve the mission.';
  modal.style.display = 'block';
}

function hideHelpModal() {
  let modal = document.getElementById('help-modal');
  modal.style.display = 'none';
}

// Add event listeners for help/hint buttons if present
window.addEventListener('DOMContentLoaded', function() {
  let helpBtn = document.getElementById('help-btn');
  if (helpBtn) helpBtn.onclick = showHelpModal;
  let closeBtn = document.getElementById('help-close');
  if (closeBtn) closeBtn.onclick = hideHelpModal;
  let hintBtn = document.getElementById('hint-btn');
  if (hintBtn) hintBtn.onclick = function() {
    // You must provide currentKey and dialogues in your dialogue system
    showHint(window.currentKey, window.dialogues);
  };
}); 