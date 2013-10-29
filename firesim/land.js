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
	
	// variables
	tickTime = 1000;
	fireTick = tickTime*3;
    
    this.counter = tickTime; // game loop timer
    
	
    // fill tiles based on state
    if (gameObj.mapObj[j][i] == 0) {
        this.setFill('images/space.png'); // space squares
    }
    
    if (gameObj.mapObj[j][i] == 1) {
        this.setFill('images/forest.png'); // forest squares
    }
    
    if (gameObj.mapObj[j][i] == 2) {
        this.setFill('images/fire.png'); // fire squares
		this.fireCounter = fireTick;
    }
	
	if (gameObj.mapObj[j][i] == 3) {
        this.setFill('images/burnt.png'); // burnt squares
    }
	
	goog.events.listen(this,['mousedown','touchstart'],function(e) {
		e.event.stopPropagation();
		gameObj.mapObj[j][i] = 2;
		this.setFill('images/fire.png');
	});
    
    // schedule + event management
    lime.scheduleManager.schedule(function(dt){
        this.counter -= dt; // subtracts from counter
        
		// set burnt if burned for amount of time
		if (gameObj.mapObj[j][i] == 2) {
			this.fireCounter -= dt;
			if (this.fireCounter < 0) {
				gameObj.mapObj[j][i] = 3;
				this.setFill('images/burnt.png');
			}
		}
		
        // look at other squares
        if ((this.counter < tickTime/2) && (this.counter > 0)) {
            // dont check edge tiles
            if ((j>0) && (j<gameObj.num_tiles_y-1) && (i>0) && (i<gameObj.num_tiles_x-1)) {
                if (((gameObj.mapObj[j][i+1] == 2) || (gameObj.mapObj[j][i-1] == 2) || (gameObj.mapObj[j+1][i] == 2) || (gameObj.mapObj[j-1][i] == 2)) && (gameObj.mapObj[j][i] == 1)) {
                    this.nextstate = 2;
                }
                
            }
			
        }
    
        // update squares
        if (this.counter < 0) {
            if (this.nextstate == 2 && ((Math.floor((Math.random()*10)+1) < 5))) {
				if (gameObj.mapObj[j][i] == 1) {
					// fire spread
					gameObj.mapObj[j][i] = 2;
					this.setFill('images/fire.png')
					this.fireCounter = fireTick;
				}
            }
            this.counter = tickTime;
        }
    },this);

}

goog.inherits(firesim.Land,lime.Sprite);