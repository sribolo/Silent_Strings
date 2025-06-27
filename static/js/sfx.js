// Sound effects system
const sfx = {
    // Cache for loaded sounds
    sounds: {},
    
    // Initialize sound effects
    init() {
        // Preload UI sounds if needed
        // this.loadSound('click', '/static/sfx/click.mp3');
        // this.loadSound('hover', '/static/sfx/hover.mp3');
        // this.loadSound('success', '/static/sfx/success.mp3');
        
        // Set BGM volume using the HTML audio element
        const bgm = document.getElementById('bgm');
        if (bgm) {
            bgm.volume = 0.3;
            
            // Check localStorage for music state
            const musicEnabled = localStorage.getItem('music_enabled');
            if (musicEnabled === 'false') {
                bgm.pause();
                bgm.muted = true;
            } else {
                bgm.muted = false;
                if (bgm.paused) bgm.play();
            }
        }
    },
    
    // Load a sound file
    loadSound(name, path) {
        const audio = new Audio(path);
        audio.preload = 'auto';
        this.sounds[name] = audio;
    },
    
    // Play a sound
    play(name) {
        const sound = this.sounds[name];
        if (sound) {
            // Clone the audio to allow overlapping sounds
            const soundClone = sound.cloneNode();
            soundClone.volume = 0.2; 
            soundClone.play().catch(e => console.log('Audio play failed:', e));
        }
    },
    
    // Set UI sounds volume
    setUIVolume(volume) {
        Object.values(this.sounds).forEach(sound => {
            sound.volume = volume;
        });
    }
};

// Initialize sounds and BGM sync when document is ready
document.addEventListener('DOMContentLoaded', () => {
    sfx.init();
    
    // ==== BGM Resume & Persistent Enable/Disable Logic ====
    const bgm = document.getElementById('bgm');
    if (bgm) {
        // Restore previous BGM time (if available)
        const lastTime = localStorage.getItem('bgm-time');
        if (lastTime !== null) {
            try {
                bgm.currentTime = parseFloat(lastTime);
            } catch(e) { /* ignore errors */ }
        }

        // Save current BGM time before leaving the page
        window.addEventListener('beforeunload', function() {
            if (!bgm.muted) {
                localStorage.setItem('bgm-time', bgm.currentTime);
            }
        });
    }
    // ==== End BGM Resume & Persistent Enable/Disable Logic ====

    // Add hover sound to all pixel buttons
    document.querySelectorAll('.pixel-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => sfx.play('hover'));
        btn.addEventListener('click', () => sfx.play('click'));
    });
    
    // Add click sound to all buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => sfx.play('click'));
    });

    // ==== Listen for settings change (only on settings page) ====
    const musicToggle = document.getElementById('music-toggle');
    if (musicToggle && bgm) {
        musicToggle.addEventListener('change', function() {
            if (musicToggle.checked) {
                bgm.muted = false;
                bgm.play();
                localStorage.setItem('music_enabled', 'true');
            } else {
                bgm.muted = true;
                bgm.pause();
                localStorage.setItem('music_enabled', 'false');
            }
        });
    }
    // ==== End settings listener ====
});
