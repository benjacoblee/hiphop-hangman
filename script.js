const rappers = [
  {
    rapper: "snoop",
    hint: "Similar name to Charlie Brown's pet"
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
    rapper: "andre3000",
    hint: "From Outkast"
  },
  { rapper: "jayz", hint: "Yonce's husband" },
  { rapper: "icecube", hint: "Something you might put in soda" },
  { rapper: "dre", hint: "Not a real doctor" },
  { rapper: "drake", hint: "Used to call me on my" },
  { rapper: "DMX", hint: "Really famous for that Deadpool song" },
  { rapper: "Kanye", hint: "YEEZY" }
];

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
let authorMessage;
let displayedLives;
let displayedCoins;
let displayedGuess;
let audioHintButton;

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

  authorMessage = document.createElement("p");
  authorMessage.classList.add("author-message")
  authorMessage.innerText = "Made with ❤ by Ben Jacob Lee";
  container.appendChild(authorMessage);

  startButton.addEventListener("click", startGame);
  instructionsButton.addEventListener("click", displayInstructions);
}

startScreen();

function startGame() {
  container.removeChild(gameTitle);
  container.removeChild(startButton);
  container.removeChild(instructionsButton);
  container.removeChild(authorMessage);
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
    You are allowed a total of 10 wrong guesses - after which, you lose (unless you have enough coin)! 
    Enter your choice by simply typing on the keyboard. 
    Have fun and keep it real 👐`;
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

  let ranNum = Math.floor(Math.random() * rappers.length);
  audio = new Audio(`./audio/${rappers[ranNum].rapper}.mp3`);

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
  });

  setTimeout(refreshDisplayValues, 2000);
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
  }, 1000);
}

function displayWrongGuessMessage() {
  const wrongGuessMessage = document.createElement("p");
  wrongGuessMessage.style.fontSize = "10rem";
  wrongGuessMessage.innerText = `WRONG
                                Lives left: ${livesLeft}
                                `;

  container.appendChild(wrongGuessMessage);
  container.removeChild(displayedLives);
  container.removeChild(displayedCoins);
  container.removeChild(displayedGuess);
  container.removeChild(hint);
  container.removeChild(audioHintButton);

  if (livesLeft !== 0) {
    setTimeout(function() {
      container.appendChild(displayedLives);
      container.appendChild(displayedCoins);
      container.removeChild(wrongGuessMessage);
      container.appendChild(displayedGuess);
      container.appendChild(hint);
      container.appendChild(audioHintButton);
    }, 1000);
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
