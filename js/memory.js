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



//event listener: click a card, switch to the back image.

let firstFlip;
let secondFlip;
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
function disappear(){
    firstFlip.style.display = "none";
    secondFlip.style.display = "none";
}
function unflip(){
    firstFlip.previousElementSibling.style.display = "";
    secondFlip.previousElementSibling.style.display = "";
}
function isMatch(firstFlip, secondFlip){
    if (firstFlip.getAttribute("value") === secondFlip.getAttribute("value")){
        let timerDisappear = setTimeout(disappear, 800)
    }
    else{
        let timerUnflip = setTimeout(unflip, 800)
    }
}

let front = document.querySelectorAll(".front");
for (let i = 0; i < front.length; i++){
    front[i].addEventListener("click", flip)}
