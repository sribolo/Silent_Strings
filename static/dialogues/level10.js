const level10Dialogues = {
    meta: { /* ...meta as before... */ },
    nodes: {
      "start": {
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
        text: "Director: 'Agent, the protocol is active. The worm is propagating through Asia and Europe. You must act now!'",
        options: [{ text: "Back to menu", next: "start" }]
      },
      "reception_bot": {
        text: "Reception Bot: 'Welcome, Agent. Remember: the cake is a lie. Security is at maximum.'",
        options: [{ text: "Back to menu", next: "start" }]
      },
      "disarm_worm": {
        text: "Worm Deactivator: You neutralize the Silent Strings worm. World systems stabilize.",
        objectivesCompleted: [0],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "trace_worm": {
        text: "Code Tracer: You track worm propagation, neutralize global hotspots.",
        objectivesCompleted: [1],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "decrypt_message": {
        text: "Message Decryptor: Ghostline’s final message reads: 'The strings are cut, but the music plays on.'",
        objectivesCompleted: [2],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "objectives": {
        text: "Objectives:\n- Disarm Silent Strings protocol (Worm Deactivator)\n- Trace global worm propagation (Code Tracer)\n- Decrypt Ghostline's final message (Message Decryptor)",
        options: [{ text: "Back", next: "start" }]
      }
    }
  };
  