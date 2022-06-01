import TrialBasedGame from "./TrialBasedGame";
import MoleState from "../components/game-manager/Objects";
import assets from "../assets/tune/assets";
import audio from "../audio";

const STIMULI = [
  {
    prime: "CEG",
    target: { ITR: "GBD", OTR: "GBD", ITU: "FshAshCsh", OTU: "FshAshCsh" },
  },
  {
    prime: "CshFGsh",
    target: { ITR: "GshCDsh", OTR: "GshCDsh", ITU: "GBD", OTU: "GBD" },
  },
  {
    prime: "DFshA",
    target: { ITR: "ACshE", OTR: "ACshE", ITU: "GshCDsh", OTU: "GshCDsh" },
  },
  {
    prime: "DshGAsh",
    target: { ITR: "AshDF", OTR: "AshDF", ITU: "ACshE", OTU: "ACshE" },
  },
  {
    prime: "EGshB",
    target: { ITR: "BDshFsh", OTR: "BDshFsh", ITU: "AshDF", OTU: "AshDF" },
  },
  {
    prime: "FAC",
    target: { ITR: "CEG", OTR: "CEG", ITU: "BDshFsh", OTU: "BDshFsh" },
  },
  {
    prime: "FshAshCsh",
    target: { ITR: "CshFGsh", OTR: "CshFGsh", ITU: "CEG", OTU: "CEG" },
  },
  {
    prime: "GBD",
    target: { ITR: "DFshA", OTR: "DFshA", ITU: "CshFGsh", OTU: "CshFGsh" },
  },
  {
    prime: "GshCDsh",
    target: { ITR: "DshGAsh", OTR: "DshGAsh", ITU: "DFshA", OTU: "DFshA" },
  },
  {
    prime: "ACshE",
    target: { ITR: "EGshB", OTR: "EGshB", ITU: "DshGAsh", OTU: "DshGAsh" },
  },
  {
    prime: "AshDF",
    target: { ITR: "FAC", OTR: "FAC", ITU: "EGshB", OTU: "EGshB" },
  },
  {
    prime: "BDshFsh",
    target: { ITR: "FshAshCsh", OTR: "FshAshCsh", ITU: "FAC", OTU: "FAC" },
  },
];

const MAPPING = ["j", "", "k"];

const PRELOAD = [];

