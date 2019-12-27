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

let container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);
let displayedGuess = document.createElement("p");
displayedGuess.classList.add("displayedGuess");

let winAudio = new Audio("./audio/win-audio.mp3");
let loseAudio = new Audio("./audio/lose-audio.mp3");

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
  correctGuessMessage.style.fontSize = "10rem";
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
  wrongGuessMessage.style.fontSize = "10rem";
  container.removeChild(displayedGuess);
  container.appendChild(wrongGuessMessage);
  setTimeout(function() {
    container.removeChild(wrongGuessMessage);
    container.appendChild(displayedGuess);
  }, 1000);
}

// Create start message
let startMessage = document.createElement("h1");
startMessage.innerText = "Click to start";
container.appendChild(startMessage);
let display = true;

// Blinking effect
setInterval(function() {
  if (display) {
    startMessage.style.display = "none";
    display = false;
  } else if (!display) {
    startMessage.style.display = "block";
    display = true;
  }
}, 1000);

// Removes start message upon click
startMessage.addEventListener("click", function() {
  container.removeChild(startMessage);
  gameStarted = true;

  if (gameStarted) {
    newWord();
    winAudio.play();
  }
});

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
