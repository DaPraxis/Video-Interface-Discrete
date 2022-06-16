import React, { useState, useEffect } from "react";
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

export default function MoodScoreAnimation(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [scores] = useState([
    props.score,
    Math.max(props.score - props.game.numIncorrect, 0),
    Math.max(props.score - props.game.numIncorrect, 0) + props.game.numCorrect,
  ]);

  const onMouseUp = () => {
    if (page < 2) {
      props.setScore(scores[page + 1]);
      setPage(page + 1);
    } else {
      props.onClose();
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

  const titles = ["Great Job!", "Nice Try!", "Pretty Quick!"];
  const text = [
    `You got ${props.score} correct face${props.score === 1 ? "" : "s"}!`,
    `You lost ${props.game.numIncorrect} point${
      props.game.numIncorrect === 1 ? "" : "s"
    } because of either tagging the wrong faces or missing the correct faces!`,
    `You got ${props.game.numCorrect} correct face${
      props.game.numCorrect === 1 ? "" : "s"
    } under 800 ms!`,
  ];
  const reactions = [happy, sad, happy];
  const overlay = [
    null,
    <p className={`${classes.score} ${classes.red}`}>
      -{props.game.numIncorrect}
    </p>,
    <p className={classes.score}>+{props.game.numCorrect}</p>,
  ];

  return (
    <>
      <div className={classes.blur}></div>
      <img className={classes.mole} src={reactions[page]} alt="" />
      <div className={classes.dialog}>
        <div className={classes.content}>
          <h1 className={classes.title}>{titles[page]}</h1>
          <div className={classes.coins}>
            <CoinAnimation page={page} coins={scores} />
            {overlay[page]}
          </div>
          <p className={classes.text}>{text[page]}</p>
          <button onMouseUp={onMouseUp} className={classes.button}>
            {t("dialog.button")}
          </button>
          <p className={classes.hint}>
            {t("dialog.hint").replace("_", t("dialog.button"))}
          </p>
        </div>
      </div>
    </>
  );
}
