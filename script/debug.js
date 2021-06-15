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
