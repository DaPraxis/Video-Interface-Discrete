//images
let smile1;
let smile2;
let smile3;
let smile4;
let smile5;

let empty_hole;

let normal_mole;
let happy_mole;
let cry_mole;

let hat_normal;
let hat_happy;
let hat_cry;

let orange_normal;
let orange_happy;
let orange_cry;

let purple_normal;
let purple_happy;
let purple_cry;

let jersey1_normal;
let jersey1_happy;
let jersey1_cry;

let jersey2_normal;
let jersey2_happy;
let jersey2_cry;

let jersey3_normal;
let jersey3_happy;
let jersey3_cry;

let jersey4_normal;
let jersey4_happy;
let jersey4_cry;

let jersey5_normal;
let jersey5_happy;
let jersey5_cry;

let jersey6_normal;
let jersey6_happy;
let jersey6_cry;

let jersey7_normal;
let jersey7_happy;
let jersey7_cry;

let jersey8_normal;
let jersey8_happy;
let jersey8_cry;

let jersey9_normal;
let jersey9_happy;
let jersey9_cry;

let smallJersey1_normal;
let smallJersey1_happy;
let smallJersey1_cry;

let smallJersey2_normal;
let smallJersey2_happy;
let smallJersey2_cry;

let smallJersey3_normal;
let smallJersey3_happy;
let smallJersey3_cry;

let smallJersey4_normal;
let smallJersey4_happy;
let smallJersey4_cry;

let smallJersey5_normal;
let smallJersey5_happy;
let smallJersey5_cry;

let smallJersey6_normal;
let smallJersey6_happy;
let smallJersey6_cry;

let smallJersey7_normal;
let smallJersey7_happy;
let smallJersey7_cry;

let smallJersey8_normal;
let smallJersey8_happy;
let smallJersey8_cry;

let smallJersey9_normal;
let smallJersey9_happy;
let smallJersey9_cry;

let correct_cry;
let correct_neutral;
let correct_happy;

let incorrect_cry;
let incorrect_neutral;
let incorrect_happy;

let jerseyQuestion;
let jerseyIT;
let jerseyOT;

let smallBlank_normal;
let smallBlank_happy;
let smallBlank_crying;
let bigBlank_normal;
let bigBlank_happy;
let bigBlank_crying;

let small1;
let small2;
let small3;
let small4;
let small5;
let small6;
let small7;
let small8;
let small9;

let big1;
let big2;
let big3;
let big4;
let big5;
let big6;
let big7;
let big8;
let big9;

let backgroundMusic;
let backgroundMusicSong;
let backgroundMusicClapAlong;
let backgroundMusicUpbeat;
let backgroundMusicPiano;
let endGameSFX;
let whackSFX;
let rightArpSFX;
let ruleChangeSFX;
let wrongPitchSFX;
let shockSFX;

let jerseyD;
let jerseyDArms;
let jerseyF;
let jerseyFArms;
let jerseyP;
let jerseyPArms;
let jerseyCH;
let jerseyCHArms;
let jerseyN;
let jerseyNArms;
let jerseyL;
let jerseyLArms;
let jerseyR;
let jerseyRArms;
let jerseyS;
let jerseySArms;
let jerseyT;
let jerseyTArms;
let jerseyK;
let jerseyKArms;

