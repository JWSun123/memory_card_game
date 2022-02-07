//3 levels of diffuculties

$(document).ready(()=>{
    $('.easy').on('click',function(){
        $('.hide').hide();
    })
    $('.medium').on('click',function(){
        $('.hide').show();
        $('.hidden').hide();
    })
    $('.hard').on('click',()=>{
        $('.hide').show();
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
    shuffleCards();
    firstFlip = null;
    secondFlip = null;
    flipped = false;
    for (let i = 0; i < front.length; i++){
        front[i].style.display = ""}
    for (let i = 0; i < back.length; i++){
        back[i].style.display = ""}
}

// event listener: shuffle cards everytime the page is reload.
 window.addEventListener("load", shuffleCards)

// event listener: click a card, flip it.
for (let i = 0; i < front.length; i++){
    front[i].addEventListener("click", flip)}

// event listener: reset the game when user clicks START PLAY button.
let button = document.getElementById("startBtn");
button.addEventListener("click", resetGame)
