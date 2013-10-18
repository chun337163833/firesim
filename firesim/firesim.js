// set main namespace 
goog.provide('firesim');

// get requirements 
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.GlossyButton');

// entrypoint 
firesim.start = function(){     

    //game object
    var gameObj = {
        width: 720,
        height: 1280,
        tile_size: 256,
        num_tiles_x: 5,
        num_tiles_y: 6,
        landLayer_w: 256*20,
        landLayer_h: 256*24,
        controlsLayer_w: 256*5,
        controlsLayer_h: 256*1.5,
        
        // bottom menu
        menu_margin_x: 200,
        menu_margin_y: 80
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
    
    // controls
    var controlArea = new lime.Sprite().setAnchorPoint(0,0)
    .setPosition(0, gameObj.height-gameObj.controlsLayer_h)
    .setSize(gameObj.controlsLayer_w, gameObj.controlsLayer_h)
    .setFill('#0D0D0D')
controlsLayer.appendChild(controlArea);
    
    // menu button
    var menuButton = new lime.GlossyButton().setColor('#133242').setText('Menu')
    .setPosition(240, gameObj.height-gameObj.controlsLayer_h/2)
    .setSize(200, 80);
controlsLayer.appendChild(menuButton); 
    

    director.replaceScene(gameScene); 
}