//Declaration of variable for the timer and counter.
let count = document.getElementById("count");
let countNumber = 0;
count.innerHTML = countNumber;
let timerMinute = document.getElementById("minute");
let timerSecond = document.getElementById("second");
let totalSecond;
//let timerWin; // NOT USED YET.
let timerStart;
let imgCount = 0;
let level;
//3 levels of diffuculties

$(document).ready(()=>{
    $('.easy').on('click',function(){
        level = "easy";
        resetGame();
        resetTimer();
        $('.hide').hide();
        $('.hide').children().hide();
        
    })
    $('.medium').on('click',function(){
        level = "medium"
        resetGame();
        resetTimer();
        $('.hide').show();
        $('.hidden').hide();
        $('.hidden').children().hide();
    })
    $('.hard').on('click',()=>{
        level = "hard";
        resetGame();
        resetTimer();
        $('.hide').show();
    })
})
// time used to finish the game. --feel free to change.
let finishTime;

let front = document.querySelectorAll(".front");
let back = document.querySelectorAll(".back");
let firstFlip;
let secondFlip;
// variable flipped: if there is already a card flipped: true, else: false.
let flipped = false;
let win;

function flip(){
    playGame();
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
    if(checkWin()){
        stopTimer();
        document.getElementById("congrat").classList.remove("d-none")
        document.getElementById("result").innerText = "You finish the game in " + finishTime; //TODO : MAKE IT SO IT'S THE STORED TIME
        document.getElementById("startBtn").innerText = "PLAY AGAIN";
    };
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
    
    for (let i = 0; i < front.length; i++){
        front[i].style.display = ""}
    for (let i = 0; i < back.length; i++){
        back[i].style.display = ""}

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
function playGame(){ 
    imgCount++;
    if (imgCount == 1) {
        ++countNumber;
        count.innerText = countNumber;
        totalSecond = 0;
        startTimer();
    }
}

// a function to start the timer
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
    return minute + " : " + second;
}

// event listener: shuffle cards everytime the page is reload.
 window.addEventListener("load", shuffleCards)

// event listener: click a card, flip it.
for (let i = 0; i < front.length; i++){
    front[i].addEventListener("click", flip)}

// event listener: reset the game when user clicks START PLAY button.
let startButton = document.getElementById("startBtn");
startButton.addEventListener("click", resetGame);


let winBtn = document.querySelector("#winBtn");
winBtn.addEventListener("click", stopTimer);