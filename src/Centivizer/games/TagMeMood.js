import TrialBasedGame from "./TrialBasedGame";
import { CustomState } from "../components/game-manager/Objects";
import createTrials from "./util/MoodTrialGenerator";
import assets from "../assets/mood/assets";

let wall;

if (true) {
  wall = require(".."+ "/assets/mood/bg_wall.png");
} else {
  wall = ".."+ "/assets/mood/bg_wall.png";
}

// potential object to encapsulate dialog information to pass to BasicDialog component
// because each game should be responsible for defining its own dialog, not any of
// the dialog components (unlike how it currently is)

// const DIALOGS = {
//   0: {
//     title: <>Hey!</>,
//     text: (
//       <>
//         In this round, you will be tagging <b>all</b> faces as quickly and
//         accurately as possible. Let's try it!
//       </>
//     ),
//   },
//   1: {
//     title: <>Hey!</>,
//     text: (
//       <>
//         In this round, you will be tagging the <b>neutral</b> faces as quickly
//         and accurately as possible. Let's try it!
//       </>
//     ),
//   },
//   2: {
//     title: <>Hey!</>,
//     text: (
//       <>
//         In this round, you will be tagging the <b>fearful</b> faces as quickly
//         and accurately as possible. Let's try it!
//       </>
//     ),
//   },
//   3: {
//     title: <>Hey!</>,
//     text: (
//       <>
//         In this round, you will be tagging the <b>happy</b> faces as quickly and
//         accurately as possible. Let's try it!
//       </>
//     ),
//   },
//   4: {
//     title: <>Hey!</>,
//     text: (
//       <>
//         This is a practice round to get familiar with the rules. You will get
//         points based on speed and accuracy.
//       </>
//     ),
//   },
// };

const TARGET_EXPRESSIONS = {
  baseline: ["neutral", "happy"],
  all: ["neutral", "fearful", "happy"],
  neutral: ["neutral"],
  fearful: ["fearful"],
  happy: ["happy"],
};

export default class TagMeMood extends TrialBasedGame {
  constructor(
    isPractice,
    totalTrials = 30,
    moleDuration = 2000,
    moleInterval = 1000,
    version
  ) {
    super(
      {
        gameName: `TAG-ME Mood ${
          version.charAt(0).toUpperCase() + version.slice(1)
        }`,
        dataName: `TagMeMood${
          version.charAt(0).toUpperCase() + version.slice(1)
        }`,
        initNumMoles: 6,
        initNumRows: 2,
        moleInterval: moleInterval,
        moleDuration: moleDuration,
        cryDuration: 500,
        moleLayout: [
          [0, 1, 2],
          [3, 4, 5],
        ],
        startPoint: "interstimulus",
        isPractice: isPractice,
      },
      totalTrials
    );
    this.style.background.backgroundImage = `url(${wall})`;
    this.style.bigScore.top = "65%";
    this.isReplayable = false;
    this.version = version;
    this.numCorrect = 0; // must be between 200 - 800 ms
    this.numIncorrect = 0;
    this.targetExpressions = [];
    this.distractorExpressions = [];
    this.targetHoles = [];
    this.trials = createTrials(this.totalTrials, this.numHoles, this.version);
    this.preload();
  }

  PRELOAD = { faces: [] };

  preload() {
    const faces = [];
    for (let i = this.currentTrial; i < this.totalTrials; i++) {
      for (let j = 0; j < this.trials[i].faces.length; j++) {
        faces.push(new Image());
        faces[faces.length - 1].src = this.trials[i].faces[j];
      }
    }
    this.PRELOAD.faces = faces;
  }

  _chooseHoles(state) {
    const trial = this.trials[this.currentTrial - 1];

    const moles = [];
    for (let i = 0; i < trial.expressions.length; i++) {
      const mole = new CustomState(trial.holes[i], assets[trial.faces[i]]);
      moles.push(mole);
    }
    return moles;
  }

