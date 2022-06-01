import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../navigation/NavBar";
import { useTranslation } from "react-i18next";
import InstructionsButton from "./InstructionsButton";
import Grid from "@material-ui/core/Grid";
import { Link, Redirect } from "react-router-dom";

let bg;
let arrow;
let correct_circle;
let incorrect_circle;
let mole_1;
let mole_2;
let mole_1_correct;
let mole_2_correct;
let mole_2_incorrect;
let hole_img;
let keyboard_JKL;
let hole_no_margin;

if (process.env.NODE_ENV === 'development') {
  bg = require("../.." + "/assets/bgfield.png");
  arrow = require("../.." + "/assets/icons/arrow-circle-left-solid.svg");
  correct_circle = require("../.." + "/assets/instructions/correct_circle.png");
  incorrect_circle = require("../.." + "/assets/instructions/incorrect_circle.png");
  mole_1 = require("../.." + "/assets/big_and_small/big_moley/bigmoley-1.png");
  mole_2 = require("../.." + "/assets/big_and_small/big_moley/bigmoley-2.png");
  mole_1_correct = require("../.." + "/assets/instructions/again_1_correct.png");
  mole_2_correct = require("../.." + "/assets/instructions/again_2_correct.png");
  mole_2_incorrect = require("../.." + "/assets/instructions/again_2_incorrect.png");
  hole_img = require("../.." + "/assets/hole.png");
  keyboard_JKL = require("../.." + "/assets/instructions/keyboard_JKL.png");
  hole_no_margin = require("../.." + "/assets/instructions/hole_no_margin.png");
}else{
  bg = "../.." + "/assets/bgfield.png";
  arrow = "../.." + "/assets/icons/arrow-circle-left-solid.svg";
  correct_circle = "../.." + "/assets/instructions/correct_circle.png";
  incorrect_circle = "../.." + "/assets/instructions/incorrect_circle.png";
  mole_1 = "../.." + "/assets/big_and_small/big_moley/bigmoley-1.png";
  mole_2 = "../.." + "/assets/big_and_small/big_moley/bigmoley-2.png";
  mole_1_correct = "../.." + "/assets/instructions/again_1_correct.png";
  mole_2_correct = "../.." + "/assets/instructions/again_2_correct.png";
  mole_2_incorrect = "../.." + "/assets/instructions/again_2_incorrect.png";
  hole_img = "../.." + "/assets/hole.png";
  keyboard_JKL = "../.." + "/assets/instructions/keyboard_JKL.png";
  hole_no_margin = "../.." + "/assets/instructions/hole_no_margin.png";
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
    width: "100%",
    top: "0px",
    left: "0px",
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
    zIndex: "100",
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
    backgroundColor: "transparent"
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
 * New instructions page for TAG-ME Again EASY
 */
export default function AgainEasyInstructions(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  // if not equal to '', will redirect to address
  let [redirectAddress, setRedirectAddress] = useState("");
  let [pageNum, setPageNum] = useState(0);

  let instructionsArray = t("games.TagMeAgainEasy.ins").split("\n\n");
  let oneBefore = t("games.TagMeAgainEasy.oneBefore");
  // content of each page
  let pages = [
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
            src={mole_1}
            className={classes.smallImgs}
            alt="mole_jersey_1"
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
    </div>,
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
    </div>,
    <div style={{ width: "100%", margin: "auto" }}>
      <div className={classes.beforeGrid}>
          <div className={classes.prevBoxGreen}>
            <img src={mole_1} className={classes.prevMole} alt="prevmole" />
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
      <div style={{marginLeft:"15%", marginTop: "min(9vh, 70px)"}}>
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
    </div>,
    <div style={{ width: "100%", margin: "auto" }}>
      <div className={classes.beforeGrid}>
        <div className={classes.prevBoxGreen}>
          <img src={mole_1} className={classes.prevMole} alt="prevmole" />
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
      <div style={{marginLeft:"15%", marginTop: "min(9vh, 70px)"}}>
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
              src={mole_1_correct}
              className={classes.smallImgs}
              alt="mole_1_correct"
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
    </div>,
    <div style={{ width: "100%", margin: "auto" }}>
      <div className={classes.beforeGrid}>
        <div className={classes.prevBoxGreen}>
          <img src={mole_1} className={classes.prevMole} alt="prevmole" />
          <img
            src={incorrect_circle}
            className={classes.correctCircle}
            alt="incorrect_circle"
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
      <div style={{marginLeft:"15%", marginTop: "min(9vh, 70px)"}}>
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
              src={mole_2_incorrect}
              className={classes.smallImgs}
              alt="mole_2_incorrect"
            />
          </Grid>
        </Grid>
      </div>
    </div>,
    <div style={{ width: "100%", margin: "auto" }}>
      <div className={classes.beforeGrid}>
        <div className={classes.prevBoxGreen}>
          <img src={mole_2} className={classes.prevMole} alt="prevmole" />
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
      <div style={{marginLeft:"15%", marginTop: "min(9vh, 70px)"}}>
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
              src={mole_2_correct}
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
    </div>,
    // The instruction page for the keyboard
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
        <div style={{ width: "100%", margin: "auto" }}>
          <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
          <br />
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
            {(pageNum > 0 && pageNum!==(pages.length-1)) ? (
              <InstructionsButton
                className={classes.backButton}
                onClick={() => {
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
  );
}
