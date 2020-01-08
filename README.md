# Hip-Hop Hangman 👐🏼

![](https://media.giphy.com/media/ScZzMlETdv9mg/giphy.gif)

Hip-hop flavored Hangman game. Only for the realest.

## Rules 💸
Objective: to guess the rapper's name given a word hint.

The user starts with 10 lives and 10 coins. 

If the user guesses correctly, the user earns 5 coins. Else if the user guesses incorrectly, the user loses a life. If the word hint was ineffective in helping the user guess, the user has an additional choice of playing an audio clue. This costs 5 coins. When user runs out of lives, the user can buy a life with 10 coins. If the user has 0 lives and less than 10 coins, the game ends.

Now comes with *timer*! If there was no guess, user loses a life.

## Installation Instructions
None

## Technologies Used
HTML, CSS and Javascript.

## Approach Taken
I started by implementing the most basic version of the game - matching the user-entered string with a pre-existing string.
Once this worked, I slowly introduced other elements: audio, CSS styling, buttons, display refreshes, etc. 

Subsequently, I added a timer. Once the timer was working, I split the game's existing functionality into two different modes: normal and speed.

Finally, I added a pause function.

The rest of the time was spent trying to induce errors and fix bugs.

## Motivations
Did not start clearly-defined motivations. However, motivation was quick to arise - as fixing the problem at hand almost always led to another problem. If I had to say, here are some things I've learned:

- Interesting uses for string interpolation
- Learning how to play/pause audio with Javascript
- Some CSS animation
- DOM manipulation methods
- Slight approximation of the order in which code is run
- Use the debugger and step through
- Some use cases for setInterval and setTimeout
- Introduce new elements ONE AT A TIME

And most importantly: to focus on small problems, rather than attempting to tackle the whole (related to point above). 

## Unsolved Problems
- Unsure why new word sometimes refreshes with a letter from the previous word (fixed: needed Boolean to detect if input happened, THEN change guess[i])
- After pausing game, can resume at captured value. Unsure why it reverts to original timer value (not a bug though)
- Uncaught promise: play request interrupted by by call to pause (seems to be a Chrome-specific error)
