import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import QueueMusicSharpIcon from '@material-ui/icons/QueueMusicSharp';
import {
  Menu,
  MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  musicMenuButton: {
    fontSize: '100px',
    border: '3px solid #17a2b8',
    borderRadius: '15px',
    backgroundColor: 'whitesmoke',
    color: '#17a2b8',
    fontWeight: 'bold',
    margin: '0px 30px',
    '&:hover': {
      borderColor: '#17a2b8',
      backgroundColor: ' #17a2b8',
      color: 'whitesmoke'
    }
  },
  musicMenuButtonWrapper: {
    position: "absolute",
    bottom: "5%"
  },
  musicMenuItem: {
    width: "200px",
    '&:hover': {
      borderColor: '#17a2b8',
      backgroundColor: ' #17a2b8',
      color: 'whitesmoke'
    },
  },
  musicMenu: {
    borderRadius: "20px",

  }
}));

export default function MusicSelectButton({setCurrBackgroundMusicIndex}) {
  const classes = useStyles();
  // Music menu
  const [musicMenu, setMusicMenu] = useState(null);

  const handleOpenMusicMneu = e => setMusicMenu(e.currentTarget);
  const handleCloseMusicMenu = () => setMusicMenu(null);
  const handleSelectMusicOption = i => {
    setCurrBackgroundMusicIndex(i);
    handleCloseMusicMenu();
  }

  return(
    <div className={classes.musicMenuButtonWrapper}>      
      <QueueMusicSharpIcon aria-controls="simple-menu" aria-haspopup="true" className={classes.musicMenuButton} fontSize="50px" onClick={handleOpenMusicMneu} />
      
      <Menu
        id="customized-menu"
        anchorEl={musicMenu}
        keepMounted
        open={Boolean(musicMenu)}
        onClose={handleCloseMusicMenu}
        className={classes.musicMenu}
      >
        <MenuItem className={classes.musicMenuItem} onClick={() => handleSelectMusicOption(-1)}>No Music</MenuItem>
        <MenuItem className={classes.musicMenuItem} onClick={() => handleSelectMusicOption(0)}>Electronic</MenuItem>
        <MenuItem className={classes.musicMenuItem} onClick={() => handleSelectMusicOption(1)}>Song</MenuItem>
        <MenuItem className={classes.musicMenuItem} onClick={() => handleSelectMusicOption(2)}>ClapAlong</MenuItem>
        <MenuItem className={classes.musicMenuItem} onClick={() => handleSelectMusicOption(3)}>Upbeat</MenuItem>
        <MenuItem className={classes.musicMenuItem} onClick={() => handleSelectMusicOption(4)}>Piano</MenuItem>
      </Menu>
    </div>
  );
}