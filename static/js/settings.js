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
                if (data.status === 'ok') {
                    alert('Settings saved!');
                } else {
                    alert('Failed to save settings: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert('Failed to save settings!');
            });
        });
    }

    // MFA Button
    const enableMfaBtn = document.getElementById('enable-mfa-btn');
    const mfaQrCodeDiv = document.getElementById('mfa-qr-code');
    if (enableMfaBtn) {
        enableMfaBtn.addEventListener('click', function() {
            fetch('/enable-mfa')
                .then(response => response.blob())
                .then(blob => {
                    const qrUrl = URL.createObjectURL(blob);
                    mfaQrCodeDiv.innerHTML = `
                        <img src="${qrUrl}" alt="MFA QR Code">
                        <p>Scan this QR code with your authenticator app, then verify.</p>
                        <a href="/verify-mfa" class="profile-link">Verify Token</a>
                    `;
                    mfaQrCodeDiv.style.display = 'block';
                })
                .catch(error => {
                    console.error('MFA QR code error:', error);
                    alert('Could not generate MFA QR code.');
                });
        });
    }

    // Delete account confirmation
    const deleteForm = document.getElementById('delete-account-form');
    if (deleteForm) {
        deleteForm.addEventListener('submit', function(e) {
            if (!confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
                e.preventDefault();
            }
        });
    }
});
