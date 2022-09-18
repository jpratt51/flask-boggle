// Message functions for form

function validWordMsg() {
    // Display message for valid word entry
    $message.text(`Word Found! Gained ${points} points!`).addClass("valid");
  };

function resetMsgTimeout() {
// Set timer to reset message
setTimeout(resetMsg, 1500);
};

resetMsg = (function reset() {
// Clear message container
  $message.html("<br>").removeClass("valid invalid")
})

function repeatWordMsg() {
// Display error message for repeat word 
$message.text(`Word Already Found!`).addClass("invalid");
}

function wordNotFoundMsg() {
// Display error message for word in dictionary but not on board
$message.text(`Word Not Found`).addClass("invalid");
};

function invalidWordMsg() {
// Display error message for input not in dictionary
$message.text(`Invalid Entry`).addClass("invalid");
};