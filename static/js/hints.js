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