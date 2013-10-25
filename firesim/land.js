goog.provide('firesim.Land');
goog.require('lime.Sprite');

/**
 * Land elements
 * 
 * @param {} gameObj
*/
firesim.Land = function(gameObj, playerObj, i, j) {
    // set up stuff to render
    goog.base(this);
    this.setAnchorPoint(0, 0);
    this.setSize(gameObj.tile_size, gameObj.tile_size);
    this.setFill('images/space.png');
    
    this.counter = 2000; // game loop timer
    
    // fill tiles based on state
    if (gameObj.mapObj[j][i] == 0) {
        this.setFill('images/space.png'); // space squares
    }
    
    if (gameObj.mapObj[j][i] == 1) {
        this.setFill('images/forest.png'); // forest squares
    }
    
    if (gameObj.mapObj[j][i] == 2) {
        this.setFill('images/fire.png'); // fire squares
    }
    
    // schedule + event management
    lime.scheduleManager.schedule(function(dt){
        this.counter -= dt; // subtracts from counter
        
        // look at other squares
        if ((this.counter < 500) && (this.counter > 0)) {
            // dont check edge tiles
            if ((j>0) && (j<gameObj.numb_tiles_y-1) && (i>0) && (i<gameObj.numb_tiles_x-1)) {
                console.log("inside");
                if (((gameObj.mapObj[j][i+1] == 2) || (gameObj.mapObj[j][i-1] == 2) || (gameObj.mapObj[j+1][i] == 2) || (gameObj.mapObj[j-1][i] == 2)) && (gameObj.mapObj[j][i] == 1)) {
                    this.nextstate = 2;
                }
                
            }
        }
    
        // update squares
        if (this.counter < 0) {
            if (this.nextstate == 2) {
                // fire spread
                gameObj.mapObj[j][i] = 2;
                this.setFill('images/fire.png')
            }
            this.counter = 1000;
        }
    },this);

}

goog.inherits(firesim.Land,lime.Sprite);