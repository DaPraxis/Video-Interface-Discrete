import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ColourButton from './ColourButton';
import {Redirect} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    icon: {
        paddingTop: '12px',
        fontSize: '150px'
    },
    fontFamily: `"Open Sans", sans-serif`,
    fontWeight: '900'
}));

export default function GameSelectButton(props) {
    function RegBt(props) {
        let [redirect, setRedirect] = useState(false);
        return (
            <ColourButton variant="contained"
                          color="primary"
                          disabled={props.disabled}
                          onClick={(e) => {
                              e.preventDefault();
                              localStorage.setItem('ins', props.ins);
                              localStorage.setItem('img', props.img);
                              setRedirect(true);
                          }}>
                <div>
                    {props.type}
                    <br/>
                    <span style={{color: 'black'}}>
                        {props.name}
                    </span>
                    {redirect ? <Redirect to="/instructions" push/> : <></>}
                </div>
            </ColourButton>
        )
    }

    let classes = useStyles();
    if (props.type === 'TAG-ME') {
        // sign to display
        if (props.name === ('')) {
            return (<ColourButton variant="contained" color="primary"/>)
        } else {
            return (
                <RegBt name={props.name}
                       type={props.type}
                       path={"/" + props.name + '/Instruction'}
                       ins={props.ins}
                       img={props.img}
                       disabled={props.disabled}/>
            )
        }
    } else {
        switch (props.name) {
            case 'next':
                return (
                    <ColourButton variant="contained"
                                  color="primary"
                                  disabled={props.disabled}>
                        <div>
                            <ArrowForwardIcon className={classes.icon}
                                              onClick={(e) => {
                                                  e.preventDefault();
                                                  props.nextPage();
                                              }}/>
                        </div>
                    </ColourButton>
                );
            case 'prev':
                return (
                    <ColourButton variant="contained"
                                  color="primary"
                                  disabled={props.disabled}>
                        <div>
                            <ArrowBackIcon className={classes.icon}
                                           onClick={(e) => {
                                               e.preventDefault();
                                               props.prevPage();
                                           }}/>
                        </div>
                    </ColourButton>
                );
            default:
                return (
                    <ColourButton variant="contained"
                                  color="primary"
                                  disabled={props.disabled}/>
                )
        }
    }
}