//SCROOLING, APPARITION/DISPARITION DES CHUNKS ET MOUVEMENT

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SCROLLING / AFFICHAGE DES CHUNCK~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//base de la transformation du render-3d et des chunk 
let base3dScroll = "rotateX(45deg) rotateY(0deg) rotateZ(10deg) skewX(-25deg) skewY(10deg)";

let topMove = document.getElementById('top');
let leftMove = document.getElementById('left');
let rightMove = document.getElementById('right');
let bottomMove = document.getElementById('bottom');

//valeur initial du scrolling Ingame et HTML
let position = {
    inGame : {x: 0, y: 0},
    html : {x: 0, y: 0}
}

let XGenLeft, XSupLeft, XGenRight, XSupRight; 
let YGenBot, YSupBot, YGenTop, YSupTop; 

let resetScroll;

let scrollLandWidth1, scrollLandWidth2 = 1260;

let AbsolutYSupBotScroll, AbsolutYGenTopScroll, AbsolutYSupTopScroll;
let AbsolutXGenRightScroll, AbsolutXSupRightScroll, AbsolutXGenLeftScroll, AbsolutXSupLeftScroll;

/*pour faire défiler desbout de chunk plus gros*/
let YSixChunk = false;
let XSixChunk = false;

/*état des touche initial*/
let keyState = { 
    up : false, 
    down : false, 
    left : false, 
    right : false
};
let movingSpeed;

/* vérifie les dimension de largeur du render 3d html, pour le scrolling horizontal */
let BigScrollLand;


function screenSize(){
    let actualScreen = window.screen.width;
    console.log(actualScreen);
    if(actualScreen <= 635){
        XGenLeft = 14;
        XSupLeft = -300;
        
        XGenRight = -48;
        XSupRight = 262;
        
        YGenBot = -93;
        YSupBot = 224;
        
        YGenTop = 45;
        YSupTop = -264; 

        scrollLandWidth1 = 945;
        scrollLandWidth2 = 630;

        AbsolutYSupBotScroll = -82.5;
        AbsolutYGenTopScroll = -247,5;
        AbsolutYSupTopScroll = 56;

        AbsolutXGenRightScroll = 105;
        AbsolutXSupRightScroll = -35;
        AbsolutXGenLeftScroll = -132.5;
        AbsolutXSupLeftScroll = 20;

        resetScroll = 315;
        movingSpeed = 2;
    }
    else{
        XGenLeft = 40;
        XSupLeft = -580;

        XGenRight = -80;
        XSupRight = 555;

        YGenBot = -165;
        YSupBot = 470;

        YGenTop = 115;
        YSupTop = -495;

        scrollLandWidth1 = 1890;
        scrollLandWidth2 = 1260;

        AbsolutYSupBotScroll = -165;
        AbsolutYGenTopScroll = -495;
        AbsolutYSupTopScroll = 112;

        AbsolutXGenRightScroll = 210;
        AbsolutXSupRightScroll = -70;
        AbsolutXGenLeftScroll = -265;
        AbsolutXSupLeftScroll = 40;

        resetScroll = 630;
        movingSpeed = 4;
    }
}
screenSize();



/* changement de la largeur du render 3d en fonction de l'affichage des chunks */
function changeWidthScrollLand(){
    if (BigScrollLand == true){ /*mobile = 945*/ /*laptop = 1890*/
        scrollLand.style.width = scrollLandWidth1 + "px";
        scrollLand.style.maxWidth = scrollLandWidth1 + "px";
        scrollLand.style.minWidth = scrollLandWidth1 + "px";
    }
    else{ /* mobile = 630*/ /*laptop = 1260*/ 
        scrollLand.style.width = scrollLandWidth2 + "px";
        scrollLand.style.maxWidth = scrollLandWidth2 + "px";
        scrollLand.style.minWidth = scrollLandWidth2 + "px";
    }
}

