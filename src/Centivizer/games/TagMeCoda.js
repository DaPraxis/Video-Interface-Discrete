import React from "react";
import TrialBasedGame from "./TrialBasedGame";
import MoleState from "../components/game-manager/Objects";
import createTrials from "./util/CodaTrialGenerator";
import assets from "../assets/coda/assets";
import objects from "../assets/assets";
import audio from "../audio";

let left;
let right;

if (true) {
  left = require(".."+ "/assets/curtain/left.png");
  right = require(".."+ "/assets/curtain/right.png");
} else{
  left = ".."+ "/assets/curtain/left.png";
  right = ".."+ "/assets/curtain/right.png";
}

const LEFT = { hole: 0, key: "j" };
const RIGHT = { hole: 2, key: "k" };

const MAPPING = [
  { correct: RIGHT, incorrect: LEFT },
  { correct: LEFT, incorrect: RIGHT },
];

export default class TagMeCoda extends TrialBasedGame {
  constructor(
    isPractice,
    totalMoles = 60,
    moleDuration = 2500,
    moleInterval = 500,
    blockLength,
    seed
  ) {
    super(
      {
        gameName: "TAG-ME Coda",
        dataName: "TagMeCoda",
        initNumMoles: 3,
        initNumRows: 1,
        moleInterval: moleInterval,
        moleDuration: moleDuration,
        cryDuration: 500,
        moleLayout: [[0, 1, 2]],
        startPoint: "interstimulus",
        isPractice: isPractice,
      },
      totalMoles
    );
    this.mapping = seed % 2;
    this.numCorrect = 0;
    this.numCorrectWithRepeats = 0;
    this.numIncorrect = 0;
    this.key = ""; // key pressed by player
    this.interactableHoles = [0, 2];
    this.trials = createTrials(seed, this.isPractice);
    this.blockLength = blockLength;
    this.multipleHits = true; // allow multiple hits per trial
    this.style.frame.marginTop = "15vh";
    this.preload();
  }

  PRELOAD = { general: [], image: null, audio: null };

  // preload assets
  preload() {
    const general = [
      left,
      right,
      objects.correct.normal,
      objects.correct.happy,
      objects.incorrect.normal,
      objects.incorrect.happy,
    ];

    for (let i = 0; i < this.totalTrials / this.blockLength; i++) {
      const block = this.trials[i];
      general.push(objects[`jersey${block.ending.toUpperCase()}`].normal);
      general.push(objects[`jersey${block.ending.toUpperCase()}Arms`].normal);
    }

    for (let i = 0; i < general.length; i++) {
      this.PRELOAD.general.push(new Image());
      this.PRELOAD.general[i].src = general[i];
    }

    // assets for next trial
    const nextStimuli = this.trials[0].stimuli[0];
    this.PRELOAD.image = new Image();
    this.PRELOAD.image.src = assets.visual[nextStimuli.visual];
    this.PRELOAD.audio = new Audio(assets.auditory[nextStimuli.auditory]);
  }

  _chooseHoles(state) {
    const block = this.trials[
      Math.floor((this.currentTrial - 1) / this.blockLength)
    ];
    return [
      new MoleState(MAPPING[this.mapping].correct.hole, "correct"),
      new MoleState(1, `jersey${block.ending.toUpperCase()}Arms`),
      new MoleState(MAPPING[this.mapping].incorrect.hole, "incorrect"),
    ];
  }

