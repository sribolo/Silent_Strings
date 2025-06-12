// --- DIALOGUE DATA & SYSTEMS (COMBINED) ---
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
            clue: "Clue: Unusual remote server access from an unknown IP at 2AM.",
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
            clue: "Clue: Security guard discovered an unclaimed USB drive at reception.",
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
            clue: "Clue: Evidence recovered – USB drive potentially related to breach.",
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
            clue: "Clue: Backup generator unexpectedly restarted at 2 AM.",
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
            clue: "Clue: Malicious JavaScript injected into the news ticker.",
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
            clue: "Clue: Phishing email targeting web team; intern clicked suspicious link.",
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
            clue: "Clue: Attackers exploited unpatched server vulnerability.",
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
            clue: "Clue: Malicious code in the news ticker is infecting site visitors.",
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
            clue: "Clue: Sophisticated phishing email disguised as HR, with a fake domain.",
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
            clue: "Clue: Multiple staff received coordinated phishing emails.",
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
            clue: "Clue: Backdoor was added to authentication code via unauthorized commit.",
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
            clue: "Clue: CI/CD pipeline flagged a security warning but was ignored.",
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
      clue: "Clue: Password reuse by developer; possible credential compromise.",
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
            clue: "Clue: Developer used the same password for multiple accounts.",
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
      clue: "Clue: Suspicious scheduled task 'totally_safe.exe' appeared on system.",
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
            clue: "Clue: Unverified request for admin rights via email.",
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
      clue: "Clue: Data missing from DB and potential malware delivered as fake Flash update.",
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
            clue: "Clue: Only two people accessed database during breach window.",
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
      clue: "Clue: SCADA logs show remote access from suspicious IP.",
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
            clue: "Clue: Security alarms were remotely disabled at midnight.",
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
      clue: "Clue: USB stick found in critical infrastructure—possible infection vector.",
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
            clue: "Clue: Unauthorized visitor badge found in secure area.",
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
      clue: "Clue: Suspect claims to follow procedures, but terminal had unauthorized process.",
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
            clue: "Clue: Encrypted note found in insider's locker.",
            choices: [
              { text: "Give me the note for analysis.", action: () => window.markObjectiveComplete(1) }
            ]
          }
        }
      ]
    },
    'Henry Ng - HR Officer': {
      text: "Agent Kim requested time off right after the breach.",
      clue: "Clue: Employee took leave immediately following the incident.",
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
            clue: "Clue: Multiple users accessed restricted files during suspicious timeframe.",
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
      clue: "Clue: PH4NT0M rotates forums for zero-day sales—track .onion links.",
      choices: [
        {
          text: "How do I contact Ghostline?",
          nextDialogue: {
            npc: 'Cipher - Dark Web Informant',
            text: "Look for hidden .onion links in the latest posts.",
            clue: "Clue: Communication hidden in .onion posts on dark web.",
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
            clue: "Clue: Silent Strings is designed for mass infrastructure disruption.",
            choices: [
              { text: "Tell me more about Silent Strings." }
            ]
          }
        }
      ]
    },
    'BitNinja - Fellow Hacker': {
      text: "This chatroom isn't safe. Your agency's network map leaked recently.",
      clue: "Clue: Agency network map has been leaked to threat actors.",
      choices: [
        {
          text: "How do I secure the agency?",
          nextDialogue: {
            npc: 'BitNinja - Fellow Hacker',
            text: "Change all credentials, and use two-factor everywhere.",
            clue: "Clue: Immediate credential rotation and 2FA recommended.",
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
      clue: "Clue: Attacker remotely locked out control center, halted transit.",
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
            clue: "Clue: Possible physical tampering with WiFi router observed.",
            choices: [
              { text: "Inspect WiFi router." }
            ]
          }
        }
      ]
    },
    'Tom Wong - Commuter': {
      text: "My e-ticket app crashed. Also, a stranger was near the station router.",
      clue: "Clue: E-ticket app crash and suspicious individual near station equipment.",
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
      clue: "Clue: GHOSTLINE has breached the most secure perimeter.",
      choices: [
        {
          text: "Confront GHOSTLINE.",
          nextDialogue: {
            npc: 'GHOSTLINE',
            text: "You're persistent, Agent. But can you see the pattern in the chaos?",
            clue: "Clue: GHOSTLINE alludes to a hidden method or backdoor.",
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
            clue: "Clue: Trap laid—GHOSTLINE's next move imminent.",
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
      clue: "Clue: The final decision will determine the fate of the digital world.",
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
            clue: "Clue: GHOSTLINE hints at the rise of a new digital order.",
            choices: [
              { text: "The end... or a new beginning?" }
            ]
          }
        }
      ]
    }
  }
};


