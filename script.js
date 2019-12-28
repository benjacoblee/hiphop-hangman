let rappers = [
  {
    rapper: "snoop",
    hint: "Formerly known as _____ Lion"
  },
  {
    rapper: "biggie",
    hint: "Opposite of small"
  },
  {
    rapper: "tupac",
    hint: "More than one pack"
  },
  {
    rapper: "eminem",
    hint: "Also the name of a popular chocolate brand"
  },
  {
    rapper: "50cent",
    hint: "Half a dollar"
  },
  {
    rapper: "kendrick",
    hint: "Don't kill my vibe"
  },
  {
    rapper: "outkast",
    hint: "Pariahs"
  },
  { rapper: "jayz", hint: "Yonce's husband" },
  { rapper: "icecube", hint: "Something you might put in soda" },
  { rapper: "dre", hint: "Not a real doctor" },
  { rapper: "drake", hint: "Short form for dragon" },
  { rapper: "DMX", hint: "Deadpool soundtrack" },
  { rapper: "kanye", hint: "YEEZUS" },
  {
    rapper: "chamillionaire",
    hint: "Only really famous for that one song"
  },
  {
    rapper: "chingy",
    hint: "I like the way you do it right thurr"
  },
  {
    rapper: "bowwow",
    hint: "Dog sounds"
  }
];

