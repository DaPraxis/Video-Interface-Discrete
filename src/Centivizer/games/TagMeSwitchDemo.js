import React, { Component } from "react";
import GameNavBar from "../components/navigation/GameNavBar";
import Hole from "../components/game-manager/Hole";
import MoleState from "../components/game-manager/Objects";
import { Grid, withStyles } from "@material-ui/core";
import GameOver from "../components/dialogs/GameOver";
import Prompt from "../components/dialogs/Prompt";
import OverPrompt from "../components/dialogs/OverPrompt";
import Choices from "../components/dialogs/Choices";
import audio from "../audio";

let bgfield
let lightning;

if (process.env.NODE_ENV === 'development') {
  bgfield = require(".."+"/assets/bgfield.png");
  lightning = require(".."+ "/assets/lightning.gif");
}else{
  bgfield = ".."+"/assets/bgfield.png";
  lightning = ".."+ "/assets/lightning.gif";
}

const styles = {
  bg: {
    textAlign: "center",
    backgroundImage: `url(${bgfield})`,
    backgroundSize: "100% 100%",
    height: "100%",
    width: "100%",
    position: "relative",
  },
  frame: {
    position: "absolute",
    margin: "auto 15%",
    top: "50%",
    transform: "translateY(-55%)",
    width: "70vw",
  },
  lightning: {
    position: "absolute",
    left: "calc(50vw - 95px)",
    top: "30%",
  },
  wrapper: {
    position: "absolute",
    top: "45%",
    left: "55%",
  },
  genPrompt: {
    width: "80%",
    height: "100px",
    backgroundColor: "white",
    margin: "0 auto",
    borderRadius: "10px",
  },
};

const mapping = { t: 0, y: 1, u: 2, g: 0, h: 1, j: 2 };
const trials = [
  [
    {
      moles: ["regular", "orange", "purple"],
      dialogs: {
        after: {
          mole: 0,
          text: "games.TagMeSwitch.demoInsTagMe",
        },
      },
      next: {
        incorrect: 1,
      },
      targets: [0],
    },
    {
      moles: ["regular", "orange", "purple"],
      dialogs: {
        before: {
          mole: 0,
          text: "games.TagMeSwitch.demoInsGreat",
        },
        after: {
          mole: 1,
          text: "games.TagMeSwitch.demoInsTagMe",
        },
      },
      next: {
        correct: 2,
      },
      targets: [1],
    },
    {
      moles: ["regular", "purple", "orange"],
      dialogs: {
        before: {
          mole: 1,
          text: "games.TagMeSwitch.demoInsGood",
        },
        after: {
          mole: -1,
          text: "games.TagMeSwitch.demoInsEither",
        },
      },
      next: {
        correct: 3,
        incorrect: 4,
      },
      targets: [1, 2],
    },
    {
      moles: ["orange", "purple", "regular"],
      dialogs: {
        before: {
          mole: 2,
          text: "games.TagMeSwitch.demoInsRuleOrange",
        },
        after: {
          mole: 0,
          text: "games.TagMeSwitch.demoInsTagOrange",
        },
      },
      next: {
        correct: 8,
      },
      targets: [0],
    },
    {
      moles: ["orange", "purple", "regular"],
      dialogs: {
        before: {
          mole: 1,
          text: "games.TagMeSwitch.demoInsRuleMiddle",
        },
        after: {
          mole: 0,
          text: "games.TagMeSwitch.demoInsTagOrange",
        },
      },
      next: {
        correct: 6,
      },
      targets: [0],
    },
    {
      moles: ["orange", "purple", "regular"],
      dialogs: {},
      next: {
        correct: 6,
        incorrect: 5,
      },
      targets: [0, 1, 2],
    },
    {
      moles: ["regular", "orange", "purple"],
      dialogs: {},
      next: {
        correct: 7,
        incorrect: 5,
      },
      targets: [0, 1, 2],
    },
    {
      moles: ["purple", "orange", "regular"],
      dialogs: {},
      next: {
        correct: 8,
        incorrect: 5,
      },
      targets: [0, 1, 2],
    },
    {
      moles: ["regular", "purple", "orange"],
      dialogs: {},
      next: {
        correct: -1,
        incorrect: 5,
      },
      targets: [0, 1, 2],
    },
  ],
  [
    {
      moles: ["orange", "purple", "regular"],
      dialogs: {
        after: {
          mole: 1,
          text: "games.TagMeSwitch.demoInsTagMe",
        },
      },
      next: {
        incorrect: 1,
      },
      targets: [1],
    },
    {
      moles: ["orange", "purple", "regular"],
      dialogs: {
        before: {
          mole: 1,
          text: "games.TagMeSwitch.demoInsGreat",
        },
        after: {
          mole: 2,
          text: "games.TagMeSwitch.demoInsTagMe",
        },
      },
      next: {
        correct: 2,
      },
      targets: [2],
    },
    {
      moles: ["regular", "purple", "orange"],
      dialogs: {
        before: {
          mole: 2,
          text: "games.TagMeSwitch.demoInsRuleBrown",
        },
        after: {
          mole: -1,
          text: "games.TagMeSwitch.demoInsTagBrown",
        },
      },
      next: {
        correct: 3,
        incorrect: 4,
      },
      targets: [0, 2],
    },
    {
      moles: ["orange", "purple", "regular"],
      dialogs: {
        before: {
          mole: 2,
          text: "games.TagMeSwitch.demoInsRuleRight",
        },
        after: {
          mole: 2,
          text: "games.TagMeSwitch.demoInsTagRight",
        },
      },
      next: {
        correct: 8,
      },
      targets: [2],
    },
    {
      moles: ["orange", "purple", "regular"],
      dialogs: {
        before: {
          mole: 0,
          text: "games.TagMeSwitch.demoInsRuleNotBrown",
        },
        after: {
          mole: 2,
          text: "games.TagMeSwitch.demoInsTagRight",
        },
      },
      next: {
        correct: 6,
      },
      targets: [2],
    },
    {
      moles: ["regular", "orange", "purple"],
      dialogs: {},
      next: {
        correct: 6,
        incorrect: 5,
      },
      targets: [0, 1, 2],
    },
    {
      moles: ["regular", "purple", "orange"],
      dialogs: {},
      next: {
        correct: 7,
        incorrect: 5,
      },
      targets: [0, 1, 2],
    },
    {
      moles: ["purple", "orange", "regular"],
      dialogs: {},
      next: {
        correct: 8,
        incorrect: 5,
      },
      targets: [0, 1, 2],
    },
    {
      moles: ["regular", "purple", "orange"],
      dialogs: {},
      next: {
        correct: -2,
        incorrect: 5,
      },
      targets: [0, 1, 2],
    },
  ],
];

