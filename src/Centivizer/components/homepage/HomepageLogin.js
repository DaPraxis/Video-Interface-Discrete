import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import audio from "../../audio";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 170,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  text: {
    // border: '1px solid',
    // borderRadius: 4,
  },
}));

export default function HomepageLogin(props) {
  const classes = useStyles();
  const [study, setStudy] = useState("");
  const [session, setSession] = useState("");
  const [sessionError, setSessionError] = useState(false);
  const [participant, setParticipant] = useState("");
  const [participantError, setParticipantError] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);

  const { t } = useTranslation();
  let loginConfig = props.version.loginConfig;

  // when done == true, will redirect to game select screen
  let [done, setDone] = useState(false);

  const handleChangeStudy = (event) => {
    setStudy(event.target.value);
  };

  const handleChangeParticipant = (event) => {
    setParticipant(event.target.value);

    localStorage.setItem("participant", event.target.value);
    localStorage.setItem('session', 1);
    localStorage.setItem("tune.lives", "3");

    // test participant num for validity
    setParticipantError(
      event.target.value !== "" &&
        !loginConfig.partNumPattern.test(event.target.value)
    );
  };

  const handleChangeSession = (event) => {
    setSession(event.target.value);

    localStorage.setItem("session", event.target.value);

    // check validity here, similarly as to participant number
    setSessionError(
      event.target.value !== "" &&
        !loginConfig.sessionNumPattern.test(event.target.value)
    );
  };

  const handleCloseModal = () => {
    setOpenErrorModal(false);
  };

  // if (done) {
  //   audio.backgroundMusic.play();
  // }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {done ? <Redirect to="/mainmenu" push /> : <></>}
      <Dialog
        open={openErrorModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Error!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please do not use letters or special symbols in the participant
            number and session number.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            console.log(sessionError);
            console.log(participantError);
            if (!sessionError && !participantError) {
              setDone(true);
            } else {
              setOpenErrorModal(true);
            }
          }}
        >
          <FormControl
            variant="filled"
            required
            autoFocus
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-filled-label">
              {t("select-study")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={study}
              onChange={handleChangeStudy}
              required
            >
              {props.version.studies.map((study) => (
                <MenuItem value={study}>{study}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className={classes.text}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="participant_number"
            label={t("par-num")}
            name="participant_number"
            autoFocus
            value={participant}
            onChange={handleChangeParticipant}
            error={participantError}
            helperText={participantError ? t("invalid-par-num") : ""}
          />
          {/* <TextField
            variant="outlined"
            className={classes.text}
            margin="normal"
            required
            fullWidth
            name="Session Number"
            label={t("sess-num")}
            id="session_number"
            autoComplete="current-password"
            value={session}
            onChange={handleChangeSession}
            error={sessionError}
            helperText={sessionError ? t("invalid-sess-num") : ""}
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {t("start")}
          </Button>
        </form>
      </div>
    </Container>
  );
}
