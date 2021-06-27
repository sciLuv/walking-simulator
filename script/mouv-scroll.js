//SCROOLING, APPARITION/DISPARITION DES CHUNKS ET MOUVEMENT

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SCROLLING / AFFICHAGE DES CHUNCK~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//base de la transformation du render-3d et des chunk 
let base3dScroll = "rotateX(45deg) rotateY(0deg) rotateZ(10deg) skewX(-25deg) skewY(10deg)";

//valeur initial du scrolling Ingame et HTML
let position = {
    inGame : {x: 0, y: 0},
    html : {x: 0, y: 0}
}

let XGenLeft = 40;
let XSupLeft = -580;

let XGenRight = -80;
let XSupRight = 555;

let YGenBot = -165;
let YSupBot = 470;

let YGenTop = 115;
let YSupTop = -495;

let resetScroll = 630;

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
let movingSpeed = 4;

/* vérifie les dimension de largeur du render 3d html, pour le scrolling horizontal */
let BigScrollLand;

/* changement de la largeur du render 3d en fonction de l'affichage des chunks */
function changeWidthScrollLand(){
    if (BigScrollLand == true){
        scrollLand.style.width = "1890px";
        scrollLand.style.maxWidth = "1890px";
        scrollLand.style.minWidth = "1890px";
    }
    else{
        scrollLand.style.width = "1260px";
        scrollLand.style.maxWidth = "1260px";
        scrollLand.style.minWidth = "1260px";
    }
}

function changementChunk(){
    //if ChunkRepro[] <= 6
    //AXE Y
        //generation ybottom
        if ((position.inGame.y <= YGenBot)&&(actualChunksRepro.length == 4)){
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
            for(i=0; i<=1; i++){ 
                actualChunksRepro.pop();
            }
            genActualChunk();
            YSupBot = YSupBot + resetScroll;
            YGenBot = position.inGame.y - 2;
            position.html.y = -165;
            YSixChunk = false;
        }
        //generation yTop
        if ((position.inGame.y >= YGenTop)&&(actualChunksRepro.length == 4)){
            for( i = 0; i < 2; i++){
                actualChunksRepro.unshift(chunkID);
                chunkID++
            }
            genActualChunk();
            YGenTop = YGenTop + resetScroll;
            YSupTop = position.inGame.y - 2;
            position.html.y = -495;
            YSixChunk = true;
        }       
        //suppression ytop
        if ((position.inGame.y <= YSupTop)&&(actualChunksRepro.length == 6)){
            for(i=0; i<=1; i++){ 
                actualChunksRepro.shift();
            }
            genActualChunk();
            YSupTop = YSupTop + (-resetScroll);
            YGenTop = position.inGame.y + 2;
            position.html.y = 112;
            YSixChunk = false;
        }   
    // AXE X
        //generation xRight
        if ((position.inGame.x <= XGenRight)&&(actualChunksRepro.length == 4)){
            actualChunksRepro.splice(2, 0, chunkID);
            chunkID ++;
            actualChunksRepro.push(chunkID);
            chunkID ++;

            genActualChunk();
            BigScrollLand = true;
            changeWidthScrollLand()
            XGenRight = XGenRight  + (-resetScroll);
            XSupRight = position.inGame.x + 2;
            position.html.x = 210;
            XSixChunk = true;
        }
        //suppression xRight
        if ((position.inGame.x >= XSupRight)&&(actualChunksRepro.length == 6)){
            actualChunksRepro.splice(((actualChunksRepro.length/2)-1), 1);
            actualChunksRepro.pop();

            genActualChunk();
            BigScrollLand = false;
            changeWidthScrollLand()
            XSupRight = XSupRight  + resetScroll;
            XGenRight = position.inGame.x - 2;
            position.html.x = -70;
            XSixChunk = false;
        }
        //Generation xleft
        if ((position.inGame.x >= XGenLeft)&&(actualChunksRepro.length == 4)){
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
            position.html.x = -265;
            XSixChunk = true;
        }
        //suppression xleft
        if ((position.inGame.x <= XSupLeft)&&(actualChunksRepro.length == 6)){
            actualChunksRepro.splice((actualChunksRepro.length/2), 1);
            actualChunksRepro.shift();

            genActualChunk();
            BigScrollLand = false;
            changeWidthScrollLand()

            XSupLeft = XSupLeft  + (-resetScroll);
            XGenLeft = position.inGame.x + 2;
            position.html.x = 40;
            XSixChunk = false;
        }
    //if ChunkRepro[] >= 6 && XSix||YSix == true
    if((actualChunksRepro.length >= 6)&&(XSixChunk == true)||(YSixChunk == true)){
        //generation YBOT
        if (position.inGame.y <= YGenBot){
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
            for( i = 0; i < 3; i++){ 
                actualChunksRepro.pop();
            }
            genActualChunk();
            YSupBot = YSupBot + resetScroll;
            YGenBot = position.inGame.y - 3;
            position.html.y = -165;
        }
        //generation YTOP
        if (position.inGame.y >= YGenTop){
            for( i = 0; i < 3; i++){
                actualChunksRepro.unshift(chunkID);
                chunkID++
            }
            genActualChunk();
            YGenTop = YGenTop + resetScroll;
            YSupTop = position.inGame.y - 3;
            position.html.y = -495;
        }   
        //SUPP YTOP
        if (position.inGame.y <= YSupTop){
            for( i = 0; i < 3; i++){ 
                actualChunksRepro.shift();
            }
            genActualChunk();
            YSupTop = YSupTop + (-resetScroll);
            YGenTop = position.inGame.y + 3;
            position.html.y = 112;
        }   
        //generation xRight
        if (position.inGame.x <= XGenRight){
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
            position.html.x = 220;
        }
        //suppression xRight
        if (position.inGame.x >= XSupRight){
            actualChunksRepro.splice(2, 1);
            actualChunksRepro.splice(4, 1);
            actualChunksRepro.pop();

            genActualChunk();
            BigScrollLand = false;
            changeWidthScrollLand()
            XSupRight = XSupRight  + resetScroll;
            XGenRight = position.inGame.x - 3;
            position.html.x = -95;
        }
        //Generation xleft
        if (position.inGame.x >= XGenLeft){
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
            position.html.x = -260;
        }
        //suppression xleft
        if (position.inGame.x <= XSupLeft){
            actualChunksRepro.shift();
            actualChunksRepro.splice(2, 1);
            actualChunksRepro.splice(4, 1);

            genActualChunk();
            BigScrollLand = false;
            changeWidthScrollLand()

            XSupLeft = XSupLeft  + (-resetScroll);
            XGenLeft = position.inGame.x + 3;
            position.html.x = 40;
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

let gameLoop = setInterval(verifControlLoop, 20);


