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

let front = document.querySelectorAll(".front");
for (let i = 0; i < front.length; i++){
    front[i].addEventListener("click", function(){
        front[i].style.display = "none";
    })}