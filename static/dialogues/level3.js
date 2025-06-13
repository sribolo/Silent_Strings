const level3Dialogues = {
    meta: { /* ...meta as above... */ },
    nodes: {
      "start": {
        text: "Bank HQ is on lockdown. Ransomware demands blink on every screen. Time to move.",
        options: [
          { text: "Talk to Jennifer (Teller)", next: "jennifer_intro" },
          { text: "Check with Rajesh (IT)", next: "rajesh_intro" },
          { text: "Interview Bank Guard", next: "guard_intro" },
          { text: "Objectives", next: "objectives" }
        ]
      },
      "jennifer_intro": {
        text: "Jennifer (shaken): 'Got an urgent email from HR, opened the PDF, then everything froze. Sorry.'",
        options: [
          { text: "Get email and PDF sample (Email Analyzer)", toolRequired: "Email Analyzer", next: "get_email" },
          { text: "Warn other tellers", next: "warn_tellers" },
          { text: "Back to main menu", next: "start" }
        ]
      },
      "get_email": {
        text: "You isolate the phishing email and ransom note. It's a targeted campaign.",
        objectivesCompleted: [1, 2],
        options: [{ text: "Back to Jennifer", next: "jennifer_intro" }]
      },
      "warn_tellers": {
        text: "Jennifer warns the others. Only she opened it. Patient zero identified.",
        objectivesCompleted: [0],
        options: [{ text: "Back to Jennifer", next: "jennifer_intro" }]
      },
      "rajesh_intro": {
        text: "Rajesh (IT): 'Sample’s on the shared drive. Network shows classic SMB worm spread.'",
        options: [
          { text: "Recover malware sample (File Recovery Tool)", toolRequired: "File Recovery Tool", next: "recover_sample" },
          { text: "Analyze network logs (Log Analyzer)", toolRequired: "Log Analyzer", next: "analyze_network" },
          { text: "Restore from backup", toolRequired: "File Recovery Tool", next: "restore_backup" },
          { text: "Back to main menu", next: "start" }
        ]
      },
      "recover_sample": {
        text: "File Recovery Tool grabs the ransomware binary. Objective complete.",
        objectivesCompleted: [2],
        options: [{ text: "Back to Rajesh", next: "rajesh_intro" }]
      },
      "analyze_network": {
        text: "Log Analyzer reveals lateral movement after initial email compromise. Map of spread built.",
        objectivesCompleted: [3],
        options: [{ text: "Back to Rajesh", next: "rajesh_intro" }]
      },
      "restore_backup": {
        text: "You restore from a clean backup. Services slowly return.",
        objectivesCompleted: [4],
        options: [{ text: "Back to Rajesh", next: "rajesh_intro" }]
      },
      "guard_intro": {
        text: "Bank Guard: 'Jennifer looked spooked after that email. ATM kept beeping too.'",
        options: [{ text: "Back to main menu", next: "start" }]
      },
      "objectives": {
        text: "Objectives:\n- Identify patient zero (Email Analyzer)\n- Analyze phishing email (Email Analyzer)\n- Recover ransomware sample (File Recovery Tool)\n- Trace network spread (Log Analyzer)\n- Restore banking services (File Recovery Tool)",
        options: [{ text: "Back", next: "start" }]
      }
    }
    // Add failStates as needed
  };
  