import React from "react";
import MoleState from "../components/game-manager/Objects.js";
import TrialBasedGame from "./TrialBasedGame.js";
import TimeBasedGame from "./TimeBasedGame.js";
import { randomPermutation } from "../lib/permutations";
import audio from "../audio";

let lightning;

if (true) {
  lightning = require(".."+"/assets/lightning.gif");
} else {
  lightning = ".."+"/assets/lightning.gif";
}

const COLOURS = ["regular", "orange", "purple"];

export class TrialBasedTagMeSwitch extends TrialBasedGame {
  rule;
  consecutiveCount;
  playLightning;
  ruleSwitch;

  constructor(
    isPractice,
    numMoles = 60,
    moleDuration = 0,
    moleInterval = 2000,
    consecutiveCorrect = 4
  ) {
    super(
      {
        gameName: "TAG-ME Switch",
        dataName: "TagMeSwitch",
        initNumMoles: 3,
        initNumRows: 1,
        moleInterval: moleInterval,
        moleDuration: moleDuration,
        cryDuration: 500,
        moleLayout: [[0, 1, 2]],
        startPoint: "trial",
        isPractice: isPractice,
      },
      numMoles
    );
    this.rule = this.newRule();
    this.ruleSwitch = 1;
    this.consecutiveCount = 0;
    this.consecutiveCorrect = consecutiveCorrect;
    this.playLightning = false;
  }

  newRule() {
    this.ruleSwitch = 1;
    this.consecutiveCount = 0;
    let newRule = this.rule;
    while (newRule === this.rule || !newRule) {
      // 50% chance of the rule being based on colour
      let colourRule = Math.random() < 0.5;
      let num = Math.floor(Math.random() * 3);
      if (colourRule) newRule = COLOURS[num];
      else newRule = num;
    }
    return newRule;
  }

  _chooseHoles(state) {
    let perm = randomPermutation(3);
    let out = [
      new MoleState(perm[0], COLOURS[0]),
      new MoleState(perm[1], COLOURS[1]),
      new MoleState(perm[2], COLOURS[2]),
    ];
    if (this.consecutiveCount >= this.consecutiveCorrect) {
      this.rule = this.newRule();
    }
    return out;
  }

  score(allHolesInfo, holeInfo, moleDownTime, moleUpTime) {
    // this.rule should still be up to date, as long as score is called before next mole is chosen
    // failsafe
    if (!holeInfo) {
      this.consecutiveCount = 0;
      return ["", -1, 2, "miss"];
    }

    this.hasHit = true;

    if (holeInfo.id === this.rule || holeInfo.type === this.rule) {
      this.consecutiveCount += 1;
      if (this.consecutiveCount >= this.consecutiveCorrect) {
        this.playLightning = true;
      }
      return ["happy", 1, null, "correct hit"];
    }
    this.consecutiveCount = 0;
    return ["sad", -1, null, "false alarm"];
  }

  async interStimulusEvent(setOverlay, moles, setMoles) {
    if (this.currentTrial === this.totalTrials) {
      return Promise.resolve;
    }
    
    if (this.playLightning && this.currentTrial !== this.totalTrials) {
      audio.playSound(audio.shockSFX);
      this.playLightning = false;
      setOverlay(
        <img
          src={lightning}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            marginTop: "-95px",
            marginLeft: "-95px",
          }}
          alt=""
        ></img>
      );
      return new Promise((resolve, reject) => {
        this.timeoutManager.setTimeout(() => {
          setOverlay(null, resolve);
          audio.shockSFX.pause();
        }, this.moleInterval);
      });
    } else {
      return new Promise((resolve, reject) => {
        this.timeoutManager.setTimeout(resolve, this.moleInterval);
      });
    }
  }

  getGameSpecificData() {
    return {
      totalTrials: this.totalTrials,
      consecutiveCount: this.consecutiveCorrect,
    };
  }

  getTrialSpecificData() {
    const ruleSwitchTemp = this.ruleSwitch;
    this.ruleSwitch = 0;
    return { rule: this.rule, ruleSwitch: ruleSwitchTemp };
  }
}

export class TimeBasedTagMeSwitch extends TimeBasedGame {
  rule;
  consecutiveCount;
  playLightning;
  ruleSwitch;

