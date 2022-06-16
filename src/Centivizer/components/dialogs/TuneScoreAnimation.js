import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

import CoinAnimation from "./CoinAnimation.js";

let happy;
let sad;
let bubble;

if (true) {
  happy = require("../.." + "/assets/happy_cut.png");
  sad = require("../.." + "/assets/cry_cut.png");
  bubble = require("../.." + "/assets/dialogs/dialog.png");
}else{
  happy = "../.." + "/assets/happy_cut.png";
  sad = "../.." + "/assets/cry_cut.png";
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
    width: "600px",
  },
  content: {
    padding: "35px 50px 50px 90px",
  },
  title: {
    fontSize: "66px",
    margin: "0px 0px",
  },
  text: {
    fontSize: "22px",
    margin: "20px 0px",
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
  hint: {
    color: "#55b7b6",
    fontWeight: "bold",
    margin: "5px 0px 0px 0px",
  },
  coins: {
    position: "relative",
    marginTop: "20px",
  },
  score: {
    position: "absolute",
    right: "15px",
    top: "-85px",
    fontSize: "58px",
    fontWeight: "bold",
    transform: "rotate(-20deg)",
    zIndex: "1000",
  },
  red: {
    color: "rgb(255, 85, 85)",
  },
});

export default function TuneScoreAnimation(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [scores] = useState([
    props.score,
    props.score + props.game.numCorrect,
    Math.max(props.score + props.game.numCorrect - props.game.numIncorrect, 0),
    Math.max(props.score + props.game.numCorrect - props.game.numIncorrect, 0),
  ]);
  const [redirect, setRedirect] = useState(false);

  const pages = props.game.isPractice ? 4 : 3;

  const onMouseUp = () => {
    if (props.game.isPractice && page === 0 && ending !== 1) {
      localStorage.setItem("tune.lives", Math.max(lives - 1, 0));
    }
    if (page < pages - 1) {
      props.setScore(scores[page + 1]);
      setPage(page + 1);
    } else {
      if (props.game.isPractice) {
        setRedirect(true);
      } else {
        if (props.game.currentTrial < props.game.totalTrials) {
          props.setScore(0);
        }
        props.game.numCorrect = 0;
        props.game.numIncorrect = 0;
        props.onClose();
      }
    }
  };

  useEffect(() => {
    const onKeyUp = (e) => {
      if (e.keyCode === 32) {
        // key is spacebar
        onMouseUp();
      }
    };

    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [onMouseUp]);

  const lives = parseInt(localStorage.getItem("tune.lives"), 10);
  const percent = Math.round(
    (props.game.numCorrect / props.game.totalTrials) * 100
  );
  let ending, path;
  if (lives === 0) {
    ending = 2;
    path = "/mainmenu";
  } else {
    if (percent >= 80) {
      ending = 1;
      path = "/gameTune";
    } else {
      ending = 0;
    }
  }

  const possibleEndingTitles = [
    "Nice Try! Let's Try Again!",
    "Great Job!",
    "Uh-oh!",
  ];
  const possibleEndingText = [
    `You received ${props.score} total point${
      props.score === 1 ? "" : "s"
    }.\nYour correct hit rate is ${percent}%, which is lower than 80%. Please try again!`,
    `You received ${props.score} total point${
      props.score === 1 ? "" : "s"
    }.\nYour correct hit rate is ${percent}%, which is ${
      percent === 80 ? "equal to" : "greater than"
    } 80%. Go ahead and play the full game!`,
    `You received ${props.score} total point${
      props.score === 1 ? "" : "s"
    }. You have tried three times and all your correct hit rates are lower than 80%.`,
  ];
  const possibleEndingReactions = [sad, happy, sad];
  const possibleEndingButtons = [
    t("dialog.replayButton"),
    t("dialog.playGameButton"),
    "MAIN MENU",
  ];

  const titles = ["Pretty Quick!", "Great Job!", "Nice Try!"];
  const text = [
    `You scored ${props.score} point${
      props.score === 1 ? "" : "s"
    } based on your reaction time of every trial!`,
    `You got ${props.game.numCorrect} correct mole${
      props.game.numCorrect === 1 ? "" : "s"
    }!`,
    `You got ${props.game.numIncorrect} wrong mole${
      props.game.numIncorrect === 1 ? "" : "s"
    }!`,
  ];
  const reactions = [happy, happy, sad];
  const overlay = [
    null,
    <p className={classes.score}>+{props.game.numCorrect}</p>,
    <p className={`${classes.score} ${classes.red}`}>
      -{props.game.numIncorrect}
    </p>,
  ];
  let button;
  if (page === pages - 1 && props.game.isPractice) {
    button = possibleEndingButtons[ending];
  } else if (
    page < pages - 1 ||
    props.game.currentTrial === props.game.totalTrials
  ) {
    button = t("dialog.button");
  } else {
    button = t("dialog.nextButton");
  }

  if (props.game.isPractice) {
    titles.push(possibleEndingTitles[ending]);
    text.push(possibleEndingText[ending]);
    reactions.push(possibleEndingReactions[ending]);
  }

  return (
    <>
      {redirect &&
        (ending ? <Redirect to={path} push /> : window.location.reload())}
      <div className={classes.blur}></div>
      <img className={classes.mole} src={reactions[page]} alt="" />
      <div className={classes.dialog}>
        <div className={classes.content}>
          <h1 className={classes.title}>{titles[page]}</h1>
          {page < 3 && (
            <div className={classes.coins}>
              <CoinAnimation page={page} coins={scores} />
              {overlay[page]}
            </div>
          )}
          <p className={classes.text}>{text[page]}</p>
          <button onMouseUp={onMouseUp} className={classes.button}>
            {button}
          </button>
          <p className={classes.hint}>
            {t("dialog.hint").replace("_", button)}
          </p>
        </div>
      </div>
    </>
  );
}
