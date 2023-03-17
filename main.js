window.addEventListener('load', () => {
  const timerDisplay = document.querySelector('.display__time-left');
  const endTime = document.querySelector('.display__end-time');
  const buttons = document.querySelectorAll('[data-time]');
  let countdown;

  const beep = new Audio('sound/Beep Beep.mp3');

  function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      // check if we should stop it!
      if (secondsLeft < 0) {
        clearInterval(countdown);
        beep.play();
        return;
      }
      // display it
      displayTimeLeft(secondsLeft);
    }, 1000);
  }
  // timer(1200);

  function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const reminderSeconds = seconds % 60;
    const display = `${minutes}:${
      reminderSeconds < 10 ? '0' : ''
    }${reminderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display; // to display in the browser tab.
  }

  function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    endTime.textContent = `Be Back At ${adjustedHour}:${
      minutes < 10 ? '0' : ''
    }${minutes}`;
  }

  function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
  }

  function manualStart(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
  }
  buttons.forEach((button) => button.addEventListener('click', startTimer));
  document.customForm.addEventListener('submit', manualStart);
});
