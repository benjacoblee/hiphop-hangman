window.onload = askIfReal;

function askIfReal() {
  Swal.fire({
    title: "Only for the realest!",
    text: "Do you want to continue?",
    icon: "warning",
    confirmButtonText: "fosho",
    showCancelButton: true,
    cancelButtonText: "nah",
    cancelButtonColor: "#f2201d"
  }).then(function(result) {
    if (result.value) {
      correctAudio.play();
      setTimeout(startScreen, 200); // create start screen
    } else if (result.dismiss) {
      setTimeout(cancelScreen, 200);
      setTimeout(function() {
        document.body.innerHTML = "";
      }, 1000);
      setTimeout(askIfReal, 1500);
    }
  });
}

function populateRappersArray() {
  rappers = [
    {
      rapper: "snoop",
      hint: `formerly known as _____ Lion. 
      Charlie Brown's pet`
    },
    {
      rapper: "biggie",
      hint: "opposite of small, notorious"
    },
    {
      rapper: "tupac",
      hint: "more than one pac. biggie's biggest rival"
    },
    {
      rapper: "eminem",
      hint: "8 mile. also a popular brand of chocolate. mum's spaghetti"
    },
    {
      rapper: "50 cent",
      hint: "half a dollar"
    },
    {
      rapper: "kendrick",
      hint: `don't kill my vibe. to pimp a butterfly. sit down, be humble`
    },
    {
      rapper: "outkast",
      hint: "another word for pariahs, people who are shunned"
    },
    { rapper: "jay z", hint: "yonce's husband" },
    { rapper: "ice cube", hint: "something you might put in soda" },
    { rapper: "dre", hint: "not a real doctor" },
    { rapper: "drake", hint: "an obsolete word for dragon. from canada" },
    {
      rapper: "DMX",
      hint: "rapper known for iconic song in deadpool soundtrack"
    },
    { rapper: "kanye", hint: `<u>YE</u>EZUS` },
    {
      rapper: "chamillionaire",
      hint: "only really famous for that one song, has millionaire in name"
    },
    {
      rapper: "bow wow",
      hint: `dog sounds. used to be "lil ___ ___"`
    },
    {
      rapper: "j. cole",
      hint: "bet jay-z regrets rejecting him. Jermaine Lamarr Cole"
    },
    {
      rapper: "eazy e",
      hint: "founding member of nwa, the opposite of difficult"
    },

    { rapper: "childish gambino", hint: "synonymous with immature" },
    { rapper: "logic", hint: "something you need for reasoning" },
    {
      rapper: "ll cool j",
      hint: "<u>l</u>adies <u>l</u>ove cool <u>j</u>ames"
    },
    { rapper: "mos def", hint: "without doubt, certain. indisputable" },
    { rapper: "ludacris", hint: "ridiculous" },
    { rapper: "mac miller", hint: "recently od'ed. rip" },
    { rapper: "nelly", hint: "Cor<u>nell</u> Haynes. rhymes with kelly" },
    {
      rapper: "xzibit",
      hint:
        "an organised presentation and display of a selection of items. an art ___ (not gallery)"
    },
    {
      rapper: "will smith",
      hint: "more well-known as an actor. fresh prince of bel air"
    },
    { rapper: "b.o.b", hint: "a very common name. _._._ the builder" },
    {
      rapper: "post malone",
      hint: `attained recognition after "white iverson"`
    },
    { rapper: "cardi b", hint: "sounds like bacardi, cardio" },
    { rapper: "nicki minaj", hint: "female, wears colorful wigs" },
    {
      rapper: "chance",
      hint: `the probabilty of something happening. "leave it up to ___"`
    },
    {
      rapper: "dj khaled",
      hint: `"you smart. you loyal. i appreciate that." doesn't actually rap much. memelord of hip-hop`
    },
    { rapper: "the weeknd", hint: "something working people look forward to" },
    { rapper: "khalid", hint: `debuted with "location"` },
    { rapper: "bruno mars", hint: "a planet, half-filipino" },
    {
      rapper: "daniel caesar",
      hint: "shares same last name as a famous roman dictator"
    },
    { rapper: "usher", hint: "someone who escorts people to their seats" },
    { rapper: "t pain", hint: "the opposite of pleasure" }
  ];
}

