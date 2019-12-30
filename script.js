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
      rapper: "50cent",
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
    { rapper: "jayz", hint: "yonce's husband" },
    { rapper: "icecube", hint: "something you might put in soda" },
    { rapper: "dre", hint: "not a real doctor" },
    { rapper: "drake", hint: "canadian dragon" },
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
      rapper: "bowwow",
      hint: "dog sounds"
    },
    {
      rapper: "jcole",
      hint: "bet jay-z regrets rejecting him"
    },
    {
      rapper: "eazye",
      hint: "founding member of nwa"
    }
  ];
}

let ranNum;
let secretWord;
let audio;
let hint;
let guess = [];
let coins = 10; // 10 coins to buy back 1 life
let livesLeft = 10;
let correctGuesses = 0;
let gameStarted = false;
let livesString;

// startscreen and display stuff
let container;
let gameTitle;
let startButton;
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
let display = true;

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
  startButton = document.createElement("button");
  startButton.classList.add("start-button");
  startButton.innerText = "Start";
  container.appendChild(startButton);
  instructionsButton = document.createElement("button");
  instructionsButton.classList.add("instructions-button");
  instructionsButton.innerText = "Instructions";
  container.appendChild(instructionsButton);

  creatorMessage = document.createElement("p");
  creatorMessage.classList.add("author-message");
  creatorMessage.innerText = "Made with ❤ by Ben Jacob Lee";
  container.appendChild(creatorMessage);

  startButton.addEventListener("click", startGame);
  instructionsButton.addEventListener("click", displayInstructions);
}

// create startscreen on page load
startScreen();

function startGame() {
  container.removeChild(gameTitle);
  container.removeChild(startButton);
  container.removeChild(instructionsButton);
  container.removeChild(creatorMessage);
  gameStarted = true;

  if (gameStarted) {
    populateRappersArray();
    displayCorrectGuessMessage();
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

function refreshDisplayValues() {
  if (displayedLives.parentNode === container) {
    container.removeChild(displayedLives);
    container.removeChild(displayedCoins);
    container.removeChild(timerMessage);
    container.removeChild(displayedGuess);
    container.removeChild(hint);
    container.removeChild(audioHintButton);
  }

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
    container.removeChild(timerMessage);
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
        container.appendChild(timerMessage);
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
    coins = 0;
    correctAudio.play();
    populateRappersArray();
    startScreen();
  });
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

  if (rappers.length === 0) {
    populateRappersArray();
  }
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
  clearInterval(loseLifeTimer);
  document.body.innerHTML = "";
  gameStarted = false;
  livesLeft = 10;
  coins = 10;
  rappers = [];
  populateRappersArray();
  startScreen();
}

function displayCountdownMessage() {
  timerMessage.innerText = `Time left: ${timerStartValue--}`;
  if (timerStartValue === -1) {
    clearInterval(countdownTimer);
  }
}

document.addEventListener("keypress", function(e) {
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
            console.log("you've already guessed that");
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
              container.removeChild(quitButton);
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
          }
        }, 10000);

        livesLeft--;
        wrongAudio.play();
        displayWrongGuessMessage();
        makeLivesString();
      }
    }
    if (rappers.length === 0) {
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
      loseGame();
      clearInterval(loseLifeTimer);
      clearInterval(countdownTimer);
    }
  }
});
