import {TrialBasedTagMeQuick, TimeBasedTagMeQuick} from "../../games/TagMeQuick";
import TagMeOnly from "../../games/TagMeOnly";
import {TrialBasedTagMeBigger, TimeBasedTagMeBigger} from "../../games/TagMeBigger";
import {TrialBasedTagMeSwitch, TimeBasedTagMeSwitch} from "../../games/TagMeSwitch";
import TagMeAgain from "../../games/TagMeAgain";
import TagMeSame from "../../games/TagMeSame";
import TagMeWhere from "../../games/TagMeWhere";
import TagMeCoda from "../../games/TagMeCoda";
import TagMeTune from "../../games/TagMeTune";
import TagMeMood from "../../games/TagMeMood";

export default function createGame(name, config, isPractice) {
  switch (name) {
    case "Quick":
      if (config.mode) {
        return new TrialBasedTagMeQuick(
          isPractice,
          config.totalTrials,
          config.moleDuration,
          config.moleInterval
        );
      } else {
        return new TimeBasedTagMeQuick(
          isPractice,
          config.totalSeconds,
          config.moleDuration,
          config.moleInterval
        );
      }
      throw new Error("Not implemented");
    case "Only":
      if (config.mode) {
        return new TagMeOnly(
          isPractice,
          config.totalTrials,
          config.moleDuration,
          config.moleInterval,
          config.chance
        );
      }
      throw new Error("Not implemented");
    case "Bigger":
      if (config.mode) {
        return new TrialBasedTagMeBigger(
          isPractice,
          config.totalTrials,
          config.moleDuration,
          config.moleInterval,
          config.chance
        );
      } else {
        return new TimeBasedTagMeBigger(
          isPractice,
          config.totalSeconds,
          config.moleDuration,
          config.moleInterval,
          config.chance
        );
      }
      throw new Error("Not implemented");
    case "Switch":
      if (config.mode) {
        return new TrialBasedTagMeSwitch(
          isPractice,
          config.totalTrials,
          config.moleDuration,
          config.moleInterval
        );
      } else {
        return new TimeBasedTagMeSwitch(
          isPractice,
          config.totalSeconds,
          config.moleDuration,
          config.moleInterval
        );
      }
      throw new Error("Not implemented");
    case "Same":
      if (config.mode) {
        return new TagMeSame(
          isPractice,
          config.totalTrials,
          config.moleDuration,
          config.moleInterval
        );
      }
      throw new Error("Not implemented");
    case "Where":
      if (config.mode) {
        return new TagMeWhere(
          isPractice,
          config.totalTrials,
          config.moleDuration,
          config.moleInterval,
          config.chance
        );
      }
      throw new Error("Not implemented");
    case /Again\w*/.test(name) ? name : "":
      if (config.mode) {
        return new TagMeAgain(
          isPractice,
          config.totalTrials,
          config.moleDuration,
          config.moleInterval,
          config.chance,
          config.prev,
          name.slice(5)
        );
      }
      throw new Error("Not implemented");
    case "Coda":
      const participant = localStorage.getItem("participant");
      return new TagMeCoda(
        isPractice,
        config.totalTrials,
        config.moleDuration,
        config.moleInterval,
        config.blockLength,
        participant % 64
      );
    case "Tune":
      return new TagMeTune(
        isPractice,
        config.totalTrials,
        config.moleDuration,
        config.moleInterval,
        config.blockLength
      );
    case /Mood\w*/.test(name) ? name : "":
      return new TagMeMood(
        isPractice,
        config.totalTrials,
        config.moleDuration,
        config.moleInterval,
        config.version
      );
    default:
      throw new Error("Invalid game name");
  }
}