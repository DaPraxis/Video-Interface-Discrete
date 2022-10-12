import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import bg from "../../assets/bgfield.png";
import NavBar from "../navigation/NavBar";
import { useTranslation } from "react-i18next";
import InstructionsButton from "./InstructionsButton";
import Grid from "@material-ui/core/Grid";
import { Link, Redirect } from "react-router-dom";
import arrow from "../../assets/icons/arrow-circle-left-solid.svg";
import mole_1 from "../../assets/big_and_small/big_moley/bigmoley-1.png";
import mole_2 from "../../assets/big_and_small/big_moley/bigmoley-2.png";
import mole_1_correct from "../../assets/instructions/again_1_correct.png";
import mole_2_correct from "../../assets/instructions/again_2_correct.png";
import hole_img from "../../assets/hole.png";


let keyboard_Space = require("../.." + "/assets/instructions/keyBoard_Space.png");

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
  instructionsText: {
    top: "10%",
    margin: "auto",
    textAlign: "center",
    fontFamily: '"Open Sans", sans-serif',
    fontSize: "25px",
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
  },
  backButton: {
    backgroundColor: "#333333",
    "&:hover": {
      backgroundColor: "#333333",
    },
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
  smallImgText: {
    textAlign: "center",
  },
  prevBoxLeft: {
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
  prevBoxRight: {
    position: "absolute",
    top: "0px",
    left: "20%",
    width: "20%",
    minHeight: " 50%",
    borderRadius: "20px",
    backgroundColor: "#5D4157",
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
  smallBoxLeft: {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "15%",
    minHeight: " 50%",
    borderRadius: "20px",
    backgroundColor: "#B0B0B0",
    textAlign: "center",
    color: "white",
    fontSize: "24px",
  },
  smallBoxMiddle: {
    position: "absolute",
    top: "0px",
    left: "15%",
    width: "15%",
    minHeight: " 50%",
    borderRadius: "20px",
    backgroundColor: "#194141",
    textAlign: "center",
    color: "white",
    fontSize: "24px",
  },
  smallBoxRight: {
    position: "absolute",
    top: "0px",
    left: "30%",
    width: "15%",
    minHeight: " 50%",
    borderRadius: "20px",
    backgroundColor: "#5D4157",
    textAlign: "center",
    color: "white",
    fontSize: "24px",
  },
  middleMoleCircleContainer: {
    position: "absolute",
    top: "0px",
    left: "15%",
    width: "15%",
    minHeight: " 50%",
    borderRadius: "20px",
    textAlign: "center",
    backgroundColor: "#FFFFFF00",
    transform: "translate(0%, -35%)",
    fontSize: "125px",
  },
  correctCircle: {
    color: "#1DBA49",
  },
  incorrectCircle: {
    color: "#D12D2D",
  },
  keyboardImage:{
    width: "80%",
    marginTop: "20px"
  },
}));

/*
 * New instructions page for TAG-ME Again EASY
 */
