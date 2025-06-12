// --- DIALOGUE DATA & SYSTEMS (COMBINED) ---
// Mission-specific dialogues with proper NPC names for visual novel system
window.missionDialogues = {
  'level1': {
    'Marcus Chen - IT Analyst': {
      text: "Agent, our monitoring detected nothing, but I saw strange log entries from 2AM in the server room.",
      choices: [
        {
          text: "Show me the suspicious log entries.",
          action: () => window.markObjectiveComplete(0),
          nextDialogue: {
            npc: 'Marcus Chen - IT Analyst',
            text: "Here's the log. Look at this login timestamp—none of our staff would be here then.",
            clue: "Suspicious login timestamp",
            choices: [
              {
                text: "Was this account compromised?",
                action: () => window.markObjectiveComplete(1),
                nextDialogue: {
                  npc: 'Marcus Chen - IT Analyst',
                  text: "Yes, it's the admin account, but I just checked—its password was changed minutes before the incident.",
                  clue: "Compromised admin account",
                  choices: [
                    {
                      text: "Did the attacker cover their tracks?",
                      nextDialogue: {
                        npc: 'Marcus Chen - IT Analyst',
                        text: "It seems they deleted some system log files after the breach. There are gaps in the logs.",
                        clue: "Deleted log file",
                        choices: [
                          {
                            text: "I’ll try recovering the deleted logs with the File Recovery Tool.",
                            action: () => window.markObjectiveComplete(3),
                            nextDialogue: {
                              npc: "Marcus Chen - IT Analyst",
                              text: "Good idea. If you recover them, we'll see their full actions.",
                              choices: [
                                { text: "Back to Interview Menu", action: () => showInterviewMenu() }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          text: "Where was the breach point?",
          nextDialogue: {
            npc: "Marcus Chen - IT Analyst",
            text: "Based on the logs, the initial access came from the network hub. The intruder moved fast to the admin workstation.",
            choices: [
              { text: "I’ll inspect the network hub.", action: () => window.markObjectiveComplete(0), nextDialogue: { npc: "Marcus Chen - IT Analyst", text: "Stay safe, Agent.", choices: [{ text: "Back to Interview Menu", action: () => showInterviewMenu() }] } }
            ]
          }
        },
        {
          text: "How do I secure the compromised accounts?",
          nextDialogue: {
            npc: "Marcus Chen - IT Analyst",
            text: "Reset the admin credentials and check for any new user accounts or permissions added since the breach.",
            choices: [
              { text: "I’ll reset credentials and review user accounts.", action: () => window.markObjectiveComplete(4), nextDialogue: { npc: "Marcus Chen - IT Analyst", text: "Let me know if you spot anything else odd.", choices: [{ text: "Back to Interview Menu", action: () => showInterviewMenu() }] } }
            ]
          }
        }
      ]
    },
    'Sarah Wilson - Security Guard': {
      text: "Agent, I was on shift last night. The only thing out of the ordinary—I found a USB drive in the trash near the Server Room.",
      choices: [
        {
          text: "Did anyone try to access secure areas?",
          nextDialogue: {
            npc: "Sarah Wilson - Security Guard",
            text: "Only staff on the list and the cleaning crew. But the backup generator rebooted at 2AM, matching the breach time.",
            choices: [
              { text: "I’ll check the generator logs as well.", action: () => window.markObjectiveComplete(0), nextDialogue: { npc: "Sarah Wilson - Security Guard", text: "I'll help you access the generator room.", choices: [{ text: "Back to Interview Menu", action: () => showInterviewMenu() }] } }
            ]
          }
        },
        {
          text: "Can I see the USB drive?",
          nextDialogue: {
            npc: "Sarah Wilson - Security Guard",
            text: "IT already quarantined it. The analysis showed it contained a credential-stealing malware.",
            choices: [
              { text: "That matches the admin compromise.", action: () => window.markObjectiveComplete(2), nextDialogue: { npc: "Sarah Wilson - Security Guard", text: "Glad I reported it!", choices: [{ text: "Back to Interview Menu", action: () => showInterviewMenu() }] } }
            ]
          }
        }
      ]
    }
  },

  'level2': {
    'Emma Rodriguez - Web Editor': {
      text: "All our headlines were replaced! I think the news ticker script was compromised.",
      choices: [
        {
          text: "Let me analyze the ticker for injected JavaScript.",
          action: () => window.markObjectiveComplete(1),
          nextDialogue: {
            npc: 'Emma Rodriguez - Web Editor',
            text: "The IT team found an XSS payload in the ticker code.",
            clue: "XSS payload in ticker",
            choices: [
              {
                text: "Who added the malicious script?",
                nextDialogue: {
                  npc: "Emma Rodriguez - Web Editor",
                  text: "Logs show an access from the intern's machine at 4AM, but he swears he didn’t do it.",
                  choices: [
                    { text: "I'll check his extension logs.", action: () => window.markObjectiveComplete(2), nextDialogue: { npc: "Emma Rodriguez - Web Editor", text: "Thanks, Agent.", choices: [{ text: "Back to Interview Menu", action: () => showInterviewMenu() }] } }
                  ]
                }
              }
            ]
          }
        },
        {
          text: "Did anyone get phishing emails?",
          nextDialogue: {
            npc: "Emma Rodriguez - Web Editor",
            text: "Yes, several staff got an email pretending to be from IT. The subject was 'Password Reset Required.'",
            clue: "Phishing email",
            choices: [
              {
                text: "I'll analyze the phishing email.",
                action: () => window.markObjectiveComplete(2),
                nextDialogue: {
                  npc: "Emma Rodriguez - Web Editor",
                  text: "Thank you! The intern clicked the link and installed a browser extension.",
                  choices: [
                    { text: "That could be the exploit source.", action: () => window.markObjectiveComplete(3), nextDialogue: { npc: "Emma Rodriguez - Web Editor", text: "Agreed. We'll remove it right away.", choices: [{ text: "Back to Interview Menu", action: () => showInterviewMenu() }] } }
                  ]
                }
              }
            ]
          }
        }
      ]
    },
    'David Kim - IT Support': {
      text: "Agent, I traced the vulnerability to an unpatched plugin in our CMS. Someone injected a script via a flaw in the admin panel.",
      choices: [
        {
          text: "Patch the exploited vulnerability.",
          action: () => window.markObjectiveComplete(3),
          nextDialogue: {
            npc: "David Kim - IT Support",
            text: "Patched. But the extension log shows the attack started from a browser add-on.",
            clue: "Extension log",
            choices: [
              { text: "Good. We'll need to monitor extensions in the future.", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },
  'level3': {
    'Jennifer Park - Bank Teller': {
      text: "I opened a PDF from 'HR'—right after, my files became unreadable and I got a ransom note.",
      choices: [
        {
          text: "Show me the phishing email.",
          action: () => window.markObjectiveComplete(1),
          nextDialogue: {
            npc: "Jennifer Park - Bank Teller",
            text: "Here it is. Sender address is off by one letter. I clicked the link and opened the attachment.",
            clue: "Phishing email",
            choices: [
              {
                text: "You may be Patient Zero.",
                action: () => window.markObjectiveComplete(0),
                nextDialogue: {
                  npc: "Jennifer Park - Bank Teller",
                  text: "I feel awful. What do I do now?",
                  choices: [
                    { text: "Quarantine your PC and don’t open anything else.", action: () => showInterviewMenu() }
                  ]
                }
              }
            ]
          }
        },
        {
          text: "Where’s the ransomware note?",
          nextDialogue: {
            npc: "Jennifer Park - Bank Teller",
            text: "It's on the shared drive and my desktop. IT has a sample.",
            clue: "Ransomware sample",
            choices: [
              { text: "I’ll analyze it with IT.", action: () => window.markObjectiveComplete(2), nextDialogue: { npc: "Jennifer Park - Bank Teller", text: "Let me know if you can recover anything.", choices: [{ text: "Back to Interview Menu", action: () => showInterviewMenu() }] } }
            ]
          }
        }
      ]
    },
    'Rajesh Singh - Bank IT': {
      text: "We found the malware sample and traced its spread through the network. The attack started from Jennifer’s workstation.",
      choices: [
        {
          text: "Let’s look at the network logs.",
          action: () => window.markObjectiveComplete(3),
          nextDialogue: {
            npc: "Rajesh Singh - Bank IT",
            text: "Here’s the log. You can see when the ransomware beaconed out.",
            clue: "Network log",
            choices: [
              { text: "Can we restore banking services?", action: () => window.markObjectiveComplete(4), nextDialogue: { npc: "Rajesh Singh - Bank IT", text: "We have a clean backup from 1 hour before infection. Starting restore now.", choices: [{ text: "Back to Interview Menu", action: () => showInterviewMenu() }] } }
            ]
          }
        }
      ]
    }
  },


    // LEVEL 4: Shadow Repo (Software Company)
    'level4': {
      'Chloe Tan - DevOps Engineer': {
        text: "Last night's commit triggered security warnings, but the build was pushed anyway. The code repo is our prime suspect.",
        choices: [
          {
            text: "Let’s audit the recent commits for code injection.",
            action: () => window.markObjectiveComplete(0),
            nextDialogue: {
              npc: "Chloe Tan - DevOps Engineer",
              text: "Found it! Here’s a malicious commit in the repo. It injected unauthorized code into authentication.",
              clue: "Compromised repo commit",
              choices: [
                {
                  text: "Revert the malicious commit.",
                  action: () => window.markObjectiveComplete(3),
                  nextDialogue: {
                    npc: "Chloe Tan - DevOps Engineer",
                    text: "Reverted. The next step is to review the pipeline warnings.",
                    choices: [
                      { text: "Audit CI/CD pipeline.", action: () => showInterviewMenu() }
                    ]
                  }
                }
              ]
            }
          },
          {
            text: "What did the pipeline warning logs show?",
            nextDialogue: {
              npc: "Chloe Tan - DevOps Engineer",
              text: "Here—the CI/CD logs flagged a credential reuse incident. I think one of our devs’ accounts was compromised.",
              clue: "Pipeline warning logs",
              choices: [
                { text: "Identify compromised developer account.", action: () => window.markObjectiveComplete(2), nextDialogue: { npc: "Chloe Tan - DevOps Engineer", text: "Looks like Tom Lin’s account was used for the malicious commit.", choices: [{ text: "Interview Tom Lin.", action: () => showInterviewMenu() }] } }
              ]
            }
          }
        ]
      },
      'Tom Lin - Junior Developer': {
        text: "I’m so sorry! I reused my password for both email and the repo. Maybe that's how my account got hacked.",
        choices: [
          {
            text: "Credential reuse is risky. Please reset all your passwords now.",
            clue: "Credential reuse",
            action: () => window.markObjectiveComplete(2),
            nextDialogue: {
              npc: "Tom Lin - Junior Developer",
              text: "Will do. Is there anything else I should check?",
              choices: [
                { text: "Enable two-factor authentication on all your accounts.", action: () => showInterviewMenu() }
              ]
            }
          }
        ]
      }
    },
  
    // LEVEL 5: Trojan Trap (Government Server)
    'level5': {
      'Maria Gomez - System Administrator': {
        text: "Agent, we found a scheduled task called 'totally_safe.exe'—it's definitely not safe.",
        choices: [
          {
            text: "Let’s analyze the persistent malware.",
            action: () => window.markObjectiveComplete(0),
            nextDialogue: {
              npc: "Maria Gomez - System Administrator",
              text: "It’s a backdoor binary—here’s the file.",
              clue: "Backdoor binary",
              choices: [
                {
                  text: "Remove the backdoor and check for persistence.",
                  nextDialogue: {
                    npc: "Maria Gomez - System Administrator",
                    text: "Done. But there's more: the task scheduler log shows how the malware stayed hidden.",
                    clue: "Task scheduler log",
                    choices: [
                      { text: "Analyze unauthorized scheduled tasks.", action: () => window.markObjectiveComplete(1), nextDialogue: { npc: "Maria Gomez - System Administrator", text: "Logs sent to your terminal.", choices: [{ text: "Back to Interview Menu", action: () => showInterviewMenu() }] } }
                    ]
                  }
                }
              ]
            }
          },
          {
            text: "Can you help recover deleted database records?",
            action: () => window.markObjectiveComplete(2),
            nextDialogue: {
              npc: "Maria Gomez - System Administrator",
              text: "Here’s a database restore point from before the attack.",
              clue: "Database restore point",
              choices: [
                { text: "Restore the database and trace admin privilege escalation.", action: () => showInterviewMenu() }
              ]
            }
          }
        ]
      }
    },
  
    // LEVEL 6: Dark Tunn3l (Power Grid)
    'level6': {
      'Rachel Yeo - Grid Operator': {
        text: "The monitoring station flagged a rogue USB device last night. It might have carried malware into our SCADA system.",
        choices: [
          {
            text: "Let’s find the rogue USB device.",
            action: () => window.markObjectiveComplete(0),
            nextDialogue: {
              npc: "Rachel Yeo - Grid Operator",
              text: "We found a USB drive plugged into the control room terminal.",
              clue: "USB drive",
              choices: [
                { text: "Analyze the device with the USB Analyzer.", action: () => showInterviewMenu() }
              ]
            }
          },
          {
            text: "Any recent firmware changes?",
            nextDialogue: {
              npc: "Rachel Yeo - Grid Operator",
              text: "Yes—here’s a diff between last night’s and today’s firmware. Unauthorized code was loaded.",
              clue: "Firmware diff",
              choices: [
                { text: "Analyze firmware changes.", action: () => window.markObjectiveComplete(1), nextDialogue: { npc: "Rachel Yeo - Grid Operator", text: "Let me know if you find the malware source.", choices: [{ text: "Back to Interview Menu", action: () => showInterviewMenu() }] } }
              ]
            }
          },
          {
            text: "Can you show me remote access logs?",
            action: () => window.markObjectiveComplete(2),
            nextDialogue: {
              npc: "Rachel Yeo - Grid Operator",
              text: "This log shows the exact time an unauthorized connection came through.",
              clue: "Remote access log",
              choices: [
                { text: "Thanks. I’ll correlate this with the USB findings.", action: () => showInterviewMenu() }
              ]
            }
          }
        ]
      }
    },
  
    // LEVEL 7: Ghost Protocol (Insider Threat)
    'level7': {
      'Anita Lee - Suspect Insider': {
        text: "You think I’m the rogue agent? I’ve done nothing wrong!",
        choices: [
          {
            text: "The credential access logs point to your terminal.",
            action: () => window.markObjectiveComplete(1),
            nextDialogue: {
              npc: "Anita Lee - Suspect Insider",
              text: "Impossible! I always lock my screen. Maybe someone else used my credentials.",
              clue: "Access log",
              choices: [
                {
                  text: "Did you see anything odd in your locker?",
                  nextDialogue: {
                    npc: "Anita Lee - Suspect Insider",
                    text: "Actually... yes. I found this encrypted note. Take it, please.",
                    clue: "Encrypted locker note",
                    action: () => window.markObjectiveComplete(2),
                    choices: [
                      { text: "We’ll have to crack this encryption to know more.", action: () => showInterviewMenu() }
                    ]
                  }
                }
              ]
            }
          },
          {
            text: "Were any unusual processes running on your computer?",
            nextDialogue: {
              npc: "Anita Lee - Suspect Insider",
              text: "I noticed a strange hash in my process list, but I couldn’t close it.",
              clue: "Process hash",
              action: () => window.markObjectiveComplete(0),
              choices: [
                { text: "Send the hash to the security team.", action: () => showInterviewMenu() }
              ]
            }
          }
        ]
      },
      'Henry Ng - HR Officer': {
        text: "Kim and Lee both requested leave after the incident. Strange timing, right?",
        choices: [
          {
            text: "Did you overhear any conversation about the breach?",
            nextDialogue: {
              npc: "Henry Ng - HR Officer",
              text: "I overheard Kim mention a 'clean exit' to someone on the phone.",
              clue: "Overheard conversation",
              choices: [
                { text: "Thanks, that could be important.", action: () => showInterviewMenu() }
              ]
            }
          }
        ]
      }
    },
  
    // LEVEL 8: Deep Dive (Dark Web)
    'level8': {
      'Cipher - Dark Web Informant': {
        text: "The forum’s buzzing. PH4NT0M is auctioning a new zero-day, and Ghostline’s aliases keep changing.",
        choices: [
          {
            text: "Can you point me to PH4NT0M’s posts?",
            action: () => window.markObjectiveComplete(0),
            nextDialogue: {
              npc: "Cipher - Dark Web Informant",
              text: "Here's an encrypted forum post—it matches their style.",
              clue: "Encrypted forum post",
              choices: [
                { text: "I’ll try to decrypt it.", action: () => showInterviewMenu() }
              ]
            }
          },
          {
            text: "How do I identify Ghostline’s aliases?",
            action: () => window.markObjectiveComplete(1),
            nextDialogue: {
              npc: "Cipher - Dark Web Informant",
              text: "Check this alias log—many posts use the same phrasing and mistakes.",
              clue: "Alias log",
              choices: [
                { text: "Good catch. I’ll investigate further.", action: () => showInterviewMenu() }
              ]
            }
          },
          {
            text: "Can you trace the zero-day auction data?",
            action: () => window.markObjectiveComplete(3),
            nextDialogue: {
              npc: "Cipher - Dark Web Informant",
              text: "Here’s the auction data. It’s encrypted but you might break it with the Message Decryptor.",
              clue: "Auction data",
              choices: [
                { text: "Thanks. I’ll start decoding.", action: () => showInterviewMenu() }
              ]
            }
          }
        ]
      }
    },
  
    // LEVEL 9: Red Flag (Public Transport)
    'level9': {
      'Lina Sun - Transit Supervisor': {
        text: "We lost control of the train network this morning. Someone sent a DDoS that knocked out the control center.",
        choices: [
          {
            text: "Let’s restore the control center first.",
            action: () => window.markObjectiveComplete(0),
            nextDialogue: {
              npc: "Lina Sun - Transit Supervisor",
              text: "We’re patching now. Here's the DDoS log.",
              clue: "DDoS log",
              choices: [
                { text: "Analyze the attack message.", action: () => showInterviewMenu() }
              ]
            }
          },
          {
            text: "Was any service exploited?",
            nextDialogue: {
              npc: "Lina Sun - Transit Supervisor",
              text: "Yes, we found a buffer overflow in the ticket service.",
              clue: "Service exploit",
              action: () => window.markObjectiveComplete(3),
              choices: [
                { text: "Patch the service and secure passenger data.", action: () => showInterviewMenu() }
              ]
            }
          },
          {
            text: "Did the attacker tamper with WiFi configuration?",
            nextDialogue: {
              npc: "Lina Sun - Transit Supervisor",
              text: "Yes, our team found a rogue config file.",
              clue: "WiFi config",
              action: () => window.markObjectiveComplete(2),
              choices: [
                { text: "Remove rogue devices and monitor WiFi logs.", action: () => showInterviewMenu() }
              ]
            }
          }
        ]
      }
    },
  
    // LEVEL 10: Final String (Global Systems)
    'level10': {
      'SECTOR9 Director': {
        text: "Agent, Silent Strings has activated globally. The worm is spreading through critical systems.",
        choices: [
          {
            text: "How do I disarm the Silent Strings protocol?",
            action: () => window.markObjectiveComplete(0),
            nextDialogue: {
              npc: "SECTOR9 Director",
              text: "We captured the worm payload—deactivating it is your priority.",
              clue: "Worm payload",
              choices: [
                { text: "I’ll run the Worm Deactivator now.", action: () => showInterviewMenu() }
              ]
            }
          },
          {
            text: "Where is the worm spreading?",
            nextDialogue: {
              npc: "SECTOR9 Director",
              text: "Here’s a map showing global propagation.",
              clue: "Attack map",
              action: () => window.markObjectiveComplete(2),
              choices: [
                { text: "Trace propagation to find Ghostline's last move.", action: () => showInterviewMenu() }
              ]
            }
          },
          {
            text: "Any final messages from Ghostline?",
            nextDialogue: {
              npc: "SECTOR9 Director",
              text: "Ghostline left an encrypted message on the Director's Office computer.",
              clue: "Ghostline's message",
              action: () => window.markObjectiveComplete(1),
              choices: [
                { text: "I'll decrypt it now.", action: () => showInterviewMenu() }
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
      { "text": "I'm just the janitor, but I did see someone wandering near the server room after midnight." },
      { "text": "They dropped something, but when I checked, it was gone.", "clue": "Possible evidence was picked up by someone else." },
      { "text": "Hope that helps, Agent. Let me know if you need anything cleaned up!" }
    ],
    "Receptionist": [
      { "text": "Are you here for IT? The security guard's been asking about a USB drive." },
      { "text": "A delivery guy came by, but left in a hurry. Didn't even sign out." },
      { "text": "If you need me, I'll be at the front desk!" }
    ]
  },
  "level2": {
    "News_Reporter": [
      { "text": "I stayed late last night and saw the home page change suddenly around 3AM." },
      { "text": "I thought it was just a glitch, but then all the headlines changed." },
      { "text": "Let me know if you need a statement for the press." }
    ],
    "Night_Intern": [
      { "text": "I got a weird email from IT about resetting my password, but I didn't click the link." },
      { "text": "The other intern did, though... and now their browser is acting weird." },
      { "text": "Maybe I'll ask IT before clicking next time!" }
    ]
  },
  "level3": {
    "Bank_Guard": [
      { "text": "No break-ins last night, but I saw a lot of staff working late." },
      { "text": "One of the tellers looked really stressed out after checking their email." },
      { "text": "Good luck, Agent. I'll keep an eye out." }
    ],
    "Cleaning_Staff": [
      { "text": "Found some shredded documents near the IT office trash." },
      { "text": "They had 'CONFIDENTIAL' stamped on them." },
      { "text": "Want me to collect anything suspicious I see?" }
    ]
  },
  "level4": {
    "QA_Tester": [
      { "text": "I flagged a suspicious change in the repo, but it was pushed anyway." },
      { "text": "Build server failed three times before they finally reverted." },
      { "text": "Maybe someone overrode the approval process?" }
    ],
    "Night_Manager": [
      { "text": "Someone asked for the deploy keys at 2AM, but I refused." },
      { "text": "Glad I did! Something's fishy about last night's deployment." }
    ]
  },
  "level5": {
    "Front_Desk": [
      { "text": "We had three visitors yesterday for 'system maintenance'." },
      { "text": "One of them left a flash drive at reception, but security took it." },
      { "text": "If you need the logbook, just ask!" }
    ],
    "Night_Watch": [
      { "text": "Power flickered twice around 1AM. I thought it was just old wiring." },
      { "text": "After that, the alarms went off for a few seconds, then nothing." },
      { "text": "Let me know if you want to check the camera logs." }
    ]
  },
  "level6": {
    "Grid_Junior": [
      { "text": "Ran diagnostics last night—node 14 kept failing." },
      { "text": "Maintenance guy said he'd seen weird firmware errors, too." },
      { "text": "If you want the log files, I can email them!" }
    ],
    "Security_Desk": [
      { "text": "All cameras in the control room glitched right before the alarms." },
      { "text": "The only person in there was a new contractor. Want his ID?" },
      { "text": "Let me know if I should check his background." }
    ]
  },
  "level7": {
    "Cafeteria_Staff": [
      { "text": "The suspect always ate alone and used a burner phone at lunch." },
      { "text": "He left in a hurry after getting a call from HR." },
      { "text": "Want me to check the cafeteria cameras?" }
    ],
    "Janitor": [
      { "text": "I saw the same person leave a stack of printouts in the recycling." },
      { "text": "They were labeled 'TOP SECRET' in big red letters." },
      { "text": "Weird, right? I'll keep an eye out." }
    ]
  },
  "level8": {
    "Parking_Attendant": [
      { "text": "A black van was parked near the staff exit last night." },
      { "text": "No one saw who got in or out." },
      { "text": "Security might have license plate footage." }
    ],
    "Late_Security": [
      { "text": "Radio interference lasted exactly five minutes at midnight." },
      { "text": "It started and stopped like someone flipped a switch." },
      { "text": "I'll mark it in the log for you." }
    ]
  },
  "level9": {
    "Ticket_Inspector": [
      { "text": "A commuter kept taking pictures of the conductor's console." },
      { "text": "When I asked, they said it was for a class project." },
      { "text": "Let me know if I should report them to security." }
    ],
    "Coffee_Stand": [
      { "text": "Engineers were gossiping about a virus in the ticketing system." },
      { "text": "They said it caused the gates to stay open all morning." },
      { "text": "If you want their names, I wrote them down." }
    ]
  },
  "level10": {
    "Archivist": [
      { "text": "I'm archiving the security logs for HQ." },
      { "text": "There's a big spike in access at exactly 03:14 this morning." },
      { "text": "Do you want me to print a report for you?" }
    ],
    "Reception_Bot": [
      { "text": "Welcome, Agent. HQ security protocols are at maximum alert." },
      { "text": "Please verify your identity at every checkpoint." },
      { "text": "Good luck. The fate of SECTOR-9 depends on you." }
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