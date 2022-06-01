import React, { useEffect } from "react";
import HomepageLogin from "./HomepageLogin";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import VersionLanguageSwitcher from "../VersionLanguageSwitcher";
import audio from "../../audio";

let moles;
let bg;

if (process.env.NODE_ENV === 'development') {
    moles = require("../.." + "/assets/combined moles.png");
    bg = require("../.." + "/assets/bg.png"); 
} else {
    moles = "../.." + "/assets/combined moles.png";
    bg = "../.." + "/assets/bg.png"; 
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0.5rem",
    backgroundImage: `url(${bg})`,
    backgroundSize: "100% 100%",
    width: "100%",
    height: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  left: {
    padding: theme.spacing(0),
    boxShadow: "none",
    backgroundColor: "transparent",
    textAlign: "center",
  },
  leftImg: {
    width: "80%",
    margin: "0 auto",
  },
  title: {
    fontFamily: "Helvetica, sans-serif",
    fontSize: "5vw",
    textAlign: "center",
    color: "white",
    textShadow: "0px 0px 25px #285c41",
  },
  login_region: {
    margin: "0",
    position: "absolute",
    top: "28%",
    transform: "translateY(-28%)",
  },
}));

export default function Home(props) {
  const classes = useStyles();

  useEffect(() => {
    audio.stopBackground();
    // audio.backgroundMusic.pause();
    // audio.backgroundMusic.currentTime = 0;
  }, []);

  // TODO: pass actual Version object into VersionLanguageSwitcher instead of creating new one
  return (
    <div className={classes.root}>
      <div className={classes.login_region}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          component={Grid}
        >
          <Grid item xs={6}>
            <h1 className={classes.title} >BrainTagger</h1>
            <div className={classes.left}>
              <img className={classes.leftImg} src={moles} alt={moles} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <VersionLanguageSwitcher version={props.version} />
              <HomepageLogin
                version={props.version}
                updateParticipant={props.updateParticipant}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
