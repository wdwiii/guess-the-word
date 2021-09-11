'use strict';

let playing;
const guessedLettersContainer = document.querySelector('.guessed-letters'); //guessed letters list
const btnGuess = document.querySelector('.guess'); //'Guess!' button
const btnPlayAgain = document.querySelector('.play-again'); // Button to restart game
const letterInput = document.querySelector('.letter'); //Input box for letter guesses
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuesses = document.querySelector('.remaining');
const message = document.querySelector('.message'); //message will appear when the player guesses a letter
const picture = document.querySelector('.picture'); //Div that contains photo that will appear when the game is over
let word = 'allotment'; //Word that needs to be guessed (default)
let guessedLetters = []; //Letters that have been input by the user
let remainingGuessesNumber = 8;
let guessesSpan = document.querySelector('span');
guessesSpan.textContent = `${remainingGuessesNumber} guesses`;

//Function Notes
//1. Declare async function for fetching data
//2. Fetch data from a file at provided address
//3. Split txt data by the newline delimiter ('\n')
//4.Delcare variable for parsed data
//5. Declare variable to generate random number
//6. Reassgin word var to be a word from wordsArray at a random index
//6a. Remove any whitespace from the word by using the .trim() method
//7. Call the concealWord function with a value of word
const getWord = async function () {
  const wordData = await fetch(
    'https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt'
  );
  const words = await wordData.text();
  const wordsArray = words.split('\n');
  const randomIndex = Math.floor(Math.random() * wordsArray.length);
  word = wordsArray[randomIndex].trim();
  console.log(word);
  concealWord(word);
};
getWord();

//Function Notes
//1. Create function with a param of 'word'
//2. Declare dots woth a value of an empty array
//3. Loop through every letter of the word
//4. For each letter push '●' to dots array
//5. Join a\dots array items back to a string using the .join("") method.
const concealWord = word => {
  let placeHolders = [];
  for (let letter of word) {
    placeHolders.push('●');
  }
  wordInProgress.textContent = placeHolders.join('');
};

//Function Notes
//1. When guess button is clicked, prevnt default action (submit) from occuring
//2. Declare variable that stores the value of the user input
//3. Clear the value to the input
//4. Call the validateInput function with a param of userGuess
//5. If the validation returns a letter, pass it as an argument to the makeGuess function
btnGuess.addEventListener('click', e => {
  e.preventDefault();
  const userGuess = letterInput.value;
  letterInput.value = '';
  validateInput(userGuess);
  if (validateInput(userGuess)) makeGuess(userGuess);
});

//Function Notes
//1. Declare variarible that ensures the play inputs a letter
//2. Use conditional blocks to check input and output the proper message
//2a. If user inputs more than one character
//2b. If user guess is an empty string or does not match the accepted letter sequence
//2c. If all the other conditions aren’t met, the input is a letter. Return userGuess
const validateInput = userGuess => {
  const acceptedLetter = /[a-zA-Z]/;
  if (userGuess.length > 1) {
    message.textContent = `Please enter only 1 letter`;
    message.classList.add('message--error');
  } else if (userGuess === '' || !userGuess.match(acceptedLetter)) {
    message.classList.add('message--error');
    message.textContent = `Please enter a letter from A - Z.`;
  } else {
    message.textContent = '';
    return userGuess;
  }
};

//Function Notes
//1. Function takes a param of a letter (userGuess)
//2. Convert the userGuess to upper case
//3. If the userGuess is already included in the guessedLetters array, display message
//4. Else, push the userGuess to the array and log the guessedLetters array
const makeGuess = userGuess => {
  userGuess = userGuess.toUpperCase();
  if (guessedLetters.includes(userGuess)) {
    message.textContent = `You have already guessed the letter ${userGuess}. Try again`;
    message.classList.add('message--error');
  } else {
    guessedLetters.push(userGuess);
    showGuessedLetters(userGuess);
    countGuesses(userGuess);
    updateWord(guessedLetters);
  }
};

//Function Notes
//1. Create list item for each array item in the guessedLetters array
//2. Set the text content of list itemt o the userGuess
//3. Append that list item to the guessedLettersContainer
const showGuessedLetters = userGuess => {
  //guessedLettersContainer.innerHTML = '';
  let li = document.createElement('li');
  guessedLetters.forEach(userGuess => {
    li.textContent = userGuess;
    guessedLettersContainer.append(li);
  });
};

//Function Notes
//1. Pass the function a param of the guessed letters array
//2. Declare variable to change the word to upper case
//3. Declare variable to split wordUpper into an array
//4. Declare an empty arraty to hold the word with revealed letters
//5. For each letter in the wordArray:
//5a. If letter is correctly guessed, push the letter to the revealWordInProgress array
//5b. If the letter is incorrectly guessed, push '●' to the revealWordInProgress array
//6. Change text content of wordInProgress to revealWordInProgress as a string
//7. Call the checkPlayerWin function with a param of wordUpper

const updateWord = guessedLetters => {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split('');
  const revealWordInProgress = [];

  if (playing) {
    for (let letter of wordArray) {
      if (guessedLetters.includes(letter)) {
        revealWordInProgress.push(letter);
      } else {
        revealWordInProgress.push('●');
      }
      wordInProgress.textContent = revealWordInProgress.join('');
      checkPlayerWin(wordUpper);
    }
  } else {
    for (let letter of wordArray) {
      revealWordInProgress.push(letter);
    }
  }
};

