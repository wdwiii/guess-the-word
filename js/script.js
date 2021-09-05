'use strict';

const guessedLettersContainer = document.querySelector('.guessed-letters'); //guessed letters list
const btnGuess = document.querySelector('.guess'); //'Guess!' button
const letterInput = document.querySelector('.letter'); //Input box for letter guesses
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuesses = document.querySelector('span');
const message = document.querySelector('.message'); //message will appear when the player guesses a letter
const btnPlayAgain = document.querySelector('.play-again'); // Button to restart game
let word = 'magnolia'; //Word that needs to be guessed
const guessedLetters = []; //Letters that have been input by the user

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
  console.log(userGuess);
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
    //message.classList.remove('message--error');
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
    updateWord(guessedLetters);
    console.log(guessedLetters);
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
    console.log(guessedLettersContainer);
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
  console.log(wordArray);
  const revealWordInProgress = [];

  for (let letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWordInProgress.push(letter);
    } else {
      revealWordInProgress.push('●');
    }
  }
  wordInProgress.textContent = revealWordInProgress.join('');
  checkPlayerWin(wordUpper);
};

//Function Notes
//1. Add conditional block: If the text content of the wordInProgress is the same type and value as the wordUpper param:
//2. Add class of .win to message
//3. Modify the innerHTML of message
const checkPlayerWin = wordUpper => {
  if (wordInProgress.textContent === wordUpper) {
    message.classList.add('win');
    message.innerHTML = `<p class="highlight" class="message">You guessed correct the word! Congrats!</p>`;
  }
};

concealWord(word);

/* Commit notes:
- Create a Function to Show the Guessed Letters
- Create a Function to Update the Word in Progress
- Create a Function to Check If the Player Won
 */
