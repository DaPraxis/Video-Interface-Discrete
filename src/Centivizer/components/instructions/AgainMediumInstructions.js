import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../navigation/NavBar";
import { useTranslation } from "react-i18next";
import InstructionsButton from "./InstructionsButton";
import Grid from "@material-ui/core/Grid";
import { Link, Redirect } from "react-router-dom";

let bg;
let arrow;
let hand;
let check;
let cross;
let correct_circle;
let incorrect_circle;
let jersey_correct_circle;
let jersey_incorrect_circle;
let mole_4;
let mole_2;
let keyboard_JKL;
let hole_img;
let hole_no_margin;
let bubble;
let mole_dialog;

if (process.env.NODE_ENV === 'development') {
  bg = require("../.." + "/assets/bgfield.png");
  arrow = require("../.." + "/assets/icons/arrow-circle-left-solid.svg");
  hand = require("../.." + "/assets/hand.png");
  check = require("../.." + "/assets/instructions/check.png");
  cross = require("../.." + "/assets/instructions/cross.png");
  correct_circle = require("../.." + "/assets/instructions/correct_circle.png");
  incorrect_circle = require("../.." + "/assets/instructions/incorrect_circle.png");
  jersey_correct_circle = require("../.." + "/assets/instructions/jersey_correct_circle.png");
  jersey_incorrect_circle = require("../.." + "/assets/instructions/jersey_incorrect_circle.png");
  mole_4 = require("../.." + "/assets/big_and_small/big_moley/bigmoley-4.png");
  mole_2 = require("../.." + "/assets/big_and_small/big_moley/bigmoley-2.png");
  keyboard_JKL = require("../.." + "/assets/instructions/keyboard_JKL.png");
  hole_img = require("../.." + "/assets/hole.png");
  hole_no_margin = require("../.." + "/assets/instructions/hole_no_margin.png");
  bubble = require("../.." + "/assets/instructions/dialog_skinny.png");
  mole_dialog = require("../.." + "/assets/mole_sparkle.png");
}else{
  bg = "../.." + "/assets/bgfield.png";
  arrow = "../.." + "/assets/icons/arrow-circle-left-solid.svg";
  hand = "../.." + "/assets/hand.png";
  check = "../.." + "/assets/instructions/check.png";
  cross = "../.." + "/assets/instructions/cross.png";
  hand = "../.." + "/assets/hand.png";
  correct_circle = "../.." + "/assets/instructions/correct_circle.png";
  incorrect_circle = "../.." + "/assets/instructions/incorrect_circle.png";
  jersey_correct_circle = "../.." + "/assets/instructions/jersey_correct_circle.png";
  jersey_incorrect_circle = "../.." + "/assets/instructions/jersey_incorrect_circle.png";
  mole_4 = "../.." + "/assets/big_and_small/big_moley/bigmoley-4.png";
  mole_2 = "../.." + "/assets/big_and_small/big_moley/bigmoley-2.png";
  keyboard_JKL = "../.." + "/assets/instructions/keyboard_JKL.png";
  hole_img = "../.." + "/assets/hole.png";
  hole_no_margin = "../.." + "/assets/instructions/hole_no_margin.png";
  bubble = "../.." + "/assets/instructions/dialog_skinny.png";
  mole_dialog = "../.." + "/assets/mole_sparkle.png";
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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  whiteBg: {
    backgroundColor: "rgba(243, 248, 236, 0.95)",
    borderRadius: "20px",
    width: "100%",
    height: "100%",
  },
  padding: {
    padding: "30px",
  },
  beforeGrid:{
    display: "grid",
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    gridTemplateColumns: "18% 82%"
  },
  beforeRightLeftGrid:{
    display: "grid",
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    gridTemplateColumns: "18% 18% 64%",
  },
  beforeRightMiddleLeftGrid:{
    display: "grid",
    position: "absolute",
    width: "100%",
    top: "0px",
    left: "0px",
    gridTemplateColumns: "18% 18% 18% 46%",
  },
  beforeFourRectGrid:{
    display: "grid",
    position: "absolute",
    width: "100%",
    top: "0px",
    left: "0px",
    gridTemplateColumns: "18% 18% 18% 18% 28%",
  },
  twoRows:{
    display: "grid",
    position: "absolute",
    top: "0px",
    left: "0px",
    height:"auto",
    width: "100%",
    gridTemplateRows: "auto auto"
  },
  instructionsContainer:{
    marginTop: "20px"
  },
  instructionsText: {
    top: "10%",
    margin: "auto",
    textAlign: "center",
    fontFamily: '"Open Sans", sans-serif',
    fontSize: "min(2vw, 25px)",
  },
  instructionsSecondaryText: {
    color: "#535F27",
    textAlign: "center",
    fontFamily: '"Open Sans", sans-serif',
    fontSize: "20px",
    fontWeight: "bold",
  },
  instructionsGreen:{
    color: "#1DBA49",
    fontWeight: "bold"
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
  },
  backButton: {
    zIndex: "100",
    backgroundColor: "#333333",
    "&:hover": {
      backgroundColor: "#333333",
    },
  },
  nextButton: {
    zIndex: "100",
    backgroundColor: "#535F27",
    "&:hover": {
      backgroundColor: "#535F27",
    },
  },
  greyButton:{
    zIndex: "100",
    backgroundColor: "#B0B0B0",
    "&:hover": {
      backgroundColor: "#B0B0B0",
    }
  },
  checkmole: {
    position: "relative",
    height: "75%",
    top: "50%",
    left: "90%",
  },
  smallImgs: {
    width: "80%",
  },
  smallImgText: {
    textAlign: "center",
  },
  prevBoxGreen: {
    display: "block",
    width: "100%",
    height: "100%",
    borderRadius: "20px",
    backgroundColor: "#194141",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    color: "white",
    fontSize: "min(1.9vw, 24px)",
    "& p":{
      marginTop: "5px",
      marginBottom: "7px"
    }
  },
  prevBoxPurple: {
    width: "100%",
    height: "100%",
    borderRadius: "20px",
    backgroundColor: "#5D4157",
    justifyItems: "center",
    textAlign: "center",
    color: "white",
    fontSize: "min(1.9vw, 24px)",
    "& p":{
      marginTop: "5px",
      marginBottom: "7px"
    }
  },
  trialLabel:{
    fontSize: "min(1.6vw, 18px)",
    textAlign: "left",
    marginLeft: "15px",
    marginTop: "5px",
    marginBottom: "0px"
  },
  doNotMatchLabel:{
    color: "#D12D2D",
    fontSize: "min(1.8vh, 16px)",
    fontWeight: "bold",
    backgroundColor: "transparent",
    textAlign: "center",
    margin:"min(.5vw, 10px)"
  },
  prevMole: {
    width: "80%",
    position: "relative"
  },
  handImage:{
    zIndex: "98",
    width: "10%",
    position: "absolute",
    transform: "translate(65%, 10%)"
  },
  keyboardImage:{
    width: "80%",
    marginTop: "20px"
  },
  jerseyCorrectCircle:{
    position: "absolute",
    width: "5%",
    transform: "translate(-2%, 145%)"
  },
  correctCircle: {
    position: "absolute",
    width: "16%",
    zIndex:"99",
    transform: "translate(-95.5%, 0px)"
  },
  correctCheck:{
    position: "absolute",
    width: "10%",
    transform: "translate(65%, 90%)"
  },
  moleTalkingImage:{
    position: "absolute",
    zIndex: "90",
    width: "60%",
    transform: "translate(-50%, 40%)"
  },
  speechBubble:{
    position: "relative",
    width: "100%",
    transform: "translate(0%, 0%)"
  },
  speechContainer:{
    position: "absolute",
    width: "80%",
    margin: "20px",
    transform: "translate(15%, -270%)",
    fontFamily: '"Open Sans", sans-serif',
    fontSize: "min(3vw, 40px)",
    fontWeight: "bold",
    textAlign: "center",
  }
}));

