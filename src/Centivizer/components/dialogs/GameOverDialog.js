import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import audio from "../../audio";
import QuestionnaireDialog from "./QuestionnaireDialog";


let mole;
let bubble;

if (true) {
  mole = require("../.." + "/assets/normal_cut.png");
  bubble = require("../.." + "/assets/dialogs/dialog.png");
}else{
  mole = "../.." + "/assets/normal_cut.png";
  bubble = "../.." + "/assets/dialogs/dialog.png";
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
    left: "25%",
    transform: "translateX(-50%)",
  },
  dialog: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundImage: `url(${bubble})`,
    backgroundSize: "100% 100%",
    left: "35%",
    top: "50%",
    transform: "translateY(-50%)",
    width: "520px",
  },
  content: {
    padding: "35px 50px 50px 90px",
  },
  title: {
    fontSize: "66px",
    margin: "0px 0px",
  },
  text: {
    fontSize: "24px",
    margin: "20px 0px",
  },
  popUpBackground:{
    visibility: "hidden",
    zIndex: "98",
    position: "absolute",
    top: "0",
    left: "0",
    height:"100%",
    width: "100%",
    backgroundColor: "rgba(51, 51, 51, 0.4)"
  },
  popUp:{
    zIndex: "99",
    position: "absolute",
    top: "37%",
    left: "40%",
    width: "300px",
    height: "auto",
    padding: "25px",
    border: "1px solid #55b7b6",
    borderRadius: "1rem",
    backgroundColor: "#F4F9ED",
    fontSize: "28px"
  },
  exitPopUp:{
    float: "right",
    margin: "10px auto",
    backgroundColor: "#55b7b6",
    borderRadius: "0.3rem",
    border: "none",
    fontSize: "20px",
    fontWeight: "bold",
    padding: "5px 8px",
    boxShadow: "0 4px 2px rgba(0, 0, 0, 0.2)",
    color: "white",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#55b7b6",
      transform: "scale(1.05)",
      transition: "transform .25s ease-out,-webkit-transform .25s ease-out",
    }
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
  },
});

