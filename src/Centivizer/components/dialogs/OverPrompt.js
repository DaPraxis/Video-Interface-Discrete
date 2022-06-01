import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  dialog: {
    position: "absolute",
    left: '0',
    right: '0',
    top: "-50%",
    width: "500px",
    zIndex: "100",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: '10px'
  },
  content: {
    margin: "20px 20px 20px 37px",
  },
  text: {
    fontSize: "20px",
    margin: "0px 0px 4px 0px",
  },
  button: {
    margin: "10px auto",
    backgroundColor: "#55b7b6",
    borderRadius: "0.3rem",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "8px 16px",
    boxShadow: "0 4px 2px rgba(0, 0, 0, 0.2)",
    color: "white",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#55b7b6",
      transform: "scale(1.05)",
      transition: "transform .25s ease-out,-webkit-transform .25s ease-out",
    },
  },
});

function OverPrompt(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.dialog}>
      <div className={classes.content}>
        <p className={classes.text}>{t(props.text)}</p>
        <button className={classes.button} onClick={props.onClose}>
          {t("dialog.button")}
        </button>
      </div>
    </div>
  );
}

export default OverPrompt;
