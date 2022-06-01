import AbstractGame from "./AbstractGame.js";

export default class TimeBasedGame extends AbstractGame {
  constructor(args, numSeconds) {
    super(args);
    this.currentTrial = 0;
    this.totalSeconds = numSeconds;
    this.timesUp = false;
  }

  ignoreTrial() {
    // not useful
  }

  endGame() {
    return new Promise((resolve, reject) => {
      this.timeoutManager.setTimeout(resolve, this.totalSeconds * 1000);
      // setTimeout(() => {
      //   this.timesUp = true;
      // }, this.totalSeconds * 1000 - 600);
    });
  }
}
