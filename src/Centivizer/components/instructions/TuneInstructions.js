
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
let intune;
let outoftune;
let question;
let hole_img;
let questiontag;
let neutral;
let keyboard_img;
let bubble;
let assets;

if (process.env.NODE_ENV === 'development') {
  bg = require(process.env.REACT_APP_MY_URL + "/assets/bgfield.png");
  arrow = require(process.env.REACT_APP_MY_URL + "/assets/icons/arrow-circle-left-solid.svg");
  mole_S = require(process.env.REACT_APP_MY_URL + "/assets/basic_normal.png");
  intune = require(process.env.REACT_APP_MY_URL + "/assets/intune.png");
  outoftune = require(process.env.REACT_APP_MY_URL + "/assets/outoftune.png";
  question = require(process.env.REACT_APP_MY_URL + "/assets/tune/question.png");
  hole_img = require(process.env.REACT_APP_MY_URL + "/assets/hole.png");
  questiontag = require(process.env.REACT_APP_MY_URL + "/assets/tune/questiontag.png");
  neutral = require(process.env.REACT_APP_MY_URL + "/assets/tune/neutral.png");
  keyboard_img = require(process.env.REACT_APP_MY_URL + "/assets/instructions/coda_keyboard.png");
  bubble = require(process.env.REACT_APP_MY_URL + "/assets/dialogs/dialog.png");
  assets = require(process.env.REACT_APP_MY_URL + "/assets/tune/assets");
}else{
  bg = process.env.REACT_APP_MY_URL + "/assets/bgfield.png";
  arrow = process.env.REACT_APP_MY_URL + "/assets/icons/arrow-circle-left-solid.svg";
  mole_S = process.env.REACT_APP_MY_URL + "/assets/basic_normal.png";
  intune = process.env.REACT_APP_MY_URL + "/assets/intune.png";
  outoftune = process.env.REACT_APP_MY_URL + "/assets/outoftune.png";
  question = process.env.REACT_APP_MY_URL + "/assets/tune/question.png";
  hole_img = process.env.REACT_APP_MY_URL + "/assets/hole.png";
  questiontag = process.env.REACT_APP_MY_URL + "/assets/tune/questiontag.png";
  neutral = process.env.REACT_APP_MY_URL + "/assets/tune/neutral.png";
  keyboard_img = process.env.REACT_APP_MY_URL + "/assets/instructions/coda_keyboard.png";
  bubble = process.env.REACT_APP_MY_URL + "/assets/dialogs/dialog.png";
  assets = process.env.REACT_APP_MY_URL + "/assets/tune/assets";
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
  },
  test: {

  }
}));

/*
 * New instructions page for TAG-ME Again EASY
 */
export default function TuneInstructions(props) {
  audio.stopBackground();

  console.log(props);

  const classes = useStyles();
  const { t } = useTranslation();

  // if not equal to '', will redirect to address
  let [redirectAddress, setRedirectAddress] = useState("");
  let [pageNum, setPageNum] = useState(0);

  let bubblePages = [11];

  let animate = {3: [assets.prime["CEG"], assets.target.ITR["GBD"]],
                 6: [assets.prime["CEG"], assets.target.OTR["GBD"]]}

  useEffect(() => {
    if (pageNum in animate) {
      audio.playSound(new Audio(animate[pageNum][0]))
      Promise.resolve()
        .then(() => {
          setTimeout( () => {
            try {
              document.getElementsByClassName("animate")[0].src = question
              audio.playSound(new Audio(animate[pageNum][1]))
            }
            catch {
              console.log("question animation skipped")
            }
          }, 1050)
        })
    }
  }, [pageNum]);

  // parts of the instructions are hardcoded for styling
  let instructionsArray = t("games.TagMeTune.ins").split("\n\n");

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
            src={neutral}
            className={classes.smallImgs}
            alt="brown_orane_purple"
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
          xs={6}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <p className={classes.ruleLabel}>In-tune</p>
          <img
            src={intune}
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
          <p className={classes.ruleLabel}>Out-of-tune</p>
          <img
            src={outoftune}
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
            src={neutral}
            className={classes.smallImgs}
            alt="brown_orane_purple"
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
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>
        Here is an example of the two moles following the "
        <span class={classes.doubleBold}>in-tune</span>" rule. 
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
          xs={4}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={hole_img}
            className={`${classes.smallImgs}` + " animate"}
            alt="brown_orane_purple"
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
            src={intune}
            className={classes.smallImgs}
            alt="brown_orane_purple"
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
          xs={4}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <div
            style={{
              position: "relative",
              left: "40%",
              transform: "translateX(-50%) rotate(-20deg)",
              top: "50px",
              fontSize: "52px",
              fontWeight: "bold",
            }}
          >
            +1
          </div>
          <img
            src={questiontag}
            className={classes.smallImgs}
            alt="brown_orane_purple"
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
            src={intune}
            className={classes.smallImgs}
            alt="brown_orane_purple"
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
          xs={4}
          direction="row"
          alignContent="center"
          justify="center"
          alignItems="center"
        >
          <img
            src={question}
            className={classes.smallImgs}
            alt="brown_orane_purple"
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
            src={intune}
            className={classes.smallImgs}
            alt="brown_orane_purple"
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
            alt="brown_orane_purple"
          />
        </Grid>
      </Grid>
    </div>,
    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
      <p className={classes.instructionsText}>
        Here is an example of the two moles following the "
        <span class={classes.doubleBold}>out-of-tune</span>" rule. 
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
            src={outoftune}
            className={classes.smallImgs}
            alt="brown_orane_purple"
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
            className={`${classes.smallImgs}` + " animate"}
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
            src={outoftune}
            className={classes.smallImgs}
            alt="brown_orane_purple"
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
          <div
            style={{
              position: "relative",
              left: "40%",
              transform: "translateX(-50%) rotate(-20deg)",
              top: "50px",
              fontSize: "52px",
              fontWeight: "bold",
            }}
          >
            +1
          </div>
          <img
            src={questiontag}
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
            src={outoftune}
            className={classes.smallImgs}
            alt="brown_orane_purple"
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
            src={question}
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
            src={neutral}
            className={classes.smallImgs}
            alt="brown_orane_purple"
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
            src={neutral}
            className={classes.smallImgs}
            alt="brown_orane_purple"
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
          Yes, try it out!
        </InstructionsButton>
        <InstructionsButton
          onClick={() => {
            setPageNum(0);
          }}
        >
          No, go back!
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
              {pageNum > 0 && pageNum != pages.length - 1 ? (
                <InstructionsButton
                  className={classes.backButton}
                  onClick={() => {
                    audio.stopAll();
                    try {
                      document.getElementsByClassName("animate")[0].src = hole_img 
                    }
                    catch {

                    }
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
                    try {
                      document.getElementsByClassName("animate")[0].src = hole_img 
                    }
                    catch {
                      
                    }
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
