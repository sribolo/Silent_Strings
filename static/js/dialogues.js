// Legacy dialogue system removed; only modern branching system is supported.

// Mission-specific dialogues with proper NPC names for visual novel system
window.missionDialogues = {
    'level1': {
        'Marcus Chen - IT Analyst': {
            text: "I noticed weird traffic in the logs at 2AM, but our monitoring alert didn't trigger. Something's not right here.",
            choices: [
                {
                    text: "Show me those logs immediately.",
                    action: () => window.markObjectiveComplete(0),
                    nextDialogue: {
                        npc: 'Marcus Chen - IT Analyst',
                        text: "Here's the suspicious activity. Someone accessed our servers remotely during off-hours. I've never seen this pattern before.",
                        choices: [
                            { text: "I'll trace this IP address.", action: () => window.markObjectiveComplete(1) },
                            { text: "Let me check for phishing attempts." }
                        ]
                    }
                },
                {
                    text: "Did anyone else notice unusual activity?",
                    nextDialogue: {
                        npc: 'Marcus Chen - IT Analyst',
                        text: "The security guard mentioned finding a USB drive at reception. Could be connected to this breach.",
                        choices: [
                            { text: "I need to examine that USB immediately.", action: () => window.markObjectiveComplete(2) },
                            { text: "Let's quarantine the affected systems first." }
                        ]
                    }
                }
            ]
        },
        'Sarah Wilson - Security Guard': {
            text: "No one reported anything unusual during my shift, but I did find something strange at the reception desk.",
            choices: [
                {
                    text: "What did you find?",
                    nextDialogue: {
                        npc: 'Sarah Wilson - Security Guard',
                        text: "A USB drive was left behind. No one claimed it. I was about to put it in lost and found, but maybe you should look at it first?",
                        choices: [
                            { text: "Yes, that could be evidence. I'll analyze it.", action: () => window.markObjectiveComplete(3) },
                            { text: "Did you see who might have left it?" }
                        ]
                    }
                },
                {
                    text: "Any unusual visitors today?",
                    nextDialogue: {
                        npc: 'Sarah Wilson - Security Guard',
                        text: "Just the usual staff and a delivery person. Oh, and the backup generator restarted suddenly around 2 AM. Might be related?",
                        choices: [
                            { text: "Check the generator logs.", action: () => console.log("Checking generator") },
                            { text: "Let's focus on the USB for now." }
                        ]
                    }
                }
            ]
        }
    },
    'level2': {
        'Emma Rodriguez - Web Editor': {
            text: "This is a nightmare! Our website was completely defaced. All the headlines now say 'PH4NT0M WAS HERE' instead of our news stories!",
            choices: [
                {
                    text: "When did you first notice the defacement?",
                    action: () => window.markObjectiveComplete(0),
                    nextDialogue: {
                        npc: 'Emma Rodriguez - Web Editor',
                        text: "About an hour ago when I was updating the morning news. The JavaScript in our news ticker has been completely replaced with malicious code!",
                        choices: [
                            { text: "I'll analyze the injected code.", action: () => window.markObjectiveComplete(1) },
                            { text: "Show me the admin panel access logs." }
                        ]
                    }
                },
                {
                    text: "Did anyone on your team receive suspicious emails recently?",
                    nextDialogue: {
                        npc: 'Emma Rodriguez - Web Editor',
                        text: "Actually, yes! We got an email from what looked like IT asking us to reset our passwords. The intern clicked on it yesterday...",
                        choices: [
                            { text: "That was likely a phishing attack.", action: () => window.markObjectiveComplete(2) },
                            { text: "I need to check that intern's workstation immediately." }
                        ]
                    }
                }
            ]
        },
        'David Kim - IT Support': {
            text: "We patched a major vulnerability last week, but someone postponed the server reboot. The patch never took effect.",
            choices: [
                {
                    text: "Who postponed the reboot?",
                    nextDialogue: {
                        npc: 'David Kim - IT Support',
                        text: "Management said it would disrupt operations. Now look what happened. The attackers exploited that exact vulnerability.",
                        choices: [
                            { text: "I need to patch and reboot immediately.", action: () => window.markObjectiveComplete(3) },
                            { text: "Show me the vulnerability details first." }
                        ]
                    }
                },
                {
                    text: "Have you found any other traces of the attack?",
                    nextDialogue: {
                        npc: 'David Kim - IT Support',
                        text: "Check the JavaScript in our news ticker. That's where they embedded their malicious code. It's spreading to visitor browsers.",
                        choices: [
                            { text: "I'll clean the infected code.", action: () => console.log("Cleaning code") },
                            { text: "First, let me trace how they got admin access." }
                        ]
                    }
                }
            ]
        }
    },
    'level3': {
        'Jennifer Park - Bank Teller': {
            text: "I'm so sorry! I received what looked like an urgent email from HR about updating our security protocols. The attachment seemed legitimate...",
            choices: [
                {
                    text: "Show me that email.",
                    action: () => window.markObjectiveComplete(0),
                    nextDialogue: {
                        npc: 'Jennifer Park - Bank Teller',
                        text: "Here it is. The sender address was hr-security@firstbanc.com but now I notice it should be firstbank.com. My workstation locked up right after I opened the PDF.",
                        choices: [
                            { text: "This was a sophisticated phishing attack.", action: () => window.markObjectiveComplete(1) },
                            { text: "I need to isolate your workstation immediately." }
                        ]
                    }
                },
                {
                    text: "Did other staff receive similar emails?",
                    nextDialogue: {
                        npc: 'Jennifer Park - Bank Teller',
                        text: "Yes! At least three other tellers got the same message. We all thought it was legitimate since it looked so official.",
                        choices: [
                            { text: "This is a coordinated attack on multiple targets.", action: () => window.markObjectiveComplete(2) },
                            { text: "We need to check all affected workstations." }
                        ]
                    }
                }
            ]
        }
    },
  'level4': {
    'Chloe Tan - DevOps Engineer': {
      text: "Someone pushed a suspicious commit last night that altered our authentication logic.",
      choices: [
        {
          text: "Show me the commit.",
          nextDialogue: {
            npc: 'Chloe Tan - DevOps Engineer',
            text: "Here: 'Added backdoor for testing'. It wasn't reviewed or approved.",
            choices: [
              { text: "Revert the commit immediately.", action: () => window.markObjectiveComplete(0) },
              { text: "Who pushed this commit?" }
            ]
          }
        },
        {
          text: "Any pipeline warnings?",
          nextDialogue: {
            npc: 'Chloe Tan - DevOps Engineer',
            text: "Our CI pipeline failed security checks, but nobody flagged it.",
            choices: [
              { text: "Audit pipeline logs.", action: () => window.markObjectiveComplete(1) },
              { text: "Check previous builds for tampering." }
            ]
          }
        }
      ]
    },
    'Tom Lin - Junior Developer': {
      text: "I reused my password from an old project. Is that bad?",
      choices: [
        {
          text: "Yes. Change it immediately and check for breaches.",
          action: () => window.markObjectiveComplete(2)
        },
        {
          text: "Did you share credentials with anyone?",
          nextDialogue: {
            npc: 'Tom Lin - Junior Developer',
            text: "No, but I used the same password on my email.",
            choices: [
              { text: "Change all your passwords now." }
            ]
          }
        }
      ]
    }
  },
  'level5': {
    'Maria Gomez - System Administrator': {
      text: "A scheduled task called 'totally_safe.exe' appeared overnight. I didn't create it.",
      choices: [
        {
          text: "Remove it and check persistence.",
          action: () => window.markObjectiveComplete(0)
        },
        {
          text: "Has anyone requested admin privileges recently?",
          nextDialogue: {
            npc: 'Maria Gomez - System Administrator',
            text: "There was an email request for admin rights. It wasn't signed.",
            choices: [
              { text: "Save that email as evidence.", action: () => window.markObjectiveComplete(1) },
              { text: "Warn the whole team immediately." }
            ]
          }
        }
      ]
    },
    'Larry Chua - Records Clerk': {
      text: "I noticed some data missing from the database and a weird Flash update popup.",
      choices: [
        {
          text: "Scan your system for malware.",
          action: () => window.markObjectiveComplete(2)
        },
        {
          text: "Who else accessed the DB last night?",
          nextDialogue: {
            npc: 'Larry Chua - Records Clerk',
            text: "Only the sysadmin and me, as far as I know.",
            choices: [
              { text: "Check access logs." }
            ]
          }
        }
      ]
    }
  },
  'level6': {
    'Rachel Yeo - Grid Operator': {
      text: "Our SCADA system logged remote access from an unknown IP last night.",
      choices: [
        {
          text: "Trace the IP.",
          action: () => window.markObjectiveComplete(0)
        },
        {
          text: "Were any alarms triggered?",
          nextDialogue: {
            npc: 'Rachel Yeo - Grid Operator',
            text: "Alarms were disabled remotely around midnight.",
            choices: [
              { text: "Re-enable all security alarms." },
              { text: "Check who had access at that time." }
            ]
          }
        }
      ]
    },
    'Hugo Wang - Maintenance Worker': {
      text: "I found a USB stick plugged into a monitoring station this morning.",
      choices: [
        {
          text: "Quarantine the USB and analyze its contents.",
          action: () => window.markObjectiveComplete(1)
        },
        {
          text: "Who had access to that room overnight?",
          nextDialogue: {
            npc: 'Hugo Wang - Maintenance Worker',
            text: "Just authorized personnel, but I saw a visitor badge left on the desk.",
            choices: [
              { text: "Review visitor logs." }
            ]
          }
        }
      ]
    }
  },
  'level7': {
    'Anita Lee - Suspect Insider': {
      text: "Why am I being questioned? I followed all procedures.",
      choices: [
        {
          text: "Your terminal had an unauthorized process running.",
          action: () => window.markObjectiveComplete(0)
        },
        {
          text: "Did you notice anything odd recently?",
          nextDialogue: {
            npc: 'Anita Lee - Suspect Insider',
            text: "I found an encrypted note in my locker.",
            choices: [
              { text: "Give me the note for analysis.", action: () => window.markObjectiveComplete(1) }
            ]
          }
        }
      ]
    },
    'Henry Ng - HR Officer': {
      text: "Agent Kim requested time off right after the breach.",
      choices: [
        {
          text: "Investigate Kim's activity.",
          action: () => window.markObjectiveComplete(2)
        },
        {
          text: "Who else has been acting suspicious?",
          nextDialogue: {
            npc: 'Henry Ng - HR Officer',
            text: "A few team members accessed restricted files late at night.",
            choices: [
              { text: "Review file access logs." }
            ]
          }
        }
      ]
    }
  },
  'level8': {
    'Cipher - Dark Web Informant': {
      text: "PH4NT0M is auctioning zero-days. Ghostline never uses the same forum twice.",
      choices: [
        {
          text: "How do I contact Ghostline?",
          nextDialogue: {
            npc: 'Cipher - Dark Web Informant',
            text: "Look for hidden .onion links in the latest posts.",
            choices: [
              { text: "Search forums.", action: () => window.markObjectiveComplete(0) }
            ]
          }
        },
        {
          text: "What is Silent Strings?",
          nextDialogue: {
            npc: 'Cipher - Dark Web Informant',
            text: "It's not just malware—it's a protocol to disrupt infrastructure at scale.",
            choices: [
              { text: "Tell me more about Silent Strings." }
            ]
          }
        }
      ]
    },
    'BitNinja - Fellow Hacker': {
      text: "This chatroom isn't safe. Your agency's network map leaked recently.",
      choices: [
        {
          text: "How do I secure the agency?",
          nextDialogue: {
            npc: 'BitNinja - Fellow Hacker',
            text: "Change all credentials, and use two-factor everywhere.",
            choices: [
              { text: "Start credential rotation.", action: () => window.markObjectiveComplete(1) }
            ]
          }
        }
      ]
    }
  },
  'level9': {
    'Lina Sun - Transit Supervisor': {
      text: "All trains stopped at once. The control center was locked out by the attacker.",
      choices: [
        {
          text: "Check the control system.",
          action: () => window.markObjectiveComplete(0)
        },
        {
          text: "Interview commuters for suspicious activity.",
          nextDialogue: {
            npc: 'Lina Sun - Transit Supervisor',
            text: "Someone said they saw a person tampering with the WiFi router.",
            choices: [
              { text: "Inspect WiFi router." }
            ]
          }
        }
      ]
    },
    'Tom Wong - Commuter': {
      text: "My e-ticket app crashed. Also, a stranger was near the station router.",
      choices: [
        {
          text: "Scan for rogue devices.",
          action: () => window.markObjectiveComplete(1)
        }
      ]
    }
  },
  'level10': {
    'SECTOR9 Director': {
      text: "GHOSTLINE is inside our network. This is your final mission, Agent.",
      choices: [
        {
          text: "Confront GHOSTLINE.",
          nextDialogue: {
            npc: 'GHOSTLINE',
            text: "You're persistent, Agent. But can you see the pattern in the chaos?",
            choices: [
              { text: "Challenge GHOSTLINE.", action: () => window.markObjectiveComplete(0) },
              { text: "Offer an alliance instead." }
            ]
          }
        },
        {
          text: "Set a digital trap.",
          nextDialogue: {
            npc: 'SECTOR9 Director',
            text: "Trap set. GHOSTLINE is trying to break free!",
            choices: [
              { text: "Spring the trap.", action: () => window.markObjectiveComplete(1) },
              { text: "Wait for GHOSTLINE's next move." }
            ]
          }
        }
      ]
    },
    'GHOSTLINE': {
      text: "Silent Strings isn't just a program—it's the end of trust. What will you choose: preserve a broken system, or let it fall?",
      choices: [
        {
          text: "Silent Strings ends now.",
          action: () => window.markObjectiveComplete(2)
        },
        {
          text: "Let it fall.",
          nextDialogue: {
            npc: 'GHOSTLINE',
            text: "You have chosen chaos. Remember, Agent, every system can be rebuilt.",
            choices: [
              { text: "The end... or a new beginning?" }
            ]
          }
        }
      ]
    }
    }
};

