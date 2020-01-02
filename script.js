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
      setTimeout(startScreen, 200);
    } else if (result.dismiss) {
      setTimeout(cancelScreen, 200);
      setTimeout(function() {
        document.body.innerHTML = "";
      }, 1000);
      setTimeout(askIfReal, 1500);
    }
  });
}

let rappers = [];

function populateRappersArray() {
  rappers = [
    {
      rapper: "snoop",
      hint: "formerly known as _____ Lion"
    },
    {
      rapper: "biggie",
      hint: "opposite of small"
    },
    {
      rapper: "tupac",
      hint: "more than one pack"
    },
    {
      rapper: "eminem",
      hint: "also the name of a popular chocolate brand"
    },
    {
      rapper: "50 cent",
      hint: "half a dollar"
    },
    {
      rapper: "kendrick",
      hint: "don't kill my vibe"
    },
    {
      rapper: "outkast",
      hint: "another word for pariahs"
    },
    { rapper: "jay z", hint: "yonce's husband" },
    { rapper: "ice cube", hint: "something you might put in soda" },
    { rapper: "dre", hint: "not a real doctor" },
    { rapper: "drake", hint: "an obsolete word for dragon" },
    {
      rapper: "DMX",
      hint: "rapper known for iconic song in deadpool soundtrack"
    },
    { rapper: "kanye", hint: "YEEZUS" },
    {
      rapper: "chamillionaire",
      hint: "only really famous for that one song"
    },
    {
      rapper: "chingy",
      hint: "also rapper of one call away"
    },
    {
      rapper: "bow wow",
      hint: "dog sounds"
    },
    {
      rapper: "j. cole",
      hint: "bet jay-z regrets rejecting him"
    },
    {
      rapper: "eazy e",
      hint: "founding member of nwa"
    },
    { rapper: "rakim", hint: "eric b and" },
    { rapper: "childish gambino", hint: "synonymous with immature" },
    { rapper: "logic", hint: "something you need for reasoning" },
    { rapper: "ll cool j", hint: "ladies love cool james" },
    { rapper: "mos def", hint: "indisputably, unequivocally" },
    { rapper: "ludacris", hint: "ridiculous" },
    { rapper: "t.i.", hint: "two meaningless letters" },
    { rapper: "mac miller", hint: "recently od'ed. rip" },
    { rapper: "nelly", hint: "Cornell Haynes" },
    {
      rapper: "xzibit",
      hint: "an organised presentation and display of a selection of items"
    },
    { rapper: "will smith", hint: "more well-known as an actor. fresh prince" },
    { rapper: "b.o.b", hint: "a very common name" },
    {
      rapper: "post malone",
      hint: `attained recognition after "white iverson"`
    },
    { rapper: "cardi b", hint: "sounds like bacardi, cardio" },
    { rapper: "nicki minaj", hint: "female, wears colorful wigs" },
    { rapper: "chance", hint: "a probabilty of something happening" }
  ];
}

let fosho = false;
let ranNum;
let secretWord;
let audio;
let hint;
let guess = [];
let coins = 10; // 10 coins to buy back 1 life
let livesLeft = 10;
let correctGuesses = 0;
let gameStarted = false; // I THINK this was to prevent errors where game hadn't started and event listener was firing
let livesString;

// startscreen and display stuff
let container;
let gameTitle;
let normalModeButton;
let speedModeButton;
let modeChosen;
let instructionsButton;
let creatorMessage;
let displayedLives;
let displayedCoins;
let displayedGuess;
let audioHintButton;
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
  gameTitle.innerText = "Hip-Hop Hangman";
  container.appendChild(gameTitle);

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
  creatorMessage.classList.add("author-message");
  creatorMessage.innerText = "Made with ❤ by Ben Jacob Lee";
  container.appendChild(creatorMessage);

  normalModeButton.addEventListener("click", startNormalMode);
  speedModeButton.addEventListener("click", startSpeedMode);
  instructionsButton.addEventListener("click", displayInstructions);
}

