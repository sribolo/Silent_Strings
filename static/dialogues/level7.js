const level7Dialogues = {
    meta: { /* ...meta as before... */ },
    nodes: {
      "start": {
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
        text: "Anita: 'My credentials were used, but it wasn’t me! Someone must have cloned my access.'",
        options: [
          { text: "Check access logs (Credential Monitor)", toolRequired: "Credential Monitor", next: "review_creds" },
          { text: "Anything odd in your locker?", next: "anita_locker" },
          { text: "Back to menu", next: "start" }
        ]
      },
      "review_creds": {
        text: "Credential Monitor: Logins from Anita’s account at 2:30AM—she has an alibi.",
        objectivesCompleted: [0],
        options: [{ text: "Back to Anita", next: "anita_intro" }]
      },
      "anita_locker": {
        text: "Anita: 'Found an encrypted note in my locker. Weird, right?'",
        options: [
          { text: "Analyze with Encryption Cracker", toolRequired: "Encryption Cracker", next: "analyze_note" },
          { text: "Back to Anita", next: "anita_intro" }
        ]
      },
      "analyze_note": {
        text: "Encryption Cracker: Note is a password for external exfiltration service.",
        objectivesCompleted: [1],
        options: [{ text: "Back to Anita", next: "anita_intro" }]
      },
      "henry_intro": {
        text: "Henry: 'Kim and Lee both requested emergency leave. Kim said something about a \"clean exit\".'",
        objectivesCompleted: [3],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "cafeteria_intro": {
        text: "Cafeteria Staff: 'Someone ordered ten espressos. Paid cash. Hoodie and sunglasses indoors.'",
        options: [{ text: "Back to menu", next: "start" }]
      },
      "objectives": {
        text: "Objectives:\n- Analyze credential logs (Credential Monitor)\n- Investigate locker clue (Encryption Cracker)\n- Interview HR about leave\n- Review odd cafeteria activity",
        options: [{ text: "Back", next: "start" }]
      }
    }
  };
  