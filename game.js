var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


//grabs id of button that was clicked and stores it into the userClickedPattern array. Also passes animation and sound functions
$(".btn").on("click", function() {
  var useChosenColor = $(this).attr('id');
  userClickedPattern.push(useChosenColor);
  playSound(useChosenColor);
  animatePress(useChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

//pressing the a key will trigger the nextSequence function and the game to start
$(document).on("keydown", function(e) {
  if (e.key === "a" && level === 0) {
    nextSequence();
  }
});

//function is call when game starts or user get the right answer
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //grabs the ID of each panel
  var getID = $("#" + randomChosenColor);

  //makes the panels blink
  getID.fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  //changes h1 html to level #
  level++;
  $("#level-title").text("Level " + level);

  //clears the userClickedPattern array so that checkAnswer must always validates the first index of gamePattern array
  userClickedPattern = [];
}

//function is called when user responds incorrectly
function gameOver() {
  level = 0;
  gamePattern = [];

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200)

  $('#level-title').text("Game Over! Press A to restart");
}

//plays .mp3s from sounds folder
function playSound(name) {
  var colorSound = new Audio("sounds/" + name + ".mp3");
  colorSound.play();
}

//creates button animation when after being clicked
function animatePress(currentColor) {
  var clickPanel = $("." + currentColor);
  clickPanel.addClass("pressed");

  setTimeout(function() {
    clickPanel.removeClass("pressed")
  }, 100);
}

//passes the userClickedPatternIndex value and triggers nextSequence function after 1 second
function checkAnswer(currentLevel) {
  /*checks that the value in position 0 inside both gamePattern and userClickedPattern are the same.
  It will then check to see if the length of the arrays are the same. If they are the gamePatterReplay function is executed */
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(gamePatterReplay, 500);
    }
  } else {
    new Audio("sounds/wrong.mp3").play();
    gameOver();
  }
}

//calls each id inside gamepattern array at a delayed time. Creating the illusion of a sequence the player must follow 
function gamePatterReplay() {
  for (var i = 0; i < gamePattern.length; i++) {
    (function(i) {
      setTimeout(function() {
        $('#' + gamePattern[i]).fadeOut(100).fadeIn(100);
        console.log(gamePattern[i]);
      }, 500 * i);
    })(i);
  }
  setTimeout(nextSequence, 500 * i);
}
