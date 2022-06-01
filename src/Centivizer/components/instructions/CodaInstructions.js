import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../navigation/NavBar";
import { useTranslation } from "react-i18next";
import InstructionsButton from "./InstructionsButton";
import Grid from "@material-ui/core/Grid";
import { Link, Redirect } from "react-router-dom";

let bg;
let arrow;
let mole_S;
let mole_S_up;
let yes_neutral;
let yes_happy;
let no_neutral;
let no_happy;
let hole_img;
let keyboard_img;
let assets;
let bubble;

if (process.env.NODE_ENV === 'development') {
  bg = require(process.env.REACT_APP_MY_URL + "/assets/bgfield.png");
  arrow = require(process.env.REACT_APP_MY_URL + "/assets/icons/arrow-circle-left-solid.svg");
  mole_S = require(process.env.REACT_APP_MY_URL + "/assets/letter_moles/jerseyS.png");
  mole_S_up = require(process.env.REACT_APP_MY_URL + "/assets/letter_moles/jerseyS-arms.png");
  yes_neutral = require(process.env.REACT_APP_MY_URL + "/assets/response/correct_normal.png");
  yes_happy = require(process.env.REACT_APP_MY_URL + "/assets/response/correct_happy.png");
  no_neutral = require(process.env.REACT_APP_MY_URL + "/assets/response/incorrect_normal.png");
  no_happy = require(process.env.REACT_APP_MY_URL + "/assets/response/incorrect_happy.png");
  hole_img = require(process.env.REACT_APP_MY_URL + "/assets/hole.png");
  keyboard_img = require(process.env.REACT_APP_MY_URL + "/assets/instructions/coda_keyboard.png");
  assets = require(process.env.REACT_APP_MY_URL + "/assets/coda/assets");
  bubble = require(process.env.REACT_APP_MY_URL + "/assets/dialogs/dialog.png");
}else{
  bg = process.env.REACT_APP_MY_URL + "/assets/bgfield.png";
  arrow = process.env.REACT_APP_MY_URL + "/assets/icons/arrow-circle-left-solid.svg";
  mole_S = process.env.REACT_APP_MY_URL + "/assets/letter_moles/jerseyS.png";
  mole_S_up = process.env.REACT_APP_MY_URL + "/assets/letter_moles/jerseyS-arms.png";
  yes_neutral = process.env.REACT_APP_MY_URL + "/assets/response/correct_normal.png";
  yes_happy = process.env.REACT_APP_MY_URL + "/assets/response/correct_happy.png";
  no_neutral = process.env.REACT_APP_MY_URL + "/assets/response/incorrect_normal.png";
  no_happy = process.env.REACT_APP_MY_URL + "/assets/response/incorrect_happy.png";
  hole_img = process.env.REACT_APP_MY_URL + "/assets/hole.png";
  keyboard_img = process.env.REACT_APP_MY_URL + "/assets/instructions/coda_keyboard.png";
  assets = process.env.REACT_APP_MY_URL + "/assets/coda/assets";
  bubble = process.env.REACT_APP_MY_URL + "/assets/dialogs/dialog.png";
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${bg})`,
    backgroundSize: "100% 100%",
    width: "100%",
    height: "100%",
  },
  frame: {
    width: "60%",
    height: "auto",
    margin: "0 auto",
    marginTop: "20px",
  },
  blueText: {
    color: "#2844D9",
  },
  redText: {
    color: "#DB3939",
  },
  greenText: {
    color: "#44A816",
  },
  doubleBold: {
    fontWeight: "900",
    textDecoration: "underline",
  },
  dialog: {
    position: "absolute",
    backgroundImage: `url(${bubble})`,
    backgroundSize: "100% 100%",
    left: "35%",
    bottom: "35%",
    width: "50vw",
    paddingLeft: "3%",
  },
  whiteBg: {
    backgroundColor: "rgba(222, 239, 199, 0.95)",
    borderRadius: "20px",
    width: "100%",
    height: "100%",
    maxHeight: "75vh",
  },
  padding: {
    padding: "30px",
    overflow: "hidden",
  },
  instructionsText: {
    top: "10%",
    margin: "auto",
    textAlign: "center",
    fontFamily: '"Open Sans", sans-serif',
    fontSize: "25px",
    fontWeight: "700",
  },
  instructionsSecondaryText: {
    color: "#535F27",
    textAlign: "center",
    fontFamily: '"Open Sans", sans-serif',
    fontSize: "20px",
    fontWeight: "bold",
  },
  gameButtonContainer: {
    margin: "5px 0px 0px 0px",
  },
  playButton: {
    backgroundColor: "#5D4157",
    "&:hover": {
      backgroundColor: "#5D4157",
    },
  },
  pageButtonContainer: {
    margin: "auto",
    marginTop: "10px",
  },
  backButton: {
    backgroundColor: "#333333",
    "&:hover": {
      backgroundColor: "#333333",
    },
  },
  bubbleMole: {
    position: "fixed",
    bottom: "20px",
    left: "15%",
    height: "40%",
  },
  nextButton: {
    backgroundColor: "#535F27",
    "&:hover": {
      backgroundColor: "#535F27",
    },
  },
  checkmole: {
    position: "relative",
    height: "75%",
    top: "50%",
    left: "90%",
  },
  smallImgs: {
    height: "250px",
  },
  smallerImgs: {
    height: "180px",
  },
  wideImg: {
    width: "75%",
    height: "auto",
  },
  signMole: {
    height: "250px",
    zIndex: "1",
  },
  smallImgText: {
    textAlign: "center",
  },
  prevMoleBox: {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "20%",
    minHeight: " 50%",
    borderRadius: "20px",
    backgroundColor: "#194141",
    textAlign: "center",
    color: "white",
    fontSize: "24px",
  },
  prevMole: {
    width: "80%",
  },
  prevMoleCircleContainer: {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "20%",
    minHeight: " 50%",
    borderRadius: "20px",
    textAlign: "center",
    backgroundColor: "#FFFFFF00",
    transform: "translate(0%, -35%)",
    fontSize: "175px",
  },
  correctCircle: {
    color: "#1DBA49",
  },
  incorrectCircle: {
    color: "#D12D2D",
  },
  objectPicture: {
    height: "100%",
  },
  sign: {
    width: "100%",
    position: "relative",
    bottom: "-1vh",
    height: "200px",
    backgroundColor: "#fff",
    marginBottom: "-25px",
  },
}));

/*
 * New instructions page for TAG-ME Again EASY
 */
export default function CodaInstructions(props) {
  audio.stopBackground();

  const classes = useStyles();
  const { t } = useTranslation();

  let left_neutral = no_neutral,
    left_mouse = no_neutral,
    left_chair = no_happy,
    right_neutral = yes_neutral,
    right_mouse = yes_happy,
    right_chair = yes_neutral,
    leftColour = classes.redText,
    rightColour = classes.greenText;

  // if odd, yes on left
  const participant = localStorage.getItem("participant");
  if (participant % 2 === 1) {
    left_neutral = yes_neutral;
    left_mouse = yes_happy;
    left_chair = yes_neutral;
    right_neutral = no_neutral;
    right_mouse = no_neutral;
    right_chair = no_happy;
    leftColour = classes.greenText;
    rightColour = classes.redText;
  }

  // if not equal to '', will redirect to address
  let [redirectAddress, setRedirectAddress] = useState("");
  let [pageNum, setPageNum] = useState(0);

  let audioCues = {
    1: new Audio(assets.ending.s),
    3: new Audio(assets.auditory.alarm),
  };

  let bubblePages = [12, 13, 14, 15, 16];

  useEffect(() => {
    if (pageNum in audioCues) {
      audio.playSound(audioCues[pageNum]);
    }
  }, [pageNum]);

  // parts of the instructions are hardcoded for styling
  let instructionsArray = t("games.TagMeCoda.ins").split("\n\n");

  // content of each page
  let pages = [
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={hole_img}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={mole_S}
            className={classes.signMole}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={hole_img}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={hole_img}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={mole_S}
            className={classes.signMole}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={hole_img}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={hole_img}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <div className={classes.sign}>
            <img src={assets.visual.mouse} className={classes.objectPicture} />
          </div>
          <img
            src={mole_S_up}
            className={classes.signMole}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={hole_img}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={hole_img}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <div className={classes.sign}>
            <img src={assets.visual.mouse} className={classes.objectPicture} />
          </div>
          <img
            src={mole_S_up}
            className={classes.signMole}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={hole_img}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={left_neutral}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <div className={classes.sign}>
            <img src={assets.visual.mouse} className={classes.objectPicture} />
          </div>
          <img
            src={mole_S_up}
            className={classes.signMole}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={right_neutral}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>
        The “YES” and “NO” moles will{" "}
        <span class={classes.doubleBold}>NOT</span> switch sides throughout the
        game.
      </p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={left_neutral}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <div className={classes.sign}>
            <img src={assets.visual.mouse} className={classes.objectPicture} />
          </div>
          <img
            src={mole_S_up}
            className={classes.signMole}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={right_neutral}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={left_neutral}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <div className={classes.sign}>
            <img src={assets.visual.mouse} className={classes.objectPicture} />
          </div>
          <img
            src={mole_S_up}
            className={classes.signMole}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={right_neutral}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>
        If the name of the object ends in the{" "}
        <span class={classes.doubleBold}>SOUND</span> shown on the T-shirt, tag
        the “YES” mole.
      </p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={left_mouse}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <div className={classes.sign}>
            <img src={assets.visual.mouse} className={classes.objectPicture} />
          </div>
          <img
            src={mole_S_up}
            className={classes.signMole}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={right_mouse}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>
        If the name of the object does not end in the{" "}
        <span class={classes.doubleBold}>SOUND</span> shown on the T-shirt, tag
        the “NO” mole.
      </p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={left_chair}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <div className={classes.sign}>
            <img src={assets.visual.chair} className={classes.objectPicture} />
          </div>
          <img
            src={mole_S_up}
            className={classes.signMole}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={right_chair}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={left_chair}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <div className={classes.sign}>
            <img src={assets.visual.chair} className={classes.objectPicture} />
          </div>
          <img
            src={mole_S_up}
            className={classes.signMole}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={right_chair}
            className={classes.smallImgs}
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>
        The <span class={leftColour}>left</span> and{" "}
        <span class={rightColour}>right</span> moles correspond to the{" "}
        <span class={leftColour}>"j"</span> and{" "}
        <span class={rightColour}>"k</span> keys on the keyboard.
      </p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={left_neutral}
            className={classes.smallerImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={mole_S}
            className={classes.smallerImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={right_neutral}
            className={classes.smallerImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={keyboard_img}
            className={classes.wideImg}
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={left_neutral}
            className={classes.smallerImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={mole_S}
            className={classes.smallerImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={right_neutral}
            className={classes.smallerImgs}
            alt="brown_orane_purple"
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={keyboard_img}
            className={classes.wideImg}
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>
        At the end of each session,
        <br />
        (1) the number of <span class={classes.blueText}>correct</span>{" "}
        responses will be added to your score as{" "}
        <span class={classes.blueText}>bonus points</span>.<br />
        (2) the number of <span class={classes.redText}>incorrect</span>{" "}
        responses will be <span class={classes.redText}>deducted</span> from
        your total score.
      </p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        ></Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        ></Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        ></Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>
        Tag the mole as <span class={classes.doubleBold}>quickly</span> and{" "}
        <span class={classes.doubleBold}>accurately</span> as possible to gain
        the most points!
      </p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        ></Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        ></Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        ></Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        ></Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        ></Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        ></Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        ></Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        ></Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        ></Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>
        The goal is to ignore the word you hear (if present) and judge if the{" "}
        <span class={classes.doubleBold}>
          ending sound of the pictured object
        </span>{" "}
        matches with the sound on my T-shirt.
      </p>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        ></Grid>
        <Grid
          item
          container
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        ></Grid>
        <Grid
          item
          container
          xs={3}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        ></Grid>
      </Grid>
    </div>,

    <>
      <p className={classes.instructionsText}>{t("understand")}</p>
      <Grid
        container
        spacing={0}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.gameButtonContainer}
      >
        <InstructionsButton
          onClick={() => {
            setRedirectAddress(props.tryItOutAddress);
          }}
        >
          {t("try-it-out")}
        </InstructionsButton>
        {/* <InstructionsButton
          onClick={() => {
            setRedirectAddress(props.gameAddress);
          }}
        >
          {t("play-now")}
        </InstructionsButton> */}
      </Grid>
    </>,
  ];

  return (
    <div className={classes.root}>
      {redirectAddress === "" ? <></> : <Redirect to={redirectAddress} push />}
      <NavBar />
      <Link to="/mainmenu">
        <img
          src={arrow}
          alt="back arrow"
          style={{
            position: "absolute",
            left: "25px",
            top: "100px",
            width: "50px",
          }}
        />
      </Link>
      {!bubblePages.includes(pageNum) ? (
        <div className={classes.frame}>
          <div className={classes.whiteBg}>
            <div className={classes.padding}>{pages[pageNum]}</div>
          </div>
          {/* buttons to go to prev/next page */}
          <div className={classes.pageButtonContainer}>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="center"
            >
              {pageNum > 0 ? (
                <InstructionsButton
                  className={classes.backButton}
                  onClick={() => {
                    audio.stopAll();
                    setPageNum(pageNum - 1);
                  }}
                >
                  {"< " + t("back")}
                </InstructionsButton>
              ) : (
                <></>
              )}
              {pageNum < pages.length - 1 ? (
                <InstructionsButton
                  className={classes.nextButton}
                  onClick={() => {
                    audio.stopAll();
                    setPageNum(pageNum + 1);
                  }}
                >
                  {t("next") + " >"}
                </InstructionsButton>
              ) : (
                <></>
              )}
            </Grid>
          </div>
        </div>
      ) : (
        <div className={classes.frame}>
          <img
            src={mole_S}
            className={classes.bubbleMole}
            alt="brown_orane_purple"
          />
          <div className={classes.dialog}>
            <div className={classes.padding}>
              {pages[pageNum]}
              <div className={classes.pageButtonContainer}>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  {pageNum > 0 ? (
                    <InstructionsButton
                      className={classes.backButton}
                      onClick={() => {
                        audio.stopAll();
                        setPageNum(pageNum - 1);
                      }}
                    >
                      {"< " + t("back")}
                    </InstructionsButton>
                  ) : (
                    <></>
                  )}
                  {pageNum < pages.length - 1 ? (
                    <InstructionsButton
                      className={classes.nextButton}
                      onClick={() => {
                        audio.stopAll();
                        setPageNum(pageNum + 1);
                      }}
                    >
                      {t("next") + " >"}
                    </InstructionsButton>
                  ) : (
                    <></>
                  )}
                </Grid>
              </div>
            </div>
          </div>
          {/* buttons to go to prev/next page */}
        </div>
      )}
    </div>
  );
}
