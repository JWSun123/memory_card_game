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

$(document).ready(()=>{
    $('.easy').on('click',function(){
        resetGame();
        $('.hide').hide();
        $('.hide').children().hide();
    })
    $('.medium').on('click',function(){
        resetGame();
        $('.hide').show();
        $('.hidden').hide();
        $('.hidden').children().hide();
    })
    $('.hard').on('click',()=>{
        resetGame();
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
        document.getElementById("congrat").classList.remove("d-none")
        document.getElementById("result").innerText = "You finish the game in " + finishTime;
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
    ++countNumber;
    count.innerText = countNumber;
    timerStart = setInterval(startTimer, 1000);
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

// a function to start the timer
function startTimer(){
    if (easyClicked == 0){
        ++totalSecond;
        timerMinute.innerText = timerLogic(Math.floor(totalSecond / 60));
        timerSecond.innerText = timerLogic(totalSecond % 60);
    } else {
        console.log("easy has been clicked and timer should stop")
        clearInterval(timerStart);
        storeTimer(timerMinute.innerText, timerSecond.innerText);
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
    console.log(minute + " : " + second);
}

// event listener: shuffle cards everytime the page is reload.
 window.addEventListener("load", shuffleCards)

// event listener: click a card, flip it.
for (let i = 0; i < front.length; i++){
    front[i].addEventListener("click", flip)}

// event listener: reset the game when user clicks START PLAY button.
let button = document.getElementById("startBtn");
button.addEventListener("click", resetGame)
let easyBtn = document.querySelector("#time");
easyBtn.addEventListener("click", stopTimer);
