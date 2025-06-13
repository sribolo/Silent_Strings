const level6Dialogues = {
    meta: { /* ...meta as before... */ },
    nodes: {
      "start": {
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
        text: "Rachel: 'The USB was plugged in at 3AM. Firmware looks different now.'",
        options: [
          { text: "Analyze USB (USB Analyzer)", toolRequired: "USB Analyzer", next: "analyze_usb" },
          { text: "Analyze firmware (Firmware Scanner)", toolRequired: "Firmware Scanner", next: "scan_firmware" },
          { text: "Any remote logins overnight?", next: "rachel_remote" },
          { text: "Back to menu", next: "start" }
        ]
      },
      "analyze_usb": {
        text: "USB Analyzer: Finds a suspicious executable on the USB. Possible entry vector.",
        objectivesCompleted: [0],
        options: [{ text: "Back to Rachel", next: "rachel_intro" }]
      },
      "scan_firmware": {
        text: "Firmware Scanner: Code injected in latest build. Alarm system code modified.",
        objectivesCompleted: [1],
        options: [{ text: "Back to Rachel", next: "rachel_intro" }]
      },
      "rachel_remote": {
        text: "Rachel: 'Remote admin connection logged at 3AM. That’s not us.'",
        objectivesCompleted: [2],
        options: [{ text: "Back to Rachel", next: "rachel_intro" }]
      },
      "security_intro": {
        text: "Security Desk: 'Logs spiked at 3AM, right after someone brought in donuts.'",
        options: [{ text: "Back to menu", next: "start" }]
      },
      "objectives": {
        text: "Objectives:\n- Find rogue USB (USB Analyzer)\n- Analyze firmware changes (Firmware Scanner)\n- Review remote access logs",
        options: [{ text: "Back", next: "start" }]
      }
    }
  };
  