// Branching intro, tutorial, and mission story
window.dialogues = {
  "intro": {
    text: "Welcome to SECTOR-9, Agent. Anomalous activity has been detected across critical systems. Do you accept the mission?",
    options: ["Accept Mission", "Request Briefing", "Log Out"],
    next: ["briefing", "briefing", "exit"],
    hint: "The fate of digital society is in your hands."
  },
  "briefing": {
    text: "Our adversary is PH4NT0M, a rogue collective with global reach. They're orchestrating an operation called 'Silent Strings.' Your job is to investigate, contain, and trace them back to their source.",
    options: ["Begin Investigation", "Ask About PH4NT0M", "Ask About Silent Strings", "Back to Main Menu"],
    next: ["level1_intro", "about_ph4nt0m", "about_silentstrings", "intro"],
    hint: "Gather intel before you deploy."
  },
  "about_ph4nt0m": {
    text: "PH4NT0M specializes in zero-day attacks, phishing, and supply chain exploits. Their leader, GHOSTLINE, is a master at evasion and digital misdirection.",
    options: ["Back to Briefing"],
    next: ["briefing"]
  },
  "about_silentstrings": {
    text: "Silent Strings is a complex malware campaign designed to disrupt infrastructure and undermine trust in critical systems. Stopping it is our top priority.",
    options: ["Back to Briefing"],
    next: ["briefing"]
  },
  "level1_intro": {
    text: "Mission 1: SECTOR-9 HQ has been breached. Initial logs point to a possible phishing attack and a suspicious USB device left at the entrance.",
    options: ["Investigate Logs", "Interview Security", "Check Physical Evidence"],
    next: ["level1_logs", "level1_security", "level1_usb"],
    hint: "Follow the trail to contain the breach."
  },
  "level1_logs": {
    text: "You find a pattern of remote logins at 2AM from an unrecognized IP.",
    options: ["Trace IP", "Check Email Alerts"],
    next: ["level1_traceip", "level1_email"]
  },
  "level1_security": {
    text: "Security reports a USB drive left at the reception and a delivery guy acting odd.",
    options: ["Examine USB", "Interview Delivery Guy"],
    next: ["level1_usb", "level1_delivery"]
  },
  "level1_usb": {
    text: "The USB contains a file named 'notavirus.exe'.",
    options: ["Run File", "Quarantine Device"],
    next: ["level1_runfile", "level1_quarantine"]
  },
  "level1_traceip": {
    text: "The IP traces back to a VPN exit node. The trail goes cold.",
    options: ["Report to HQ", "Investigate Further"],
    next: ["level1_report", "level1_logs"]
  },
  "level1_email": {
    text: "A phishing email about 'Free Crypto' was sent to all staff.",
    options: ["Warn Staff", "Delete Email"],
    next: ["level1_warnstaff", "level1_deleteemail"]
  },
  "level1_warnstaff": {
    text: "You warn the staff and stop the spread. HQ commends your quick response.",
    options: ["Continue"],
    next: ["level2_intro"]
  },
  "level1_quarantine": {
    text: "You quarantine the USB. Forensics finds malware designed to steal credentials.",
    options: ["Continue"],
    next: ["level2_intro"]
  },
  // ...add similar for each level...
  "level2_intro": {
    text: "Mission 2: News outlet website has been defaced. All headlines replaced by 'PH4NT0M WAS HERE'.",
    options: ["Audit Website Code", "Interview Web Team"],
    next: ["level2_code", "level2_team"]
  },
  // ...repeat structure for all levels...
  "level10_intro": {
    text: "Final Mission: GHOSTLINE has infiltrated SECTOR-9 HQ. Confront them in cyberspace.",
    options: ["Enter Cyberspace", "Set Digital Trap"],
    next: ["level10_confront", "level10_trap"]
  },
  "level10_confront": {
    text: "You face GHOSTLINE. They offer you a choice: preserve the old system, or join their vision for a new world.",
    options: ["Defend the System", "Join GHOSTLINE"],
    next: ["ending_good", "ending_rogue"]
  },
  "level10_trap": {
    text: "You set a digital snare. GHOSTLINE nearly escapes but you have one shot to finish it.",
    options: ["Spring the Trap", "Wait"],
    next: ["ending_good", "ending_fail"]
  },
  "ending_good": {
    text: "You defeated GHOSTLINE and secured global digital trust. The world owes you a debt.",
    options: ["Play Again"],
    next: ["intro"]
  },
  "ending_rogue": {
    text: "You sided with GHOSTLINE. Together, you reshape digital society—at a heavy cost.",
    options: ["Play Again"],
    next: ["intro"]
  },
  "ending_fail": {
    text: "GHOSTLINE escapes. The world faces a digital dark age... for now.",
    options: ["Play Again"],
    next: ["intro"]
  }
};