function cancelScreen() {
  const container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);
  const cancelMessage = document.createElement("p");
  cancelMessage.classList.add("cancel-message");
  cancelMessage.innerText = "what are you doing here, then?";
  container.appendChild(cancelMessage);
  wrongAudio.play();
}

function startNormalMode() {
  modeChosen = "normal"; // so that when newWord() runs, it creates elements for the respective mode
  container.removeChild(gameTitle);
  container.removeChild(normalModeButton);
  container.removeChild(speedModeButton);
  container.removeChild(instructionsButton);
  container.removeChild(creatorMessage);
  gameStarted = true;

  if (gameStarted) {
    populateRappersArray();
    displayCorrectGuessMessage();
    normalMode();
    newWord();
    correctAudio.play();
  }
}

function startSpeedMode() {
  modeChosen = "speed";
  container.removeChild(gameTitle);
  container.removeChild(normalModeButton);
  container.removeChild(speedModeButton);
  container.removeChild(instructionsButton);
  container.removeChild(creatorMessage);
  gameStarted = true;

  if (gameStarted) {
    populateRappersArray();
    displayCorrectGuessMessage();
    speedMode();
    newWord();
    correctAudio.play();
  }
}

function displayInstructions() {
  container.innerHTML = "";
  const instructionsPara = document.createElement("p");
  instructionsPara.innerText = `Welcome to Hip-Hop Hangman!
    Listen to the sound clues provided and guess the rapper!
    You are allowed a total of 10 wrong guesses - after which, you lose (unless you have enough coins)!
    Spend 5 coins to get an audio hint!
    Spend 10 coins to get a life!
    Enter your choice by simply typing on the keyboard.
    Have fun and keep it a hunnit 👐`;
  container.appendChild(instructionsPara);
  const backButton = document.createElement("button");
  backButton.classList.add("back-button");
  backButton.innerText = "Go Back";
  container.appendChild(backButton);

  backButton.addEventListener("click", function() {
    document.body.innerHTML = "";
    startScreen();
  });
}

function newWord() {
  if (modeChosen === "normal") {
    gameStarted = true;
    correctAudio.play();

    ranNum = Math.floor(Math.random() * rappers.length);

    // use string interpolation to choose rapper from array and play corresponding audio
    audio = new Audio(`./audio/${rappers[ranNum].rapper}.mp3`);
    audio.currentTime = 0;

    hint = document.createElement("p");
    hint.innerText = rappers[ranNum].hint;

    secretWord = rappers[ranNum].rapper;
    secretWord = secretWord.toLowerCase();

    // empties guess array in preparation for new word
    guess = [];

    // populates guessArray with underscores to correspond to length of secret word
    for (let i = 0; i < secretWord.length; i++) {
      guess[i] = "_";
    }

    displayedGuess = document.createElement("p");
    displayedGuess.classList.add("displayedGuess");
    displayedGuess.innerText = guess.join("");
    displayedGuess.classList.add("displayed-guess");

    makeLivesString();

    displayedCoins = document.createElement("p");
    displayedCoins.classList.add("displayed-coins");
    displayedCoins.innerText = `Coins: ${coins}`;

    audioHintButton = document.createElement("button");
    audioHintButton.classList.add("audio-hint-button");
    audioHintButton.innerText = "Get audio hint";

    // setting opacity in stylesheet returns undefined value for some reason
    audioHintButton.style.opacity = "1";

    audioHintButton.addEventListener("click", function() {
      audio.play();
      coins -= 5;
      displayedCoins.innerText = `Coins: ${coins}`;

      // clear out container to refresh display values with new coin value
      container.innerHTML = "";
      refreshDisplayValues();
      audioHintButton.classList.add("hint-button-fade-out");
      audioHintButton.style.opacity = "0";
    });

    quitButton = document.createElement("button");
    quitButton.classList.add("quit-button");
    quitButton.innerText = "Quit";

    quitButton.addEventListener("click", quitGame);

    // to refresh displayed coin value

    setTimeout(refreshDisplayValues, 200);
  } else if (modeChosen === "speed") {
    gameStarted = true;
    correctAudio.play();

    ranNum = Math.floor(Math.random() * rappers.length);

    // use string interpolation to choose rapper from array and play corresponding audio
    audio = new Audio(`./audio/${rappers[ranNum].rapper}.mp3`);
    audio.currentTime = 0;

    hint = document.createElement("p");
    hint.innerText = rappers[ranNum].hint;

    secretWord = rappers[ranNum].rapper;
    secretWord = secretWord.toLowerCase();

    // empties guess array in preparation for new word
    guess = [];

    // populates guessArray with underscores to correspond to length of secret word
    for (let i = 0; i < secretWord.length; i++) {
      guess[i] = "_";
    }

    displayedGuess = document.createElement("p");
    displayedGuess.classList.add("displayedGuess");
    displayedGuess.innerText = guess.join("");
    displayedGuess.classList.add("displayed-guess");

    makeLivesString();

    displayedCoins = document.createElement("p");
    displayedCoins.classList.add("displayed-coins");
    displayedCoins.innerText = `Coins: ${coins}`;

    timerMessage = document.createElement("p");
    timerMessage.classList.add("timer-message");
    timerStartValue = 1000;

    countdownTimer = setInterval(displayCountdownMessage, 10);

    audioHintButton = document.createElement("button");
    audioHintButton.classList.add("audio-hint-button");
    audioHintButton.innerText = "Get audio hint";

    // setting opacity in stylesheet returns undefined value for some reason
    audioHintButton.style.opacity = "1";

    audioHintButton.addEventListener("click", function() {
      audio.play();
      coins -= 5;
      displayedCoins.innerText = `Coins: ${coins}`;

      // clear out container to refresh display values with new coin value
      container.innerHTML = "";
      refreshDisplayValues();
      audioHintButton.classList.add("hint-button-fade-out");
      audioHintButton.style.opacity = "0";
    });

    quitButton = document.createElement("button");
    quitButton.classList.add("quit-button");
    quitButton.innerText = "Quit";

    quitButton.addEventListener("click", quitGame);

    // to refresh displayed coin value

    setTimeout(refreshDisplayValues, 200);

    loseLife();
  }
}

