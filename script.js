//genere les premiers chunks 
let scrollLand = document.getElementById('render-3d');
scrollLand.innerHTML = '';
let chunkID = 5; /*genere clef identité chunk*/

// base du code HTML des chunk, sans l'entete qu'on rajoute ensuite dans la boucle suivante et changementchunk, pour y mettre leur id.
let chunkHTML = "";
for(i=0; i<=48; i++){
    chunkHTML += '<div class="content"></div>';
    if(i == 48){
       chunkHTML += '</div>';
    }
};

/*representation dans un tableau des chunk, pour recrée le dom a chaque ajout*/
let actualChunksRepro = [1, 2, 3, 4]; 
//création des premiers chunks
for( i = 0; i < actualChunksRepro.length; i++){
    scrollLand.innerHTML += '<div id="chunk-' + actualChunksRepro[i] + '" class="chunk">' + chunkHTML;
}



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//base de la transformation du render-3d et des chunk 
let base3dScroll = "rotateX(45deg) rotateY(0deg) rotateZ(10deg) skewX(-25deg) skewY(10deg)";

//valeur initial du scrolling Ingame et HTML
let position = {
    inGame : {x: 0, y: 0},
    html : {x: 0, y: 0}
}

/*état des touche initial*/
let keyState = { 
    up : false, 
    down : false, 
    left : false, 
    right : false
};
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CHARGEMENT DES CHUNCK~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

let XGenLeft = 40;
let XSupLeft = -580;

let XGenRight = -80;
let XSupRight = 545;

let YGenBot = -165;
let YSupBot = 470;

let YGenTop = 115;
let YSupTop = -495;

/* vérifie les dimension de largeur du render 3d html, pour le scrolling horizontal */
let BigScrollLand;


function genActualChunk(){
    scrollLand.innerHTML = '';
    for( i = 0; i < actualChunksRepro.length; i++){
        scrollLand.innerHTML += '<div id="chunk-' + actualChunksRepro[i] + '" class="chunk">' + chunkHTML;
    }
}
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
    //AXE Y
    //generation ybottom
    if ((position.inGame.y <= YGenBot)){
        console.log('genybottom');
        for( i = 0; i < 2; i++){
            actualChunksRepro.push(chunkID);
            chunkID++
        }
        genActualChunk();
        YGenBot = YGenBot + (-630); 
        YSupBot = position.inGame.y + (+2);
    }
    //suppression ybottom
    if (position.inGame.y >= YSupBot){
        console.log('supybot');
        for(i=0; i<=1; i++){ 
            actualChunksRepro.pop();
        }
        genActualChunk();
        YSupBot = YSupBot + 630;
        YGenBot = position.inGame.y - 2;
        position.html.y = -165;
    }
    //generation yTop
    if ((position.inGame.y >= YGenTop)){
        console.log('genyTop');
        for( i = 0; i < 2; i++){
            actualChunksRepro.unshift(chunkID);
            chunkID++
        }
        genActualChunk();
        YGenTop = YGenTop + 630;
        YSupTop = position.inGame.y - 2;
        position.html.y = -495;
    }       
    //suppression ytop
    if (position.inGame.y <= YSupTop){
        console.log('supytop');
        for(i=0; i<=1; i++){ 
            actualChunksRepro.shift();
        }
        genActualChunk();
        YSupTop = YSupTop + (-630);
        YGenTop = position.inGame.y + 2;
        position.html.y = 112;
    }   
    // AXE X
        //generation xRight
        if ((position.inGame.x <= XGenRight)){
            console.log(actualChunksRepro);
            console.log("gen x right");
                actualChunksRepro.splice(2, 0, chunkID);
                chunkID ++;
                actualChunksRepro.push(chunkID);
                chunkID ++;
            console.log(actualChunksRepro);

            genActualChunk();
            BigScrollLand = true;
            changeWidthScrollLand()
            XGenRight = XGenRight  + (-630);
            XSupRight = position.inGame.x + 2;
            position.html.x = 220;
        }
        //suppression xRight
        if ((position.inGame.x >= XSupRight)){
            console.log(actualChunksRepro);
            console.log("sup x right");
                actualChunksRepro.splice(((actualChunksRepro.length/2)-1), 1);
                actualChunksRepro.pop();
            console.log(actualChunksRepro);

            genActualChunk();
            BigScrollLand = false;
            changeWidthScrollLand()
            XSupRight = XSupRight  + 630;
            XGenRight = position.inGame.x - 2;
            position.html.x = -95;
        }
        //Generation xleft
        if ((position.inGame.x >= XGenLeft)){
            console.log(actualChunksRepro);
            console.log("gen x left");
                chunkID ++;
                actualChunksRepro.splice(((actualChunksRepro.length/2)), 0, chunkID);
                chunkID --;
                actualChunksRepro.unshift(chunkID);
                chunkID += 2;
            console.log(actualChunksRepro);

            genActualChunk();
            BigScrollLand = true;
            changeWidthScrollLand()

            XGenLeft = XGenLeft  + 630;
            XSupLeft = position.inGame.x - 2;
            position.html.x = -260;
        }
        //suppression xleft
        if ((position.inGame.x <= XSupLeft)){
            console.log(actualChunksRepro);
            console.log("sup x left");
                actualChunksRepro.splice((actualChunksRepro.length/2), 1);
                actualChunksRepro.shift();
            console.log(actualChunksRepro);

            genActualChunk();
            BigScrollLand = false;
            changeWidthScrollLand()

            XSupLeft = XSupLeft  + (-630);
            XGenLeft = position.inGame.x + 2;
            position.html.x = 40;
        }
}

let tcheckChunk = setInterval(changementChunk, 200);

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~MOUVEMENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//vérification de l'état des touches
function loop(){
    if (keyState.up == true){
        position.html.y += 20;
        position.inGame.y += 20;
    }
    if (keyState.down == true){
        position.html.y -= 20;
        position.inGame.y -= 20;
    }
    if (keyState.left == true){
        position.html.x += 20;
        position.inGame.x += 20;
    }
    if (keyState.right == true) {
        position.html.x -= 20;
        position.inGame.x -= 20;
    }
    scrollLand.style.transform = base3dScroll + "translate("+ position.html.x + "px, " + position.html.y + "px)"; 
}
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

let gameLoop = setInterval(loop, 50);


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
        console.log('tableau représentation chunk ' + actualChunksRepro);
        console.log(scrollLand.childNodes);
    }
    if(key == ('4')){
        console.log('YGenBot ' + YGenBot);
        console.log('YGenTop ' + YGenTop);
        console.log('YSupTop ' + YSupTop);
        console.log('YSupBot ' + YSupBot);
    }
}
