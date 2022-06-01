import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import React from "react";
import i18n from "../data/languages/i18n";

// TODO: probably get rid of this, can replace with VersionLanguageSwitcher once Version stuff is properly integrated
export default function LanguageSwitchButtons(props) {
  let [lang, setLang] = React.useState("en");

  function handleLangChange(event, newLang) {
    if (newLang !== null) {
      setLang(newLang);
      i18n.changeLanguage(newLang);
    }
  }

  console.log(i18n.language);

  return (
    <ToggleButtonGroup
      value={lang}
      exclusive
      onChange={handleLangChange}
      aria-label="text alignment"
    >
      <ToggleButton
        value="en"
        aria-label="centered"
        style={{ minWidth: "50px" }}
      >
        en
      </ToggleButton>
      {/* <ToggleButton
        value="zh"
        aria-label="centered"
        style={{ minWidth: "50px" }}
      >
        zh
      </ToggleButton> */}
    </ToggleButtonGroup>
  );
}
