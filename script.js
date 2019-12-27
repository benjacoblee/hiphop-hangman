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
let guess = [];
let coins = 0;
let livesLeft = 10;
let gameStarted = false;
let displayedMessage = document.createElement("p");
let winAudio;
let loseAudio = new Audio("./audio/lose-audio.mp3");

function newWord() {
  gameStarted = true;

  let ranNum = Math.floor(Math.random() * rappers.length);
  audio = new Audio(`./audio/${rappers[ranNum].rapper}.mp3`);

  let hint = rappers[ranNum].hint;
  console.log(hint);

  winAudio = new Audio(
    `./audio/win-sounds/${Math.floor(Math.random() * 6) + 1}.mp3`
  );
  winAudio.play();

  secretWord = rappers[ranNum].rapper;
  secretWord = secretWord.toLowerCase();
  guess = [];
  for (let i = 0; i < secretWord.length; i++) {
    guess[i] = "_";
  }
  displayedMessage.innerText = guess.join("");

  setTimeout(function() {
    document.body.appendChild(displayedMessage);
    audio.play();
  }, 2000);
}

// Create start message
let startMessage = document.createElement("h1");
startMessage.innerText = "Click to start";
document.body.appendChild(startMessage);
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
  document.body.removeChild(startMessage);
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
            displayedMessage.innerText = word;
          } else if (
            secretWord[i] === enteredKey &&
            guess[i].includes(enteredKey)
          ) {
            console.log("you've already guessed that");
          }
          if (secretWord === guess.join("")) {
            gameStarted = false;
            document.body.removeChild(displayedMessage);
            newWord();
          }
        }
      } else {
        livesLeft--;
        loseAudio.play();
        console.log(`WRONG! Lives left ${livesLeft}`);
      }
      if (livesLeft === 0 && coins > 0) {
        console.log("WRONG!");
        console.log("would you like to buy back?");
      }
    }
  }
});
