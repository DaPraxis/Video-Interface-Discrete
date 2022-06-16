import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import audio from "../../audio"

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
    height: "300px",
    bottom: "0px",
    left: "calc(35vw - 300px)",
  },
  dialog: {
    position: "absolute",
    backgroundImage: `url(${bubble})`,
    backgroundSize: "100% 100%",
    left: "35%",
    bottom: "25%",
    width: "550px",
  },
  content: {
    margin: "50px 50px 50px 90px",
  },
  title: {
    fontSize: "54px",
    margin: "10px 0px",
  },
  text: {
    fontSize: "32px",
    margin: "20px 0px",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
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

function GameOver(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [redirectToGame, setRedirectToGame] = React.useState(false);
  const [redirectToMainMenu, setRedirectToMainMenu] = React.useState(false);
  
  useEffect(() => {
    audio.playSound(audio.endGameSFX)
  }, [props.name])

  return (
    <React.Fragment>
      <div className={classes.blur}></div>
      <img className={classes.mole} src={mole} alt="" />
      <div className={classes.dialog}>
        <div className={classes.content}>
          <h1 className={classes.title}>{t("dialog.finishGame.title")}</h1>
          {/* '_' is placeholder for the user's score */}
          <p className={classes.text}>{t("dialog.finishGame.text").replace("_", props.score)}</p>
          <div className={classes.buttons}>
            <button
              className={classes.button}
              onClick={() => {
                setRedirectToGame(true);
              }}
            >
              {props.isPractice ? t("dialog.playGameButton") : t("dialog.replayButton")}
            </button>
            {redirectToGame ? (
              props.isPractice ? (
                <Redirect to={`/game${props.name}`} push />
              ) : (
                window.location.reload()
              )
            ) : (
              <></>
            )}
            {/* <button
              className={classes.button}
              onClick={() => {
                setRedirectToMainMenu(true);
              }}
            >
              {t("dialog.mainMenu")}
            </button> */}
            {redirectToMainMenu ? <Redirect to="/mainmenu" push /> : <></>}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default GameOver;