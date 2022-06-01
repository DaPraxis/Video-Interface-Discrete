export default {
  Game: {
    cryTime: 450,
    numHoles: 6,
    numRows: 2,
    holeLayout: [
      [0, 1, 2],
      [3, 4, 5],
    ],

    chooseMoles: () => {
      return [1];
    },

    chooseHoles: () => {
      return [Math.floor(Math.random() * 6)];
    },

    interStimulusEvent: () => {
      // must return promise
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    },

    autoEndTrial: (trials) => {
      // must return promise
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(trials);
        }, 2000);
      });
    },

    scoreFunction: (id, value) => {
      return value;
    },

    getPostTrialState: (id, value, state) => {
      return state.map((object) => {
        object.value = 0;
        object.variant = "hole";
        return object;
      });
    },

    decideEndTrial: (id, value, state) => {
      return value === 0 ? false : true;
    },
  },
};