function refreshDisplayValues() {
  if (displayedLives.parentNode === container) {
    container.removeChild(displayedLives);
    container.removeChild(displayedCoins);
    if (modeChosen === "speed") {
      container.removeChild(timerMessage); // this element won't exist if mode chosen was normal
    }

    container.removeChild(displayedGuess);
    container.removeChild(hint);
    container.removeChild(audioHintButton);
  }

  container.appendChild(displayedLives);
  container.appendChild(displayedCoins);

  if (modeChosen === "speed") {
    container.appendChild(timerMessage);
  }

  container.appendChild(displayedGuess);
  container.appendChild(hint);

  if (audioHintButton.style.opacity === "1") {
    // means that audio hint button hasn't been clicked yet
    container.appendChild(audioHintButton);
  }

  container.appendChild(quitButton);
}

function displayCorrectGuessMessage() {
  const correctGuessMessage = document.createElement("p");
  correctGuessMessage.classList.add("correct-guess-message");
  correctGuessMessage.innerText = "YEAH";
  container.appendChild(correctGuessMessage);
  setTimeout(function() {
    if (correctGuessMessage.parentNode === container) {
      container.removeChild(correctGuessMessage);
    }
  }, 200);
}

function displayWrongGuessMessage() {
  const wrongGuessMessage = document.createElement("p");
  wrongGuessMessage.classList.add("wrong-guess-message");
  wrongGuessMessage.innerText = `WRONG
                                Lives left: ${livesLeft}
                                `;

  container.appendChild(wrongGuessMessage);

  // to prevent errors where parent el doesn't exist yet
  if (displayedLives.parentNode === container) {
    container.removeChild(displayedLives);
    container.removeChild(displayedCoins);
    container.removeChild(displayedGuess);
    container.removeChild(hint);

    if (modeChosen === "speed") {
      container.removeChild(timerMessage);
    }

    if (audioHintButton.style.opacity === "1") {
      container.removeChild(audioHintButton);
    }

    container.removeChild(quitButton);
  }

  if (livesLeft !== 0) {
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
        if (audioHintButton.style.opacity === "1") {
          container.appendChild(audioHintButton);
        }
        container.appendChild(quitButton);
      }
    }, 500);
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

