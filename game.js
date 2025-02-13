    var userClickedPattern = [];
    var gamePattern = [];
    var buttonColours = ["red", "blue", "green", "yellow"];

    var level = 0;
    var started = false;

    // Detect first keypress to start the game
    $(document).on("keydown", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    });

    function nextSequence() {
    userClickedPattern = []; // Reset user clicks for the round
    level++; // Increase level
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]; // Assign color

    gamePattern.push(randomChosenColour); // Store in game pattern

    // Button animation
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour); // Play sound
    }

    // Detect button clicks
    $(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1); // Pass the last index
    });

    // Function to play sound
    function playSound(name) {
    var audio = new Audio("./" + name + ".mp3");
    audio.play();
    }

    // Function to animate button press
    function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed"); // Add pressed class

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed"); // Remove after 100ms
    }, 100);
    }

    // Function to check user's answer
    function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
        }
    } else {
        console.log("wrong");

        playSound("wrong"); // Play wrong sound

        $("body").addClass("game-over"); // Apply game-over class
        setTimeout(function () {
        $("body").removeClass("game-over"); // Remove after 200ms
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart"); // Update title

        startOver(); // Restart the game
    }
    }

    // Function to restart the game
    function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    }
