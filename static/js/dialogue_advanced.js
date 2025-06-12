// --- DIALOGUE DATA & SYSTEMS (COMBINED) ---
// Mission-specific dialogues with proper NPC names for visual novel system
window.missionDialogues = {
  // LEVEL 1: SECTOR-9 HQ Breach
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
              {
                text: "I'll trace this IP address.",
                action: () => window.markObjectiveComplete(1),
                nextDialogue: {
                  npc: 'Marcus Chen - IT Analyst',
                  text: "The IP traces back to a VPN exit node. The trail goes cold. Do you want to check for phishing attempts or ask about physical access?",
                  choices: [
                    {
                      text: "Let me check for phishing attempts.",
                      nextDialogue: {
                        npc: 'Marcus Chen - IT Analyst',
                        text: "Good idea. The security guard mentioned finding a USB drive at reception. Could be connected to this breach.",
                        clue: "Clue: Security guard discovered an unclaimed USB drive at reception.",
                        choices: [
                          { text: "I'll talk to the security guard.", action: () => showInterviewMenu() },
                          { text: "Back to interview menu", action: () => showInterviewMenu() }
                        ]
                      }
                    },
                    {
                      text: "Ask about physical access.",
                      nextDialogue: {
                        npc: 'Marcus Chen - IT Analyst',
                        text: "The only people in the building at that time were staff and the cleaning crew. Maybe check with them?",
                        choices: [
                          { text: "I'll talk to the cleaning staff.", action: () => showInterviewMenu() },
                          { text: "Back to interview menu", action: () => showInterviewMenu() }
                        ]
                      }
                    },
                    { text: "Back to interview menu", action: () => showInterviewMenu() }
                  ]
                }
              },
              {
                text: "Let me check for phishing attempts.",
                nextDialogue: {
                  npc: 'Marcus Chen - IT Analyst',
                  text: "Let me know if you find anything. I'll be here if you have more questions.",
                  choices: [
                    { text: "Back to interview menu", action: () => showInterviewMenu() }
                  ]
                }
              },
              { text: "Back to interview menu", action: () => showInterviewMenu() }
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
              { text: "I'll talk to the security guard.", action: () => showInterviewMenu() },
              { text: "Back to interview menu", action: () => showInterviewMenu() }
            ]
          }
        },
        { text: "Back to interview menu", action: () => showInterviewMenu() }
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
              {
                text: "Yes, that could be evidence. I'll analyze it.",
                action: () => window.markObjectiveComplete(3),
                nextDialogue: {
                  npc: 'Sarah Wilson - Security Guard',
                  text: "Let me know if you need anything else, Agent.",
                  choices: [
                    { text: "Back to interview menu", action: () => showInterviewMenu() }
                  ]
                }
              },
              {
                text: "Did you see who might have left it?",
                nextDialogue: {
                  npc: 'Sarah Wilson - Security Guard',
                  text: "No, but the backup generator restarted suddenly around 2 AM. Might be related?",
                  clue: "Clue: Backup generator unexpectedly restarted at 2 AM.",
                  choices: [
                    { text: "Check the generator logs.", action: () => showInterviewMenu() },
                    { text: "Back to interview menu", action: () => showInterviewMenu() }
                  ]
                }
              },
              { text: "Back to interview menu", action: () => showInterviewMenu() }
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
              { text: "Check the generator logs.", action: () => showInterviewMenu() },
              { text: "Back to interview menu", action: () => showInterviewMenu() }
            ]
          }
        },
        { text: "Back to interview menu", action: () => showInterviewMenu() }
      ]
    }
  },

  // LEVEL 2: News Outlet Website Defacement
  'level2': {
    'Emma Rodriguez - Web Editor': {
      text: "Our site's been defaced! Every headline says 'PH4NT0M WAS HERE.'",
      choices: [
        {
          text: "When did you first notice the defacement?",
          action: () => window.markObjectiveComplete(0),
          nextDialogue: {
            npc: 'Emma Rodriguez - Web Editor',
            text: "Just after 7AM, when I tried to update the morning news. The ticker's JavaScript was replaced with malicious code.",
            clue: "Clue: Malicious JavaScript injected into the news ticker.",
            choices: [
              {
                text: "I'll analyze the injected code.",
                action: () => window.markObjectiveComplete(1),
                nextDialogue: {
                  npc: "Emma Rodriguez - Web Editor",
                  text: "Thank you! The homepage has been in chaos all morning.",
                  choices: [
                    { text: "I'll get back to you once I know more.", action: () => showInterviewMenu() }
                  ]
                }
              },
              {
                text: "Show me the admin panel access logs.",
                nextDialogue: {
                  npc: "Emma Rodriguez - Web Editor",
                  text: "I've emailed them to IT. You can check with David, our IT support.",
                  choices: [
                    { text: "I'll ask David. Thanks, Emma.", action: () => showInterviewMenu() }
                  ]
                }
              }
            ]
          }
        },
        {
          text: "Did anyone on your team receive suspicious emails recently?",
          nextDialogue: {
            npc: 'Emma Rodriguez - Web Editor',
            text: "Yes, we got an IT-looking email asking to reset our passwords. The intern clicked it yesterday…",
            clue: "Clue: Phishing email targeting web team; intern clicked suspicious link.",
            choices: [
              {
                text: "That was likely a phishing attack.",
                action: () => window.markObjectiveComplete(2),
                nextDialogue: {
                  npc: "Emma Rodriguez - Web Editor",
                  text: "I'll warn the team to be more careful. Anything else I should do?",
                  choices: [
                    { text: "I'll check the intern's workstation.", action: () => showInterviewMenu() }
                  ]
                }
              },
              {
                text: "I need to check that intern's workstation immediately.",
                nextDialogue: {
                  npc: "Emma Rodriguez - Web Editor",
                  text: "Their desk is right over there. Let me know if you find anything.",
                  choices: [
                    { text: "Thanks. I'll investigate now.", action: () => showInterviewMenu() }
                  ]
                }
              }
            ]
          }
        }
      ]
    },
    'David Kim - IT Support': {
      text: "We patched a major vulnerability last week, but the server reboot was postponed. The patch never applied.",
      choices: [
        {
          text: "Who postponed the reboot?",
          nextDialogue: {
            npc: 'David Kim - IT Support',
            text: "Management didn't want downtime. The attackers exploited that exact vulnerability.",
            clue: "Clue: Attackers exploited unpatched server vulnerability.",
            choices: [
              {
                text: "I need to patch and reboot immediately.",
                action: () => window.markObjectiveComplete(3),
                nextDialogue: {
                  npc: "David Kim - IT Support",
                  text: "Go for it—I'll monitor the logs for more suspicious activity.",
                  choices: [
                    { text: "Thank you, David. Let's lock this down.", action: () => showInterviewMenu() }
                  ]
                }
              },
              {
                text: "Show me the vulnerability details first.",
                nextDialogue: {
                  npc: "David Kim - IT Support",
                  text: "I'll forward you the CVE report and proof-of-concept code.",
                  choices: [
                    { text: "Received. I'll check the logs myself.", action: () => showInterviewMenu() }
                  ]
                }
              }
            ]
          }
        },
        {
          text: "Have you found any other traces of the attack?",
          nextDialogue: {
            npc: 'David Kim - IT Support',
            text: "Check the JavaScript in our news ticker. It's spreading malware to visitors.",
            clue: "Clue: Malicious code in the news ticker is infecting site visitors.",
            choices: [
              {
                text: "I'll clean the infected code.",
                action: () => console.log("Cleaning code"),
                nextDialogue: {
                  npc: "David Kim - IT Support",
                  text: "Good, let me know when it's safe.",
                  choices: [
                    { text: "Will do. Thanks, David.", action: () => showInterviewMenu() }
                  ]
                }
              },
              {
                text: "First, let me trace how they got admin access.",
                nextDialogue: {
                  npc: "David Kim - IT Support",
                  text: "Check for password resets in the admin logs—I'll help cross-check IPs.",
                  choices: [
                    { text: "Perfect. Working on it now.", action: () => showInterviewMenu() }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  },

  // LEVEL 3: Bank Ransomware
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
              {
                text: "This was a sophisticated phishing attack.",
                action: () => window.markObjectiveComplete(1),
                nextDialogue: {
                  npc: "Jennifer Park - Bank Teller",
                  text: "I'll be more careful from now on. What happens next?",
                  choices: [
                    { text: "We'll need to check your workstation and alert IT.", action: () => showInterviewMenu() }
                  ]
                }
              },
              {
                text: "I need to isolate your workstation immediately.",
                nextDialogue: {
                  npc: "Jennifer Park - Bank Teller",
                  text: "Thank you. Please try to save my work if you can!",
                  choices: [
                    { text: "No promises, but I'll do my best.", action: () => showInterviewMenu() }
                  ]
                }
              }
            ]
          }
        },
        {
          text: "Did other staff receive similar emails?",
          nextDialogue: {
            npc: 'Jennifer Park - Bank Teller',
            text: "Yes! At least three other tellers got the same message. We all thought it was legitimate.",
            clue: "Clue: Multiple staff received coordinated phishing emails.",
            choices: [
              {
                text: "This is a coordinated attack on multiple targets.",
                action: () => window.markObjectiveComplete(2),
                nextDialogue: {
                  npc: "Jennifer Park - Bank Teller",
                  text: "What should we do now?",
                  choices: [
                    { text: "Stay alert and don't open any suspicious emails.", action: () => showInterviewMenu() }
                  ]
                }
              },
              {
                text: "We need to check all affected workstations.",
                nextDialogue: {
                  npc: "Jennifer Park - Bank Teller",
                  text: "IT is on it. Should I power off my computer?",
                  choices: [
                    { text: "Yes, please do that immediately.", action: () => showInterviewMenu() }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  },

  // LEVEL 4: Software Repo Hack
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
              {
                text: "Revert the commit immediately.",
                action: () => window.markObjectiveComplete(0),
                nextDialogue: {
                  npc: "Chloe Tan - DevOps Engineer",
                  text: "Commit reverted. Make sure you update the pipeline passwords as well.",
                  choices: [
                    { text: "Will do. Thanks, Chloe.", action: () => showInterviewMenu() }
                  ]
                }
              },
              {
                text: "Who pushed this commit?",
                nextDialogue: {
                  npc: "Chloe Tan - DevOps Engineer",
                  text: "The commit is from Tom Lin's account, but he claims he never did it. Credential theft?",
                  choices: [
                    { text: "I'll interview Tom next.", action: () => showInterviewMenu() }
                  ]
                }
              }
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
              {
                text: "Audit pipeline logs.",
                action: () => window.markObjectiveComplete(1),
                nextDialogue: {
                  npc: "Chloe Tan - DevOps Engineer",
                  text: "Let me know what you find. We can roll back to a clean build if needed.",
                  choices: [
                    { text: "Thanks, Chloe. I'll check the logs.", action: () => showInterviewMenu() }
                  ]
                }
              },
              {
                text: "Check previous builds for tampering.",
                nextDialogue: {
                  npc: "Chloe Tan - DevOps Engineer",
                  text: "I have backup artifacts for every build. Tell me if you see anything off.",
                  choices: [
                    { text: "I'll do a diff. Thanks.", action: () => showInterviewMenu() }
                  ]
                }
              }
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
          action: () => window.markObjectiveComplete(2),
          nextDialogue: {
            npc: "Tom Lin - Junior Developer",
            text: "I'll do that now. I'm sorry if my account got us in trouble.",
            choices: [
              { text: "Security first. Thanks, Tom.", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Did you share credentials with anyone?",
          nextDialogue: {
            npc: 'Tom Lin - Junior Developer',
            text: "No, but I used the same password for my email and work.",
            clue: "Clue: Developer used the same password for multiple accounts.",
            choices: [
              { text: "Change all your passwords now.", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },

  // LEVEL 5: Government Server Malware
  'level5': {
    'Maria Gomez - System Administrator': {
      text: "A scheduled task called 'totally_safe.exe' appeared overnight. I didn't create it.",
      clue: "Clue: Suspicious scheduled task 'totally_safe.exe' appeared on system.",
      choices: [
        {
          text: "Remove it and check persistence.",
          action: () => window.markObjectiveComplete(0),
          nextDialogue: {
            npc: "Maria Gomez - System Administrator",
            text: "Task removed and persistence checked. Let's monitor for more attempts.",
            choices: [
              { text: "Good work. Stay vigilant.", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Has anyone requested admin privileges recently?",
          nextDialogue: {
            npc: 'Maria Gomez - System Administrator',
            text: "There was an unsigned email requesting admin. It looked suspicious.",
            clue: "Clue: Unverified request for admin rights via email.",
            choices: [
              {
                text: "Save that email as evidence.",
                action: () => window.markObjectiveComplete(1),
                nextDialogue: {
                  npc: "Maria Gomez - System Administrator",
                  text: "Done. Should I warn the rest of the team?",
                  choices: [
                    { text: "Yes, warn everyone.", action: () => showInterviewMenu() }
                  ]
                }
              },
              {
                text: "Warn the whole team immediately.",
                nextDialogue: {
                  npc: "Maria Gomez - System Administrator",
                  text: "Will do. We can't be too careful.",
                  choices: [
                    { text: "Thanks, Maria.", action: () => showInterviewMenu() }
                  ]
                }
              }
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
          action: () => window.markObjectiveComplete(2),
          nextDialogue: {
            npc: "Larry Chua - Records Clerk",
            text: "Antivirus found and quarantined something. Should I reboot?",
            choices: [
              { text: "Yes, then let IT know.", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Who else accessed the DB last night?",
          nextDialogue: {
            npc: 'Larry Chua - Records Clerk',
            text: "Only the sysadmin and me. But the logs might tell you more.",
            clue: "Clue: Only two people accessed database during breach window.",
            choices: [
              { text: "I'll check the logs myself.", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },

  // LEVEL 6: Power Grid Attack
  'level6': {
    'Rachel Yeo - Grid Operator': {
      text: "Our SCADA system logged remote access from an unknown IP last night.",
      clue: "Clue: SCADA logs show remote access from suspicious IP.",
      choices: [
        {
          text: "Trace the IP.",
          action: () => window.markObjectiveComplete(0),
          nextDialogue: {
            npc: "Rachel Yeo - Grid Operator",
            text: "It's masked by multiple proxies, but I'll keep digging.",
            choices: [
              { text: "Keep monitoring, Rachel.", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Were any alarms triggered?",
          nextDialogue: {
            npc: 'Rachel Yeo - Grid Operator',
            text: "Alarms were remotely disabled at midnight.",
            clue: "Clue: Security alarms were remotely disabled at midnight.",
            choices: [
              {
                text: "Re-enable all security alarms.",
                nextDialogue: {
                  npc: "Rachel Yeo - Grid Operator",
                  text: "On it. I'll let you know if they get tripped again.",
                  choices: [
                    { text: "Thanks. Stay alert.", action: () => showInterviewMenu() }
                  ]
                }
              },
              {
                text: "Check who had access at that time.",
                nextDialogue: {
                  npc: "Rachel Yeo - Grid Operator",
                  text: "Only two staff and a night shift contractor. Their badges were used.",
                  choices: [
                    { text: "I'll review badge logs.", action: () => showInterviewMenu() }
                  ]
                }
              }
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
          action: () => window.markObjectiveComplete(1),
          nextDialogue: {
            npc: "Hugo Wang - Maintenance Worker",
            text: "Let me know if it contains anything malicious.",
            choices: [
              { text: "I'll have IT analyze it. Thanks, Hugo.", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Who had access to that room overnight?",
          nextDialogue: {
            npc: 'Hugo Wang - Maintenance Worker',
            text: "Just authorized personnel, but I found an unclaimed visitor badge on the desk.",
            clue: "Clue: Unauthorized visitor badge found in secure area.",
            choices: [
              { text: "I'll check with security about the badge.", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },

  // LEVEL 7: Insider Threat
  'level7': {
    'Anita Lee - Suspect Insider': {
      text: "Why am I being questioned? I followed all procedures.",
      clue: "Clue: Suspect claims to follow procedures, but terminal had unauthorized process.",
      choices: [
        {
          text: "Your terminal had an unauthorized process running.",
          action: () => window.markObjectiveComplete(0),
          nextDialogue: {
            npc: "Anita Lee - Suspect Insider",
            text: "I don't know how that happened. I always lock my screen.",
            choices: [
              { text: "We'll continue the investigation.", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Did you notice anything odd recently?",
          nextDialogue: {
            npc: 'Anita Lee - Suspect Insider',
            text: "I found an encrypted note in my locker.",
            clue: "Clue: Encrypted note found in insider's locker.",
            choices: [
              {
                text: "Give me the note for analysis.",
                action: () => window.markObjectiveComplete(1),
                nextDialogue: {
                  npc: "Anita Lee - Suspect Insider",
                  text: "Here you go. I hope this clears my name.",
                  choices: [
                    { text: "We'll look into it.", action: () => showInterviewMenu() }
                  ]
                }
              }
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
          action: () => window.markObjectiveComplete(2),
          nextDialogue: {
            npc: "Henry Ng - HR Officer",
            text: "I'll send you Kim's activity log. Want anything else?",
            choices: [
              { text: "No, that's good for now.", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Who else has been acting suspicious?",
          nextDialogue: {
            npc: 'Henry Ng - HR Officer',
            text: "A few team members accessed restricted files late at night.",
            clue: "Clue: Multiple users accessed restricted files during suspicious timeframe.",
            choices: [
              { text: "Review file access logs.", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },

  // LEVEL 8: Dark Web
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
              { text: "Search forums.", action: () => window.markObjectiveComplete(0), nextDialogue: { npc: 'Cipher - Dark Web Informant', text: "Stay safe out there. Ghostline leaves traps for the unwary.", choices: [{ text: "Thanks. Logging off for now.", action: () => showInterviewMenu() }] } }
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
              { text: "Tell me more about Silent Strings.", nextDialogue: { npc: 'Cipher - Dark Web Informant', text: "They embed code in routine updates—hard to spot until it's too late.", choices: [{ text: "That's a scary thought.", action: () => showInterviewMenu() }] } }
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
              { text: "Start credential rotation.", action: () => window.markObjectiveComplete(1), nextDialogue: { npc: 'BitNinja - Fellow Hacker', text: "Stay sharp, Agent.", choices: [{ text: "Thanks for the tip.", action: () => showInterviewMenu() }] } }
            ]
          }
        }
      ]
    }
  },

  // LEVEL 9: Public Transport Hack
  'level9': {
    'Lina Sun - Transit Supervisor': {
      text: "All trains stopped at once. The control center was locked out by the attacker.",
      clue: "Clue: Attacker remotely locked out control center, halted transit.",
      choices: [
        {
          text: "Check the control system.",
          action: () => window.markObjectiveComplete(0),
          nextDialogue: {
            npc: "Lina Sun - Transit Supervisor",
            text: "Systems are rebooting now, but we'll need to patch the entry point.",
            choices: [
              { text: "Keep me posted.", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Interview commuters for suspicious activity.",
          nextDialogue: {
            npc: 'Lina Sun - Transit Supervisor',
            text: "Someone said they saw a person tampering with the WiFi router.",
            clue: "Clue: Possible physical tampering with WiFi router observed.",
            choices: [
              { text: "Inspect WiFi router.", nextDialogue: { npc: 'Lina Sun - Transit Supervisor', text: "Security found a rogue device plugged in.", choices: [{ text: "Remove and analyze it.", action: () => showInterviewMenu() }] } }
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
          action: () => window.markObjectiveComplete(1),
          nextDialogue: {
            npc: "Tom Wong - Commuter",
            text: "Hope that helps! I just want to get home.",
            choices: [
              { text: "Thanks, Tom.", action: () => showInterviewMenu() }
            ]
          }
        }
      ]
    }
  },

  // LEVEL 10: Final Showdown
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
              {
                text: "Challenge GHOSTLINE.",
                action: () => window.markObjectiveComplete(0),
                nextDialogue: {
                  npc: "GHOSTLINE",
                  text: "You are resourceful. But are you willing to sacrifice the old for the new?",
                  choices: [
                    { text: "Silent Strings ends now.", action: () => window.markObjectiveComplete(2), nextDialogue: { npc: "GHOSTLINE", text: "We'll see, Agent. We'll see.", choices: [{ text: "Finish mission.", action: () => showInterviewMenu() }] } },
                    { text: "Let it fall.", nextDialogue: { npc: "GHOSTLINE", text: "You have chosen chaos. Remember, Agent, every system can be rebuilt.", clue: "Clue: GHOSTLINE hints at the rise of a new digital order.", choices: [{ text: "The end... or a new beginning?", action: () => showInterviewMenu() }] } }
                  ]
                }
              },
              {
                text: "Offer an alliance instead.",
                nextDialogue: {
                  npc: "GHOSTLINE",
                  text: "Perhaps in another life, Agent. But today, you must choose.",
                  choices: [
                    { text: "Back to options.", action: () => showInterviewMenu() }
                  ]
                }
              }
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
              { text: "Spring the trap.", action: () => window.markObjectiveComplete(1), nextDialogue: { npc: "SECTOR9 Director", text: "The world is safe—for now.", choices: [{ text: "Finish mission.", action: () => showInterviewMenu() }] } },
              { text: "Wait for GHOSTLINE's next move.", nextDialogue: { npc: "SECTOR9 Director", text: "He's clever. Don't wait too long.", choices: [{ text: "Continue.", action: () => showInterviewMenu() }] } }
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
          action: () => window.markObjectiveComplete(2),
          nextDialogue: {
            npc: "GHOSTLINE",
            text: "We'll see, Agent. We'll see.",
            choices: [
              { text: "Finish mission.", action: () => showInterviewMenu() }
            ]
          }
        },
        {
          text: "Let it fall.",
          nextDialogue: {
            npc: 'GHOSTLINE',
            text: "You have chosen chaos. Remember, Agent, every system can be rebuilt.",
            clue: "Clue: GHOSTLINE hints at the rise of a new digital order.",
            choices: [
              { text: "The end... or a new beginning?", action: () => showInterviewMenu() }
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