let ranNum;
let secretWord;
let audio;
let hint;
let rappers = []; // starts off as an empty array, splices rappers from array to prevent duplicates
let guess = [];
let wronglyGuessedLetters = [];
let coins = 10; // 10 coins to buy back 1 life
let livesLeft = 10;
let correctGuesses = 0;
let cheatCounter = 0;
let gameStarted = false; // I THINK this was to prevent errors where game hadn't started and event listener was firing
let livesString;

// startscreen and display stuff
let container;
let gameTitle;
let subTitle;
let normalModeButton;
let speedModeButton;
let modeChosen;
let instructionsButton;
let creatorMessage;
let wrongGuessMessage;
let onlyForDesktopMessage;
let displayedLives;
let displayedCoins;
let displayedGuess;
let displayWronglyGuessedLetters;
let audioHintButton;
let pauseButton;
let pauseScreen;
let pauseMessage;
let pausedLoseLifeValue;
let pausedCountdownTimerValue;
let retryButton;
let quitButton;
let loseLifeTimer;
let timerMessage;
let timerStartValue;
let countdownTimer;

const correctAudio = new Audio("./audio/correct-audio.mp3");
const wrongAudio = new Audio("./audio/wrong-audio.mp3");
const winAudio = new Audio("./audio/win-audio.mp3");
const loseAudio = new Audio("./audio/lose-audio.mp3");

function startScreen() {
  container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);

  gameTitle = document.createElement("h1");
  gameTitle.innerText = `Hip-Hop Hangman`;
  container.appendChild(gameTitle);

  subTitle = document.createElement("p");
  subTitle.classList.add("subtitle");
  subTitle.innerText = "(and r&b)";
  container.appendChild(subTitle);

  normalModeButton = document.createElement("button");
  normalModeButton.classList.add("normal-mode-button");
  normalModeButton.innerText = "Normal Mode";
  container.appendChild(normalModeButton);

  speedModeButton = document.createElement("button");
  speedModeButton.classList.add("speed-mode-button");
  speedModeButton.innerText = "Speed Mode";
  container.appendChild(speedModeButton);

  instructionsButton = document.createElement("button");
  instructionsButton.classList.add("instructions-button");
  instructionsButton.innerText = "Instructions";
  container.appendChild(instructionsButton);

  creatorMessage = document.createElement("p");
  creatorMessage.classList.add("creator-message");
  creatorMessage.innerHTML = `Made with <p class="heart">❤</p> by <a href="https://github.com/benjacoblee/hiphop-hangman">Ben Jacob Lee</a>`;
  container.appendChild(creatorMessage);

  onlyForDesktopMessage = document.createElement("p");
  onlyForDesktopMessage.classList.add("only-for-desktop-message");
  onlyForDesktopMessage.innerText = "Desktop only";
  container.append(onlyForDesktopMessage);

  normalModeButton.addEventListener("click", function() {
    modeChosen = "normal"; // set mode chosen in order to append the proper elements; speed mode will not have timer message
    startGame(); // also to add the correct event listener
  });
  speedModeButton.addEventListener("click", function() {
    modeChosen = "speed";
    startGame();
  });
  instructionsButton.addEventListener("click", function() {
    displayInstructions();
    instructionsToggleBlur();
  });

  const heart = document.querySelector(".heart");
  heart.classList.add("heart");
  heart.addEventListener("click", function() {
    modeChosen = "cheat";
    startGame();
  });
}

function cancelScreen() {
  container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);
  const cancelMessage = document.createElement("p");
  cancelMessage.classList.add("cancel-message");
  cancelMessage.innerText = "what are you doing here, then?";
  container.appendChild(cancelMessage);
  wrongAudio.play();
}