function buyBack() {
  coins -= 10;
  livesLeft++;
  container.innerHTML = "";
  newWord();
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

function loseLife() {
  loseLifeTimer = setInterval(function() {
    container.innerHTML = "";
    livesLeft--;
    clearInterval(countdownTimer);
    timerStartValue = 1000;
    countdownTimer = setInterval(displayCountdownMessage, 10);
    makeLivesString();
    refreshDisplayValues();
    if (livesLeft === 0) {
      loseGame();
      clearInterval(loseLifeTimer);
    }
  }, 10000);
}

function loseGame() {
  gameStarted = false;

  loseAudio.play();

  container.innerText = "";
  const loseMessage = document.createElement("p");
  loseMessage.classList.add("lose-message");
  loseMessage.innerText = `You lose!
      Correct guesses: ${correctGuesses}`;
  container.appendChild(loseMessage);

  populateRappersArray();

  createRetryButton();
  retryButton.addEventListener("click", function() {
    loseAudio.pause();
  });

  container.appendChild(quitButton);
  quitButton.classList.add("quit-button-fade-in");
  quitButton.addEventListener("click", function() {
    loseAudio.pause();
  });
}

function quitGame() {
  document.removeEventListener("keypress", normalModeEventListener);
  document.removeEventListener("keypress", speedModeEventListener);
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

function normalModeEventListener(e) {
  if (gameStarted) {
    // prevent "wrong" guesses by converting entered key to lowercase
    let enteredKey = e.key.toLowerCase();
    if (livesLeft > 0) {
      gameStarted = true;
      if (secretWord.includes(enteredKey) && gameStarted) {
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
            container.innerHTML = "";
            console.log("you already guessed that");

            const alreadyGuessedMessage = document.createElement("p");
            alreadyGuessedMessage.innerText = "You already guessed that!";
            container.appendChild(alreadyGuessedMessage);

            setTimeout(function() {
              if (alreadyGuessedMessage.parentNode === container) {
                container.removeChild(alreadyGuessedMessage);
                container.appendChild(displayedLives);
                container.appendChild(displayedCoins);
                container.appendChild(displayedGuess);
                container.appendChild(hint);
                if (audioHintButton.style.opacity === "1") {
                  container.appendChild(audioHintButton);
                }
                container.appendChild(quitButton);
              }
            }, 300);
          }
          if (secretWord === guess.join("")) {
            audio.pause();
            // prevent repeat of words
            rappers.splice(ranNum, 1);

            gameStarted = false;
            correctGuesses++;
            coins += 5;

            if (displayedLives.parentNode === container) {
              container.removeChild(displayedLives);
              container.removeChild(displayedCoins);
              container.removeChild(displayedGuess);
              container.removeChild(hint);
              if (quitButton.parentNode === container) {
                container.removeChild(quitButton);
              }

              displayCorrectGuessMessage();
            }

            if (audioHintButton.parentNode === container) {
              container.removeChild(audioHintButton);
            }

            if (rappers.length > 0) {
              newWord();
            }
          }
        }
      } else {
        livesLeft--;
        wrongAudio.play();
        displayWrongGuessMessage();
        makeLivesString();
      }
    }
    if (rappers.length === 0) {
      document.removeEventListener("keypress", normalModeEventListener);
      gameStarted = false;
      container.innerHTML = "";

      winAudio.play();

      const winMessage = document.createElement("p");
      winMessage.classList.add("win-message");
      winMessage.innerText = "You won!";
      populateRappersArray();
      container.appendChild(winMessage);
      createRetryButton();
      retryButton.addEventListener("click", function() {
        winAudio.pause();
      });
    }
    if (livesLeft === 0 && coins >= 10) {
      container.innerText = "";
      const buyBackMessage = document.createElement("p");
      buyBackMessage.innerText = `You have ${coins} coins. Would you like to buy a life for 10 coins?`;
      container.appendChild(buyBackMessage);
      const buyBackButton = document.createElement("button");
      buyBackButton.classList.add("buy-back-button");
      buyBackButton.innerText = "Buy life";
      container.appendChild(buyBackButton);
      container.appendChild(quitButton);
      buyBackButton.addEventListener("click", buyBack);
    }
    if (livesLeft === 0 && coins < 10) {
      document.removeEventListener("keypress", normalModeEventListener);
      loseGame();
    }
  }
}