// Legacy dialogue system (keeping for backwards compatibility)
const levelDialogues = {
  "level1": {
    "Janitor": [
      { "text": "I just sweep the floors here, Agent." },
      { "text": "But last night I saw a guy leave a USB by the printer.", "clue": "Possible drop device." }
    ],
    "Receptionist": [
      { "text": "Did you want to sign in, or are you with IT?" },
      { "text": "Someone dropped their badge earlier. Security picked it up." }
    ]
  },
  "level2": {
    "News_Reporter": [
      { "text": "We worked late updating the site last night." },
      { "text": "I noticed the home page changed just before sunrise.", "clue": "Timeline clue." }
    ],
    "Night_Intern": [
      { "text": "I got an email from IT about password changes. Was that really you guys?" },
      { "text": "My browser kept popping up weird ads." }
    ]
  },
  "level3": {
    "Bank_Guard": [
      { "text": "No one got in last night except employees." },
      { "text": "But I did hear the teller's computer making strange noises.", "clue": "Compromised workstation." }
    ],
    "Cleaning_Staff": [
      { "text": "I found a printout with 'PH4NT0M' written on it in the trash." }
    ]
  },
  "level4": {
    "QA_Tester": [
      { "text": "There was a lot of pressure to push code live last night." },
      { "text": "I flagged a risky change, but no one listened." }
    ],
    "Night_Manager": [
      { "text": "A build failed at 2AM. We just rebooted and hoped for the best." }
    ]
  },
  "level5": {
    "Front_Desk": [
      { "text": "Three contractors checked in for 'system maintenance' yesterday." },
      { "text": "One left in a hurry and forgot a flash drive." }
    ],
    "Night_Watch": [
      { "text": "Power blinked twice last night—thought it was just a surge." }
    ]
  },
  "level6": {
    "Grid_Junior": [
      { "text": "I ran a diagnostics test, and it kept failing at node 14." }
    ],
    "Security_Desk": [
      { "text": "Cameras went offline right before the grid alarms triggered." }
    ]
  },
  "level7": {
    "Cafeteria_Staff": [
      { "text": "The suspect always sits alone at lunch. Brings the same old sandwich." }
    ],
    "Janitor": [
      { "text": "I saw someone leaving the server room with a folder full of printouts." }
    ]
  },
  "level8": {
    "Parking_Attendant": [
      { "text": "There was a black van in the lot last night. Never seen it before." }
    ],
    "Late_Security": [
      { "text": "Someone jammed our radios for five minutes around midnight." }
    ]
  },
  "level9": {
    "Ticket_Inspector": [
      { "text": "Most commuters were normal, except one who kept taking photos of the console." }
    ],
    "Coffee_Stand": [
      { "text": "I overheard two engineers talking about a virus in the ticketing system." }
    ]
  },
  "level10": {
    "Archivist": [
      { "text": "I'm pulling the logs for HQ. There's a spike in activity at 03:14." }
    ],
    "Reception_Bot": [
      { "text": "Welcome, Agent. HQ security protocols are at maximum alert." }
    ]
  }
};

// Branching intro, tutorial, and mission story
defineBranchingDialogues();

function defineBranchingDialogues() {
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
    "level2_intro": {
      text: "Mission 2: News outlet website has been defaced. All headlines replaced by 'PH4NT0M WAS HERE'.",
      options: ["Audit Website Code", "Interview Web Team"],
      next: ["level2_code", "level2_team"]
    },
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
    },
    "exit": {
      text: "Interview concluded. Returning to investigation menu.",
      options: ["Back to Interviews"],
      next: ["__SHOW_INTERVIEW_MENU__"]
    }
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
function showDialogue(levelKey, npcKey, lineIdx = 0) {
  setBackground(levelKey);
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