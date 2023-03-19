const timer = document.getElementById("timer");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");
const btnReset = document.getElementById("btn-reset");

let timerId;
let workSession = true;
let minutes = 25;
let seconds = 0;
let isRunning = false;


function startTimer() {
  timerId = setInterval(() => {
    seconds--;

    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }

    if (minutes < 0) {
      clearInterval(timerId);
      workSession = !workSession;

      if (workSession) {
        minutes = 25;
        seconds = 0;
        btnStart.textContent = "Iniciar";
        btnStop.style.display = "none";
        btnReset.style.display = "none";
      } else {
        minutes = 5;
        seconds = 0;
      }
      
      startTimer();
    }

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    timer.textContent = `${formattedMinutes}:${formattedSeconds}`;
  }, 1000);
}

btnStart.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    btnStart.textContent = "Retomar";
    btnStop.style.display = "inline-block";
    btnReset.style.display = "inline-block";
    startTimer();
  }
});

btnStop.addEventListener("click", () => {
  clearInterval(timerId);
  btnStart.textContent = "Retomar";
  isRunning = false;
});

btnReset.addEventListener("click", () => {
  clearInterval(timerId);
  timer.textContent = "25:00";
  btnStart.textContent = "Iniciar";
  btnStop.style.display = "none";
  btnReset.style.display = "none";
  workSession = true;
  isRunning = false;
});

