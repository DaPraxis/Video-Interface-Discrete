import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import i18n from "../../data/languages/i18n";
import { makeStyles } from "@material-ui/core/styles";
import ColourButton from "./ColourButton";
import { Redirect } from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import GameSelectNavBar from "../navigation/GameSelectNavBar";
import MusicSelectButton from "./MusicSelectButton";

let bg;

if (true) {
  bg = require("../.." + "/assets/bg.png");
}else{
  bg = "../.." + "/assets/bg.png";
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    flexGrow: 1,
    backgroundAttachment: "fixed",
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
  title: {
    fontSize: "2.6rem",
    margin: "0.5rem",
    color: "white",
    textShadow: "0px 0px 25px #285c41",
    fontFamily: "Superfats",
  },
  titleBlock: {
    paddingTop: "3rem",
  },
  icon: {
    paddingTop: "12px",
    fontSize: "150px",
  },
  buttonPaper: {
    padding: theme.spacing(2),
    textAlign: "center",
    // color: theme.palette.text.secondary,
    marginTop: "2%",
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  buttonText: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  button2: {
    fontSize: "20px",
    border: "1.5px solid #17a2b8",
    borderRadius: "15px",
    backgroundColor: "whitesmoke",
    color: "#17a2b8",
    fontWeight: "bold",
    width: "200px",
    margin: "0px 30px",
    "&:hover": {
      borderColor: "#17a2b8",
      backgroundColor: " #17a2b8",
      color: "whitesmoke",
    },
  },
  tagMe: {
    boxSizing: "border-box",
    height: "25%",
    fontSize: "0.7em",
    display: "block",
    paddingTop: "10%",
    fontFamily: "Open Sans",
  },
  gameName: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-40%)",
    display: "block",
    textAlign: "center",
    width: "100%",
    boxSizing: "border-box",
    color: "#133030",
    lineHeight: "38px",
    textTransform: "none",
    fontWeight: "bold",
    fontSize: "34px",
    whiteSpace: "pre-wrap",
  },
}));

function GameButton(props) {
  const classes = useStyles(); // hook for component styles
  const { t } = useTranslation();
  let [redirect, setRedirect] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper className={classes.buttonPaper} key={props.id}>
      <div className={classes.sectionDesktop}>
        <ColourButton
          variant="contained"
          color={props.color}
          disabled={props.disabled}
          onClick={(e) => {
            if (props.color == "default") {
              e.preventDefault();
              setRedirect(true);
            } else {
              handleClickOpen();
            }
          }}
        >
          <div className={classes.buttonText}>
            <span className={classes.tagMe}>{props.type}</span>
            {props.name.includes("Hole") ? (
              <span
                style={{ fontSize: "24px", lineHeight: "29px" }}
                className={classes.gameName}
              >
                {props.name}
              </span>
            ) : (
                <span className={classes.gameName}>{props.name}</span>
              )}

            {redirect ? <Redirect to={props.instructionsUrl} push /> : <></>}
          </div>
        </ColourButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              padding: "1rem 1.5rem",
              border: "0 solid rgba(0, 0, 0, 0)",
              borderRadius: "30px",
              fontWeight: "bold",
            },
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{
              fontSize: "34px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            {props.color == "secondary"
              ? t("play-state.play-locked-title")
              : t("play-state.play-again-title")}
          </DialogTitle>
          <DialogContent style={{ fontSize: "18px", textAlign: "center" }}>
            <DialogContentText id="alert-dialog-description">
              {props.color == "secondary"
                ? t("play-state.play-locked-alert")
                : t("play-state.play-again-alert")}
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            {props.color == "primary" ? (
              <Button
                className={classes.button2}
                onClick={(e) => {
                  e.preventDefault();
                  setRedirect(true);
                }}
              >
                {t("end-sess.end-conf")}
              </Button>
            ) : (
                <></>
              )}

            <Button onClick={handleClose} autoFocus className={classes.button2}>
              {t("end-sess.end-canc")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Paper>
  );
}

function NextButton(props) {
  const classes = useStyles(); // hook for component styles
  return (
    <Paper className={classes.buttonPaper} key={props.key}>
      <ColourButton variant="contained" color="primary">
        <ArrowForwardIcon
          className={classes.icon}
          onClick={(e) => {
            e.preventDefault();
            props.nextPage();
          }}
        />
      </ColourButton>
    </Paper>
  );
}

function PrevButton(props) {
  const classes = useStyles(); // hook for component styles
  return (
    <Paper className={classes.buttonPaper} key={props.key}>
      <ColourButton variant="contained" color="primary">
        <ArrowBackIcon
          className={classes.icon}
          onClick={(e) => {
            e.preventDefault();
            props.prevPage();
          }}
        />
      </ColourButton>
    </Paper>
  );
}

