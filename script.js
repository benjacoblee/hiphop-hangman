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
    hint: "B*tch don't kill my vibe"
  },
  {
    rapper: "andre3000",
    hint: "From Outkast"
  },
  { rapper: "jayz", hint: "Yonce's husband" }
];

let secretWord;
let audio;
let hint;
let guess = [];
let coins = 0; // 10 coins to buy back 1 life
let livesLeft = 10;
let gameStarted = false;

let container;
let startButton;
let gameTitle;
let displayedGuess;
let instructionsButton;
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

  startButton.addEventListener("click", startGame);
  instructionsButton.addEventListener("click", displayInstructions);
}
startScreen();

let display = true;

const winAudio = new Audio("./audio/win-audio.mp3");
const loseAudio = new Audio("./audio/lose-audio.mp3");

function newWord() {
  gameStarted = true;
  winAudio.play();

  let ranNum = Math.floor(Math.random() * rappers.length);
  audio = new Audio(`./audio/${rappers[ranNum].rapper}.mp3`);

  hint = rappers[ranNum].hint;
  console.log(hint);

  secretWord = rappers[ranNum].rapper;
  secretWord = secretWord.toLowerCase();
  guess = [];
  for (let i = 0; i < secretWord.length; i++) {
    guess[i] = "_";
  }
  displayedGuess.innerText = guess.join("");

  setTimeout(function() {
    container.appendChild(displayedGuess);
    audio.play();
  }, 2000);
}

function displayCorrectGuessMessage() {
  const correctGuessMessage = document.createElement("p");
  correctGuessMessage.innerText = "YEYAH";
  container.appendChild(correctGuessMessage);
  setTimeout(function() {
    container.removeChild(correctGuessMessage);
  }, 1000);
}

function displayWrongGuessMessage() {
  const wrongGuessMessage = document.createElement("p");
  wrongGuessMessage.innerText = `WRONG
                                Lives left: ${livesLeft}
                                Hint: ${hint}`;

  container.removeChild(displayedGuess);
  container.appendChild(wrongGuessMessage);
  setTimeout(function() {
    container.removeChild(wrongGuessMessage);
    container.appendChild(displayedGuess);
  }, 1000);
}

function startGame(e) {
  container.removeChild(gameTitle);
  container.removeChild(startButton);
  container.removeChild(instructionsButton);
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
            coins++;
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
            container.removeChild(displayedGuess);
            displayCorrectGuessMessage();
            newWord();
          }
        }
      } else {
        livesLeft--;
        loseAudio.play();
        displayWrongGuessMessage();
        console.log(`WRONG! Lives left ${livesLeft}`);
      }
      if (livesLeft === 0 && coins > 0) {
        console.log("WRONG!");
        console.log("would you like to buy back?");
      }
    }
  }
});
