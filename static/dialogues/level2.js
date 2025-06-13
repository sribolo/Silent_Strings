const level2Dialogues = {
    meta: { /* ...meta as above... */ },
    nodes: {
      "start": {
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
        text: "Emma (flustered): 'Ticker script looks off. We got password reset emails—Billy fell for it. I want my old job back.'",
        options: [
          { text: "Review ticker with JS Analyzer", toolRequired: "JS Analyzer", next: "analyze_ticker" },
          { text: "Ask about weird emails", next: "emma_emails" },
          { text: "Back to main menu", next: "start" }
        ]
      },
      "analyze_ticker": {
        text: "JS Analyzer flags an XSS payload. Headlines restored. Emma: 'Please never let this happen again.'",
        objectivesCompleted: [1, 0],
        options: [{ text: "Back to Emma", next: "emma_intro" }]
      },
      "emma_emails": {
        text: "Emma: 'IT said reset password, but the email looked weird. Billy’s laptop is now possessed.'",
        options: [{ text: "Back to Emma", next: "emma_intro" }]
      },
      "david_intro": {
        text: "David: 'Management delayed plugin patches. Guess who gets the blame? Defacement started from an admin panel log-in—maybe a VPN.'",
        options: [
          { text: "Patch plugin (Service Patch Tool)", toolRequired: "Service Patch Tool", next: "patch_plugin" },
          { text: "Get admin logs", toolRequired: "Email Scanner", next: "admin_logs" },
          { text: "Back to main menu", next: "start" }
        ]
      },
      "patch_plugin": {
        text: "Plugin patched. Website secured. David: 'Now maybe I can get some sleep.'",
        objectivesCompleted: [3],
        options: [{ text: "Back to David", next: "david_intro" }]
      },
      "admin_logs": {
        text: "Email Scanner finds a phishing campaign. Source: suspicious Russian IP. David sighs.",
        objectivesCompleted: [2],
        options: [{ text: "Back to David", next: "david_intro" }]
      },
      "billy_intro": {
        text: "Billy: 'Sorry, boss! Clicked the wrong link, got a new browser toolbar…with cat videos.'",
        options: [
          { text: "Scan Billy’s machine", toolRequired: "Email Scanner", next: "scan_billy" },
          { text: "Back to main menu", next: "start" }
        ]
      },
      "scan_billy": {
        text: "Phishing email and malware found. Billy looks sheepish. 'Won't happen again… probably.'",
        options: [{ text: "Back to Billy", next: "billy_intro" }]
      },
      "review_code": {
        text: "Injected JavaScript found and removed. Website is now clean.",
        objectivesCompleted: [1],
        options: [{ text: "Back to main menu", next: "start" }]
      },
      "objectives": {
        text: "Objectives:\n- Remove malicious headline script (JS Analyzer)\n- Analyze XSS payload (JS Analyzer)\n- Trace phishing email source (Email Scanner)\n- Patch CMS/plugin (Service Patch Tool)",
        options: [{ text: "Back", next: "start" }]
      }
    },
    failStates: {
      "timeout": {
        text: "Attackers posted more offensive content. PR disaster! Try again.",
        options: [{ text: "Retry", next: "start" }]
      }
    }
  };
  