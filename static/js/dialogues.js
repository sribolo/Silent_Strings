const levelDialogues = {
  "level1": {
    "IT_Analyst": [
      { "text": "I noticed weird traffic in the logs at 2AM, but our monitoring alert didn't trigger." },
      { "text": "Did you check the phishing simulation results from last week? Someone failed the test.", "clue": "Phishing incident likely." },
      { "text": "Someone's login session from the night shift looks odd…" }
    ],
    "Security_Guard": [
      { "text": "No one reported anything unusual, but the backup generator restarted suddenly." },
      { "text": "I remember seeing a USB left at the reception desk." }
    ]
  },
  "level2": {
    "Web_Editor": [
      { "text": "Our website was defaced. All headlines now say 'PH4NT0M WAS HERE.'" },
      { "text": "An email from IT said to reset passwords. Was that legit?", "clue": "Possible spear phishing attack." },
      { "text": "The intern installed a new browser extension yesterday." }
    ],
    "IT_Support": [
      { "text": "We patched a vulnerability last week, but someone postponed the server reboot." },
      { "text": "Look for JavaScript injected in the news ticker." }
    ]
  },
  "level3": {
    "Teller": [
      { "text": "I received a PDF from 'HR'—the sender's address was slightly off.", "clue": "Phishing email vector." },
      { "text": "My workstation locked up after I opened it." }
    ],
    "Bank_IT_Admin": [
      { "text": "We found a ransomware note in the shared drive." },
      { "text": "Check email logs—multiple staff received similar attachments.", "clue": "Multiple patient zero possibilities." }
    ],
    "Manager": [
      { "text": "Transactions kept failing; clients are furious." },
      { "text": "Our backups are offline. Did someone tamper with them?" }
    ]
  },
  "level4": {
    "DevOps_Engineer": [
      { "text": "A merge request yesterday changed the authentication code. I didn't approve it." },
      { "text": "Our CI/CD pipeline was showing warnings, but nobody looked.", "clue": "Possible supply chain compromise." }
    ],
    "Junior_Developer": [
      { "text": "I reused my password from a previous project… should I change it?" }
    ]
  },
  "level5": {
    "System_Administrator": [
      { "text": "I noticed a scheduled task that wasn't documented. Suspicious, right?", "clue": "Persistent backdoor." },
      { "text": "Someone requested admin privileges via email, but the request was unsigned." }
    ],
    "Records_Clerk": [
      { "text": "Data was missing from the database this morning." },
      { "text": "A popup kept asking me to update Flash Player…" }
    ]
  },
  "level6": {
    "Grid_Operator": [
      { "text": "The SCADA system showed remote access from an unknown IP.", "clue": "Remote compromise." },
      { "text": "Alarms were disabled, but nobody had access after midnight." }
    ],
    "Maintenance_Worker": [
      { "text": "A USB stick was found plugged into a monitoring station." },
      { "text": "Routine checks flagged firmware changes last night." }
    ]
  },
  "level7": {
    "Suspect_Insider": [
      { "text": "Why am I being questioned? I followed all procedures." },
      { "text": "I found a strange process running on my terminal." },
      { "text": "Someone left an encrypted note in my locker." }
    ],
    "HR_Officer": [
      { "text": "Agent Kim requested time off right after the breach." },
      { "text": "Our team's credentials list was accessed by multiple users." }
    ]
  },
  "level8": {
    "DarkWeb_Informant": [
      { "text": "PH4NT0M auctions zero-days to the highest bidder. You want info? Pay up." },
      { "text": "Ghostline never uses the same forum twice.", "clue": "Trace Ghostline's aliases." },
      { "text": "Check for hidden links in the .onion marketplace." }
    ],
    "Fellow_Hacker": [
      { "text": "Don't trust anyone in this chatroom." },
      { "text": "A recent leak contained your agency's network map…" }
    ]
  },
  "level9": {
    "Transit_Supervisor": [
      { "text": "All trains stopped at once. Control center was locked out." },
      { "text": "The attack message said 'Digital Liberation: PH4NT0M'." }
    ],
    "Commuter": [
      { "text": "My e-ticket app crashed and now I can't board." },
      { "text": "A stranger was fiddling with the WiFi router this morning." }
    ]
  },
  "level10": {
    "SECTOR9_Director": [
      { "text": "Everything we've trained for comes down to this. The world's infrastructure is at risk." },
      { "text": "Ghostline left a final message: 'The strings have been cut. Let the silence begin.'" }
    ],
    "GHOSTLINE": [
      { "text": "You're persistent, Agent. But can you see the pattern in the chaos?" },
      { "text": "To rebuild, first you must break." },
      { "text": "Silent Strings isn't just a program—it's the end of trust." },
      { "text": "What will you choose: preserve a broken system, or let it fall?" }
    ]
  },
  "level1_dialogues": {
    "Security_Guard": [
      {
        "text": "I noticed something strange last night. The server room door was left unlocked.",
        "clue": "Check server room access logs between 10 PM and 2 AM"
      },
      {
        "text": "The night shift admin, Sarah, seemed stressed. She was working late.",
        "clue": "Review Sarah's workstation for suspicious activity"
      }
    ],
    "IT_Admin": [
      {
        "text": "We've been getting unusual login attempts from multiple IPs.",
        "clue": "Analyze failed login attempts in the security logs"
      },
      {
        "text": "The backup system was tampered with. Someone tried to delete our logs.",
        "clue": "Use file recovery tool to restore deleted logs"
      }
    ],
    "Sarah_Night_Admin": [
      {
        "text": "I... I might have clicked on a suspicious email. It looked like it was from HR.",
        "clue": "Check Sarah's email for phishing attempts"
      },
      {
        "text": "After that, my account started acting strange. I couldn't access certain files.",
        "clue": "Investigate Sarah's account permissions and recent changes"
      }
    ]
  }
};