// Dialogue state management
let currentDialogueState = {
  level: null,
  npc: null,
  lineIndex: 0
};

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
  // Characters (flat)
  if (npcSpriteData.characters && npcSpriteData.characters.length > 0) {
    const randChar = npcSpriteData.characters[Math.floor(Math.random() * npcSpriteData.characters.length)];
    avatar.characters = { name: randChar.name, img: randChar.img };
  }
  // Other categories (with subcats)
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
  // Always render character first if present
  if (avatar.characters && avatar.characters.img) {
    const img = document.createElement('img');
    img.src = avatar.characters.img;
    img.className = 'avatar-layer';
    container.appendChild(img);
  }
  // Render other layers (skip characters)
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

function initializeDialogue(levelKey) {
  currentDialogueState.level = levelKey;
  currentDialogueState.npc = Object.keys(levelDialogues[levelKey])[0];
  currentDialogueState.lineIndex = 0;
  showDialogue();
}

function showDialogue() {
  const dialogueArea = document.getElementById('dialogue-text');
  const optionsBox = document.getElementById('dialogue-choices');
  const npcHeader = document.getElementById('dialogue-npc');
  const portraitImg = document.getElementById('dialogue-portrait');

  if (!currentDialogueState.level || !currentDialogueState.npc || !dialogueArea || !optionsBox) {
    return;
  }

  const npc = currentDialogueState.npc;
  const lines = levelDialogues[currentDialogueState.level][npc];
  const line = lines[currentDialogueState.lineIndex];

  // Set NPC name in header
  if (npcHeader) {
    npcHeader.textContent = npc.replace(/_/g, ' ');
  }

  // --- Randomized NPC Avatar ---
  fetchNpcSpriteData(spriteData => {
    if (!npcAvatars[npc]) {
      npcAvatars[npc] = randomizeNpcAvatar();
    }
    // Render composite avatar in the portrait area
    if (portraitImg) {
      portraitImg.style.display = 'none';
      let avatarDiv = document.getElementById('npc-avatar-composite');
      if (!avatarDiv) {
        avatarDiv = document.createElement('div');
        avatarDiv.id = 'npc-avatar-composite';
        avatarDiv.style.position = 'relative';
        avatarDiv.style.width = '72px';
        avatarDiv.style.height = '72px';
        avatarDiv.style.marginRight = '18px';
        avatarDiv.style.display = 'inline-block';
        portraitImg.parentNode.insertBefore(avatarDiv, portraitImg);
      }
      renderNpcAvatar(npcAvatars[npc], avatarDiv);
      avatarDiv.style.display = 'block';
    }
  });

  // Use typewriter effect for dialogue
  typeText(line.text, () => {
    // Display clue if available
    optionsBox.innerHTML = '';
    if (line.clue) {
      const clueDiv = document.createElement('div');
      clueDiv.textContent = 'Clue: ' + line.clue;
      clueDiv.className = 'clue-text';
      optionsBox.appendChild(clueDiv);
    }
    addNavigationButtons(lines.length);
  });
}

