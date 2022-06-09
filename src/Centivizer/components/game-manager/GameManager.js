import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import i18n from "../../data/languages/i18n";

import MoleState from "./Objects";
import Hole from "./Hole";
import Window from "./Window";
import GameNavBar from "../navigation/GameNavBar";
import Countdown from "./Countdown";
import DialogManager from "../dialogs/DialogManager";
import createGame from "./GameFactory";

import audio from "../../audio";

let hand;
let one;
let two;
let three;

if (process.env.NODE_ENV === 'development') {
  hand = require("../.." + "/assets/hand.png");
  one = require("../.." + "/assets/count/count_1.png");
  two = require("../.." + "/assets/count/count_2.png");
  three = require("../.." + "/assets/count/count_3.png");
}else{
  hand = "../.." + "/assets/hand.png";
  one = "../.." + "/assets/count/count_1.png";
  two = "../.." + "/assets/count/count_2.png";
  three = "../.." + "/assets/count/count_3.png";
}

// development mode (for debugging)
const DEV = false;

const PRELOAD = [];

const styles = {
  frame: {
    position: "absolute",
    margin: "auto 10%",
    top: "50%",
    transform: "translateY(-50%)",
    width: "80vw",
  },
  background: {
    textAlign: "center",
    backgroundSize: "100% 100%",
    height: "100%",
    width: "100%",
  },
  overlay: { position: "absolute", height: "75%", width: "100%" },
  smallScore: {
    position: "absolute",
    left: "80%",
    transform: "translateX(-50%) rotate(-20deg)",
    top: "5%",
    fontSize: "10vh",
    fontWeight: "bold",
    zIndex: "1000",
  },
  bigScore: {
    position: "absolute",
    top: "68%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-20deg)",
    fontSize: "0",
    fontWeight: "bold",
    zIndex: "1000",
  },
  red: { color: "#d10000" },
  hand: {
    position: "absolute",
    left: "65%",
    transform: "translateX(-50%) rotate(-20deg)",
    top: "60%",
    height: "8vh",
  },
};

class GameManager extends Component {
  constructor(props) {
    super(props);
    this.currentTrials = {};
    this.isInteractable = {};
    this.isPaused = false;
    this.lastPause = -1;
    this.pauseTimes = [];
    this.buttonSchemas = {};
    this.dialogQueue = [];
    this.endTrialTimeout = null;
    this.moles = null;
    this.falseAlarm=0;

    // create game object
    // console.log(this.props)
    this.config = this.props.isPractice
      ? this.props.config.practice
      : this.props.config.game;
    this.game = createGame(this.props.name, this.config, this.props.isPractice);
    this.surveyOrder = [];
    this.preload();
  }