if(process.env.NODE_ENV === 'development'){
  smile1 = require(".." + "/assets/UWOsurvey/Smile1.png");
  smile2 = require(".." + "/assets/UWOsurvey/Smile2.png");
  smile3 = require(".." + "/assets/UWOsurvey/Smile3.png");
  smile4 = require(".." + "/assets/UWOsurvey/Smile4.png");
  smile5 = require(".." + "/assets/UWOsurvey/Smile5.png");

  empty_hole = require(".." + "/assets/hole.png");

  normal_mole = require(".." + "/assets/basic_normal.png");
  happy_mole = require(".." + "/assets/basic_happy.png");
  cry_mole = require(".." + "/assets/basic_cry.png");

  hat_normal = require(".." + "/assets/hat_normal.png");
  hat_happy = require(".." + "/assets/hat_happy.png");
  hat_cry = require(".." + "/assets/hat_cry.png");

  orange_normal = require(".." + "/assets/orange_normal.png");
  orange_happy = require(".." + "/assets/orange_happy.png");
  orange_cry = require(".." + "/assets/orange_cry.png");

  purple_normal = require(".." + "/assets/purple_normal.png");
  purple_happy = require(".." + "/assets/purple_happy.png");
  purple_cry = require(".." + "/assets/purple_cry.png");

  jersey1_normal = require(".." + "/assets/big_and_small/big_moley/bigmoley-1.png");
  jersey1_happy = require(".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-1.png");
  jersey1_cry = require(".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-1.png");

  jersey2_normal = require(".." + "/assets/big_and_small/big_moley/bigmoley-2.png");
  jersey2_happy = require(".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-2.png");
  jersey2_cry = require(".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-2.png");

  jersey3_normal = require(".." + "/assets/big_and_small/big_moley/bigmoley-3.png");
  jersey3_happy = require(".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-3.png");
  jersey3_cry = require(".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-3.png");

  jersey4_normal = require(".." + "/assets/big_and_small/big_moley/bigmoley-4.png");
  jersey4_happy = require(".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-4.png");
  jersey4_cry = require(".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-4.png");

  jersey5_normal = require(".." + "/assets/big_and_small/big_moley/bigmoley-5.png");
  jersey5_happy = require(".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-5.png");
  jersey5_cry = require(".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-5.png");

  jersey6_normal = require(".." + "/assets/big_and_small/big_moley/bigmoley-6.png");
  jersey6_happy = require(".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-6.png");
  jersey6_cry = require(".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-6.png");

  jersey7_normal = require(".." + "/assets/big_and_small/big_moley/bigmoley-7.png");
  jersey7_happy = require(".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-7.png");
  jersey7_cry = require(".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-7.png");

  jersey8_normal = require(".." + "/assets/big_and_small/big_moley/bigmoley-8.png");
  jersey8_happy = require(".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-8.png");
  jersey8_cry = require(".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-8.png");

  jersey9_normal = require(".." + "/assets/big_and_small/big_moley/bigmoley-9.png");
  jersey9_happy = require(".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-9.png");
  jersey9_cry = require(".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-9.png");

  smallJersey1_normal = require(".." + "/assets/big_and_small/small_moley/smallmoley-1.png");
  smallJersey1_happy = require(".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-1.png");
  smallJersey1_cry = require(".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-1.png");

  smallJersey2_normal = require(".." + "/assets/big_and_small/small_moley/smallmoley-2.png");
  smallJersey2_happy = require(".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-2.png");
  smallJersey2_cry = require(".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-2.png");

  smallJersey3_normal = require(".." + "/assets/big_and_small/small_moley/smallmoley-3.png");
  smallJersey3_happy = require(".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-3.png");
  smallJersey3_cry = require(".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-3.png");

  smallJersey4_normal = require(".." + "/assets/big_and_small/small_moley/smallmoley-4.png");
  smallJersey4_happy = require(".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-4.png");
  smallJersey4_cry = require(".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-4.png");

  smallJersey5_normal = require(".." + "/assets/big_and_small/small_moley/smallmoley-5.png");
  smallJersey5_happy = require(".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-5.png");
  smallJersey5_cry = require(".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-5.png");

  smallJersey6_normal = require(".." + "/assets/big_and_small/small_moley/smallmoley-6.png");
  smallJersey6_happy = require(".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-6.png");
  smallJersey6_cry = require(".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-6.png");

  smallJersey7_normal = require(".." + "/assets/big_and_small/small_moley/smallmoley-7.png");
  smallJersey7_happy = require(".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-7.png");
  smallJersey7_cry = require(".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-7.png");

  smallJersey8_normal = require(".." + "/assets/big_and_small/small_moley/smallmoley-8.png");
  smallJersey8_happy = require(".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-8.png");
  smallJersey8_cry = require(".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-8.png");

  smallJersey9_normal = require(".." + "/assets/big_and_small/small_moley/smallmoley-9.png");
  smallJersey9_happy = require(".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-9.png");
  smallJersey9_cry = require(".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-9.png");

  correct_cry = require(".." + "/assets/response/correct_cry.png");
  correct_neutral = require(".." + "/assets/response/correct_normal.png");
  correct_happy = require(".." + "/assets/response/correct_happy.png");

  incorrect_cry = require(".." + "/assets/response/incorrect_cry.png");
  incorrect_neutral = require(".." + "/assets/response/incorrect_normal.png");
  incorrect_happy = require(".." + "/assets/response/incorrect_happy.png");

  jerseyQuestion = require(".." + "/assets/jerseyQuestion.png");
  jerseyIT = require(".." + "/assets/intune.png");
  jerseyOT = require(".." + "/assets/outoftune.png");

  smallBlank_normal = require(".." + "/assets/big_and_small/blank_small_moley/blankSmallmoley.png");
  smallBlank_happy = require(".." + "/assets/big_and_small/blank_small_moley/blankHappySmallmoley.png");
  smallBlank_crying = require(".." + "/assets/big_and_small/blank_small_moley/blankCryingSmallmoley.png");
  bigBlank_normal = require(".." + "/assets/big_and_small/blank_big_moley/blankBigmoley.png");
  bigBlank_happy = require(".." + "/assets/big_and_small/blank_big_moley/blankHappyBigmoley.png");
  bigBlank_crying = require(".." + "/assets/big_and_small/blank_big_moley/blankCryingBigmoley.png");

  small1 = require(".." + "/assets/big_and_small/small_numbers/small1.png");
  small2 = require(".." + "/assets/big_and_small/small_numbers/small2.png");
  small3 = require(".." + "/assets/big_and_small/small_numbers/small3.png");
  small4 = require(".." + "/assets/big_and_small/small_numbers/small4.png");
  small5 = require(".." + "/assets/big_and_small/small_numbers/small5.png");
  small6 = require(".." + "/assets/big_and_small/small_numbers/small6.png");
  small7 = require(".." + "/assets/big_and_small/small_numbers/small7.png");
  small8 = require(".." + "/assets/big_and_small/small_numbers/small8.png");
  small9 = require(".." + "/assets/big_and_small/small_numbers/small9.png");

  big1 = require(".." + "/assets/big_and_small/big_numbers/big1.png");
  big2 = require(".." + "/assets/big_and_small/big_numbers/big2.png");
  big3 = require(".." + "/assets/big_and_small/big_numbers/big3.png");
  big4 = require(".." + "/assets/big_and_small/big_numbers/big4.png");
  big5 = require(".." + "/assets/big_and_small/big_numbers/big5.png");
  big6 = require(".." + "/assets/big_and_small/big_numbers/big6.png");
  big7 = require(".." + "/assets/big_and_small/big_numbers/big7.png");
  big8 = require(".." + "/assets/big_and_small/big_numbers/big8.png");
  big9 = require(".." + "/assets/big_and_small/big_numbers/big9.png");

  // audio files
  backgroundMusic = require(".." + "/assets/audio/game background music.mp3");
  backgroundMusicSong = require(".." + "/assets/audio/game_background_music_alone-ramol-5399.mp3");
  backgroundMusicClapAlong = require(".." + "/assets/audio/game_background_music_bensound-jazzyfrenchy.mp3");
  backgroundMusicUpbeat = require(".." + '/assets/audio/game_background_music_bensound-memories.mp3');
  backgroundMusicPiano = require(".." + '/assets/audio/game_background_music_Daniel_Veesey.mp3');
  endGameSFX = require(".." + "/assets/audio/game end sound.mp3");
  whackSFX = require(".." + "/assets/audio/mole whack.wav");
  rightArpSFX = require(".." + "/assets/audio/right arp.mp3");
  ruleChangeSFX = require(".." + "/assets/audio/rule change bell.mp3");
  wrongPitchSFX = require(".." + "/assets/audio/wrong pitch down.mp3");
  shockSFX = require(".." + "/assets/audio/shock.wav");

  jerseyD = require(".." + "/assets/letter_moles/jerseyD.png");
  jerseyDArms = require(".." + "/assets/letter_moles/jerseyD-arms.png");
  jerseyF = require(".." + "/assets/letter_moles/jerseyF.png");
  jerseyFArms = require(".." + "/assets/letter_moles/jerseyF-arms.png");
  jerseyP = require(".." + "/assets/letter_moles/jerseyP.png");
  jerseyPArms = require(".." + "/assets/letter_moles/jerseyP-arms.png");
  jerseyCH = require(".." + "/assets/letter_moles/jerseyCH.png");
  jerseyCHArms = require(".." + "/assets/letter_moles/jerseyCH-arms.png");
  jerseyN = require(".." + "/assets/letter_moles/jerseyN.png");
  jerseyNArms = require(".." + "/assets/letter_moles/jerseyN-arms.png");
  jerseyL = require(".." + "/assets/letter_moles/jerseyL.png");
  jerseyLArms = require(".." + "/assets/letter_moles/jerseyL-arms.png");
  jerseyR = require(".." + "/assets/letter_moles/jerseyR.png");
  jerseyRArms = require(".." + "/assets/letter_moles/jerseyR-arms.png");
  jerseyS = require(".." + "/assets/letter_moles/jerseyS.png");
  jerseySArms = require(".." + "/assets/letter_moles/jerseyS-arms.png");
  jerseyT = require(".." + "/assets/letter_moles/jerseyT.png");
  jerseyTArms = require(".." + "/assets/letter_moles/jerseyT-arms.png");
  jerseyK = require(".." + "/assets/letter_moles/jerseyK.png");
  jerseyKArms = require(".." + "/assets/letter_moles/jerseyK-arms.png");
}else{
  smile1 = ".." + "/assets/UWOsurvey/Smile1.png";
  smile2 = ".." + "/assets/UWOsurvey/Smile2.png";
  smile3 = ".." + "/assets/UWOsurvey/Smile3.png";
  smile4 = ".." + "/assets/UWOsurvey/Smile4.png";
  smile5 = ".." + "/assets/UWOsurvey/Smile5.png";

  empty_hole = ".." + "/assets/hole.png";

  normal_mole = ".." + "/assets/basic_normal.png";
  happy_mole = ".." + "/assets/basic_happy.png";
  cry_mole = ".." + "/assets/basic_cry.png";

  hat_normal = ".." + "/assets/hat_normal.png";
  hat_happy = ".." + "/assets/hat_happy.png";
  hat_cry = ".." + "/assets/hat_cry.png";

  orange_normal = ".." + "/assets/orange_normal.png";
  orange_happy = ".." + "/assets/orange_happy.png";
  orange_cry = ".." + "/assets/orange_cry.png";

  purple_normal = ".." + "/assets/purple_normal.png";
  purple_happy = ".." + "/assets/purple_happy.png";
  purple_cry = ".." + "/assets/purple_cry.png";

  jersey1_normal = ".." + "/assets/big_and_small/big_moley/bigmoley-1.png";
  jersey1_happy = ".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-1.png";
  jersey1_cry = ".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-1.png";

  jersey2_normal = ".." + "/assets/big_and_small/big_moley/bigmoley-2.png";
  jersey2_happy = ".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-2.png";
  jersey2_cry = ".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-2.png";

  jersey3_normal = ".." + "/assets/big_and_small/big_moley/bigmoley-3.png";
  jersey3_happy = ".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-3.png";
  jersey3_cry = ".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-3.png";

  jersey4_normal = ".." + "/assets/big_and_small/big_moley/bigmoley-4.png";
  jersey4_happy = ".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-4.png";
  jersey4_cry = ".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-4.png";

  jersey5_normal = ".." + "/assets/big_and_small/big_moley/bigmoley-5.png";
  jersey5_happy = ".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-5.png";
  jersey5_cry = ".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-5.png";

  jersey6_normal = ".." + "/assets/big_and_small/big_moley/bigmoley-6.png";
  jersey6_happy = ".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-6.png";
  jersey6_cry = ".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-6.png";

  jersey7_normal = ".." + "/assets/big_and_small/big_moley/bigmoley-7.png";
  jersey7_happy = ".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-7.png";
  jersey7_cry = ".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-7.png";

  jersey8_normal = ".." + "/assets/big_and_small/big_moley/bigmoley-8.png";
  jersey8_happy = ".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-8.png";
  jersey8_cry = ".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-8.png";

  jersey9_normal = ".." + "/assets/big_and_small/big_moley/bigmoley-9.png";
  jersey9_happy = ".." + "/assets/big_and_small/happy_big_moley/happyBigmoley-9.png";
  jersey9_cry = ".." + "/assets/big_and_small/crying_big_moley/cryingBigmoley-9.png";

  smallJersey1_normal = ".." + "/assets/big_and_small/small_moley/smallmoley-1.png";
  smallJersey1_happy = ".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-1.png";
  smallJersey1_cry = ".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-1.png";

  smallJersey2_normal = ".." + "/assets/big_and_small/small_moley/smallmoley-2.png";
  smallJersey2_happy = ".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-2.png";
  smallJersey2_cry = ".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-2.png";

  smallJersey3_normal = ".." + "/assets/big_and_small/small_moley/smallmoley-3.png";
  smallJersey3_happy = ".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-3.png";
  smallJersey3_cry = ".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-3.png";

  smallJersey4_normal = ".." + "/assets/big_and_small/small_moley/smallmoley-4.png";
  smallJersey4_happy = ".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-4.png";
  smallJersey4_cry = ".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-4.png";

  smallJersey5_normal = ".." + "/assets/big_and_small/small_moley/smallmoley-5.png";
  smallJersey5_happy = ".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-5.png";
  smallJersey5_cry = ".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-5.png";

  smallJersey6_normal = ".." + "/assets/big_and_small/small_moley/smallmoley-6.png";
  smallJersey6_happy = ".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-6.png";
  smallJersey6_cry = ".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-6.png";

  smallJersey7_normal = ".." + "/assets/big_and_small/small_moley/smallmoley-7.png";
  smallJersey7_happy = ".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-7.png";
  smallJersey7_cry = ".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-7.png";

  smallJersey8_normal = ".." + "/assets/big_and_small/small_moley/smallmoley-8.png";
  smallJersey8_happy = ".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-8.png";
  smallJersey8_cry = ".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-8.png";

  smallJersey9_normal = ".." + "/assets/big_and_small/small_moley/smallmoley-9.png";
  smallJersey9_happy = ".." + "/assets/big_and_small/happy_small_moley/happySmallmoley-9.png";
  smallJersey9_cry = ".." + "/assets/big_and_small/crying_small_moley/cryingSmallmoley-9.png";

  correct_cry = ".." + "/assets/response/correct_cry.png";
  correct_neutral = ".." + "/assets/response/correct_normal.png";
  correct_happy = ".." + "/assets/response/correct_happy.png";

  incorrect_cry = ".." + "/assets/response/incorrect_cry.png";
  incorrect_neutral = ".." + "/assets/response/incorrect_normal.png";
  incorrect_happy = ".." + "/assets/response/incorrect_happy.png";

  //const jerseyQuestion = ".." + "/assets/jerseyQuestion.png";
  jerseyQuestion = ".." + "/assets/jerseyQuestion.png";
  jerseyIT = ".." + "/assets/intune.png";
  jerseyOT = ".." + "/assets/outoftune.png";

  smallBlank_normal = ".." + "/assets/big_and_small/blank_small_moley/blankSmallmoley.png";
  smallBlank_happy = ".." + "/assets/big_and_small/blank_small_moley/blankHappySmallmoley.png";
  smallBlank_crying = ".." + "/assets/big_and_small/blank_small_moley/blankCryingSmallmoley.png";
  bigBlank_normal = ".." + "/assets/big_and_small/blank_big_moley/blankBigmoley.png";
  bigBlank_happy = ".." + "/assets/big_and_small/blank_big_moley/blankHappyBigmoley.png";
  bigBlank_crying = ".." + "/assets/big_and_small/blank_big_moley/blankCryingBigmoley.png";

  small1 = ".." + "/assets/big_and_small/small_numbers/small1.png";
  small2 = ".." + "/assets/big_and_small/small_numbers/small2.png";
  small3 = ".." + "/assets/big_and_small/small_numbers/small3.png";
  small4 = ".." + "/assets/big_and_small/small_numbers/small4.png";
  small5 = ".." + "/assets/big_and_small/small_numbers/small5.png";
  small6 = ".." + "/assets/big_and_small/small_numbers/small6.png";
  small7 = ".." + "/assets/big_and_small/small_numbers/small7.png";
  small8 = ".." + "/assets/big_and_small/small_numbers/small8.png";
  small9 = ".." + "/assets/big_and_small/small_numbers/small9.png";

  big1 = ".." + "/assets/big_and_small/big_numbers/big1.png";
  big2 = ".." + "/assets/big_and_small/big_numbers/big2.png";
  big3 = ".." + "/assets/big_and_small/big_numbers/big3.png";
  big4 = ".." + "/assets/big_and_small/big_numbers/big4.png";
  big5 = ".." + "/assets/big_and_small/big_numbers/big5.png";
  big6 = ".." + "/assets/big_and_small/big_numbers/big6.png";
  big7 = ".." + "/assets/big_and_small/big_numbers/big7.png";
  big8 = ".." + "/assets/big_and_small/big_numbers/big8.png";
  big9 = ".." + "/assets/big_and_small/big_numbers/big9.png";

  // audio files
  backgroundMusic = ".." + "/assets/audio/game background music.mp3";
  backgroundMusicSong = ".." + "/assets/audio/game_background_music_alone-ramol-5399.mp3";
  backgroundMusicClapAlong = ".." + "/assets/audio/game_background_music_bensound-jazzyfrenchy.mp3";
  backgroundMusicUpbeat = ".." + '/assets/audio/game_background_music_bensound-memories.mp3';
  backgroundMusicPiano = ".." + '/assets/audio/game_background_music_Daniel_Veesey.mp3';
  endGameSFX = ".." + "/assets/audio/game end sound.mp3";
  whackSFX = ".." + "/assets/audio/mole whack.wav";
  rightArpSFX = ".." + "/assets/audio/right arp.mp3";
  ruleChangeSFX = ".." + "/assets/audio/rule change bell.mp3";
  wrongPitchSFX = ".." + "/assets/audio/wrong pitch down.mp3";
  shockSFX = ".." + "/assets/audio/shock.wav";

  jerseyD = ".." + "/assets/letter_moles/jerseyD.png";
  jerseyDArms = ".." + "/assets/letter_moles/jerseyD-arms.png";
  jerseyF = ".." + "/assets/letter_moles/jerseyF.png";
  jerseyFArms = ".." + "/assets/letter_moles/jerseyF-arms.png";
  jerseyP = ".." + "/assets/letter_moles/jerseyP.png";
  jerseyPArms = ".." + "/assets/letter_moles/jerseyP-arms.png";
  jerseyCH = ".." + "/assets/letter_moles/jerseyCH.png";
  jerseyCHArms = ".." + "/assets/letter_moles/jerseyCH-arms.png";
  jerseyN = ".." + "/assets/letter_moles/jerseyN.png";
  jerseyNArms = ".." + "/assets/letter_moles/jerseyN-arms.png";
  jerseyL = ".." + "/assets/letter_moles/jerseyL.png";
  jerseyLArms = ".." + "/assets/letter_moles/jerseyL-arms.png";
  jerseyR = ".." + "/assets/letter_moles/jerseyR.png";
  jerseyRArms = ".." + "/assets/letter_moles/jerseyR-arms.png";
  jerseyS = ".." + "/assets/letter_moles/jerseyS.png";
  jerseySArms = ".." + "/assets/letter_moles/jerseyS-arms.png";
  jerseyT = ".." + "/assets/letter_moles/jerseyT.png";
  jerseyTArms = ".." + "/assets/letter_moles/jerseyT-arms.png";
  jerseyK = ".." + "/assets/letter_moles/jerseyK.png";
  jerseyKArms = ".." + "/assets/letter_moles/jerseyK-arms.png";
}

