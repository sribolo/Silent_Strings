// Investigation Page Script
// Handles background, menu, modals, dialogue, objectives, and notes

// --- Location Background ---
function setBackgroundImage() {
    const bgDiv = document.querySelector('.location-background');
    if (!bgDiv) return;
    const locKey = bgDiv.dataset.location || 'hq';
    const map = {
        'hq': 'hq',
        'news': 'company_1',
        'bank': 'bank',
        'cafe': 'cafe',
        'transport': 'transport',
        'school': 'school',
        'government': 'government',
        'hospital': 'company',
        'company': 'company',
        'global': 'hq'
    };
    const actual = map[locKey] || 'hq';
    const url = `/static/images/backgrounds/${actual}.png`;
    bgDiv.style.backgroundImage = `url('${url}')`;
}

// --- Menu & Modal Logic ---
function setupMenuAndModals() {
    const hamburger = document.getElementById('hamburger-menu');
    const dropdown = document.getElementById('dropdown-menu');
    if (hamburger && dropdown) {
        hamburger.addEventListener('click', e => {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        });
        document.addEventListener('click', e => {
            if (!e.target.closest('.hamburger-menu') && !e.target.closest('.dropdown-menu .menu-item')) {
                dropdown.classList.add('hidden');
            }
        });
    }
    // Tool modals
    addToolEvent('interview-btn', startInterview);
    addToolEvent('scan-btn', () => showToolModal('Evidence Scanner', `<button id="run-scan-btn" class="action-btn"><i class="fas fa-search"></i> Run System Scan</button><div id="scan-result" class="result-container"></div>`));
    addToolEvent('analyze-btn', () => showToolModal('Digital Analysis', `<button id="run-analysis-btn" class="action-btn"><i class="fas fa-microscope"></i> Analyze Evidence</button><div id="analysis-result" class="result-container"></div>`));
    addToolEvent('notes-btn', () => {
        const notes = localStorage.getItem('investigationNotes') || '';
        showToolModal('Mission Notes', `<textarea id="notes-text" placeholder="Record your findings..." class="notes-textarea">${notes}</textarea><button id="save-notes-btn" class="action-btn notes-save-btn"><i class="fas fa-save"></i> Save Notes</button>`);
    });
    // Modal close
    const closeModal = document.getElementById('close-modal');
    if (closeModal) closeModal.onclick = () => document.getElementById('tool-modal').classList.add('hidden');
    // Help modal
    const helpBtn = document.getElementById('help-btn');
    const helpModal = document.getElementById('help-modal');
    const helpClose = document.getElementById('help-close');
    if (helpBtn && helpModal) helpBtn.addEventListener('click', () => { helpModal.classList.add('active'); helpModal.style.display = 'flex'; });
    if (helpClose && helpModal) helpClose.addEventListener('click', () => { helpModal.classList.remove('active'); helpModal.style.display = 'none'; });
    if (helpModal) helpModal.addEventListener('click', (e) => { if (e.target === helpModal) { helpModal.classList.remove('active'); helpModal.style.display = 'none'; } });
    // Hint modal
    const hintBtn = document.getElementById('hint-btn');
    const hintBox = document.getElementById('hint-box');
    if (hintBtn && hintBox) hintBtn.addEventListener('click', () => { showHint(); });
}
function addToolEvent(id, handler) {
    const btn = document.getElementById(id);
    const dropdown = document.getElementById('dropdown-menu');
    if (btn) {
        btn.addEventListener('click', () => {
            dropdown.classList.add('hidden');
            try { handler(); } catch (error) { console.error(`Error in handler for ${id}:`, error); }
        });
    }
}
function showToolModal(title, content) {
    const modal = document.getElementById('tool-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalTitle || !modalBody) return alert(`${title}: Feature not available`);
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.classList.remove('hidden');
    // Attach modal button events
    if (title === 'Evidence Scanner') {
        const runScanBtn = document.getElementById('run-scan-btn');
        if (runScanBtn) runScanBtn.onclick = runScan;
    } else if (title === 'Digital Analysis') {
        const runAnalysisBtn = document.getElementById('run-analysis-btn');
        if (runAnalysisBtn) runAnalysisBtn.onclick = runAnalysis;
    } else if (title === 'Mission Notes') {
        const saveNotesBtn = document.getElementById('save-notes-btn');
        if (saveNotesBtn) saveNotesBtn.onclick = saveNotes;
    }
}

// --- Objectives UI ---
function markObjectiveComplete(idx) {
    const list = document.getElementById('objectives-list');
    if (!list) return;
    const item = list.querySelector(`li[data-index='${idx}']`);
    if (item) {
        item.classList.add('completed');
        const status = item.querySelector('.objective-status');
        if (status) status.textContent = '[✓]';
    }
}

// --- Dialogue/Storyboard System ---
// Example dialogue data (replace with backend or JS import)
const exampleDialogues = {
    'hq': [
        { npc: 'Director', text: 'Welcome to SECTOR-9. Your investigation begins now.', choices: [ { text: 'Understood.', next: 1 } ] },
        { npc: 'Director', text: 'Use the menu to interview staff, scan for evidence, and complete your objectives.', choices: [] }
    ],
    'bank': [
        { npc: 'Bank IT', text: 'We detected suspicious activity in the logs.', choices: [ { text: 'Show me.', next: 1 } ] },
        { npc: 'Bank IT', text: 'Here are the logs. Can you find the breach?', choices: [] }
    ]
    // Add more locations as needed
};
let currentDialogue = 0;
let currentDialogueData = [];
function startInterview() {
    const bg = document.querySelector('.location-background');
    const loc = bg ? bg.dataset.location : 'hq';
    currentDialogueData = exampleDialogues[loc] || exampleDialogues['hq'];
    currentDialogue = 0;
    showDialogueLine();
}
function showDialogueLine() {
    const d = currentDialogueData[currentDialogue];
    if (!d) return;
    document.getElementById('npc-name').textContent = d.npc;
    typeText(d.text, document.getElementById('dialogue-text'));
    const choicesBox = document.getElementById('dialogue-choices');
    choicesBox.innerHTML = '';
    if (d.choices && d.choices.length) {
        d.choices.forEach((c, i) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = c.text;
            btn.onclick = () => {
                if (typeof c.next !== 'undefined') {
                    currentDialogue = c.next;
                    showDialogueLine();
                }
            };
            choicesBox.appendChild(btn);
        });
        document.getElementById('dialogue-continue').classList.add('hidden');
    } else {
        document.getElementById('dialogue-continue').classList.remove('hidden');
        document.getElementById('dialogue-continue').onclick = () => resetDialogue();
    }
}
function resetDialogue() {
    document.getElementById('npc-name').textContent = 'SECTOR-9 Command';
    document.getElementById('dialogue-text').textContent = 'Investigation ongoing. Use the menu for additional tools.';
    document.getElementById('dialogue-choices').innerHTML = '';
    document.getElementById('dialogue-continue').classList.add('hidden');
}
function typeText(txt, el) {
    if (!el) return;
    el.textContent = '';
    let i = 0;
    function type() {
        if (i < txt.length) {
            el.textContent += txt[i++];
            setTimeout(type, 12);
        }
    }
    type();
}

