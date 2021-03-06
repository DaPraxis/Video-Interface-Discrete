import AbstractVersion from "./AbstractVersion";
import SwitchInstructions from "../components/instructions/SwitchInstructions";
import QuickInstructions from "../components/instructions/QuickInstructions";
import BiggerInstructions from "../components/instructions/BiggerInstructions";
import OnlyInstructions from "../components/instructions/OnlyInstructions";
import SameInstructions from "../components/instructions/SameInstructions";
import WhereInstructions from "../components/instructions/WhereInstructions";
import AgainEasyInstructions from "../components/instructions/AgainEasyInstructions";
import AgainMediumInstructions from "../components/instructions/AgainMediumInstructions";
import AgainHardInstructions from "../components/instructions/AgainHardInstructions";

// const validationStudyId = "4eba0483-8b6b-470f-9d9a-29bb9a22ccc6"

const games = [
  {
    name: "Only",
    translationKey: "TagMeOnly",
    config: {
      game: {
        mode: 1, // trial-based
        totalTrials: 20,
        moleDuration: 1000,
        moleInterval: 2000,
        chance: 0.3,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 1000,
        moleInterval: 2000,
        chance: 0.3,
      },
    },
    instructionsComponent: OnlyInstructions,
  },
  {
    name: "AgainMedium",
    translationKey: "TagMeAgainMedium",
    config: {
      game: {
        mode: 1, // trial-based
        totalTrials: 20,
        moleDuration: 1000,
        moleInterval: 2000,
        chance: 0.3,
        prev: 2,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 1000,
        moleInterval: 2000,
        chance: 0.3,
        prev: 2,
      },
    },
    instructionsComponent: AgainMediumInstructions,
  },
    {
    name: "Switch",
    translationKey: "TagMeSwitch",
    config: {
      game: {
        mode: 0, // time-based
        totalSeconds: 60,
        moleDuration: 0, // infinite time
        moleInterval: 1000,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 0,
        moleInterval: 1000,
      },
    },
    instructionsComponent: SwitchInstructions,
  },
];

let loginConfig = {
  partNumPattern: /^.+$/,
  sessionNumPattern: /^.+$/,
};

/*
 * Test version for development purposes
 */
export default class DrivingVersion extends AbstractVersion {
  constructor() {
    super(
      games,
      ["en"],
      ["Demo"],
      loginConfig,
      [
        ["u", "i", "o", "j", "k", "l"],
      ]);
  }
}