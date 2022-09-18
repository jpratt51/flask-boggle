// Event handlers

$wordForm.on("submit", async function(e) {
  // Submit new word 
  e.preventDefault();

  let guess = $guessWord.val().toLowerCase();
  $guessWord.val("");
  let highScore = JSON.parse(localStorage.getItem("highScore"));
  resetMsg();

  const response = await axios.get("/guess", {
    params: {
      "guess": guess
    }
  });
  
  if(response.data.result === "ok") {
    if (wordsTried.indexOf(guess) === -1) {
      wordsTried.push(guess);
      points = guess.length;
      score += points;
      setScore();
      if (score > highScore) {
          setHighScore();
      }
      validWordMsg();
      resetMsgTimeout();
    }
    else if (wordsTried.indexOf(guess) !== -1) {
      repeatWordMsg();
      resetMsgTimeout();
    };
  }
  else if (response.data.result === "not-on-board") {
      wordNotFoundMsg();
      resetMsgTimeout();
  }
  else {
      invalidWordMsg();
      resetMsgTimeout();
  }
  displayScores();
  
});

$newGame.on("click", () => {
    // Start new game: increase game count by 1, save final score to session Storage, reset words tried array, and reload page
    gameCount += 1;
    localStorage.setItem('gameCount', gameCount)
    localStorage.setItem(`score${gameCount}`, JSON.stringify(score));
    wordsTried = [];
    location.reload();
})

$resetCounts.on("click", () => {
    // Reset high score and game count and reload page
    localStorage.setItem("gameCount", 0);
    localStorage.setItem("highScore", 0);
    location.reload();
})