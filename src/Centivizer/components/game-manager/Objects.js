class State {
    constructor(id) {
      this.id = id;
      this.up = false;
      this.upTime = -1;
      this.overlay = null;
    }
  }
  
  // for default state representation (i.e. moles)
  export default class MoleState extends State {
    constructor(id, type = "regular", jerseyNumber = null) {
      super(id);
      this.type = type;
      this.mode = "normal";
      this.jerseyNumber = jerseyNumber;
    }
  }
  
  // for custom state representations (i.e. NOT moles, e.g. TAG-ME Mood faces)
  export class CustomState extends State {
    constructor(id, skin) {
      super(id);
      this.skin = skin;
    }
  }