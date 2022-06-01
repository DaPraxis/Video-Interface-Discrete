import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import React from "react";
import i18n from "../data/languages/i18n";

// TODO: rename
export default function VersionLanguageSwitcher(props) {
    let [lang, setLang] = React.useState(i18n.language);

    function handleLangChange(event, newLang) {
        if (newLang !== null) {
            setLang(newLang);
            i18n.changeLanguage(newLang);
        }
    }
    if (!props.version.languages.includes(i18n.language)) {
        i18n.changeLanguage("en");
    }

    console.log(i18n.language);

    return (
        <ToggleButtonGroup value={lang}
                           exclusive
                           onChange={handleLangChange}
                           aria-label="text alignment">
            {props.version.languages.map(
                (lang) => (
                    <ToggleButton value={lang}
                                  aria-label="left aligned"
                                  style={{minWidth: '50px'}}
                                  key={lang}>
                        {lang}
                    </ToggleButton>
                )
            )}
        </ToggleButtonGroup>
    );
}