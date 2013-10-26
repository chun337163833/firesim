goog.provide('firesim.PauseScene')

firesim.helper.PauseScene = function() {
lime.Scene.call(this);
    var pauseScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var pauseLayer = new lime.Layer().setAnchorPoint(0, 0);
    pauseScene.appendChild(pauseLayer);
    
    // unpause button
    var unpauseButton = new lime.GlossyButton().setColor('#133242').setText('Unpause')
    .setPosition(60, 600)
    .setSize(80, 40);
controlsLayer.appendChild(menuButton);
}

goog.inherits(firesim.PauseScene, lime.Scene);