export default {
  hole: empty_hole,
  regular: { normal: normal_mole, happy: happy_mole, cry: cry_mole },
  hat: { normal: hat_normal, happy: hat_happy, cry: hat_cry },
  orange: { normal: orange_normal, happy: orange_happy, cry: orange_cry },
  purple: { normal: purple_normal, happy: purple_happy, cry: purple_cry },
  jersey1: { normal: jersey1_normal, happy: jersey1_happy, cry: jersey1_cry },
  jersey2: { normal: jersey2_normal, happy: jersey2_happy, cry: jersey2_cry },
  jersey3: { normal: jersey3_normal, happy: jersey3_happy, cry: jersey3_cry },
  jersey4: { normal: jersey4_normal, happy: jersey4_happy, cry: jersey4_cry },
  jersey5: { normal: jersey5_normal, happy: jersey5_happy, cry: jersey5_cry },
  jersey6: { normal: jersey6_normal, happy: jersey6_happy, cry: jersey6_cry },
  jersey7: { normal: jersey7_normal, happy: jersey7_happy, cry: jersey7_cry },
  jersey8: { normal: jersey8_normal, happy: jersey8_happy, cry: jersey8_cry },
  jersey9: { normal: jersey9_normal, happy: jersey9_happy, cry: jersey9_cry },
  smallBlank: {
    normal: smallBlank_normal,
    happy: smallBlank_happy,
    cry: smallBlank_crying,
  },
  bigBlank: {
    normal: bigBlank_normal,
    happy: bigBlank_happy,
    cry: bigBlank_crying,
  },
  number: {
    small1,
    small2,
    small3,
    small4,
    small5,
    small6,
    small7,
    small8,
    small9,
    big1,
    big2,
    big3,
    big4,
    big5,
    big6,
    big7,
    big8,
    big9,
  },
  UWOsurvey: [
    smile1,
    smile2,
    smile3,
    smile4,
    smile5,
  ],
  smallJersey1: {
    normal: smallJersey1_normal,
    happy: smallJersey1_happy,
    cry: smallJersey1_cry,
  },
  smallJersey2: {
    normal: smallJersey2_normal,
    happy: smallJersey2_happy,
    cry: smallJersey2_cry,
  },
  smallJersey3: {
    normal: smallJersey3_normal,
    happy: smallJersey3_happy,
    cry: smallJersey3_cry,
  },
  smallJersey4: {
    normal: smallJersey4_normal,
    happy: smallJersey4_happy,
    cry: smallJersey4_cry,
  },
  smallJersey5: {
    normal: smallJersey5_normal,
    happy: smallJersey5_happy,
    cry: smallJersey5_cry,
  },
  smallJersey6: {
    normal: smallJersey6_normal,
    happy: smallJersey6_happy,
    cry: smallJersey6_cry,
  },
  smallJersey7: {
    normal: smallJersey7_normal,
    happy: smallJersey7_happy,
    cry: smallJersey7_cry,
  },
  smallJersey8: {
    normal: smallJersey8_normal,
    happy: smallJersey8_happy,
    cry: smallJersey8_cry,
  },
  smallJersey9: {
    normal: smallJersey9_normal,
    happy: smallJersey9_happy,
    cry: smallJersey9_cry,
  },
  audioFiles: {
    backgroundMusic: [backgroundMusic, backgroundMusicSong, backgroundMusicClapAlong, backgroundMusicUpbeat, backgroundMusicPiano],
    endGameSFX: endGameSFX,
    whackSFX: whackSFX,
    rightArpSFX: rightArpSFX,
    ruleChangeSFX: ruleChangeSFX,
    wrongPitchSFX: wrongPitchSFX,
    shockSFX: shockSFX,
  },

  correct: { normal: correct_neutral, happy: correct_happy, cry: correct_cry },
  incorrect: {
    normal: incorrect_neutral,
    happy: incorrect_happy,
    cry: incorrect_cry,
  },
  jerseyQuestion: { normal: jerseyQuestion },
  jerseyIT: { normal: jerseyIT },
  jerseyOT: { normal: jerseyOT },
  jerseyD: { normal: jerseyD },
  jerseyDArms: { normal: jerseyDArms },
  jerseyP: { normal: jerseyP },
  jerseyPArms: { normal: jerseyPArms },
  jerseyF: { normal: jerseyF },
  jerseyFArms: { normal: jerseyFArms },
  jerseyCH: { normal: jerseyCH },
  jerseyCHArms: { normal: jerseyCHArms },
  jerseyN: { normal: jerseyN },
  jerseyNArms: { normal: jerseyNArms },
  jerseyL: { normal: jerseyL },
  jerseyLArms: { normal: jerseyLArms },
  jerseyR: { normal: jerseyR },
  jerseyRArms: { normal: jerseyRArms },
  jerseyS: { normal: jerseyS },
  jerseySArms: { normal: jerseySArms },
  jerseyT: { normal: jerseyT },
  jerseyTArms: { normal: jerseyTArms },
  jerseyK: { normal: jerseyK },
  jerseyKArms: { normal: jerseyKArms },
};
