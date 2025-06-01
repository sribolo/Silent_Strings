// Sound effects system
const sfx = {
    // Cache for loaded sounds
    sounds: {},
    bgm: null,
    
    // Initialize sound effects
    init() {
        // Initialize background music
        this.bgm = new Audio('/static/sfx/bgm.wav');
        this.bgm.loop = true;
        this.bgm.volume = 0.3; // Set BGM volume to 30%
        
        // Preload UI sounds
        this.loadSound('click', '/static/sfx/click.mp3');
        this.loadSound('hover', '/static/sfx/hover.mp3');
        this.loadSound('success', '/static/sfx/success.mp3');
        
        // Start background music
        this.playBGM();
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
    
    // Play background music
    playBGM() {
        this.bgm.play().catch(e => console.log('BGM play failed:', e));
    },
    
    // Pause background music
    pauseBGM() {
        this.bgm.pause();
    },
    
    // Set background music volume
    setBGMVolume(volume) {
        this.bgm.volume = volume;
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