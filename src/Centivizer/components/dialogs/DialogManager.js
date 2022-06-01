import React from "react";

import GameOverDialog from "./GameOverDialog";
import CodaScoreAnimation from "./CodaScoreAnimation";
import TuneScoreAnimation from "./TuneScoreAnimation";
import MoodScoreAnimation from "./MoodScoreAnimation";
import BasicDialog from "./BasicDialog";
import ViewControlsDialog from "./ViewControlsDialog";

export default function DialogManager(props) {
  switch (props.dialog) {
    case "coda":
      return (
        <CodaScoreAnimation
          game={props.game}
          score={props.score}
          setScore={props.setScore}
          onClose={props.onClose}
        />
      );
    case "tune":
      return (
        <TuneScoreAnimation
          game={props.game}
          score={props.score}
          setScore={props.setScore}
          onClose={props.onClose}
        />
      );
    case "mood":
      return (
        <MoodScoreAnimation
          game={props.game}
          score={props.score}
          setScore={props.setScore}
          onClose={props.onClose}
        />
      );
    case /error-\w+/.test(props.dialog) ? props.dialog : "":
      return (
        <ViewControlsDialog dialog={props.dialog} onClose={props.onClose} />
      );
    case "game-over":
      return (
        <GameOverDialog
          game={props.game}
          score={props.score}
          name={props.name}
          dialog={props.dialog}
          isPractice={props.game.isPractice}
          isReplayable={props.game.isReplayable}
          survey={props.survey}
          setSurvey={props.setSurvey}
          nextSurveyPage={props.nextSurveyPage}
          prevSurveyPage={props.prevSurveyPage}
          shuffleQuestionnaire={props.shuffleQuestionnaire}
          surveyOrder={props.surveyOrder}
          endSurvey={props.endSurvey}
        />
      );
    default:
      return <BasicDialog dialog={props.dialog} onClose={props.onClose} />;
  }
}
