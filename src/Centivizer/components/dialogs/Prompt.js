import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

let bubble;

if (true) {
  bubble = require("../.." + "/assets/dialogs/dialog.png");
}else{
  bubble = "../.." + "/assets/dialogs/dialog.png";
}

const useStyles = makeStyles({
  dialog: {
    position: "absolute",
    backgroundImage: `url(${bubble})`,
    backgroundSize: "100% 100%",
    left: "65%",
    bottom: "55%",
    width: "220px",
    zIndex: "100",
  },
  content: {
    margin: "20px 20px 20px 37px",
  },
  text: {
    fontSize: "20px",
    margin: "0px 0px 4px 0px",
  },
  button: {
    margin: "10px auto",
    backgroundColor: "#55b7b6",
    borderRadius: "0.3rem",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "8px 16px",
    boxShadow: "0 4px 2px rgba(0, 0, 0, 0.2)",
    color: "white",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#55b7b6",
      transform: "scale(1.05)",
      transition: "transform .25s ease-out,-webkit-transform .25s ease-out",
    },
  },
});

function Prompt(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.dialog}>
      <div className={classes.content}>
        <p className={classes.text}>{t(props.text)}</p>
        <button className={classes.button} onClick={props.onClose}>
          {t("dialog.button")}
        </button>
      </div>
    </div>
  );
}

export default Prompt;
