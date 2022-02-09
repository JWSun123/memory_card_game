//Declaration of variable for the timer and counter.
let count = document.getElementById("countHard");
let countNumber = 0;
let countNumberMedium = 0;
let countNumberHard = 0;
let totalCountNumber;
count.innerHTML = countNumberHard;
let timerMinute = document.getElementById("minute");
let timerSecond = document.getElementById("second");
let totalSecond;
let timerStart;
let imgCount = 0;
let level = "hard"; //I set it to hard because when the page load, we see 16 cards
let lvlText = document.getElementById("level");
let storeTimeEasy = document.getElementById("bestEasy");
let storeTimeMedium = document.getElementById("bestMedium");
let storeTimeHard = document.getElementById("bestHard");
// time used to finish the game. Will be displayed in the congrats box.
let finishTime;

//Declaration of variables for the best time.
let previousEasyTime;
let previousMediumTime;
let previousHardTime;

//3 levels of diffuculties. When easy is clicked, cards for medium and hard level will be hidden.
changeLevelName(level);
$(document).ready(()=>{
    $('.easy').on('click',function(){
        level = "easy";
        changeLevelName(level);
        count = document.getElementById("count");
        resetGame();
        resetTimer();
        $('.hide').hide();
        $('.hide').children().hide();
        
    })
    $('.medium').on('click',function(){
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
        level = "hard";
        changeLevelName(level);
        count = document.getElementById("countHard");
        resetGame();
        resetTimer();
        $('.hide').show();
    })
})
// setting variable. front: unflipped card side. back: flipped card side (with different images).
let front = document.querySelectorAll(".front");
let back = document.querySelectorAll(".back");
// need to determine the first and second flip.
let firstFlip;
let secondFlip;
// variable flipped: if there is already a card flipped: true, else: false.
let flipped = false;
let win;
// when the player clicks a card, flip() will be called.
function flip(){
    startGame();
    // hide the front image
    $(this).hide();
    if (!flipped){
        //the user will click on the "front", setting firstFlip to be the younger sibling of "front", which is "back".
        firstFlip = this.nextElementSibling;
        flipped = true;
    }
    else{
        flipped = false;
        // if there is already a card flipped on the board, the secondFlip will be the younger sibling of the "front" of the second flipped card.
        secondFlip = this.nextElementSibling;
        isMatch(firstFlip, secondFlip);
    }
    
}
// if two cards flipped are match, both cards disappear. And if the player wins, the congrats message with show up, with the time and counts.
function disappear(){
    $(firstFlip).hide();
    $(secondFlip).hide();
    if(checkWin()){
        stopTimer();
        // if the player wins, the congrat box will be displayed.
        document.getElementById("congrat").classList.remove("d-none")
        document.getElementById("result").innerText = "You finished the game in " + finishTime + " and you have played " + addCountNumber() + " " + isPlural() + ".";
        document.getElementById("startBtn").innerText = "PLAY AGAIN";
    };
}
// if two cards flipped are not match, both cards unflip.
function unflip(){
    firstFlip.previousElementSibling.style.display = "";
    secondFlip.previousElementSibling.style.display = "";
}
// if the data-value of two cards are the same, it's match.
function isMatch(firstFlip, secondFlip){
    if (firstFlip.getAttribute("data-value") === secondFlip.getAttribute("data-value")){
        // two matched cards will disappear after 300 milliseconds.
        let timerDisappear = setTimeout(disappear, 300)
    }
    else{
        // two unmatched cards will unflip after 300 millisecons.
        let timerUnflip = setTimeout(unflip, 300)
    }
}
// to check if the player wins by check if the display of all cards are none.
function checkWin(){
    win = true;
    for (let i = 0; i < back.length; i++){
        if (back[i].style.display != "none"){
            win = false;
        }
    }
    return win;
}
// a function to shuffle the card randomly
let cardContainers = document.querySelectorAll(".imageContainer")
function shuffleCards(){
    for(let i = 0; i < cardContainers.length; i++){
        let randomNum = Math.floor(Math.random() * 16);
        cardContainers[i].style.order = randomNum;
    }
}

// a function to reset the game
function resetGame(){
    shuffleCards();
    firstFlip = null;
    secondFlip = null;
    flipped = false;
    imgCount = 0; 
    resetTimer();
    document.getElementById("congrat").classList.add("d-none");
    document.getElementById("result").innerText = "";
    document.getElementById("startBtn").innerText = "START PLAY";
    // all cards will display, then some cards will be hidden according to the difficulty level.
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

//function to start the game.
function startGame(){ 
    imgCount++;
    if (imgCount == 1) {
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

// a function to start the timer, stop button shows
function startTimer(){    
    timerStart = setInterval(timer, 1000);
}

function timer(){    
    ++totalSecond;
    timerMinute.innerText = timerLogic(Math.floor(totalSecond / 60));
    timerSecond.innerText = timerLogic(totalSecond % 60);  
}
//Stops timer when you click on <h2>Time</h2>. A function to stop the timer.
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

//A function to store the time for the win pop-up.
function storeTimer(minute, second){
    return minute + ":" + second;
}

//A function to change the name of the level and capitalize its first letter.
function changeLevelName(level){
    level = level.charAt(0).toUpperCase() + level.slice(1);
    lvlText.innerText = level;
}

//A function to change the a word to plural.
function isPlural(){
    if(countNumber > 1) {
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
// a function to resume the timer.
function resumeTimer(){
    let timeStop = storeTimer(timerMinute.innerText, timerSecond.innerText);
    startTimer(parseInt(timeStop[0],10),parseInt(timeStop[1],10));
}

// event listener: shuffle cards everytime the page is reload.
 window.addEventListener("load", shuffleCards)

// event listener: click a card, flip it.
$(front).click(flip);

// event listener: reset the game when user clicks START PLAY button.
let startButton = document.getElementById("startBtn");
startButton.addEventListener("click", resetGame);
startButton.addEventListener("click", startGame);
//event listener: when clicking the title, the page will return to index.html
let pageTitle = document.getElementsByTagName("h1")[0];
pageTitle.addEventListener("click", function(){
    document.location.href="index.html";
});

//pause the game and timer.
$('#stopBtn').on('click',()=>{
    clearInterval(timerStart);
})
//resume the game and timer.
$('#resumeBtn').on('click',()=>{
    resumeTimer();
})

