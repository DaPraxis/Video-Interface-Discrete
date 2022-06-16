import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

let scorecoin;

if (true) {
  scorecoin = require("../.." + "/assets/scorecoin.png");
}else{
  scorecoin = "../.." + "/assets/scorecoin.png";
}

const useStyles = makeStyles({
  coins: {
    listStyleType: "none",
    height: "130px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    marginTop: "0px",
    transition: "height 1s, margin-top 1s",
    padding: "0",
  },
});

export default function CoinAnimation(props) {
  const classes = useStyles();

  useEffect(() => {
    const coins = document.getElementById("coins");
    if (props.page === 0) {
      Promise.resolve()
        .then(() => {
          for (let i = 0; i < Math.max(...props.coins); i++) {
            const coin = document.createElement("li");
            const coinimg = document.createElement("img");
            coinimg.src = scorecoin;
            coinimg.style.width = "40px";
            coin.appendChild(coinimg);
            coin.setAttribute("key", i);
            coin.setAttribute("class", "");
            coin.style.zIndex = -1 * i + 150;
            coin.style.marginTop = "-12px";
            coin.style.opacity = "0";
            coin.style.transition = "opacity 1s";
            coins.appendChild(coin);
          }
        })
        .then(() => {
          setTimeout(() => {
            for (
              let i = Math.max(...props.coins) - props.coins[0];
              i < Math.max(...props.coins);
              i++
            ) {
              coins.children[i].style.opacity = "1";
            }
          }, 0);
        })
        .then(() => {
          for (let i = 0; i < Math.max(...props.coins); i++) {
            coins.children[i].style.transitionDelay = 0;
            coins.children[i].style.transition = "opacity 1s";
          }
        })
        .then(() => {
          for (let i = 0; i < Math.max(...props.coins); i++) {
            coins.children[i].style.transitionDelay = "opacity 0s";
          }
        });
    } else {
      if (props.coins[props.page] - props.coins[props.page - 1] > 0) {
        for (
          let i = Math.max(...props.coins) - props.coins[props.page];
          i < Math.max(...props.coins) - props.coins[props.page - 1];
          i++
        ) {
          coins.children[i].style.opacity = "1";
        }
      } else {
        for (
          let i = Math.max(...props.coins) - props.coins[props.page - 1];
          i < Math.max(...props.coins) - props.coins[props.page];
          i++
        ) {
          coins.children[i].style.opacity = "0";
        }
      }
    }
  }, [props.page, props.coins]);

  return <ul id="coins" className={classes.coins}></ul>;
}
