// import SinglePageInstructions from "./SinglePageInstructions";
import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link, Redirect } from "react-router-dom";
import InstructionsButton from "./InstructionsButton";
import NavBar from "../navigation/NavBar";

let img;
let bg;
let arrow;
let keyboard_all;
let hole_img;

if (true) {
  bg = require("../.." + "/assets/bgfield.png");
  arrow = require("../.." + "/assets/icons/arrow-circle-left-solid.svg");
  keyboard_all = require("../.." + "/assets/instructions/keyboard_6keys.png");
  img = require("../.." + "/assets/instructions/only_instructions.png");
  hole_img = require("../.." + "/assets/instructions/hole_no_margin.png");
}else{
  bg = "../.." + "/assets/bgfield.png";
  arrow = "../.." + "/assets/icons/arrow-circle-left-solid.svg";
  keyboard_all = "../.." + "/assets/instructions/keyboard_6keys.png";
  img = "../.." + "/assets/instructions/only_instructions.png";
  hole_img = "../.." + "/assets/instructions/hole_no_margin.png";
}
// arrow = require("../.." + "/assets/icons/arrow-circle-left-solid.png");
arrow = require("../.." + "/assets/icons/previous.png");


const useStyles = makeStyles((theme) => ({
  img: {
    height: "150px",
  },
  imgContainer: {
    position: "relative",
    padding: "10px 0px",
  },
  arrow: {
    color: "#4FB8B8",
    fontSize: 75,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Open sans, sans serif",
    marginLeft:'10%'
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

export default function OnlyInstructions(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  let [redirectAddress, setRedirectAddress] = useState("");
  let [pageNum, setPageNum] = useState(0);
  let instructionsArray = t("games.TagMeOnly.ins").split("\n\n");

  let pages = [
    // Instruction page
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
              <img src={img} className={classes.img} alt="only_instructions" />
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
    // Ready to play page
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
        {/* <NavBar /> */}
        {/* <Link to="/mainmenu">
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
        </Link> */}
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
  //     instructionsText={t("games.TagMeOnly.ins")}
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
  //       <div className={classes.imgContainer}>
  //         <img src={img} className={classes.img} alt="only_instructions" />
  //       </div>
  //     </Grid>
  //   </SinglePageInstructions>
  // );
}
