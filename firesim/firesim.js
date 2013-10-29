// set main namespace 
goog.provide('firesim');

// get requirements 
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.GlossyButton');
goog.require('firesim.Land');
// goog.require('firesim.pauseScene')

// entrypoint 
firesim.start = function(){

    //game object
    var gameObj = {
		width: 1280,
		height: 720,
		tile_size: 16,
		num_tiles_x: 80,
		num_tiles_y: 45,
		landLayer_w: 16*80,
		landLayer_h: 16*50,
		controlsLayer_w: 32*5,
		controlsLayer_h: 32*1.5
    }
    
    // player object
    var playerObj = {   
    }
    
    // map array
    gameObj.mapObj = new Array(gameObj.num_tiles_y)
    
    // directors, scenes, and stuff
    var director = new lime.Director(document.body,gameObj.width,gameObj.height);     
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(true); // set fps to show in corner

    var gameScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS); // set renderer
    var landLayer = new lime.Layer().setAnchorPoint(0, 0);
    var controlsLayer = new lime.Layer().setAnchorPoint(0, 0);

    gameScene.appendChild(landLayer);
    gameScene.appendChild(controlsLayer);
    
/*    // controls
    var controlArea = new lime.Sprite().setAnchorPoint(0,0)
    .setPosition(0, gameObj.height-gameObj.controlsLayer_h)
    .setSize(gameObj.controlsLayer_w, gameObj.controlsLayer_h)
    .setFill('#0D0D0D')
controlsLayer.appendChild(controlArea);*/
    
    // menu button
    var menuButton = new lime.GlossyButton().setColor('#133242').setText('Menu')
    .setPosition(60, 680)
    .setSize(80, 40);
controlsLayer.appendChild(menuButton);
    
    // pause button
    var pauseButton = new lime.GlossyButton().setColor('#133242').setText('Pause')
    .setPosition(160, 680)
    .setSize(80, 40);
controlsLayer.appendChild(pauseButton);
    
    // pause button event
goog.events.listen(pauseButton,['mousedown', 'touchstart'], function(e) {
    director.setPaused(true);
});
    
    //create land elements
    for(var j=0; j<gameObj.num_tiles_y; j++) {
        gameObj.mapObj[j] = new Array(gameObj.num_tiles_x)
        for(var i=0; i<gameObj.num_tiles_x; i++) {
            gameObj.mapObj[j][i] = 1;
        }
    }
    // start some fiyuhz!
    gameObj.mapObj[10][10] = 2;
	gameObj.mapObj[10][10].fireCounter = 3000; // note to self
	
	// add some empty space
	gameObj.mapObj[10][12] = 0;
	gameObj.mapObj[11][12] = 0;
	gameObj.mapObj[11][13] = 0;
	gameObj.mapObj[12][13] = 0;
	gameObj.mapObj[12][14] = 0;
    
    // create land elements
    for(var i=0; i<gameObj.num_tiles_x; i++) {
        for(var j=0; j<gameObj.num_tiles_y; j++) {
            var landElement = new firesim.Land(gameObj,playerObj,i,j).setPosition(i*gameObj.tile_size, j*gameObj.tile_size);
            landLayer.appendChild(landElement);
        }
    }
    
    // render da scene
    director.replaceScene(gameScene); 
}