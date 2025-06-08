// Tool Management
let tools = { scanInterval: null, crackInterval: null, recoveryInterval: null };

// Initialize tools
document.addEventListener('DOMContentLoaded', () => {
    initializeToolButtons();
    initializeToolActions();
});

function initializeToolButtons() {
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(button => {
        button.addEventListener('click', () => {
            const toolId = button.dataset.tool;
            switchTool(toolId);
        });
    });
}

function switchTool(toolId) {
    // Hide all tool interfaces
    document.querySelectorAll('.tool-interface').forEach(interface => {
        interface.style.display = 'none';
    });
    
    // Show selected tool interface
    const selectedTool = document.getElementById(`${toolId}-interface`);
    if (selectedTool) {
        selectedTool.style.display = 'block';
    }
}

function initializeToolActions() {
    // Network Scanner
    const startScanBtn = document.getElementById('start-scan');
    const stopScanBtn = document.getElementById('stop-scan');
    
    if (startScanBtn && stopScanBtn) {
        startScanBtn.addEventListener('click', startNetworkScan);
        stopScanBtn.addEventListener('click', stopNetworkScan);
    }

    // Log Analyzer
    const analyzeLogsBtn = document.getElementById('analyze-logs');
    if (analyzeLogsBtn) {
        analyzeLogsBtn.addEventListener('click', analyzeLogs);
    }

    // Password Cracker
    const crackHashBtn = document.getElementById('crack-hash');
    if (crackHashBtn) {
        crackHashBtn.addEventListener('click', crackPassword);
    }

    // File Recovery
    const recoverFileBtn = document.getElementById('recover-file');
    if (recoverFileBtn) {
        recoverFileBtn.addEventListener('click', recoverFile);
    }
}

// Network Scanner Functions
function startNetworkScan() {
    const startBtn = document.getElementById('start-scan');
    const stopBtn = document.getElementById('stop-scan');
    const progressBar = document.querySelector('#network-scanner-interface .progress-bar-fill');
    const status = document.querySelector('#network-scanner-interface .scan-status');
    const output = document.getElementById('scan-output');
    startBtn.disabled = true;
    stopBtn.disabled = false;
    let progress = 0;
    output.textContent = '';
    status.textContent = 'Scanning... 0%';
    progressBar.style.width = '0%';
    tools.scanInterval = setInterval(() => {
        progress += 5;
        progressBar.style.width = `${progress}%`;
        status.textContent = `Scanning... ${progress}%`;
        if (progress % 20 === 0) {
            output.textContent += `Found device: ${generateRandomDevice()}\n`;
        }
        if (progress >= 100) {
            stopNetworkScan();
            status.textContent = 'Scan complete';
            if (typeof window.markObjectiveComplete === 'function') window.markObjectiveComplete(0);
        }
    }, 500);
}

function stopNetworkScan() {
    const startBtn = document.getElementById('start-scan');
    const stopBtn = document.getElementById('stop-scan');
    const status = document.querySelector('#network-scanner-interface .scan-status');
    clearInterval(tools.scanInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    status.textContent = 'Scan stopped';
}

// Log Analyzer Functions
function analyzeLogs() {
    const logType = document.getElementById('log-type').value;
    const searchTerm = document.getElementById('log-search').value;
    const timeStart = document.getElementById('log-time-start').value;
    const timeEnd = document.getElementById('log-time-end').value;
    const output = document.getElementById('log-output');
    output.textContent = `Analyzing ${logType} logs...\nSearch term: ${searchTerm}\nTime range: ${timeStart} to ${timeEnd}\n\n`;
    output.textContent += generateSampleLogs(logType).join('\n');
    if (typeof window.markObjectiveComplete === 'function') window.markObjectiveComplete(1);
}

// Password Cracker Functions
function crackPassword() {
    const hashInput = document.getElementById('hash-input');
    const progressBar = document.querySelector('#password-cracker-interface .progress-bar-fill');
    const status = document.querySelector('#password-cracker-interface .crack-status');
    const output = document.getElementById('crack-output');
    if (!hashInput.value) {
        output.textContent = 'Please enter a hash to crack';
        return;
    }
    let progress = 0;
    status.textContent = 'Cracking...';
    output.textContent = '';
    tools.crackInterval = setInterval(() => {
        progress += 2;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(tools.crackInterval);
            const crackedPassword = generateRandomPassword();
            output.textContent = `Hash cracked!\nOriginal hash: ${hashInput.value}\nPassword: ${crackedPassword}`;
            status.textContent = 'Complete';
            if (typeof window.markObjectiveComplete === 'function') window.markObjectiveComplete(2);
        }
    }, 100);
}

// File Recovery Functions
function recoverFile() {
    const filePath = document.getElementById('file-path');
    const progressBar = document.querySelector('#file-recovery-interface .progress-bar-fill');
    const status = document.querySelector('#file-recovery-interface .recovery-status');
    const output = document.getElementById('recovery-output');
    if (!filePath.value) {
        output.textContent = 'Please enter a file path';
        return;
    }
    let progress = 0;
    status.textContent = 'Recovering...';
    output.textContent = '';
    tools.recoveryInterval = setInterval(() => {
        progress += 3;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(tools.recoveryInterval);
            const recoveredContent = generateRecoveredFile();
            output.textContent = `File recovered!\nPath: ${filePath.value}\n\nContent:\n${recoveredContent}`;
            status.textContent = 'Complete';
            if (typeof window.markObjectiveComplete === 'function') window.markObjectiveComplete(3);
        }
    }, 100);
}

// Helper Functions
function generateRandomDevice() {
    const devices = [
        '192.168.1.1 - Router',
        '192.168.1.2 - Workstation',
        '192.168.1.3 - Server',
        '192.168.1.4 - Printer',
        '192.168.1.5 - Security Camera'
    ];
    return devices[Math.floor(Math.random() * devices.length)];
}

function generateSampleLogs(logType) {
    const logs = [];
    const now = new Date();
    
    for (let i = 0; i < 10; i++) {
        const time = new Date(now - i * 60000);
        const timestamp = time.toISOString();
        
        switch (logType) {
            case 'system':
                logs.push(`[${timestamp}] SYSTEM: Service started: ${['sshd', 'apache2', 'mysql'][Math.floor(Math.random() * 3)]}`);
                break;
            case 'security':
                logs.push(`[${timestamp}] SECURITY: ${['Login attempt', 'Access denied', 'Password changed'][Math.floor(Math.random() * 3)]}`);
                break;
            case 'application':
                logs.push(`[${timestamp}] APP: ${['Database connection', 'Cache cleared', 'Backup completed'][Math.floor(Math.random() * 3)]}`);
                break;
        }
    }
    
    return logs;
}

function generateRandomPassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
}

function generateRecoveredFile() {
    const fileTypes = [
        'CONFIDENTIAL: Project plans for Q2 2024\n- Budget allocation\n- Team assignments\n- Timeline adjustments',
        'SUSPICIOUS: Unauthorized access detected\nIP: 192.168.1.100\nTime: 02:15:33\nAction: File deletion',
        'ENCRYPTED: System configuration backup\nVersion: 2.1.4\nLast modified: 2024-03-15\nStatus: Corrupted'
    ];
    return fileTypes[Math.floor(Math.random() * fileTypes.length)];
} 