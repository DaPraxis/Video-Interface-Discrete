import React from 'react';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  wrapper: {
    position: 'absolute',
    right: 0,
    top: 80,
    width: '20vw',
    height: 80,
    border: 'none'
  }
})


const UserIdFrame = ({ source }) => {
  const classes = useStyles();

  return (
    <iframe className={classes.wrapper} src={source} name="User ID">
    </iframe>
  )
};

export default UserIdFrame;