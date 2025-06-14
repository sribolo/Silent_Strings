window.missionDialogues = {
    // LEVEL 1 – HQ Breach
  "level1": {
    "start": {
      speaker: "System",
      text: "HQ is chaos. Sirens wail. IT's Marcus waves you over. Where to begin?",
      options: [
        { text: "Speak to Marcus (IT Analyst)", next: "marcus_intro" },
        { text: "Talk to Sarah (Security Guard)", next: "sarah_intro" },
        { text: "Look for Janitor Carlos", next: "janitor_intro" },
        { text: "Visit Receptionist Mia", next: "reception_intro" },
        { text: "Check objectives", next: "objectives" }
      ]
    },
        // MARCUS BRANCH
        "marcus_intro": {
          speaker: "Marcus Chen - IT Analyst",
          text: "Someone's wiped logs, reset passwords, and there's a phantom admin login at 2:03AM. If you spot what I missed, buy you coffee.'",
          options: [
            { text: "Let me review the logs.", next: "view_logs" },
            { text: "Any recent USBs plugged in?", next: "usb_logs" },
            { text: "Who was in the building at 2AM?", next: "building_logs" },
            { text: "Return to main menu", next: "start" }
          ]
        },
        "usb_logs": {
          speaker: "Marcus Chen - IT Analyst",
          text: "USB logs show a new device connected at 2:01AM. 'That's not normal,' Marcus mutters.",
          options: [
            { text: "Use Network Scanner to trace the device", toolRequired: "Network Scanner", next: "trace_usb" },
            { text: "Return to Marcus", next: "marcus_intro" }
          ]
        },
        "trace_usb": {
          speaker: "Marcus Chen - IT Analyst",
          text: "Network Scanner traces the device to a USB port in the Network Hub. 'That's where the breach started,' Marcus says.",
          options: [
            { text: "Return to Marcus", next: "marcus_intro" }
          ]
        },
        "building_logs": {
          speaker: "Marcus Chen - IT Analyst",
          text: "Building logs show a new admin login at 2:03AM. 'That's not normal,' Marcus mutters.",
          options: [
            { text: "Return to Marcus", next: "marcus_intro" }
          ]
        },
        "view_logs": {
          speaker: "Marcus Chen - IT Analyst",
          text: "The logs are full of gaps. 'Log Analyzer' might spot something.",
          options: [
            { text: "Use Log Analyzer", toolRequired: "Log Analyzer", next: "analyze_logs" },
            { text: "Try File Recovery Tool on logs", toolRequired: "File Recovery Tool", next: "restore_logs" },
            { text: "Return to Marcus", next: "marcus_intro" }
          ]
        },
        "analyze_logs": {
          speaker: "Marcus Chen - IT Analyst",
          text: "Log Analyzer highlights an admin login from 192.168.7.44 at 2:03AM. 'That account wasn't scheduled,' Marcus mutters.",
          objectivesCompleted: [1],
          options: [
            { text: "Trace IP with Network Scanner", toolRequired: "Network Scanner", next: "trace_ip" },
            { text: "Return to Marcus", next: "marcus_intro" }
          ]
        },
        "restore_logs": {
          speaker: "Marcus Chen - IT Analyst",
          text: "File Recovery Tool recovers deleted entries—admin password reset at 2:04AM, different device.",
          objectivesCompleted: [3],
          options: [
            { text: "Secure account with Password Cracker", toolRequired: "Password Cracker", next: "secure_account" },
            { text: "Return to Marcus", next: "marcus_intro" }
          ]
        },
        "trace_ip": {
          speaker: "Marcus Chen - IT Analyst",
          text: "Network Scanner shows breach started at the Network Hub—where the odd traffic began.",
          objectivesCompleted: [0, 2],
          options: [
            { text: "Return to Marcus", next: "marcus_intro" },
            { text: "Return to main menu", next: "start" }
          ]
        },
        "secure_account": {
          speaker: "Marcus Chen - IT Analyst",
          text: "You lock out the attacker. Marcus: 'That's a relief. Maybe now I can sleep.'",
          objectivesCompleted: [4],
          options: [{ text: "Return to Marcus", next: "marcus_intro" }]
        },
        // SARAH BRANCH
        "sarah_intro": {
          speaker: "Sarah - Security Guard",
          text: "Sarah: 'Night was mostly quiet, but the generator rebooted at 2AM, and a USB showed up in the lift.'",
          options: [
            { text: "Ask about generator logs", next: "generator_logs" },
            { text: "Take USB to IT Lab for scan", toolRequired: "Network Scanner", next: "scan_usb" },
            { text: "Anyone else on camera at 2AM?", next: "camera_footage" },
            { text: "Return to main menu", next: "start" }
          ]
        },
        "generator_logs": {
          speaker: "Sarah - Security Guard",
          text: "Sarah: 'System flickered, then stabilized. Generator log flagged anomaly at 2:01AM.'",
          options: [{ text: "Return to Sarah", next: "sarah_intro" }]
        },
        "scan_usb": {
          speaker: "Sarah - Security Guard",
          text: "You find credential-stealing malware on the USB. Sarah looks pale.",
          options: [{ text: "Return to Sarah", next: "sarah_intro" }]
        },
        "camera_footage": {
          speaker: "Sarah - Security Guard",
          text: "Sarah: 'Footage is fuzzy, but someone in a hoodie loitered by the Network Hub after midnight.'",
          options: [{ text: "Return to Sarah", next: "sarah_intro" }]
        },
        // JANITOR BRANCH
        "janitor_intro": {
          speaker: "Carlos - Janitor",
          text: "Carlos: 'You know it's a bad night when the IT guy is more jittery than the coffee machine. I saw a hoodie by the server room at 12:30.'",
          options: [
            { text: "Did you see a badge?", next: "janitor_badge" },
            { text: "Notice anything missing?", next: "janitor_missing" },
            { text: "Return to main menu", next: "start" }
          ]
        },
        "janitor_badge": {
          speaker: "Carlos - Janitor",
          text: "Carlos: 'No badge. They ducked out quick. If you check the trash, might still be clues.'",
          options: [{ text: "Return to Janitor", next: "janitor_intro" }]
        },
        "janitor_missing": {
          speaker: "Carlos - Janitor",
          text: "Carlos: 'My headphones disappeared. If you find them, music's on me.'",
          options: [{ text: "Return to Janitor", next: "janitor_intro" }]
        },
        // RECEPTION BRANCH
        "reception_intro": {
          speaker: "Mia - Receptionist",
          text: "Mia: 'This place is madness. Only unusual thing: security was extra jumpy after the generator hiccuped.'",
          options: [
            { text: "Any odd sign-ins overnight?", next: "odd_signins" },
            { text: "Return to main menu", next: "start" }
          ]
        },
        "odd_signins": {
          speaker: "Mia - Receptionist",
          text: "Mia: 'Nothing obvious, but the intern keeps losing his badge. Check the logs for details.'",
          options: [{ text: "Return to Mia", next: "reception_intro" }]
        },
        // OBJECTIVES VIEW
        "objectives": {
          speaker: "System",
          text: "Objectives:\n- Identify breach point (Network Scanner)\n- Analyze suspicious login attempts (Log Analyzer)\n- Trace the attacker's IP (Network Scanner)\n- Recover deleted logs (File Recovery Tool)\n- Secure compromised accounts (Password Cracker)",
          options: [{ text: "Back to investigation", next: "start" }]
        },
      failStates: {
        // Hard Fail: Ignored suspicious logs, missed attacker
        "fail_logs_ignored": {
          speaker: "System",
          text: "You failed to analyze suspicious logs in time. The attacker covers their tracks, and HQ enters lockdown.<br><b>MISSION FAILED.</b>",
          options: [{ text: "Restart Mission", next: "start" }]
        },
        // Soft Fail: Did not reset password, attacker gets backdoor
        "fail_password_not_reset": {
          speaker: "System",
          text: "You didn't secure the compromised account. The attacker regains access later and plants a backdoor.<br><i>This will come back to haunt you in future missions.</i>",
          options: [{ text: "Continue Anyway", next: "start" }]
        },
        // Timeout fail (already present, but cleaned)
        "fail_timeout": {
          speaker: "System",
          text: "You hesitated too long. The attacker covered their tracks. HQ is locked down for full forensics.",
          options: [{ text: "Retry", next: "start" }]
        }
      }
    },
    // LEVEL 2 – News Outlet Breach
  "level2":{
    "start": {
        speaker: "System",
        text: "News Outlet website is a mess. Every headline replaced by 'PH4NT0M WAS HERE'. Your phone buzzes nonstop.",
        options: [
          { text: "Interview Emma (Web Editor)", next: "emma_intro" },
          { text: "Talk to David (IT Support)", next: "david_intro" },
          { text: "Find Intern Billy", next: "billy_intro" },
          { text: "Review code", toolRequired: "JS Analyzer", next: "review_code" },
          { text: "Objectives", next: "objectives" }
        ]
      },
      "emma_intro": {
        speaker: "Emma - Web Editor",
        text: "Emma (flustered): 'Ticker script looks off. We got password reset emails—Billy fell for it. I want my old job back.'",
        options: [
          { text: "Review ticker with JS Analyzer", toolRequired: "JS Analyzer", next: "analyze_ticker" },
          { text: "Ask about weird emails", next: "emma_emails" },
          { text: "Back to main menu", next: "start" }
        ]
      },
      "analyze_ticker": {
        speaker: "Emma - Web Editor",
        text: "JS Analyzer flags an XSS payload. Headlines restored. Emma: 'Please never let this happen again.'",
        objectivesCompleted: [1],
        options: [{ text: "Back to Emma", next: "emma_intro" }]
      },
      "emma_emails": {
        speaker: "Emma - Web Editor",
        text: "Emma: 'IT said reset password, but the email looked weird. Billy's laptop is now possessed.'",
        options: [{ text: "Back to Emma", next: "emma_intro" }]
      },
      "david_intro": {
        speaker: "David - IT Support",
        text: "David: 'Management delayed plugin patches. Guess who gets the blame? Defacement started from an admin panel log-in—maybe a VPN.'",
        options: [
          { text: "Patch plugin (Service Patch Tool)", toolRequired: "Service Patch Tool", next: "patch_plugin" },
          { text: "Get admin logs", toolRequired: "Email Scanner", next: "admin_logs" },
          { text: "Back to main menu", next: "start" }
        ]
      },
      "patch_plugin": {
        speaker: "David - IT Support",
        text: "Plugin patched. Website secured. David: 'Now maybe I can get some sleep.'",
        objectivesCompleted: [3],
        options: [{ text: "Back to David", next: "david_intro" }]
      },
      "admin_logs": {
        speaker: "David - IT Support",
        text: "Email Scanner finds a phishing campaign. Source: suspicious Russian IP. David sighs.",
        objectivesCompleted: [2],
        options: [{ text: "Back to David", next: "david_intro" }]
      },
      "billy_intro": {
        speaker: "Billy - Intern",
        text: "Billy: 'Sorry, boss! Clicked the wrong link, got a new browser toolbar…with cat videos.'",
        options: [
          { text: "Scan Billy's machine", toolRequired: "Email Scanner", next: "scan_billy" },
          { text: "Back to main menu", next: "start" }
        ]
      },
      "scan_billy": {
        speaker: "Billy - Intern",
        text: "Phishing email and malware found. Billy looks sheepish. 'Won't happen again… probably.'",
        options: [{ text: "Back to Billy", next: "billy_intro" }]
      },
      "review_code": {
        speaker: "System",
        text: "Injected JavaScript found and removed. Website is now clean.",
        objectivesCompleted: [0],
        options: [{ text: "Back to main menu", next: "start" }]
      },
      "objectives": {
        speaker: "System",
        text: "Objectives:\n- Remove malicious headline script (JS Analyzer)\n- Analyze XSS payload (JS Analyzer)\n- Trace phishing email source (Email Scanner)\n- Patch CMS/plugin (Service Patch Tool)",
        options: [{ text: "Back", next: "start" }]
      }
    },
    failStates: {
      // Hard Fail: Skipped phishing email trace
      "fail_phishing_ignored": {
        speaker: "System",
        text: "You failed to trace the phishing email. Attackers deploy ransomware and destroy critical files.<br><b>MISSION FAILED.</b>",
        options: [{ text: "Restart Mission", next: "start" }]
      },
      // Soft Fail: Plugin not patched promptly
      "fail_patch_delayed": {
        speaker: "System",
        text: "You delayed patching the vulnerable plugin. A cryptominer infects the website, hurting revenue.<br><i>The site will perform poorly going forward.</i>",
        options: [{ text: "Continue Anyway", next: "start" }]
      },
      "fail_timeout": {
        speaker: "System",
        text: "Attackers posted more offensive content. PR disaster! Try again.",
        options: [{ text: "Retry", next: "start" }]
      }
    },
  "level3": {
    "start": {
        speaker: "System",
        text: "Bank HQ is on lockdown. Ransomware demands blink on every screen. Time to move.",
        options: [
          { text: "Talk to Jennifer (Teller)", next: "jennifer_intro" },
          { text: "Check with Rajesh (IT)", next: "rajesh_intro" },
          { text: "Interview Bank Guard", next: "guard_intro" },
          { text: "Objectives", next: "objectives" }
        ]
      },
      "jennifer_intro": {
        speaker: "Jennifer - Teller",
        text: "Jennifer (shaken): 'Got an urgent email from HR, opened the PDF, then everything froze. Sorry.'",
        options: [
          { text: "Get email and PDF sample (Email Analyzer)", toolRequired: "Email Analyzer", next: "get_email" },
          { text: "Warn other tellers", next: "warn_tellers" },
          { text: "Back to main menu", next: "start" }
        ]
      },
      "get_email": {
        speaker: "Jennifer - Teller",
        text: "You isolate the phishing email and ransom note. It's a targeted campaign.",
        objectivesCompleted: [1, 2],
        options: [{ text: "Back to Jennifer", next: "jennifer_intro" }]
      },
      "warn_tellers": {
        speaker: "Jennifer - Teller",
        text: "Jennifer warns the others. Only she opened it. Patient zero identified.",
        objectivesCompleted: [0],
        options: [{ text: "Back to Jennifer", next: "jennifer_intro" }]
      },
      "rajesh_intro": {
        speaker: "Rajesh - IT",
        text: "Rajesh (IT): 'Sample's on the shared drive. Network shows classic SMB worm spread.'",
        options: [
          { text: "Recover malware sample (File Recovery Tool)", toolRequired: "File Recovery Tool", next: "recover_sample" },
          { text: "Analyze network logs (Log Analyzer)", toolRequired: "Log Analyzer", next: "analyze_network" },
          { text: "Restore from backup", toolRequired: "File Recovery Tool", next: "restore_backup" },
          { text: "Back to main menu", next: "start" }
        ]
      },
      "recover_sample": {
        speaker: "Rajesh - IT",
        text: "File Recovery Tool grabs the ransomware binary. Objective complete.",
        objectivesCompleted: [2],
        options: [{ text: "Back to Rajesh", next: "rajesh_intro" }]
      },
      "analyze_network": {
        speaker: "Rajesh - IT",
        text: "Log Analyzer reveals lateral movement after initial email compromise. Map of spread built.",
        objectivesCompleted: [3],
        options: [{ text: "Back to Rajesh", next: "rajesh_intro" }]
      },
      "restore_backup": {
        speaker: "Rajesh - IT",
        text: "You restore from a clean backup. Services slowly return.",
        objectivesCompleted: [4],
        options: [{ text: "Back to Rajesh", next: "rajesh_intro" }]
      },
      "guard_intro": {
        speaker: "Bank Guard",
        text: "Bank Guard: 'Jennifer looked spooked after that email. ATM kept beeping too.'",
        options: [{ text: "Back to main menu", next: "start" }]
      },
      "objectives": {
        speaker: "System",
        text: "Objectives:\n- Identify patient zero (Email Analyzer)\n- Analyze phishing email (Email Analyzer)\n- Recover ransomware sample (File Recovery Tool)\n- Trace network spread (Log Analyzer)\n- Restore banking services (File Recovery Tool)",
        options: [{ text: "Back", next: "start" }]
      }
    },
    failStates: {
      // Hard Fail: Didn't warn tellers in time, ransomware spreads
      "fail_teller_not_warned": {
        speaker: "System",
        text: "You failed to warn other tellers. Ransomware spreads to all machines, locking customer funds.<br><b>MISSION FAILED.</b>",
        options: [{ text: "Restart Mission", next: "start" }]
      },
      // Soft Fail: Skipped network spread analysis
      "fail_network_not_analyzed": {
        speaker: "System",
        text: "You skipped analyzing network spread. The attacker leaves a backdoor for future attacks.<br><i>Future incidents may be harder to solve.</i>",
        options: [{ text: "Continue Anyway", next: "start" }]
      },
      "fail_timeout": {
        speaker: "System",
        text: "The ransomware spread too far. The bank is forced offline.",
        options: [{ text: "Retry", next: "start" }]
      }
  },
  "level4": {
    "start": {
        speaker: "System",
        text: "The software company's code repo is in trouble. A hidden backdoor commit is spreading panic.",
        options: [
          { text: "Talk to Chloe (DevOps Engineer)", next: "chloe_intro" },
          { text: "Interview Tom (Junior Dev)", next: "tom_intro" },
          { text: "Chat with Priya (Senior Dev)", next: "priya_intro" },
          { text: "Audit commits with Code Diff Tool", toolRequired: "Code Diff Tool", next: "audit_commits" },
          { text: "Objectives", next: "objectives" }
        ]
      },
      "chloe_intro": {
        speaker: "Chloe - DevOps Engineer",
        text: 'Chloe: \'Someone skipped review with a "test backdoor". Pipeline flagged a reused token. I\'m furious.\'',
        options: [
          { text: 'Check pipeline logs (Pipeline Monitor)', toolRequired: 'Pipeline Monitor', next: 'check_pipeline' },
          { text: 'Who pushed the commit?', next: 'commit_author' },
          { text: 'Back to menu', next: 'start' }
        ]
      },
      "check_pipeline": {
        speaker: "Chloe - DevOps Engineer",
        text: "Pipeline Monitor: One token used for multiple suspicious pushes.",
        objectivesCompleted: [1],
        options: [{ text: "Back to Chloe", next: "chloe_intro" }]
      },
      "commit_author": {
        speaker: "Chloe - DevOps Engineer",
        text: 'Chloe: \'Tom\'s account. He swears he\'s innocent.\'',
        objectivesCompleted: [2],
        options: [{ text: 'Back to Chloe', next: 'chloe_intro' }]
      },
      "tom_intro": {
        speaker: "Tom - Junior Dev",
        text: 'Tom: \'I reused my repo password. I\'m really sorry. I reset it now.\'',
        options: [
          { text: 'Check if Tom\'s credentials are now secure', toolRequired: 'Credential Monitor', next: 'check_tom' },
          { text: 'Ever shared your token?', next: 'tom_token' },
          { text: 'Back to menu', next: 'start' }
        ]
      },
      "check_tom": {
        speaker: "Tom - Junior Dev",
        text: 'Credential Monitor: Tom\'s credentials are reset and unique.',
        options: [{ text: 'Back to Tom', next: 'tom_intro' }]
      },
      "tom_token": {
        speaker: "Tom - Junior Dev",
        text: 'Tom: \'Never! But I might have clicked a weird email…\'',
        options: [{ text: 'Back to Tom', next: 'tom_intro' }]
      },
      "priya_intro": {
        speaker: "Priya - Senior Dev",
        text: 'Priya: \'We need two-factor for everyone. Only a crisis gets management to listen.\'',
        options: [{ text: 'Back to menu', next: 'start' }]
      },
      "audit_commits": {
        speaker: "Priya - Senior Dev",
        text: 'Code Diff Tool reveals a malicious commit named \'Backdoor for testing.\' You revert it. Repo is secure.',
        objectivesCompleted: [0, 3],
        options: [{ text: 'Back to menu', next: 'start' }]
      },
      "objectives": {
        speaker: "System",
        text: 'Objectives:\n- Audit recent commits (Code Diff Tool)\n- Investigate pipeline warnings (Pipeline Monitor)\n- Identify compromised dev account\n- Revert malicious commit (Code Diff Tool)',
        options: [{ text: 'Back', next: 'start' }]
      }
    },
    failStates: {
      // Hard Fail: Didn\'t audit commits, malware spreads
      "fail_commit_not_audited": {
        text: 'You failed to audit recent commits. The malware spreads to all developers\' machines.<br><b>MISSION FAILED.</b>',
        options: [{ text: 'Restart Mission', next: 'start' }]
      },
      "fail_commit_ignored": {
        text: 'You missed the malicious commit. Production is compromised and client data is leaked.<br><b>MISSION FAILED.</b>',
        options: [{ text: 'Restart Mission', next: 'start' }]
    },
      // Soft Fail: Didn\'t secure Tom\'s account
    "fail_dev_account_unlocked": {
        text: 'You didn\'t secure the compromised developer account. Attackers leave a hidden access token.',
        options: [{ text: 'Continue, But Be Careful', next: 'start' }]
    },
    "fail_timeout": {
        text: 'The malware spread too far. The company\'s codebase is compromised.',
        options: [{ text: 'Retry', next: 'start' }]
    }
  },
  "level5": {
  "start": {
        speaker: "System",
        text: "An unauthorized scheduled task was found on a government system. There's evidence of persistence.",
        options: [
          { text: "Interview Maria (Sysadmin)", next: "maria_intro" },
          { text: "Speak with Front Desk", next: "front_intro" },
          { text: "Analyze backdoor file (Malware Sandbox)", toolRequired: "Malware Sandbox", next: "analyze_backdoor" },
          { text: "Recover database records (File Recovery Tool)", toolRequired: "File Recovery Tool", next: "recover_db" },
          { text: "Objectives", next: "objectives" }
        ]
      },
      "maria_intro": {
        speaker: "Maria - Sysadmin",
        text: 'Maria: \'Scheduled task "totally_safe.exe" was set to run every hour. I quarantined the binary.\'',
        options: [
          { text: 'Analyze with Malware Sandbox', toolRequired: 'Malware Sandbox', next: 'analyze_backdoor' },
          { text: 'Anyone else have admin rights?', next: 'maria_admin' },
          { text: 'Back to menu', next: 'start' }
        ]
      },
      "analyze_backdoor": {
        speaker: "Maria - Sysadmin",
        text: "Malware Sandbox: The binary opens a reverse shell hourly to an external IP. Persistence detected.",
        objectivesCompleted: [0],
        options: [{ text: "Back to Maria", next: "maria_intro" }]
      },
      "maria_admin": {
        speaker: "Maria - Sysadmin",
        text: "Maria: 'Only me and the app lead. Their logs are clean.'",
        options: [{ text: "Back to Maria", next: "maria_intro" }]
      },
      "front_intro": {
        speaker: "Front Desk",
        text: 'Front Desk: "Maintenance" was here late, but system was down so I couldn\'t check if they were scheduled.',
        options: [{ text: 'Back to menu', next: 'start' }]
      },
      "recover_db": {
        speaker: "Maria - Sysadmin",
        text: "File Recovery Tool restores most records from last night's backup. Database mostly intact.",
        objectivesCompleted: [1],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "objectives": {
        speaker: "System",
        text: "Objectives:\n- Analyze persistent malware (Malware Sandbox)\n- Recover deleted database records (File Recovery Tool)\n- Investigate unauthorized scheduled tasks",
        options: [{ text: "Back", next: "start" }]
      }
    },
    failStates: {
      "fail_backdoor_not_analyzed": {
        speaker: "System",
        text: "You missed the backdoor file. The attacker gains persistent access to the system.<br><b>MISSION FAILED.</b>",
        options: [{ text: "Restart Mission", next: "start" }]
      },
      "fail_malware_not_analyzed": {
        speaker: "System",
        text: "You failed to analyze the persistent malware. Attackers maintain remote access to the government network.<br><b>MISSION FAILED.</b>",
        options: [{ text: "Restart Mission", next: "start" }]
      },
      // Soft Fail: Didn't restore database
      "fail_database_not_restored": {
        speaker: "System",
        text: "You failed to recover deleted database records. Some data is lost and audit will be harder.",
        options: [{ text: "Continue Anyway", next: "start" }]
      },
      "fail_timeout": {
        speaker: "System",
        text: "The malware spread too far. The government system is compromised.",
        options: [{ text: "Retry", next: "start" }]
      }
    },
  "level6": {
"start": {
        speaker: "System",
        text: "A rogue USB was found in the SCADA control system. Firmware seems altered.",
        options: [
          { text: "Talk to Rachel (Grid Operator)", next: "rachel_intro" },
          { text: "Speak with Security Desk", next: "security_intro" },
          { text: "Analyze USB (USB Analyzer)", toolRequired: "USB Analyzer", next: "analyze_usb" },
          { text: "Scan firmware (Firmware Scanner)", toolRequired: "Firmware Scanner", next: "scan_firmware" },
          { text: "Objectives", next: "objectives" }
        ]
      },
      "rachel_intro": {
        speaker: "Rachel - Grid Operator",
        text: "Rachel: 'The USB was plugged in at 3AM. Firmware looks different now.'",
        options: [
          { text: "Analyze USB (USB Analyzer)", toolRequired: "USB Analyzer", next: "analyze_usb" },
          { text: "Analyze firmware (Firmware Scanner)", toolRequired: "Firmware Scanner", next: "scan_firmware" },
          { text: "Any remote logins overnight?", next: "rachel_remote" },
          { text: "Back to menu", next: "start" }
        ]
      },
      "analyze_usb": {
        speaker: "Rachel - Grid Operator",
        text: "USB Analyzer: Finds a suspicious executable on the USB. Possible entry vector.",
        objectivesCompleted: [0],
        options: [{ text: "Back to Rachel", next: "rachel_intro" }]
      },
      "scan_firmware": {
        speaker: "Rachel - Grid Operator",
        text: "Firmware Scanner: Code injected in latest build. Alarm system code modified.",
        objectivesCompleted: [1],
        options: [{ text: "Back to Rachel", next: "rachel_intro" }]
      },
      "rachel_remote": {
        speaker: "Rachel - Grid Operator",
        text: "Rachel: 'Remote admin connection logged at 3AM. That's not us.'",
        objectivesCompleted: [2],
        options: [{ text: "Back to Rachel", next: "rachel_intro" }]
      },
      "security_intro": {
        speaker: "Security Desk",
        text: "Security Desk: 'Logs spiked at 3AM, right after someone brought in donuts.'",
        options: [{ text: "Back to menu", next: "start" }]
      },
      "objectives": {
        speaker: "System",
        text: "Objectives:\n- Find rogue USB (USB Analyzer)\n- Analyze firmware changes (Firmware Scanner)\n- Review remote access logs",
        options: [{ text: "Back", next: "start" }]
      }
    },
    failStates: {
      "fail_usb_not_analyzed": {
        speaker: "System",
        text: "You failed to analyze the rogue USB. Attackers deploy firmware-level malware and disrupt grid operations.<br><b>MISSION FAILED.</b>",
        options: [{ text: "Restart Mission", next: "start" }]
      },
      "fail_firmware_not_scanned": {
        speaker: "System",
        text: "You missed the firmware implant. It remains dormant—risk for future compromise.",
        options: [{ text: "Continue, But System Is Unstable", next: "start" }]
      },
      "fail_timeout": {
        speaker: "System",
        text: "The malware spread too far. The grid is compromised.",
        options: [{ text: "Retry", next: "start" }]
      }
    },
  "level7": {
    "start": {
        speaker: "System",
        text: "Sector-9 suspects an insider. Suspicious logins and an encrypted locker note.",
        options: [
          { text: "Interview Anita (Suspect)", next: "anita_intro" },
          { text: "Speak with Henry (HR)", next: "henry_intro" },
          { text: "Check cafeteria", next: "cafeteria_intro" },
          { text: "Analyze encrypted note (Encryption Cracker)", toolRequired: "Encryption Cracker", next: "analyze_note" },
          { text: "Review credential logs (Credential Monitor)", toolRequired: "Credential Monitor", next: "review_creds" },
          { text: "Objectives", next: "objectives" }
        ]
      },
      "anita_intro": {
        speaker: "Anita - Suspect",
        text: "Anita: 'My credentials were used, but it wasn't me! Someone must have cloned my access.'",
        options: [
          { text: "Check access logs (Credential Monitor)", toolRequired: "Credential Monitor", next: "review_creds" },
          { text: "Anything odd in your locker?", next: "anita_locker" },
          { text: "Back to menu", next: "start" }
        ]
      },
      "review_creds": {
        speaker: "Anita - Suspect",
        text: "Credential Monitor: Logins from Anita's account at 2:30AM—she has an alibi.",
        objectivesCompleted: [0],
        options: [{ text: "Back to Anita", next: "anita_intro" }]
      },
      "anita_locker": {
        speaker: "Anita - Suspect",
        text: "Anita: 'Found an encrypted note in my locker. Weird, right?'",
        options: [
          { text: "Analyze with Encryption Cracker", toolRequired: "Encryption Cracker", next: "analyze_note" },
          { text: "Back to Anita", next: "anita_intro" }
        ]
      },
      "analyze_note": {
        speaker: "Anita - Suspect",
        text: "Encryption Cracker: Note is a password for external exfiltration service.",
        objectivesCompleted: [1],
        options: [{ text: "Back to Anita", next: "anita_intro" }]
      },
      "henry_intro": {
        speaker: "Henry - HR",
        text: 'Henry: \'Kim and Lee both requested emergency leave. Kim said something about a "clean exit".\'',
        objectivesCompleted: [3],
        options: [{ text: 'Back to menu', next: 'start' }]
      },
      "cafeteria_intro": {
        speaker: "Cafeteria Staff",
        text: "Cafeteria Staff: 'Someone ordered ten espressos. Paid cash. Hoodie and sunglasses indoors.'",
        options: [{ text: "Back to menu", next: "start" }]
      },
      "objectives": {
        speaker: "System",
        text: "Objectives:\n- Analyze credential logs (Credential Monitor)\n- Investigate locker clue (Encryption Cracker)\n- Interview HR about leave\n- Review odd cafeteria activity",
        options: [{ text: "Back", next: "start" }]
      }
    },
    failStates: {
      "fail_creds_not_checked": {
        speaker: "System",
        text: "You failed to review credential access logs. The insider escapes and exfiltrates sensitive files.<br><b>MISSION FAILED.</b>",
        options: [{ text: "Restart Mission", next: "start" }]
      },
      "fail_locker_clue_ignored": {
        speaker: "System",
        text: "You missed a key locker clue. Unlocking staff accounts is delayed.",
        options: [{ text: "Continue Anyway", next: "start" }]
      },
      "fail_timeout": {
        speaker: "System",
        text: "The malware spread too far. The company\'s codebase is compromised.",
        options: [{ text: 'Retry', next: 'start' }]
      }
    },
  "level8": {
"start": {
        speaker: "System",
        text: "Zero-day auctions by PH4NT0M are live on the dark web. Ghostline's aliases are changing fast.",
        options: [
          { text: "Contact Cipher (Informant)", next: "cipher_intro" },
          { text: "Trace forum aliases (OSINT Suite)", toolRequired: "OSINT Suite", next: "trace_aliases" },
          { text: "Decrypt auction data (Message Decryptor)", toolRequired: "Message Decryptor", next: "decrypt_auction" },
          { text: "Objectives", next: "objectives" }
        ]
      },
      "cipher_intro": {
        speaker: "Cipher - Informant",
        text: "PH4NT0M's new post is encrypted. I'll trade it for a favor.",
        options: [
          { text: "Decrypt forum post (Message Decryptor)", toolRequired: "Message Decryptor", next: "decrypt_post" },
          { text: "Back to menu", next: "start" }
        ]
      },
      "decrypt_post": {
        speaker: "System",
        text: "Message Decryptor: Post decrypted—contains zero-day listing and meeting instructions.",
        objectivesCompleted: [0],
        options: [{ text: "Back to Cipher", next: "cipher_intro" }]
      },
      "trace_aliases": {
        speaker: "System",
        text: "OSINT Suite: Linguistic pattern matches found. Ghostline's real alias logged.",
        objectivesCompleted: [1],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "decrypt_auction": {
        speaker: "System",
        text: "Message Decryptor: Auction data reveals top bidders and payment wallets.",
        objectivesCompleted: [2],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "objectives": {
        speaker: "System",
        text: "Objectives:\n- Find PH4NT0M's forum post (Message Decryptor)\n- Trace Ghostline's aliases (OSINT Suite)\n- Decrypt auction data (Message Decryptor)",
        options: [{ text: "Back", next: "start" }]
      }
    },
    failStates: {
      "fail_forum_post_ignored": {
        speaker: "System",
        text: "You missed PH4NT0M's forum post. The next cyberattack cripples the city.<br><b>MISSION FAILED.</b>",
        options: [{ text: "Restart Mission", next: "start" }]
      },
      "fail_timeout": {
        speaker: "System",
        text: "The malware spread too far. The city is compromised.",
        options: [{ text: "Retry", next: "start" }]
      },
      "fail_aliases_not_traced": {
        speaker: "System",
        text: "You failed to trace Ghostline's aliases. They remain at large.",
        options: [{ text: "Continue, But The Trail Is Cold", next: "start" }]
      }
    },
  "level9": {
"start": {
        speaker: "System",
        text: "City transit is halted by a DDoS attack. Commuters are stuck. Systems are down.",
        options: [
          { text: "Interview Lina (Transit Supervisor)", next: "lina_intro" },
          { text: "Visit Coffee Stand", next: "coffee_intro" },
          { text: "Restore control center (DDoS Mitigator)", toolRequired: "DDoS Mitigator", next: "restore_control" },
          { text: "Patch service (Service Patch Tool)", toolRequired: "Service Patch Tool", next: "patch_service" },
          { text: "Remove rogue WiFi config (Service Patch Tool)", toolRequired: "Service Patch Tool", next: "remove_wifi" },
          { text: "Objectives", next: "objectives" }
        ]
      },
      "lina_intro": {
        speaker: "Lina - Transit Supervisor",
        text: "Lina: 'Everything crashed at 7:32AM. Ticket service is the likely entry point.'",
        options: [
          { text: "Analyze DDoS log (DDoS Mitigator)", toolRequired: "DDoS Mitigator", next: "analyze_ddos" },
          { text: "Any rogue WiFi configs?", next: "lina_wifi" },
          { text: "Back to menu", next: "start" }
        ]
      },
      "analyze_ddos": {
        speaker: "Lina - Transit Supervisor",
        text: "DDoS Mitigator: Source narrowed down. Botnet still hammering.",
        objectivesCompleted: [1],
        options: [{ text: "Back to Lina", next: "lina_intro" }]
      },
      "lina_wifi": {
        speaker: "Lina - Transit Supervisor",
        text: "Lina: 'Found a suspicious config file. IT removed it, but could be more.'",
        objectivesCompleted: [3],
        options: [{ text: "Back to Lina", next: "lina_intro" }]
      },
      "coffee_intro": {
        speaker: "Coffee Stand",
        text: "Coffee Stand: 'Machine crashed three times. I blame WiFi hackers. Guy in a hoodie was lurking.'",
        options: [{ text: "Back to menu", next: "start" }]
      },
      "restore_control": {
        speaker: "Lina - Transit Supervisor",
        text: "DDoS Mitigator brings control center back online. Trains are moving.",
        objectivesCompleted: [0],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "patch_service": {
        speaker: "Lina - Transit Supervisor",
        text: "Service Patch Tool: Ticket service buffer overflow patched.",
        objectivesCompleted: [2],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "remove_wifi": {
        speaker: "Lina - Transit Supervisor",
        text: "Service Patch Tool: Rogue WiFi config removed.",
        objectivesCompleted: [3],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "objectives": {
        speaker: "System",
        text: "Objectives:\n- Restore control center (DDoS Mitigator)\n- Analyze DDoS log (DDoS Mitigator)\n- Patch exploited service (Service Patch Tool)\n- Remove rogue WiFi config (Service Patch Tool)",
        options: [{ text: "Back", next: "start" }]
      }
    },
      failStates: {
        "fail_timeout": {
          speaker: "System",
          text: "The malware spread too far. The city is compromised.",
          options: [{ text: "Retry", next: "start" }]
        },
        // Hard Fail: Didn't analyze DDoS logs, attack repeats
        "fail_ddos_not_analyzed": {
          speaker: "System",
          text: "You failed to analyze DDoS logs. The attack repeats and the city loses control of transit.<br><b>MISSION FAILED.</b>",
          options: [{ text: "Restart Mission", next: "start" }]
        },
        // Soft Fail: Didn't remove rogue WiFi
        "fail_wifi_not_removed": {
          speaker: "System",
          text: "You didn't remove rogue WiFi configs. Systems are exposed to new threats.",
          options: [{ text: "Continue, But With Vulnerabilities", next: "start" }]
        }
      },
  "level10": {
      "start": {
        speaker: "System",
        text: "The final showdown. Worm 'Silent Strings' is loose. Ghostline is watching. Time to save the world.",
        options: [
          { text: "Report to Director", next: "director_intro" },
          { text: "Consult Reception Bot", next: "reception_bot" },
          { text: "Disarm worm (Worm Deactivator)", toolRequired: "Worm Deactivator", next: "disarm_worm" },
          { text: "Trace worm propagation (Code Tracer)", toolRequired: "Code Tracer", next: "trace_worm" },
          { text: "Decrypt Ghostline's message (Message Decryptor)", toolRequired: "Message Decryptor", next: "decrypt_message" },
          { text: "Objectives", next: "objectives" }
        ]
      },
      "director_intro": {
        speaker: "Director",
        text: "Director: 'Agent, the protocol is active. The worm is propagating through Asia and Europe. You must act now!'",
        options: [{ text: "Back to menu", next: "start" }]
      },
      "reception_bot": {
        speaker: "Reception Bot",
        text: "Reception Bot: 'Welcome, Agent. Remember: the cake is a lie. Security is at maximum.'",
        options: [{ text: "Back to menu", next: "start" }]
      },
      "disarm_worm": {
        speaker: "System",
        text: "Worm Deactivator: You neutralize the Silent Strings worm. World systems stabilize.",
        objectivesCompleted: [0],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "trace_worm": {
        speaker: "System",
        text: "Code Tracer: You track worm propagation, neutralize global hotspots.",
        objectivesCompleted: [1],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "decrypt_message": {
        speaker: "System",
        text: "Message Decryptor: Ghostline's final message reads: 'The strings are cut, but the music plays on.'",
        objectivesCompleted: [2],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "objectives": {
        speaker: "System",
        text: "Objectives:\n- Disarm Silent Strings protocol (Worm Deactivator)\n- Trace global worm propagation (Code Tracer)\n- Decrypt Ghostline's final message (Message Decryptor)",
        options: [{ text: "Back", next: "start" }]
      }
    },
    failStates: {
      // Hard Fail: Didn't disarm protocol, global disaster
      "fail_protocol_not_disarmed": {
        speaker: "System",
        text: "You failed to disarm the Silent Strings protocol. Global chaos ensues.<br><b>MISSION FAILED.</b>",
        options: [{ text: "Restart Final Mission", next: "start" }]
      },
      // Soft Fail: Didn't decrypt Ghostline's message
      "fail_message_not_decrypted": {
        speaker: "System",
        text: "You didn't decrypt Ghostline's last message. The true identity is lost.",
        options: [{ text: "Continue, But With Unanswered Questions", next: "start" }]
      },
      "fail_timeout": {
        speaker: "System",
        text: "The worm spread too far. The world is compromised.",
        options: [{ text: "Retry", next: "start" }]
      }
  }
};
