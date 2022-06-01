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

const games = [
  {
    name: "Quick",
    translationKey: "TagMeQuick",
    config: {
      game: {
        mode: 1, // time-based
        totalTrials: 60,
        moleDuration: 800,
        moleInterval: 800,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 800,
        moleInterval: 800,
      },
    },
    instructionsComponent: QuickInstructions,
  },
  {
    name: "Only",
    translationKey: "TagMeOnly",
    config: {
      game: {
        mode: 1, // trial-based
        totalTrials: 60,
        moleDuration: 800,
        moleInterval: 800,
        chance: 0.3,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 800,
        moleInterval: 800,
        chance: 0.3,
      },
    },
    instructionsComponent: OnlyInstructions,
  },
  {
    name: "AgainEasy",
    translationKey: "TagMeAgainEasy",
    config: {
      game: {
        mode: 1, // trial-based
        totalTrials: 60,
        moleDuration: 800,
        moleInterval: 1200,
        chance: 0.25,
        prev: 1,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 800,
        moleInterval: 1200,
        chance: 0.3,
        prev: 1,
      },
    },
    instructionsComponent: AgainEasyInstructions,
  },
  {
    name: "AgainMedium",
    translationKey: "TagMeAgainMedium",
    config: {
      game: {
        mode: 1, // trial-based
        totalTrials: 60,
        moleDuration: 800,
        moleInterval: 1200,
        chance: 0.25,
        prev: 2,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 800,
        moleInterval: 1200,
        chance: 0.3,
        prev: 2,
      },
    },
    instructionsComponent: AgainMediumInstructions,
  },
  {
    name: "AgainHard",
    translationKey: "TagMeAgainHard",
    config: {
      game: {
        mode: 1, // trial-based
        totalTrials: 60,
        moleDuration: 800,
        moleInterval: 1200,
        chance: 0.25,
        prev: 3,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 800,
        moleInterval: 1200,
        chance: 0.3,
        prev: 3,
      },
    },
    instructionsComponent: AgainHardInstructions,
  },
  {
    name: "Switch",
    translationKey: "TagMeSwitch",
    config: {
      game: {
        mode: 1, // trial-based
        totalTrials: 90,
        moleDuration: 0,
        moleInterval: 1000,
      },
      practice: {
        mode: 1, // ????
        totalTrials: 0,
        moleDuration: 0,
        moleInterval: 0,
      },
    },
    instructionsComponent: SwitchInstructions,
  },
  {
    name: "Where",
    translationKey: "TagMeWhere",
    config: {
      game: {
        mode: 1, // trial-based
        totalTrials: 60,
        moleDuration: 800,
        moleInterval: 800,
        chance: 0.8,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 800,
        moleInterval: 800,
        chance: 0.8,
      },
    },
    instructionsComponent: WhereInstructions,
  },
  {
    name: "Same",
    translationKey: "TagMeSame",
    config: {
      game: {
        mode: 1, // time-based
        totalTrials: 60,
        moleDuration: 0,
        moleInterval: 600,
      },
      practice: {
        mode: 1, // time-based
        totalTrials: 60,
        moleDuration: 0,
        moleInterval: 600,
      },
    },
    instructionsComponent: SameInstructions,
  },
  {
    name: "Bigger",
    translationKey: "TagMeBigger",
    config: {
      game: {
        mode: 1, // trial-based
        totalTrials: 60,
        moleDuration: 0,
        moleInterval: 1000,
        chance: 0.5,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 0,
        moleInterval: 1000,
        chance: 0.5,
      },
    },
    instructionsComponent: BiggerInstructions,
  },
];

let loginConfig = {
  partNumPattern: /.*/,
  sessionNumPattern: /.*/,
};

/*
 * Test version for development purposes
 */
export default class FigmaVersion extends AbstractVersion {
  constructor() {
    super(
      games,
      ["enFigma", "fr"],
      ["AGEWELL", "ID-Adults", "Validation UWO"],
      loginConfig
    );
  }
}
