/*~~~~~~~~~~~~~~~~~~~~~~~~~~tools landscape create ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
let testElement = document.getElementById('weed-2');
let writeResult = document.getElementById('transform');
let actual = document.getElementById('actual');
writeResult.innerHTML = "scaleX(0.4) scaleY(1) scaleZ(1) rotateX(15deg) rotateY(0deg) rotateZ(0deg) translateX(-65px) translateY(-130px) translateZ(0px) skewX(60deg) skewY(35deg)";
actual.innerHTML = "None";
let testing;
let testkey = false;
let sx=0.4, sy=1.2, sz=1, rx=-15, ry=0, rz=0, tx=-110, ty=-125, tz=5, skx=65, sky=40; 

body.addEventListener('keyup', hardtest);
function hardtest (event){
    let key = event.key;
    if(key == ('a')){
        actual.innerHTML = "scale X";
        testing = "sx";
    }
    if(key == ('z')){
        actual.innerHTML = "scale Y";
        testing = "sy";
    }
    if(key == ('e')){
        actual.innerHTML = "scale Z";
        testing = "sz";
    }
    if(key == ('r')){
        actual.innerHTML = "rotation X";
        testing = "rx";
    }
    if(key == ('t')){
        actual.innerHTML = "Rotation Y";
        testing = "ry";
    }
    if(key == ('y')){
        actual.innerHTML = "Rotation Z";
        testing = "rz";
    }
    if(key == ('u')){
        actual.innerHTML = "Translation X";
        testing = "tx";
    }
    if(key == ('i')){
        actual.innerHTML = "Translation Y";
        testing = "ty";
    }
    if(key == ('o')){
        actual.innerHTML = "Translation Z";
        testing = "tz";
    }
    if(key == ('p')){
        actual.innerHTML = "Skew X";
        testing = "skx";
    }
    if(key == ('Dead')){
        actual.innerHTML = "Skew Y";
        testing = "sky";
    }
}

body.addEventListener('keydown', hardtestBegin);
function hardtestBegin (event){
testkey = true;
let key = event.key;
if(testkey == true){
    if (key == ("ArrowUp")){
        if (testing == "sx"){
            sx += 0.1;
        }
        if (testing == "sy"){
            sy += 0.1;
        }
        if (testing == "sz"){
            sz += 0.1;
        }
        if (testing == "rx"){
            rx += 5;
        }
        if (testing == "ry"){
            ry += 5;
        }
        if (testing == "rz"){
            rz += 5;
        }
        if (testing == "tx"){
            tx += 5;
        }
        if (testing == "ty"){
            ty += 5;
        }
        if (testing == "tz"){
            tz += 5;
        }
        if (testing == "skx"){
            skx += 5;
        }
        if (testing == "sky"){
            sky += 5;
        }
    }
    if (key == ("ArrowDown")){
        if (testing == "sx"){
            sx -= 0.1;
        }
        if (testing == "sy"){
            sy -= 0.1;
        }
        if (testing == "sz"){
            sz -= 0.1;
        }
        if (testing == "rx"){
            rx -= 5;
        }
        if (testing == "ry"){
            ry -= 5;
        }
        if (testing == "rz"){
            rz -= 5;
        }
        if (testing == "tx"){
            tx -= 5;
        }
        if (testing == "ty"){
            ty -= 5;
        }
        if (testing == "tz"){
            tz -= 5;
        }
        if (testing == "skx"){
            skx -= 5;
        }
        if (testing == "sky"){
            sky -= 5;
        }
    }
}
}
body.addEventListener('keyup', hardtestEnd);
function hardtestEnd (event){
    testkey = false
}


let testor = setInterval(testverif, 50);

function testverif(){
 if(testkey == true){
    testElement.style.transform = "scaleX(" + sx + ") scaleY(" + sy + ") scaleZ(" + sz + ") rotateX(" + rx + "deg) rotateY(" + ry + "deg) rotateZ(" + rz + "deg) translateX(" + tx + "px) translateY(" + ty + "px) translateZ(" + tz + "px) skewX(" + skx + "deg) skewY(" + sky + "deg)";
    writeResult.innerHTML = "scaleX(" + sx + ") scaleY(" + sy + ") scaleZ(" + sz + ") rotateX(" + rx + "deg) rotateY(" + ry + "deg) rotateZ(" + rz + "deg) translateX(" + tx + "px) translateY(" + ty + "px) translateZ(" + tz + "px) skewX(" + skx + "deg) skewY(" + sky + "deg)";
}
}