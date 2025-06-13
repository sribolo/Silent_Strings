const level5Dialogues = {
    meta: { /* ...meta as before... */ },
    nodes: {
      "start": {
        text: "An unauthorized scheduled task was found on a government system. There’s evidence of persistence.",
        options: [
          { text: "Interview Maria (Sysadmin)", next: "maria_intro" },
          { text: "Speak with Front Desk", next: "front_intro" },
          { text: "Analyze backdoor file (Malware Sandbox)", toolRequired: "Malware Sandbox", next: "analyze_backdoor" },
          { text: "Recover database records (File Recovery Tool)", toolRequired: "File Recovery Tool", next: "recover_db" },
          { text: "Objectives", next: "objectives" }
        ]
      },
      "maria_intro": {
        text: "Maria: 'Scheduled task “totally_safe.exe” was set to run every hour. I quarantined the binary.'",
        options: [
          { text: "Analyze with Malware Sandbox", toolRequired: "Malware Sandbox", next: "analyze_backdoor" },
          { text: "Anyone else have admin rights?", next: "maria_admin" },
          { text: "Back to menu", next: "start" }
        ]
      },
      "analyze_backdoor": {
        text: "Malware Sandbox: The binary opens a reverse shell hourly to an external IP. Persistence detected.",
        objectivesCompleted: [0],
        options: [{ text: "Back to Maria", next: "maria_intro" }]
      },
      "maria_admin": {
        text: "Maria: 'Only me and the app lead. Their logs are clean.'",
        options: [{ text: "Back to Maria", next: "maria_intro" }]
      },
      "front_intro": {
        text: "Front Desk: '“Maintenance” was here late, but system was down so I couldn’t check if they were scheduled.'",
        options: [{ text: "Back to menu", next: "start" }]
      },
      "recover_db": {
        text: "File Recovery Tool restores most records from last night’s backup. Database mostly intact.",
        objectivesCompleted: [1],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "objectives": {
        text: "Objectives:\n- Analyze persistent malware (Malware Sandbox)\n- Recover deleted database records (File Recovery Tool)\n- Investigate unauthorized scheduled tasks",
        options: [{ text: "Back", next: "start" }]
      }
    }
  };
  