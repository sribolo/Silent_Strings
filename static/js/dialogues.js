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
    }
};

// Legacy dialogue system (keeping for backwards compatibility)
const levelDialogues = {
  "level1": {
    "IT_Analyst": [
      { "text": "I noticed weird traffic in the logs at 2AM, but our monitoring alert didn't trigger." },
      { "text": "Did you check the phishing simulation results from last week? Someone failed the test.", "clue": "Phishing incident likely." },
      { "text": "Someone's login session from the night shift looks odd…" }
    ],
    "Security_Guard": [
      { "text": "No one reported anything unusual, but the backup generator restarted suddenly." },
      { "text": "I remember seeing a USB left at the reception desk.", "clue": "USB drive clue." }
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
      { "text": "A merge request yesterday changed the authentication code. I didn't approve it.", "clue": "Unapproved code injection in repo." },
      { "text": "Our CI/CD pipeline was showing warnings, but nobody looked." }
    ],
    "Junior_Developer": [
      { "text": "I reused my password from a previous project… should I change it?", "clue": "Credential reuse is a risk." }
    ]
  },
  "level5": {
    "System_Administrator": [
      { "text": "I noticed a scheduled task that wasn't documented. Suspicious, right?" },
      { "text": "Someone requested admin privileges via email, but the request was unsigned." }
    ],
    "Records_Clerk": [
      { "text": "Data was missing from the database this morning." },
      { "text": "A popup kept asking me to update Flash Player…" }
    ]
  },
  "level6": {
    "Grid_Operator": [
      { "text": "The SCADA system showed remote access from an unknown IP." },
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
      { "text": "PH4NT0M auctions zero-days to the highest bidder." },
      { "text": "Ghostline never uses the same forum twice." },
      { "text": "Check for hidden links in the .onion marketplace." }
    ],
    "Fellow_Hacker": [
      { "text": "Don't trust anyone in this chatroom." },
      { "text": "A leak contained your agency's network map…" }
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
  }
};

// Branching intro, tutorial, and mission story
const dialogues = {
  intro: {
    text: "Welcome to SECTOR-9, Agent. We've intercepted a breach in our training servers. Your mission begins now...",
    options: ["Accept Mission", "Request Briefing", "Log Out"],
    next: ["mission1", "briefing", "exit"],
    hint: "This is your entry point. Accept the mission to begin your investigation."
  },
  briefing: {
    text: "PH4NT0M, a radical hacking group, has compromised our systems. Their leader, GHOSTLINE, has left traces of a larger plan called 'Silent Strings'. We need you to investigate.",
    options: ["Begin Investigation", "Ask Questions", "Return"],
    next: ["mission1", "questions", "intro"],
    hint: "Get more information if you feel unprepared, or begin the mission."
  },
  questions: {
    text: "What would you like to know?",
    options: ["Who is GHOSTLINE?", "What is Silent Strings?", "What tools do I have?", "Return to Mission"],
    next: ["ghostline_info", "silent_strings_info", "tools_info", "mission1"],
    hint: "Ask about the threat, the plan, or your tools before starting."
  },
  ghostline_info: {
    text: "GHOSTLINE is an enigmatic figure who leads PH4NT0M. They believe the digital world needs to be reset. Their methods are sophisticated and their motives... unclear.",
    options: ["Learn More", "Return to Questions"],
    next: ["ghostline_deep", "questions"],
    hint: "Learning about GHOSTLINE may help you anticipate their moves."
  },
  silent_strings_info: {
    text: "Silent Strings is a protocol that PH4NT0M is developing. It's designed to disrupt global digital infrastructure. We need to stop it before it's activated.",
    options: ["Learn More", "Return to Questions"],
    next: ["strings_deep", "questions"],
    hint: "Understanding Silent Strings is key to stopping PH4NT0M."
  },
  tools_info: {
    text: "You'll have access to our DFIR toolkit: Scanner, Autopsy Suite, Log Analyzer, and more. Each tool will help you investigate different aspects of the attacks.",
    options: ["View Tools", "Return to Questions"],
    next: ["tools_list", "questions"],
    hint: "Familiarize yourself with your tools for a smoother investigation."
  },
  mission1: {
    text: "Your first mission: Investigate the breach at SECTOR-9 HQ. You have 30 minutes to identify the attack vector and contain the threat.",
    options: ["Begin Mission", "Review Tools", "Return to Briefing"],
    next: ["level1_start", "tools_list", "briefing"],
    hint: "Start the mission or review your toolkit if needed."
  },
  level1_start: {
    text: "Mission Timer: 30:00\n\nAnalyze the logs, check for phishing attempts, and identify how PH4NT0M gained access to our systems.",
    options: ["Start Investigation", "Review Mission Objectives"],
    next: ["investigation_start", "objectives"],
    hint: "Begin your investigation or review your objectives for guidance."
  },
  mission_failed: {
    text: "Mission Failed. The threat has spread. You must wait 15 minutes before attempting again.",
    options: ["Return to Mission Board"],
    next: ["mission_board"],
    hint: "Try a different approach next time to prevent failure."
  },
  mission_success: {
    text: "Excellent work, Agent. You've contained the threat and gathered valuable intelligence about PH4NT0M's methods.",
    options: ["Continue to Next Mission", "Review Evidence", "Return to Mission Board"],
    next: ["next_mission", "evidence_review", "mission_board"],
    hint: "You can proceed, review your findings, or return to the board."
  },
  level1_intro: {
    text: "HQ: 'Agent, SECTOR-9 HQ has been breached! What's your first move?'",
    options: ["Check server logs", "Question the night guard", "Order pizza"],
    next: ["level1_logs", "level1_guard", "level1_pizza"],
    hint: "Start with the most technical or suspicious lead to find the breach quickly."
  },
  level1_logs: {
    text: "You find a suspicious login at 2AM. The plot thickens!",
    options: ["Trace the IP", "Check emails"],
    next: ["level1_trace_ip", "level1_emails"],
    hint: "Tracing the IP may reveal the attacker's location or method."
  },
  level1_guard: {
    text: "The night guard offers you a donut and mentions a mysterious USB left at the desk.",
    options: ["Examine USB", "Eat donut"],
    next: ["level1_usb", "level1_donut"],
    hint: "Physical evidence like a USB can be a major clue."
  },
  level1_pizza: {
    text: "Pizza arrives. The delivery guy winks and says, 'Watch out for PH4NT0M.' Coincidence?",
    options: ["Tip generously", "Ignore and eat"],
    next: ["level1_tip", "level1_ignore_pizza"],
    hint: "Sometimes distractions are just distractions."
  },
  level1_trace_ip: {
    text: "The IP leads to a cat video site. Classic hacker misdirection!",
    options: ["Watch cat videos", "Report to HQ"],
    next: ["level1_cat_video", "level1_report"],
    hint: "Don't get sidetracked by red herrings."
  },
  level1_emails: {
    text: "You find a phishing email titled 'Win a Free Vacation!' Should you click?",
    options: ["Click it", "Warn staff"],
    next: ["level1_phished", "level1_warned"],
    hint: "Phishing emails are a common attack vector."
  },
  level1_usb: {
    text: "The USB contains a single file: 'notavirus.exe'. Tempting!",
    options: ["Run it", "Quarantine USB"],
    next: ["level1_run_usb", "level1_quarantine"],
    hint: "Running unknown files is risky. Quarantine is safer."
  },
  level1_donut: {
    text: "The donut is delicious. You feel energized!",
    options: ["Back to work"],
    next: ["level1_intro"],
    hint: "Enjoy the break, but don't lose focus on the mission."
  },
  level1_tip: {
    text: "The delivery guy hands you a napkin with 'Trust no one' written on it.",
    options: ["Back to HQ"],
    next: ["level1_intro"],
    hint: "Sometimes, even small details can be clues."
  },
  level1_ignore_pizza: {
    text: "You eat in silence. The cheese is suspiciously stringy...",
    options: ["Back to HQ"],
    next: ["level1_intro"],
    hint: "Not every choice advances the investigation."
  },
  level1_cat_video: {
    text: "You lose track of time. Mission failed!",
    options: ["Restart Level"],
    next: ["level1_intro"],
    hint: "Stay focused on the mission objectives."
  },
  level1_report: {
    text: "HQ: 'Good work, Agent. But stay sharp.'",
    options: ["Continue"],
    next: ["level2_intro"],
    hint: "You're making progress. Prepare for the next challenge."
  },
  level1_phished: {
    text: "You click the link. Your screen fills with dancing llamas. Oops!",
    options: ["Restart Level"],
    next: ["level1_intro"],
    hint: "Clicking suspicious links can have unexpected consequences."
  },
  level1_warned: {
    text: "Staff are warned. The breach is contained. For now...",
    options: ["Continue"],
    next: ["level2_intro"],
    hint: "Proactive communication can prevent further damage."
  },
  level1_run_usb: {
    text: "'notavirus.exe' launches a game of Pong. You win! But the breach remains unsolved.",
    options: ["Restart Level"],
    next: ["level1_intro"],
    hint: "Solving the breach is more important than games."
  },
  level1_quarantine: {
    text: "USB quarantined. HQ is pleased. You get a virtual high-five!",
    options: ["Continue"],
    next: ["level2_intro"],
    hint: "Quarantining suspicious devices is best practice."
  },
  level2_intro: {
    text: "HQ: 'News Outlet website defaced! What's your move?'",
    options: ["Check JavaScript", "Interview the intern", "Order coffee"],
    next: ["level2_js", "level2_intern", "level2_coffee"],
    hint: "Technical leads or suspicious staff are good starting points."
  },
  level2_js: {
    text: "You find a script: 'PH4NT0M WAS HERE'. Subtle.",
    options: ["Remove script", "Analyze further"],
    next: ["level2_remove", "level2_analyze"],
    hint: "Removing malicious code is urgent, but deeper analysis may reveal more."
  },
  level2_intern: {
    text: "The intern looks nervous and offers you a USB labeled 'Definitely Not Malware'.",
    options: ["Take USB", "Refuse politely"],
    next: ["level2_take_usb", "level2_refuse_usb"],
    hint: "Be cautious with unknown devices."
  },
  level2_coffee: {
    text: "The coffee is strong. You feel invincible!",
    options: ["Back to work"],
    next: ["level2_intro"],
    hint: "A morale boost is nice, but doesn't solve the case."
  },
  level2_remove: {
    text: "Script removed. The homepage is now cat memes. The public is delighted!",
    options: ["Continue"],
    next: ["level3_intro"],
    hint: "Quick action can restore services, but always check for deeper issues."
  },
  level2_analyze: {
    text: "You discover a hidden message: 'Meet at midnight.'",
    options: ["Investigate message", "Ignore"],
    next: ["level2_investigate", "level2_intro"],
    hint: "Hidden messages often point to the next clue."
  },
  level2_investigate: {
    text: "You catch a shadowy figure in the server room. It's the janitor! Or is it?",
    options: ["Chase", "Call HQ"],
    next: ["level2_chase", "level2_call_hq"],
    hint: "Sometimes backup is the safest option."
  },
  level2_chase: {
    text: "You chase the figure but slip on a banana peel. Classic!",
    options: ["Restart Level"],
    next: ["level2_intro"],
    hint: "Acting alone can be risky."
  },
  level2_call_hq: {
    text: "HQ: 'Good instincts, Agent. We'll handle it.'",
    options: ["Continue"],
    next: ["level3_intro"],
    hint: "Reporting to HQ can resolve dangerous situations."
  },
  level2_take_usb: {
    text: "You plug in the USB. Your screen displays 'You have been hacked!' Just kidding. It's empty.",
    options: ["Back to work"],
    next: ["level2_intro"],
    hint: "Always scan unknown USBs before use."
  },
  level2_refuse_usb: {
    text: "The intern shrugs and eats a donut. Suspicious...",
    options: ["Back to work"],
    next: ["level2_intro"],
    hint: "Trust your instincts with suspicious items."
  },
  level3_intro: {
    text: "HQ: 'Bank hit by ransomware! What's your first step?'",
    options: ["Check shared drive", "Interview teller", "Order donuts"],
    next: ["level3_drive", "level3_teller", "level3_donuts"],
    hint: "Start with the most likely source of the attack."
  },
  level3_drive: {
    text: "You find a ransom note: 'Send 1 Bitcoin to PH4NT0M.'",
    options: ["Pay ransom", "Analyze note"],
    next: ["level3_pay", "level3_analyze"],
    hint: "Paying ransom rarely solves the root problem."
  },
  level3_teller: {
    text: "The teller says, 'I got a weird email from HR.'",
    options: ["Check email", "Ignore"],
    next: ["level3_email", "level3_intro"],
    hint: "Suspicious emails are often the entry point for attacks."
  },
  level3_donuts: {
    text: "The donuts are fresh. You gain +1 morale!",
    options: ["Back to work"],
    next: ["level3_intro"],
    hint: "A morale boost is nice, but doesn't solve the case."
  },
  level3_pay: {
    text: "You pay the ransom. The hackers send you a thank-you card. The files remain encrypted.",
    options: ["Restart Level"],
    next: ["level3_intro"],
    hint: "Paying ransom doesn't guarantee file recovery."
  },
  level3_analyze: {
    text: "You find a hidden clue: 'Patient Zero is not who you think.'",
    options: ["Investigate staff", "Ignore clue"],
    next: ["level3_investigate", "level3_intro"],
    hint: "Follow up on clues to find the real source."
  },
  level3_email: {
    text: "The email contains a suspicious attachment: 'invoice.pdf'.",
    options: ["Open attachment", "Delete email"],
    next: ["level3_open", "level3_delete"],
    hint: "Opening unknown attachments is dangerous."
  },
  level3_open: {
    text: "Your computer locks up. Ransomware strikes again!",
    options: ["Restart Level"],
    next: ["level3_intro"],
    hint: "Be cautious with suspicious files."
  },
  level3_delete: {
    text: "You delete the email. The threat is contained. HQ is happy!",
    options: ["Continue"],
    next: ["level4_intro"],
    hint: "Deleting suspicious emails can prevent attacks."
  },
  level3_investigate: {
    text: "You discover the manager reused their password. Rookie mistake!",
    options: ["Reset password", "Report to HQ"],
    next: ["level3_reset", "level3_report"],
    hint: "Password hygiene is critical for security."
  },
  level3_reset: {
    text: "Password reset. The hackers are locked out. Success!",
    options: ["Continue"],
    next: ["level4_intro"],
    hint: "Resetting compromised credentials is essential."
  },
  level3_report: {
    text: "HQ: 'Excellent work, Agent.'",
    options: ["Continue"],
    next: ["level4_intro"],
    hint: "Reporting your findings helps the team."
  },
  level4_intro: {
    text: "HQ: 'Software company repo compromised! What's your move?'",
    options: ["Audit code", "Interview DevOps", "Order bubble tea"],
    next: ["level4_code", "level4_devops", "level4_tea"],
    hint: "Start with technical leads or suspicious changes."
  },
  level4_code: {
    text: "You find a suspicious commit: 'Added backdoor for testing.'",
    options: ["Revert commit", "Investigate author"],
    next: ["level4_revert", "level4_author"],
    hint: "Reverting suspicious code is a good first step."
  },
  level4_devops: {
    text: "DevOps says, 'Our pipeline was acting up.'",
    options: ["Check pipeline logs", "Ignore"],
    next: ["level4_logs", "level4_intro"],
    hint: "Logs can reveal unauthorized activity."
  },
  level4_tea: {
    text: "The bubble tea is refreshing. You feel ready to code!",
    options: ["Back to work"],
    next: ["level4_intro"],
    hint: "A morale boost is nice, but doesn't solve the case."
  },
  level4_revert: {
    text: "Commit reverted. The backdoor is gone. HQ is relieved!",
    options: ["Continue"],
    next: ["level5_intro"],
    hint: "Removing threats quickly is key."
  },
  level4_author: {
    text: "The author claims innocence. Suspicious...",
    options: ["Check their laptop", "Let it go"],
    next: ["level4_laptop", "level4_intro"],
    hint: "Investigate all possible sources of compromise."
  },
  level4_logs: {
    text: "Pipeline logs show unauthorized access at 3AM.",
    options: ["Trace access", "Ignore"],
    next: ["level4_trace", "level4_intro"],
    hint: "Tracing access can reveal the attacker."
  },
  level4_trace: {
    text: "Access traced to a rival company. Industrial espionage!",
    options: ["Report to HQ", "Investigate further"],
    next: ["level4_report", "level4_intro"],
    hint: "Reporting to HQ can escalate the response."
  },
  level4_report: {
    text: "HQ: 'Great job, Agent.'",
    options: ["Continue"],
    next: ["level5_intro"],
    hint: "Keep up the good work!"
  },
  level4_laptop: {
    text: "You find a sticky note: 'Password: password123'. Rookie mistake!",
    options: ["Reset password", "Report to HQ"],
    next: ["level4_reset", "level4_report"],
    hint: "Weak passwords are a common vulnerability."
  },
  level4_reset: {
    text: "Password reset. The threat is contained. HQ is happy!",
    options: ["Continue"],
    next: ["level5_intro"],
    hint: "Resetting credentials closes the security gap."
  },
  level5_intro: {
    text: "HQ: 'Government server infected! What's your move?'",
    options: ["Scan for malware", "Interview sysadmin", "Order energy drink"],
    next: ["level5_scan", "level5_sysadmin", "level5_drink"],
    hint: "Start with technical investigation or staff interviews."
  },
  level5_scan: {
    text: "You find a persistent backdoor named 'totally_safe.exe'.",
    options: ["Remove backdoor", "Analyze file"],
    next: ["level5_remove", "level5_analyze"],
    hint: "Remove threats quickly, but analysis can reveal attacker methods."
  },
  level5_sysadmin: {
    text: "Sysadmin says, 'Someone requested admin via email.'",
    options: ["Check email", "Ignore"],
    next: ["level5_email", "level5_intro"],
    hint: "Phishing for admin access is a common attack."
  },
  level5_drink: {
    text: "The energy drink gives you +1 focus!",
    options: ["Back to work"],
    next: ["level5_intro"],
    hint: "A morale boost is nice, but doesn't solve the case."
  },
  level5_remove: {
    text: "Backdoor removed. The system is clean. HQ is happy!",
    options: ["Continue"],
    next: ["level6_intro"],
    hint: "Removing malware is a top priority."
  },
  level5_analyze: {
    text: "You find a hidden message: 'PH4NT0M was here.'",
    options: ["Report to HQ", "Ignore"],
    next: ["level5_report", "level5_intro"],
    hint: "Reporting findings helps the investigation."
  },
  level5_report: {
    text: "HQ: 'Excellent work, Agent.'",
    options: ["Continue"],
    next: ["level6_intro"],
    hint: "Keep up the good work!"
  },
  level5_email: {
    text: "The email is a phishing attempt. You warn the team just in time!",
    options: ["Continue"],
    next: ["level6_intro"],
    hint: "Warning the team can prevent further compromise."
  },
  level6_intro: {
    text: "HQ: 'Power grid under attack! What's your move?'",
    options: ["Check SCADA logs", "Interview operator", "Order snacks"],
    next: ["level6_scada", "level6_operator", "level6_snacks"],
    hint: "Start with technical investigation or staff interviews."
  },
  level6_scada: {
    text: "SCADA logs show remote access from an unknown IP.",
    options: ["Trace IP", "Ignore"],
    next: ["level6_trace", "level6_intro"],
    hint: "Tracing IP can reveal the attacker's location."
  },
  level6_operator: {
    text: "Operator says, 'A USB was found in the control room.'",
    options: ["Examine USB", "Ignore"],
    next: ["level6_usb", "level6_intro"],
    hint: "Physical evidence like a USB can be a major clue."
  },
  level6_snacks: {
    text: "The snacks are stale. You lose -1 morale!",
    options: ["Back to work"],
    next: ["level6_intro"],
    hint: "A morale boost is nice, but doesn't solve the case."
  },
  level6_trace: {
    text: "IP traced to a rival agency. Intrigue!",
    options: ["Report to HQ", "Investigate further"],
    next: ["level6_report", "level6_intro"],
    hint: "Reporting to HQ can escalate the response."
  },
  level6_report: {
    text: "HQ: 'Great job, Agent.'",
    options: ["Continue"],
    next: ["level7_intro"],
    hint: "Keep up the good work!"
  },
  level6_usb: {
    text: "The USB contains a file: 'gridlock.exe'. Suspicious!",
    options: ["Run it", "Quarantine USB"],
    next: ["level6_run_usb", "level6_quarantine"],
    hint: "Running unknown files is risky. Quarantine is safer."
  },
  level6_run_usb: {
    text: "'gridlock.exe' launches a game of Snake. You win! But the grid is still at risk.",
    options: ["Restart Level"],
    next: ["level6_intro"],
    hint: "Solving the breach is more important than games."
  },
  level6_quarantine: {
    text: "USB quarantined. HQ is pleased. You get a virtual high-five!",
    options: ["Continue"],
    next: ["level7_intro"],
    hint: "Quarantining suspicious devices is best practice."
  },
  level7_intro: {
    text: "HQ: 'Insider suspected! What's your move?'",
    options: ["Interview suspect", "Check access logs", "Order cookies"],
    next: ["level7_suspect", "level7_logs", "level7_cookies"],
    hint: "Start with questioning the suspect or checking access logs."
  },
  level7_suspect: {
    text: "Suspect says, 'I followed all procedures.'",
    options: ["Check their terminal", "Let them go"],
    next: ["level7_terminal", "level7_intro"],
    hint: "Checking their terminal can reveal suspicious activity."
  },
  level7_logs: {
    text: "Access logs show multiple failed logins.",
    options: ["Trace logins", "Ignore"],
    next: ["level7_trace", "level7_intro"],
    hint: "Tracing logins can reveal the attacker's methods."
  },
  level7_cookies: {
    text: "The cookies are chocolate chip. You feel lucky!",
    options: ["Back to work"],
    next: ["level7_intro"],
    hint: "A morale boost is nice, but doesn't solve the case."
  },
  level7_terminal: {
    text: "You find a process named 'notavirus.exe'. Again?!",
    options: ["Terminate process", "Ignore"],
    next: ["level7_terminate", "level7_intro"],
    hint: "Terminating the process can contain the threat."
  },
  level7_terminate: {
    text: "Process terminated. The threat is contained. HQ is happy!",
    options: ["Continue"],
    next: ["level8_intro"],
    hint: "Removing the threat is a top priority."
  },
  level7_trace: {
    text: "Logins traced to a rival agency. The plot thickens!",
    options: ["Report to HQ", "Investigate further"],
    next: ["level7_report", "level7_intro"],
    hint: "Reporting to HQ can escalate the response."
  },
  level7_report: {
    text: "HQ: 'Excellent work, Agent.'",
    options: ["Continue"],
    next: ["level8_intro"],
    hint: "Keep up the good work!"
  },
  level8_intro: {
    text: "HQ: 'Dark web chatter detected! What's your move?'",
    options: ["Monitor forums", "Contact informant", "Order pizza"],
    next: ["level8_forums", "level8_informant", "level8_pizza"],
    hint: "Start with monitoring forums or contacting the informant."
  },
  level8_forums: {
    text: "You find a post: 'PH4NT0M auctions zero-days.'",
    options: ["Trace post", "Ignore"],
    next: ["level8_trace", "level8_intro"],
    hint: "Tracing the post can reveal the attacker's methods."
  },
  level8_informant: {
    text: "Informant says, 'Ghostline never uses the same forum twice.'",
    options: ["Ask for more info", "Thank informant"],
    next: ["level8_more_info", "level8_intro"],
    hint: "Asking for more information can provide valuable insights."
  },
  level8_pizza: {
    text: "The pizza is cold. You lose -1 morale!",
    options: ["Back to work"],
    next: ["level8_intro"],
    hint: "A morale boost is nice, but doesn't solve the case."
  },
  level8_trace: {
    text: "Post traced to a hidden server. Intrigue!",
    options: ["Report to HQ", "Investigate further"],
    next: ["level8_report", "level8_intro"],
    hint: "Reporting to HQ can escalate the response."
  },
  level8_report: {
    text: "HQ: 'Great job, Agent.'",
    options: ["Continue"],
    next: ["level9_intro"],
    hint: "Keep up the good work!"
  },
  level8_more_info: {
    text: "Informant whispers, 'Check for hidden links in the .onion marketplace.'",
    options: ["Investigate", "Ignore"],
    next: ["level8_investigate", "level8_intro"],
    hint: "Investigating hidden links can reveal the attacker's methods."
  },
  level8_investigate: {
    text: "You find a secret message: 'The strings will be cut.'",
    options: ["Report to HQ", "Ignore"],
    next: ["level8_report", "level8_intro"],
    hint: "Reporting to HQ can escalate the response."
  },
  level9_intro: {
    text: "HQ: 'Transit system hacked! What's your move?'",
    options: ["Check control center", "Interview supervisor", "Order coffee"],
    next: ["level9_control", "level9_supervisor", "level9_coffee"],
    hint: "Start with technical investigation or staff interviews."
  },
  level9_control: {
    text: "Control center is locked out. The attack message says 'Digital Liberation: PH4NT0M.'",
    options: ["Trace message", "Ignore"],
    next: ["level9_trace", "level9_intro"],
    hint: "Tracing the message can reveal the attacker's methods."
  },
  level9_supervisor: {
    text: "Supervisor says, 'All trains stopped at once.'",
    options: ["Check WiFi router", "Ignore"],
    next: ["level9_wifi", "level9_intro"],
    hint: "Checking the WiFi router can reveal the attacker's methods."
  },
  level9_coffee: {
    text: "The coffee is burnt. You lose -1 morale!",
    options: ["Back to work"],
    next: ["level9_intro"],
    hint: "A morale boost is nice, but doesn't solve the case."
  },
  level9_trace: {
    text: "Message traced to a commuter's phone. Intrigue!",
    options: ["Report to HQ", "Investigate further"],
    next: ["level9_report", "level9_intro"],
    hint: "Reporting to HQ can escalate the response."
  },
  level9_report: {
    text: "HQ: 'Excellent work, Agent.'",
    options: ["Continue"],
    next: ["level10_intro"],
    hint: "Keep up the good work!"
  },
  level9_wifi: {
    text: "You find a rogue device on the train WiFi. Suspicious!",
    options: ["Quarantine device", "Ignore"],
    next: ["level9_quarantine", "level9_intro"],
    hint: "Quarantining the device can prevent further attacks."
  },
  level9_quarantine: {
    text: "Device quarantined. The trains are running again!",
    options: ["Continue"],
    next: ["level10_intro"],
    hint: "Quarantining the device can prevent further attacks."
  },
  level10_intro: {
    text: "HQ: 'This is it, Agent. Face GHOSTLINE!'",
    options: ["Confront GHOSTLINE", "Set a trap", "Order celebratory cake"],
    next: ["level10_confront", "level10_trap", "level10_cake"],
    hint: "This is your final mission. Confront GHOSTLINE or set a trap."
  },
  level10_confront: {
    text: "GHOSTLINE: 'You're persistent, Agent. But can you see the pattern in the chaos?'",
    options: ["Challenge GHOSTLINE", "Offer alliance"],
    next: ["level10_challenge", "level10_alliance"],
    hint: "Challenge GHOSTLINE or offer an alliance."
  },
  level10_trap: {
    text: "You set a digital trap. GHOSTLINE almost falls for it!",
    options: ["Spring the trap", "Wait"],
    next: ["level10_spring", "level10_wait"],
    hint: "Spring the trap or wait for GHOSTLINE to make a move."
  },
  level10_cake: {
    text: "The cake is a lie. Or is it? You gain +1 morale!",
    options: ["Back to mission"],
    next: ["level10_intro"],
    hint: "The cake is a metaphor for the end of trust."
  },
  level10_challenge: {
    text: "GHOSTLINE vanishes, leaving a cryptic message: 'The strings have been cut.'",
    options: ["Report to HQ"],
    next: ["level10_report"],
    hint: "Report your findings to HQ."
  },
  level10_alliance: {
    text: "GHOSTLINE laughs. 'Maybe next time, Agent.'",
    options: ["Back to mission"],
    next: ["level10_intro"],
    hint: "Accept GHOSTLINE's offer and work together."
  },
  level10_spring: {
    text: "Trap sprung! GHOSTLINE is caught. HQ celebrates your victory!",
    options: ["The End"],
    next: ["level1_intro"],
    hint: "Congratulations! You've defeated GHOSTLINE."
  },
  level10_wait: {
    text: "You wait. GHOSTLINE escapes. Mission failed!",
    options: ["Restart Level"],
    next: ["level10_intro"],
    hint: "GHOSTLINE escaped. Try again next time."
  },
  level10_report: {
    text: "HQ: 'You did it, Agent. The world is safe... for now.'",
    options: ["Restart Game"],
    next: ["level1_intro"],
    hint: "Restart the game to try again."
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
  const optionsBox = document.getElementById('options');
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


