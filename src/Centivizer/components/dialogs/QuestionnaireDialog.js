import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import audio from "../../audio";
import QuestionnairePage from "./QuestionnairePage";
import QuestionnaireButton from "./QuestionnaireButton";

let mole;
let bubble;

if (true) {
  mole = require("../.." + "/assets/normal_cut.png");
  bubble = require("../.." + "/assets/dialogs/dialog_big.png");
}else{
  mole = "../.." + "/assets/normal_cut.png";
  bubble = "../.." + "/assets/dialogs/dialog_big.png";
}

const useStyles = makeStyles({
  blur: {
    position: "absolute",
    backdropFilter: "blur(4px)",
    width: "100%",
    height: "100%",
    top: "0px",
    left: "0px",
  },
  mole: {
    position: "absolute",
    width: "25%",
    bottom: "0px",
    left: "-3%",
  },
  dialog: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    backgroundImage: `url(${bubble})`,
    backgroundSize: "100% 100%",
    left: "15%",
    top: "25%",
    width: "70vw",
    paddingBottom: "20px"
  },
  content: {
    fontFamily: '"Open Sans", sans-serif',
    margin: "0 0 0 0",
  },
  title: {
    fontSize: "36px",
    margin: "0px 0px",
  },
  text: {
    fontSize: "24px",
    margin: "20px 0px",
  },
  twoButtons:{
    alignSelf: "center",
    display: "inline-grid",
    gridTemplateColumns: "10vw 40vw 10vw",
    columnGap: "0px"
  },
  nextButton: {
    backgroundColor: "#535F27",
    "&:hover": {
      backgroundColor: "#535F27",
    },
  },
  backButton: {
    backgroundColor: "#333333",
    "&:hover": {
      backgroundColor: "#333333",
    },
  },
  button: {
    margin: "10px auto",
    backgroundColor: "#55b7b6",
    borderRadius: "0.3rem",
    border: "none",
    fontSize: "20px",
    fontWeight: "bold",
    padding: "15px 30px",
    boxShadow: "0 4px 2px rgba(0, 0, 0, 0.2)",
    color: "white",
    width: "260px",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#55b7b6",
      transform: "scale(1.05)",
      transition: "transform .25s ease-out,-webkit-transform .25s ease-out",
    },
  }
});

function QuestionnaireDialog(props) {

  const classes = useStyles();
  const { t } = useTranslation();
  const { survey, setSurvey, nextPage, previousPage, surveyOrder } = props;
  const { step } = props.survey;

  useEffect(() => {
    audio.playSound(audio.endGameSFX);
  }, [props.name]);

  // console.log(`step: ${step}`);
  // console.log(surveyOrder);

  switch(step) {
      case 1:
        return(
            <>
            <div className={classes.blur}></div>
            <img className={classes.mole} src={mole} alt="" />
            <div className={classes.dialog}>
                <div className={classes.content}>
                  <QuestionnairePage
                  survey={survey}
                  setSurvey={setSurvey}
                  page={surveyOrder[0]}
                  />
                  <div className={classes.twoButtons}>
                      <QuestionnaireButton
                      className={classes.backButton}
                      onClick={previousPage}
                      >
                        {"< " + t("back")}
                      </QuestionnaireButton>
                      <div></div>
                      <QuestionnaireButton
                      className={classes.nextButton}
                      onClick={nextPage}
                      >
                        {t("submit") + ">"}
                      </QuestionnaireButton>
                  </div> 
                </div>
            </div>
            </>
        );
    };
};

export default QuestionnaireDialog;
