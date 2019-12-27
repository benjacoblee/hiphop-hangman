const secretWordArray = [
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
    hint: "Also the name of a popular candy"
  },
  {
    rapper: "nas",
    hint: "Placeholder hint"
  },
  {
    rapper: "50cent",
    hint: "Half a dollar"
  },
  {
    rapper: "kendricklamar",
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

function newWord() {
  let ranNum = Math.floor(Math.random() * secretWordArray.length);
  audio = new Audio(`./audio/${secretWordArray[ranNum].rapper}.mp3`);

  // will this work??

  console.log(ranNum);

  console.log(audio);

  let hint = secretWordArray[ranNum].hint;
  console.log(hint);

  secretWord = secretWordArray[ranNum].rapper;
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
  }
});

document.addEventListener("keypress", function(e) {
  let enteredKey = e.key.toLowerCase();
  if (livesLeft > 0) {
    gameStarted = true;
    if (secretWord.includes(enteredKey) && gameStarted) {
      for (let i = 0; i < secretWord.length; i++) {
        console.log(secretWord);
        if (secretWord[i] === e.key && !guess[i].includes(e.key)) {
          guess[i] = secretWord[i];
          let word = guess.join("");
          coins++;
          console.log(word);
          displayedMessage.innerText = word;
        } else if (secretWord[i] === e.key && guess[i].includes(e.key)) {
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
      console.log(`WRONG! Lives left ${livesLeft}`);
    }
    if (livesLeft === 0 && coins > 0) {
      console.log("WRONG!");
      console.log("would you like to buy back?");
    }
  }
});
