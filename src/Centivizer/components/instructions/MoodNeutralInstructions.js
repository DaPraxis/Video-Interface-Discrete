
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
let bubble;
let neutral;

if (true) {
  bg = require(process.env.REACT_APP_MY_URL + "/assets/mood/bg_wall.png");
  arrow = require(process.env.REACT_APP_MY_URL + "/assets/icons/arrow-circle-left-solid.svg");
  mole_S = require(process.env.REACT_APP_MY_URL + "/assets/basic_normal.png");
  bubble = require(process.env.REACT_APP_MY_URL + "/assets/dialogs/dialog.png");
  neutral = require(process.env.REACT_APP_MY_URL + "/assets/mood/neutral.png");
}else{
  bg = process.env.REACT_APP_MY_URL + "/assets/mood/bg_wall.png";
  arrow = process.env.REACT_APP_MY_URL + "/assets/icons/arrow-circle-left-solid.svg";
  mole_S = process.env.REACT_APP_MY_URL + "/assets/basic_normal.png";
  bubble = process.env.REACT_APP_MY_URL + "/assets/dialogs/dialog.png";
  neutral = process.env.REACT_APP_MY_URL + "/assets/mood/neutral.png";
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
    paddingLeft: "4%",
  },
  ruleLabel: {
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: "700",
    fontSize: "20px",
    marginBottom: "-2vw",
    width: "100%",
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
    width: "80%",
  },
  wideImg: {
    width: "80%",
    height: "auto",
  },
  signMole: {
    width: "40%",
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
    height: "17vw",
    backgroundColor: "#fff",
  }
}));

export default function TuneInstructions(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  // if not equal to '', will redirect to address
  let [redirectAddress, setRedirectAddress] = useState("");
  let [pageNum, setPageNum] = useState(0);

  let bubblePages = [];

  // content of each page
  let pages = [
    <>
      <p className={classes.instructionsText}>
      In this game, tag each NEUTRAL face as quickly and accurately as possible. Do not tag the happy and fearful faces.
      <br/>
      Remember: The faster you tag the neutral face, the better your score!
      </p>
      <Grid
        container
        spacing={0}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.gameButtonContainer}
      >
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
            src={neutral}
            className={classes.wideImg}
            alt="brown_orane_purple"
          />
        </Grid>

        <InstructionsButton
          onClick={() => {
            setRedirectAddress(props.tryItOutAddress);
          }}
        >
          {t("try-it-out")}
        </InstructionsButton>
      </Grid>
    </>,
  ]

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
          {/* buttons to go to prev/next page */}
        </div>
      )}
    </div>
  );

}