function startGame() {
  correctGuesses = 0;
  container.removeChild(gameTitle);
  container.removeChild(subTitle);
  container.removeChild(normalModeButton);
  container.removeChild(speedModeButton);
  container.removeChild(instructionsButton);
  container.removeChild(creatorMessage);
  container.removeChild(onlyForDesktopMessage);
  gameStarted = true;

  const yeahMessage = document.createElement("p");
  yeahMessage.classList.add("correct-guess-message");
  yeahMessage.innerText = "yeah";
  container.appendChild(yeahMessage);
  setTimeout(function() {
    container.removeChild(yeahMessage);
  }, 200);

  if (gameStarted) {
    populateRappersArray();
    if (modeChosen === "normal") {
      document.addEventListener("keydown", normalModeEventListener);
    } else if (modeChosen === "speed") {
      document.addEventListener("keydown", speedModeEventListener);
      startTimers();
    } else if (modeChosen === "cheat") {
      document.addEventListener("keydown", cheatModeEventListener);
    }
    newWord();
    correctAudio.play();
  }
}

function displayInstructions() {
  const instructionsPara = document.createElement("p");
  instructionsPara.classList.add("instructions-para");
  instructionsPara.innerText = `Welcome to Hip-Hop Hangman!
    Listen to the sound clues provided and guess the rapper!
    You are allowed a total of 10 wrong guesses - after which, you lose (unless you have enough coins)!
    Spend 5 coins to get an audio hint!
    Spend 10 coins to get a life!
    Enter your choice by simply typing on the keyboard 
    (words may consist of numbers, periods or spaces)!
    Have fun and keep it a hunnit 👐`;
  container.appendChild(instructionsPara);
  const backButton = document.createElement("button");
  backButton.classList.add("back-button");
  backButton.innerText = "Go Back";
  container.appendChild(backButton);

  backButton.addEventListener("click", function() {
    document.body.innerHTML = "";
    instructionsToggleBlur();
    startScreen();
  });
}

function instructionsToggleBlur() {
  gameTitle.classList.toggle("blur");
  subTitle.classList.toggle("blur");
  normalModeButton.classList.toggle("blur");
  speedModeButton.classList.toggle("blur");
  instructionsButton.classList.toggle("blur");
  creatorMessage.classList.toggle("blur");
  onlyForDesktopMessage.classList.toggle("blur");
}

function newWord() {
  gameStarted = true;
  if (modeChosen !== "cheat") {
    correctAudio.play();
  }

  ranNum = Math.floor(Math.random() * rappers.length);

  // use string interpolation to choose rapper from array and play corresponding audio
  audio = new Audio(`./audio/${rappers[ranNum].rapper}.mp3`);
  audio.currentTime = 0;

  if (modeChosen === "cheat") {
    audio.play();
  }

  hint = document.createElement("p");
  hint.classList.add("hint");
  hint.innerHTML = rappers[ranNum].hint;

  secretWord = rappers[ranNum].rapper;
  secretWord = secretWord.toLowerCase();

  // empties guess array in preparation for new word
  guess = [];
  wronglyGuessedLetters = [];

  // populates guessArray with underscores to correspond to length of secret word
  for (let i = 0; i < secretWord.length; i++) {
    guess[i] = "_";
  }

  createDisplayValues();

  setTimeout(refreshDisplayValues, 400); // creates all onscreen elements
}

function createDisplayValues() {
  displayedGuess = document.createElement("p");
  displayedGuess.classList.add("displayed-guess");
  displayedGuess.innerText = guess.join("");

  makeLivesString();

  displayedCoins = document.createElement("p");
  displayedCoins.classList.add("displayed-coins");
  displayedCoins.innerText = `Coins: ${coins}`;

  displayWronglyGuessedLetters = document.createElement("p");
  displayWronglyGuessedLetters.classList.add("display-wrongly-guessed-letters");
  displayWronglyGuessedLetters.innerText = "";

  audioHintButton = document.createElement("button");
  audioHintButton.classList.add("audio-hint-button");
  audioHintButton.innerText = "Get audio hint";
  // setting opacity in stylesheet returns undefined value for some reason
  audioHintButton.style.opacity = "1";

  audioHintButton.addEventListener("click", getAudioHint);

  pauseButton = document.createElement("button");
  pauseButton.classList.add("pause-button");
  pauseButton.innerText = "pause";
  pauseButton.addEventListener("click", pauseGame);

  quitButton = document.createElement("button");
  quitButton.classList.add("quit-button");
  quitButton.innerText = "Quit";

  quitButton.addEventListener("click", quitGame);

  timerMessage = document.createElement("p");
  timerMessage.classList.add("timer-message");
}

