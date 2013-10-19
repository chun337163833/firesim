// set main namespace 
goog.provide('firesim');

// get requirements 
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.GlossyButton');
goog.require('firesim.Space');
goog.require('firesim.Tree');

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
        controlsLayer_h: 32*1.5,
        
        // bottom menu
        menu_margin_x: 50,
        menu_margin_y: 20
        
        
    }
    
    // player object
    var playerObj = {   
    }

    var director = new lime.Director(document.body,gameObj.width,gameObj.height);     
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(true); // set fps to show in corner

    var gameScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS); // render canvas
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
    
    //create land elements
    for(var i=0; i<gameObj.num_tiles_x; i++) {
        for(var j=0; j<gameObj.num_tiles_y; j++) {
            var landElement = new firesim.Space(gameObj, playerObj).setPosition(i*gameObj.tile_size, j*gameObj.tile_size);
            landLayer.appendChild(landElement);
        }
    }
    var landElement = new firesim.Tree(gameObj, playerObj).setPosition(20*gameObj.tile_size, 20*gameObj.tile_size);
            landLayer.appendChild(landElement);
    director.replaceScene(gameScene); 
}