goog.provide('firesim.Tree');
goog.require('lime.Sprite');

/**
 * Space elements
 * 
 * @param {} gameObj
*/
firesim.Tree = function(gameObj, playerObj) {
    goog.base(this);
    this.setAnchorPoint(0, 0);
    this.setSize(gameObj.tile_size,gameObj.tile_size);
    this.setFill('images/forest.png');
}

goog.inherits(firesim.Tree,lime.Sprite);