function addNavigationButtons(totalLines) {
  const optionsBox = document.getElementById('dialogue-choices');
  const npcs = Object.keys(levelDialogues[currentDialogueState.level]);
  const currentNpcIndex = npcs.indexOf(currentDialogueState.npc);

  // Next/Previous buttons for current NPC
  if (currentDialogueState.lineIndex < totalLines - 1) {
    addButton('Next', () => {
      currentDialogueState.lineIndex++;
      showDialogue();
    });
  }

  if (currentDialogueState.lineIndex > 0) {
    addButton('Previous', () => {
      currentDialogueState.lineIndex--;
      showDialogue();
    });
  }

  // Next/Previous NPC buttons
  if (currentNpcIndex < npcs.length - 1) {
    addButton('Next NPC', () => {
      currentDialogueState.npc = npcs[currentNpcIndex + 1];
      currentDialogueState.lineIndex = 0;
      showDialogue();
    });
  }

  if (currentNpcIndex > 0) {
    addButton('Previous NPC', () => {
      currentDialogueState.npc = npcs[currentNpcIndex - 1];
      currentDialogueState.lineIndex = 0;
      showDialogue();
    });
  }
}

function addButton(text, onClick) {
  const optionsBox = document.getElementById('dialogue-choices');
  const button = document.createElement('button');
  button.textContent = text;
  button.className = 'dialogue-btn';
  button.onclick = onClick;
  optionsBox.appendChild(button);
}

