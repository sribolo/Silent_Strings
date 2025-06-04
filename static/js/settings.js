function saveSettings() {
    console.log("Save button clicked!");
    fetch('/save-settings', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            sfx_enabled: document.getElementById('sfx-toggle').checked,
            music_enabled: document.getElementById('music-toggle').checked
        })
    }).then(res => res.json()).then(data => {
        alert('Settings saved!');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('save-settings-btn');
    if (btn) {
        btn.addEventListener('click', saveSettings);
    }
});