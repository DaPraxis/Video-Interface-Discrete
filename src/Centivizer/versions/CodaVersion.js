import AbstractVersion from "./AbstractVersion";
import CodaInstructions from "../components/instructions/CodaInstructions";

const GAMES = [
  {
    name: "Coda",
    translationKey: "TagMeCoda",
    config: {
      game: {
        totalTrials: 144,
        moleDuration: 2500,
        moleInterval: 500, // 500 ms until auditory AND visual stimuli
        blockLength: 24,
        logData: true,
      },
      practice: {
        totalTrials: 16,
        moleDuration: 2500,
        moleInterval: 500, // 500 ms until auditory AND visual stimuli
        blockLength: 4,
        logData: true,
      },
    },
    instructionsComponent: CodaInstructions,
  },
];

const LOGIN = {
  partNumPattern: /^\d+$/,
  sessionNumPattern: /^\d+$/,
};

/*
 * Test version for development purposes
 */
export default class CodaVersion extends AbstractVersion {
  constructor() {
    super(GAMES, ["en"], ["Coda"], LOGIN, [["j", "", "k"]]);
  }
}
