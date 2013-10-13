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
        width: 320,
        height: 480,
        tile_size: 64,
        num_tiles_x: 5,
        num_tiles_y: 6,
        landLayer_w: 64*5,
        landLayer_h: 64*6,
        controlsLayer_w: 64*5,
        controlsLayer_h: 64*1.5,
    }

    var director = new lime.Director(document.body,gameObj.width,gameObj.height);     
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(true); // set fps to show in corner

    var gameScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS); // render canvas
    var landLayer = new lime.Layer().setAnchorPoint(0, 0);
    var controlsLayer = new lime.Layer().setAnchorPoint(0, 0);

    gameScene.appendChild(landLayer);
    gameScene.appendChild(controlsLayer);

    director.replaceScene(gameScene); 
}