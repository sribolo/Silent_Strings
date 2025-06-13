const level4Dialogues = {
    meta: { /* ...meta as before... */ },
    nodes: {
      "start": {
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
        text: "Chloe: 'Someone skipped review with a “test backdoor”. Pipeline flagged a reused token. I’m furious.'",
        options: [
          { text: "Check pipeline logs (Pipeline Monitor)", toolRequired: "Pipeline Monitor", next: "check_pipeline" },
          { text: "Who pushed the commit?", next: "commit_author" },
          { text: "Back to menu", next: "start" }
        ]
      },
      "check_pipeline": {
        text: "Pipeline Monitor: One token used for multiple suspicious pushes.",
        objectivesCompleted: [1],
        options: [{ text: "Back to Chloe", next: "chloe_intro" }]
      },
      "commit_author": {
        text: "Chloe: 'Tom’s account. He swears he’s innocent.'",
        objectivesCompleted: [2],
        options: [{ text: "Back to Chloe", next: "chloe_intro" }]
      },
      "tom_intro": {
        text: "Tom: 'I reused my repo password. I’m really sorry. I reset it now.'",
        options: [
          { text: "Check if Tom’s credentials are now secure", toolRequired: "Credential Monitor", next: "check_tom" },
          { text: "Ever shared your token?", next: "tom_token" },
          { text: "Back to menu", next: "start" }
        ]
      },
      "check_tom": {
        text: "Credential Monitor: Tom’s credentials are reset and unique.",
        options: [{ text: "Back to Tom", next: "tom_intro" }]
      },
      "tom_token": {
        text: "Tom: 'Never! But I might have clicked a weird email…'",
        options: [{ text: "Back to Tom", next: "tom_intro" }]
      },
      "priya_intro": {
        text: "Priya: 'We need two-factor for everyone. Only a crisis gets management to listen.'",
        options: [{ text: "Back to menu", next: "start" }]
      },
      "audit_commits": {
        text: "Code Diff Tool reveals a malicious commit named 'Backdoor for testing.' You revert it. Repo is secure.",
        objectivesCompleted: [0, 3],
        options: [{ text: "Back to menu", next: "start" }]
      },
      "objectives": {
        text: "Objectives:\n- Audit recent commits (Code Diff Tool)\n- Investigate pipeline warnings (Pipeline Monitor)\n- Identify compromised dev account\n- Revert malicious commit (Code Diff Tool)",
        options: [{ text: "Back", next: "start" }]
      }
    }
  };
  