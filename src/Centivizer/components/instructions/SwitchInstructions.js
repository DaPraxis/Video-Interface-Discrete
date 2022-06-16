import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../navigation/NavBar";
import { useTranslation } from "react-i18next";
import InstructionsButton from "./InstructionsButton";
import Grid from "@material-ui/core/Grid";
import { Link, Redirect } from "react-router-dom";

let bg;
let heads;
let left_middle_right;
let lightning;
let rule_1_img;
let rule_2_img;
let rule_3_img;
let rule_4_img;
let rule_5_img;
let rule_6_img;
let arrow;
let hole_no_margin;
let keyboard_JKL;

if (true) {
  bg = require("../.." + "/assets/bgfield.png");
  heads = require("../.." + "/assets/instructions/heads_brown_purple_orange.png");
  left_middle_right = require("../.." + "/assets/instructions/3_holes.png");
  lightning = require("../.." + "/assets/lightning_still.png");
  rule_1_img = require("../.." + "/assets/instructions/switch_rule_1.png");
  rule_2_img = require("../.." + "/assets/instructions/switch_rule_2.png");
  rule_3_img = require("../.." + "/assets/instructions/switch_rule_3.png");
  rule_4_img = require("../.." + "/assets/instructions/switch_rule_4.png");
  rule_5_img = require("../.." + "/assets/instructions/switch_rule_5.png");
  rule_6_img = require("../.." + "/assets/instructions/switch_rule_6.png");
  arrow = require("../.." + "/assets/icons/arrow-circle-left-solid.svg");
  hole_no_margin = require("../.." + "/assets/instructions/hole_no_margin.png");
  keyboard_JKL = require("../.." + "/assets/instructions/keyboard_JKL.png");
}else{
  bg = "../.." + "/assets/bgfield.png";
  heads = "../.." + "/assets/instructions/heads_brown_purple_orange.png";
  left_middle_right = "../.." + "/assets/instructions/3_holes.png";
  lightning = "../.." + "/assets/lightning_still.png";
  rule_1_img = "../.." + "/assets/instructions/switch_rule_1.png";
  rule_2_img = "../.." + "/assets/instructions/switch_rule_2.png";
  rule_3_img = "../.." + "/assets/instructions/switch_rule_3.png";
  rule_4_img = "../.." + "/assets/instructions/switch_rule_4.png";
  rule_5_img = "../.." + "/assets/instructions/switch_rule_5.png";
  rule_6_img = "../.." + "/assets/instructions/switch_rule_6.png";
  arrow = "../.." + "/assets/icons/arrow-circle-left-solid.svg";
  hole_no_margin = "../.." + "/assets/instructions/hole_no_margin.png";
  keyboard_JKL = "../.." + "/assets/instructions/keyboard_JKL.png"; 
}

arrow = require("../.." + "/assets/icons/previous.png");


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
  keyboardImage:{
    width: "80%",
    marginTop: "20px"
  },
}));

/*
 * Instructions page for TAG-ME Switch
 * Has multiple pages with different content on each one, trial/play buttons on the last one
 */
export default function SwitchInstructions(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  // if not equal to '', will redirect to address
  let [redirectAddress, setRedirectAddress] = useState("");

  // hook to keep track of which page we are currently on
  let [pageNum, setPageNum] = useState(0);

  // instructions text is split among pages by double line feeds
  // i.e., if instructions text is "abc\n\ndef", then page 1 has "abc" and page 2 has "def"
  let instructionsArray = t("games.TagMeSwitch.ins").split("\n\n");

  // content of each page
  let pages = [
    <div style={{ width: "100%", margin: "auto" }}>
      <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
      <div style={{ width: "100%", margin: "auto" }}>
        <div
          style={{ textAlign: "center" }}
          className={classes.instructionsSecondaryText}
        >
          <p>{t("games.TagMeSwitch.colour")}</p>
          <img
            src={heads}
            style={{ margin: "10px auto auto auto", width: "60%" }}
            alt="rules_examples"
          />
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={3}>
              {t("games.TagMeSwitch.brown")}
            </Grid>
            <Grid item xs={3}>
              {t("games.TagMeSwitch.purple")}
            </Grid>
            <Grid item xs={3}>
              {t("games.TagMeSwitch.yellow")}
            </Grid>
          </Grid>
          <p>{t("games.TagMeSwitch.place")}</p>
          <img
            src={left_middle_right}
            style={{ margin: "10px auto auto auto", width: "70%" }}
            alt="rules_examples"
          />
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={3}>
              {t("games.TagMeSwitch.left")}
            </Grid>
            <Grid item xs={3}>
              {t("games.TagMeSwitch.middle")}
            </Grid>
            <Grid item xs={3}>
              {t("games.TagMeSwitch.right")}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>,
    <div style={{ width: "100%", margin: "auto" }}>
      <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
      <Grid>
        <br />
      </Grid>
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
          <Grid item className={classes.smallImgText}>
            <p>{t("games.TagMeSwitch.rule1")}</p>
            <img
              src={rule_1_img}
              className={classes.smallImgs}
              alt="brown_orane_purple"
            />
          </Grid>
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
          <Grid item className={classes.smallImgText}>
            <p>{t("games.TagMeSwitch.rule2")}</p>
            <img
              src={rule_2_img}
              className={classes.smallImgs}
              alt="brown_orane_purple"
            />
          </Grid>
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
          <Grid item className={classes.smallImgText}>
            <p>{t("games.TagMeSwitch.rule3")}</p>
            <img
              src={rule_3_img}
              className={classes.smallImgs}
              alt="brown_orane_purple"
            />
          </Grid>
        </Grid>
      </Grid>
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
          <Grid item className={classes.smallImgText}>
            <p>{t("games.TagMeSwitch.rule4")}</p>
            <img
              src={rule_4_img}
              className={classes.smallImgs}
              alt="orange_brown_purple"
            />
          </Grid>
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
          <Grid item className={classes.smallImgText}>
            <p>{t("games.TagMeSwitch.rule5")}</p>
            <img
              src={rule_5_img}
              className={classes.smallImgs}
              alt="orange_brown_purple"
            />
          </Grid>
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
          <Grid item className={classes.smallImgText}>
            <p>{t("games.TagMeSwitch.rule6")}</p>
            <img
              src={rule_6_img}
              className={classes.smallImgs}
              alt="orange_brown_purple"
            />
          </Grid>
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto" }}>
      <Grid
        container
        spacing={0}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid
          item
          container
          xs={8}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <p className={classes.instructionsText}>
              {instructionsArray[pageNum]}
            </p>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <div style={{ width: "100%", margin: "auto" }}>
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.gameButtonContainer}
            >
              <img
                src={lightning}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "20%",
                }}
                alt="rules_examples"
              />
            </Grid>
          </div>
        </Grid>
      </Grid>
      {/* <Grid
        container
        spacing={0}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.gameButtonContainer}
      >
        <InstructionsButton
          onClick={() => {
            setRedirectAddress("/gameSwitchDemo");
          }}
        >
          {t("try-it-out")}
        </InstructionsButton>
        <InstructionsButton
          className={classes.playButton}
          onClick={() => {
            setRedirectAddress(props.gameAddress);
          }}
        >
          {t("play-now")}
        </InstructionsButton>
      </Grid> */}
    </div>,
        // The instruction page for the keyboard
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
    // Ready to start
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
          className={classes.playButton}
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
      {/* <NavBar /> */}
      <Link to="/mainmenu">
        <img
          src={arrow}
          alt="back arrow"
          style={{
            position: "absolute",
            left: "150px",
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
