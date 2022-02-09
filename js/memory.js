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
changeLevelName(level);
//3 levels of diffuculties

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
// time used to finish the game. 
let finishTime;

let front = document.querySelectorAll(".front");
let back = document.querySelectorAll(".back");
let firstFlip;
let secondFlip;
// variable flipped: if there is already a card flipped: true, else: false.
let flipped = false;
let win;

function flip(){
    startGame();
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
// if two cards flipped are match, both cards disappear. And if the player wins, the congrats message with show up, with the time and counts.
function disappear(){
    firstFlip.style.display = "none";
    secondFlip.style.display = "none";
    if(checkWin()){
        stopTimer();
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
// if the value of two cards are the same, it's match.
function isMatch(firstFlip, secondFlip){
    if (firstFlip.getAttribute("data-value") === secondFlip.getAttribute("data-value")){
        let timerDisappear = setTimeout(disappear, 300)
    }
    else{
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
function startGame(){ 
    imgCount++;
    if (imgCount == 1) {
        if (count.id == "count"){
            count.innerHTML = ++countNumber;
            //++countNumber;
        } else if (count.id == "countMedium"){
            count.innerHTML = ++countNumberMedium;
            //++countNumberMedium;
        } else if (count.id == "countHard"){
            count.innerHTML = ++countNumberHard;
            //++countNumberHard;
        }
        
        //count.innerText = countNumber;
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

// event listener: shuffle cards everytime the page is reload.
 window.addEventListener("load", shuffleCards)

// event listener: click a card, flip it.
$(front).click(flip);

// event listener: reset the game when user clicks START PLAY button.
let startButton = document.getElementById("startBtn");
startButton.addEventListener("click", resetGame);
<<<<<<< HEAD
startButton.addEventListener("click", startGame);



=======
startButton.addEventListener("click", playGame);
let pageTitle = document.getElementsByTagName("h1")[0];
pageTitle.addEventListener("click", function(){
    document.location.href="index.html";
});
>>>>>>> 707eb8e12fc9c30c604bb1262083a1b98bacb1fc
