import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

import InstructionsButton from "../instructions/InstructionsButton";

let mole;
let bubble;
let UIO;
let JKL;
let holesTop;
let holesBottom;

if (true) {
  mole = require("../.." + "/assets/normal_cut.png");
  bubble = require("../.." + "/assets/dialogs/dialog.png");
  UIO = require("../.." + "/assets/mood/keyboard_uio.png");
  JKL = require("../.." + "/assets/mood/keyboard_jkl.png");
  holesTop = require("../.." + "/assets/mood/holes_top.png");
  holesBottom = require("../.." + "/assets/mood/holes_bottom.png");
}else{
  mole = "../.." + "/assets/normal_cut.png";
  bubble = "../.." + "/assets/dialogs/dialog.png";
  UIO = "../.." + "/assets/mood/keyboard_uio.png";
  JKL = "../.." + "/assets/mood/keyboard_jkl.png";
  holesTop = "../.." + "/assets/mood/holes_top.png";
  holesBottom = "../.." + "/assets/mood/holes_bottom.png";
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
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  panel: {
    backgroundColor: "#f4f9ed",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "950px",
    height: "500px",
    borderRadius: "32px",
    marginTop: "80px",
  },
  keyboard: {
    height: "280px",
  },
  holes: {
    height: "150px",
  },
  buttons: {
    display: "flex",
  },
  backButton: {
    backgroundColor: "#333333",
    "&:hover": {
      backgroundColor: "#333333",
    },
    margin: "20px 50px",
  },
  nextButton: {
    backgroundColor: "#535F27",
    "&:hover": {
      backgroundColor: "#535F27",
    },
    margin: "20px 50px",
  },
});

export default function ViewControlsDialog(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [page, setPage] = useState(0);

  let title, text;
  switch (props.dialog) {
    case "error-baseline":
      title = t("dialog.tagHat.title");
      text = (
        <>
          In this round, tag <b>all</b> faces as quickly as possible!
        </>
      );
      break;
    case "error-all":
      title = t("dialog.tagHat.title");
      text = (
        <>
          In this round, tag <b>all</b> faces as quickly as possible!
        </>
      );
      break;
    case "error-neutral":
      title = t("dialog.tagHat.title");
      text = (
        <>
          In this round, tag the <b>neutral</b> faces as quickly and accurately
          as possible. Avoid fearful or happy faces!
        </>
      );
      break;
    case "error-fearful":
      title = t("dialog.tagHat.title");
      text = (
        <>
          In this round, tag the <b>fearful</b> faces as quickly and accurately
          as possible. Avoid neutral or fearful faces!
        </>
      );
      break;
    case "error-happy":
      title = t("dialog.tagHat.title");
      text = (
        <>
          In this round, tag the <b>happy</b> faces as quickly and accurately as
          possible. Avoid neutral or happy faces!
        </>
      );
      break;
    default:
      title = "";
      text = "";
  }

  useEffect(() => {
    if (page === 0) {
      const onKeyUp = (e) => {
        if (e.keyCode === 32) {
          props.onClose();
        }
      };

      window.addEventListener("keyup", onKeyUp);
      return () => {
        window.removeEventListener("keyup", onKeyUp);
      };
    }
  }, [page]);

  return (
    <>
      <div className={classes.blur}></div>
      {!page ? (
        <>
          <img className={classes.mole} src={mole} alt="" />
          <div className={classes.dialog}>
            <div className={classes.content}>
              <h1 className={classes.title}>{title}</h1>
              {text !== "" && <p className={classes.text}>{text}</p>}
              <>
                <button className={classes.button} onMouseUp={props.onClose}>
                  {t("dialog.button")}
                </button>
                <button
                  className={classes.button}
                  onMouseUp={() => {
                    setPage(page + 1);
                  }}
                >
                  {t("dialog.controlsButton")}
                </button>
                <p className={classes.hint}>
                  {t("dialog.hint").replace("_", t("dialog.button"))}
                </p>
              </>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={classes.container}>
            <div className={classes.panel}>
              {page === 1 ? (
                <>
                  <div className={classes.text}>
                    {t("games.TagMeMood.ins").split("\n\n")[2]}
                  </div>
                  <img className={classes.holes} src={holesTop} alt="" />
                  <img className={classes.keyboard} src={UIO} alt="" />
                </>
              ) : (
                <>
                  <div className={classes.text}>
                    {t("games.TagMeMood.ins").split("\n\n")[3]}
                  </div>
                  <img className={classes.holes} src={holesBottom} alt="" />
                  <img className={classes.keyboard} src={JKL} alt="" />
                </>
              )}
            </div>
            <div className={classes.buttons}>
              <InstructionsButton
                className={classes.backButton}
                onMouseUp={() => {
                  setPage(page - 1);
                }}
              >
                {`< ${t("back")}`}
              </InstructionsButton>
              {page < 2 && (
                <InstructionsButton
                  className={classes.nextButton}
                  onMouseUp={() => {
                    setPage(page + 1);
                  }}
                >
                  {`${t("next")} >`}
                </InstructionsButton>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
