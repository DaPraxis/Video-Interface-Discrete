import DataHandler from "../data-handler/DataHandler.js";

// should set pattern to .* if no restrictions
let defaultLoginConfig = {
  partNumPattern: /.*/,
  sessionNumPattern: /.*/,
};

export default class AbstractVersion {
  constructor(
    games,
    langs,
    studies,
    loginConfig = defaultLoginConfig,
    buttonSchemas = [["q", "w", "e", "a", "s", "d"]]
  ) {
    this.games = games;
    this.languages = langs;
    this.studies = studies;
    this.dataHandler = new DataHandler();
    this.loginConfig = loginConfig;
    this.buttonSchemas = buttonSchemas;
  }
}
