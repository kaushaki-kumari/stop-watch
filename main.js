
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');

let timerInterval;
let startTime = 0;

/* update time display */
function updateTimeDisplay() {
    const minutes = Math.floor(startTime / 60).toString().padStart(2, '0');
    const seconds = (startTime % 60).toString().padStart(2, '0');
    timeDisplay.textContent = `${minutes}:${seconds}`;
}

/* work on start timer */
function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        startTime++;
        updateTimeDisplay();
    }, 1000);

  
    stopBtn.style.display = "inline";
    startBtn.style.display="none";
}

function stopTimer() {
    clearInterval(timerInterval)
    timerInterval = null;
    stopBtn.style.display = "none";
    startBtn.style.display = "inline";
}

function resetTimer() {
    stopTimer();
    startTime = 0;
    updateTimeDisplay();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer)
updateTimeDisplay();
