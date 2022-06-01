import React from "react";
import { useTranslation } from "react-i18next";
import Question from "./Question";


function QuestionnairePage(props) {
  const { t } = useTranslation();
  const { survey, setSurvey, page } = props;

  return (
    <>
        {page.map((question, index)=>
            <Question
            survey={survey}
            setSurvey={setSurvey}
            key={question}
            num={question}
            index={index}
            />
        )} 
    </>
  );
};

export default QuestionnairePage;