  state = {
    isRunning: false,
    isOver: false,
    score: 0,
    overlay: null,
    holes: {},
    dialog: null,
    count: 0,
    error: -1,
    survey:{
      step: 0,
      a1: '',
    },
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.background} style={this.game.style.background}>
        <GameNavBar
          score={this.state.score}
          time={this.game.timeoutManager.time}
          pause={this.pause.bind(this)}
          resume={this.resume.bind(this)}
          gameName={this.game.name}
          isPaused={this.isPaused}
        />
        <div className={classes.overlay}>{this.state.overlay}</div>
        <div className={classes.frame} style={this.game.style.frame}>
          <Grid container alignItems="center" justify="center">
            {Object.keys(this.state.holes).length === this.game.numHoles &&
              this.game.holeLayout.map((row) => (
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  key={`row${row[0]}`}
                  alignItems="flex-end"
                  justify="center"
                  spacing={3}
                  style={{ position: "relative" }}
                >
                  {row.map((i) => {
                    return (
                      <Grid key={`grid${i}`} item xs={4}>
                        {/* maybe there's a better way to do this... */}
                        {/Mood\w*/.test(this.props.name) ? (
                          <Window
                            key={`window${i}`}
                            hole={this.getHole(i)}
                            onInteraction={(hole) => {
                              this.onInteraction({ ...hole });
                            }}
                          />
                        ) : (
                          <Hole
                            key={`hole${i}`}
                            hole={this.getHole(i)}
                            onInteraction={(hole) => {
                              this.onInteraction({ ...hole });
                            }}
                          />
                        )}
                      </Grid>
                    );
                  })}
                </Grid>
              ))}
          </Grid>
        </div>
        {this.state.count > 0 && <Countdown count={this.state.count} />}
        {this.state.dialog && (
          <DialogManager
            dialog={this.state.dialog}
            game={this.game}
            name={this.props.name}
            score={this.state.score}
            setScore={this.setScore.bind(this)}
            survey={this.state.survey}
            setSurvey={this.setSurvey.bind(this)}
            nextSurveyPage={this.nextSurveyPage.bind(this)}
            prevSurveyPage={this.prevSurveyPage.bind(this)}
            shuffleQuestionnaire={this.shuffleQuestionnaire.bind(this)}
            surveyOrder={this.surveyOrder}
            endSurvey={this.endSurvey.bind(this)}
              onClose={() => {
              const isEmpty = this.dialogQueue.length === 0;
              this.hideDialog();
              if (!this.state.isRunning && !this.state.isOver && isEmpty) {
                // count down at start of game
                this.countDown(3);
              }
            }}
          />
        )}
      </div>
    );
  }

  preload() {
    for (let i = 0; i < 3; i++) {
      PRELOAD.push(new Image());
    }
    PRELOAD[0].src = one;
    PRELOAD[1].src = two;
    PRELOAD[2].src = three;
  }

  enableInteraction() {
    for (let i = 0; i < this.game.numHoles; i++) {
      if (this.game.interactableHoles.includes(i)) {
        this.isInteractable[i] = true;
      }
    }
  }

  disableInteraction() {
    for (let i = 0; i < this.game.numHoles; i++) {
      this.isInteractable[i] = false;
    }
  }

  /*
   *  Handles interactions from the user
   */
  onInteraction(hole) {
    if (
      this.period === "trial" &&
      !this.isPaused &&
      this.isInteractable[hole.id]
    ) {
      const [reaction, score, response] = this.getScore(hole);
      this.setScore(Math.max(this.state.score + score, 0));

      var reactionTime =
        Date.now() - this.getHoles().find((hole) => hole.up).upTime;

      for (const pauseT of this.pauseTimes) {
        console.log(pauseT);
        reactionTime -= pauseT;
      }

      if (true) {
        this.logData(hole, response, score, reactionTime);
      }

      if (reaction === "happy") {
        if (hole.up) {
          hole.mode = "happy";
        }
        audio.playSound(audio.rightArpSFX);
      } else if (reaction === "sad") {
        if (hole.up) {
          hole.mode = "cry";
        }
        audio.playSound(audio.wrongPitchSFX);
      }

      const { classes } = this.props;
      const indicator = <img className={classes.hand} src={hand} alt="" />;
      if (this.game.showPoints && score > 0) {
        hole.overlay = (
          <>
            <div
              className={classes.smallScore}
              style={this.game.style.smallScore}
            >
              +{score}
            </div>
            {/* {indicator} */}
          </>
        );
      } else if (this.game.showPoints && score < 0) {
        hole.overlay = (
          <>
            <div
              className={`${classes.smallScore} ${classes.red}`}
              style={this.game.style.smallScore}
            >
              {score}
            </div>
            {/* {indicator} */}
          </>
        );
      } else {
        // hole.overlay = indicator;
      }

      if (hole.up) {
        // hit non-empty hole
        this.disableInteraction();
        this.setHole(hole, () => {
          this.endTrialTimeout.pause();
          this.game.timeoutManager.setTimeout(() => {
            hole.mode = "normal";
            hole.overlay = null;
            this.setHole(hole);
            if (this.dialogQueue.length > 0) {
              this.showDialog();
            } else {
              this.endTrialTimeout.resume();
            }
            if (this.game.decideEndTrial(hole)) {
              this.game.timeoutManager.remove(this.endTrialTimeout);
              this.endTrial();
            }
            this.enableInteraction();
          }, this.game.cryDuration);
        });
      } else {
        // hit empty hole
        if (this.dialogQueue.length > 0) {
          this.showDialog();
        }
        if (this.game.adjust) {
          // disqualify current trial and adjust target trials
          this.game.adjustTrials();
        }
        // If bad hit, also need to end the game.
        if (this.game.decideEndTrial(hole)) {
          this.game.timeoutManager.remove(this.endTrialTimeout);
          this.endTrial();
        }
      }
    }
  }

  /*
   * Handles key presses from the user
   */
  onKeyDown = (e) => {
    const key = e.key.toLowerCase();
    if (key in this.buttonSchemas) {
      this.onInteraction(this.getHole(this.buttonSchemas[key]));
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
    this.initState();
    this.initButtonSchemas();
    this.dialogQueue.push(...this.game.showDialog()); // show dialog due to game instructions, i.e. NOT due to player interaction
    if (this.dialogQueue.length > 0) {
      this.showDialog();
    } else {
      this.countDown(3);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
    this.game.timeoutManager.removeAll();
  }

  /*
   *  Initalizes trial and state array, and creates the proper amount of mole states
   */
  initState() {
    const moles = [];
    for (let i = 0; i < this.game.numHoles; i++) {
      moles.push(new MoleState(i));
      this.currentTrials[i] = -1;
    }
    this.setHoles(moles);
  }

  /*
   *  Allows onKeyDown to receive signals from specified buttons
   */
  initButtonSchemas() {
    for (let schema of this.props.version.buttonSchemas) {
      schema = schema.map((button) => button.toLowerCase());
      // UIOJKL
      // For two holes game
      if (this.game.numHoles === 2) {
        // For two holes game, we want JK
        this.buttonSchemas[schema[3]] = 0;
        // this.buttonSchemas[schema[3]] = 0;
        this.buttonSchemas[schema[4]] = 1;
        // this.buttonSchemas[schema[5]] = 1;
      } else if (this.game.numHoles === 3) {
        // For three holes game, we want JKL
        this.buttonSchemas[schema[3]] = 0;
        // this.buttonSchemas[schema[3]] = 0;
        this.buttonSchemas[schema[4]] = 1;
        // this.buttonSchemas[schema[4]] = 1;
        this.buttonSchemas[schema[5]] = 2;
        // this.buttonSchemas[schema[5]] = 2;
      } else if (this.game.numHoles === 6) {
        // Use all the keyboard mappings
        for (let i = 0; i < 6; i++) {
          this.buttonSchemas[schema[i]] = i;
        }
      }
    }
    if (
      this.props.name === "AgainEasyOne" ||
      this.props.name === "AgainMediumOne" ||
      this.props.name === "AgainHardOne"
    ) {
      this.buttonSchemas[" "] = 0; // Handle space
    }
  }

  resetPauseTimes() {
    this.lastPause = -1;
    this.pauseTimes = [];
  }

  pause() {
    this.lastPause = Date.now();
    this.isPaused = true;
    this.game.timeoutManager.pause();
  }

  resume() {
    const holes = this.getHoles();
    var upTime = -1;
    for (const hole of holes) {
      if (hole.up) {
        upTime = hole.upTime;
      }
    }
    const pauseTime = Date.now() - Math.max(this.lastPause, upTime);
    this.pauseTimes.push(pauseTime);
    this.lastPause = -1;
    this.isPaused = false;
    this.game.timeoutManager.resume();
  }

  countDown(s) {
    this.disableInteraction();
    this.setState({ count: s });
    if (s === 0) {
      this.startGame();
    } else {
      setTimeout(() => {
        this.countDown(s - 1);
      }, 1000);
    }
  }

  /*
   *  Gets the ith value in holes
   */
  getHole(i) {
    return { ...this.state.holes[`hole${i}`] };
  }

  /*
   *  Returns a copy of the MoleStates kept in state
   */
  getHoles() {
    const holes = [];
    for (let i = 0; i < this.game.numHoles; i++) {
      holes.push({ ...this.state.holes[`hole${i}`] });
    }
    return holes;
  }

  /*
   * Formats a single Molestate object to be used in a call to setState
   */
  setHole(mole, callback) {
    return this.setHoles([mole], callback);
  }

  /*
   * Formats an array of MoleState objects to be used in a call to setState.
   */
  setHoles(moles, callback) {
    const holes = { ...this.state.holes };
    for (const mole of moles) {
      holes[`hole${mole.id}`] = mole;
    }
    this.setState({ holes: holes }, callback);
  }

  /*
   * Returns the change in score due to the current interaction
   */
  getScore(hole) {
    const [reaction, score, dialog, response] = this.game.score(
      this.getHoles(),
      hole,
      Date.now()
    );

    if (dialog && this.props.isPractice) {
      // if (this.game.name != 'TAG-ME Quick' && dialog != 4)
      this.dialogQueue.push(dialog); // show dialog due to player interaction, i.e. NOT due to game instructions
    }

    if(response==="false alarm"){
      this.falseAlarm=1;
    }
    else{
      this.falseAlarm=0;
    }

    return [reaction, score, response];
  }

  setScore(score, callback) {
    this.setState({ score: score }, callback);
  }

  showDialog() {
    this.pause();
    this.setState({ dialog: this.dialogQueue.shift() });
  }

  hideDialog() {
    if (this.dialogQueue.length > 0) {
      this.showDialog();
    } else {
      this.resume();
      this.setState({ dialog: null });
    }
  }

  /*
   * Starts the current game
   */
  startGame() {
    this.setState({ isRunning: true });
    if (true) {
      this.props.dataHandler.logGameStart(
        this.game,
        Date.now(),
        this.game.getGameSpecificData(),
        // null,
        i18n.language,
        this.props.isPractice
      );
    }
    this.game.endGame().then(() => {
      if (this.game.totalSeconds) {
        this.game.timesUp = true;
      }
      this.endTrial();
      this.endGame();
    });

    if (this.game.startPoint === "trial") {
      this.startTrial();
    } else if (this.game.startPoint === "interstimulus") {
      this.startInterstimulus();
    }
  }

  /*
   * Asynchronously ends the current game
   */
  endGame() {
    this.disableInteraction();
    this.setState({ isRunning: false, isOver: true });
    this.game.timeoutManager.isRunning = false;
    this.game.timeoutManager.removeAll();
    this.props.dataHandler.logGameEnd(Date.now(), this.state.score);
    this.props.dataHandler.saveGameDataLocally();

    //Also send practice data to backend
    if(this.props.isPractice){
      // this.props.dataHandler.saveGameDataLocally();
      // if (DEV) {
      console.log("print!");
      this.props.dataHandler.printLocalData();
      // }
      console.log("print!");
      this.props.dataHandler.sendLocalData();
    }
    console.log('Game Over, data saved')
  }

  /*
   * Starts the current trial
   */
  startTrial() {
    this.enableInteraction();
    this.period = "trial";

    // clear the pause times in the previous trial
    if (!this.isPaused) {
      this.resetPauseTimes();
    }

    const moles = this.game.chooseHoles(this.getHoles());
    if (moles.length === 0) return;

    for (let i = 0; i < moles.length; i++) {
      this.currentTrials[moles[i].id] = this.game.currentTrial;
    }

    for (const mole of moles) {
      mole.up = true;
      mole.upTime = Date.now();
    }

    this.setHoles(moles);
    this.moles = moles;

    if (this.game.moleDuration > 0) { // finite duration
      this.endTrialTimeout = this.game.timeoutManager.setTimeout(() => {
        this.endTrial();
      }, this.game.moleDuration);
    } else { // infinite duration
      if (this.config.mode == 0) { // time based game
        this.endTrialTimeout = this.game.timeoutManager.setTimeout(() => {
          this.endTrial();
        }, this.game.totalSeconds * 1000);
      } else { // trial based game
        this.endTrialTimeout = this.game.timeoutManager.setTimeout(() => {
        }, 0);
      }
    }
  }

  /*
   * Ends the trial
   */
  endTrial() {
    const moles = [];
    const holes = this.getHoles();
    for (const hole of holes) {
      if (this.currentTrials[hole.id] === this.game.currentTrial) {
        // hole contains mole
        this.currentTrials[hole.id] = -1;
        moles.push(hole);
      }
    }

    if (moles.length > 0) {
      // If hit or bad hit occurs, don't need to logData, as the data is already logged in the onInteraction().
      if (!this.game.hasHit && !this.game.hasHitEmpty) {
        const [, score, response] = this.getScore(null);
        this.setScore(Math.max(this.state.score + score, 0));

        const { classes } = this.props;
        let overlay;
        if (this.game.showPoints && score > 0) {
          overlay = (
            <div className={classes.bigScore} style={this.game.style.bigScore}>
              +{score}
            </div>
          );
        } else if (this.game.showPoints && score < 0) {
          overlay = (
            <div
              className={`${classes.bigScore} ${classes.red}`}
              style={this.game.style.bigScore}
            >
              {score}
            </div>
          );
        }
        this.setState({ overlay: overlay }, () => {
          this.game.timeoutManager.setTimeout(() => {
            this.setState({ overlay: null });
          }, this.game.cryDuration);
        });

        // No miss for time based games tag me switch and tag me bigger
        if (!(this.game.name=="TAG-ME Switch" || this.game.name=="TAG-ME Bigger")) {
          this.logData(-1, response, score, -1);
        }
      }

      for (const mole of moles) {
        mole.up = false;
        mole.overlay = null;
      }

      this.setHoles(moles, () => {
        this.startInterstimulus();
      });

      this.dialogQueue.push(...this.game.showDialog()); // show dialog due to game instructions, i.e. NOT due to player interaction
      if (this.game.currentTrial === this.game.totalTrials || (this.game.totalSeconds && this.game.timesUp)) {
        this.setState({ overlay: null });
        console.log("Game Over due to totalTrials achieved.");
        this.dialogQueue.push("game-over");
      }

      if (!this.isPaused && this.dialogQueue.length > 0) {
        // not already showing dialog
        this.showDialog();
      }
    }

    // End the time based game when times up.
    if (this.game.totalSeconds && this.game.timesUp) {
      this.dialogQueue.push(...this.game.showDialog()); // show dialog due to game instructions, i.e. NOT due to player interaction
      if (this.game.currentTrial === this.game.totalTrials || (this.game.totalSeconds && this.game.timesUp)) {
        this.setState({ overlay: null });
        this.endGame()
        console.log("Game Over due to times up");
        this.dialogQueue.push("game-over");
      }

      if (!this.isPaused && this.dialogQueue.length > 0) {
        // not already showing dialog
        this.showDialog();
      }
    }
  }

  /*
   * Waits for the game class to resolve its promise to start the next trial
   */
  startInterstimulus() {
    this.disableInteraction();
    this.period = "interstimulus";
    this.game
      .interStimulusEvent(
        (newState, callback) => {
          this.setState({ overlay: newState }, callback);
        },
        this.getHoles(),
        (newMoles, callback) => {
          this.setHoles(newMoles, callback);
        }
      )
      .then(() => {
        this.startTrial();
      });
  }

  logData(hole, response, score, reactionTime) {
    if (DEV) {
      // for debugging purposes
      console.log({
        currentTrial: this.game.currentTrial,
        totalTrials: this.game.totalTrials,
        reactionTime: reactionTime,
        hole: hole,
        ...this.game.getTrialSpecificData(),
      });
    }

    this.props.dataHandler.logTrial(
      this.game.currentTrial,
      Date.now(),
      this.moles,
      hole,
      response,
      score,
      reactionTime,
      this.game.getTrialSpecificData()
    );
  }

  // Function to randomize survey question order
  shuffleQuestionnaire(){

    var q = [1];
    var j = q.length;
    var page = []

    while(j>0){

        var i = Math.floor(Math.random() * j);

        var n = q[i];

        var index = q.indexOf(n);
        q.splice(index, 1);
        j = q.length;

        page.push(n);

        if(j%4==0){
            this.surveyOrder.push(page);
            page = [];
        }
    }
  };

  //Function to set state of survey
  setSurvey = input => e =>{
    var survey = { ...this.state.survey };
    survey[`${input}`] = e.target.value;
    this.setState({ survey: survey });
  }

  //Function to go to the next survey page
  nextSurveyPage(){
    var survey = { ...this.state.survey };
    survey['step'] = survey['step'] + 1;
    this.setState({ survey: survey });
  }

  //Function to go to the previous survey page
  prevSurveyPage(){
    var survey = { ...this.state.survey };
    survey['step'] = survey['step'] - 1;
    this.setState({ survey: survey });
  }

  endSurvey(){
    this.props.dataHandler.logSurveyAnswers(this.state.survey);
    this.props.dataHandler.saveGameDataLocally();
    this.props.dataHandler.printLocalData();
    this.props.dataHandler.sendLocalData();
  }

}

export default withStyles(styles, { withTheme: true })(GameManager);