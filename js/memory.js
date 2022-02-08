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

//3 levels of diffuculties

$(document).ready(()=>{
    $('.easy').on('click',function(){
        imgCount = 0;
        resetGame();
        resetTimer();
        $('.hide').hide();
        $('.hide').children().hide();
        
    })
    $('.medium').on('click',function(){
        imgCount = 0;
        resetGame();
        resetTimer();
        $('.hide').show();
        $('.hidden').hide();
        $('.hidden').children().hide();
    })
    $('.hard').on('click',()=>{
        imgCount = 0;
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
        checkWin();
    }
    
}
// if two cards flipped are match, both cards disappear.
function disappear(){
    firstFlip.style.display = "none";
    secondFlip.style.display = "none";
    checkWin();
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
    if (win){
        stopTimer();
        document.getElementById("congrat").classList.remove("d-none")
        document.getElementById("result").innerText = "You finish the game in " + finishTime; //TODO : MAKE IT SO IT'S THE STORED TIME
    }
    console.log(win)
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
    document.getElementById("congrat").classList.add("d-none");
    document.getElementById("result").innerText = "";
    for (let i = 0; i < front.length; i++){
        front[i].style.display = ""}
    for (let i = 0; i < back.length; i++){
        back[i].style.display = ""}
}

//function to start the game.
function playGame(){
    imgCount++;
    if (imgCount == 1) {
        ++countNumber;
        count.innerText = countNumber;
        totalSecond = 0;
        timerStart = setInterval(startTimer, 1000);
        resetGame();
    }
}

// a function to start the timer
function startTimer(){    
    if (!win){ 
        ++totalSecond;
        timerMinute.innerText = timerLogic(Math.floor(totalSecond / 60));
        timerSecond.innerText = timerLogic(totalSecond % 60);
    } else {
        console.log("win has been clicked and timer should stop")
        stopTimer();
        
    }
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
startButton.addEventListener("click", playGame);
let againButton = document.getElementById("againBtn");
againButton.addEventListener("click", playGame);


let winBtn = document.querySelector("#winBtn");
winBtn.addEventListener("click", stopTimer);