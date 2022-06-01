import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

let brown;
let purple;
let orange;
let hole;
let cross;

if (process.env.NODE_ENV === 'development') {
  brown = require("../.." + "/assets/basic_normal.png");
  purple = require("../.." + "/assets/purple_normal.png");
  orange = require("../.." + "/assets/orange_normal.png");
  hole = require("../.." + "/assets/hole.png");
  cross = require("../.." + "/assets/cross.png");
}else{
  brown = "../.." + "/assets/basic_normal.png";
  purple = "../.." + "/assets/purple_normal.png";
  orange = "../.." + "/assets/orange_normal.png";
  hole = "../.." + "/assets/hole.png";
  cross = "../.." + "/assets/cross.png";
}

//TODO: translations
const useStyles = makeStyles({
  panel: {
    backgroundColor: "rgba(243, 248, 236, 0.95)",
    borderRadius: "20px",
    position: "absolute",
    left: "calc(50vw - 280px)",
    bottom: "2.5%",
  },
  header: {
    fontWeight: "bold",
    fontSize: "25px",
    margin: "14px auto",
  },
  horizontalContainer: {
    display: "flex",
  },
  verticalContainer: {
    position: "relative",
  },
  icon: {
    height: "100px",
  },
  description: {
    fontWeight: "bold",
    fontSize: "18px",
    margin: "10px auto",
  },
  cross: {
    position: "absolute",
    width: "80px",
    top: "10px",
    left: "7px",
  },
});

function Choices(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.panel}>
      <p className={classes.header}>{t("games.TagMeSwitch.choices")}</p>
      <div className={classes.horizontalContainer}>
        <div className={classes.verticalContainer}>
          {!props.choices.includes("brown") && (
            <img className={classes.cross} src={cross} alt="" />
          )}
          <img className={classes.icon} src={brown} alt="brown" />
          <p className={classes.description}>{t("games.TagMeSwitch.brown")}</p>
        </div>
        <div className={classes.verticalContainer}>
          {!props.choices.includes("purple") && (
            <img className={classes.cross} src={cross} alt="" />
          )}
          <img className={classes.icon} src={purple} alt="purple" />
          <p className={classes.description}>{t("games.TagMeSwitch.purple")}</p>
        </div>
        <div className={classes.verticalContainer}>
          {!props.choices.includes("orange") && (
            <img className={classes.cross} src={cross} alt="" />
          )}
          <img className={classes.icon} src={orange} alt="orange" />
          <p className={classes.description}>{t("games.TagMeSwitch.orange")}</p>
        </div>
        <div className={classes.verticalContainer}>
          {!props.choices.includes("left") && (
            <img className={classes.cross} src={cross} alt="" />
          )}
          <img className={classes.icon} src={hole} alt="left" />
          <p className={classes.description}>{t("games.TagMeSwitch.left")}</p>
        </div>
        <div className={classes.verticalContainer}>
          {!props.choices.includes("middle") && (
            <img className={classes.cross} src={cross} alt="" />
          )}
          <img className={classes.icon} src={hole} alt="middle" />
          <p className={classes.description}>{t("games.TagMeSwitch.middle")}</p>
        </div>
        <div className={classes.verticalContainer}>
          {!props.choices.includes("right") && (
            <img className={classes.cross} src={cross} alt="" />
          )}
          <img className={classes.icon} src={hole} alt="right" />
          <p className={classes.description}>{t("games.TagMeSwitch.right")}</p>
        </div>
      </div>
    </div>
  );
}

export default Choices;
