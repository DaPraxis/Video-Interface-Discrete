import React from "react";
import { makeStyles } from "@material-ui/core/styles";

let one;
let two;
let three;


if (process.env.NODE_ENV === 'development') {
  one = require("../.." + "/assets/count/count_1.png");
  two = require("../.." + "/assets/count/count_2.png");
  three = require("../.." + "/assets/count/count_3.png");
}else{
  one = "../.." + "/assets/count/count_1.png";
  two = "../.." + "/assets/count/count_2.png";
  three = "../.." + "/assets/count/count_3.png";
}

// one = require('../../assets/count/count_1.png')
// two = require('../../assets/count/count_2.png')
// three = require('../../assets/count/count_3.png')


const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    textAlign: "center",
    zIndex: 998,
    backgroundColor: "#FFFFFF88",
  },
  number: {
    width: "50%",
    marginTop: "25vh",
    zIndex: 999,
  },
}));

const NUMBERS = {
  1: one,
  2: two,
  3: three,
};

export default function Countdown(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img
        src={NUMBERS[props.count]}
        alt={props.count}
        className={classes.number}
      />
    </div>
  );
}