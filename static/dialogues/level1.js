const level1Dialogues = {
    meta: { /* ...same as above... */ },
    nodes: {
      "start": {
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
        text: "Marcus (slumped, exhausted): 'Someone’s wiped logs, reset passwords, and there’s a phantom admin login at 2:03AM. If you spot what I missed, buy you coffee.'",
        options: [
          { text: "Let me review the logs.", next: "view_logs" },
          { text: "Any recent USBs plugged in?", next: "usb_logs" },
          { text: "Who was in the building at 2AM?", next: "building_logs" },
          { text: "Return to main menu", next: "start" }
        ]
      },
      "view_logs": {
        text: "The logs are full of gaps. 'Log Analyzer' might spot something.",
        options: [
          { text: "Use Log Analyzer", toolRequired: "Log Analyzer", next: "analyze_logs" },
          { text: "Try File Recovery Tool on logs", toolRequired: "File Recovery Tool", next: "restore_logs" },
          { text: "Return to Marcus", next: "marcus_intro" }
        ]
      },
      "analyze_logs": {
        text: "Log Analyzer highlights an admin login from 192.168.7.44 at 2:03AM. 'That account wasn’t scheduled,' Marcus mutters.",
        objectivesCompleted: [1],
        options: [
          { text: "Trace IP with Network Scanner", toolRequired: "Network Scanner", next: "trace_ip" },
          { text: "Return to Marcus", next: "marcus_intro" }
        ]
      },
      "restore_logs": {
        text: "File Recovery Tool recovers deleted entries—admin password reset at 2:04AM, different device.",
        objectivesCompleted: [3],
        options: [
          { text: "Secure account with Password Cracker", toolRequired: "Password Cracker", next: "secure_account" },
          { text: "Return to Marcus", next: "marcus_intro" }
        ]
      },
      "trace_ip": {
        text: "Network Scanner shows breach started at the Network Hub—where the odd traffic began.",
        objectivesCompleted: [0, 2],
        options: [
          { text: "Return to Marcus", next: "marcus_intro" },
          { text: "Return to main menu", next: "start" }
        ]
      },
      "secure_account": {
        text: "You lock out the attacker. Marcus: 'That’s a relief. Maybe now I can sleep.'",
        objectivesCompleted: [4],
        options: [{ text: "Return to Marcus", next: "marcus_intro" }]
      },
      // SARAH BRANCH
      "sarah_intro": {
        text: "Sarah: 'Night was mostly quiet, but the generator rebooted at 2AM, and a USB showed up in the lift.'",
        options: [
          { text: "Ask about generator logs", next: "generator_logs" },
          { text: "Take USB to IT Lab for scan", toolRequired: "Network Scanner", next: "scan_usb" },
          { text: "Anyone else on camera at 2AM?", next: "camera_footage" },
          { text: "Return to main menu", next: "start" }
        ]
      },
      "generator_logs": {
        text: "Sarah: 'System flickered, then stabilized. Generator log flagged anomaly at 2:01AM.'",
        options: [{ text: "Return to Sarah", next: "sarah_intro" }]
      },
      "scan_usb": {
        text: "You find credential-stealing malware on the USB. Sarah looks pale.",
        options: [{ text: "Return to Sarah", next: "sarah_intro" }]
      },
      "camera_footage": {
        text: "Sarah: 'Footage is fuzzy, but someone in a hoodie loitered by the Network Hub after midnight.'",
        options: [{ text: "Return to Sarah", next: "sarah_intro" }]
      },
      // JANITOR BRANCH
      "janitor_intro": {
        text: "Carlos: 'You know it’s a bad night when the IT guy is more jittery than the coffee machine. I saw a hoodie by the server room at 12:30.'",
        options: [
          { text: "Did you see a badge?", next: "janitor_badge" },
          { text: "Notice anything missing?", next: "janitor_missing" },
          { text: "Return to main menu", next: "start" }
        ]
      },
      "janitor_badge": {
        text: "Carlos: 'No badge. They ducked out quick. If you check the trash, might still be clues.'",
        options: [{ text: "Return to Janitor", next: "janitor_intro" }]
      },
      "janitor_missing": {
        text: "Carlos: 'My headphones disappeared. If you find them, music’s on me.'",
        options: [{ text: "Return to Janitor", next: "janitor_intro" }]
      },
      // RECEPTION BRANCH
      "reception_intro": {
        text: "Mia: 'This place is madness. Only unusual thing: security was extra jumpy after the generator hiccuped.'",
        options: [
          { text: "Any odd sign-ins overnight?", next: "odd_signins" },
          { text: "Return to main menu", next: "start" }
        ]
      },
      "odd_signins": {
        text: "Mia: 'Nothing obvious, but the intern keeps losing his badge. Check the logs for details.'",
        options: [{ text: "Return to Mia", next: "reception_intro" }]
      },
      // OBJECTIVES VIEW
      "objectives": {
        text: "Objectives:\n- Identify breach point (Network Scanner)\n- Analyze suspicious login attempts (Log Analyzer)\n- Trace the attacker's IP (Network Scanner)\n- Recover deleted logs (File Recovery Tool)\n- Secure compromised accounts (Password Cracker)",
        options: [{ text: "Back to investigation", next: "start" }]
      }
    },
    failStates: {
      "timeout": {
        text: "You hesitated too long. The attacker covered their tracks. HQ is locked down for full forensics.",
        options: [{ text: "Retry", next: "start" }]
      }
    }
  };
  