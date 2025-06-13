const level9Dialogues = {
    meta: { /* ...meta as before... */ },
    nodes: {
      "start": {
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
        text: "Lina: 'Everything crashed at 7:32AM. Ticket service is the likely entry point.'",
        options: [
          { text: "Analyze DDoS log (DDoS Mitigator)", toolRequired: "DDoS Mitigator", next: "analyze_ddos" },
          { text: "Any rogue WiFi configs?", next: "lina_wifi" },
          { text: "Back to menu", next: "start" }
        ]
      },
      "analyze_ddos": {
        text: "DDoS Mitigator: Source narrowed down. Botnet still hammering.",
        objectivesCompleted: [1],
        options: [{ text: "Back to Lina", next: "lina_intro" }]
      },
      "lina_wifi": {
        text: "Lina: 'Found a suspicious config file. IT removed it, but could be more.'",
        objectivesCompleted: [3],
        options: [{ text: "Back to Lina", next: "lina_intro" }]
      },
      "coffee_intro": {
        text: "Coffee Stand: 'Machine crashed three times. I blame WiFi hackers. Guy in a hoodie was lurking.'",
        options: [{ text: "Back to menu", next: "start" }]
      },
      "restore_control": {
        text: "DDoS Mitigator brings control center back online. Trains are moving.",
        objectivesCompleted: [0],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "patch_service": {
        text: "Service Patch Tool: Ticket service buffer overflow patched.",
        objectivesCompleted: [2],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "remove_wifi": {
        text: "Service Patch Tool: Rogue WiFi config removed.",
        objectivesCompleted: [3],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "objectives": {
        text: "Objectives:\n- Restore control center (DDoS Mitigator)\n- Analyze DDoS log (DDoS Mitigator)\n- Patch exploited service (Service Patch Tool)\n- Remove rogue WiFi config (Service Patch Tool)",
        options: [{ text: "Back", next: "start" }]
      }
    }
  };
  