function changementChunk(){
    //if ChunkRepro[] <= 6
    //AXE Y
        //generation ybottom
        if ((position.inGame.y <= YGenBot)&&(actualChunksRepro.length == 4)){
            console.log("test2");
            for( i = 0; i < 2; i++){
                actualChunksRepro.push(chunkID);
                chunkID++
            }
            genActualChunk();
            YGenBot = YGenBot + (-resetScroll); 
            YSupBot = position.inGame.y + (+2);
            YSixChunk = true;
        }
        //suppression ybottom
        if ((position.inGame.y >= YSupBot)&&(actualChunksRepro.length == 6)){
            console.log("test3");
            for(i=0; i<=1; i++){ 
                actualChunksRepro.pop();
            }
            genActualChunk();
            YSupBot = YSupBot + resetScroll;
            YGenBot = position.inGame.y - 2;
            position.html.y = AbsolutYSupBotScroll;
            YSixChunk = false;
        }
        //generation yTop
        if ((position.inGame.y >= YGenTop)&&(actualChunksRepro.length == 4)){
            console.log("test4");
            for( i = 0; i < 2; i++){
                actualChunksRepro.unshift(chunkID);
                chunkID++
            }
            genActualChunk();
            YGenTop = YGenTop + resetScroll;
            YSupTop = position.inGame.y - 2;
            position.html.y = AbsolutYGenTopScroll;
            YSixChunk = true;
        }       
        //suppression ytop
        if ((position.inGame.y <= YSupTop)&&(actualChunksRepro.length == 6)){
            console.log("test");
            for(i=0; i<=1; i++){ 
                actualChunksRepro.shift();
            }
            genActualChunk();
            YSupTop = YSupTop + (-resetScroll);
            YGenTop = position.inGame.y + 2;
            position.html.y = AbsolutYSupTopScroll;
            YSixChunk = false;
        }   
    // AXE X
        //generation xRight
        if ((position.inGame.x <= XGenRight)&&(actualChunksRepro.length == 4)){
            console.log("test5");
            actualChunksRepro.splice(2, 0, chunkID);
            chunkID ++;
            actualChunksRepro.push(chunkID);
            chunkID ++;

            genActualChunk();
            BigScrollLand = true;
            changeWidthScrollLand()
            XGenRight = XGenRight  + (-resetScroll);
            XSupRight = position.inGame.x + 2;
            position.html.x = AbsolutXGenRightScroll;
            XSixChunk = true;
        }
        //suppression xRight
        if ((position.inGame.x >= XSupRight)&&(actualChunksRepro.length == 6)){
            console.log("test6");
            actualChunksRepro.splice(((actualChunksRepro.length/2)-1), 1);
            actualChunksRepro.pop();

            genActualChunk();
            BigScrollLand = false;
            changeWidthScrollLand()
            XSupRight = XSupRight  + resetScroll;
            XGenRight = position.inGame.x - 2;
            position.html.x = AbsolutXSupRightScroll;
            XSixChunk = false;
        }
        //Generation xleft
        if ((position.inGame.x >= XGenLeft)&&(actualChunksRepro.length == 4)){
            console.log("test7");
            chunkID ++;
            actualChunksRepro.splice(((actualChunksRepro.length/2)), 0, chunkID);
            chunkID --;
            actualChunksRepro.unshift(chunkID);
            chunkID += 2;

            genActualChunk();
            BigScrollLand = true;
            changeWidthScrollLand()

            XGenLeft = XGenLeft  + resetScroll;
            XSupLeft = position.inGame.x - 2;
            position.html.x = AbsolutXGenLeftScroll;
            XSixChunk = true;
        }
        //suppression xleft
        if ((position.inGame.x <= XSupLeft)&&(actualChunksRepro.length == 6)){
            console.log("test8");
            actualChunksRepro.splice((actualChunksRepro.length/2), 1);
            actualChunksRepro.shift();

            genActualChunk();
            BigScrollLand = false;
            changeWidthScrollLand()

            XSupLeft = XSupLeft  + (-resetScroll);
            XGenLeft = position.inGame.x + 2;
            position.html.x = AbsolutXSupLeftScroll;
            XSixChunk = false;
        }
    //if ChunkRepro[] >= 6 && XSix||YSix == true
    if((actualChunksRepro.length >= 6)&&(XSixChunk == true)||(YSixChunk == true)){
        //generation YBOT
        if (position.inGame.y <= YGenBot){
            console.log("TEST1");
            for( i = 0; i < 3; i++){
                actualChunksRepro.push(chunkID);
                chunkID++
            }
            genActualChunk();
            YGenBot = YGenBot + (-resetScroll); 
            YSupBot = position.inGame.y + (+3);
        }
        //SUPP YBOT
        if (position.inGame.y >= YSupBot){
            console.log("TEST2");
            for( i = 0; i < 3; i++){ 
                actualChunksRepro.pop();
            }
            genActualChunk();
            YSupBot = YSupBot + resetScroll;
            YGenBot = position.inGame.y - 3;
            position.html.y = AbsolutYSupBotScroll;
        }
        //generation YTOP
        if (position.inGame.y >= YGenTop){
            console.log("TEST3");
            for( i = 0; i < 3; i++){
                actualChunksRepro.unshift(chunkID);
                chunkID++
            }
            genActualChunk();
            YGenTop = YGenTop + resetScroll;
            YSupTop = position.inGame.y - 3;
            position.html.y = AbsolutYGenTopScroll;
        }   
        //SUPP YTOP
        if (position.inGame.y <= YSupTop){
            console.log("TEST4");
            for( i = 0; i < 3; i++){ 
                actualChunksRepro.shift();
            }
            genActualChunk();
            YSupTop = YSupTop + (-resetScroll);
            YGenTop = position.inGame.y + 3;
            position.html.y = AbsolutYSupTopScroll;
        }   
        //generation xRight
        if (position.inGame.x <= XGenRight){
            console.log("TEST5");
            actualChunksRepro.splice(2, 0, chunkID);
            chunkID ++;
            actualChunksRepro.splice(5, 0, chunkID);
            chunkID ++;
            actualChunksRepro.push(chunkID);
            chunkID ++;

            genActualChunk();
            BigScrollLand = true;
            changeWidthScrollLand()
            XGenRight = XGenRight  + (-resetScroll);
            XSupRight = position.inGame.x + 2;
            position.html.x = AbsolutXGenRightScroll;
        }
        //suppression xRight
        if (position.inGame.x >= XSupRight){
            console.log("TEST6");
            actualChunksRepro.splice(2, 1);
            actualChunksRepro.splice(4, 1);
            actualChunksRepro.pop();

            genActualChunk();
            BigScrollLand = false;
            changeWidthScrollLand()
            XSupRight = XSupRight  + resetScroll;
            XGenRight = position.inGame.x - 3;
            position.html.x = AbsolutXSupRightScroll;
        }
        //Generation xleft
        if (position.inGame.x >= XGenLeft){
            console.log("TEST7");
            actualChunksRepro.splice(0, 0, chunkID);
            chunkID ++;
            actualChunksRepro.splice(3, 0, chunkID);
            chunkID ++;
            actualChunksRepro.splice(6, 0, chunkID);
            chunkID ++;

            genActualChunk();
            BigScrollLand = true;
            changeWidthScrollLand()

            XGenLeft = XGenLeft  + resetScroll;
            XSupLeft = position.inGame.x - 3;
            position.html.x = AbsolutXGenLeftScroll;
        }
        //suppression xleft
        if (position.inGame.x <= XSupLeft){
            console.log("TEST8");
            actualChunksRepro.shift();
            actualChunksRepro.splice(2, 1);
            actualChunksRepro.splice(4, 1);

            genActualChunk();
            BigScrollLand = false;
            changeWidthScrollLand()

            XSupLeft = XSupLeft  + (-resetScroll);
            XGenLeft = position.inGame.x + 3;
            position.html.x = AbsolutXSupLeftScroll;
        }            
    }
}

