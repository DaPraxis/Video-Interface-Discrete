import AbstractVersion from "./AbstractVersion";
import TuneInstructions from "../components/instructions/TuneInstructions";

const games = [
  {
    name: "Tune",
    translationKey: "TagMeTune",
    config: {
      game: {
        totalTrials: 288,
        moleDuration: 2200, // pilot testing
        moleInterval: 1000,
        blockLength: 48,
        logData: true,
      },
      practice: {
        totalTrials: 20,
        moleDuration: 2200, // pilot testing
        moleInterval: 1000,
        blockLength: 10,
        logData: true,
      },
    },
    instructionsComponent: TuneInstructions,
  },
];

const loginConfig = {
  partNumPattern: /^\d+$/,
  sessionNumPattern: /^\d+$/,
};

/*
 * Test version for development purposes
 */
export default class TuneVersion extends AbstractVersion {
  constructor() {
    super(games, ["en"], ["Tune"], loginConfig, [["j", "", "k"]]);
  }
}