const dialogues = {
  intro: {
    text: "Welcome to SECTOR-9, Agent. We've intercepted a breach in our training servers. Your mission begins now...",
    options: ["Accept Mission", "Request Briefing", "Log Out"],
    next: ["mission1", "briefing", "exit"]
  },
  briefing: {
    text: "PH4NT0M, a radical hacking group, has compromised our systems. Their leader, GHOSTLINE, has left traces of a larger plan called 'Silent Strings'. We need you to investigate.",
    options: ["Begin Investigation", "Ask Questions", "Return"],
    next: ["mission1", "questions", "intro"]
  },
  questions: {
    text: "What would you like to know?",
    options: ["Who is GHOSTLINE?", "What is Silent Strings?", "What tools do I have?", "Return to Mission"],
    next: ["ghostline_info", "silent_strings_info", "tools_info", "mission1"]
  },
  ghostline_info: {
    text: "GHOSTLINE is an enigmatic figure who leads PH4NT0M. They believe the digital world needs to be reset. Their methods are sophisticated and their motives... unclear.",
    options: ["Learn More", "Return to Questions"],
    next: ["ghostline_deep", "questions"]
  },
  silent_strings_info: {
    text: "Silent Strings is a protocol that PH4NT0M is developing. It's designed to disrupt global digital infrastructure. We need to stop it before it's activated.",
    options: ["Learn More", "Return to Questions"],
    next: ["strings_deep", "questions"]
  },
  tools_info: {
    text: "You'll have access to our DFIR toolkit: Scanner, Autopsy Suite, Log Analyzer, and more. Each tool will help you investigate different aspects of the attacks.",
    options: ["View Tools", "Return to Questions"],
    next: ["tools_list", "questions"]
  },
  mission1: {
    text: "Your first mission: Investigate the breach at SECTOR-9 HQ. You have 30 minutes to identify the attack vector and contain the threat.",
    options: ["Begin Mission", "Review Tools", "Return to Briefing"],
    next: ["level1_start", "tools_list", "briefing"]
  },
  level1_start: {
    text: "Mission Timer: 30:00\n\nAnalyze the logs, check for phishing attempts, and identify how PH4NT0M gained access to our systems.",
    options: ["Start Investigation", "Review Mission Objectives"],
    next: ["investigation_start", "objectives"]
  },
  mission_failed: {
    text: "Mission Failed. The threat has spread. You must wait 15 minutes before attempting again.",
    options: ["Return to Mission Board"],
    next: ["mission_board"]
  },
  mission_success: {
    text: "Excellent work, Agent. You've contained the threat and gathered valuable intelligence about PH4NT0M's methods.",
    options: ["Continue to Next Mission", "Review Evidence", "Return to Mission Board"],
    next: ["next_mission", "evidence_review", "mission_board"]
  }
};

// Tool-specific dialogue options
const toolDialogues = {
  scanner: {
    start: "Initiating network scan...",
    progress: "Scanning for vulnerabilities...",
    complete: "Scan complete. Vulnerabilities detected."
  },
  autopsy: {
    start: "Loading forensic analysis suite...",
    progress: "Analyzing disk image...",
    complete: "Analysis complete. Evidence recovered."
  },
  log_analyzer: {
    start: "Parsing system logs...",
    progress: "Identifying suspicious activity...",
    complete: "Log analysis complete. Suspicious events identified."
  }
};

// Dialogue state management
let currentDialogueState = {
  level: null,
  npc: null,
  lineIndex: 0
};

function initializeDialogue(levelKey) {
  currentDialogueState.level = levelKey;
  currentDialogueState.npc = Object.keys(levelDialogues[levelKey])[0];
  currentDialogueState.lineIndex = 0;
  showDialogue();
}

function showDialogue() {
  const dialogueArea = document.getElementById('dialogue-text');
  const optionsBox = document.getElementById('options');
  
  if (!currentDialogueState.level || !currentDialogueState.npc) {
    return;
  }

  const npc = currentDialogueState.npc;
  const lines = levelDialogues[currentDialogueState.level][npc];
  const line = lines[currentDialogueState.lineIndex];

  // Display dialogue
  dialogueArea.innerHTML = `<b>${npc.replace(/_/g, ' ')}:</b> ${line.text}`;
  optionsBox.innerHTML = '';

  // Display clue if available
  if (line.clue) {
    const clueDiv = document.createElement('div');
    clueDiv.textContent = 'Clue: ' + line.clue;
    clueDiv.className = 'clue-text';
    optionsBox.appendChild(clueDiv);
  }

  // Add navigation buttons
  addNavigationButtons(lines.length);
}

function addNavigationButtons(totalLines) {
  const optionsBox = document.getElementById('options');
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
  const optionsBox = document.getElementById('options');
  const button = document.createElement('button');
  button.textContent = text;
  button.className = 'dialogue-btn';
  button.onclick = onClick;
  optionsBox.appendChild(button);
}

let current = "intro";
const textBox = document.getElementById("dialogue-text");
const optionsBox = document.getElementById("options");
const timerDisplay = document.getElementById("timer");

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

function startMissionTimer() {
  let timeLeft = 1800; // 30 minutes in seconds
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