let checkChunk = setInterval(changementChunk, 200);

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~MOUVEMENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//vérification de l'état des touches
function verifControlLoop(){
    if (keyState.up == true){
        position.html.y += movingSpeed;
        position.inGame.y += movingSpeed;
    }
    if (keyState.down == true){
        position.html.y -= movingSpeed;
        position.inGame.y -= movingSpeed;
    }
    if (keyState.left == true){
        position.html.x += movingSpeed;
        position.inGame.x += movingSpeed;
    }
    if (keyState.right == true) {
        position.html.x -= movingSpeed;
        position.inGame.x -= movingSpeed;
    }
    scrollLand.style.transform = base3dScroll + "translate("+ position.html.x + "px, " + position.html.y + "px)";
}
let gameLoop = setInterval(verifControlLoop, 20);

/*écoute du clavier */
body.addEventListener('keydown', move);
function move (event){
  let key = event.key;
  if(key == ('ArrowUp')||('ArrowDown')||('ArrowLeft')||('ArrowRight')||('z')||('s')||('q')||('d')){
    if ((key == 'ArrowUp')||(key == 'z')){
        keyState.up = true;
    }
    if ((key == 'ArrowDown')||(key == 's')){
        keyState.down = true;
    }
    if ((key == 'ArrowLeft')||(key == 'q')){
        keyState.left = true;
    }
    if ((key == 'ArrowRight')||(key == 'd')){
        keyState.right = true;
    }
  }
}