/*
 * New instructions page for TAG-ME Again MEDIUM
 */
export default function AgainMediumInstructions(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  // if not equal to '', will redirect to address
  let [redirectAddress, setRedirectAddress] = useState("");
  let [pageNum, setPageNum] = useState(0);
  let automaticFlip = [3, 4, 6, 7];
  let afterFlip = [5, 8];

  let instructionsArray = t("games.TagMeAgainMedium.ins").split("\n\n");
  let oneBefore = t("games.TagMeAgainMedium.oneBefore");
  let twoBefore = t("games.TagMeAgainMedium.twoBefore");
  let threeBefore = t("games.TagMeAgainMedium.threeBefore");

  // Function to automatically flip pages
  let flipPage = () => {
    console.log("flip");
    setTimeout(function(){
      setPageNum(pageNum + 1)
    }, 2000);
    console.log(pageNum);
  }

  // content of each page
  let pages = [
    //p0: Moles Appear One at a Time, Remember the Number!
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
        <div style={{ width: "100%", margin: "auto" }}>
          <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
          <Grid item container direction="row" justify="center" alignItems="center">
            <Grid
              item
              container
              xs={4}
              direction="row"
              alignContent="center"
              justify="center"
              alignItems="center"
            >
              <img
                src={mole_4}
                className={classes.smallImgs}
                alt="mole_jersey_4"
              />
            </Grid>
            <Grid
              item
              container
              xs={4}
              direction="row"
              alignContent="center"
              justify="center"
              alignItems="center"
            >
              <img
                src={hole_img}
                className={classes.smallImgs}
                alt="hole"
              />
            </Grid>
            <Grid
              item
              container
              xs={4}
              direction="row"
              alignContent="center"
              justify="center"
              alignItems="center"
            >
              <img
                src={hole_img}
                className={classes.smallImgs}
                alt="hole"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>,
    //p1: In Easy you tagged a mole if it matched the One Before!
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
        <div style={{ width: "100%", margin: "auto" }}>
          <div className={classes.beforeGrid}>
            <div className={classes.prevBoxPurple}>
              <p className={classes.trialLabel}>Trial 1</p>
              <img src={mole_4} className={classes.prevMole} alt="prevmole" />
              <img
                src={correct_circle}
                className={classes.correctCircle}
                alt="correct_circle"
                />
              <br />
              <p>{oneBefore}</p>
            </div>
            <div className={classes.instructionsContainer}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={10}>
                  <p className={classes.instructionsText}>
                    {instructionsArray[pageNum]}
                  </p>
                </Grid>
              </Grid>
            </div>
          </div>
          <div style={{marginLeft:"15%", marginTop: "min(12vh, 100px)"}}>
            <Grid item container direction="row" justify="center" alignItems="center" spacing={24}>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={mole_4}
                  className={classes.smallImgs}
                  alt="mole_jersey_4"
                />
                <img
                className={classes.jerseyCorrectCircle}
                src={jersey_correct_circle}
                alt="jersey_correct_circle"
                />
                <img
                src={check}
                className={classes.correctCheck}
                alt="check"
                />
                <img
                  src={hand}
                  className={classes.handImage}
                  alt="hand"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>,
    //p2: In Medium you need to remember numbers from Two Before!
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
        <div style={{ width: "100%", margin: "auto" }}>
          <div className={classes.beforeRightLeftGrid}>
            <div className={classes.prevBoxGreen}>
              <p className={classes.trialLabel}>Trial 1</p>
              <img src={mole_4} className={classes.prevMole} alt="prevmole" />
              <br />
              <p>{twoBefore}</p>
            </div>
            <div className={classes.prevBoxPurple}>
              <p className={classes.trialLabel}>Trial 2</p>
              <img src={mole_2} className={classes.prevMole} alt="prevmole" />
              <br />
              <p>{oneBefore}</p>
            </div>
            <div className={classes.instructionsContainer}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={10}>
                  <p className={classes.instructionsText}>
                    {instructionsArray[pageNum]} <span className={classes.instructionsGreen}>{twoBefore}</span>!
                  </p>
                </Grid>
              </Grid>
            </div>
          </div>
          <div style={{marginLeft:"15%", marginTop: "min(12vh, 100px)"}}>
            <Grid item container direction="row" justify="center" alignItems="center">
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>,
    // p3: Tag the New Mole if it Matches the mole Two Before!
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
        <div style={{ width: "100%", margin: "auto" }}>
          <div className={classes.beforeRightLeftGrid}>
            <div className={classes.prevBoxGreen}>
              <p className={classes.trialLabel}>Trial 1</p>
              <img src={mole_4} className={classes.prevMole} alt="prevmole" />
              <br />
              <p>{twoBefore}</p>
            </div>
            <div className={classes.prevBoxPurple}>
              <p className={classes.trialLabel}>Trial 2</p>
              <img src={mole_2} className={classes.prevMole} alt="prevmole" />
              <br />
              <p>{oneBefore}</p>
            </div>
            <div className={classes.instructionsContainer}>
            <Grid container direction="row" justify="center" alignItems="center">
              <Grid item xs={10}>
                <p className={classes.instructionsText}>
                  {instructionsArray[pageNum]}
                </p>
              </Grid>
            </Grid>
            </div>
          </div>
          <div style={{marginLeft:"15%", marginTop: "min(12vh, 100px)"}}>
            <Grid item container direction="row" justify="center" alignItems="center">
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>,
    //p4: Does this mole match the mole two before?
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
        <div style={{ width: "100%", margin: "auto" }}>
          <div className={classes.beforeRightLeftGrid}>
            <div className={classes.prevBoxGreen}>
              <p className={classes.trialLabel}>Trial 1</p>
              <img src={mole_4} className={classes.prevMole} alt="prevmole" />
              <br />
              <p>{twoBefore}</p>
            </div>
            <div className={classes.prevBoxPurple}>
              <p className={classes.trialLabel}>Trial 2</p>
              <img src={mole_2} className={classes.prevMole} alt="prevmole" />
              <br />
              <p>{oneBefore}</p>
            </div>
            <div className={classes.instructionsContainer}>
            <Grid container direction="row" justify="center" alignItems="center">
              <Grid item xs={10}>
                <p className={classes.instructionsText}>
                  {instructionsArray[pageNum]}
                </p>
              </Grid>
            </Grid>
            </div>
          </div>
          <div style={{marginLeft:"15%", marginTop: "min(12vh, 100px)"}}>
            <Grid item container direction="row" justify="center" alignItems="center">
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={mole_4}
                  className={classes.smallImgs}
                  alt="mole_jersey_4"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>,
    //p5: Yes, the two before wore a “4”, so tag it!
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
        <div style={{ width: "100%", margin: "auto" }}>
          <div className={classes.twoRows}>
            <div className={classes.beforeRightLeftGrid} style={{ position: "relative" }}>
              <div className={classes.prevBoxGreen}>
                <p className={classes.trialLabel}>Trial 1</p>
                <img src={mole_4} className={classes.prevMole} alt="prevmole" />
                <img
                  src={correct_circle}
                  className={classes.correctCircle}
                  alt="correct_circle"
                  />
                <br />
                <p>{twoBefore}</p>
              </div>
                <div className={classes.prevBoxPurple}>
                  <p className={classes.trialLabel}>Trial 2</p>
                  <img src={mole_2} className={classes.prevMole} alt="prevmole" />
                  <br />
                  <p>{oneBefore}</p>
                </div>
              <div className={classes.instructionsContainer}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={10}>
                  <p className={classes.instructionsText}>
                    {instructionsArray[pageNum]}
                  </p>
                </Grid>
              </Grid>
              </div>
            </div>
            <div className={classes.beforeRightLeftGrid} style={{ position: "relative" }}>
              <div />
              <div className={classes.doNotMatchLabel}>
                    Do not match to this one!
              </div>
              <div />
            </div>
          </div>
          <div style={{marginLeft:"15%", marginTop: "min(12vh, 100px)"}}>
            <Grid item container direction="row" justify="center" alignItems="center">
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={mole_4}
                  className={classes.smallImgs}
                  alt="mole_jersey_4"
                />
                <img
                className={classes.jerseyCorrectCircle}
                src={jersey_correct_circle}
                alt="jersey_correct_circle"
                />
                <img
                src={check}
                className={classes.correctCheck}
                alt="check"
                />
                <img
                  src={hand}
                  className={classes.handImage}
                  alt="hand"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>,
    //p6: Don’t tag the next mole if it doesn’t match the mole Two Before!
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
        <div style={{ width: "100%", margin: "auto" }}>
          <div className={classes.beforeRightMiddleLeftGrid}>
            <div className={classes.prevBoxPurple}>
              <p className={classes.trialLabel}>Trial 1</p>
              <img src={mole_4} className={classes.prevMole} alt="prevmole" />
              <br />
              <p>{threeBefore}</p>
            </div>
            <div className={classes.prevBoxGreen}>
              <p className={classes.trialLabel}>Trial 2</p>
              <img src={mole_4} className={classes.prevMole} alt="prevmole" />
              <br />
              <p>{twoBefore}</p>
            </div>
            <div className={classes.prevBoxPurple}>
              <p className={classes.trialLabel}>Trial 3</p>
              <img src={mole_4} className={classes.prevMole} alt="prevmole" />
              <br />
              <p>{oneBefore}</p>
            </div>
            <div className={classes.instructionsContainer}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={10}>
                  <p className={classes.instructionsText}>
                    {instructionsArray[pageNum]}
                  </p>
                </Grid>
              </Grid>
            </div>
          </div>
          <div style={{marginLeft:"15%", marginTop: "min(12vh, 100px)"}}>
            <Grid item container direction="row" justify="center" alignItems="center">
            <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>,
    //p7: Does this mole match the mole two before?
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
        <div style={{ width: "100%", margin: "auto" }}>
          <div className={classes.beforeRightMiddleLeftGrid}>
            <div className={classes.prevBoxPurple}>
              <p className={classes.trialLabel}>Trial 1</p>
              <img src={mole_4} className={classes.prevMole} alt="prevmole" />
              <br />
              <p>{threeBefore}</p>
            </div>
            <div className={classes.prevBoxGreen}>
              <p className={classes.trialLabel}>Trial 2</p>
              <img src={mole_4} className={classes.prevMole} alt="prevmole" />
              <br />
              <p>{twoBefore}</p>
            </div>
            <div className={classes.prevBoxPurple}>
              <p className={classes.trialLabel}>Trial 3</p>
              <img src={mole_4} className={classes.prevMole} alt="prevmole" />
              <br />
              <p>{oneBefore}</p>
            </div>
            <div className={classes.instructionsContainer}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={10}>
                  <p className={classes.instructionsText}>
                    {instructionsArray[pageNum]}
                  </p>
                </Grid>
              </Grid>
            </div>
          </div>
          <div style={{marginLeft:"15%", marginTop: "min(12vh, 100px)"}}>
            <Grid item container direction="row" justify="center" alignItems="center">
            <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={mole_2}
                  className={classes.smallImgs}
                  alt="mole_jersey_2"
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>,
    //p8: No, the two before wore a “2”, so don’t tag it!
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
        <div style={{ width: "100%", margin: "auto" }}>
          <div className={classes.beforeRightMiddleLeftGrid}>
            <div className={classes.prevBoxPurple}>
              <p className={classes.trialLabel}>Trial 1</p>
              <img src={mole_4} className={classes.prevMole} alt="prevmole" />
              <br />
              <p>{threeBefore}</p>
            </div>
            <div className={classes.prevBoxGreen}>
              <p className={classes.trialLabel}>Trial 2</p>
              <img src={mole_4} className={classes.prevMole} alt="prevmole" />
              <img
                src={incorrect_circle}
                className={classes.correctCircle}
                alt="incorrect_circle"
              />
              <br />
              <p>{twoBefore}</p>
            </div>
            <div className={classes.prevBoxPurple}>
              <p className={classes.trialLabel}>Trial 3</p>
              <img src={mole_4} className={classes.prevMole} alt="prevmole" />
              <br />
              <p>{oneBefore}</p>
            </div>
            <div className={classes.instructionsContainer}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={10}>
                  <p className={classes.instructionsText}>
                    {instructionsArray[pageNum]}
                  </p>
                </Grid>
              </Grid>
            </div>
          </div>
          <div style={{marginLeft:"15%", marginTop: "min(12vh, 100px)"}}>
            <Grid item container direction="row" justify="center" alignItems="center">
            <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={hole_img}
                  className={classes.smallImgs}
                  alt="hole"
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="row"
                alignContent="center"
                justify="center"
                alignItems="center"
              >
                <img
                  src={mole_2}
                  className={classes.smallImgs}
                  alt="mole_jersey_2"
                />
                <img
                className={classes.jerseyCorrectCircle}
                src={jersey_incorrect_circle}
                alt="jersey_incorrect_circle"
                />
                <img
                src={cross}
                className={classes.correctCheck}
                alt="cross"
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>,
    //p9: The left, middle and right holes correspond to the “J”, “K”,”L” on the keyboard. Press the corresponding key whenever you think the mole macthes the two before.
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
        <div style={{ width: "100%", margin: "auto" }}>
          <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
          <br/>
          <Grid item container direction="row" justify="center" alignItems="center">
            <Grid
              item
              container
              xs={4}
              direction="row"
              alignContent="center"
              justify="center"
              alignItems="center"
            >
              <img
                src={hole_no_margin}
                className={classes.smallImgs}
                alt="hole"
              />
            </Grid>
            <Grid
              item
              container
              xs={4}
              direction="row"
              alignContent="center"
              justify="center"
              alignItems="center"
            >
              <img
                src={hole_no_margin}
                className={classes.smallImgs}
                alt="hole"
              />
            </Grid>
            <Grid
              item
              container
              xs={4}
              direction="row"
              alignContent="center"
              justify="center"
              alignItems="center"
            >
              <img
                src={hole_no_margin}
                className={classes.smallImgs}
                alt="hole"
              />
            </Grid>
          </Grid>
          <Grid item container direction="row" justify="center" alignItems="center">
            <img
            src={keyboard_JKL}
            className={classes.keyboardImage}
            alt="keyboard_JKL"
            />
          </Grid>
        </div>
      </div>
    </div>,
    //p10: Are you ready to play? Let’s try it!
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
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
            className={classes.backButton}
            onClick={() => {
              setPageNum(pageNum - 1);
              console.log(pageNum);
            }}
          >
            {"< " + t("back")}
          </InstructionsButton>

          <InstructionsButton
            onClick={() => {
              setRedirectAddress(props.tryItOutAddress);
            }}
          >
            {t("try-it-out")}
          </InstructionsButton>
        </Grid>
      </div>
    </div>,
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
      <div className={classes.frame}>
        {pages[pageNum]}
        {automaticFlip.includes(pageNum) ? (flipPage()):(<></>)}
        {/* buttons to go to prev/next page */}
        <div className={classes.pageButtonContainer}>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
          >
            {afterFlip.includes(pageNum)?(
              <InstructionsButton
                className={classes.backButton}
                onClick={() => {
                  setPageNum(pageNum - 3);
                  console.log(pageNum);
                }}
              >
                {"< " + t("back")}
              </InstructionsButton>
            ):(
            <></>
            )}
            {!afterFlip.includes(pageNum) && (pageNum > 0 && pageNum!==(pages.length-1)) ? (
              <InstructionsButton
                className={classes.backButton}
                onClick={() => {
                  setPageNum(pageNum - 1);
                  console.log(pageNum);
                }}
              >
                {"< " + t("back")}
              </InstructionsButton>
            ) : (
              <></>
            )}
            {automaticFlip.includes(pageNum) ? (
              <InstructionsButton
              className={classes.greyButton}
              >
                {t("next") + " >"}
              </InstructionsButton>
            ):(
              <></>
            )}
            {((pageNum < pages.length - 1) && !automaticFlip.includes(pageNum)) ? (
              <InstructionsButton
                className={classes.nextButton}
                onClick={() => {
                  setPageNum(pageNum + 1);
                  console.log(pageNum);
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
  );
}