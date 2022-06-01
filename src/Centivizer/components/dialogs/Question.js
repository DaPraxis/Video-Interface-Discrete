import React from 'react';
import { makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import './Question.css'
import assets from "../../assets/assets";

const surveyImages = assets.UWOsurvey;

const useStyles = makeStyles({
  eachQuestion: {
      margin: "26px 15px 0px 15px",
      width: "100%"
  },
  questionText: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0px 0px 8px 0px",
    textAlign: "center"
  },
  likert: {
    display: "inline-grid",
    gridTemplateColumns: "auto 110px 110px 110px 110px 110px auto",
    columnGap:"10px",
    alignItems: "center",
    justifyItems: "center"
  },
  likertRed: {
    fontSize: "10px",
    color: "#9A2E34",
    fontWeight: "bold"
  },
  likertBlue: {
    fontSize: "10px",
    color: "#0F6CA0",
    fontWeight: "bold"
  },
  image: {
    height: '120px'
  }
});

const Question = React.memo(function Question(props){
    const classes = useStyles();
    const { t } = useTranslation();
    const { survey, setSurvey, num } = props;
    const oneToSeven = [1,2,3,4,5];

    console.log(survey);

    return(
        <div className={classes.eachQuestion}>
            <div className={classes.questionText}>
                {t(`questionnaire.q${num}.question`)}
            </div>
            {t(`questionnaire.q${num}.color`) == "redToBlue"  
                ?   
                <div className={classes.likert}>
                        <div className={classes.likertRed}>
                            {t(`questionnaire.q${num}.least`)}
                        </div>
                        {oneToSeven.map((i) => {
                            return(
                                <div class={[`r${i}`]}>
                                    <input type="radio"
                                    id={`q${num}-${i}`}
                                    name={`q${num}`}
                                    value={i}
                                    onChange={setSurvey(`a${num}`)}
                                    checked={survey[`a${num}`] == `${i}`}
                                    />
                                    <label for={`q${num}-${i}`}>
                                        {<img src={surveyImages[i-1]} className={classes.image}></img>}
                                    </label>
                                </div>
                            );
                        })}
                        <div className={classes.likertBlue}>
                            {t(`questionnaire.q${num}.most`)}
                        </div>
                </div>
                :   
                <div className={classes.likert}> 
                        <div className={classes.likertBlue}>
                            {t(`questionnaire.q${num}.least`)}
                        </div>
                        {oneToSeven.map((i) =>{
                            return(
                                <div class={[`r${i}`]}>
                                    <input type="radio"
                                    id={`q${num}-${i}`}
                                    name={`q${num}`}
                                    value={i}
                                    onChange={setSurvey(`a${num}`)}
                                    checked={survey[`a${num}`] == `${i}`}
                                    />
                                    <label for={`q${num}-${i}`}>
                                        {<img src={surveyImages[i-1]} className={classes.image}></img>}
                                    </label>
                                </div>
                            );
                        })}
                        <div className={classes.likertRed}>
                            {t(`questionnaire.q${num}.most`)}
                        </div>
                </div>
            }
        </div>
    );
});

export default Question;