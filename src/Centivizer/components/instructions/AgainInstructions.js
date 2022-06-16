import SinglePageInstructions from "./SinglePageInstructions";
import React from "react";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

let correct;
let incorrect;

if (true) {
    correct = require("../.."+ "/assets/instructions/again_instructions_correct.png");
    incorrect = require("../.."+ "/assets/instructions/again_instructions_incorrect.png");
}else{
    correct = "../.."+ "/assets/instructions/again_instructions_correct.png";
    incorrect = "../.."+ "/assets/instructions/again_instructions_incorrect.png";
}

const useStyles = makeStyles((theme) => ({
    img: {
        width: '250px'
    },
    imgContainer: {
        position: "relative",
        padding: '10px 0px'
    },
}));

export default function AgainInstructions(props) {
    const classes = useStyles();
    const {t} = useTranslation();

    return (
        <SinglePageInstructions instructionsText={t('games.TagMeAgain.ins')}
                                gameAddress={props.gameAddress}>
            <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                <Grid item container xs={6} justify="center" alignItems="center">
                    <div className={classes.imgContainer}>
                        <img src={correct} className={classes.img} alt="correct"/>
                    </div>
                </Grid>
                <Grid item container xs={6} justify="center" alignItems="center">
                    <div className={classes.imgContainer}>
                        <img src={incorrect} className={classes.img} alt="incorrect"/>
                    </div>
                </Grid>
            </Grid>
        </SinglePageInstructions>
    );
}