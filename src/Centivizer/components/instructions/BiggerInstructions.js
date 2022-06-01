import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InstructionsButton from "./InstructionsButton";
import { Link, Redirect } from "react-router-dom";
import NavBar from "../navigation/NavBar";

let big_mole_7;
let small_mole_9;
let check;
let cross;
let arrow;
let bg;
let keyboard_JK;
let hole_img; // used for the keyboard page

if (process.env.NODE_ENV === 'development') {
  big_mole_7 = require('../..' + "/assets/big_and_small/big_moley/bigmoley-7.png");
  small_mole_9 = require('../..' + "/assets/big_and_small/small_moley/smallmoley-9.png");
  check = require('../..' + "/assets/instructions/check.png");
  cross = require('../..' + "/assets/instructions/cross.png");
  keyboard_JK = require('../..' + "/assets/instructions/keyboard_JK.png");
  hole_img = require('../..' + "/assets/instructions/hole_no_margin.png");
  arrow = require('../..' + "/assets/icons/arrow-circle-left-solid.svg");
  bg = require('../..' + "/assets/bgfield.png");
}else{
  hole_img = '../..' + "/assets/instructions/hole_no_margin.png";
  keyboard_JK = '../..' + "/assets/instructions/keyboard_JK.png";
  big_mole_7 = '../..' + "/assets/big_and_small/big_moley/bigmoley-7.png";
  small_mole_9 = '../..' + "/assets/big_and_small/small_moley/smallmoley-9.png";
  check = '../..' + "/assets/instructions/check.png";
  cross = '../..' + "/assets/instructions/cross.png";
  arrow = '../..' + "/assets/icons/arrow-circle-left-solid.svg";
  bg = '../..' + "/assets/bgfield.png";
}

const useStyles = makeStyles((theme) => ({
  mole: {
    width: "200px", // the checkmark/cross need to be moved if we change the mole size
  },
  correctContainer: {
    position: "relative",
    padding: "0px 0px 50px 0px",
  },
  correctMark: {
    position: "absolute",
    width: "30%",
    top: "80%",
    left: "50%",
    transform: "translateX(-50%)",
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

export default function BiggerInstructions(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  let [redirectAddress, setRedirectAddress] = useState("");
  let [pageNum, setPageNum] = useState(0);
  let instructionsArray = t("games.TagMeBigger.ins").split("\n\n");
  
  // All pages
  let pages = [
    // The instruction page
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
        <div style={{ width: "100%", margin: "auto" }}>
          <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
          <Grid
          container
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center"
          >
            <div className={classes.correctContainer}>
              <img src={big_mole_7} className={classes.mole} alt="big_mole_7" />
              {/* <p className={classes.correctMark}>x</p> */}
              <img src={cross} className={classes.correctMark} alt="cross"/>
            </div>
            <div className={classes.correctContainer}>
              <img src={small_mole_9} className={classes.mole} alt="small_mole_9" />
              {/* <p className={classes.correctMark}>o</p> */}
              <img src={check} className={classes.correctMark} alt="check"/>
            </div>
          </Grid>
        </div>
      </div>
    </div>,
    // Keyboard page
    <div className={classes.whiteBg}>
      <div className={classes.padding}>
        <div style={{ width: "100%", margin: "auto" }}>
          <div style={{ marginRight: "20px", marginBottom: "30px" }}>
            <p className={classes.instructionsText}>{instructionsArray[pageNum]}</p>
          </div>
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
          </Grid>
          <Grid item container direction="row" justify="center" alignItems="center">
            <img
            src={keyboard_JK}
            className={classes.keyboardImage}
            alt="keyboard_JK"
            />
          </Grid>
        </div>
      </div>
    </div>,
    // try it out and start the game!
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
  ]

  // Multi-page instruction
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

  // For single page instruction
  // return (
  //   <SinglePageInstructions
  //     instructionsText={t("games.TagMeBigger.ins")}
  //     gameAddress={props.gameAddress}
  //     tryItOutAddress={props.tryItOutAddress}
  //   >
  //     <Grid
  //       container
  //       spacing={2}
  //       direction="row"
  //       justify="center"
  //       alignItems="center"
  //     >
  //       <div className={classes.correctContainer}>
  //         <img src={big_mole_7} className={classes.mole} alt="big_mole_7" />
  //         {/* <p className={classes.correctMark}>x</p> */}
  //         <img src={cross} className={classes.correctMark} alt="cross"/>
  //       </div>
  //       <div className={classes.correctContainer}>
  //         <img src={small_mole_9} className={classes.mole} alt="small_mole_9" />
  //         {/* <p className={classes.correctMark}>o</p> */}
  //         <img src={check} className={classes.correctMark} alt="check"/>
  //       </div>
  //     </Grid>
  //   </SinglePageInstructions>
  // );
}
