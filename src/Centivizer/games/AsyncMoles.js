export default {
  Game: {
    cryTime: 450,
    curMole: 0,

    chooseMoles: () => {
      return [1];
    },

    chooseHoles: (curHoles) => {
      let usedHoles = [];
      let finalHole;
      for (const hole of curHoles) {
        if (hole.value === 1) {
          usedHoles.push(hole.id);
        }
      }
      do {
        finalHole = [Math.floor(Math.random() * 6)];
      } while (usedHoles.includes(finalHole));
      return finalHole;
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

    getPostTrialState: (id, value, state, trial) => {
      let obj = {};
      let innerObj = { id: id, value: 0, variant: "hole" };
      obj[`hole${id}`] = innerObj;
      return obj;
    },

    decideEndTrial: (id, value, state) => {
      return value === 0 ? false : true;
    },
  },
};
