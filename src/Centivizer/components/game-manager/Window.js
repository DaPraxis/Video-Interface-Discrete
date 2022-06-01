import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import assets from "../../assets/mood/assets"

let openWindow;
let closedWindow;

if (process.env.NODE_ENV === 'development') {
  openWindow = require("../.." + "/assets/mood/open_window.png");
  closedWindow = require("../.." + "/assets/mood/closed_window.png");
}else{
  openWindow = "../.." + "/assets/mood/open_window.png";
  closedWindow = "../.." + "/assets/mood/closed_window.png";
}

const useStyles = makeStyles({
  container: {
    position: "relative",
    height: "30vh",
    margin: "25px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  face: {
    height: "25vh",
    width: "auto"
  },
  window: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "30vh",
    width: "auto",
    zScore: "100"
  },
});

export default function Window(props) {
  const hole = props.hole;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {hole.up && (
        <img
          className={classes.face}
          src={hole.skin}
          alt=""
        />
      )}
      <img
        className={classes.window}
        src={hole.up ? openWindow : closedWindow}
        onClick={() => props.onInteraction(hole)}
        alt=""
      />
      {hole.overlay}
    </div>
  );
}