function normalMode() {
  document.addEventListener("keypress", normalModeEventListener);
}

function speedModeEventListener(e) {
  if (gameStarted) {
    // prevent "wrong" guesses by converting entered key to lowercase
    let enteredKey = e.key.toLowerCase();
    if (livesLeft > 0) {
      gameStarted = true;
      if (secretWord.includes(enteredKey) && gameStarted) {
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
            container.innerHTML = "";
            console.log("you already guessed that");

            const alreadyGuessedMessage = document.createElement("p");
            alreadyGuessedMessage.innerText = "You already guessed that!";
            container.appendChild(alreadyGuessedMessage);

            setTimeout(function() {
              if (alreadyGuessedMessage.parentNode === container) {
                container.removeChild(alreadyGuessedMessage);
                container.appendChild(displayedLives);
                container.appendChild(displayedCoins);
                container.appendChild(timerMessage);
                container.appendChild(displayedGuess);
                container.appendChild(hint);
                if (audioHintButton.style.opacity === "1") {
                  container.appendChild(audioHintButton);
                }
                container.appendChild(quitButton);
              }
            }, 300);
          }
          if (secretWord === guess.join("")) {
            audio.pause();
            // prevent repeat of words
            rappers.splice(ranNum, 1);

            gameStarted = false;
            correctGuesses++;
            coins += 5;

            if (displayedLives.parentNode === container) {
              container.removeChild(displayedLives);
              container.removeChild(displayedCoins);
              container.removeChild(displayedGuess);
              container.removeChild(timerMessage);
              container.removeChild(hint);
              if (quitButton.parentNode === container) {
                container.removeChild(quitButton);
              }

              displayCorrectGuessMessage();
            }

            if (audioHintButton.parentNode === container) {
              container.removeChild(audioHintButton);
            }

            if (rappers.length > 0) {
              clearInterval(loseLifeTimer);
              clearInterval(countdownTimer);
              newWord();
            }
          }
        }
      } else {
        clearInterval(loseLifeTimer);
        clearInterval(countdownTimer);

        timerStartValue = 1000;
        countdownTimer = setInterval(displayCountdownMessage, 10);

        loseLife();

        livesLeft--;
        wrongAudio.play();
        displayWrongGuessMessage();
        makeLivesString();
      }
    }
    if (rappers.length === 0) {
      document.removeEventListener("keypress", speedModeEventListener);
      gameStarted = false;
      container.innerHTML = "";

      winAudio.play();

      const winMessage = document.createElement("p");
      winMessage.classList.add("win-message");
      winMessage.innerText = "You won!";
      populateRappersArray();
      container.appendChild(winMessage);
      createRetryButton();
      retryButton.addEventListener("click", function() {
        winAudio.pause();
      });

      clearInterval(loseLifeTimer);
      clearInterval(countdownTimer);
    }
    if (livesLeft === 0 && coins >= 10) {
      container.innerText = "";
      const buyBackMessage = document.createElement("p");
      buyBackMessage.innerText = `You have ${coins} coins. Would you like to buy a life for 10 coins?`;
      container.appendChild(buyBackMessage);
      const buyBackButton = document.createElement("button");
      buyBackButton.classList.add("buy-back-button");
      buyBackButton.innerText = "Buy life";
      container.appendChild(buyBackButton);
      container.appendChild(quitButton);
      buyBackButton.addEventListener("click", buyBack);
      clearInterval(loseLifeTimer);
      clearInterval(countdownTimer);
    }
    if (livesLeft === 0 && coins < 10) {
      document.removeEventListener("keypress", speedModeEventListener);
      loseGame();
      clearInterval(loseLifeTimer);
      clearInterval(countdownTimer);
    }
  }
}

function speedMode() {
  document.addEventListener("keypress", speedModeEventListener);
}
