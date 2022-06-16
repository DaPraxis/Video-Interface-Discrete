// import SinglePageInstructions from "./SinglePageInstructions";
import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link, Redirect } from "react-router-dom";
import InstructionsButton from "./InstructionsButton";
import NavBar from "../navigation/NavBar";

let check_mole_img;
let bg;
let keyboard_all;
let hole_img;
let arrow;

if (true) {
  check_mole_img = require("../.." + "/assets/checkmole.png");
  bg = require("../.." + "/assets/bgfield.png");
  arrow = require("../.." + "/assets/icons/arrow-circle-left-solid.svg");
  keyboard_all = require("../.." + "/assets/instructions/keyboard_6keys.png");
  hole_img = require("../.." + "/assets/instructions/hole_no_margin.png");
}else{
  check_mole_img = "../.." + "/assets/checkmole.png";
  bg = "../.." + "/assets/bgfield.png";
  keyboard_all = "../.." + "/assets/instructions/keyboard_6keys.png";
  hole_img = "../.." + "/assets/instructions/hole_no_margin.png";
  arrow = "../.." + "/assets/icons/arrow-circle-left-solid.svg";
}

const useStyles = makeStyles((theme) => ({
  img: {
    height: "150px",
    position: "absolute", 
    top: "50%", 
    left: "90%"
  },
  // imgContainer: {
  //   position: "relative",
  //   padding: "10px 0px",
  // },
  arrow: {
    color: "#4FB8B8",
    fontSize: 75,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Open sans, sans serif",
  },
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
  mole: {
    width: "200px", // the checkmark/cross need to be moved if we change the mole size
  },
  instructionsText: {
    top: "10%",
    margin: "auto",
    textAlign: "center",
    fontFamily: '"Open Sans", sans-serif',
    fontSize: "25px",
  },
  smallImgs: {
    width: "80%",
  },
  correctContainer: {
    position: "relative",
    padding: "0px 0px 50px 0px",
  },
  correctMark: {
    color: "#4FB8B8",
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 100,
    fontWeight: "bold",
    textAlign: "center",
  },
  keyboardImage:{
    width: "80%",
    marginTop: "20px"
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
}));

export default function QuickInstructions(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  let [redirectAddress, setRedirectAddress] = useState("");
  let [pageNum, setPageNum] = useState(0);
  let instructionsArray = t("games.TagMeQuick.ins").split("\n\n");

  let pages = [
    // Instruction
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
        <div style={{ width: "100%", margin: "auto" }}>
          <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <div className={classes.imgContainer} style={{ marginTop: "30px" }}>
              <img
                src={check_mole_img}
                className={classes.img}
                // style={{ position: "absolute", height: "75%", top: "50%", left: "90%" }}
                alt="checkmole"
              />
            </div>
          </Grid>
        </div>
      </div>
    </div>,
    // Keyboard
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
        <div style={{ width: "100%", margin: "auto" }}>
          <div style={{ marginRight: "20px", marginBottom: "30px" }}>
            <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
          </div>
          <Grid container direction="column" spacing={1}>
          <Grid item container direction="row" justify="center" alignItems="center">
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
                alt="hole"
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
                alt="hole"
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
                alt="hole"
              />
            </Grid>
          </Grid>
          <Grid item container direction="row" justify="center" alignItems="center">
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
                alt="hole"
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
                alt="hole"
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
                alt="hole"
              />
            </Grid>
          </Grid>
          <Grid item container spacing = {0} direction="row"  alignContent="center" justify="center" alignItems="center">
            <img
            src={keyboard_all}
            className={classes.keyboardImage}
            alt="keyboard_6_keys"
            />
          </Grid>
          </Grid>
        </div>
      </div>
    </div>,
    // Ready to play the game
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
          {/* buttons to go to prev/next page */}
          <div className={classes.pageButtonContainer}>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="center"
            >
              {pageNum > 0 && pageNum!==(pages.length-1) ? (
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
              {pageNum < pages.length - 1 ? (
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
  // return (
  //   <SinglePageInstructions
  //     instructionsText={t("games.TagMeQuick.ins")}
  //     gameAddress={props.gameAddress}
  //     tryItOutAddress={props.tryItOutAddress}
  //   >
  //     <img
  //       src={check_mole_img}
  //       style={{ position: "absolute", height: "75%", top: "50%", left: "90%" }}
  //       alt="checkmole"
  //     />
  //   </SinglePageInstructions>
  // );
}
