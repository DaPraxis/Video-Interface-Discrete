import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GameSelectButton from './GameSelectButton'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        // color: theme.palette.text.secondary,
        marginTop: '2%',
        boxShadow: 'none',
        backgroundColor: 'transparent',
    },
}));

export default function FormRow(props) {
    const classes = useStyles();
    if (props.items != null) {
        let buttons = [];
        // make a button for each item given
        let count = 0;
        for (let item of props.items) {
            buttons.push(
                <Paper className={classes.paper}
                       key={count}>
                    <GameSelectButton type={item.type}
                                      name={item.name}
                                      ins={item.ins}
                                      img={item.img}
                                      nextPage={item.nextPage}
                                      prevPage={item.prevPage}
                                      disabled={item.disabled}/>
                </Paper>
            );
            count++;
        }
        return (
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={0}
            >
                {buttons}
            </Grid>
        );
    }
    return (
        <Grid container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={0}
        >
        </Grid>
    )
}