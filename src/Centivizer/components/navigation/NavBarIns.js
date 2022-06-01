import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import history from "../../history";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "rgba(79,184,184, 0.1)",
    boxShadow: "None",
  },
  grow: {
    flexGrow: 1,
    // color: 'transparent'
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  button: {
    borderRadius: "10%",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  inputRoot: {
    color: "inherit",
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function NavBarIns() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.grow}>
      {done ? <Redirect to="/mainmenu" push /> : <></>}
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<ArrowBackIcon />}
            onClick={handleClickOpen}
          >
            Back
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Back to the Game Selection?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Second Thought?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  // history.push('/mainmenu')
                  setDone(true);
                }}
                color="primary"
              >
                Confirm
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}></div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