export default function VersionGameSelectMenu(props) {
  const classes = useStyles(); // hook for component styles
  const { t } = useTranslation();

  const [pageNum, _setPageNum] = useState(0);
  const pageNumRef = React.useRef(pageNum);
  function setPageNum(pageNum) {
    pageNumRef.current = pageNum;
    _setPageNum(pageNum);
  }

  const dataHandler = props.version.dataHandler;
  const [pages, setPages] = useState(null);
  const [error, setError] = useState(null);
  const [loadingPages, setLoadingPages] = useState(true);



  async function getParticipantState() {
    try {
      setLoadingPages(true);
      var gameNames = [];
      props.version.games.forEach((game) => {
        gameNames.push(game.translationKey);
      });
      let data = await dataHandler.getGameState(gameNames);
      data = JSON.parse(data.data);
      let order = JSON.parse(data.order);
      let pages = createButtons(data, order);
      setPages(pages);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoadingPages(false);
    }
  }
  useEffect(() => {
    // if (audio.backgroundMusic.paused) {
    //   // audio.playSound(audio.backgroundMusic);
    // }
    getParticipantState();
  }, []);

  function prevPage() {
    setPageNum(pageNumRef.current - 1); // must use ref inside a function
  }
  function nextPage() {
    setPageNum(pageNumRef.current + 1); // must use ref inside a function
  }

  function gameToButton(game, count, data) {
    // 0 = disabled and todo, 1 = playable, 2 is disabled and completed
    const status = { 0: "secondary", 1: "default", 2: "primary" };

    return (
      <GameButton
        type={i18n.language === "zh" ? count + 1 + ". TAG-ME" : "TAG-ME"}
        name={t(`games.${game.translationKey}.name`)}
        color={status[data[game.translationKey]] || "default"}
        disabled={false}
        instructionsUrl={`instructions${game.name}`}
        id={count}
      />
    );
  }

  function createButtons(data, order) {
    let pages = [];
    let buttons = [];
    let games = props.version.games;
    let count;

    // in demo we want specific order, so no sorting
    // games.sort(function (a, b) {
    //   return order.indexOf(a.translationKey) - order.indexOf(b.translationKey);
    // });
    for (count = 0; count < 5 && count < games.length; count++) {
      // first page can have 5 GAMES, need space at the end for next page button
      let item = games[count];
      buttons.push(gameToButton(item, count, data));
    }
    while (count < games.length) {
      if (games.length - count === 1) {
        // if only one left, add it
        let item = games[count];
        buttons.push(gameToButton(item, count, data));
        count++;
      } else {
        buttons.push(
          <NextButton nextPage={nextPage} />,
          <PrevButton prevPage={prevPage} />
        ); // page navigation buttons
        for (let i = 0; i < 4 && count < games.length; i++) {
          // push 4 buttons, need space at beginning and end for nav buttons
          let item = games[count];
          buttons.push(gameToButton(item, count, data));
          count++;
        }
      }
    }

    while (buttons.length % 6 !== 0) {
      // pad end of list with empty buttons until all pages are filled
      buttons.push(
        <Paper className={classes.buttonPaper} key={buttons.length}>
          <ColourButton variant="contained" color="primary" />
        </Paper>
      );
    }

    for (let i = 0; i < buttons.length; i += 6) {
      // construct pages as pairs of rows
      let currRows = [];
      currRows.push(
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={0}
        >
          {buttons.slice(i, i + 3)}
        </Grid>
      );
      currRows.push(
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={0}
        >
          {buttons.slice(i + 3, i + 6)}
        </Grid>
      );
      pages.push(currRows);
    }
    return pages;
  }

  let titleLines = t("game-select-title").split("\n");

  return (
    <div className={classes.root}>
      <GameSelectNavBar version={props.version} />
      <div align = "left" style ={{float : 'left', paddingLeft : '15px'}}>
      <a target="_blank" href="https://demo.braintagger.com/#/">Demo Homepage</a>
      <br></br>
      <br></br>
      <a target="_blank" href="https://intro.braintagger.com/#/">Braintagger Site</a>
                </div>
      <div className={classes.titleBlock}>
        <span className={classes.title}>
          {titleLines.map((line) => (
            <>
              {line}
              <br />
            </>
          ))}
        </span>
      </div>
      <Grid
        container
        spacing={0}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {
          error
            ? "Failed to load resource A"
            : loadingPages
              ? "Loading A..."
              : pages[
              pageNum
              ] /* pageNum is a hook, so page changes whenever state is updated */
        }
      </Grid>
      <MusicSelectButton setCurrBackgroundMusicIndex={props.setCurrBackgroundMusicIndex} />
    </div>
  );
}
