let scrollLand = document.getElementById('render-3d');

//base de la transformation du render-3d et des chunk 
let base3dScroll = "rotateX(45deg) rotateY(0deg) rotateZ(10deg) skewX(-25deg) skewY(10deg)";
//valeur initial du scrolling Ingame et HTML
let position = {
    inGame : {x: 0, y: 0},
    html : {x: 0, y: 0}
}

// base du code HTML des chunk, sans l'entete qu'on rajoute ensuite dans changementchunk, pour y mettre leur id.
let chunkHTML = "";
for(i=0; i<=48; i++){
    chunkHTML += '<div class="content"></div>';
    if(i == 48){
       chunkHTML += '</div>';
    }
};

let chunkID = 4; /*genere clef identité chunk*/
let XGenBotton = -158; /*pour l'instant ajoute un chuck quand on ArrowDown il sera necessaire d'en faire 4 version */
let XGenTop = 110;
let XTopRemove = -495;
let topXRemoveNum = 1;
let removedChunck = 0;

//commande, a retravaillé vis a vis des saccades
body.addEventListener('keydown', move);
function move(event){
    let key = event.code;
    if (key == "ArrowDown"){
        position.html.y -= 10;
        position.inGame.y -= 10;
    }
    if (key == "ArrowUp"){
        position.html.y += 10;
        position.inGame.y += 10;
    }
    if (key == "ArrowLeft"){
        position.html.x += 10;
        position.inGame.x += 10;
    }
    if (key == "ArrowRight") {
        position.html.x -= 10;
        position.inGame.x -= 10;
    }
    scrollLand.style.transform = base3dScroll + "translate("+ position.html.x + "px, " + position.html.y + "px)"; 
    /*console.log("Y : HTML " + position.html.y + ", INGAME " + position.inGame.y);
    console.log("X : HTML " + position.html.x + ", INGAME" + position.inGame.x);*/
}

function changementChunk(){
    //generation xbottom
    if ((position.inGame.y <= XGenBotton)){
        for(i=0; i<=1; i++){
            chunkID ++;
            scrollLand.innerHTML += '<div id="chunk-' + chunkID + '" class="chunk">' + chunkHTML;
        }
       XGenBotton = XGenBotton + (-630); 
    }
    //suppression xtop
    if (position.html.y <= XTopRemove){
        for(i=0; i<=1; i++){ 
            //partie a retravaillé pour que la gen fonctionne avec les autre sens (placé les div on bon endroit grace a array)
            let forgotedChunk = document.getElementById("chunk-"+(topXRemoveNum));
            topXRemoveNum ++;
            forgotedChunk.remove();
        }
        position.html.y = 112;
        scrollLand.style.transform = base3dScroll + "translate("+ position.html.x + "px, " + position.html.y + "px)"; 
    }
    
}

let tcheckChunk = setInterval(changementChunk, 200);