function populateRappersArray() {
  rappers = [
    {
      rapper: "snoop",
      hint: "Formerly known as _____ Lion"
    },
    {
      rapper: "biggie",
      hint: "Opposite of small"
    },
    {
      rapper: "tupac",
      hint: "More than one pack"
    },
    {
      rapper: "eminem",
      hint: "Also the name of a popular chocolate brand"
    },
    {
      rapper: "50cent",
      hint: "Half a dollar"
    },
    {
      rapper: "kendrick",
      hint: "Don't kill my vibe"
    },
    {
      rapper: "outkast",
      hint: "Pariahs"
    },
    { rapper: "jayz", hint: "Yonce's husband" },
    { rapper: "icecube", hint: "Something you might put in soda" },
    { rapper: "dre", hint: "Not a real doctor" },
    { rapper: "drake", hint: "Short form for dragon" },
    { rapper: "DMX", hint: "Deadpool soundtrack" },
    { rapper: "kanye", hint: "YEEZUS" },
    {
      rapper: "chamillionaire",
      hint: "Only really famous for that one song"
    },
    {
      rapper: "chingy",
      hint: "I like the way you do it right thurr"
    },
    {
      rapper: "bowwow",
      hint: "Dog sounds"
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
let display = true;

const winAudio = new Audio("./audio/win-audio.mp3");
const loseAudio = new Audio("./audio/lose-audio.mp3");

function startScreen() {
  container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);
  displayedGuess = document.createElement("p");
  displayedGuess.classList.add("displayedGuess");
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

startScreen();

function startGame() {
  container.removeChild(gameTitle);
  container.removeChild(startButton);
  container.removeChild(instructionsButton);
  container.removeChild(creatorMessage);
  gameStarted = true;

  if (gameStarted) {
    displayCorrectGuessMessage();
    newWord();
    winAudio.play();
  }
}

function displayInstructions() {
  container.innerHTML = "";
  const instructionsPara = document.createElement("p");
  instructionsPara.innerText = `Welcome to Hip-Hop Hangman! 
    Listen to the sound clues provided and guess the rapper! 
    You are allowed a total of 10 wrong guesses - after which, you lose (unless you have enough coins)! 
    Spend 5 coins to get an audio hint!
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
  winAudio.play();

  ranNum = Math.floor(Math.random() * rappers.length);
  audio = new Audio(`./audio/${rappers[ranNum].rapper}.mp3`);
  audio.currentTime = 0;

  hint = document.createElement("p");
  hint.innerText = rappers[ranNum].hint;

  secretWord = rappers[ranNum].rapper;
  secretWord = secretWord.toLowerCase();
  guess = [];
  for (let i = 0; i < secretWord.length; i++) {
    guess[i] = "_";
  }
  displayedGuess.innerText = guess.join("");
  displayedGuess.style.fontSize = "7rem";

  makeLivesString();

  displayedCoins = document.createElement("p");
  displayedCoins.classList.add("displayed-coins");
  displayedCoins.innerText = `Coins: ${coins}`;

  audioHintButton = document.createElement("button");
  audioHintButton.classList.add("audio-hint-button");
  audioHintButton.innerText = "Get audio hint";

  audioHintButton.addEventListener("click", function() {
    audio.play();
    coins -= 5;
    displayedCoins.innerText = `Coins: ${coins}`;
    container.innerHTML = "";
    refreshDisplayValues();
    audioHintButton.classList.add("hint-button-fade-out");
  });

  setTimeout(refreshDisplayValues, 200);

  console.log(rappers);
}

function refreshDisplayValues() {
  container.appendChild(displayedLives);
  container.appendChild(displayedCoins);
  container.appendChild(displayedGuess);
  container.appendChild(hint);
  container.appendChild(audioHintButton);
}

function displayCorrectGuessMessage() {
  const correctGuessMessage = document.createElement("p");
  correctGuessMessage.style.fontSize = "10rem";
  correctGuessMessage.innerText = "YEAH";
  container.appendChild(correctGuessMessage);
  setTimeout(function() {
    container.removeChild(correctGuessMessage);
  }, 200);
}

function displayWrongGuessMessage() {
  const wrongGuessMessage = document.createElement("p");
  wrongGuessMessage.style.fontSize = "10rem";
  wrongGuessMessage.innerText = `WRONG
                                Lives left: ${livesLeft}
                                `;

  container.appendChild(wrongGuessMessage);

  if (displayedLives.parentNode === container) {
    container.removeChild(displayedLives);
    container.removeChild(displayedCoins);
    container.removeChild(displayedGuess);
    container.removeChild(hint);
    container.removeChild(audioHintButton);
  }

  if (livesLeft !== 0) {
    if (wrongGuessMessage.parentNode === container) {
      setTimeout(function() {
        container.appendChild(displayedLives);
        container.appendChild(displayedCoins);
        container.removeChild(wrongGuessMessage);
        container.appendChild(displayedGuess);
        container.appendChild(hint);
        container.appendChild(audioHintButton);
      }, 500);
    }
  }
}

function makeLivesString() {
  livesString = "Lives left: ";
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

  populateRappersArray();
  newWord();
}

document.addEventListener("keypress", function(e) {
  if (gameStarted) {
    let enteredKey = e.key.toLowerCase();
    if (livesLeft > 0) {
      gameStarted = true;
      if (secretWord.includes(enteredKey) && gameStarted) {
        for (let i = 0; i < secretWord.length; i++) {
          console.log(secretWord);
          if (secretWord[i] === enteredKey && !guess[i].includes(enteredKey)) {
            guess[i] = secretWord[i];
            let word = guess.join("");
            console.log(word);
            displayedGuess.innerText = word;
          } else if (
            secretWord[i] === enteredKey &&
            guess[i].includes(enteredKey)
          ) {
            console.log("you've already guessed that");
          }
          if (secretWord === guess.join("")) {
            audio.pause();
            rappers.splice(ranNum, 1);
            gameStarted = false;
            correctGuesses++;
            coins += 5;
            console.log(correctGuesses);
            container.removeChild(displayedLives);
            container.removeChild(displayedCoins);
            container.removeChild(displayedGuess);
            container.removeChild(hint);
            container.removeChild(audioHintButton);
            displayCorrectGuessMessage();
            newWord();
          }
          if (correctGuesses === rappers.length) {
            console.log("OMG U WIN"); // implement win condition
          }
        }
      } else {
        livesLeft--;
        loseAudio.play();
        displayWrongGuessMessage();
        makeLivesString();
      }
    }
    if (livesLeft === 0 && coins >= 10) {
      container.innerText = "";
      const buyBackMessage = document.createElement("p");
      buyBackMessage.innerText = `You have ${coins} coins. Would you like to buy a life for 10 coins?`;
      container.appendChild(buyBackMessage);
      const buyBackButton = document.createElement("button");
      buyBackButton.classList.add("buy-back-button");
      buyBackButton.innerText = "Buy back";
      container.appendChild(buyBackButton);
      buyBackButton.addEventListener("click", buyBack);
    }
    if (livesLeft === 0 && coins < 10) {
      gameStarted = false;

      container.innerText = "";
      const loseMessage = document.createElement("p");
      loseMessage.innerText = `You lose! 
      Correct guesses: ${correctGuesses}`;
      container.appendChild(loseMessage);

      const retryButton = document.createElement("button");
      retryButton.classList.add("retry-button");
      retryButton.innerText = "Retry?";
      container.appendChild(retryButton);
      retryButton.addEventListener("click", function() {
        document.body.innerHTML = "";
        coins = 0;
        livesLeft = 10;
        winAudio.play();
        startScreen();
      });
    }
  }
});