export default class TagMeTune extends TrialBasedGame {
  constructor(isPractice, totalMoles, moleDuration, moleInterval, blockLength) {
    super(
      {
        gameName: "TAG-ME Tune",
        dataName: "TagMeTune",
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
    this.numCorrect = 0;
    this.numIncorrect = 0;
    this.interactableHoles = [0, 2];
    this.showPoints = true;
    this.responseKey = "";
    this.holeChoice = -1;
    this.blockLength = blockLength;
    this.trials = [];

    for (let i = 0; i < this.totalTrials / this.blockLength; i++) {
      const block = { stimuli: [] };

      // alternate between in-tune and out-of-tune blocks
      if (i % 2 === 0) {
        block.mode = "IT";
      } else {
        block.mode = "OT";
      }

      if (this.isPractice) {
        // choose 10 primes
        const stimuli = STIMULI.map((prime) => ({
          key: Math.random(),
          value: prime,
        }))
          .sort((x, y) => x.key - y.key)
          .map((prime) => prime.value)
          .slice(0, 10);

        const counts = { ITR: 0, OTR: 0, ITU: 0, OTU: 0 };

        for (const stimulus of stimuli) {
          let type;
          do {
            type = ["ITR", "OTR", "ITU", "OTU"][Math.floor(Math.random() * 4)];
          } while (counts[type] === this.totalTrials / 4);
          counts[type]++;
          block.stimuli.push({
            prime: stimulus.prime,
            target: stimulus.target[type],
            type: type,
          });
        }
      } else {
        for (const stimulus of STIMULI) {
          for (const type of ["ITR", "OTR", "ITU", "OTU"]) {
            block.stimuli.push({
              prime: stimulus.prime,
              target: stimulus.target[type],
              type: type,
            });
          }
        }
      }

      // randomize order of trials
      block.stimuli = block.stimuli
        .map((stimulus) => ({
          key: Math.random(),
          value: stimulus,
        }))
        .sort((x, y) => x.key - y.key)
        .map((stimulus) => stimulus.value);

      this.trials.push(block);
    }

    for (let i = 0; i < 2; i++) {
      PRELOAD.push(new Audio());
    }
  }

  _chooseHoles(state) {
    this.responseKey = "";
    const mode = this.trials[
      Math.floor((this.currentTrial - 1) / this.blockLength)
    ].mode;
    this.holeChoice = [0, 2][Math.floor(Math.random() * 2)];
    return [
      new MoleState(1, `jersey${mode}`),
      new MoleState(this.holeChoice, "jerseyQuestion"),
    ];
  }

  async interStimulusEvent(setOverlay, moles, setMoles) {
    if (this.currentTrial === this.totalTrials) {
      return Promise.resolve;
    }

    const mode = this.trials[Math.floor(this.currentTrial / this.blockLength)]
      .mode;

    const nextMoles = [
      new MoleState(0),
      new MoleState(1, `jersey${mode}`),
      new MoleState(2),
    ];
    nextMoles[1].up = true;
    setMoles(nextMoles);

    const trial = this.trials[Math.floor(this.currentTrial / this.blockLength)]
      .stimuli[this.currentTrial % this.blockLength];

    // preload stimuli
    PRELOAD[0].src = assets.prime[trial.prime];
    PRELOAD[1].src = assets.target[trial.type][trial.target];

    const wait = (ms) =>
      new Promise((resolve) => this.timeoutManager.setTimeout(resolve, ms));

    return (this.currentTrial % this.blockLength === 0
      ? Promise.resolve().then(() => wait(500))
      : Promise.resolve().then(() => wait(this.moleInterval))
    )
      .then(() => {
        // play prime
        audio.playSound(new Audio(assets.prime[trial.prime]));
      })
      .then(() => wait(1050))
      .then(() => {
        // play target
        audio.playSound(new Audio(assets.target[trial.type][trial.target]));
      });
  }

  score(allHolesInfo, holeInfo, moleDownTime) {
    const block = this.trials[
      Math.floor((this.currentTrial - 1) / this.blockLength)
    ];
    const trial = block.stimuli[(this.currentTrial - 1) % this.blockLength];

    // did not hit
    if (!holeInfo) {
      if (
        (block.mode === "IT" && ["ITR", "ITU"].includes(trial.type)) ||
        (block.mode === "OT" && ["OTR", "OTU"].includes(trial.type))
      ) {
        this.numIncorrect++;
        return ["", 0, null, "miss"];
      }
      this.numCorrect++;
      return ["", 0, null, "correct rejection"];
    }

    if (holeInfo.id === 0) {
      this.responseKey = MAPPING[0];
    } else if (holeInfo.id === 2) {
      this.responseKey = MAPPING[2];
    }

    if (!holeInfo.up) {
      return ["", 0, null, "bad hit"]; // ignore bad hits
    }

    // did hit
    this.hasHit = true;

    // reaction speed
    let score = Math.floor(1000 / (moleDownTime - holeInfo.upTime));
    if (score < 1) {
      score = 1;
    } else if (score > 3) {
      score = 3;
    }

    let response;
    if (
      (block.mode === "IT" && ["ITR", "ITU"].includes(trial.type)) ||
      (block.mode === "OT" && ["OTR", "OTU"].includes(trial.type))
    ) {
      this.numCorrect++;
      response = "correct hit";
    } else {
      this.numIncorrect++;
      response = "false alarm";
    }

    return ["", score, null, response];
  }

  getGameSpecificData() {
    return { totalTrials: this.totalTrials };
  }

  getTrialSpecificData() {
    const block = this.trials[
      Math.floor((this.currentTrial - 1) / this.blockLength)
    ];
    const trial = block.stimuli[(this.currentTrial - 1) % this.blockLength];

    let correctResponse;
    let tune;
    if (block.mode === "IT") {
      if (["ITR", "ITU"].includes(trial.type)) {
        correctResponse = this.holeChoice === 0 ? MAPPING[0] : MAPPING[2];
      } else if (["OTR", "OTU"].includes(trial.type)) {
        correctResponse = "";
      }
      tune = "inTune";
    } else if (block.mode === "OT") {
      if (["OTR", "OTU"].includes(trial.type)) {
        correctResponse = this.holeChoice === 0 ? MAPPING[0] : MAPPING[2];
      } else if (["ITR", "ITU"].includes(trial.type)) {
        correctResponse = "";
      }
      tune = "outTune";
    }

    let blockNum;
    if (this.isPractice) {
      blockNum = `practice ${4 - localStorage.getItem("lives")}`;
    } else {
      blockNum = (
        Math.floor((this.currentTrial - 1) / this.blockLength) + 1
      ).toString();
    }

    return {
      prime: trial.prime,
      target: `${trial.target}.${trial.type}`,
      tune: tune,
      blockNum: blockNum,
      responseKey: this.responseKey,
      correctResponse: correctResponse,
    };
  }

  showDialog() {
    if (this.currentTrial === 0) {
      if (this.isPractice) {
        return ["three-attempts", "IT", "volume"]; // dialogIDs, in chronological order
      }
      return ["real-experiment", "IT", "volume"];
    } else if (this.currentTrial % this.blockLength === 0) {
      if (this.currentTrial === this.totalTrials) {
        return ["tune"];
      }
      if (this.isPractice) {
        return ["OT"];
      }
      return ["tune", this.trials[this.currentTrial / this.blockLength].mode];
    }
    return [];
  }
}
