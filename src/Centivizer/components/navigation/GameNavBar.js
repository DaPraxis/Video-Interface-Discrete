import React, { useEffect, useState, useContext } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import Popover from "@material-ui/core/Popover";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import { Redirect } from "react-router-dom";
import audio from "../../audio";

let logo;

if (true) {
  logo = require("../.."+"/assets/centivizer/logo_stacked_transparent.png");
}else{
  logo = "../.."+"/assets/centivizer/logo_stacked_transparent.png";
}

// TODO: need to format the navbar better
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#FFFFFF",
    padding: "5px 10px",
    color: "black",
  },
  titleText: {
    color: "black",
    fontFamily: "Open sans, sans serif",
    fontSize: "25px",
    flexGrow: 1,
  },
  button: {
    color: "#000000",
    "&:hover": {
      color: "#4FB8B8",
    },
  },
  volumeControl: {
    width: 200,
    margin: 0,
  },
}));

export default function GameNavBar(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null); // used to control popup

  const [paused, setPaused] = useState(false);
  // TODO: use this flag, unpause game after a delay
  const [dialogOpen, setDialogOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { volume, setVolume } = useContext(audio.volumeContext);

  const handleVolumeChange = (event, newVolume) => {
    setVolume(newVolume / 100);
  };

  const openVolumeSlider = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeVolumeSlider = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // TODO: need to make pause menu pop up
  let pauseResumeButton = (
    <PauseCircleFilledIcon
      className={classes.button}
      fontSize="large"
      onClick={() => {
        // Only when the game is paused, can we pause the game
        if (!props.isPaused) {
          setPaused(true);
          props.pause();
        }
      }}
    />
  );
  // if (paused) {
  //   pauseResumeButton = (
  //     <PlayCircleFilledIcon
  //       className={classes.button}
  //       fontSize="large"
  //       onClick={() => {
  //         setPaused(false);
  //         props.countDown(3);
  //         props.resume();
  //       }}
  //     />
  //   );
  // }

  let startButton = (
    <PlayCircleFilledIcon
      className={classes.button}
      fontSize="large"
      onClick={() => {
        // if (count === 0) startGame(3);
      }}
    />
  );

  // TODO: need to add volume slider

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <img src={logo} style={{ height: "45px" }} alt="logo" />
          <Typography
            className={classes.titleText}
            style={{ fontWeight: "bold" }}
          >
            {props.gameName}
          </Typography>
          <Typography className={classes.titleText}>
            {t("score")}: {props.score}
          </Typography>
          <Typography className={classes.titleText}>
            {t("time")}: {props.time}
          </Typography>
          <VolumeUp
            className={classes.button}
            onClick={openVolumeSlider}
            fontSize="large"
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={closeVolumeSlider}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Grid className={classes.volumeControl} container spacing={2}>
              <Grid item>
                <VolumeDown />
              </Grid>
              <Grid item xs>
                <Slider
                  value={volume * 100}
                  onChange={handleVolumeChange}
                  aria-labelledby="continuous-slider"
                />
              </Grid>
              <Grid item>
                <VolumeUp />
              </Grid>
            </Grid>
          </Popover>
          {pauseResumeButton}
          {/* {started ? pauseResumeButton : startButton} */}
        </Toolbar>
      </AppBar>
      <Dialog
        open={paused}
        onClose={() => {
          setPaused(false);
          props.resume();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("end-sess.end-alert-title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("end-sess.end-alert")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setRedirect(true);
            }}
            color="primary"
          >
            {t("end-sess.end-conf")}
          </Button>
          <Button
            onClick={() => {
              setPaused(false);
              props.resume();
            }}
            color="primary"
            autoFocus
          >
            {t("end-sess.end-canc")}
          </Button>
        </DialogActions>
      </Dialog>
      {redirect && <Redirect to="/mainmenu" push />}
    </>
  );
}
