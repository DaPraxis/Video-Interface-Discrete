import React from "react";
import MoleState from "../components/game-manager/Objects.js";
import bling from "../assets/bling.gif";
import assets from "../assets/assets.js";
import { randomPermutation } from "../lib/permutations";
import TrialBasedGame from "./TrialBasedGame.js";

const COLOURS = ["regular", "orange", "purple"];

export default class TagMeSame extends TrialBasedGame {
  constructor(
    isPractice,
    numMoles = 60,
    moleDuration = 0,
    moleInterval = 2000
  ) {
    super(
      {
        gameName: "TAG-ME Same",
        dataName: "TagMeSame",
        initNumMoles: 2,
        initNumRows: 1,
        moleInterval: moleInterval,
        moleDuration: moleDuration,
        cryDuration: 500,
        moleLayout: [[0, 1]],
        startPoint: "interstimulus",
        isPractice: isPractice,
      },
      numMoles
    );
    this.targetColour = null;
    this.waitTime = null;
  }

  _chooseHoles(state) {
    let otherColour;
    do {
      otherColour = Math.floor(Math.random() * 3);
    } while (this.targetColour === otherColour);

    let perm = randomPermutation(2);
    let out = [
      new MoleState(perm[0], COLOURS[this.targetColour]),
      new MoleState(perm[1], COLOURS[otherColour]),
    ];
    return out;
  }

  score(allHolesInfo, holeInfo, moleDownTime) {
    // failsafe
    if (!holeInfo) {
      return ["", -1, 2, "miss"];
    }

    this.hasHit = true;

    let score = Math.floor(1000 / (moleDownTime - holeInfo.upTime));
    if (score < 1) {
      score = 1;
    } else if (score > 5) {
      score = 5;
    }
    if (holeInfo.type !== COLOURS[this.targetColour]) {
      return ["sad", -score, 6, "false alarm"];
    }
    return ["happy", score, null, "correct hit"];
  }

  async interStimulusEvent(setOverlay, moles, setMoles) {
    if (this.currentTrial === this.totalTrials) {
      return Promise.resolve;
    }
    
    const previousColour = this.targetColour;
    do {
      this.targetColour = Math.floor(Math.random() * 3);
    } while (this.targetColour === previousColour);
    if (this.currentTrial !== this.totalTrials) {
      setOverlay(
        <>
          <img
            src={bling}
            style={{
              position: "absolute",
              width: "420px",
              left: "calc(50vw - 210px)",
              top: "5%",
            }}
            alt=""
          ></img>
          <img
            src={assets[COLOURS[this.targetColour]]["normal"]}
            style={{
              position: "absolute",
              width: "220px",
              left: "calc(50vw - 110px)",
              top: "25%",
            }}
            alt=""
          ></img>
        </>
      );
    }

    this.waitTime = Math.floor(Math.random() * 11) / 10 + 1;

    const wait = (ms) =>
      new Promise((resolve) => this.timeoutManager.setTimeout(resolve, ms));

    return Promise.resolve()
      .then(() => wait(this.moleInterval))
      .then(() => {
        setOverlay(null);
      })
      .then(() => wait(this.waitTime * 1000));
  }

  getGameSpecificData() {
    return { totalTrials: this.totalTrials };
  }

  getTrialSpecificData() {
    return { waitTime: this.waitTime, targetColour: this.targetColour };
  }
}
