import SinglePageInstructions from "./SinglePageInstructions";
import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

let left;
let right;

if (process.env.NODE_ENV === 'development') {
  left = require("../.." + "/assets/instructions/same_left.png");
  right = require("../.." + "/assets/instructions/same_right.png");
}else{
  left = "../.." + "/assets/instructions/same_left.png";
  right = "../.." + "/assets/instructions/same_right.png";
}


const useStyles = makeStyles((theme) => ({
  img: {
    height: "150px",
  },
  imgContainer: {
    position: "relative",
    padding: "10px 0px",
  },
  arrow: {
    color: "#4FB8B8",
    fontSize: 75,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Open sans, sans serif",
  },
}));

export default function SameInstructions(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <SinglePageInstructions
      instructionsText={t("games.TagMeSame.ins")}
      gameAddress={props.gameAddress}
      tryItOutAddress={props.tryItOutAddress}
    >
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item container xs={3} justify="center" alignItems="center">
          <div className={classes.imgContainer}>
            <img src={left} className={classes.img} alt="same_left" />
          </div>
        </Grid>
        <Grid item xs={3} className={classes.arrow}>
          →
        </Grid>
        <Grid item container xs={3} justify="center" alignItems="center">
          <div className={classes.imgContainer}>
            <img src={right} className={classes.img} alt="same_right" />
          </div>
        </Grid>
      </Grid>
    </SinglePageInstructions>
  );
}
