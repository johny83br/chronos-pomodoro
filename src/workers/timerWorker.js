let isRunning = false;

self.onmessage = function (event) {
  if (isRunning) return;

  isRunning = true;

  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  const endDate = activeTask.startDate + secondsRemaining * 1000;
  const now = Date.now();
  let secondsLeft = Math.round((endDate - now) / 1000);

  function tick() {
    self.postMessage(secondsLeft);

    const now = Date.now();
    secondsLeft = Math.floor((endDate - now) / 1000);

    setTimeout(tick, 1000);
  }

  tick();
};
