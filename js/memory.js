//event listener: click a card, switch to the back image.

let front = document.querySelectorAll(".front");
for (let i = 0; i < front.length; i++){
    front[i].addEventListener("click", function(){
        front[i].style.display = "none";
    })}