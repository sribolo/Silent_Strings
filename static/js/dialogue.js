const dialogues = {
  intro: {
    text: "Welcome, Agent. We've intercepted a breach. Your mission begins now...",
    options: ["Proceed", "Log Out"],
    next: ["mission1", "exit"]
  },
  mission1: {
    text: "PH4NT0M's digital fingerprint was traced to a dark web node. Investigate?",
    options: ["Yes", "No"],
    next: ["trace", "exit"]
  },
  exit: {
    text: "You’ve logged out. Stay safe, Agent.",
    options: []
  }
};

let current = "intro";
const textBox = document.getElementById("dialogue-text");
const optionsBox = document.getElementById("options");

function typeText(text, callback) {
  textBox.innerHTML = "";
  let i = 0;
  const speed = 30;

  function typeChar() {
    if (i < text.length) {
      textBox.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeChar, speed);
    } else {
      if (callback) callback();
    }
  }

  typeChar();
}

function loadDialogue(key) {
  const dlg = dialogues[key];
  optionsBox.innerHTML = "";

  typeText(dlg.text, () => {
    dlg.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => loadDialogue(dlg.next[i]);
      optionsBox.appendChild(btn);
    });
  });
}

loadDialogue(current);
