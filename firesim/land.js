goog.provide('firesim.Land');
goog.require('lime.Sprite');

/**
 * Land elements
 * 
 * @param {} gameObj
*/
firesim.Land = function(gameObj, playerObj) {
    goog.base(this);
    this.setAnchorPoint(0, 0);
    this.setSize(gameObj.tile_size,gameObj.tile_size);
    this.setFill('images/space.png');
}

goog.inherits(firesim.Land,lime.Sprite);