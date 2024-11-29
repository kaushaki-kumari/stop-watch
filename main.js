
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapTable = document.getElementById('lap-table');
const lapBody = document.getElementById('lap-body');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lastLapTime = 0;
let lapCount = 0;
let isRunning = false;

/* update time display */
function updateTimeDisplay(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const miliseconds = Math.floor((milliseconds % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(miliseconds).padStart(2, "0")}`;
}

/*  start timer */
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeDisplay.textContent = updateTimeDisplay(elapsedTime);
    }, 10);

    isRunning = true;
    startBtn.style.display = "none";
    stopBtn.style.display = "inline-Block";
    resetBtn.style.display = "inline-Block";
    lapBtn.style.display = "inline-Block"
}

/* stop timer */
function stopTimer() {
    clearInterval(timerInterval)
    isRunning = false;
    stopBtn.style.display = "none";
    lapBtn.style.display = "none"
    startBtn.style.display = "inline-Block";
    resetBtn.style.display = "inlne-Block";
}

/*  reset timer */
function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    lastLapTime = 0;
    lapCount = 0;
    lapBody.innerHTML = "";
    timeDisplay.textContent = "00:00:00";
    lapTable.style.display = "none";
    stopBtn.style.display = "none";
    resetBtn.style.display = "none";
    lapBtn.style.display = "none";
    startBtn.style.display = "inline-Block";

}


/*  lap table */
function lapList() {
    if (!isRunning) return;

    lapCount++;

    const currentLapTime = elapsedTime;
    const totalTime = elapsedTime;

    lapTable.style.display = "table";

    const lapRow = document.createElement("tr");
    lapRow.innerHTML = `
      <td>${lapCount}</td>
      <td>${updateTimeDisplay(currentLapTime - lastLapTime)}</td>
      <td>${updateTimeDisplay(totalTime)}</td>
    `;

    lapBody.prepend(lapRow);
    lastLapTime = currentLapTime;
}


startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapList);

