// Wait until DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('save-settings-btn');
    const musicToggle = document.getElementById('music-toggle');
    const sfxToggle = document.getElementById('sfx-toggle');
    const bgm = document.getElementById('bgm');

    // Immediate effect for music toggle
    if (musicToggle && bgm) {
        // Set initial state based on checkbox
        bgm.muted = !musicToggle.checked;
        if (!musicToggle.checked) {
            bgm.pause();
        } else {
            // Only play if not already playing
            if (bgm.paused) bgm.play();
        }

        // Listen for changes
        musicToggle.addEventListener('change', function() {
            bgm.muted = !musicToggle.checked;
            if (!musicToggle.checked) {
                bgm.pause();
                // Optionally save to localStorage
                localStorage.setItem('music_enabled', 'false');
            } else {
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
                    music_enabled: musicToggle ? musicToggle.checked : true
                })
            })
            .then(res => res.json())
            .then(data => {
                alert('Settings saved!');
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert('Failed to save settings!');
            });
        });
    }
});