let current = "intro";
const textBox = document.getElementById("dialogue-text");
const optionsBox = document.getElementById("dialogue-choices");
const timerDisplay = document.getElementById("timer");

function typeText(text, callback) {
  const textBox = document.getElementById('dialogue-text');
  textBox.innerHTML = '';
  let i = 0;
  const speed = 30;
  function typeChar() {
    if (i < text.length) {
      textBox.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
      i++;
      setTimeout(typeChar, speed);
    } else {
      if (callback) callback();
    }
  }
  typeChar();
}

function loadDialogue(key) {
  window.currentKey = key;
  window.dialogues = dialogues;
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

function startMissionTimer() {
  let timeLeft = 300; // 5 minutes in seconds
  const timer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      loadDialogue("mission_failed");
    }
    timeLeft--;
  }, 1000);
}

loadDialogue(current);

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
function showDialogue(npcName, dialogueText, choices = []) {
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
          showDialogue(choice.nextDialogue.npc, choice.nextDialogue.text, choice.nextDialogue.choices);
        } else if (!choice.action) {
          // fallback: just hide dialogue or show a message
          safeSetText(dialogueTextEl, "End of dialogue.");
        }
      });
      if (choicesContainer) choicesContainer.appendChild(btn);
    });
  } else {
    if (continueEl) continueEl.style.display = '';
  }
}