class TagMeSwitchDemo extends Component {
  state = {
    trial: 0,
    count: 0,
    dialog: "after",
    showDialog: false,
    showLightning: false,
    showChoices: false,
    showGameOver: false,
    score: 0,
    moles: [
      new MoleState(0, trials[0][0].moles[0]),
      new MoleState(1, trials[0][0].moles[1]),
      new MoleState(2, trials[0][0].moles[2]),
    ],
    choices: ["brown", "purple", "orange", "left", "middle", "right"],
    rule: "orange",
  };

  getMoles(up) {
    const moles = [
      new MoleState(0, trials[this.state.trial][this.state.count].moles[0]),
      new MoleState(1, trials[this.state.trial][this.state.count].moles[1]),
      new MoleState(2, trials[this.state.trial][this.state.count].moles[2]),
    ];
    if (up) {
      moles[0].up = true;
      moles[1].up = true;
      moles[2].up = true;
    }
    return moles;
  }

  onInteraction(hole) {
    if (
      !trials[this.state.trial][this.state.count].targets.includes(hole.id) ||
      this.state.showDialog
    ) {
      return;
    }

    const rules = [hole.type === "regular" ? "brown" : hole.type];
    if (hole.id === 0) {
      rules.push("left");
    } else if (hole.id === 1) {
      rules.push("middle");
    } else if (hole.id === 2) {
      rules.push("right");
    }

    const state = {
      moles: this.getMoles(true),
      showDialog: true,
    };
    if (rules.includes(this.state.rule)) {
      state.moles[hole.id].mode = "happy";
      state.count = trials[this.state.trial][this.state.count].next.correct;
      state.choices = rules.filter((choice) =>
        this.state.choices.includes(choice)
      );
      state.score = this.state.score + 1;
    } else {
      state.moles[hole.id].mode = "cry";
      state.count = trials[this.state.trial][this.state.count].next.incorrect;
      state.choices = this.state.choices.filter(
        (choice) => !rules.includes(choice)
      );
      state.score = Math.max(this.state.score - 1, 0);
    }

    if (state.count === -1) {
      this.setState({ moles: state.moles, showDialog: false }, () => {
        audio.playSound(audio.rightArpSFX);
        setTimeout(() => {
          this.setState({
            moles: this.getMoles(false),
            showLightning: true,
            choices: ["brown", "purple", "orange", "left", "middle", "right"],
            count: 0,
          });
        }, 500);
      });
    } else if (state.count === -2) {
      this.setState({ moles: state.moles, showDialog: false }, () => {
        audio.playSound(audio.rightArpSFX);
        setTimeout(() => {
          this.setState({
            moles: this.getMoles(false),
            showChoices: false,
            showGameOver: true,
          });
        }, 500);
      });
    } else {
      this.setState(state, () => {
        if (state.moles[hole.id].mode === "happy") {
          audio.playSound(audio.rightArpSFX);
        } else {
          audio.playSound(audio.wrongPitchSFX);
        }
        if (!trials[this.state.trial][this.state.count].dialogs.before) {
          setTimeout(() => {
            this.setState({ moles: this.getMoles(false), showDialog: false });
            setTimeout(() => {
              this.setState({ moles: this.getMoles(true), showDialog: false });
            }, 1000);
          }, 500);
        }
      });
    }
  }

