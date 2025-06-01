// Sound effects system
const sfx = {
    // Cache for loaded sounds
    sounds: {},
    
    // Initialize sound effects
    init() {
        // Preload UI sounds
        /*this.loadSound('click', '/static/sfx/click.mp3');
        this.loadSound('hover', '/static/sfx/hover.mp3');
        this.loadSound('success', '/static/sfx/success.mp3');*/
        
        // Set BGM volume using the HTML audio element
        const bgm = document.getElementById('bgm');
        if (bgm) {
            bgm.volume = 0.3;
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
            soundClone.volume = 0.2; // Set UI sounds to 20% volume
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

// Initialize sounds when document is ready
document.addEventListener('DOMContentLoaded', () => {
    sfx.init();
    
    // Add hover sound to all pixel buttons
    document.querySelectorAll('.pixel-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => sfx.play('hover'));
        btn.addEventListener('click', () => sfx.play('click'));
    });
    
    // Add click sound to all buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => sfx.play('click'));
    });
}); 