// --- NPC Portrait (placeholder, can be extended) ---
function setNpcPortrait() {
    // You can extend this to show different avatars per NPC
    // For now, just leave as is (empty div for .avatar-layer images)
}

// --- Tool Actions ---
function runScan() {
    markObjectiveComplete(0);
    const el = document.getElementById('scan-result');
    if (el) el.innerHTML = '<div class="success-message"><strong>Scan Complete:</strong> Suspicious files detected.</div>';
}
function runAnalysis() {
    markObjectiveComplete(1);
    const el = document.getElementById('analysis-result');
    if (el) el.innerHTML = '<div class="warning-message"><strong>Analysis Complete:</strong> Malware signatures found.</div>';
}
function saveNotes() {
    const notes = document.getElementById('notes-text').value;
    localStorage.setItem('investigationNotes', notes);
    showToast('Notes saved!');
}
function showToast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#28a745;color:#fff;padding:12px 24px;border-radius:8px;z-index:9999;font-family:\'Share Tech Mono\',monospace;animation:fadeInOut 3s ease-in-out;';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

// --- Hint System (placeholder) ---
function showHint() {
    const hintBox = document.getElementById('hint-box');
    const hintContent = document.getElementById('hint-content');
    if (hintBox && hintContent) {
        hintContent.textContent = 'Try interviewing all available NPCs and using your tools!';
        hintBox.classList.remove('hidden');
        hintBox.style.display = 'flex';
        setTimeout(() => { hintBox.classList.add('hidden'); hintBox.style.display = 'none'; }, 4000);
    }
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    setBackgroundImage();
    setupMenuAndModals();
    setNpcPortrait();
    resetDialogue();
});
