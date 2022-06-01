import TrialBasedGame from "./TrialBasedGame.js";
import TimeBasedGame from "./TimeBasedGame.js";
import MoleState from "../components/game-manager/Objects.js";
import assets from "../assets/assets.js";
let BIG_NUMBERS = [];
let SMALL_NUMBERS = [];
let BIG_BLANK = 'bigBlank';
let SMALL_BLANK = 'smallBlank';

export class TrialBasedTagMeBigger extends TrialBasedGame {
  lastMoleNums = [];

  constructor(
    isPractice,
    numTrials = 60,
    moleDuration = 0,
    moleInterval = 2000,
    congruentChance = 0.3,
    maxMoleNum = 9
  ) {
    super(
      {
        gameName: "TAG-ME Bigger",
        dataName: "TagMeBigger",
        initNumMoles: 2,
        initNumRows: 1,
        moleInterval: moleInterval,
        moleDuration: moleDuration,
        cryDuration: 500,
        moleLayout: [[0, 1]],
        startPoint: "trial",
        isPractice: isPractice,
      },
      numTrials
    );
    this.congruentChance = congruentChance;
    this.maxMoleNum = maxMoleNum;
    this.greaterIndex = null;
    this.isCongruent = false;

    for (let i = 0; i < this.maxMoleNum; i++) {
      BIG_NUMBERS.push(`big${i}`);
      SMALL_NUMBERS.push(`small${i}`);
    }

    this.congruentTrials = [];
    for (
      let i = 0;
      i < Math.floor(this.congruentChance * this.totalTrials);
      i++
    ) {
      let trial;
      do {
        trial = Math.floor(Math.random() * this.totalTrials) + 1;
      } while (this.congruentTrials.includes(trial));
      this.congruentTrials.push(trial);
    }
    this.preload();
  }

  // preload empty moles, small numbers, and hole
  preload() {
    // load empty moles
    const emptyMoles = ["smallBlank", "bigBlank"];
    for (const emptyMole of emptyMoles) {
      const img = new Image();
      img.src = assets[emptyMole]["normal"];
    }
    // load small numbers
    const numbers = ["small1", "small2", "small3", "small4", "small5", "small6", "small7", "small8", "small9"];
    for (const num of numbers) {
      const img = new Image();
      img.src = assets['number'][num];
    }
    // load hole
    const img = new Image();
    img.src = assets['hole'];
  }
  
  _chooseHoles(state) {
    let numbers = [Math.floor(Math.random() * (this.maxMoleNum - 1)) + 1, -1];
    do {
      numbers[1] = Math.floor(Math.random() * (this.maxMoleNum - 1)) + 1;
    } while (numbers[0] === numbers[1]);

    let bigger;

    if (this.congruentTrials.includes(this.currentTrial)) {
      // congruent case
      this.isCongruent = true;
      if (numbers[0] > numbers[1]) {
        this.greaterIndex = 0;
        bigger = [true, false];
      } else {
        this.greaterIndex = 1;
        bigger = [false, true];
      }
    } else {
      // incongruent case
      this.isCongruent = false;
      if (numbers[0] < numbers[1]) {
        this.greaterIndex = 1;
        bigger = [true, false];
      } else {
        this.greaterIndex = 0;
        bigger = [false, true];
      }
    }

    let hole1 = new MoleState(
      0,
      bigger[0] ? BIG_BLANK : SMALL_BLANK,
      bigger[0] ? SMALL_NUMBERS[numbers[0]] : SMALL_NUMBERS[numbers[0]]
    );
    let hole2 = new MoleState(
      1,
      bigger[1] ? BIG_BLANK : SMALL_BLANK,
      bigger[1] ? SMALL_NUMBERS[numbers[1]] : SMALL_NUMBERS[numbers[1]]
    );
    return [hole1, hole2];
  }

  score(allHolesInfo, holeInfo, moleDownTime) {
    // failsafe
    if (!holeInfo) {
      return ["", -1, 2, "miss"];
    } else if (!holeInfo.up) {
      this.hasHitEmpty = true;
    }

    this.hasHit = true;

    let score = Math.floor(1000 / (moleDownTime - holeInfo.upTime));
    if (score < 1) {
      score = 1;
    } else if (score > 5) {
      score = 5;
    }
    if (holeInfo.id !== this.greaterIndex) {
      return ["sad", -1, 5, "false alarm"];
    }
    return ["happy", score, null, "correct hit"];
  }