function refreshDisplayValues() {
  if (gameStarted) {
    // NECESSARY IF NOT DISPLAYED ELEMENTS WILL GLITCH
    if (displayedLives.parentNode === container) {
      container.removeChild(displayedLives);
      container.removeChild(displayedCoins);

      if (modeChosen === "speed") {
        container.removeChild(timerMessage); // this element won't exist if mode chosen was normal
      }
      container.removeChild(displayedGuess);
      if (modeChosen !== "cheat") {
        container.removeChild(hint);
        container.removeChild(displayWronglyGuessedLetters);
        container.removeChild(audioHintButton);
      }
    }

    container.appendChild(displayedLives);
    container.appendChild(displayedCoins);

    if (modeChosen === "speed") {
      container.appendChild(timerMessage);
    }

    container.appendChild(displayedGuess);
    if (modeChosen !== "cheat") {
      container.appendChild(hint);
      container.appendChild(displayWronglyGuessedLetters);
    }

    if (audioHintButton.style.opacity === "1" && modeChosen !== "cheat") {
      // means that audio hint button hasn't been clicked yet
      container.appendChild(audioHintButton);
    }

    if (modeChosen === "speed") {
      container.appendChild(pauseButton);
    }

    container.appendChild(quitButton);
  }
}

function makeLivesString() {
  livesString = "Lives left: ";
  // loops over livesLeft and concatenates heart string for every life left
  for (let i = 0; i < livesLeft; i++) {
    livesString += "♥";
  }
  displayedLives = document.createElement("p");
  displayedLives.classList.add("displayed-lives");
  displayedLives.innerText = livesString;
  return displayedLives;
}

function getAudioHint() {
  audio.play();
  coins -= 5;
  displayedCoins.innerText = `Coins: ${coins}`;

  // clear out container to refresh display values with new coin value
  container.innerHTML = "";
  refreshDisplayValues();
  audioHintButton.classList.add("hint-button-fade-out");
  audioHintButton.style.opacity = "0";

  audioHintButton.removeEventListener("click", getAudioHint); // could click on audio hint multiple times resulting in negative coin values
}

function pauseGame() {
  gameStarted = false;
  clearInterval(loseLifeTimer);
  clearInterval(countdownTimer);
  pauseGameToggleBlur();

  audioHintButton.removeEventListener("click", getAudioHint);
  pauseButton.removeEventListener("click", pauseGame);
  quitButton.removeEventListener("click", quitGame);

  pausedLoseLifeValue = timerStartValue; // captures timer value at the moment of clearing interval
  pausedCountdownTimerValue = timerStartValue * 10; // to ensure timing is the same

  pauseScreen = document.createElement("div");
  pauseScreen.classList.add("pause-screen");
  container.appendChild(pauseScreen);

  pauseMessage = document.createElement("p");
  pauseMessage.innerText = "paused";
  pauseScreen.appendChild(pauseMessage);

  const resumeButton = document.createElement("button");
  resumeButton.classList.add("resume-button");
  resumeButton.innerText = "resume?";
  pauseScreen.appendChild(resumeButton);
  resumeButton.addEventListener("click", resumeGame);
}

function pauseGameToggleBlur() {
  displayedLives.classList.toggle("blur");
  displayedCoins.classList.toggle("blur");
  timerMessage.classList.toggle("blur");
  displayedGuess.classList.toggle("blur");
  hint.classList.toggle("blur");
  audioHintButton.classList.toggle("blur");
  pauseButton.classList.toggle("blur");
  quitButton.classList.toggle("blur");
}

function resumeGame() {
  gameStarted = true;
  container.removeChild(pauseScreen);
  pauseGameToggleBlur();

  audioHintButton.addEventListener("click", getAudioHint);
  pauseButton.addEventListener("click", pauseGame);
  quitButton.addEventListener("click", quitGame);

  loseLifeTimer = setInterval(function() {
    container.innerHTML = "";
    clearInterval(countdownTimer);
    timerStartValue = 1000;
    countdownTimer = setInterval(displayCountdownMessage, 10);

    livesLeft--;
    makeLivesString();
    refreshTimers();
    refreshDisplayValues();

    if (livesLeft === 0 && coins >= 10) {
      buyBack();
      clearInterval(countdownTimer);
      clearInterval(loseLifeTimer);
    }
    if (livesLeft === 0 && coins < 10) {
      loseGame();
    }
  }, pausedCountdownTimerValue);
  timerStartValue = pausedLoseLifeValue;
  countdownTimer = setInterval(displayCountdownMessage, 10);
}

