const bells = new Audio("./bell.wav");
const startBtn = document.querySelector(".btn-start");
const resetBtn = document.querySelector(".btn-reset");
const sessionInput = document.querySelector("#session-input");
const session = document.querySelector(".minutes");
let myInterval;
let state = true;

const appTimer = () => {
  const sessionAmount = Number.parseInt(sessionInput.value);

  if (state) {
    state = false;
    sessionInput.disabled = true;
    session.textContent = sessionAmount;
    document.querySelector(".seconds").textContent = "00";
    let totalSeconds = sessionAmount * 60;

    const updateSeconds = () => {
      const minuteDiv = document.querySelector(".minutes");
      const secondDiv = document.querySelector(".seconds");

      totalSeconds--;

      let minutesLeft = Math.floor(totalSeconds / 60);
      let secondsLeft = totalSeconds % 60;

      if (secondsLeft < 10) {
        secondDiv.textContent = "0" + secondsLeft;
      } else {
        secondDiv.textContent = secondsLeft;
      }
      minuteDiv.textContent = `${minutesLeft}`;

      if (minutesLeft === 0 && secondsLeft === 0) {
        bells.play();
        clearInterval(myInterval);
        state = true;
        sessionInput.disabled = false;
      }
    };

    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert("Session has already started.");
  }
};

const resetTimer = () => {
  clearInterval(myInterval);
  state = true;
  sessionInput.disabled = false;
  session.textContent = sessionInput.value;
  document.querySelector(".seconds").textContent = "00";
};

startBtn.addEventListener("click", appTimer);
resetBtn.addEventListener("click", resetTimer);
