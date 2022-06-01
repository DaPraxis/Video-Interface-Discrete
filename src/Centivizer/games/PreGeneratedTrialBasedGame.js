import TrialBasedGame from "./TrialBasedGame.js";

export default class PreGeneratedTrialBasedGame extends TrialBasedGame {
  constructor(
    args,
    numTrials,
    stimChance,
    STREAK_REMEMBRANCE = 3,
    MAX_STREAK = 5,
    REGULIZATION_FACTOR = 2
  ) {
    super(args, numTrials);
    this.moleSequence = this.generateMoles(
      numTrials,
      stimChance,
      STREAK_REMEMBRANCE,
      MAX_STREAK,
      REGULIZATION_FACTOR
    );
  }

  _chooseHoles(state) {
    return this.moleSequence[this.trials];
  }

  generateMoles(
    TOTAL_TRIALS,
    STIMULUS_CHANCE,
    STREAK_REMEMBRANCE,
    MAX_STREAK,
    REGULIZATION_FACTOR
  ) {
    throw new Error("Not implemented");
  }

  generateStimulusArray(
    TOTAL_TRIALS,
    STIMULUS_CHANCE,
    STREAK_REMEMBRANCE,
    MAX_STREAK,
    REGULIZATION_FACTOR
  ) {
    let stimLeft = Math.floor(TOTAL_TRIALS * STIMULUS_CHANCE);
    let regularLeft = TOTAL_TRIALS - stimLeft;
    let molesLeft = TOTAL_TRIALS;
    let recentStreaks = [];
    let stimArray = [];

    //skews first streaks towards the average streak
    for (let i = 0; i < STREAK_REMEMBRANCE; i++) {
      recentStreaks.push(2 / MAX_STREAK);
    }

    while (molesLeft > 0) {
      let streakLength;

      if (stimLeft === 0) {
        //if no stimlus moles left, fill rest of array with regular
        for (let i = 0; i < regularLeft; i++) {
          stimArray.push(false);
          regularLeft -= 1;
          molesLeft -= 1;
        }
      } else if (regularLeft > 0) {
        //get average of recent streaks
        let recentStreakAvg = 0;
        for (let streak of recentStreaks) {
          recentStreakAvg += streak;
        }
        recentStreakAvg /= STREAK_REMEMBRANCE;

        // calculate avg streak length to accomadate moles left
        let avgStreak = Math.floor(regularLeft / stimLeft);

        // calculate regularization amount based on ratio of
        // avg streak required to fill rest of moles / recent avg streak
        let streakRegularizer;
        streakRegularizer =
          (avgStreak / recentStreakAvg) ** REGULIZATION_FACTOR;

        streakLength = Math.min(
          MAX_STREAK,
          molesLeft - (stimLeft - 1) * 2 - 1, // max size of this streak to ensure stim moles never double up
          Math.floor(Math.random() * MAX_STREAK * streakRegularizer) + 1,
          regularLeft
        );
        recentStreaks = recentStreaks.splice(1);
        recentStreaks.push(streakLength);

        for (let i = 0; i < streakLength; i++) {
          stimArray.push(false);
          regularLeft -= 1;
          molesLeft -= 1;
        }

        if (stimLeft > 0) {
          stimArray.push(true);
          stimLeft -= 1;
          molesLeft -= 1;
        }
      } else {
        //if no regular moles left, fill with stim moles
        //ideally this case will never happen
        for (let i = 0; i < stimLeft; i++) {
          stimArray.push(true);
          stimLeft -= 1;
          molesLeft -= 1;
        }
      }
    }
    return stimArray;
  }
}