  score(allHolesInfo, holeInfo, moleDownTime) {
    const trial = this.trials[this.currentTrial - 1];

    if (!holeInfo) {
      // did not hit
      for (const hole of allHolesInfo) {
        const expression = trial.expressions[trial.holes.indexOf(hole.id)];
        if (hole.up && TARGET_EXPRESSIONS[this.version].includes(expression)) {
          this.numIncorrect++;
          if (this.isPractice) {
            this.trials.push(
              ...createTrials(
                this.currentTrial + 10 - this.totalTrials,
                this.numHoles,
                this.version
              )
            );
            this.totalTrials = this.currentTrial + 10;
            this.preload();
          }
          return ["", 0, `error-${this.version}`, "miss"];
        }
      }
      return ["", 1, null, "correct rejection"];
    } else if (!holeInfo.up) {
      // hit empty hole
      return ["", 0, 4, "bad hit"];
    }

    const expression = trial.expressions[trial.holes.indexOf(holeInfo.id)];
    if (!TARGET_EXPRESSIONS[this.version].includes(expression)) {
      // hit incorrect mole
      if (!this.hasHit) {
        this.numIncorrect++;
        this.hasHit = true;
        if (this.isPractice) {
          this.trials.push(
            ...createTrials(
              this.currentTrial + 10 - this.totalTrials,
              this.numHoles,
              this.version
            )
          );
          this.totalTrials = this.currentTrial + 10;
          this.preload();
        }
      }
      return ["", 0, `error-${this.version}`, "false alarm"];
    }

    // hit correct mole
    const score = this.hasHit ? 0 : 1;
    if (!this.hasHit) {
      const reactionTime = moleDownTime - holeInfo.upTime;
      if (200 <= reactionTime && reactionTime <= 800) {
        this.numCorrect++;
      }
      this.hasHit = true;
    }
    return ["", score, null, "correct hit"];
  }

  decideEndTrial(holeInfo) {
    return false; // allow multiple hits per trial
  }

  getGameSpecificData() {
    return { totalTrials: this.totalTrials };
  }

  getTrialSpecificData() {
    const trial = this.trials[this.currentTrial - 1];

    const targetExpressions = trial.expressions;
    const targetHoles = trial.holes;
    const distractorExpressions = [];
    const distractorHoles = [];
    if (trial.expressions.length === 2) {
      // this trial has distractors
      for (let i = 0; i < 2; i++) {
        if (!TARGET_EXPRESSIONS[this.version].includes(trial.expressions[i])) {
          distractorExpressions.push(trial.expressions[i]);
          distractorHoles.push(trial.holes[i]);
        }
      }
    }

    const isSameTargetExpression = trial.expressions.reduce(
      (isSameTargetExpression, expression) =>
        isSameTargetExpression || this.targetExpressions.includes(expression),
      false
    );
    const isSameTargetHole = trial.holes.reduce(
      (isSameTargetHole, hole) =>
        isSameTargetHole || this.targetHoles.includes(hole),
      false
    );
    const isSameDistractorExpression = distractorExpressions.reduce(
      (isSameDistractorExpression, expression) =>
        isSameDistractorExpression ||
        this.distractorExpressions.includes(expression),
      false
    );
    const hasTarget = trial.expressions.reduce(
      (hasTarget, expression) =>
        hasTarget || TARGET_EXPRESSIONS[this.version].includes(expression),
      false
    );
    const hasDistractor = trial.expressions.length === 2;

    // update
    this.targetExpressions = targetExpressions;
    if (distractorExpressions.length > 0) {
      this.distractorExpressions = distractorExpressions;
    }
    this.targetHoles = targetHoles

    return {
      targetExpressions: targetExpressions, // all expressions (array of length 1 or 2)
      targetLocations: targetHoles, // (array of length 1 or 2)
      distractorExpressions: distractorExpressions, // (array of length 0, 1, or 2)
      distractorLocations: distractorHoles, // (array of length 0, 1, or 2)
      isSameTargetExpression: isSameTargetExpression,
      isSameTargetLocation: isSameTargetHole,
      isSameDistractorExpression: isSameDistractorExpression,
      hasTarget: hasTarget, // for "target there" column
      hasDistractor: hasDistractor, // for "distractor trial" column
    };
  }

  showDialog() {
    if (this.currentTrial === 0) {
      if (this.isPractice) {
        return ["mood-practice", `${this.version}-faces`];
      }
      return ["mood-full", `${this.version}-faces`];
    } else if (this.currentTrial === this.totalTrials && !this.isPractice) {
      return ["mood"];
    }
    return [];
  }
}
