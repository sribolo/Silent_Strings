// --- DIALOGUE DATA & SYSTEMS (COMBINED) ---
// Mission-specific dialogues with proper NPC names for visual novel system
window.missionDialogues = {
  // LEVEL 1 – HQ Breach
  level1: {
    "Marcus Chen – IT Analyst": {
      text: "You're the new response lead? Glad someone fresh is on this. I've been glued to this chair since 1AM. I keep seeing log entries that just don't add up. Maybe you'll spot something I missed.",
      choices: [
        {
          text: "Show me what's freaking you out, Marcus.",
          nextDialogue: {
            npc: "Marcus Chen – IT Analyst",
            text: "Look at this admin login—2:03AM. Problem is, I know for a fact nobody's scheduled at that time. And right after, chunks of the log just… disappear. Whoever did this, they covered their tracks.",
            clue: "Suspicious login timestamp",
            choices: [
              {
                text: "Let me try to recover those deleted logs.",
                action: () => window.markObjectiveComplete(3),
                nextDialogue: {
                  npc: "Marcus Chen – IT Analyst",
                  text: "Please do. If anyone can bring them back, it's you. I'll owe you lunch.",
                  choices: [
                    { text: "Back to Interview Menu", action: () => showInterviewMenu() }
                  ]
                }
              },
              {
                text: "Did they change the admin password?",
                nextDialogue: {
                  npc: "Marcus Chen – IT Analyst",
                  text: "Yeah, password was reset from a different device right before. Someone's got admin access, and it isn't us.",
                  clue: "Compromised admin account",
                  action: () => window.markObjectiveComplete(4),
                  choices: [
                    { text: "Back to Interview Menu", action: () => showInterviewMenu() }
                  ]
                }
              },
              {
                text: "Where did they get in?",
                nextDialogue: {
                  npc: "Marcus Chen – IT Analyst",
                  text: "Best guess? Breach started at the network hub—first odd access came from there, then admin got compromised. It's like they knew exactly where to poke holes.",
                  clue: "Initial breach at network hub",
                  action: () => window.markObjectiveComplete(0),
                  choices: [
                    { text: "Back to Interview Menu", action: () => showInterviewMenu() }
                  ]
                }
              }
            ]
          }
        },
        {
          text: "When did this all start?",
          nextDialogue: {
            npc: "Marcus Chen – IT Analyst",
            text: "I got a weird alert at 2:01AM—backup generator kicked in. Whole place flickered. I checked, and bam, weird logins everywhere. I don't believe in coincidences.",
            choices: [
              { text: "Could be a physical breach. I'll check with Security.", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Anyone bring you coffee yet?",
          nextDialogue: {
            npc: "Marcus Chen – IT Analyst",
            text: "Ha! Not since midnight. You solve this, I'll owe you a venti. Or two.",
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    },
    "Sarah Wilson – Security Guard": {
      text: "You're the new tech detective? Welcome. Last night was boring, except the generator hiccup and some janitor leaving their mop unlocked. Oh—and I found a weird USB in the lift.",
      choices: [
        {
          text: "See anyone unusual hanging around?",
          nextDialogue: {
            npc: "Sarah Wilson – Security Guard",
            text: "Nothing weird, just the usual staff and that one intern who always forgets his badge. But the generator rebooted at 2AM, right as the logins started going wild. Just saying.",
            clue: "Generator rebooted during breach",
            action: () => window.markObjectiveComplete(0),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Mind if I check the generator logs?",
          nextDialogue: {
            npc: "Sarah Wilson – Security Guard",
            text: "Knock yourself out. If you figure out why that thing restarts every other week, let me know. My flashlight budget can't take much more.",
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Can I get that USB to the lab?",
          nextDialogue: {
            npc: "Sarah Wilson – Security Guard",
            text: "IT's got it now. They said it had some password-stealing thing on it. I wash my hands—literally and figuratively.",
            clue: "Credential theft malware on USB",
            action: () => {
              window.markObjectiveComplete(2);
              if (typeof unlockAchievement === 'function') unlockAchievement('usb_safety');
            },
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },
  "Janitor Carlos": {
    text: "Don't mind me, Agent. Just cleaning up another spilled coffee. Lotta action last night, huh?",
    choices: [
      {
        text: "You see anyone after midnight?",
        nextDialogue: {
          npc: "Janitor Carlos",
          text: "I saw someone in a hoodie near the server room, but my shift ended at 12:30. Maybe they just forgot their badge.",
          clue: "Late-night hoodie sighting",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      },
      {
        text: "You ever fix the weird flickering lights?",
        nextDialogue: {
          npc: "Janitor Carlos",
          text: "Nah, that's above my pay grade. But the backup generator does make the whole place hum. Spooky at night.",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      }
    ]
  },
  "Receptionist Mia": {
    text: "Oh, hello! It's chaos this morning. I just hope the coffee machine survives.",
    choices: [
      {
        text: "Anyone unusual sign in last night?",
        nextDialogue: {
          npc: "Receptionist Mia",
          text: "Not that I noticed, but security was extra grumpy when the generator hiccuped.",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      },
      {
        text: "Do you get many lost USBs?",
        nextDialogue: {
          npc: "Receptionist Mia",
          text: "Every week! Usually it's just presentations or—one time—a love letter.",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      }
    ]
  },

  // LEVEL 2 – Website Defacement
  level2: {
    "Emma Rodriguez – Web Editor": {
      text: "I've been here since 6AM. Every headline changed to 'PH4NT0M WAS HERE'. Our devs swear it's not them. I just… I want my old job back.",
      choices: [
        {
          text: "Show me what was changed in the code.",
          nextDialogue: {
            npc: "Emma Rodriguez – Web Editor",
            text: "Here's the ticker script—someone injected a nasty payload. Look, I'm no coder, but that's not our usual stuff.",
            clue: "XSS payload in ticker",
            action: () => window.markObjectiveComplete(1),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Did your team get any weird emails lately?",
          nextDialogue: {
            npc: "Emma Rodriguez – Web Editor",
            text: "Yes! IT sent a password reset email, or so we thought. The intern clicked it. His browser's now full of popups.",
            clue: "Phishing email incident",
            action: () => window.markObjectiveComplete(2),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Anyone on your team clicking random links again?",
          nextDialogue: {
            npc: "Emma Rodriguez – Web Editor",
            text: "You'd think after the last training, right? But yeah… some people never learn.",
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    },
    "David Kim – IT Support": {
      text: "If it's not a plugin vulnerability, it's a lost password. Management postponed a critical patch last night, so guess what—someone waltzed in and defaced the site.",
      choices: [
        {
          text: "Can you patch the exploited plugin now?",
          nextDialogue: {
            npc: "David Kim – IT Support",
            text: "Already on it. Tell management if they want uptime, they need security first. Patch deployed, fingers crossed.",
            clue: "Plugin patched",
            action: () => window.markObjectiveComplete(3),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Got admin panel logs?",
          nextDialogue: {
            npc: "David Kim – IT Support",
            text: "Yeah, you'll see the breach started from an IP in Russia. Or maybe just a VPN exit node—who knows.",
            clue: "Admin panel access logs",
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "How bad's the extension infection?",
          nextDialogue: {
            npc: "David Kim – IT Support",
            text: "Pretty bad—interns and extensions don't mix.",
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },
  "Intern Billy": {
    text: "Hi! Sorry, still kind of new here. I thought that password reset email was real…",
    choices: [
      {
        text: "What happened when you clicked it?",
        nextDialogue: {
          npc: "Intern Billy",
          text: "My browser went nuts and IT yelled at me. I'll be more careful… probably.",
          clue: "Intern fell for phishing",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      },
      {
        text: "Did you notice any strange files?",
        nextDialogue: {
          npc: "Intern Billy",
          text: "A weird extension installed itself, then cat videos started autoplaying. Not the worst hack, I guess?",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      }
    ]
  },


  // LEVEL 3 – Ransomware at the Bank
  level3: {
    "Jennifer Park – Bank Teller": {
      text: "I'm so sorry! I got this email from 'HR' about urgent policy changes. Looked real. I opened the PDF and everything froze. The ransom note popped up.",
      choices: [
        {
          text: "Can I see the email and attachment?",
          nextDialogue: {
            npc: "Jennifer Park – Bank Teller",
            text: "Here—I forwarded it to IT. The sender's address looks… off. Like, one letter missing.",
            clue: "Phishing email sample",
            action: () => window.markObjectiveComplete(1),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Did anyone else get that email?",
          nextDialogue: {
            npc: "Jennifer Park – Bank Teller",
            text: "Three other tellers said the same thing. I told them not to open it. Not sure they listened.",
            clue: "Multiple patient zeros",
            action: () => window.markObjectiveComplete(0),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Do you remember the sender's address?",
          nextDialogue: {
            npc: "Jennifer Park – Bank Teller",
            text: "It was hr-securty@bank.com—see? Security spelled wrong. Ugh.",
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    },
    "Rajesh Singh – Bank IT": {
      text: "Every time someone opens a shady attachment, it's a new adventure. The ransomware hit us at 2:11AM, spread fast, and left a sample on the shared drive.",
      choices: [
        {
          text: "Got the malware sample?",
          nextDialogue: {
            npc: "Rajesh Singh – Bank IT",
            text: "Here. Be careful opening it—even the icon gives me chills.",
            clue: "Ransomware sample",
            action: () => window.markObjectiveComplete(2),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Can we restore from backup?",
          nextDialogue: {
            npc: "Rajesh Singh – Bank IT",
            text: "Luckily, backup from 1AM is clean. Restoring now. Buy me a coffee if it works, okay?",
            clue: "Bank restored from backup",
            action: () => window.markObjectiveComplete(4),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "How did it spread through the network?",
          nextDialogue: {
            npc: "Rajesh Singh – Bank IT",
            text: "Lateral movement after initial compromise—classic ransomware playbook. I'm mapping the spread now.",
            clue: "Network spread",
            action: () => window.markObjectiveComplete(3),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },
  "Bank Guard": {
    text: "Mornin', Agent. Lotta staff came in early. The ATM kept beeping but I just thought it was bored.",
    choices: [
      {
        text: "You see anyone look nervous?",
        nextDialogue: {
          npc: "Bank Guard",
          text: "Jennifer was pale as a ghost after reading an email. Could just be Monday, though.",
          clue: "Nervous teller clue",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      },
      {
        text: "You ever get phishing emails?",
        nextDialogue: {
          npc: "Bank Guard",
          text: "All the time! I almost clicked one about 'FREE Donuts.' If you see any, forward to me.",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      }
    ]
  },

  // LEVEL 4 – Repo Compromised
  level4: {
    "Chloe Tan – DevOps Engineer": {
      text: "We found a commit last night that skipped our review. Code injected straight into the login process. I'm mad, and management just wants it gone.",
      choices: [
        {
          text: "Let me audit recent commits.",
          nextDialogue: {
            npc: "Chloe Tan – DevOps Engineer",
            text: "See this one? 'Backdoor for testing'—my ass. Reverted it, but double-check me.",
            clue: "Malicious commit reverted",
            action: () => window.markObjectiveComplete(3),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Any pipeline warnings?",
          nextDialogue: {
            npc: "Chloe Tan – DevOps Engineer",
            text: "Yes—CI said one dev's token was reused. Security basics, people.",
            clue: "Pipeline warning logs",
            action: () => window.markObjectiveComplete(1),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Who pushed the bad commit?",
          nextDialogue: {
            npc: "Chloe Tan – DevOps Engineer",
            text: "Tom Lin's account was used. He swears it wasn't him.",
            clue: "Compromised developer account",
            action: () => window.markObjectiveComplete(2),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    },
    "Tom Lin – Junior Developer": {
      text: "I reused my repo password, okay? Dumb, I know. I think someone got my token.",
      choices: [
        {
          text: "Reset all your credentials, now.",
          nextDialogue: {
            npc: "Tom Lin – Junior Developer",
            text: "Already done. I'm changing everything, I swear.",
            clue: "Credential reset",
            action: () => window.markObjectiveComplete(2),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Ever share your token with anyone?",
          nextDialogue: {
            npc: "Tom Lin – Junior Developer",
            text: "No way. But maybe I clicked something I shouldn't have.",
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },
  "Senior Dev Priya": {
    text: "I keep telling management to require two-factor. Nobody listens till something breaks.",
    choices: [
      {
        text: "You ever review Tom's code?",
        nextDialogue: {
          npc: "Senior Dev Priya",
          text: "He's sharp, just a little forgetful with security. Reminds me of myself at his age.",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      },
      {
        text: "How's the team feeling?",
        nextDialogue: {
          npc: "Senior Dev Priya",
          text: "Stressed but hungry. If you buy us lunch, we'll secure the repo twice as fast.",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      }
    ]
  },

  // LEVEL 5 – Government System Backdoor
  level5: {
    "Maria Gomez – Sysadmin": {
      text: "I spotted a task called 'totally_safe.exe'—that's never a good sign. It was set to run every hour, hidden deep in Task Scheduler.",
      choices: [
        {
          text: "Let me analyze the backdoor.",
          nextDialogue: {
            npc: "Maria Gomez – Sysadmin",
            text: "It connects to a random IP every hour. I quarantined it and dumped the binary.",
            clue: "Backdoor binary",
            action: () => window.markObjectiveComplete(0),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Anyone else with admin privileges?",
          nextDialogue: {
            npc: "Maria Gomez – Sysadmin",
            text: "Only me and the app team lead, but their accounts are clean.",
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Can you recover deleted database records?",
          nextDialogue: {
            npc: "Maria Gomez – Sysadmin",
            text: "I rolled back to last night's restore point. A few records missing, but I think we're okay.",
            clue: "Database restore point",
            action: () => window.markObjectiveComplete(1),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },
  "Front Desk": {
    text: "Morning. A couple of guys from 'maintenance' came by late last night. Looked legit, but you never know.",
    choices: [
      {
        text: "Were they on the schedule?",
        nextDialogue: {
          npc: "Front Desk",
          text: "Supposedly, but the system was acting up so I couldn't check.",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      }
    ]
  },

  // LEVEL 6 – Power Grid Breach
  level6: {
    "Rachel Yeo – Grid Operator": {
      text: "The control room scanner found a rogue USB plugged into the SCADA system. We barely caught it. Firmware's different this morning—like something got flashed overnight.",
      choices: [
        {
          text: "Can I get the USB for analysis?",
          nextDialogue: {
            npc: "Rachel Yeo – Grid Operator",
            text: "Right here. It's got a weird executable—no label. I'm not plugging it in!",
            clue: "Rogue USB device",
            action: () => window.markObjectiveComplete(0),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Let me see firmware diffs.",
          nextDialogue: {
            npc: "Rachel Yeo – Grid Operator",
            text: "Here's a before/after. There's code in there I don't recognize.",
            clue: "Firmware diff",
            action: () => window.markObjectiveComplete(1),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Any suspicious remote connections in the logs?",
          nextDialogue: {
            npc: "Rachel Yeo – Grid Operator",
            text: "Yeah—here's a log of a remote admin connection at 3AM. Definitely not ours.",
            clue: "Remote access log",
            action: () => window.markObjectiveComplete(2),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },
  "Security Desk": {
    text: "Nothing to report except a weird spike on the logs at 3AM. And, someone brought donuts.",
    choices: [
      {
        text: "Any left?",
        nextDialogue: {
          npc: "Security Desk",
          text: "Sorry, hackers eat first.",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      }
    ]
  },

  // LEVEL 7 – Insider Threat
  level7: {
    "Anita Lee – Suspect Insider": {
      text: "You're blaming me? I follow protocol. If someone used my credentials, it wasn't me!",
      choices: [
        {
          text: "Let's check the access logs together.",
          nextDialogue: {
            npc: "Anita Lee – Suspect Insider",
            text: "Fine, look. Last login from my terminal was at 2:30AM. But I was at home.",
            clue: "Credential access logs",
            action: () => window.markObjectiveComplete(0),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Anything weird in your locker lately?",
          nextDialogue: {
            npc: "Anita Lee – Suspect Insider",
            text: "Actually… there was an encrypted note left in there this morning. Weird, right?",
            clue: "Encrypted locker note",
            action: () => window.markObjectiveComplete(1),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Notice strange processes on your terminal?",
          nextDialogue: {
            npc: "Anita Lee – Suspect Insider",
            text: "I saw a weird hash running, couldn't kill it. Sent it to IT.",
            clue: "Process hash",
            action: () => window.markObjectiveComplete(2),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    },
    "Henry Ng – HR Officer": {
      text: "Kim and Lee both asked for sudden leave after the breach. Suspicious much?",
      choices: [
        {
          text: "Did you overhear anything else?",
          nextDialogue: {
            npc: "Henry Ng – HR Officer",
            text: "Kim mentioned a 'clean exit' on the phone. I'd dig deeper.",
            clue: "Suspicious leave request",
            action: () => window.markObjectiveComplete(3),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },
  "Cafeteria Staff": {
    text: "You here about the breach? All I know is, someone ordered ten espressos and paid in cash.",
    choices: [
      {
        text: "Did you see who?",
        nextDialogue: {
          npc: "Cafeteria Staff",
          text: "Couldn't tell—hood up, sunglasses indoors. Bold move.",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      }
    ]
  },

  // LEVEL 8 – Dark Web Tracking
  level8: {
    "Cipher – Dark Web Informant": {
      text: "PH4NT0M's moving zero-day auctions to new forums every week. I can point you to their latest encrypted post… for a favor.",
      choices: [
        {
          text: "Show me the forum post.",
          nextDialogue: {
            npc: "Cipher – Dark Web Informant",
            text: "Here. Encrypted, but fits their linguistic pattern.",
            clue: "Encrypted forum post",
            action: () => window.markObjectiveComplete(0),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "How do you track their aliases?",
          nextDialogue: {
            npc: "Cipher – Dark Web Informant",
            text: "Analyze writing style—sloppy grammar, same spelling mistakes. The alias log helps.",
            clue: "Alias log",
            action: () => window.markObjectiveComplete(1),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "What's the auction data?",
          nextDialogue: {
            npc: "Cipher – Dark Web Informant",
            text: "Here's the auction data. It's tough to crack. Good luck.",
            clue: "Auction data",
            action: () => window.markObjectiveComplete(2),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },
  "Parking Attendant": {
    text: "Strangest thing last night—black van, no license plates, idling by the staff exit.",
    choices: [
      {
        text: "Did you call security?",
        nextDialogue: {
          npc: "Parking Attendant",
          text: "No, but I made a note of it. Want the time?",
          clue: "Suspicious van clue",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      }
    ]
  },

  // LEVEL 9 – Transport Hack
  level9: {
    "Lina Sun – Transit Supervisor": {
      text: "The trains stopped dead at 7:32AM. DDoS hit the control center. My staff are panicking, commuters are furious.",
      choices: [
        {
          text: "Let's get the control center back online.",
          nextDialogue: {
            npc: "Lina Sun – Transit Supervisor",
            text: "Restoring now—pray for us.",
            clue: "Control center restored",
            action: () => window.markObjectiveComplete(0),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Got the DDoS logs?",
          nextDialogue: {
            npc: "Lina Sun – Transit Supervisor",
            text: "Here's everything. Good luck parsing it.",
            clue: "DDoS log",
            action: () => window.markObjectiveComplete(1),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Any service vulnerabilities found?",
          nextDialogue: {
            npc: "Lina Sun – Transit Supervisor",
            text: "Ticket service had a buffer overflow. We've patched it, but… damage was done.",
            clue: "Service exploit patched",
            action: () => window.markObjectiveComplete(2),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Any rogue WiFi configs?",
          nextDialogue: {
            npc: "Lina Sun – Transit Supervisor",
            text: "Yeah, found a suspicious config file this morning. IT's removed it.",
            clue: "Rogue WiFi config",
            action: () => window.markObjectiveComplete(3),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },
  "Coffee Stand": {
    text: "My machine crashed three times—never seen so many grumpy commuters. I blame the WiFi hackers.",
    choices: [
      {
        text: "Did you see anyone messing with the router?",
        nextDialogue: {
          npc: "Coffee Stand",
          text: "A guy with a laptop and hoodie. Classic. Ordered a double espresso.",
          clue: "WiFi tampering clue",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      }
    ]
  },
  // LEVEL 10 – Final Showdown
  level10: {
    "SECTOR9 Director": {
      text: "Agent, Silent Strings has been unleashed. Our worm payload map is updating in real-time. We need you more than ever.",
      choices: [
        {
          text: "Give me the worm payload.",
          nextDialogue: {
            npc: "SECTOR9 Director",
            text: "Downloaded to your terminal. Disarm it—if anyone can, you can.",
            clue: "Worm payload",
            action: () => window.markObjectiveComplete(0),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Where is it propagating fastest?",
          nextDialogue: {
            npc: "SECTOR9 Director",
            text: "Asia, then Europe. It's moving fast. Here's the live map.",
            clue: "Attack map",
            action: () => window.markObjectiveComplete(1),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Has Ghostline left a message?",
          nextDialogue: {
            npc: "SECTOR9 Director",
            text: "Encrypted and waiting on your desktop. It's up to you to break it.",
            clue: "Ghostline's message",
            action: () => window.markObjectiveComplete(2),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },
  "Reception Bot": {
    text: "Welcome, Agent. System security at maximum alert. Remember: the cake is a lie.",
    choices: [
      {
        text: "Can you open the doors for me?",
        nextDialogue: {
          npc: "Reception Bot",
          text: "Processing... Access granted. Please save the world. No pressure.",
          choices: [
            { text: "Back to Interview Menu", action: () => showInterviewMenu() }
          ]
        }
      }
    ]
  },
};


defineBranchingDialogues();
function defineBranchingDialogues() {
  window.dialogues = {

    // === LEVEL 1: SECTOR-9 HQ BREACH ===
    "investigation_intro": {
      text: "Sector-9 HQ breach: Use interviews, scanning, and analysis to uncover the attack. Every choice matters.",
      options: ["Begin with Interviews", "Run Evidence Scan", "Analyze Digital Clues", "Check Objectives"],
      next: ["interview_menu", "scan_menu", "analyze_menu", "objectives_view"]
    },
    // Interview Menu
    "interview_menu": {
      text: "Who do you want to talk to?",
      options: [
        "Marcus Chen – IT Analyst",
        "Sarah Wilson – Security Guard",
        "Janitor Carlos",
        "Receptionist Mia",
        "Back to Investigation"
      ],
      next: [
        "interview_marcus", "interview_sarah", "interview_janitor", "interview_receptionist", "investigation_intro"
      ]
    },
    "interview_marcus": {
      text: "Marcus: 'You're the new lead? I haven't slept. There were weird logins at 2AM, then deleted logs. If you can scan for lost entries, we'll finally know.'",
      options: [
        "Ask about the suspicious login",
        "Use Evidence Scanner on logs",
        "Back to Interview Menu"
      ],
      next: ["marcus_suspicious", "scan_logs", "interview_menu"]
    },
    "marcus_suspicious": {
      text: "Marcus: '2:03AM admin login, nobody scheduled. Logs wiped after. If you recover them, let me know.'",
      options: [
        "Use Evidence Scanner on logs",
        "Make a note",
        "Back to Marcus"
      ],
      next: ["scan_logs", "open_notes_marcus", "interview_marcus"]
    },
    "scan_logs": {
      text: "Scanner recovers deleted log: 2:03AM admin login, IP 185.56.12.99. Objective complete.",
      options: ["Analyze clues", "Interview Security", "Back to Investigation"],
      next: ["analyze_menu", "interview_sarah", "investigation_intro"],
      action: () => window.markObjectiveComplete(3)
    },
    "open_notes_marcus": {
      text: "Note: Marcus reports 2AM admin login, logs deleted. Need to recover entries.",
      options: ["Back to Marcus"],
      next: ["interview_marcus"]
    },
    "interview_sarah": {
      text: "Sarah: 'Found a USB in the lift, generator rebooted at 2AM. If you want, analyze the USB.'",
      options: [
        "Ask about generator",
        "Analyze USB",
        "Back to Interview Menu"
      ],
      next: ["sarah_generator", "analyze_usb", "interview_menu"]
    },
    "sarah_generator": {
      text: "Sarah: 'Whole lobby flickered. Thought it was a test, but now I'm not sure.'",
      options: ["Back to Sarah"],
      next: ["interview_sarah"]
    },
    "analyze_usb": {
      text: "Malware found: credential-stealer, time-stamped 2:01AM. Objective complete.",
      options: [
        "Warn Marcus",
        "Add to Notes",
        "Back to Investigation"
      ],
      next: ["warn_marcus", "open_notes_usb", "investigation_intro"],
      action: () => window.markObjectiveComplete(2)
    },
    "warn_marcus": {
      text: "Marcus: 'Resetting admin passwords. Thanks for the catch.' Objective complete.",
      options: ["Back to Interview Menu"],
      next: ["interview_menu"],
      action: () => window.markObjectiveComplete(4)
    },
    "open_notes_usb": {
      text: "Note: Sarah's USB had credential-stealer malware. Linked to 2AM breach.",
      options: ["Back to Investigation"],
      next: ["investigation_intro"]
    },
    "interview_janitor": {
      text: "Carlos: 'Saw a hoodie by the server room after midnight. Could be nothing.'",
      options: ["Back to Interview Menu"],
      next: ["interview_menu"]
    },
    "interview_receptionist": {
      text: "Mia: 'Security hated that generator reboot. USBs everywhere lately.'",
      options: ["Back to Interview Menu"],
      next: ["interview_menu"]
    },
    "scan_menu": {
      text: "What do you want to scan?",
      options: ["Scan server logs", "Scan USB", "Back to Investigation"],
      next: ["scan_logs", "analyze_usb", "investigation_intro"]
    },
    "analyze_menu": {
      text: "What do you want to analyze?",
      options: ["Analyze log fragment", "Analyze USB", "Back to Investigation"],
      next: ["analyze_log_fragment", "analyze_usb", "investigation_intro"]
    },
    "analyze_log_fragment": {
      text: "Analysis: Remote login from masked VPN node, attacker started at network hub. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation_intro"],
      action: () => window.markObjectiveComplete(0)
    },
    "objectives_view": {
      text: "Objectives:\n- Identify the initial breach point\n- Analyze suspicious login attempts\n- Trace the attacker's IP address\n- Recover deleted system logs\n- Secure the compromised accounts",
      options: ["Back to Investigation"],
      next: ["investigation_intro"]
    },

    // === LEVEL 2: NEWS WEBSITE DEFACEMENT ===
    "investigation2_intro": {
      text: "Mission 2: News outlet's website has been defaced. All headlines replaced with 'PH4NT0M WAS HERE'.",
      options: ["Interview Web Team", "Audit Website Code", "Scan for Malicious Scripts", "Objectives"],
      next: ["interview2_menu", "audit2_code", "scan2_scripts", "objectives2_view"]
    },
    "interview2_menu": {
      text: "Who do you want to interview?",
      options: [
        "Emma Rodriguez – Web Editor",
        "David Kim – IT Support",
        "Intern Billy",
        "Back to Investigation"
      ],
      next: ["interview2_emma", "interview2_david", "interview2_intern", "investigation2_intro"]
    },
    "interview2_emma": {
      text: "Emma: '6AM I found every headline was hacked. I'm not a coder! Maybe check the ticker script?'",
      options: [
        "Ask about suspicious emails",
        "Audit Ticker Script",
        "Back to Interview Menu"
      ],
      next: ["emma2_email", "audit2_code", "interview2_menu"]
    },
    "emma2_email": {
      text: "Emma: 'Everyone got a fake IT password reset. Billy clicked it. His browser's a popup circus now.'",
      options: ["Back to Emma"],
      next: ["interview2_emma"]
    },
    "audit2_code": {
      text: "You find an injected XSS payload in the news ticker. Objective complete.",
      options: [
        "Interview IT Support",
        "Back to Investigation"
      ],
      next: ["interview2_david", "investigation2_intro"],
      action: () => window.markObjectiveComplete(1)
    },
    "interview2_david": {
      text: "David: 'Defacement came through a plugin vulnerability. Patch was postponed! Classic.'",
      options: [
        "Scan for Malicious Scripts",
        "Back to Interview Menu"
      ],
      next: ["scan2_scripts", "interview2_menu"]
    },
    "scan2_scripts": {
      text: "Malicious JavaScript found and removed. Headlines restored. Objective complete.",
      options: [
        "Interview Intern",
        "Back to Investigation"
      ],
      next: ["interview2_intern", "investigation2_intro"],
      action: () => window.markObjectiveComplete(0)
    },
    "interview2_intern": {
      text: "Billy: 'I thought the password email was real. Next time, I'll ask first... Maybe.'",
      options: ["Back to Interview Menu"],
      next: ["interview2_menu"]
    },
    "objectives2_view": {
      text: "Objectives:\n- Remove malicious headline script\n- Analyze XSS payload\n- Trace phishing email source\n- Patch CMS vulnerability",
      options: ["Back to Investigation"],
      next: ["investigation2_intro"]
    },

    // === LEVEL 3: BANK RANSOMWARE ===
    "investigation3_intro": {
      text: "Mission 3: The bank's network has been locked down by ransomware.",
      options: ["Interview Staff", "Recover Malware Sample", "Analyze Network Spread", "Objectives"],
      next: ["interview3_menu", "recover3_sample", "analyze3_spread", "objectives3_view"]
    },
    "interview3_menu": {
      text: "Who do you want to interview?",
      options: [
        "Jennifer Park – Teller",
        "Rajesh Singh – IT",
        "Bank Guard",
        "Back to Investigation"
      ],
      next: ["interview3_jennifer", "interview3_rajesh", "interview3_guard", "investigation3_intro"]
    },
    "interview3_jennifer": {
      text: "Jennifer: 'I got an urgent HR email, opened a PDF, then everything froze.'",
      options: [
        "Ask for email and attachment",
        "Warn other tellers",
        "Back to Interview Menu"
      ],
      next: ["get3_email", "warn3_tellers", "interview3_menu"]
    },
    "get3_email": {
      text: "You collect the phishing email and malicious PDF. Objective complete.",
      options: ["Back to Jennifer"],
      next: ["interview3_jennifer"],
      action: () => window.markObjectiveComplete(1)
    },
    "warn3_tellers": {
      text: "Other tellers warned. Only Jennifer opened it. Potential patient zero identified. Objective complete.",
      options: ["Back to Interview Menu"],
      next: ["interview3_menu"],
      action: () => window.markObjectiveComplete(0)
    },
    "interview3_rajesh": {
      text: "Rajesh: 'Malware sample is on the shared drive. Network map shows how it spread.'",
      options: [
        "Recover Malware Sample",
        "Analyze Network Spread",
        "Back to Interview Menu"
      ],
      next: ["recover3_sample", "analyze3_spread", "interview3_menu"]
    },
    "recover3_sample": {
      text: "You isolate and recover the ransomware sample. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation3_intro"],
      action: () => window.markObjectiveComplete(2)
    },
    "analyze3_spread": {
      text: "You map the lateral movement: spread via SMB after initial compromise. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation3_intro"],
      action: () => window.markObjectiveComplete(3)
    },
    "interview3_guard": {
      text: "Bank Guard: 'Jennifer looked shaken after reading that email. You think it's related?'",
      options: ["Back to Interview Menu"],
      next: ["interview3_menu"]
    },
    "objectives3_view": {
      text: "Objectives:\n- Identify patient zero\n- Analyze phishing email\n- Recover ransomware sample\n- Trace network spread\n- Restore banking services",
      options: ["Back to Investigation"],
      next: ["investigation3_intro"]
    },

    // === LEVEL 4: REPO COMPROMISED ===
    "investigation4_intro": {
      text: "Mission 4: Source code repo compromised. Malicious commit added a backdoor.",
      options: ["Audit Recent Commits", "Interview Dev Team", "Revert Malicious Commit", "Objectives"],
      next: ["audit4_commits", "interview4_menu", "revert4_commit", "objectives4_view"]
    },
    "audit4_commits": {
      text: "You find a suspicious commit: 'Backdoor for testing.' Objective complete.",
      options: ["Revert Commit", "Interview Dev Team"],
      next: ["revert4_commit", "interview4_menu"],
      action: () => window.markObjectiveComplete(0)
    },
    "interview4_menu": {
      text: "Who do you want to interview?",
      options: [
        "Chloe Tan – DevOps Engineer",
        "Tom Lin – Junior Developer",
        "Senior Dev Priya",
        "Back to Investigation"
      ],
      next: ["interview4_chloe", "interview4_tom", "interview4_priya", "investigation4_intro"]
    },
    "interview4_chloe": {
      text: "Chloe: 'Malicious commit skipped review, Tom's token was reused.'",
      options: [
        "Audit Pipeline Warnings",
        "Back to Interview Menu"
      ],
      next: ["audit4_pipeline", "interview4_menu"]
    },
    "audit4_pipeline": {
      text: "Pipeline logs show one dev's token reused across multiple systems. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation4_intro"],
      action: () => window.markObjectiveComplete(1)
    },
    "interview4_tom": {
      text: "Tom: 'I reused my password, okay? Changed everything now.'",
      options: [
        "Back to Interview Menu"
      ],
      next: ["interview4_menu"],
      action: () => window.markObjectiveComplete(2)
    },
    "interview4_priya": {
      text: "Priya: 'Told you all to use 2FA. Now buy us lunch.'",
      options: ["Back to Interview Menu"],
      next: ["interview4_menu"]
    },
    "revert4_commit": {
      text: "You revert the malicious commit. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation4_intro"],
      action: () => window.markObjectiveComplete(3)
    },
    "objectives4_view": {
      text: "Objectives:\n- Audit recent repo commits\n- Investigate pipeline warnings\n- Identify compromised developer account\n- Revert malicious commit",
      options: ["Back to Investigation"],
      next: ["investigation4_intro"]
    },

    // === LEVEL 5: GOVERNMENT SYSTEM BACKDOOR ===
    "investigation5_intro": {
      text: "Mission 5: Government server infected. Persistent backdoor detected.",
      options: ["Interview Sysadmin", "Analyze Backdoor File", "Recover Deleted DB Records", "Objectives"],
      next: ["interview5_sysadmin", "analyze5_backdoor", "recover5_db", "objectives5_view"]
    },
    "interview5_sysadmin": {
      text: "Maria: 'Found a scheduled task—totally_safe.exe. Not mine.'",
      options: [
        "Analyze Backdoor File",
        "Back to Investigation"
      ],
      next: ["analyze5_backdoor", "investigation5_intro"]
    },
    "analyze5_backdoor": {
      text: "Analysis: Backdoor connects to random IP hourly. Quarantined and dumped binary. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation5_intro"],
      action: () => window.markObjectiveComplete(0)
    },
    "recover5_db": {
      text: "You roll back to last night's DB restore point. Missing records mostly recovered. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation5_intro"],
      action: () => window.markObjectiveComplete(1)
    },
    "objectives5_view": {
      text: "Objectives:\n- Analyze persistent malware\n- Recover deleted database records\n- Analyze unauthorized scheduled tasks",
      options: ["Back to Investigation"],
      next: ["investigation5_intro"]
    },

    // === LEVEL 6: POWER GRID BREACH ===
    "investigation6_intro": {
      text: "Mission 6: Power grid attack. Rogue USB found in SCADA system.",
      options: ["Interview Grid Operator", "Scan USB Device", "Review Remote Access Logs", "Objectives"],
      next: ["interview6_operator", "scan6_usb", "review6_logs", "objectives6_view"]
    },
    "interview6_operator": {
      text: "Rachel: 'USB was plugged in at 3AM. Firmware looks different today.'",
      options: [
        "Scan USB Device",
        "Analyze Firmware Diffs",
        "Back to Investigation"
      ],
      next: ["scan6_usb", "analyze6_firmware", "investigation6_intro"]
    },
    "scan6_usb": {
      text: "You find a rogue executable. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation6_intro"],
      action: () => window.markObjectiveComplete(0)
    },
    "analyze6_firmware": {
      text: "Firmware diff: unauthorized code inserted overnight. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation6_intro"],
      action: () => window.markObjectiveComplete(1)
    },
    "review6_logs": {
      text: "Remote admin connection logged at 3AM. Not an authorized user. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation6_intro"],
      action: () => window.markObjectiveComplete(2)
    },
    "objectives6_view": {
      text: "Objectives:\n- Find rogue USB device\n- Analyze firmware changes\n- Review remote access logs",
      options: ["Back to Investigation"],
      next: ["investigation6_intro"]
    },

    // === LEVEL 7: INSIDER THREAT ===
    "investigation7_intro": {
      text: "Mission 7: Possible insider threat. Suspicious access and locker clue found.",
      options: ["Interview Suspect", "Interview HR", "Analyze Process Hash", "Objectives"],
      next: ["interview7_suspect", "interview7_hr", "analyze7_hash", "objectives7_view"]
    },
    "interview7_suspect": {
      text: "Anita: 'My credentials were used, but it wasn't me!'",
      options: [
        "Check Access Logs",
        "Check Locker for Clue",
        "Back to Investigation"
      ],
      next: ["check7_logs", "check7_locker", "investigation7_intro"]
    },
    "check7_logs": {
      text: "Access logs show suspicious logins at 2:30AM. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation7_intro"],
      action: () => window.markObjectiveComplete(0)
    },
    "check7_locker": {
      text: "Encrypted note found in Anita's locker. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation7_intro"],
      action: () => window.markObjectiveComplete(1)
    },
    "interview7_hr": {
      text: "Henry: 'Two staff requested leave right after the breach. Kim mentioned a \"clean exit\".'",
      options: [
        "Back to Investigation"
      ],
      next: ["investigation7_intro"],
      action: () => window.markObjectiveComplete(3)
    },
    "analyze7_hash": {
      text: "Process hash matches known malware. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation7_intro"],
      action: () => window.markObjectiveComplete(2)
    },
    "objectives7_view": {
      text: "Objectives:\n- Analyze credential access logs\n- Investigate locker clue\n- Analyze process hash\n- Interview HR about leave requests",
      options: ["Back to Investigation"],
      next: ["investigation7_intro"]
    },

    // === LEVEL 8: DARK WEB TRACKING ===
    "investigation8_intro": {
      text: "Mission 8: Dark web activity detected. Track PH4NT0M's forum post.",
      options: ["Contact Informant", "Trace Aliases", "Decrypt Auction Data", "Objectives"],
      next: ["contact8_informant", "trace8_aliases", "decrypt8_auction", "objectives8_view"]
    },
    "contact8_informant": {
      text: "Cipher: 'Here's PH4NT0M's encrypted forum post.'",
      options: [
        "Decrypt Forum Post",
        "Back to Investigation"
      ],
      next: ["decrypt8_post", "investigation8_intro"]
    },
    "decrypt8_post": {
      text: "Forum post decrypted. Clue obtained. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation8_intro"],
      action: () => window.markObjectiveComplete(0)
    },
    "trace8_aliases": {
      text: "Analyzing alias logs... Ghostline's pattern matches found. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation8_intro"],
      action: () => window.markObjectiveComplete(1)
    },
    "decrypt8_auction": {
      text: "Auction data decrypted. Zero-days for sale. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation8_intro"],
      action: () => window.markObjectiveComplete(2)
    },
    "objectives8_view": {
      text: "Objectives:\n- Find PH4NT0M's forum post\n- Trace Ghostline's aliases\n- Decrypt auction data",
      options: ["Back to Investigation"],
      next: ["investigation8_intro"]
    },

    // === LEVEL 9: TRANSIT SYSTEM HACK ===
    "investigation9_intro": {
      text: "Mission 9: City transit system hacked. Trains halted and DDoS detected.",
      options: ["Interview Supervisor", "Restore Control Center", "Analyze DDoS Log", "Objectives"],
      next: ["interview9_supervisor", "restore9_control", "analyze9_ddos", "objectives9_view"]
    },
    "interview9_supervisor": {
      text: "Lina: 'Everything crashed at 7:32AM. Find the rogue WiFi config?'",
      options: [
        "Patch Exploited Service",
        "Remove Rogue WiFi Config",
        "Back to Investigation"
      ],
      next: ["patch9_service", "remove9_wifi", "investigation9_intro"]
    },
    "restore9_control": {
      text: "Control center systems restored. Trains running again. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation9_intro"],
      action: () => window.markObjectiveComplete(0)
    },
    "analyze9_ddos": {
      text: "DDoS log analyzed. Attack origin narrowed down. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation9_intro"],
      action: () => window.markObjectiveComplete(1)
    },
    "patch9_service": {
      text: "Ticket service buffer overflow patched. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation9_intro"],
      action: () => window.markObjectiveComplete(2)
    },
    "remove9_wifi": {
      text: "Rogue WiFi config removed. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation9_intro"],
      action: () => window.markObjectiveComplete(3)
    },
    "objectives9_view": {
      text: "Objectives:\n- Restore control center\n- Analyze DDoS log\n- Patch exploited service\n- Remove rogue WiFi config",
      options: ["Back to Investigation"],
      next: ["investigation9_intro"]
    },

    // === LEVEL 10: FINAL SHOWDOWN ===
    "investigation10_intro": {
      text: "Final Mission: Disarm the Silent Strings protocol and face GHOSTLINE.",
      options: ["Disarm Protocol", "Trace Worm Propagation", "Decrypt Final Message", "Objectives"],
      next: ["disarm10_protocol", "trace10_worm", "decrypt10_message", "objectives10_view"]
    },
    "disarm10_protocol": {
      text: "You disarm the Silent Strings protocol. World systems stabilize. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation10_intro"],
      action: () => window.markObjectiveComplete(0)
    },
    "trace10_worm": {
      text: "You trace worm propagation worldwide and neutralize hotspots. Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation10_intro"],
      action: () => window.markObjectiveComplete(1)
    },
    "decrypt10_message": {
      text: "You decrypt Ghostline's final message: 'The strings are cut, but the music plays on.' Objective complete.",
      options: ["Back to Investigation"],
      next: ["investigation10_intro"],
      action: () => window.markObjectiveComplete(2)
    },
    "objectives10_view": {
      text: "Objectives:\n- Disarm Silent Strings protocol\n- Trace global worm propagation\n- Decrypt Ghostline's final message",
      options: ["Back to Investigation"],
      next: ["investigation10_intro"]
    }
  };
}

function showMissionDialogue(levelKey, npcKey) {
  window.currentNPC = npcKey;
  const npcDialogue = window.missionDialogues[levelKey][npcKey];
  showDialogueRefactored(npcKey, npcDialogue.text, npcDialogue.choices);
}

function showDialogueNode(key, type = "branching") {
    let node = null;
    if (type === "mission") {
        node = window.missionDialogues[currentLevel][key];
    } else if (type === "branching") {
        node = window.dialogues[key];
    }
    if (!node) {
        showPopup("Dialogue node not found.");
        return;
    }
    // Display the dialogue text and options as you already do:
    const textEl = document.getElementById('dialogue-text');
    const optionsBox = document.getElementById('dialogue-choices');
    if (textEl) textEl.textContent = node.text || '';
    if (optionsBox) optionsBox.innerHTML = '';
    if (node.options && optionsBox) {
        node.options.forEach((optionText, idx) => {
            const btn = document.createElement('button');
            btn.textContent = optionText;
            btn.className = 'choice-btn';
            btn.onclick = () => {
                // If this option leads to a level switch:
                if (node.next && node.next[idx] && node.next[idx].startsWith('level')) {
                    setLevel(node.next[idx]);
                    showDialogueNode('investigation_intro', 'branching');
                } else {
                    // --- AUTO NPC HANDLING ---
                    // If the option matches an NPC in missionDialogues[currentLevel], show their dialogue
                    const npcNames = Object.keys(window.missionDialogues[currentLevel] || {});
                    if (npcNames.includes(optionText)) {
                        showMissionDialogue(currentLevel, optionText);
                    } else {
                        showDialogueNode(node.next[idx], 'branching');
                    }
                }
            };
            optionsBox.appendChild(btn);
        });
    }
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
  const npcLines = window.missionDialogues[levelKey][npcKey];
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
      showDialogue('level1', Object.keys(window.missionDialogues['level1'])[0]);
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
  window.currentNPC = npcName; // Track current NPC for hint system
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

// --- Multi-Level Switching Support ---

// Track the current mission/level
let currentLevel = "level1";
function setLevel(levelKey) {
    currentLevel = levelKey;
    localStorage.setItem('currentLevel', currentLevel);
    renderObjectives();
}
if (localStorage.getItem('currentLevel')) {
    currentLevel = localStorage.getItem('currentLevel');
}

// Linear progression for demo; adjust as needed for branching
const LEVEL_ORDER = [
    "level1", "level2", "level3", "level4", "level5",
    "level6", "level7", "level8", "level9", "level10"
];
function goToNextLevel() {
    const nextIndex = LEVEL_ORDER.indexOf(currentLevel) + 1;
    // Unlock for the just-completed level
    if (LEVEL_ACHIEVEMENTS[currentLevel] && typeof unlockAchievement === 'function') {
        unlockAchievement(LEVEL_ACHIEVEMENTS[currentLevel]);
    }
    if (nextIndex < LEVEL_ORDER.length) {
        setLevel(LEVEL_ORDER[nextIndex]);
        showDialogueNode('investigation_intro', 'branching');
    } else {
        showPopup("All missions complete!");
    }
}

// Render objectives for the current level
function renderObjectives() {
    const objectives = window.missionObjectives ? (window.missionObjectives[currentLevel] || []) : [];
    const objectivesList = document.getElementById('objectives-list');
    if (!objectivesList) return;
    objectivesList.innerHTML = '';
    objectives.forEach((obj, idx) => {
        const li = document.createElement('li');
        li.textContent = obj;
        objectivesList.appendChild(li);
    });
}

// Dynamic NPC/interview menu for current level
function showInterviewMenu() {
    const dialogues = window.missionDialogues[currentLevel];
    if (!dialogues) {
        showPopup("No interviews for this level!");
        return;
    }
    const npcNames = Object.keys(dialogues);
    const choices = npcNames.map(n => ({
        text: `Talk to ${n}`,
        action: () => {
            window.currentNPC = n; // Track current NPC for hint system
            showDialogueRefactored(n, dialogues[n].text, dialogues[n].choices);
        }
    }));
    // Optionally add a back button or summary
    choices.push({ text: 'Back to Investigation', action: () => showDialogueNode('investigation_intro', 'branching') });
    // Render interview menu
    showDialogueRefactored('Interview Menu', 'Who do you want to talk to?', choices);
}

// --- Level Completion Achievements ---
const LEVEL_ACHIEVEMENTS = {
  level1: 'usb_safety',
  level2: 'cat_video',
  level3: 'donut_detective',
  level4: 'pizza_lover',
  level5: 'ghostline_foe',
  // Add more as desired
}; 