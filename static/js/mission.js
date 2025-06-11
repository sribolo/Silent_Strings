// Mission page JS (extracted from inline script)

window.addEventListener('DOMContentLoaded', () => {
  const dataDiv = document.getElementById('mission-data');
  if (!dataDiv) return; // No data, bail out

  // Parse dataset
  window.completedObjectives = JSON.parse(dataDiv.dataset.completed || '[]');
  window.totalObjectives = parseInt(dataDiv.dataset.total || '0');
  window.missionLocation = dataDiv.dataset.location;
  let timeLeft = parseInt(dataDiv.dataset.time || '1800'); // seconds

  // ------------------- TIMER -------------------
  const timerValue = document.getElementById('timer-value');
  function updateTimer() {
    if (!timerValue) return;
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    timerValue.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
    if (timeLeft > 0) {
      timeLeft--;
      setTimeout(updateTimer, 1000);
    } else {
      const timerEl = document.getElementById('mission-timer');
      if (timerEl) timerEl.textContent = 'Mission Failed!';
    }
  }
  if (timerValue) updateTimer();

  // ------------------- OBJECTIVE HANDLERS -------------------
  window.saveObjectives = function () {
    fetch(window.location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: window.completedObjectives })
    });
  };

  function showObjectiveToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.position = 'fixed';
    toast.style.bottom = '28px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#232323';
    toast.style.color = '#38d39f';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '12px';
    toast.style.zIndex = '9999';
    toast.style.fontSize = '1.1em';
    toast.style.boxShadow = '0 2px 16px #0008';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1500);
  }

  window.markObjectiveComplete = function (index) {
    if (!window.completedObjectives.includes(index)) {
      window.completedObjectives.push(index);
      window.saveObjectives();
      const li = document.querySelector(`li[data-index="${index}"]`);
      if (li) {
        const status = li.querySelector('.objective-status');
        if (status) {
          status.textContent = '[✓]';
          status.style.color = '#38d39f';
        }
        li.classList.add('completed');
      }
      showObjectiveToast('Objective completed!');
      if (window.completedObjectives.length === window.totalObjectives) {
        showObjectiveToast('All objectives completed!');
      }
    }
  };

  // ------------------- TOOL TABS -------------------
  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tool-interface').forEach(div => (div.style.display = 'none'));
      const toolId = btn.getAttribute('data-tool');
      const interfaceDiv = document.getElementById(`${toolId}-interface`);
      if (interfaceDiv) interfaceDiv.style.display = 'block';
    });
  });
}); 