export default function AgainMediumInstructions(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  // if not equal to '', will redirect to address
  let [redirectAddress, setRedirectAddress] = useState("");
  let [pageNum, setPageNum] = useState(0);

  let instructionsArray = t("games.TagMeAgainMedium.ins").split("\n\n");
  let oneBefore = t("games.TagMeAgainEasy.oneBefore");
  let twoBefore = t("games.TagMeAgainEasy.twoBefore");
  let threeBefore = t("games.TagMeAgainEasy.threeBefore");

  let numHoles;
  switch(props.gameAddress){
    case "/gameTagMeAgainMediumOne":
      numHoles = 1
      break;
    case "/gameTagMeAgainMediumTwo":
    case "/gameTagMeAgainMediumTwoV2":
      numHoles = 2
      break;
    default:
      numHoles = 1;
  }
  // content of each page
  let pages = [
    <div style={{ width: "100%", margin: "auto" }}>
      <div className={classes.prevBoxLeft}>
        <img src={mole_1} className={classes.prevMole} alt="prevmole" />
        <br />
        <p>{oneBefore}</p>
      </div>
      <div className={classes.prevMoleCircleContainer}>
        <p className={classes.correctCircle}>◯</p>
      </div>
      <Grid container direction="row">
        <Grid item xs={2} />
        <Grid item xs={10}>
          <p className={classes.instructionsText}>
            {instructionsArray[pageNum]}
          </p>
        </Grid>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        {
          numHoles - 2 > 0 && <Grid
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
              alt="brown_orane_purple"
            />
          </Grid>
        }
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
            alt="brown_orane_purple"
          />
        </Grid>
        {
          numHoles - 1 > 0 && <Grid
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
              alt="brown_orane_purple"
            />
          </Grid>
        }
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto" }}>
      <div
        className={classes.prevBoxLeft}
        style={{ backgroundColor: "#5D4157" }}
      >
        <img src={mole_1} className={classes.prevMole} alt="prevmole" />
        <br />
        <p>{oneBefore}</p>
      </div>
      <div className={classes.prevMoleCircleContainer}>
        <p className={classes.correctCircle}>◯</p>
      </div>
      <Grid container direction="row">
        <Grid item xs={2} />
        <Grid item xs={10}>
          <p className={classes.instructionsText}>
            {instructionsArray[pageNum]}
          </p>
        </Grid>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        {
          numHoles - 2 > 0 && <Grid
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
              alt="brown_orane_purple"
            />
          </Grid>
        }
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
            alt="brown_orane_purple"
          />
        </Grid>
        {
          numHoles - 1 > 0 && <Grid
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
              alt="brown_orane_purple"
            />
          </Grid>
        }
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto" }}>
      <div className={classes.prevBoxLeft}>
        <img src={mole_1} className={classes.prevMole} alt="prevmole" />
        <br />
        <p>{twoBefore}</p>
      </div>
      <div className={classes.prevMoleCircleContainer}>
        <p className={classes.incorrectCircle}>◯</p>
      </div>
      <div className={classes.prevBoxRight}>
        <img src={mole_2} className={classes.prevMole} alt="prevmole" />
        <br />
        <p>{oneBefore}</p>
      </div>
      <Grid container direction="row">
        <Grid item xs={5} />
        <Grid item xs={7}>
          <p className={classes.instructionsText}>
            {instructionsArray[pageNum]}
          </p>
        </Grid>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        <Grid item xs={6} />
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
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto" }}>
      <div className={classes.smallBoxLeft}>
        <img src={mole_1} className={classes.prevMole} alt="prevmole" />
        <br />
        <p>{threeBefore}</p>
      </div>
      <div className={classes.smallBoxMiddle}>
        <img src={mole_2} className={classes.prevMole} alt="prevmole" />
        <br />
        <p>{twoBefore}</p>
      </div>
      <div className={classes.smallBoxRight}>
        <img src={mole_1} className={classes.prevMole} alt="prevmole" />
        <br />
        <p>{oneBefore}</p>
      </div>
      <div className={classes.middleMoleCircleContainer}>
        <p className={classes.correctCircle}>◯</p>
      </div>
      <Grid container direction="row">
        <Grid item xs={6} />
        <Grid item xs={6}>
          <p className={classes.instructionsText}>
            {instructionsArray[pageNum]}
          </p>
        </Grid>
      </Grid>
      <Grid item container direction="row" justify="center" alignItems="center">
        <Grid item xs={6} />
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
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <Grid item container direction="row" justify="center" alignItems="center">
      <img
      src={keyboard_Space}
      className={classes.keyboardImage}
      alt="keyboard_JKL"
      />
    </Grid>,
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
      </Grid>
    </>,
  ];

  return (
    <div className={classes.root}>
      {redirectAddress === "" ? <></> : <Redirect to={redirectAddress} push />}
      {/* <NavBar /> */}
      {/* <Link to="/mainmenu">
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
      </Link> */}
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
    </div>
  );
}