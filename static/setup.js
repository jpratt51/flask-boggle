const $guessWord = $("#guess-word");
const $newGame = $("#new-game");
const $scores = $("#scores");
const $resetCounts = $('#reset-count');
const $timer = $('#timer');
const $message = $('#message');
const $wordForm = $('#word-form')
let highScore = 0;
let wordsTried = [];
let score = 0;
let gameCount = 0;
let counter = 60;
let clear;

function displayScores() {
  $scores.text(`Score: ${score}  High Score: ${JSON.parse(localStorage.getItem('highScore'))}  Games Played: ${JSON.parse(localStorage.getItem('gameCount'))}`);
};

displayScores();

function countdown() {
  // Start timer for game
  clear = setInterval(() => {
    $timer.text(`Countdown: ${counter}`)
    counter --
    if (counter === -2) {
      resetTimer();;
    }
}, 1000);
}

countdown();

function resetTimer() {
  // Reset game timer
  clearInterval(clear);
  $timer.text('Out of time!')
}

function disableWordGuess() {
  // Disable guess word input
  setTimeout(() => {
      $guessWord.prop("disabled", true)
    }, 62000);
}

disableWordGuess();


  





