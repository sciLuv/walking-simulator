//Representation graphique "3d isometrique" des chunks
let scrollLand = document.getElementById('render-3d');

//genere clef identité chunk
let chunkID = 5; 
/*representation dans un tableau des chunk, pour recrée le DOM a chaque ajout*/
let actualChunksRepro = [1, 2, 3, 4]; 

// base du code HTML des chunk, sans l'entete qu'on rajoute ensuite dans la boucle suivante et changementchunk, pour y mettre leur id.
let chunkHTML = "";
for(i=0; i<=48; i++){
    chunkHTML += '<div class="content"></div>';
    if(i == 48){
       chunkHTML += '</div>';
    }
};

//création chunks
let chunkList = [];

function genActualChunk(){
    scrollLand.innerHTML = '';
    for( i = 0; i < actualChunksRepro.length; i++){
        let chunkInGenColor = chunkColor();
        let chunkInGenWeed = chunkWeed();
        let chunkInGenTree = chunkTree();

        scrollLand.innerHTML += '<div id="chunk-' + actualChunksRepro[i] + '" class="chunk">' + chunkHTML;
        let chunk = document.getElementById("chunk-" + actualChunksRepro[i]);
        console.log(chunk);

    
        if((chunkList[actualChunksRepro[i]]) != undefined ){
            if ((chunkList[actualChunksRepro[i]].num) == actualChunksRepro[i]){

                chunk.className += chunkList[actualChunksRepro[i]].color;
                
                for(k=0; k<= chunkList[actualChunksRepro[i]].weed.length-1; k++){
                    chunk.childNodes[chunkList[actualChunksRepro[i]].weed[k]].innerHTML = '<div class="weed"></div>';
                }
                if(chunkList[actualChunksRepro[i]].tree != -1){
                    chunk.childNodes[chunkList[actualChunksRepro[i]].tree].innerHTML = '<div class="tree"></div><div class="tree-2"></div>';
                }
            }
        }
        else{
        //chunk.childNodes[5].style.backgroundColor = "red"; fonctionne, pour des info sur les childnodes
        chunk.className += chunkInGenColor;
        chunkList[actualChunksRepro[i]] = { num : actualChunksRepro[i], color : chunkInGenColor, weed : chunkInGenWeed, tree: chunkInGenTree};
            for(k=0; k<= chunkList[actualChunksRepro[i]].weed.length-1; k++){
                chunk.childNodes[chunkList[actualChunksRepro[i]].weed[k]].innerHTML = '<div class="weed"></div>';
            }
            if(chunkList[actualChunksRepro[i]].tree != -1){
                chunk.childNodes[chunkList[actualChunksRepro[i]].tree].innerHTML = '<div class="tree"></div><div class="tree-2"></div>';
            }
        }
    }
}

for(i= 0; i<2; i++){
    genActualChunk();
}

function randomNum(){
    let random = Math.ceil(Math.random()*10000);
    return random;
}

function chunkColor(){
    let colorChoice, xColor = randomNum();
    if (xColor <= 3333){
        colorChoice = " chunk-green-1";
    }
    else if (xColor < 6666){
        colorChoice = " chunk-green-2";
    }
    else {
        colorChoice = " chunk-green-3";
    }
    return colorChoice;
}
function chunkWeed(){
    let weedChoice = [] ;
    for (j = 0; j <= 5;  j++){
        let weedOrNot =  Math.ceil(Math.random()*10000);
        if (weedOrNot >= 5000){
            let whereIsWeed = Math.ceil(Math.random()*48);
            weedChoice.push(whereIsWeed);
        }
    }
    return weedChoice;
}
function chunkTree(){
    let treeChoice = -1;
        let treeOrNot =  Math.ceil(Math.random()*10000);
        if (treeOrNot >= 5000){
            let whereIsTree = Math.ceil(Math.random()*48);
            treeChoice = whereIsTree;
        }
    return treeChoice;
}