function buyBack() {
  if (modeChosen === "speed") {
    clearInterval(loseLifeTimer);
    clearInterval(countdownTimer);
  }

  gameStarted = false;
  container.innerHTML = "";
  const buyBackMessage = document.createElement("p");
  buyBackMessage.innerText = `You have ${coins} coins. Would you like to buy a life for 10 coins?`;
  container.appendChild(buyBackMessage);
  const buyBackButton = document.createElement("button");
  buyBackButton.classList.add("buy-back-button");
  buyBackButton.innerText = "Buy life";
  container.appendChild(buyBackButton);
  container.appendChild(quitButton);

  buyBackButton.addEventListener("click", function() {
    container.innerHTML = "";
    coins -= 10;
    livesLeft++;

    newWord();
    if (modeChosen === "speed") {
      startTimers();
    }
  });
}

function createRetryButton() {
  retryButton = document.createElement("button");
  retryButton.classList.add("retry-button");
  retryButton.innerText = "Retry?";
  container.appendChild(retryButton);
  retryButton.addEventListener("click", function() {
    document.body.innerHTML = "";
    livesLeft = 10;
    coins = 10;
    correctAudio.play();
    populateRappersArray();
    startScreen();
  });
}

function startTimers() {
  loseLifeTimer = setInterval(function() {
    container.innerHTML = "";
    clearInterval(countdownTimer);
    timerStartValue = 1000;
    countdownTimer = setInterval(displayCountdownMessage, 10);

    livesLeft--;
    makeLivesString();
    refreshTimers();
    refreshDisplayValues();

    if (livesLeft === 0 && coins >= 10) {
      buyBack();
      clearInterval(countdownTimer);
      clearInterval(loseLifeTimer);
    }
    if (livesLeft === 0 && coins < 10) {
      loseGame();
    }
  }, 10000);
  timerStartValue = 1000;
  countdownTimer = setInterval(displayCountdownMessage, 10);
}

function refreshTimers() {
  clearInterval(loseLifeTimer);
  clearInterval(countdownTimer);
  startTimers();
}

function winGame() {
  document.removeEventListener("keydown", normalModeEventListener);
  document.removeEventListener("keydown", speedModeEventListener);
  document.removeEventListener("keydown", cheatModeEventListener);

  if (modeChosen === "speed") {
    clearInterval(loseLifeTimer);
    clearInterval(countdownTimer);
  }

  gameStarted = false;
  container.innerHTML = "";

  winAudio.play();

  const winMessage = document.createElement("p");
  winMessage.classList.add("win-message");
  winMessage.innerText = `You won! Correct guesses: ${correctGuesses}`;
  container.appendChild(winMessage);

  const winGif = document.createElement("img");
  winGif.classList.add("gif");
  winGif.setAttribute(
    "src",
    "https://media.giphy.com/media/wAxlCmeX1ri1y/giphy.gif"
  );
  container.appendChild(winGif);

  populateRappersArray();
  createRetryButton();
  retryButton.addEventListener("click", function() {
    winAudio.pause();
    winAudio.currentTime = 0; // needed in case user wins multiple times, win audio will play from the time it stopped
  });
}

function loseGame() {
  document.removeEventListener("keydown", normalModeEventListener);
  document.removeEventListener("keydown", speedModeEventListener);
  document.removeEventListener("keydown", cheatModeEventListener);

  audio.pause();

  if (modeChosen === "speed") {
    clearInterval(loseLifeTimer);
    clearInterval(countdownTimer);
  }

  container.innerHTML = "";
  gameStarted = false;

  loseAudio.play();

  const loseMessage = document.createElement("p");
  loseMessage.classList.add("lose-message");
  loseMessage.innerText = `You lose!
      Correct guesses: ${correctGuesses}`;
  container.appendChild(loseMessage);

  const loseGif = document.createElement("img");
  loseGif.classList.add("gif");
  loseGif.setAttribute(
    "src",
    "https://media.giphy.com/media/v9G3NGByE9x16/giphy.gif"
  );
  container.appendChild(loseGif);

  populateRappersArray();

  createRetryButton();

  retryButton.addEventListener("click", function() {
    loseAudio.pause();
    loseAudio.currentTime = 0;
  });

  container.appendChild(quitButton);
  quitButton.classList.add("quit-button-fade-in");
  quitButton.addEventListener("click", function() {
    loseAudio.pause();
    loseAudio.currentTime = 0;
  });
}

