import PreGeneratedTrialBasedGame from "./PreGeneratedTrialBasedGame";
import MoleState from "../components/game-manager/Objects.js";

export default class TagMeOnly extends PreGeneratedTrialBasedGame {
  constructor(numTrials, hatChance) {
    super(
      {
        gameName: "TAG-ME Only",
        dataName: "TagMeOnly",
        initNumMoles: 6,
        initNumRows: 2,
        moleInterval: 2000,
        moleDuration: 2000,
        cryDuration: 500,
        moleLayout: [
          [0, 1, 2],
          [3, 4, 5],
        ],
        startPoint: "startTrial",
      },
      numTrials,
      hatChance
    );
    this.hatChance = hatChance;
  }

  generateMoles(
    TOTAL_TRIALS,
    STIMULUS_CHANCE,
    STREAK_REMEMBRANCE,
    MAX_STREAK,
    REGULIZATION_FACTOR
  ) {
    let stimArray = this.generateStimulusArray(
      TOTAL_TRIALS,
      STIMULUS_CHANCE,
      STREAK_REMEMBRANCE,
      MAX_STREAK,
      REGULIZATION_FACTOR
    );
    let ids = [Math.floor(Math.random() * this.numHoles)];
    for (let i = 1; i < this.TOTAL_TRIALS; i++) {
      let id;
      do {
        id = Math.floor(Math.random() * this.numHoles);
      } while (id === ids[i - 1]);
      ids.push(id);
    }

    let moles = [];

    for (let i = 1; i < TOTAL_TRIALS; i++) {
      moles.push([new MoleState(ids[i], stimArray[i] ? "hat" : "regular")]);
    }

    return moles;
  }

  score(allHolesInfo, holeInfo, moleDownTime) {
    if (holeInfo) {
      return holeInfo.type === "regular"
        ? Math.floor(1000 / (moleDownTime - holeInfo.upTime))
        : -1;
    } else {
      for (let hole of allHolesInfo) {
        if (hole.up) {
          return hole.type === "hat" ? 0 : -1;
        }
      }
    }
  }
}
