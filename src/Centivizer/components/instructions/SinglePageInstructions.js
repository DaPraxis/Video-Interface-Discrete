import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import NavBar from "../navigation/NavBar";
import {useTranslation} from "react-i18next";
import InstructionsButton from "./InstructionsButton";
import Grid from "@material-ui/core/Grid";
import {Link, Redirect} from "react-router-dom";

let bg;
let arrow;

if (true) {
    bg = require("../.." + "/assets/bgfield.png");
    arrow = require("../.." + "/assets/icons/arrow-circle-left-solid.svg");
}else{
    bg = "../.." + "/assets/bgfield.png";
    arrow = "../.." + "/assets/icons/arrow-circle-left-solid.svg";
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${bg})`,
        backgroundSize: '100% 100%',
        width: '100%',
        height: '100%',
    },
    frame: {
        width: '60%',
        height: 'auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    whiteBg: {
        backgroundColor: 'rgba(243, 248, 236, 0.95)',
        borderRadius: '20px',
        width: '100%',
        height: '100%',
    },
    padding: {
        padding: '20px'
    },
    instructionsText: {
        top: '10%',
        margin: 'auto',
        textAlign: 'center',
        fontFamily: '"Open Sans", sans-serif',
        fontSize: '25px'
    },
    gameButtonContainer: {
        margin: '5px 0px 0px 0px'
    },
    playButton: {
        backgroundColor: '#5D4157',
        '&:hover': {
            backgroundColor: '#5D4157',
        }
    },
}));

/*
 * Single page instructions screen
 * Has navbar, background, back button, white frame for content, and two buttons - one for trial, one for game
 */
export default function SinglePageInstructions(props) {
    const classes = useStyles();
    const {t} = useTranslation();

    // if not equal to '', will redirect to address
    let [redirectAddress, setRedirectAddress] = useState('');

    // TODO: make buttons redirect to actual trials/games
    return (
        <div className={classes.root}>
            {redirectAddress === '' ? <></> : <Redirect to={redirectAddress} push/>}
            <NavBar/>
            <Link to="/mainmenu">
                <img src={arrow}
                     alt="back arrow"
                     style={{position: 'absolute', left: '25px', top: '100px', width: '50px'}}/>
            </Link>
            <div className={classes.frame}>
                <div className={classes.whiteBg}>
                    <div className={classes.padding}>
                        <p className={classes.instructionsText}>{props.instructionsText}</p>
                        <Grid container
                              spacing={0}
                              direction="row"
                              justify="center"
                              alignItems="center"
                              className={classes.gameButtonContainer}>
                            <InstructionsButton onClick={() => {
                                setRedirectAddress(props.tryItOutAddress)
                            }}>
                                {t('try-it-out')}
                            </InstructionsButton>
                            {/* <InstructionsButton className={classes.playButton}
                                                onClick={() => {
                                                    setRedirectAddress(props.gameAddress)
                                                }}>
                                {t('play-now')}
                            </InstructionsButton> */}
                        </Grid>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}