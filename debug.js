/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DEBUG COMMAND~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
body.addEventListener('keyup', stop);
function stop (event){
    let key = event.key;
    if(key == ('1')){
        clearInterval(gameLoop);
    }
    if(key == ('2')){
    console.log("Y : HTML " + position.html.y + ", INGAME " + position.inGame.y);
    console.log("X : HTML " + position.html.x + ", INGAME" + position.inGame.x);
    }
    if(key == ('3')){
        console.log('DOM scrollLand ');
        console.log(scrollLand.childNodes);
        console.log('tableau représentation chunk (actual repro)');
        console.log(actualChunksRepro);
        console.log('liste des chunk et leurs objets (chunk list)');
        console.log(chunkList);
    }
    if(key == ('4')){
        console.log('X gen');
        console.log('XGenRight ' + XGenRight + ' XGenLeft ' + XGenLeft);
        console.log('XSupRight ' + XSupRight + ' XSupLeft ' + XSupLeft);
        console.log('Y gen');
        console.log('YGenBot ' + YGenBot + ' YGenTop ' + YGenTop);
        console.log('YSupTop ' + YSupTop + ' YSupBot ' + YSupBot);
    }
}
/*~~~~~~~~~~~~~~~~~~~~~~~~~~tools landscape create ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

let testing;
let sx=0, sy=0, sz=0, rx=0, ry=0, rz=0, tx=0, ty=0, tz=0, skx=0, sky=0; 
body.addEventListener('keyup', hardtest);
function hardtest (event){
    let key = event.key;
    if(key == ('e')){
        console.log("scalex");
        testing = "sx";
    }
    if(key == ('r')){
        console.log("scaley");
        testing = "sy";
    }
    if(key == ('t')){
        console.log("scalez");
        testing = "sz";
    }
    if(key == ('y')){
        console.log("rotationx");
        testing = "rx";
    }
    if(key == ('u')){
        console.log("rotationy");
        testing = "ry";
    }
    if(key == ('i')){
        console.log("rotationz");
        testing = "rz";
    }
    if(key == ('o')){
        console.log("translationx");
        testing = "tx";
    }
    if(key == ('p')){
        console.log("translationy");
        testing = "ty";
    }
    if(key == ('m')){
        console.log("translationz");
        testing = "tz";
    }
    if(key == ('l')){
        console.log("skewx");
        testing = "skx";
    }
    if(key == ('k')){
        console.log("skewx");
        testing = "sky";
    }


    if (key == "9"){
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
    if (key == "6"){
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



let testor = setInterval(testverif, 50);

function testverif(){
  //  tree.style.transform = "scaleX(" + sx + ") scaleY(" + sy + ") scaleZ(" + sz + ") rotateX(" + rx + "deg) rotateY(" + ry + "deg) rotateZ(" + rz + "deg) translateX(" + tx + "px) translateY(" + ty + "px) translateZ(" + tz + "px) skewX(" + skx + "deg) skewY(" + sky + "deg)";
}