body.addEventListener('keyup', stopMove);
function stopMove (event){
  let key = event.key;
  if(key == ('ArrowUp')||('ArrowDown')||('ArrowLeft')||('ArrowRight')||('z')||('s')||('q')||('d')){
    if ((key == 'ArrowUp')||(key == 'z')){
        keyState.up = false;
    }
    if ((key == 'ArrowDown')||(key == 's')){
        keyState.down = false;
    }
    if ((key == 'ArrowLeft')||(key == 'q')){
        keyState.left = false;
    }
    if ((key == 'ArrowRight')||(key == 'd')){
        keyState.right = false;
    }
  }
}
/*écoute du des bouton de mouvement HTML */
topMove.addEventListener('mousedown', topMoveOn);
function topMoveOn(){
    keyState.up = true;
}
leftMove.addEventListener('mousedown', leftMoveOn);
function leftMoveOn(){
    keyState.left = true;
}
rightMove.addEventListener('mousedown', rightMoveOn);
function rightMoveOn(){
    keyState.right = true;
}
bottomMove.addEventListener('mousedown', bottomMoveOn);
function bottomMoveOn(){
    keyState.down = true;
}
body.addEventListener('mouseup', topMoveOff);
function topMoveOff(){
    keyState.up = false;
    keyState.left = false;
    keyState.right = false;
    keyState.down = false;
}
/*écoute du des bouton de mouvement HTML sur portable */
topMove.addEventListener('touchstart', topMoveOnP);
function topMoveOnP(){
    keyState.up = true;
}
leftMove.addEventListener('touchstart', leftMoveOnP);
function leftMoveOnP(){
    keyState.left = true;
}
rightMove.addEventListener('touchstart', rightMoveOnP);
function rightMoveOnP(){
    keyState.right = true;
}
bottomMove.addEventListener('touchstart', bottomMoveOnP);
function bottomMoveOnP(){
    keyState.down = true;
}
body.addEventListener('touchend', topMoveOffP);
function topMoveOffP(){
    keyState.up = false;
    keyState.left = false;
    keyState.right = false;
    keyState.down = false;
}