  onClose() {
    const state = { moles: this.getMoles(true) };

    if (this.state.dialog === "before") {
      state.dialog = "after";
      state.showDialog = true;
      this.setState(
        {
          showDialog: false,
          moles: this.getMoles(false),
        },
        () => {
          setTimeout(() => {
            this.setState(state);
          }, 1000);
        }
      );
    } else {
      state.dialog = "before";
      state.showDialog = false;
      this.setState(state);
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        moles: this.getMoles(true),
        showDialog: true,
        showChoices: true,
      });
    }, 3000);
    document.addEventListener(
      "keydown",
      (e) => {
        const key = e.key.toLowerCase();
        if (key in mapping) {
          this.onInteraction(this.state.moles[mapping[key]]);
        }
      },
      false
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.bg}>
        <GameNavBar
          score={this.state.score}
          time={"∞"}
          startGame={() => {}}
          pause={() => {}}
          resume={() => {}}
          gameName={"TAG-ME Switch"}
        />
        <div className={classes.frame}>
          {this.state.showDialog &&
            trials[this.state.trial][this.state.count].dialogs[
              this.state.dialog
            ] &&
            trials[this.state.trial][this.state.count].dialogs[
              this.state.dialog
            ].mole === -1 && (
              <OverPrompt
                text={
                  trials[this.state.trial][this.state.count].dialogs[
                    this.state.dialog
                  ].text
                }
                onClose={this.onClose.bind(this)}
              />
            )}
          <Grid
            item
            container
            direction="row"
            xs={12}
            alignItems="flex-end"
            justify="center"
          >
            {this.state.moles.map((mole) => {
              console.log(mole);
              return (
                <Grid style={{ position: "relative" }} item xs={4}>
                  {this.state.showDialog &&
                    trials[this.state.trial][this.state.count].dialogs[
                      this.state.dialog
                    ] &&
                    trials[this.state.trial][this.state.count].dialogs[
                      this.state.dialog
                    ].mole === mole.id && (
                      <Prompt
                        text={
                          trials[this.state.trial][this.state.count].dialogs[
                            this.state.dialog
                          ].text
                        }
                        onClose={this.onClose.bind(this)}
                        key={`dialog${mole.id}`}
                      />
                    )}
                  <Hole
                    key={`hole${mole.id}`}
                    hole={mole}
                    onInteraction={(mole) => {
                      this.onInteraction(mole);
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
        {this.state.showLightning && (
          <div>
            <img
              className={classes.lightning}
              src={lightning}
              alt="lightning"
            />
            <div className={classes.wrapper}>
              <Prompt
                text={"games.TagMeSwitch.demoInsLightning"}
                onClose={() => {
                  this.setState(
                    {
                      showLightning: false,
                      trial: this.state.trial + 1,
                      rule: "right",
                    },
                    () => {
                      this.onClose.bind(this)();
                    }
                  );
                }}
              />
            </div>
          </div>
        )}
        {this.state.showChoices && <Choices choices={this.state.choices} />}
        {this.state.showGameOver && (
          <GameOver
            score={this.state.score}
            name={"Switch"}
            isPractice={true}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TagMeSwitchDemo);
