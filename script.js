let scrollLand = document.getElementById('render-3d');

//base de la transformation du render-3d et des chunk 
let base3dScroll = "rotateX(45deg) rotateY(0deg) rotateZ(10deg) skewX(-25deg) skewY(10deg)";
//valeur initial du scrolling
let scrollPositionX = 0;
let scrollPositionY = 0;

let generateChunk = 4; /*clef identité chunk*/
let gateChunk = 4 /*vérifie si il n'y a pas déja suffissament de chunk*/
let nextBotRightGen = -160; /*pour l'instant ajoute un chuck quand on ArrowDown il sera necessaire d'en faire 4 version */
let removedChunck = 0;

// base du code HTML des chunk, sans l'entete qu'on rajoute ensuite dans changementchunk, pour y mettre leur id.
let chunkHTML = "";
for(i=0; i<=48; i++){
    console.log(i);
    chunkHTML += '<div class="content"></div>';
    if(i == 48){
       chunkHTML += '</div>';
    }
};

//commande, a retravaillé vis a vis des saccades
body.addEventListener('keydown', move);
function move(event){
    let key = event.code;
    if (key == "ArrowDown"){
        scrollPositionY -= 10;
    }
    if (key == "ArrowUp"){
        scrollPositionY += 10;
    }
    if (key == "ArrowLeft"){
        scrollPositionX += 10;
    }
    if (key == "ArrowRight") {
        scrollPositionX -= 10;
    }
    scrollLand.style.transform = base3dScroll + "translate("+ scrollPositionX + "px, " + scrollPositionY + "px)"; 
}

function changementChunk(){
    //pour la génération en bas a droite
    if ((scrollPositionY <= nextBotRightGen)&&(generateChunk==gateChunk)){
        for(i=0; i<=1; i++){
            generateChunk ++;
            gateChunk ++;
            scrollLand.innerHTML += '<div id="chunk-' + generateChunk + '" class="chunk">' + chunkHTML;
        }
       nextBotRightGen = nextBotRightGen + (-630); 
    }
    if ((scrollPositionY <= -495)&&(removedChunck <= 2)){
        for(i=0; i<=1; i++){
            let forgotedChunk = document.getElementById("chunk-"+(i+1));
        }
    }
}

let tcheckChunk = setInterval(changementChunk, 20);