// Wait until DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('save-settings-btn');
    const musicToggle = document.getElementById('music-toggle');
    const sfxToggle = document.getElementById('sfx-toggle');
    const profilePublicToggle = document.getElementById('profile-public-toggle');
    const bgm = document.getElementById('bgm');

    // Immediate effect for music toggle
    if (musicToggle && bgm) {
        // Set initial state based on checkbox
        if (!musicToggle.checked) {
            bgm.pause();
            bgm.muted = true;
        } else {
            bgm.muted = false;
            if (bgm.paused) bgm.play();
        }

        // Listen for changes
        musicToggle.addEventListener('change', function() {
            if (!musicToggle.checked) {
                bgm.pause();
                bgm.muted = true;
                localStorage.setItem('music_enabled', 'false');
            } else {
                bgm.muted = false;
                bgm.play();
                localStorage.setItem('music_enabled', 'true');
            }
        });
    }

    // Save settings to backend
    if (btn) {
        btn.addEventListener('click', function() {
            fetch('/save-settings', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    sfx_enabled: sfxToggle ? sfxToggle.checked : true,
                    music_enabled: musicToggle ? musicToggle.checked : true,
                    profile_public: profilePublicToggle ? profilePublicToggle.checked : true
                })
            })
            .then(res => res.json())
            .then(data => {
                // Apply settings immediately after saving
                if (bgm) {
                    if (!musicToggle.checked) {
                        bgm.pause();
                        bgm.muted = true;
                    } else {
                        bgm.muted = false;
                        if (bgm.paused) bgm.play();
                    }
                }
                showToast('Settings saved!');
            })
            .catch(error => {
                console.error('Fetch error:', error);
                showToast('Failed to save settings!', 'error');
            });
        });
    }

    // MFA Setup Button
    const startMfaSetupBtn = document.getElementById('start-mfa-setup-btn');
    if (startMfaSetupBtn) {
        startMfaSetupBtn.addEventListener('click', function() {
            // Reload the page to generate new QR code
            window.location.reload();
        });
    }

    // MFA Setup Verification
    const setupMfaBtn = document.getElementById('setup-mfa-btn');
    if (setupMfaBtn) {
        setupMfaBtn.addEventListener('click', function() {
            const otpInput = document.getElementById('setup-mfa-otp');
            const otpCode = otpInput.value.trim();
            
            if (otpCode.length !== 6) {
                showToast('Please enter a 6-digit code', 'error');
                return;
            }
            
            fetch('/setup-mfa', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ otp_code: otpCode })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showToast('MFA enabled successfully!', 'success');
                    setTimeout(() => window.location.reload(), 1500);
                } else {
                    showToast(data.error || 'Failed to enable MFA', 'error');
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                showToast('Failed to enable MFA', 'error');
            });
        });
    }

    // Disable MFA Button
    const disableMfaBtn = document.getElementById('disable-mfa-btn');
    if (disableMfaBtn) {
        disableMfaBtn.addEventListener('click', function() {
            const modal = document.getElementById('disable-mfa-modal');
            if (modal) {
                modal.style.display = 'block';
            }
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // OTP input formatting
    const otpInputs = document.querySelectorAll('input[type="text"][maxlength="6"]');
    otpInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Auto-submit when 6 digits are entered
            if (this.value.length === 6) {
                const setupBtn = document.getElementById('setup-mfa-btn');
                const disableBtn = document.querySelector('.modal-button.confirm');
                
                if (setupBtn && this.id === 'setup-mfa-otp') {
                    setupBtn.click();
                } else if (disableBtn && this.id === 'disable-mfa-otp') {
                    disableBtn.click();
                }
            }
        });
    });
});

// Global functions for modals and MFA
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function disableMFA() {
    const otpInput = document.getElementById('disable-mfa-otp');
    const otpCode = otpInput.value.trim();
    
    if (otpCode.length !== 6) {
        showToast('Please enter a 6-digit code', 'error');
        return;
    }
    
    fetch('/disable-mfa', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ otp_code: otpCode })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showToast('MFA disabled successfully!', 'success');
            closeModal('disable-mfa-modal');
            setTimeout(() => window.location.reload(), 1500);
        } else {
            showToast(data.error || 'Failed to disable MFA', 'error');
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        showToast('Failed to disable MFA', 'error');
    });
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = type === 'error' ? '#ff6b6b' : type === 'success' ? '#38d39f' : '#6C5CE7';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '9999';
    toast.style.fontSize = '1em';
    toast.style.fontFamily = 'Share Tech Mono, monospace';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    toast.style.transition = 'opacity 0.3s ease';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
