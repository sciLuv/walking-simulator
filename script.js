let squarelist = document.querySelectorAll(".content");
let body = document.getElementById("body");
let test = document.getElementById("container");
let place = 0;
let change = 0;

body.addEventListener('keydown', move);
function move(event){
    let key = event.code;
    if (key == "ArrowDown"){
        if ((place != 15)&&(place != 16)&&(place != 17)&&(place != 18)&&(place != 19)){
            squarelist[place].innerHTML = "";
            place += 5;   
            squarelist[place].innerHTML = '<div class="persona"></div>';
        }
    }
    if (key == "ArrowUp"){
        if(place -5 >= 0){
            squarelist[place].innerHTML = "";
            place -= 5; 
            squarelist[place].innerHTML = '<div class="persona"></div>';
        }
    }
    if (key == "ArrowLeft"){
        if ((place != 0)&&(place != 5)&&(place != 10)&&(place != 15)){
            squarelist[place].innerHTML = "";
            place -= 1; 
            squarelist[place].innerHTML = '<div class="persona"></div>';
        }
    }
    if (key == "ArrowRight") {
        if ((place != 4)&&(place != 9)&&(place != 14)&&(place != 19)){
            squarelist[place].innerHTML = "";
            place += 1; console.log(place);
            squarelist[place].innerHTML = '<div class="persona"></div>';
        }
    }
    if (key == "Space") {
        change += 5;
        console.log(change);
        test.style.transform = 'scaleX(1.8) scaleY(1.5) scaleZ(2.1) rotateX(47deg) rotateY(-8deg) rotateZ(28deg) translateX(' + change + 'px) translateY(-1px) translateZ(0px) skewX(-26deg) skewY(10deg)';
    }
}
