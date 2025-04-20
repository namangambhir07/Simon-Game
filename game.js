// 1) empty array with name userClickedPattern
var userClickedPattern = [];

// 2) adding the random chosen colour to the below array
var gamePattern = [];

// 3) creating a array with button colours
var buttonColours = ["red","blue","green","yellow"];

// 4) Crating a function which generates random Number between 0-3
function nextSequence(){
    userClickedPattern = [];
var randomNumber = Math.floor(Math.random() * 4);

// 5) making the random number that is generated to chose a colour from the above array
var randomChosenColour = buttonColours[randomNumber];

// 6) adding the random colour chosen to the above empty array
gamePattern.push(randomChosenColour);

// 7) using jQuery to select the button with id randomChosenColour and make it annimate
$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
 
// 8) adding sound to the randomColourChosen
var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
audio.play();

// 9) playSound(randomChosenColour);

level++;
$("#level-title").text("Level " + level);
}

// 10) to detect which button is clicked and gets it id attribute
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");

// 11) adding above userchosenColour to the above empty array
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    console.log(userClickedPattern);
    // 19) Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
})

// 12) creating a function to make sound and then refactoring the above code
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
audio.play();
}

// 13) adding animations to the user click 
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

// 14) removing the animation 
setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// 15) detecting a keypress using jQuery
$(document).on("keypress",function(){
    if(!started){
    $("#level-title").text("Level  " + level);
    nextSequence();
    started = true;
    }
});

// 16) Creating a point to start the game
var started = false;

// 17) Starting with a Level
var level = 0;

// 18) creating fucntion for checking the answer 
function checkAnswer(currentLevel){
// 20) Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

// 21) If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

// 22) Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
// 23) if the user selects the wrong colour then this happens
    } else {
      console.log("wrong");
      var audio = new Audio("./sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
// 24) Timeout colour for red to appear and flash in the game after a wrong colour is picked
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
// 25) gameover and then calling the startOver function to restart the game from the beginning
      $("h1").text("Game Over Press any Key to Restart!");
      startOver();
}
// 26) Creating a startover function so that after getting a wrong answer the user can restart the game without refreshing the page
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
}

