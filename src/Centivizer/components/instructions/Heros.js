import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NavBarIns from '../navigation/NavBarIns'
import InstructionsButton from './InstructionsButton';
import {makeStyles} from '@material-ui/core/styles';

let bg;

if (true) {
    bg = require(process.env.REACT_APP_MY_URL + "/assets/bgfield.png");
}else{
    bg = process.env.REACT_APP_MY_URL + "/assets/bg.png";
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundImage: `url(${bg})`,
        width: '100%',
        height: '100%'
    },
    paper: {
        padding: '40px 50px 20px 50px',
        borderRadius: '20px',
        textAlign: 'center',
        // color: theme.palette.text.secondary,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        fontSize: '25px',
        fontWeight: '100',
        lineHeight: '41px',
        marginTop: '5%',
        marginLeft: '20%',
        marginRight: '20%',
        width: '900px',
    },
    img: {
        alignItems: 'center',
        // width: '100%',
        height: '100%'
    },
    imgs: {
        backgroundColor: 'transparent',
        boxShadow: 'None',
        // width: '138px',
        height: '159px',
        // margin: '0px 80px 0px 0px',
        textAlign: 'center',
        margin: '0 auto'
    }
}));

export default function Heros(props) {
    const classes = useStyles();
    let imgs = [];
    let imgTop = [];
    const im = props.imgs.split(',');
    if (props.imgs) {
        if (im.length > 1) {
            for (let i = 0; i < im.length; i++) {
                console.log(im[i]);
                imgs.push(
                    <Grid item xs={12 / im.length} justify="center" alignItems="center">
                        <Paper className={classes.imgs}>
                            <img src={require(`../../assets/${im[i]}`)} className={classes.img}/>
                        </Paper>
                    </Grid>
                )
            }
        } else {
            imgTop.push(require(`../../assets/${im[0]}`))
        }
    }


    return (
        <div className={classes.root}>
            <NavBarIns/>
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={0}
            >
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid xs>
                            <span>
                                {props.ins}
                            </span>
                        </Grid>
                        <div>
                            <img src={imgTop[0]} style={{width: '100%', marginTop: '20px'}}/>
                        </div>
                        <Grid xs style={{textAlign: 'center'}}>
                            <InstructionsButton>Start Game</InstructionsButton>
                        </Grid>
                        <Grid container spacing={4}
                              direction="row"
                              justify="center"
                              alignItems="center">
                            {imgs}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}