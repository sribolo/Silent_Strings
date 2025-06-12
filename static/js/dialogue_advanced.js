// --- DIALOGUE DATA & SYSTEMS (COMBINED) ---
// Mission-specific dialogues with proper NPC names for visual novel system
window.missionDialogues = {
  // LEVEL 1 – HQ Breach
  level1: {
    "Marcus Chen – IT Analyst": {
      text: "You’re the new response lead? Glad someone fresh is on this. I’ve been glued to this chair since 1AM. I keep seeing log entries that just don’t add up. Maybe you’ll spot something I missed.",
      choices: [
        {
          text: "Show me what’s freaking you out, Marcus.",
          nextDialogue: {
            npc: "Marcus Chen – IT Analyst",
            text: "Look at this admin login—2:03AM. Problem is, I know for a fact nobody’s scheduled at that time. And right after, chunks of the log just… disappear. Whoever did this, they covered their tracks.",
            clue: "Suspicious login timestamp",
            choices: [
              {
                text: "Let me try to recover those deleted logs.",
                action: () => window.markObjectiveComplete(3),
                nextDialogue: {
                  npc: "Marcus Chen – IT Analyst",
                  text: "Please do. If anyone can bring them back, it’s you. I’ll owe you lunch.",
                  choices: [
                    { text: "Back to Interview Menu", action: () => showInterviewMenu() }
                  ]
                }
              },
              {
                text: "Did they change the admin password?",
                nextDialogue: {
                  npc: "Marcus Chen – IT Analyst",
                  text: "Yeah, password was reset from a different device right before. Someone’s got admin access, and it isn’t us.",
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
                  text: "Best guess? Breach started at the network hub—first odd access came from there, then admin got compromised. It’s like they knew exactly where to poke holes.",
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
            text: "I got a weird alert at 2:01AM—backup generator kicked in. Whole place flickered. I checked, and bam, weird logins everywhere. I don’t believe in coincidences.",
            choices: [
              { text: "Could be a physical breach. I’ll check with Security.", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Anyone bring you coffee yet?",
          nextDialogue: {
            npc: "Marcus Chen – IT Analyst",
            text: "Ha! Not since midnight. You solve this, I’ll owe you a venti. Or two.",
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    },
    "Sarah Wilson – Security Guard": {
      text: "You’re the new tech detective? Welcome. Last night was boring, except the generator hiccup and some janitor leaving their mop unlocked. Oh—and I found a weird USB in the lift.",
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
            text: "Knock yourself out. If you figure out why that thing restarts every other week, let me know. My flashlight budget can’t take much more.",
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Can I get that USB to the lab?",
          nextDialogue: {
            npc: "Sarah Wilson – Security Guard",
            text: "IT’s got it now. They said it had some password-stealing thing on it. I wash my hands—literally and figuratively.",
            clue: "Credential theft malware on USB",
            action: () => window.markObjectiveComplete(2),
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },
  "Janitor Carlos": {
  text: "Don’t mind me, Agent. Just cleaning up another spilled coffee. Lotta action last night, huh?",
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
  text: "Oh, hello! It’s chaos this morning. I just hope the coffee machine survives.",
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
        text: "Every week! Usually it’s just presentations or—one time—a love letter.",
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
      text: "I’ve been here since 6AM. Every headline changed to ‘PH4NT0M WAS HERE’. Our devs swear it’s not them. I just… I want my old job back.",
      choices: [
        {
          text: "Show me what was changed in the code.",
          nextDialogue: {
            npc: "Emma Rodriguez – Web Editor",
            text: "Here’s the ticker script—someone injected a nasty payload. Look, I’m no coder, but that’s not our usual stuff.",
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
            text: "Yes! IT sent a password reset email, or so we thought. The intern clicked it. His browser’s now full of popups.",
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
            text: "You’d think after the last training, right? But yeah… some people never learn.",
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    },
    "David Kim – IT Support": {
      text: "If it’s not a plugin vulnerability, it’s a lost password. Management postponed a critical patch last night, so guess what—someone waltzed in and defaced the site.",
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
            text: "Yeah, you’ll see the breach started from an IP in Russia. Or maybe just a VPN exit node—who knows.",
            clue: "Admin panel access logs",
            choices: [
              { text: "Back to Interview Menu", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "How bad’s the extension infection?",
          nextDialogue: {
            npc: "David Kim – IT Support",
            text: "Pretty bad—interns and extensions don’t mix.",
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
        text: "My browser went nuts and IT yelled at me. I’ll be more careful… probably.",
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
      text: "I’m so sorry! I got this email from ‘HR’ about urgent policy changes. Looked real. I opened the PDF and everything froze. The ransom note popped up.",
      choices: [
        {
          text: "Can I see the email and attachment?",
          nextDialogue: {
            npc: "Jennifer Park – Bank Teller",
            text: "Here—I forwarded it to IT. The sender’s address looks… off. Like, one letter missing.",
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
          text: "Do you remember the sender’s address?",
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
      text: "Every time someone opens a shady attachment, it’s a new adventure. The ransomware hit us at 2:11AM, spread fast, and left a sample on the shared drive.",
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
            text: "Lateral movement after initial compromise—classic ransomware playbook. I’m mapping the spread now.",
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
      text: "We found a commit last night that skipped our review. Code injected straight into the login process. I’m mad, and management just wants it gone.",
      choices: [
        {
          text: "Let me audit recent commits.",
          nextDialogue: {
            npc: "Chloe Tan – DevOps Engineer",
            text: "See this one? ‘Backdoor for testing’—my ass. Reverted it, but double-check me.",
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
            text: "Yes—CI said one dev’s token was reused. Security basics, people.",
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
            text: "Tom Lin’s account was used. He swears it wasn’t him.",
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
            text: "Already done. I’m changing everything, I swear.",
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
        text: "He’s sharp, just a little forgetful with security. Reminds me of myself at his age.",
        choices: [
          { text: "Back to Interview Menu", action: () => showInterviewMenu() }
        ]
      }
    },
    {
      text: "How’s the team feeling?",
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
      text: "I spotted a task called ‘totally_safe.exe’—that’s never a good sign. It was set to run every hour, hidden deep in Task Scheduler.",
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
            text: "I rolled back to last night’s restore point. A few records missing, but I think we’re okay.",
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
        text: "Supposedly, but the system was acting up so I couldn’t check.",
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
      text: "The control room scanner found a rogue USB plugged into the SCADA system. We barely caught it. Firmware’s different this morning—like something got flashed overnight.",
      choices: [
        {
          text: "Can I get the USB for analysis?",
          nextDialogue: {
            npc: "Rachel Yeo – Grid Operator",
            text: "Right here. It’s got a weird executable—no label. I’m not plugging it in!",
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
            text: "Here’s a before/after. There’s code in there I don’t recognize.",
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
            text: "Yeah—here’s a log of a remote admin connection at 3AM. Definitely not ours.",
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
      text: "You’re blaming me? I follow protocol. If someone used my credentials, it wasn’t me!",
      choices: [
        {
          text: "Let’s check the access logs together.",
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
            text: "I saw a weird hash running, couldn’t kill it. Sent it to IT.",
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
            text: "Kim mentioned a ‘clean exit’ on the phone. I’d dig deeper.",
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
        text: "Couldn’t tell—hood up, sunglasses indoors. Bold move.",
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
      text: "PH4NT0M’s moving zero-day auctions to new forums every week. I can point you to their latest encrypted post… for a favor.",
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
          text: "What’s the auction data?",
          nextDialogue: {
            npc: "Cipher – Dark Web Informant",
            text: "Here’s the auction data. It’s tough to crack. Good luck.",
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
          text: "Let’s get the control center back online.",
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
            text: "Here’s everything. Good luck parsing it.",
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
            text: "Ticket service had a buffer overflow. We’ve patched it, but… damage was done.",
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
            text: "Yeah, found a suspicious config file this morning. IT’s removed it.",
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
            text: "Asia, then Europe. It’s moving fast. Here’s the live map.",
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
            text: "Encrypted and waiting on your desktop. It’s up to you to break it.",
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