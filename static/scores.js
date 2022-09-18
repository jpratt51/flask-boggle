// Save scores to local storage

function setScore() {
    // Save score to local storage
    localStorage.setItem('currentScore', score);
};

function setHighScore() {
    // Save high score to local storage
    localStorage.setItem('highScore', score);
};