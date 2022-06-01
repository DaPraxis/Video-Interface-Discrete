import AbstractVersion from "./AbstractVersion";
import SwitchInstructions from "../components/instructions/SwitchInstructions";
import QuickInstructions from "../components/instructions/QuickInstructions";
import BiggerInstructions from "../components/instructions/BiggerInstructions";
import OnlyInstructions from "../components/instructions/OnlyInstructions";
import SameInstructions from "../components/instructions/SameInstructions";
import WhereInstructions from "../components/instructions/WhereInstructions";
import AgainEasyInstructions from "../components/instructions/AgainEasyInstructions";
import CodaInstructions from "../components/instructions/CodaInstructions";
import AgainMediumInstructions from "../components/instructions/AgainMediumInstructions";
import AgainHardInstructions from "../components/instructions/AgainHardInstructions";

const games = [
  {
    name: "Quick",
    translationKey: "TagMeQuick",
    config: {
      game: {
        mode: 0, // time-based
        totalSeconds: 180,
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
        totalTrials: 61,
        moleDuration: 1200,
        moleInterval: 1200,
        chance: 0.25,
        prev: 1,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 1200,
        moleInterval: 1200,
        chance: 0.3,
        prev: 1,
      },
    },
    instructionsComponent: CodaInstructions,
  },
  {
    name: "AgainMedium",
    translationKey: "TagMeAgainMedium",
    config: {
      game: {
        mode: 1, // trial-based
        totalTrials: 62,
        moleDuration: 1200,
        moleInterval: 1200,
        chance: 0.25,
        prev: 2,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 1200,
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
        totalTrials: 63,
        moleDuration: 1200,
        moleInterval: 1200,
        chance: 0.25,
        prev: 3,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 1200,
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
        totalTrials: 10,
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
        mode: 0, // time-based
        totalSeconds: 120,
        moleDuration: 0,
        moleInterval: 600,
      },
      practice: {
        mode: 0, // time-based
        totalSeconds: 20,
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
  partNumPattern: /^\d+$/,
  sessionNumPattern: /^\d+$/,
};

/*
 * Test version for development purposes
 */
export default class ShanghaiVersion extends AbstractVersion {
  constructor() {
    super(games, ["en", "zh"], ["Shanghai"], loginConfig, [
      ["q", "w", "e", "a", "s", "d"],
      ["u", "i", "o", "j", "k", "l"],
    ]);
  }
}
