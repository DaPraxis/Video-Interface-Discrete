import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

let mole;
let bubble;

if (process.env.NODE_ENV === 'development') {
  mole = require("../.." + "/assets/normal_cut.png");
  bubble = require("../.." + "/assets/dialogs/dialog.png");
}else{
  mole = "../.." + "/assets/normal_cut.png";
  bubble = "../.." + "/assets/dialogs/dialog.png";
}

const CODA_CORRECT = [
  "The answer is 'cloud'.",
  "The answer is 'pig'.",
  "The answer is 'watch'.",
  "The answer is 'keyboard'.",
  "The answer is 'arrow'.",
  "The answer is 'envelope'.",
  "The answer is 'lamp'.",
  "The answer is 'orange'.",
  "The answer is 'leaf'.",
  "The answer is 'mushroom'.",
  "The answer is 'toothbrush'.",
  "The answer is 'giraffe'.",
  "The answer is 'ring'.",
  "The answer is 'match'.",
  "The answer is 'wrench'.",
  "The answer is 'comb'.",
];

const CODA_INCORRECT = [
  "'Cloud' ends with the sound 'D'.",
  "'Pig' does not end with the sound 'D'.",
  "'Watch' does not end with the sound 'D'.",
  "'Keyboard' ends with the sound 'D'.",
  "'Arrow' does not end with the sound 'P'.",
  "'Envelope' ends with the sound 'P'.",
  "'Lamp' ends with the sound 'P'.",
  "'Orange' does not end with the sound 'P'.",
  "'Leaf' ends with the sound 'F'.",
  "'Mushroom' does not end with the sound 'F'.",
  "'Toothbrush' does not end with the sound 'F'.",
  "'Giraffe' ends with the sound 'F'.",
  "'Ring' does not end with the sound 'CH'.",
  "'Match' ends with the sound 'CH'.",
  "'Wrench' ends with the sound 'CH'.",
  "'Comb' does not end with the sound 'CH'.",
];

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
    minHeight: "280px",
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
});

// MAKE EACH GAME RESPONSIBLE FOR IT'S OWN DIALOG

export default function BasicDialog(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  let timer = 0;
  let title, text;
  switch (props.dialog) {
    case 2:
      title = t("dialog.faster.title");
      text = t("dialog.faster.text");
      break;
    case 3:
      title = t("dialog.tagHat.title");
      text = t("dialog.tagHat.text");
      break;
    case 4:
      title = t("dialog.emptyHole.title");
      text = t("dialog.emptyHole.text");
      break;
    case 5:
      title = t("dialog.bigger.title");
      text = t("dialog.bigger.text");
      break;
    case 6:
      title = t("dialog.color.title");
      text = t("dialog.color.text");
      break;
    case "one-back":
      title = t("dialog.1b.title");
      text = t("dialog.1b.text");
      break;
    case "two-back":
      title = t("dialog.2b.title");
      text = t("dialog.2b.text");
      break;
    case "three-back":
      title = t("dialog.3b.title");
      text = t("dialog.3b.text");
      break;
    case "volume":
      title = "Wait!";
      text = "Remember to turn on the sound.";
      break;
    case /coda-incorrect-\d*/.test(props.dialog) ? props.dialog : "":
      title = "Try Again!";
      text = CODA_INCORRECT[parseInt(props.dialog.match(/\d+/).join([]))];
      break;
    case /coda-correct-final-\d*/.test(props.dialog) ? props.dialog : "":
      title = "Correct!";
      text = `${
        CODA_CORRECT[parseInt(props.dialog.match(/\d+/).join([]))]
      } After this, you will only see 'correct' without the actual word.`;
      break;
    case /coda-correct-\d*/.test(props.dialog) ? props.dialog : "":
      title = "Correct!";
      text = CODA_CORRECT[parseInt(props.dialog.match(/\d+/).join([]))];
      break;
    case "coda-correct":
      timer = 1000;
      title = "Correct!";
      text = "";
      break;
    case "three-attempts":
      const lives = parseInt(localStorage.getItem("lives"), 10);
      title = "Hey!";
      text = `This is a practice round to get familiar with the rules. You will get points based on speed and accuracy. You can play this round ${
        lives === 3 ? "up to" : ""
      } ${lives} ${lives < 3 ? "more" : ""} time${lives > 1 ? "s" : ""}.`;
      break;
    case "real-experiment":
      title = "Hey!";
      text =
        "Now that you have had a chance to practice, you may begin the real trials. You will get points based on speed and accuracy.";
      break;
    case "IT":
      title = "Hey!";
      text = (
        <>
          In this round, the middle mole will be wearing the <b>"in-tune"</b>{" "}
          shirt. Does the chord played with the second mole match the expected
          sound?
        </>
      );
      break;
    case "OT":
      title = "Hey!";
      text = (
        <>
          In this round, the middle mole will be wearing the{" "}
          <b>"out-of-tune"</b> shirt. Does the chord played with the second mole
          match the expected sound?
        </>
      );
      break;
    case "baseline-faces":
      title = "Hey!";
      text = (
        <>
          In this round, you will be tagging <b>all</b> faces as quickly and
          accurately as possible. Let's try it!
        </>
      );
      break;
    case "all-faces":
      title = "Hey!";
      text = (
        <>
          In this round, you will be tagging <b>all</b> faces as quickly and
          accurately as possible. Let's try it!
        </>
      );
      break;
    case "neutral-faces":
      title = "Hey!";
      text = (
        <>
          In this round, you will be tagging the <b>neutral</b> faces as quickly
          and accurately as possible. Let's try it!
        </>
      );
      break;
    case "fearful-faces":
      title = "Hey!";
      text = (
        <>
          In this round, you will be tagging the <b>fearful</b> faces as quickly
          and accurately as possible. Let's try it!
        </>
      );
      break;
    case "happy-faces":
      title = "Hey!";
      text = (
        <>
          In this round, you will be tagging the <b>happy</b> faces as quickly
          and accurately as possible. Let's try it!
        </>
      );
      break;
    case "mood-practice":
      title = "Hey!";
      text =
        "This is a practice round to get familiar with the rules. You will get points based on speed and accuracy.";
      break;
    case "mood-full":
      title = "Hey!";
      text =
        "You will now play the real game! You will get points based on speed and accuracy. Ready? Let's begin!";
      break;
    default:
      title = "";
      text = "";
  }

  useEffect(() => {
    const onKeyUp = (e) => {
      if (e.keyCode === 32) {
        // key is spacebar
        props.onClose();
      }
    };

    if (timer === 0) {
      window.addEventListener("keyup", onKeyUp);
      return () => {
        window.removeEventListener("keyup", onKeyUp);
      };
    }
  }, [timer, props]);

  if (timer) {
    setTimeout(() => {
      props.onClose();
    }, timer);
  }

  return (
    <>
      <div className={classes.blur}></div>
      <img className={classes.mole} src={mole} alt="" />
      <div className={classes.dialog}>
        <div className={classes.content}>
          <h1 className={classes.title}>{title}</h1>
          {text !== "" && <p className={classes.text}>{text}</p>}
          {!timer && (
            <>
              <button className={classes.button} onMouseUp={props.onClose}>
                {t("dialog.button")}
              </button>
              <p className={classes.hint}>
                {t("dialog.hint").replace("_", t("dialog.button"))}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