  async interStimulusEvent(setOverlay, moles, setMoles) {
    if (this.currentTrial === this.totalTrials) {
      return Promise.resolve;
    }

    this.key = "";

    const block = this.trials[Math.floor(this.currentTrial / this.blockLength)];
    const stimuli = block.stimuli[this.currentTrial % this.blockLength];

    const molesToSet = [
      new MoleState(MAPPING[this.mapping].correct.hole, "correct"),
      new MoleState(1, `jersey${block.ending.toUpperCase()}`),
      new MoleState(MAPPING[this.mapping].incorrect.hole, "incorrect"),
    ];
    setOverlay(null);
    if (this.currentTrial % this.blockLength === 0) {
      setMoles(molesToSet);
    } else {
      molesToSet[1].up = true;
      setMoles(molesToSet);
    }

    const wait = (ms) =>
      new Promise((resolve) => this.timeoutManager.setTimeout(resolve, ms));

    const leftCurtain = React.createRef();
    const rightCurtain = React.createRef();

    return (this.currentTrial % this.blockLength === 0
      ? Promise.resolve()
          .then(() => wait(this.moleInterval))
          .then(() => {
            setOverlay(
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  width: "100vw",
                  height: "100vh",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "60px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: "-4vw",
                    width: "58vw",
                    height: "90vh",
                    zIndex: "1001",
                    transition: "width 2s, transform 2s",
                    backgroundImage: `url(${left})`,
                    backgroundSize: "100% 100%",
                  }}
                  ref={leftCurtain}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: "60px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    right: "-4vw",
                    width: "58vw",
                    height: "90vh",
                    zIndex: "1001",
                    transition: "width 2s, transform 2s",
                    backgroundImage: `url(${right})`,
                    backgroundSize: "100% 100%",
                  }}
                  ref={rightCurtain}
                ></div>
              </div>
            );
          })
          .then(() => wait(500))
          .then(() => {
            molesToSet[1].up = true;
            setMoles(molesToSet);
            leftCurtain.current.style.width = "0";
            rightCurtain.current.style.width = "0";
            leftCurtain.current.style.transform = "rotate(-5deg)";
            rightCurtain.current.style.transform = "rotate(5deg)";
          })
          .then(() => wait(2000)) // wait for curtain
          .then(() => {
            audio.playSound(new Audio(assets.ending[block.ending]));
          })
          .then(() => wait(5000))
      : Promise.resolve()
    )
      .then(() => wait(this.moleInterval)) // 500 ms
      .then(() => {
        let nextStimuli;
        if (this.currentTrial < this.totalTrials - 1) {
          nextStimuli = this.trials[
            Math.floor((this.currentTrial + 1) / this.blockLength)
          ].stimuli[(this.currentTrial + 1) % this.blockLength];
        }

        if (stimuli.auditory) {
          this.PRELOAD.audio.addEventListener("play", () => {
            // assets for next trial
            if (nextStimuli) {
              this.PRELOAD.audio = new Audio(
                assets.auditory[nextStimuli.auditory]
              );
            }
          });
          audio.playSound(this.PRELOAD.audio);
        } else {
          // assets for next trial
          if (nextStimuli) {
            this.PRELOAD.audio = new Audio(
              assets.auditory[nextStimuli.auditory]
            );
          }
        }
        setOverlay(
          <img
            src={assets.visual[stimuli.visual]}
            alt={stimuli.visual}
            style={{
              position: "absolute",
              top: "22%",
              left: "50%",
              transform: "translateX(-50%)",
              height: "45%",
              borderRadius: "24px",
              boxShadow: "0 6px 4px rgba(0, 0, 0, 0.2)",
            }}
          />,
          () => {
            // assets for next trial
            if (nextStimuli) {
              this.PRELOAD.image = new Image();
              this.PRELOAD.image.src = assets.visual[nextStimuli.visual];
            }
          }
        );
      });
  }

  score(allHolesInfo, holeInfo, moleDownTime) {
    // did not hit
    if (!holeInfo) {
      return ["", 0, 2, ""];
    }

    const block = this.trials[
      Math.floor((this.currentTrial - 1) / this.blockLength)
    ];
    const stimuli = block.stimuli[(this.currentTrial - 1) % this.blockLength];

    // determine key pressed by player
    if (holeInfo.id === MAPPING[this.mapping].correct.hole) {
      this.key = MAPPING[this.mapping].correct.key;
    } else {
      this.key = MAPPING[this.mapping].incorrect.key;
    }

    // calculate score
    let score;
    if (this.hasHit) {
      score = 0;
    } else {
      const raw = this.moleDuration / (moleDownTime - holeInfo.upTime);
      if (raw < 1.5) {
        score = 1;
      } else if (raw < 2.5) {
        score = 2;
      } else {
        score = 3;
      }
    }

    // assign dialog case
    let dialog;
    if (this.key === stimuli.correct[this.mapping]) {
      // update counts
      this.numCorrectWithRepeats++;
      if (!this.hasHit) {
        this.numCorrect++;
        this.hasHit = true;
      }
      if (this.numCorrectWithRepeats < 3) {
        dialog = `coda-correct-${this.currentTrial - 1}`;
      } else if (this.numCorrectWithRepeats === 3) {
        dialog = `coda-correct-final-${this.currentTrial - 1}`;
      } else {
        dialog = "coda-correct";
      }
    } else {
      // update counts
      if (!this.hasHit) {
        this.numIncorrect++;
        this.hasHit = true;
      }
      dialog = `coda-incorrect-${this.currentTrial - 1}`;
    }

    return ["happy", score, dialog, ""]; // always show happy mole
  }

  decideEndTrial(holeInfo) {
    return false; // allow multiple hits per trial
  }

  getGameSpecificData() {
    return { totalTrials: this.totalTrials };
  }

  getTrialSpecificData() {
    const block = this.trials[
      Math.floor((this.currentTrial - 1) / this.blockLength)
    ];
    const stimuli = block.stimuli[(this.currentTrial - 1) % this.blockLength];
    return {
      responseKeys: this.key,
      correctResponse: stimuli.correct[this.mapping],
      condition: stimuli.condition,
      picture: stimuli.visual,
      word: stimuli.auditory,
    };
  }

  showDialog() {
    if (this.currentTrial === 0) {
      return ["volume"];
    }
    if (this.isPractice) {
      if (this.currentTrial === 16) {
        return ["coda"];
      }
    } else {
      if (this.currentTrial % 24 === 0 && this.currentTrial > 0) {
        return ["coda"];
      }
    }
    return [];
  }
}