function quitGame() {
  audio.pause();

  document.removeEventListener("keydown", normalModeEventListener);
  document.removeEventListener("keydown", speedModeEventListener);
  document.removeEventListener("keydown", cheatModeEventListener);

  secretWord = "";
  gameStarted = false;
  modeChosen = "";

  clearInterval(countdownTimer);
  clearInterval(loseLifeTimer);

  document.body.innerHTML = "";
  livesLeft = 10;
  coins = 10;

  populateRappersArray();
  startScreen();
}

function displayCountdownMessage() {
  timerMessage.innerText = `Time left: ${timerStartValue--}`;
}

function displayCorrectGuess() {
  const correctGuessMessage = document.createElement("p");
  correctGuessMessage.classList.add("correct-guess-message");
  correctGuessMessage.innerText = secretWord;
  container.appendChild(correctGuessMessage);
  setTimeout(function() {
    if (correctGuessMessage.parentNode === container) {
      container.removeChild(correctGuessMessage);
    }
  }, 300);
}

function displayAlreadyGuessedMessage() {
  container.innerHTML = "";

  const alreadyGuessedMessage = document.createElement("p");
  alreadyGuessedMessage.innerText = "You already guessed that!";
  container.appendChild(alreadyGuessedMessage);

  setTimeout(function() {
    if (alreadyGuessedMessage.parentNode === container) {
      container.removeChild(alreadyGuessedMessage);
      container.appendChild(displayedLives);
      container.appendChild(displayedCoins);
      if (modeChosen === "speed") {
        container.appendChild(timerMessage);
      }
      container.appendChild(displayedGuess);
      container.appendChild(hint);
      container.appendChild(displayWronglyGuessedLetters);
      if (audioHintButton.style.opacity === "1") {
        container.appendChild(audioHintButton);
      }
      container.appendChild(quitButton);
    }
  }, 300);
}

function displayWrongGuessMessage() {
  container.innerHTML = "";

  wrongGuessMessage = document.createElement("p");
  wrongGuessMessage.classList.add("wrong-guess-message");
  wrongGuessMessage.innerText = `WRONG
                                Lives left: ${livesLeft}
                                `;

  container.appendChild(wrongGuessMessage);

  // to prevent errors where parent el doesn't exist yet

  setTimeout(function() {
    if (wrongGuessMessage.parentNode === container) {
      container.appendChild(displayedLives);
      container.appendChild(displayedCoins);

      if (modeChosen === "speed") {
        container.appendChild(timerMessage);
      }

      container.removeChild(wrongGuessMessage);
      container.appendChild(displayedGuess);
      container.appendChild(hint);
      container.appendChild(displayWronglyGuessedLetters);

      if (audioHintButton.style.opacity === "1") {
        container.appendChild(audioHintButton);
      }

      if (modeChosen === "speed") {
        container.appendChild(pauseButton);
      }
      container.appendChild(quitButton);
    }
  }, 300);
}

function correctGuess() {
  audio.pause();
  // prevent repeat of words
  rappers.splice(ranNum, 1);

  correctGuesses++;
  coins += 5;

  wronglyGuessedLetters = [];

  if (displayedLives.parentNode === container) {
    container.removeChild(displayedLives);
    container.removeChild(displayedCoins);
    container.removeChild(displayedGuess);
    if (modeChosen !== "cheat") {
      container.removeChild(hint);
      container.removeChild(displayWronglyGuessedLetters);
    }

    if (quitButton.parentNode === container) {
      container.removeChild(quitButton);
    }

    if (modeChosen === "speed") {
      container.removeChild(timerMessage);
      if (pauseButton.parentNode === container) {
        container.removeChild(pauseButton);
      }
    }

    displayCorrectGuess();
  }

  if (audioHintButton.parentNode === container) {
    container.removeChild(audioHintButton);
  }

  if (rappers.length > 0) {
    newWord();
  }
}

