import AbstractVersion from "./AbstractVersion";
import QuickInstructions from "../components/instructions/QuickInstructions";
import BiggerInstructions from "../components/instructions/BiggerInstructions";
import WhereInstructions from "../components/instructions/WhereInstructions";

const games = [
  {
    name: "Quick",
    translationKey: "TagMeQuick600",
    config: {
      game: {
        mode: 1, // trial-based
        totalTrials: 60,
        moleDuration: 600,
        moleInterval: 600,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 600,
        moleInterval: 600,
      },
    },
    instructionsComponent: QuickInstructions,
  },
  {
    name: "Quick",
    translationKey: "TagMeQuick800",
    config: {
      game: {
        mode: 1, // trial-based
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
    name: "Where",
    translationKey: "TagMeWhere700",
    config: {
      game: {
        mode: 1, // trial-based
        totalTrials: 120,
        moleDuration: 700,
        moleInterval: 700,
        chance: 0.8,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 700,
        moleInterval: 700,
        chance: 0.8,
      },
    },
    instructionsComponent: WhereInstructions,
  },
  {
    name: "Where",
    translationKey: "TagMeWhere800",
    config: {
      game: {
        mode: 1, // trial-based
        totalTrials: 120,
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
    name: "Bigger",
    translationKey: "TagMeBigger800",
    config: {
      game: {
        mode: 1, // trial-based
        totalTrials: 80,
        moleDuration: 0,
        moleInterval: 800,
        chance: 0.5,
      },
      practice: {
        mode: 1, // trial-based
        totalTrials: 10,
        moleDuration: 0,
        moleInterval: 800,
        chance: 0.5,
      },
    },
    instructionsComponent: BiggerInstructions,
  },
  {
    name: "Bigger",
    translationKey: "TagMeBigger1000",
    config: {
      game: {
        mode: 1, // trial-based
        totalTrials: 80,
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
export default class MIEVersion extends AbstractVersion {
  constructor() {
    super(games, ["en"], ["MIE242"], loginConfig);
  }
}
