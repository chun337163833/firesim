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
    this.state = this.EMPTY;
    
    lime.scheduleManager.scheduleWithDelay(function(dt){
    // this.a=dt;
    
    },this);
}

goog.inherits(firesim.Land,lime.Sprite);

// states
firesim.Land.prototype.EMPTY = 0;
firesim.Land.prototype.FOREST = 1;
firesim.Land.prototype.FIRE = 2;
firesim.Land.prototype.BURNT = 3