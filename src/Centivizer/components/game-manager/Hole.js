import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import assets from "../../assets/assets.js";

const useStyles = makeStyles({
  hole: {
    height: "38vh",
  },
});

function OverlayGrid(props) {
  return (
    <div className={'OverlayGrid'} style={{ position: "relative", display: "grid" }}>
      {props.children}
    </div>
  )
}

export default function Hole(props) {
  const hole = props.hole;
  const classes = useStyles();
  //console.log(hole.jerseyNumber);
  
  let holeImg = <img
    className={classes.hole}
    src={hole.up ? assets[hole.type][hole.mode] : assets.hole}
    onClick={() => props.onInteraction(hole)}
    alt="mole"
    style={{position: "relative", zIndex: '1'}}
  />;

  if (hole.jerseyNumber) {

    let numberImg = <img
      className={classes.hole}
      src={hole.up ? assets['number'][hole.jerseyNumber] : assets.hole}
      onClick={() => props.onInteraction(hole)}
      alt="number"
      style={{position: "relative", zIndex: '2'}}
    />;

    return (
      <OverlayGrid>
        <div style={{ "gridColumn": "1", "gridRow": "1" }}>
          {holeImg}
        </div>
        <div style={{ "gridColumn": "1", "gridRow": "1" }}>
          {numberImg}
        </div>
        {hole.overlay}
      </OverlayGrid>
    );
  } else {
    return (
      <div style={{ position: "relative" }}>
        {holeImg}
        {hole.overlay}
      </div>
    )
  }

}