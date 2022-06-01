export class Timeout {
  constructor(callback, time) {
    this.callback = callback;
    this.time = time;
    this.started = true;
    this.startTime = Date.now();
    this.paused = false;
    this.pauseTime = null;
    this.complete = false;
    this.jsTimeout = setTimeout(() => {
      this.callback();
      this.complete = true;
    }, this.time);
  }

  resume() {
    if (!this.paused) return;

    if (!this.started) {
      // if not started, start it
      this.started = true;
      this.paused = false;

      this.jsTimeout = setTimeout(() => {
        this.callback();
        this.complete = true;
      }, this.time);
    } else if (this.complete) {
      // if finished, do nothing
      this.jsTimeout = null;
    } else {
      // if started but not finished, make new timeout with remaining time
      this.jsTimeout = setTimeout(() => {
        this.callback();
        this.complete = true;
      }, this.time - (this.pauseTime - this.startTime));
    }
    this.paused = false;
  }

  pause() {
    if (this.paused) return;

    clearTimeout(this.jsTimeout);
    this.pauseTime = Date.now();
    this.paused = true;
  }

  isFinished() {
    return this.complete;
  }
}

export class TimeoutManager {
  constructor() {
    this.timeouts = [];
    this.paused = false;
    this.isRunning = true;
  }

  setTimeout(callback, time) {
    if (this.isRunning) {
      this.removeComplete();
      let newTimeout = new Timeout(callback, time);
      if (this.paused) {
        newTimeout.pause();
      }
      this.timeouts.push(newTimeout);
      return newTimeout;
    }
  }

  pause() {
    for (let timeout of this.timeouts) timeout.pause();
    this.paused = true;
    this.removeComplete();
  }

  resume() {
    this.removeComplete();
    for (let timeout of this.timeouts) timeout.resume();
    this.paused = false;
  }

  togglePaused() {
    if (this.paused) this.resume();
    else this.pause();
  }

  removeComplete() {
    let i = 0;
    while (i < this.timeouts.length) {
      if (this.timeouts[i].complete) this.timeouts.splice(i, 1);
      else i++;
    }
  }

  remove(timeout) {
    timeout.pause();
    let index = this.timeouts.indexOf(timeout);
    if (index > -1) {
      this.timeouts.splice(index, 1);
      return true;
    }
    return false;
  }

  removeAll() {
    for (let timeout of this.timeouts) timeout.pause();
    this.timeouts = [];
  }
}