  constructor(
    isPractice,
    totalSeconds = 60,
    moleDuration = 0,
    moleInterval = 2000,
    consecutiveCorrect = 4
  ) {
    super(
      {
        gameName: "TAG-ME Switch",
        dataName: "TagMeSwitch",
        initNumMoles: 3,
        initNumRows: 1,
        moleInterval: moleInterval,
        moleDuration: moleDuration,
        cryDuration: 500,
        moleLayout: [[0, 1, 2]],
        startPoint: "trial",
        isPractice: isPractice,
      },
      totalSeconds
    );
    this.rule = this.newRule();
    this.ruleSwitch = 1;
    this.consecutiveCount = 0;
    this.consecutiveCorrect = consecutiveCorrect;
    this.playLightning = false;
  }

  newRule() {
    this.ruleSwitch = 1;
    this.consecutiveCount = 0;
    let newRule = this.rule;
    while (newRule === this.rule || !newRule) {
      // 50% chance of the rule being based on colour
      let colourRule = Math.random() < 0.5;
      let num = Math.floor(Math.random() * 3);
      if (colourRule) newRule = COLOURS[num];
      else newRule = num;
    }
    return newRule;
  }

  _chooseHoles(state) {
    let perm = randomPermutation(3);
    let out = [
      new MoleState(perm[0], COLOURS[0]),
      new MoleState(perm[1], COLOURS[1]),
      new MoleState(perm[2], COLOURS[2]),
    ];
    if (this.consecutiveCount >= this.consecutiveCorrect) {
      this.rule = this.newRule();
    }
    return out;
  }

  chooseHoles(state) {
    // default implementation: return default mole in random spot
    if (this.currentTrial === this.totalTrials) {
      this.resolveGameEnd();
      return [];
    } else {
      this.currentTrial++;
      return this._chooseHoles(state);
    }
  }

  score(allHolesInfo, holeInfo, moleDownTime, moleUpTime) {
    // this.rule should still be up to date, as long as score is called before next mole is chosen
    // failsafe
    if (!holeInfo) {
      this.consecutiveCount = 0;
      return ["", -1, 2, "miss"];
    }

    this.hasHit = true;

    if (holeInfo.id === this.rule || holeInfo.type === this.rule) {
      this.consecutiveCount += 1;
      if (this.consecutiveCount >= this.consecutiveCorrect) {
        this.playLightning = true;
      }
      let score = Math.floor(1000 / (moleDownTime - holeInfo.upTime));
      if (score < 1) {
        score = 1;
      } else if (score > 5) {
        score = 5;
      }
      return ["happy", score, null, "correct hit"];
      // return ["happy", 1, null, "correct hit"];
    }
    this.consecutiveCount = 0;
    return ["sad", -1, null, "false alarm"];
  }

  async interStimulusEvent(setOverlay, moles, setMoles) {
    if (this.currentTrial === this.totalTrials) {
      return Promise.resolve;
    }
    
    if (this.playLightning && this.currentTrial !== this.totalTrials) {
      audio.playSound(audio.shockSFX);
      this.playLightning = false;
      setOverlay(
        <img
          src={lightning}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            marginTop: "-95px",
            marginLeft: "-95px",
          }}
          alt=""
        ></img>
      );
      return new Promise((resolve, reject) => {
        this.timeoutManager.setTimeout(() => {
          setOverlay(null, resolve);
          audio.shockSFX.pause();
        }, this.moleInterval);
      });
    } else {
      return new Promise((resolve, reject) => {
        this.timeoutManager.setTimeout(resolve, this.moleInterval);
      });
    }
  }

  getGameSpecificData() {
    console.log({
      totalSeconds: this.totalSeconds,
      consecutiveCount: this.consecutiveCorrect,
      rule: this.rule,
      ruleSwitch: this.ruleSwitch
    })
    return {
      totalSeconds: this.totalSeconds,
      consecutiveCount: this.consecutiveCorrect,
      rule: this.rule,
      ruleSwitch: this.ruleSwitch
    };
  }

  getTrialSpecificData() {
    const ruleSwitchTemp = this.ruleSwitch;
    this.ruleSwitch = 0;
    return { rule: this.rule, ruleSwitch: ruleSwitchTemp };
  }
}
