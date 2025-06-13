const level8Dialogues = {
    meta: { /* ...meta as before... */ },
    nodes: {
      "start": {
        text: "Zero-day auctions by PH4NT0M are live on the dark web. Ghostline’s aliases are changing fast.",
        options: [
          { text: "Contact Cipher (Informant)", next: "cipher_intro" },
          { text: "Trace forum aliases (OSINT Suite)", toolRequired: "OSINT Suite", next: "trace_aliases" },
          { text: "Decrypt auction data (Message Decryptor)", toolRequired: "Message Decryptor", next: "decrypt_auction" },
          { text: "Objectives", next: "objectives" }
        ]
      },
      "cipher_intro": {
        text: "Cipher: 'PH4NT0M’s new post is encrypted. I'll trade it for a favor.'",
        options: [
          { text: "Decrypt forum post (Message Decryptor)", toolRequired: "Message Decryptor", next: "decrypt_post" },
          { text: "Back to menu", next: "start" }
        ]
      },
      "decrypt_post": {
        text: "Message Decryptor: Post decrypted—contains zero-day listing and meeting instructions.",
        objectivesCompleted: [0],
        options: [{ text: "Back to Cipher", next: "cipher_intro" }]
      },
      "trace_aliases": {
        text: "OSINT Suite: Linguistic pattern matches found. Ghostline’s real alias logged.",
        objectivesCompleted: [1],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "decrypt_auction": {
        text: "Message Decryptor: Auction data reveals top bidders and payment wallets.",
        objectivesCompleted: [2],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "objectives": {
        text: "Objectives:\n- Find PH4NT0M's forum post (Message Decryptor)\n- Trace Ghostline's aliases (OSINT Suite)\n- Decrypt auction data (Message Decryptor)",
        options: [{ text: "Back", next: "start" }]
      }
    }
  };
  