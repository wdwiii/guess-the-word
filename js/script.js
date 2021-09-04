'use strict';

const guessedLetters = document.querySelector('.guessed-letters'); //guessed letters list
const btnGuess = document.querySelector('.guess'); //'Guess!' button
const letterInput = document.querySelector('.letter'); //Input box for letter guesses
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuesses = document.querySelector('span');
const message = document.querySelector('.message'); //message will appear when the player guesses a letter
const btnPlayAgain = document.querySelector('.play-again'); // Button to restart game
const word = 'magnolia'; //Word that needs to be guessed
