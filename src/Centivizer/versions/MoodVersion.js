import AbstractVersion from "./AbstractVersion";
import MoodBaselineInstructions from "../components/instructions/MoodBaselineInstructions";
import MoodAllInstructions from "../components/instructions/MoodAllInstructions";
import MoodFearfulInstructions from "../components/instructions/MoodFearfulInstructions";
import MoodHappyInstructions from "../components/instructions/MoodHappyInstructions";
import MoodNeutralInstructions from "../components/instructions/MoodNeutralInstructions";

const GAMES = [
  {
    name: "MoodBaseline",
    translationKey: "TagMeMoodBaseline",
    config: {
      game: {
        totalTrials: 60,
        moleDuration: 2000,
        moleInterval: 1000,
        version: "baseline",
        logData: true,
      },
      practice: {
        totalTrials: 10, // minimum needed to finish practice; may change
        moleDuration: 2000,
        moleInterval: 1000,
        version: "baseline",
        logData: true,
      },
    },
    instructionsComponent: MoodBaselineInstructions,
  },
  {
    name: "MoodAll",
    translationKey: "TagMeMoodAll",
    config: {
      game: {
        totalTrials: 60,
        moleDuration: 2000,
        moleInterval: 1000,
        version: "all",
        logData: true,
      },
      practice: {
        totalTrials: 10, // minimum needed to finish practice; may change
        moleDuration: 2000,
        moleInterval: 1000,
        version: "all",
        logData: true,
      },
    },
    instructionsComponent: MoodAllInstructions,
  },
  {
    name: "MoodNeutral",
    translationKey: "TagMeMoodNeutral",
    config: {
      game: {
        totalTrials: 60,
        moleDuration: 2000,
        moleInterval: 1000,
        version: "neutral",
        logData: true,
      },
      practice: {
        totalTrials: 10, // minimum needed to finish practice; may change
        moleDuration: 2000,
        moleInterval: 1000,
        version: "neutral",
        logData: true,
      },
    },
    instructionsComponent: MoodNeutralInstructions,
  },
  {
    name: "MoodFearful",
    translationKey: "TagMeMoodFearful",
    config: {
      game: {
        totalTrials: 60,
        moleDuration: 2000,
        moleInterval: 1000,
        version: "fearful",
        logData: true,
      },
      practice: {
        totalTrials: 10, // minimum needed to finish practice; may change
        moleDuration: 2000,
        moleInterval: 1000,
        version: "fearful",
        logData: true,
      },
    },
    instructionsComponent: MoodFearfulInstructions,
  },
  {
    name: "MoodHappy",
    translationKey: "TagMeMoodHappy",
    config: {
      game: {
        totalTrials: 60,
        moleDuration: 2000,
        moleInterval: 1000,
        version: "happy",
        logData: true,
      },
      practice: {
        totalTrials: 10, // minimum needed to finish practice; may change
        moleDuration: 2000,
        moleInterval: 1000,
        version: "happy",
        logData: true,
      },
    },
    instructionsComponent: MoodHappyInstructions,
  },
];

const LOGIN = {
  partNumPattern: /^\d+$/,
  sessionNumPattern: /^\d+$/,
};

export default class TuneVersion extends AbstractVersion {
  constructor() {
    super(GAMES, ["en"], ["Mood"], LOGIN, [["u", "i", "o", "j", "k", "l"]]);
  }
}
