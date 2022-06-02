export default class DataHandler {
  gameDataString = "__LOCALGAMEDATA";
  gameDataUsageString = "__GAMEDATAUSAGE";
  gameData;
  //BACKEND_URL = process.env.REACT_APP_BACKEND_URL + "/api/cognitive-centivizer/braintagger";
  //STUDY_ID = "b3d7eed1-46a7-45e7-ac23-8fc9fe102fa8";

  constructor() {
    this.gameData = null;
    let array = localStorage.getItem(this.gameDataUsageString);
    if (!array) {
      localStorage.setItem(this.gameDataUsageString, [].toString());
    }
  }

  logGameStart(game, startTime, gameSpecificData, language, isPractice) {
    this.gameData = {
      name: game.dataName,
      numHoles: game.numHoles,
      numRows: game.numRows,
      moleDuration: game.moleDuration,
      moleInterval: game.moleInterval,
      cryDuration: game.cryDuration,
      holeLayout: game.holeLayout,
      startTime: startTime,
      trials: [],
      interactions: [],
      missed: [],
      finalScore: null,
      endTime: null,
      language: language,
      participant: localStorage.getItem("participant"),
      session: localStorage.getItem("session"),
      ...gameSpecificData,
      isPractice,
    };
  }

  logTrial(
    trialNum,
    startTime,
    holes,
    hole,
    interactionType,
    scoreChange,
    reactionTime,
    gameSpecificData
  ) {
    let holeIds = [];
    let moleTypes = [];

    for (let hole of holes) {
      holeIds.push(hole.id);
      moleTypes.push(hole.type);
    }

    this.gameData.trials.push({
      trialNum: trialNum,
      startTime: startTime,
      holeIds: holeIds.join(),
      moleTypes: moleTypes.join(),
      holeId: hole.id,
      reactionTime: reactionTime,
      moleType: hole.type,
      interactionType: interactionType,
      scoreChange: scoreChange,
      ...gameSpecificData,
    });
  }

  logInteraction(
    trialNum,
    time,
    hole,
    interactionType,
    scoreChange,
    reactionTime
  ) {
    this.gameData.interactions.push({
      trialNum: trialNum,
      time: time,
      holeId: hole.id,
      reactionTime: reactionTime,
      moleType: hole.type,
      interactionType: interactionType,
      scoreChange: scoreChange,
    });
  }

  logMiss(trialNum, time, interactionType, scoreChange) {
    this.gameData.missed.push({
      trialNum: trialNum,
      time: time,
      interactionType: interactionType,
      scoreChange: scoreChange,
    });
  }

  logGameEnd(endTime, finalScore) {
    this.gameData.finalScore = finalScore;
    this.gameData.endTime = endTime;
  }

  logSurveyAnswers(survey){
    this.gameData.survey = survey.a1;
  }

  saveGameDataLocally() {
    if (!this.gameData.isPractice && !this.gameData.survey) return;
    console.log(this.gameData);
    if (this.gameData) {
      const index = this.findEmptyGameDataStorage();
      localStorage.setItem(
        this.gameDataString + index.toString(),
        JSON.stringify(this.gameData)
      );
      this.gameData = null;
    }
  }

  findEmptyGameDataStorage() {
    //finds empty spot in local storage and then marks it for use
    let gameDataArray = localStorage
      .getItem(this.gameDataUsageString)
      .split(",");

    //array is empty
    if (gameDataArray.length === 0) {
      gameDataArray.push(true);
      localStorage.setItem(this.gameDataUsageString, gameDataArray.toString());
      return 0;
    }

    //array has an open spot
    for (let i in gameDataArray) {
      if (!gameDataArray[i]) {
        gameDataArray[i] = true;
        localStorage.setItem(
          this.gameDataUsageString,
          gameDataArray.toString()
        );
        return i;
      }
    }

    //array is full
    gameDataArray.push(true);
    localStorage.setItem(this.gameDataUsageString, gameDataArray.toString());
    return gameDataArray.length - 1;
  }

  getGameState(gameNames){
    if(true){
      // Template from Develop branch, display Only, Again, and Bigger
      return {"data":`{"participantNumber":"1241234234","TagMeQuick600":0,"TagMeQuick800":0,"TagMeWhere700":0,"TagMeWhere800":0,"TagMeBigger800":0,"TagMeBigger1000":0,"TagMeAgainEasyOne":0,"TagMeAgainMediumOne":0,"TagMeAgainHardOne":0,"TagMeAgainEasyTwo":0,"TagMeAgainMediumTwo":0,"TagMeAgainHardTwo":0,"TagMeQuick":1,"TagMeOnly":1,"TagMeAgainEasy":1,"TagMeAgainMedium":1,"TagMeAgainHard":1,"TagMeSwitch":1,"TagMeWhere":1,"TagMeSame":1,"TagMeBigger":1,"order":"[\\"TagMeQuick\\",\\"TagMeWhere\\",\\"TagMeOnly\\",\\"TagMeAgainEasy\\",\\"TagMeBigger\\",\\"TagMeSwitch\\"]"}`}}
    else{
      let data = {
        participant: localStorage.getItem('participant'),
        // session: localStorage.getItem('session'),
        studyId: this.STUDY_ID,
        games: gameNames
      }
      return fetch(this.BACKEND_URL + '/participant', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }).then((res) => {
        if (res.ok) {
          return res.json()
        }
        return res.json()
      })
    }
  }

  sendLocalData(i = 0) {
    let gameDataArray = localStorage
      .getItem(this.gameDataUsageString)
      .split(",");

    /*if (i >= gameDataArray.length) {
      return;
    } else if (gameDataArray[i] !== "false") {
      let object = localStorage.getItem(this.gameDataString + i.toString());
      object = JSON.parse(object);
      object.blockNum = 0;
      object.orderNum = 0;
      object.studyId = this.STUDY_ID;
      object = JSON.stringify(object);
      console.log(object);
      fetch(this.BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: object,
      })
        .then((res) => {
          if (res.ok) {
            gameDataArray[i] = false;
            localStorage.setItem(
              this.gameDataUsageString,
              gameDataArray.toString()
            );
            console.log(`sent item ${this.gameDataString + i.toString()}`);
          }
          this.sendLocalData(i + 1);
        })
        .catch(() => {
          console.log("bad connection");
        });
    } else {
      this.sendLocalData(i + 1);
    }*/
  }

  printLocalData() {
    let gameDataArray = localStorage
      .getItem(this.gameDataUsageString)
      .split(",");
    let arr = []
    for (let i in gameDataArray) {
      if (gameDataArray[i]) {
        let object = localStorage.getItem(this.gameDataString + i.toString());
        object = JSON.parse(object);
        arr.push(object)
        console.log(object);
      }
    }
    return arr
  }
}