//Function Notes
//1. Remove the red text styling fprm meessage
//2. Change the word to uppercase
//3. Declare a variable will split the word into an array of letters
//4. Conditionals:
//4a. If guess is incorrect, display message and decrease remaingGuessNumber by 1, update the text content of the span
//4b. If guesses remaining is equal to 1, display a message
//4c. If guesses remaining is equal to 0, display a 'you lose' message
const countGuesses = guess => {
  message.classList.remove('message--error');
  word = word.toUpperCase();
  let wordArray = word.split('');
  if (!wordArray.includes(guess)) {
    message.textContent = `The letter ${guess} is NOT apart of the word.`;
    remainingGuessesNumber--;
    guessesSpan.textContent = `${remainingGuessesNumber} guesses`;
    if (remainingGuessesNumber === 1) {
      guessesSpan.textContent = `1 guess`;
    } else if (remainingGuessesNumber === 0) {
      playing = false;
      const remainingMessage = document.querySelector('.remaining');
      remainingMessage.classList.add('hide');
      endGame();
      picture.style.backgroundImage = 'url("img/not-a-winner.png")';
      loserRevealWord(word);
    }
  } else {
    message.textContent = `The word does include the letter ${guess}`;
  }
};

const loserRevealWord = word => {
  wordInProgress.textContent = word;
};

//Function Notes
//1. Add conditional block: If the text content of the wordInProgress is the same type and value as the wordUpper param:
//2. Add class of .win to message
//3. Modify the innerHTML of message
const checkPlayerWin = wordUpper => {
  if (wordInProgress.textContent === wordUpper) {
    message.classList.add('win');
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    remainingGuesses.classList.add('hide');
    endGame();
    picture.style.backgroundImage = 'url("img/trophy.png")';
  }
};

//Function Notes
//1. Hide the .guessed-letters ul, 'type one letter' label, input box and guess button
//2. Display 'play again' button and picture
const endGame = () => {
  playing = false;
  guessedLettersContainer.classList.add('hide');
  letterInput.classList.add('hide');
  document.querySelector('label').classList.add('hide');
  btnGuess.classList.add('hide');
  btnPlayAgain.classList.remove('hide');
  picture.classList.remove('hide');
};

btnPlayAgain.addEventListener('click', function () {
  playing = true;

  resetGame();
});

const mainMenu = document.querySelector('.main-menu');
const gameScreen = document.querySelector('.container');
const aboutScreen = document.querySelector('.about-screen');
const btnQuickPlay = document.querySelector('.quick-play');
const btnAbout = document.querySelector('.about');
const btnBack = document.querySelectorAll('.back-button');
const overlay = document.querySelector('.overlay');
const btnYes = document.querySelector('.btn-yes');
const btnNo = document.querySelector('.btn-no');

//When quick play is clicked, game starts
btnQuickPlay.addEventListener('click', function () {
  playing = true;
  mainMenu.classList.add('hide');
  mainMenu.classList.remove('flex');
  gameScreen.classList.remove('hide');
});

btnAbout.addEventListener('click', function () {
  mainMenu.classList.add('hide');
  mainMenu.classList.remove('flex');
  aboutScreen.classList.remove('hide');
  aboutScreen.classList.add('flex');
});

//Function Notes
//1. Loop through each button in the btnback object and add a click handler
//2. Remove the 'hide' class and add 'flex' class to mainMenu
//3. Add conditional statement:
// If settings is showing add the hide class. Else:
//4. Confirm that player wants to quit with overlay 'Yes or No'
//5. Call conditional to determine next action
//5a. If yes, call resetGame function
//5b. If no, hide overlay
for (let button of btnBack) {
  button.addEventListener('click', function () {
    if (!aboutScreen.classList.contains('hide')) {
      aboutScreen.classList.add('hide');
      aboutScreen.classList.remove('flex');
      mainMenu.classList.remove('hide');
      mainMenu.classList.add('flex');
    } else if (!gameScreen.classList.contains('hide') && playing === false) {
      mainMenu.classList.remove('hide');
      mainMenu.classList.add('flex');
      gameScreen.classList.add('hide');
      resetGame();
    } else {
      overlay.classList.remove('hide');
      overlay.classList.add('flex');
    }
  });
}

//If the yes button is clicked, hide gamescreen, show the menu and restart game
btnYes.addEventListener('click', function () {
  playing = false;
  gameScreen.classList.add('hide');
  mainMenu.classList.remove('hide');
  mainMenu.classList.add('flex');
  overlay.classList.remove('flex');
  overlay.classList.add('hide');
  resetGame();
});

//If the no button is clicked, close the overlay
btnNo.addEventListener('click', function () {
  overlay.classList.remove('flex');
  overlay.classList.add('hide');
});

//Function Notes
//1. Empty the message text content
//2. Empty the innerHTML of the guessed letters list
//3. Empty the guessedLetters Array
//4. Reset the remaing guesses number
//5. Reset the text of the guesses span to show the correct number of guesses remaining
//6. Run the getWord function to prepare a new game
const resetGame = () => {
  message.textContent = '';
  guessedLettersContainer.innerHTML = '';
  guessedLetters = [];
  remainingGuessesNumber = 8;
  guessesSpan.textContent = `${remainingGuessesNumber} guesses`;
  if (message.classList.contains('win')) message.classList.remove('win');

  guessedLettersContainer.classList.remove('hide');
  letterInput.classList.remove('hide');
  document.querySelector('label').classList.remove('hide');
  btnGuess.classList.remove('hide');
  btnPlayAgain.classList.add('hide');
  picture.classList.add('hide');
  remainingGuesses.classList.remove('hide');
  getWord();
};
concealWord(word);

/* Commit notes:
- Create a Function to Hide and Show Elements
- Add a Click Event to the Play Again Button
 */
