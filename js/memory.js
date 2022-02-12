//Declaration of variable for the timer and counter.
let count = document.getElementById("countHard");
let countNumber = 0;
let countNumberMedium = 0;
let countNumberHard = 0;
let totalCountNumber;

//The counter point to level hard because the initial level is set to "hard".
count.innerHTML = countNumberHard;
let timerMinute = document.getElementById("minute");
let timerSecond = document.getElementById("second");
let totalSecond;
let timerStart;

//Variable to allow count increment.
let allowCount = 0;

//Initial level set to "hard".
let level = "hard"; 
let lvlText = document.getElementById("level");

//Declaration of variables for the best time.
let previousEasyTime;
let previousMediumTime;
let previousHardTime;
let storeTimeEasy = document.getElementById("bestEasy");
let storeTimeMedium = document.getElementById("bestMedium");
let storeTimeHard = document.getElementById("bestHard");

//Time used to finish the game. Will be displayed in the congrats box.
let finishTime;

//Declaration of variable for the pause and resume button.
let hasStarted = false;
let isPaused = false;
let hasResumed = false;

//3 levels of difficulties. When easy is clicked, cards for medium and hard level will be hidden.
changeLevelName(level);
$(document).ready(()=>{
    $('.easy').on('click',function(){
        hasStarted = false;
        level = "easy";
        changeLevelName(level);
        count = document.getElementById("count");
        resetGame();
        resetTimer();
        $('.hide').hide();
        $('.hide').children().hide();
    })
    $('.medium').on('click',function(){
        hasStarted = false;
        level = "medium";
        changeLevelName(level);
        count = document.getElementById("countMedium");
        resetGame();
        resetTimer();
        $('.hide').show();
        $('.hidden').hide();
        $('.hidden').children().hide();
    })
    $('.hard').on('click',()=>{
        hasStarted = false;
        level = "hard";
        changeLevelName(level);
        count = document.getElementById("countHard");
        resetGame();
        resetTimer();
        $('.hide').show();
    })
})

//Setting variable. front: unflipped card side. back: flipped card side (with different images).
let front = document.querySelectorAll(".front");
let back = document.querySelectorAll(".back");

//Need to determine the first and second flip.
let firstFlip;
let secondFlip;

//Variable flipped: if there is already a card flipped: true, else: false.
let flipped = false;
let win;

//When the player clicks a card, flip() will be called.
function flip(){
    startGame();
    //Hide the front image.
    $(this).hide();
    if (!flipped){
        //The user will click on the "front", setting firstFlip to be the younger sibling of "front", which is "back".
        firstFlip = this.nextElementSibling;
        flipped = true;
    }
    else{
        flipped = false;
        //If there is already a card flipped on the board, the secondFlip will be the younger sibling of the "front" of the second flipped card.
        secondFlip = this.nextElementSibling;
        isMatch(firstFlip, secondFlip);
    }
}

//If two cards flipped are match, both cards disappear. And if the player wins, the congrats message with show up, with the time and counts.
function disappear(){
    $(firstFlip).hide();
    $(secondFlip).hide();
    if(checkWin()){
        stopTimer();
        //If the player wins, the congrat box will be displayed.
        document.getElementById("congrat").classList.remove("d-none")
        document.getElementById("result").innerText = "You finished the game in " + finishTime + " and you have played " + addCountNumber() + " " + isPlural() + ".";
        document.getElementById("startBtn").innerText = "PLAY AGAIN";
    };
}

//If two cards flipped are not match, both cards unflip.
function unflip(){
    firstFlip.previousElementSibling.style.display = "";
    secondFlip.previousElementSibling.style.display = "";
}

//If the data-value of two cards are the same, it's match.
function isMatch(firstFlip, secondFlip){
    if (firstFlip.getAttribute("data-value") === secondFlip.getAttribute("data-value")){
        //Two matched cards will disappear after 300 milliseconds.
        let timerDisappear = setTimeout(disappear, 300)
    }
    else{
        //Two unmatched cards will unflip after 300 millisecons.
        let timerUnflip = setTimeout(unflip, 300)
    }
}

//To check if the player wins by check if the display of all cards are none.
function checkWin(){
    win = true;
    for (let i = 0; i < back.length; i++){
        if (back[i].style.display != "none"){
            win = false;
        }
    }
    return win;
}

//A function to shuffle the card randomly.
let cardContainers = document.querySelectorAll(".imageContainer")
function shuffleCards(){
    for(let i = 0; i < cardContainers.length; i++){
        let randomNum = Math.floor(Math.random() * 16);
        cardContainers[i].style.order = randomNum;
    }
}