function normalModeEventListener(e) {
  // had to create event listeners to remove them, faced a problem where both event listeners were running at the same time
  let enteredKey;
  if (gameStarted) {
    if (
      (e.keyCode >= 48 && e.keyCode <= 57) || // only allows keys that are used to be registered as guesses i.e a-z, numbers, spacebar and period
      (e.keyCode >= 65 && e.keyCode <= 90) ||
      e.keyCode === 190 ||
      e.keyCode === 32
    ) {
      enteredKey = e.key.toLowerCase(); // in case caps is on
    } else {
      return; // return is needed to prevent entered key as being registered as guesses
    }
    if (livesLeft > 0) {
      gameStarted = true;
      if (secretWord.includes(enteredKey)) {
        for (let i = 0; i < secretWord.length; i++) {
          if (secretWord[i] === enteredKey && !guess[i].includes(enteredKey)) {
            // loops over secretWord, if value at indexes match then change underscore to corresponding letter
            guess[i] = secretWord[i];
            let word = guess.join("");
            displayedGuess.innerText = word;
          } else if (
            secretWord[i] === enteredKey &&
            guess[i].includes(enteredKey)
          ) {
            displayAlreadyGuessedMessage();
          }
          if (secretWord === guess.join("")) {
            correctGuess();
          }
        }
      } else {
        if (!wronglyGuessedLetters.includes(enteredKey)) {
          // then don't let it be pushed into the array
          wronglyGuessedLetters.push(enteredKey);
          displayWronglyGuessedLetters.innerText = `Wrongly guessed letters:  ${wronglyGuessedLetters.join(
            ","
          )}`;
        }
        livesLeft--;
        wrongAudio.play();
        displayWrongGuessMessage();
        makeLivesString();
      }
    }
    if (livesLeft === 0 && coins >= 10) {
      buyBack();
    } else if (livesLeft === 0 && coins < 10) {
      loseGame();
    }
    if (rappers.length === 0) {
      winGame();
    }
  }
}

function speedModeEventListener(e) {
  let enteredKey;
  if (gameStarted) {
    if (
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 65 && e.keyCode <= 90) ||
      e.keyCode === 190 ||
      e.keyCode === 32
    ) {
      enteredKey = e.key.toLowerCase();
    } else {
      return;
    }
    if (livesLeft > 0) {
      if (secretWord.includes(enteredKey)) {
        for (let i = 0; i < secretWord.length; i++) {
          if (secretWord[i] === enteredKey && !guess[i].includes(enteredKey)) {
            guess[i] = secretWord[i];
            let word = guess.join("");
            displayedGuess.innerText = word;
          } else if (
            secretWord[i] === enteredKey &&
            guess[i].includes(enteredKey)
          ) {
            displayAlreadyGuessedMessage();
          }
          if (secretWord === guess.join("")) {
            refreshTimers();
            correctGuess();
          }
        }
      } else {
        if (!wronglyGuessedLetters.includes(enteredKey)) {
          wronglyGuessedLetters.push(enteredKey);
          displayWronglyGuessedLetters.innerText = `Wrongly guessed letters:  ${wronglyGuessedLetters.join(
            ","
          )}`;
        }
        container.innerHTML = "";
        livesLeft--;
        wrongAudio.play();
        displayWrongGuessMessage();
        makeLivesString();
        refreshTimers();
      }
    }
    if (livesLeft === 0 && coins >= 10) {
      buyBack();
    } else if (livesLeft === 0 && coins < 10) {
      loseGame();
    }
  }
  if (rappers.length === 0) {
    winGame();
  }
}

function cheatModeEventListener() {
  if (guess.join("") !== secretWord) {
    guess[cheatCounter] = secretWord[cheatCounter];
    cheatCounter++;
    displayedGuess.innerText = guess.join("");
  } else {
    cheatCounter = 0;
    correctGuess();
  }
  if (rappers.length === 0) {
    cheatCounter = 0;
    winGame();
  }
}