  getGameSpecificData() {
    return {
      congruentChance: this.congruentChance,
      totalTrials: this.totalTrials,
      maxMoleNum: this.maxMoleNum,
    };
  }

  getTrialSpecificData() {
    return { greaterNumber: this.greaterIndex, isCongruent: this.isCongruent };
  }
}

export class TimeBasedTagMeBigger extends TimeBasedGame {
  lastMoleNums = [];

  constructor(
    isPractice,
    totalSeconds = 60,
    moleDuration = 0,
    moleInterval = 2000,
    congruentChance = 0.3,
    maxMoleNum = 9
  ) {
    super(
      {
        gameName: "TAG-ME Bigger",
        dataName: "TagMeBigger",
        initNumMoles: 2,
        initNumRows: 1,
        moleInterval: moleInterval,
        moleDuration: moleDuration,
        cryDuration: 500,
        moleLayout: [[0, 1]],
        startPoint: "trial",
        isPractice: isPractice,
      },
      totalSeconds
    );
    this.congruentChance = congruentChance;
    this.maxMoleNum = maxMoleNum;
    this.greaterIndex = null;
    this.isCongruent = false;

    for (let i = 0; i < this.maxMoleNum; i++) {
      BIG_NUMBERS.push(`big${i}`);
      SMALL_NUMBERS.push(`small${i}`);
    }

    this.preload();
  }

  // preload empty moles, small numbers, and hole
  preload() {
    // load empty moles
    const emptyMoles = ["smallBlank", "bigBlank"];
    for (const emptyMole of emptyMoles) {
      const img = new Image();
      img.src = assets[emptyMole]["normal"];
    }
    // load small numbers
    const numbers = ["small1", "small2", "small3", "small4", "small5", "small6", "small7", "small8", "small9"];
    for (const num of numbers) {
      const img = new Image();
      img.src = assets['number'][num];
    }
    // load hole
    const img = new Image();
    img.src = assets['hole'];
  }

  _chooseHoles(state) {
    let numbers = [Math.floor(Math.random() * (this.maxMoleNum - 1)) + 1, -1];
    do {
      numbers[1] = Math.floor(Math.random() * (this.maxMoleNum - 1)) + 1;
    } while (numbers[0] === numbers[1]);

    let bigger;

    if (Math.random() < this.congruentChance) {
      // congruent case
      this.isCongruent = true;
      if (numbers[0] > numbers[1]) {
        this.greaterIndex = 0;
        bigger = [true, false];
      } else {
        this.greaterIndex = 1;
        bigger = [false, true];
      }
    } else {
      // incongruent case
      this.isCongruent = false;
      if (numbers[0] < numbers[1]) {
        this.greaterIndex = 1;
        bigger = [true, false];
      } else {
        this.greaterIndex = 0;
        bigger = [false, true];
      }
    }

    console.log(BIG_NUMBERS[numbers[0]]);

    let hole1 = new MoleState(
      0,
      bigger[0] ? BIG_BLANK : SMALL_BLANK,
      bigger[0] ? SMALL_NUMBERS[numbers[0]] : SMALL_NUMBERS[numbers[0]]
    );
    let hole2 = new MoleState(
      1,
      bigger[1] ? BIG_BLANK : SMALL_BLANK,
      bigger[1] ? SMALL_NUMBERS[numbers[1]] : SMALL_NUMBERS[numbers[1]]
    );
    return [hole1, hole2];
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

  score(allHolesInfo, holeInfo, moleDownTime) {
    // failsafe
    if (!holeInfo) {
      return ["", 0, 0, "miss"];
    } else if (!holeInfo.up) {
      this.hasHitEmpty = true;
    }

    this.hasHit = true;

    let score = Math.floor(1000 / (moleDownTime - holeInfo.upTime));
    if (score < 1) {
      score = 1;
    } else if (score > 5) {
      score = 5;
    }
    if (holeInfo.id !== this.greaterIndex) {
      return ["sad", -1, 5, "false alarm"];
    }
    return ["happy", score, null, "correct hit"];
  }

  getGameSpecificData() {
    return {
      congruentChance: this.congruentChance,
      totalSeconds: this.totalSeconds,
      maxMoleNum: this.maxMoleNum,
    };
  }

  getTrialSpecificData() {
    return { greaterNumber: this.greaterIndex, isCongruent: this.isCongruent };
  }
}
