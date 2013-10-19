goog.provide('firesim.Space');
goog.require('lime.Sprite');

/**
 * Space elements
 * 
 * @param {} gameObj
*/
firesim.Space = function(gameObj, playerObj) {
    goog.base(this);
    this.setAnchorPoint(0, 0);
    this.setSize(gameObj.tile_size,gameObj.tile_size);
    this.setFill('images/space.png');
}

goog.inherits(firesim.Space,lime.Sprite);