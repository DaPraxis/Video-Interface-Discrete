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
import DataHandler from "../../data-handler/DataHandler";
import {Card} from 'react-bootstrap'

let bg;

if (process.env.NODE_ENV === 'development') {
  bg = require("../.." + "/assets/bg.png");
}else{
  bg = "../.." + "/assets/bg.png";
}

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundImage: `url(${bg})`,
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
    // color: "white",
    // textShadow: "0px 0px 25px #285c41",
    // fontFamily: "Superfats",
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
  let [redirect_ss, setRedirect_ss] = useState(false);

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
              props.setGameId(props.id);
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

            {redirect_ss ? <Redirect to={props.instructionsUrl} push /> : <></>}
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

export default function VersionGameSelectMenuDriving(props) {
  const classes = useStyles(); // hook for component styles
  const { t } = useTranslation();

  const [pageNum, _setPageNum] = useState(0);
  const pageNumRef = React.useRef(pageNum);
  function setPageNum(pageNum) {
    pageNumRef.current = pageNum;
    _setPageNum(pageNum);
  }
  let [redirect_ss, setRedirect_ss] = useState(false);


  const dataHandler = props.version.dataHandler;
  const [pages, setPages] = useState(null);
  const [error, setError] = useState(null);
  const [loadingPages, setLoadingPages] = useState(true);
  const [gameStates, setGameStates] = useState({});
  const [gameId, setGameId] = useState(-1)
  const [isDone, setIsDone] = useState(false)

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

  function gameToButton(game, count, data, setFunc) {
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
        setGameId={setFunc}
      />
    );
  }

  function createButtons(data, order) {
    let pages = [];
    let buttons = [];
    let games = props.version.games;
    let count;
    let buttonCount = 3

    // in demo we want specific order, so no sorting
    // games.sort(function (a, b) {
    //   return order.indexOf(a.translationKey) - order.indexOf(b.translationKey);
    // });
    let d = {}
    let dd = dataHandler.printLocalData()
    let is_done = true
    // console.log(dd)
    for (count = 0; count < buttonCount && count < games.length; count++) {
      // first page can have 5 GAMES, need space at the end for next page button
      let item = games[count];
      d[item.name] = 0
      dd.forEach((x, i)=>{
        if(x.name.includes(item.name)){d[item.name]=1}})
      if (d[item.name]==0){
        is_done = false
      }
      buttons.push(gameToButton(item, count, data, setGameId));
    }
    setGameStates(d)
    if(is_done && (Object.keys(d).length != 0)){
      setIsDone(true)
    }

    for (let i = 0; i < buttons.length; i += buttonCount) {
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

  let cardDict = {
    0:{
      'name':'Only',
      'n': 'Only',
      'img':require('../../assets/hat_normal_d.png'),
      'COG':'Response inhibition is the ability to make and act on rational, thought-out decisions rather than impulse. Affected areas include attention, thoughts, emotions, and behavior.',
      'ins':'In this game, hit the regular moles, but avoid hitting the moles with black hats.'
    },
    1:{
      'name':'AgainMedium',
      'n': 'Again',
      'img':require('../../assets/again_d.png'),
      'COG':'Working memory is the ability to hold and manipulate information temporarily for the purposes of completing a task. It is essential for everyday functionality from connecting concepts, learning, to remembering facts and responding in conversations.',
      'ins':'In this game, hit the mole whose t-shirt number is the same as one of the previous moles.'
    },
    2:{
      'name':'Switch',
      'n': 'Switch',
      'img':require('../../assets/switch_d.png'),
      'COG':'Cognitive flexibility, “shifting”, is fundamentally the ability to switch between tasks easily. This type of ability is an indicator of fluid intelligence, empathy, and problem-solving ability, being able to change perspectives easily.',
      'ins':'In this game, two moles pop-up simultaneously, and you hit the correct mole following the current rule out of 6 total rules that keep switching.'
    }
  }

  return (
    <div className={classes.root}>
      {/* <GameSelectNavBar version={props.version} /> */}
      <div align = "left" style ={{float : 'left', paddingLeft : '15px'}}>
        {/* <h2>Choose A Game</h2> */}
      {/* <a target="_blank" href="https://demo.braintagger.com/#/">Demo Homepage</a>
      <br></br>
      <br></br> */}
      {/* <a target="_blank" href="https://intro.braintagger.com/#/">Braintagger Site</a> */}
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
      {/* <MusicSelectButton setCurrBackgroundMusicIndex={props.setCurrBackgroundMusicIndex} /> */}
      {gameId<0?<></>:
      <Card style={{display: 'flex', flexDirection: 'row', margin:'0 15%', maxHeight:"280px"}}>
        <Card.Img variant="top" src={cardDict[gameId]['img']} />
          <Card.Body>
            <Card.Title>TAG-ME {cardDict[gameId]['n']}</Card.Title>
            <Card.Text>{cardDict[gameId]['COG']}</Card.Text>
            <Card.Subtitle>{cardDict[gameId]['ins']}</Card.Subtitle>
            <br/>
            <Button disabled={gameStates[cardDict[gameId]['name']]} variant="primary" className={classes.button2} onClick = {(e)=>{
              e.preventDefault();
              if(!gameStates[cardDict[gameId]['name']]){
                setRedirect_ss(true)
              }
              }}>{gameStates[cardDict[gameId]['name']]?"Done":"Play!"}</Button>
          </Card.Body>
      </Card>}
      {redirect_ss ? <Redirect to={`instructions${cardDict[gameId]['name']}`} push /> : <></>}
      {isDone ? <Redirect to={`instruction`} push /> : <></>}
    </div>
  );
}
