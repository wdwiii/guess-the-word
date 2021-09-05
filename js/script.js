'use strict';

const guessedLetters = document.querySelector('.guessed-letters'); //guessed letters list
const btnGuess = document.querySelector('.guess'); //'Guess!' button
const letterInput = document.querySelector('.letter'); //Input box for letter guesses
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuesses = document.querySelector('span');
const message = document.querySelector('.message'); //message will appear when the player guesses a letter
const btnPlayAgain = document.querySelector('.play-again'); // Button to restart game
let word = 'magnolia'; //Word that needs to be guessed

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
btnGuess.addEventListener('click', e => {
  e.preventDefault();
  const userGuess = letterInput.value;
  console.log(userGuess);
  letterInput.value = '';
});

concealWord(word);
