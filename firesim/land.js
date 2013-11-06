goog.provide('firesim.Land');
goog.require('lime.Sprite');

/**
 * Land elements
 * 
 * @param {} gameObj
*/
firesim.Land = function(gameObj, playerObj, i, j) {
	
	fireTick2 = function(tick) {
		// set it to tickTime*3 +/- 10%
		y = Math.floor(tick*3*(1+(Math.random()*0.2-0.1)));
		return(y);
	}
    // set up stuff to render
    goog.base(this);
    this.setAnchorPoint(0, 0);
    this.setSize(gameObj.tile_size, gameObj.tile_size);
    this.setFill('images/space.png');
	
	// variables
	tickTime = 1000;
	fireTick = Math.floor(tickTime*3*(1+(Math.random()*0.2-0.1))); // set it to tickTime*3 +/- 10%
    
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
		this.fireCounter = fireTick2(tickTime);
    }
	
	if (gameObj.mapObj[j][i] == 3) {
        this.setFill('images/burnt.png'); // burnt squares
    }
	
	goog.events.listen(this,['mousedown','touchstart'],function(e) {
		e.event.stopPropagation();
		gameObj.mapObj[j][i] = 2;
		this.setFill('images/fire.png');
		this.fireCounter = fireTick;
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
            // edge tile management
			if ((gameObj.mapObj[j][i] == 2) && (this.fireCheck == 0)) {
				
				
				if ((j>0) && (j<gameObj.num_tiles_y-1) && (i>0) && (i<gameObj.num_tiles_x-1)) {
					if (gameObj.mapObj[j-1][i] == 1) {
						if (Math.floor((Math.random()*10+1) < 5)) {
							gameObj.mapObj[j-1][i] = -1;
						} // random chance
					} // check up square
				
					if (gameObj.mapObj[j+1][i] == 1) {
						if (Math.floor((Math.random()*10+1) < 5)) {
							gameObj.mapObj[j+1][i] = -1;
						} // random chance
					} // check down square
					
					if (gameObj.mapObj[j][i+1] == 1) {
							if (Math.floor((Math.random()*10+1) < 5)) {
								gameObj.mapObj[j][i+1] = -1;
							} // random chance
					} // check right square
					
					if (gameObj.mapObj[j][i-1] == 1) {
							if (Math.floor((Math.random()*10+1) < 5)) {
								gameObj.mapObj[j][i-1] = -1;
							} // random chance
					} // check left square
					
					
				} // edge square if
				this.fireCheck = 1;
			} // fire check if
        } // fire tick if
    	
		if (this.counter > tickTime/2) {
			if (gameObj.mapObj[j][i] == -1) {
				// fire set
				gameObj.mapObj[j][i] = 2;
				this.setFill('images/fire.png')
				this.fireCounter = fireTick2(tickTime);
			}
		}
			
        // update squares
        if (this.counter < 0) {
            this.counter = tickTime;
			this.fireCheck = 0
        }
    },this);

}

goog.inherits(firesim.Land,lime.Sprite);