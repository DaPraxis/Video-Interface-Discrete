import AbstractGame from "./AbstractGame.js";

export default class TrialBasedGame extends AbstractGame {
  constructor(args, totalTrials) {
    super(args);
    this.currentTrial = 0;
    this.totalTrials = totalTrials;
  }

  _chooseHoles(state) {
    throw new Error("Not implemented");
  }

  chooseHoles(state) {
    // default implementation: return default mole in random spot
    this.hasHit = false;
    this.hasHitEmpty = false;
    if (this.currentTrial === this.totalTrials) {
      this.resolveGameEnd();
      return [];
    } else {
      this.currentTrial++;
      return this._chooseHoles(state);
    }
  }

  async interStimulusEvent(setOverlay, moles, setMoles) {
    if (this.currentTrial === this.totalTrials) {
      return Promise.resolve;
    }
    return new Promise((resolve, reject) => {
      this.timeoutManager.setTimeout(resolve, this.moleInterval);
    });
  }

  adjustTrials() {}

  endGame() {
    return new Promise((resolve, reject) => {
      this.resolveGameEnd = resolve;
    });
  }
}
