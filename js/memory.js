//Declaration of variable for the timer and counter.
let count = document.getElementById("count");
let countNumber = 0;
count.innerHTML = countNumber;
let timerMinute = document.getElementById("minute");
let timerSecond = document.getElementById("second");
let totalSecond = 0;
//let timerWin; // NOT USED YET.
let easyClicked = 0; //TO BE CHANGED
let timerStart;

//3 levels of diffuculties

// Declaration of variable for the pause and resume button
let hasStarted = false;
let isPaused = false;
let hasResumed = false;

//3 levels of diffuculties. When easy is clicked, cards for medium and hard level will be hidden.
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
        //$(front).on("click",flip);
        
        
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
        //$(front).on("click",flip);
        
    })
    $('.hard').on('click',()=>{
        hasStarted = false;
        level = "hard";
        changeLevelName(level);
        count = document.getElementById("countHard");
        resetGame();
        resetTimer();
        $('.hide').show();
        //$(front).on("click",flip);
        
    })
})


let front = document.querySelectorAll(".front");
let back = document.querySelectorAll(".back");
let firstFlip;
let secondFlip;
// variable flipped: if there is already a card flipped: true, else: false.
let flipped = false;

function flip(){
    this.style.display = "none";
    if (!flipped){
        firstFlip = this.nextElementSibling;
        flipped = true;
    }
    else{
        flipped = false;
        secondFlip = this.nextElementSibling;
        isMatch(firstFlip, secondFlip);
    }
}
// if two cards flipped are match, both cards disappear.
function disappear(){
    firstFlip.style.display = "none";
    secondFlip.style.display = "none";
}
// if two cards flipped are not match, both cards unflip.
function unflip(){
    firstFlip.previousElementSibling.style.display = "";
    secondFlip.previousElementSibling.style.display = "";
}
// if the value of two cards are the same, it's match.
function isMatch(firstFlip, secondFlip){
    if (firstFlip.getAttribute("value") === secondFlip.getAttribute("value")){
        let timerDisappear = setTimeout(disappear, 300)
    }
    else{
        let timerUnflip = setTimeout(unflip, 300)
    }
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
    ++countNumber;
    count.innerText = countNumber;
    timerStart = setInterval(startTimer, 1000);
    shuffleCards();
    firstFlip = null;
    secondFlip = null;
    flipped = false;
    for (let i = 0; i < front.length; i++){
        front[i].style.display = ""}
    for (let i = 0; i < back.length; i++){
        back[i].style.display = ""}
}

//function to start the game.
function startGame(){ 
    hasStarted = true;
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

//Stops timer when you click on <h2>Time</h2>. A function to stop the timer.
function stopTimer(){
    easyClicked = 1;
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
    hasResumed = true;
    let timeStop = storeTimer(timerMinute.innerText, timerSecond.innerText);
    startTimer(parseInt(timeStop[0],10),parseInt(timeStop[1],10));
}

// event listener: shuffle cards everytime the page is reload.
 window.addEventListener("load", shuffleCards)

// event listener: click a card, flip it.
//$(front).click(flip);

$(front).on("click",flip);

// event listener: reset the game when user clicks START PLAY button.
let startButton = document.getElementById("startBtn");
//startButton.addEventListener("click", resetGame);
//startButton.addEventListener("click", startGame);
$(startButton).on("click", ()=>{
    //$(front).on("click",flip);
    resetGame();
    startGame();
})
//event listener: when clicking the title, the page will return to index.html
let pageTitle = document.getElementsByTagName("h1")[0];
pageTitle.addEventListener("click", function(){
    document.location.href="index.html";
});

//pause the game and timer on the condition that the game has started.
    $('#stopBtn').on('click',()=>{
        if (hasStarted){
            isPaused = true;
            hasResumed = false;
            clearInterval(timerStart);
        
            $(front).off("click",flip);
        }
    })

//resume the game and timer on the condition that the game is paused.
    $('#resumeBtn').on('click',()=>{
        if (isPaused){
            isPaused = false;
            if (!hasResumed) {
                resumeTimer();
            }        
            $(front).on("click",flip);
        }
    })