//A function to reset the game.
function resetGame(){
    $('#stopBtn').removeClass("bgRed").addClass("bgYellow");
    shuffleCards();
    firstFlip = null;
    secondFlip = null;
    flipped = false;
    allowCount = 0; 
    resetTimer();
    document.getElementById("congrat").classList.add("d-none");
    document.getElementById("result").innerText = "";
    document.getElementById("startBtn").innerText = "START";
    //All cards will display, then some cards will be hidden according to the difficulty level.
    $(front).show();
    $(back).show();
    if (level == "easy"){
        $('.hide').hide();
        $('.hide').children().hide();
    }
    else if (level == "medium"){
        $('.hide').show();
        $('.hidden').hide();
        $('.hidden').children().hide();
    }
    else{
        $('.hide').show();
    } 
}

//A function to start the game.
function startGame(){ 
    hasStarted = true;
    allowCount++;
    //The count will only increment if it is equals to 1.
    if (allowCount == 1) {
        //Depending of the id, different count will increment.
        if (count.id == "count"){
            count.innerHTML = ++countNumber;
        } else if (count.id == "countMedium"){
            count.innerHTML = ++countNumberMedium;
        } else if (count.id == "countHard"){
            count.innerHTML = ++countNumberHard;
        }
        totalSecond = 0;
        startTimer();
    }
}

//A function to start the timer.
function startTimer(){    
    timerStart = setInterval(timer, 1000);
}

//Function to increment the time and display it.
function timer(){    
    ++totalSecond;
    timerMinute.innerText = timerLogic(Math.floor(totalSecond / 60));
    timerSecond.innerText = timerLogic(totalSecond % 60);  
}
//A function to stop the timer.
function stopTimer(){
    clearInterval(timerStart);
    finishTime = storeTimer(timerMinute.innerText, timerSecond.innerText);
    bestTime();
}

//function to reset the timer.
function resetTimer(){
    clearInterval(timerStart);
    totalSecond = 0;
    timerMinute.innerText = "00";
    timerSecond.innerText = "00";  
}

// A function to return the correct display of time.
function timerLogic(totalSecond){
            let timer = totalSecond + "";
            if (timer.length < 2) {
                return "0" + timer;
            } else {
                return timer;
            }
        }

//A function to store the time for the win message.
function storeTimer(minute, second){
    return minute + ":" + second;
}

//A function to change the name of the level and capitalize its first letter.
function changeLevelName(level){
    level = level.charAt(0).toUpperCase() + level.slice(1);
    lvlText.innerText = level;
}

//A function to change the word "time" to plural depending on the totalCountNumber.
function isPlural(){
    if(totalCountNumber > 1) {
        return "times";
    } else {
        return "time";
    }
}

//A function to obtain the total count.
function addCountNumber(){
    return totalCountNumber = countNumber + countNumberMedium + countNumberHard;
}

//A function to store the fastest time to finish the game.
function bestTime(){
    if (count.id == "count"){
        //The best time changes only if there was no previous best time recorded or if the previous best time is higher than the current finish time.
        if(!previousEasyTime || previousEasyTime > finishTime){
            storeTimeEasy.innerHTML = finishTime;
            previousEasyTime = finishTime;
        }
    } else if (count.id == "countMedium"){
        if(!previousMediumTime || previousMediumTime > finishTime){
            storeTimeMedium.innerHTML = finishTime;
            previousMediumTime = finishTime;
        }
    } else if (count.id == "countHard"){
        if(!previousHardTime || previousHardTime > finishTime){
            storeTimeHard.innerHTML = finishTime;
            previousHardTime = finishTime;
        }
    }
}

//A function to resume the timer.
function resumeTimer(){
    hasResumed = true;
    let timeStop = storeTimer(timerMinute.innerText, timerSecond.innerText);
    startTimer(parseInt(timeStop[0],10),parseInt(timeStop[1],10));
}

//Event listener: shuffle cards everytime the page is reload.
 window.addEventListener("load", shuffleCards);

//Event listener: click a card, flip it.
$(front).click(flip);

//Event listener: resets the game and starts it when the user clicks on START button.
let startButton = document.getElementById("startBtn");
$(startButton).on("click", ()=>{
    resetGame();
    startGame();
})

//Event listener: when clicking the title, the page will return to index.html.
let pageTitle = document.getElementsByTagName("h1")[0];
pageTitle.addEventListener("click", function(){
    document.location.href="index.html";
});

//Event listener: pause the game and timer when the user clicks on PAUSE button, on the condition that the game has started.
$('#stopBtn').on('click',()=>{
    if (hasStarted){
        isPaused = true;
        hasResumed = false;
        clearInterval(timerStart);
        $(front).off("click",flip);
        $('#stopBtn').removeClass("bgYellow").addClass("bgRed");
        console.log("should remove yellow");
    }
})

//Event listener: resume the game and timer when the user clicks on RESUME button, on the condition that the game is paused.
$('#resumeBtn').on('click',()=>{
    if (isPaused){
        isPaused = false;
        if (!hasResumed) {
            resumeTimer();
            $('#stopBtn').removeClass("bgRed").addClass("bgYellow");
        }        
        $(front).on("click",flip);
    }
})