function GameOverDialog(props) {
// export default function GameOverDialog(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [redirectToGame, setRedirectToGame] = React.useState(false);
  const [redirectToMainMenu, setRedirectToMainMenu] = React.useState(false);
  const { survey, shuffleQuestionnaire, nextSurveyPage, prevSurveyPage, surveyOrder, endSurvey } = props;
  const { step } = props.survey;

  const nextPage = e => {
    e.preventDefault();

    console.log(step);

    if(step>0 && step<2){
      var check = checkSurvey();
      if(check==true){
        var popup = document.querySelector(`.${classes.popUpBackground}`);
        popup.style.visibility = "visible";
      }else{
        if(step==1){
          endSurvey();
        }
        nextSurveyPage();
      }
    }
  }

  const previousPage = e => {
    e.preventDefault();
    prevSurveyPage();
  }

  const checkSurvey = () =>{
    var currentPage = surveyOrder[step-1];
    var currentQuestion = currentPage[0].toString();
    var a = 'a'+ currentQuestion;
    var answer = survey[`${a}`];
    if(answer == ''){
      return true;
    }
    return false;
  }

  // const completeSurvey = e =>{
  //   nextPage(e);
  //   endSurvey();
  // }

  const hidePopUp = e =>{
    e.preventDefault();

    var popup = document.querySelector(`.${classes.popUpBackground}`);
    popup.style.visibility = "hidden";
  }

  const goToQuestionnaire = e => {
    shuffleQuestionnaire();
    nextSurveyPage();
  }

  useEffect(() => {
    audio.playSound(audio.endGameSFX);
  }, [props.name]);

  const condition1 = (props.game.participantLastNum === 0 || props.game.participantLastNum === 5);
  var totalTrials = 0;
  switch(props.game.dataName){
    case 'TagMeOnly':
      totalTrials = 60;
      break
    case 'TagMeAgainEasy':
      totalTrials = 61;
      break
    case 'TagMeAgainMedium':
      totalTrials = 62;
      break
    case 'TagMeAgainHard':
      totalTrials = 63;
      break
    case 'TagMeBigger':
      totalTrials = 80;
      break      
  }

  switch (step){
    case 0:
      return(
        <>
          <div className={classes.blur}></div>
          <img className={classes.mole} src={mole} alt="" />
          <div className={classes.dialog}>
            <div className={classes.content}>
              <h1 className={classes.title}>{t("dialog.finishGame.title")}</h1>
              {/* '_' is placeholder for the user's score */}
              <p className={classes.text}>
                {!condition1 && (t("dialog.finishGame.text").replace('_',props.score))}
                {condition1 && (t("dialog.condition1").replace('_',props.game.numCorrect).replace('#',totalTrials))}
                {/* {props.isPractice && (
                  <>
                    <br />
                    {t("dialog.noFeedback")}
                  </>
                )} */}
              </p>

              <div className={classes.buttons}>
                {props.isPractice ? (
                  <div>
                    <button
                      className={classes.button}
                      onClick={() => {
                        setRedirectToGame(true);
                      }}
                    >
                      {t("dialog.playGameButton")}
                    </button>
                    {/* <button
                    className={classes.button}
                    onClick={() => {
                      audio.playSound(audio.backgroundMusic);
                      setRedirectToMainMenu(true);
                    }}
                    >
                      {t("dialog.mainMenu")}
                    </button> */}
                  </div>
                ) : 
                  // (
                  //   <button
                  //   className={classes.button}
                  //   onClick={goToQuestionnaire}
                  //   >
                  //     {t("questionnaire.takeSurveyButton")}
                  //   </button>
                  // )
                  <div>
                   <button
                    className={classes.button}
                    onClick={() => {
                      // audio.playBackgroundMusic();
                      // audio.playSound(audio.backgroundMusic);
                      setRedirectToMainMenu(true);
                    }}
                    >
                      {t("dialog.mainMenu")}
                    </button>
                  </div>
                }
                {redirectToGame &&
                  (props.isPractice ? (
                    <Redirect to={`/game${props.name}`} push />
                  ) : (
                    window.location.reload()
                  ))}

                {redirectToMainMenu ? <Redirect to="/mainmenu" push /> : <></>}
              </div>
            </div>
          </div>
        </>
      );
      case 1:
        return(
          <div>
            <QuestionnaireDialog
            name={props.name}
            survey={props.survey}
            setSurvey={props.setSurvey}
            nextPage={nextPage}
            previousPage={previousPage}
            checkSurvey={checkSurvey}
            shuffleQuestionnaire={props.shuffleQuestionnaire}
            surveyOrder={props.surveyOrder}
            />
            <div className={classes.popUpBackground}>
              <div className={classes.popUp}>
                <button
                className={classes.exitPopUp}
                onClick={hidePopUp}
                >X</button>
                {t("questionnaire.incompleteSurvey")}
              </div>
            </div>
          </div>
        );
      case 2:
        return(
            <>
            <div className={classes.blur}></div>
            <img className={classes.mole} src={mole} alt="" />
            <div className={classes.dialog}>
                <div className={classes.content}>
                <div>
                    <div>
                        <h1 className={classes.title}>{t("questionnaire.thanksTitle")}</h1>
                        <div className={classes.text}>{t("questionnaire.thanks")}</div>
                          <button
                          className={classes.button}
                          onClick={() => {
                            // audio.playSound(audio.backgroundMusic);
                            setRedirectToMainMenu(true);
                          }}
                          >
                            {t("dialog.mainMenu")}
                          </button>
                          {redirectToMainMenu ? <Redirect to="/mainmenu" push /> : <></>}
                        </div>
                    </div> 
                </div>
            </div>
            </>
        );
  };
};

export default GameOverDialog;
