
class Fixture {

  constructor(number) {
    this.number = number
    this.name = 'Fixture' + this.number.toString();
    this.numChannels = 0;
    this.channels = [];
    this.startingAddress = null;
    this.size = 75;
    this.radius = this.size/2;
    this.x = universe.fixtures.length * 50 + 200 + this.size;   
    if (this.x >= windowWidth/1.25)
      this.x = 200 + this.size;
    this.y = 130 + this.size;
    this.hovered = false;   
    this.beingDragged = false;
    this.xOffset = 0; 
    this.yOffset = 0;  
    this.locked = false;
    this.nameInput = createInput(this.name);
    this.nameInput.position(this.x/4, this.y+this.size-20);
    this.nameInput.changed(() => this.updateName());    
    this.nameInput.size(80);                                                
    this.in  = new FixtureIn(this);  
    this.out = new FixtureOut(this);
  }

  display() {
    if (this.isHovered()) stroke(255); 
    else stroke(0);
    this.displayComponents(); // classes that inherit from Fixture have their own method for this
  }

  isHovered() {
    if (mouseX > this.x-this.radius && mouseX < this.x+this.radius && 
      mouseY > this.y-this.radius && mouseY < this.y+this.radius) return true;
    else return false;
  }

  pressed() {
    if(this.isHovered() && (!locked || this.locked)) { 
      locked = true;
      this.locked = true;
    }
    this.xOffset = mouseX-this.x; 
    this.yOffset = mouseY-this.y; 
  }
  
  dragged() {
    if (locked && this.locked){
      this.x = mouseX-this.xOffset; 
      this.y = mouseY-this.yOffset; 
    }
  }
  
  released() {
    this.locked = false;
    locked = false;
  }  

  updateName() {
     this.name = this.nameInput.value();
  }

  updateChannel(channel, newValue) {
    if (this.channels[channel])
      this.channels[channel].value = newValue;
    saveUserCode("test", "test");
  }

  initializeChannels() {
    for (var i = 0; i < this.numChannels; i++)
      this.channels.push(new Channel(i));
  }

  blackoutChannels() {
    for (var c = 0; c < this.channels.length; c++)
      this.updateChannel(c, 0);
  }    

}

/*
 * The UI element for the XLR input on a fixture
 */
class FixtureIn {

    constructor(parent) {
        this.parent = parent;
        this.x = this.parent.x-this.parent.size/2-this.size/2;
        this.y = this.parent.y;
        this.size = 15;
        this.radius = this.size/2;
        this.isDragged = false;
        this.isConnectingAWire = false;
        this.type = 'in';
        this.connectedTo = null;  
        this.connectedBy = null;   
    }

    display() {
        fill(100);
        if (this.isHovered()) stroke(255); 
        else stroke(0);        
        ellipse(this.parent.x-this.parent.size/2-this.size/2, this.parent.y, this.size, this.size);        
    }

    isHovered() {
        this.x = this.parent.x-this.parent.size/2-this.size/2;
        this.y = this.parent.y;        
        if (mouseX > this.x-this.radius && mouseX < this.x+this.radius && 
          mouseY > this.y-this.radius && mouseY < this.y+this.radius) return true;
        else return false;
      }
    
      pressed() {
        if(this.isHovered() && (!locked || this.locked)) { 
          fill(255, 255, 255);
          locked = true;
          this.locked = true;
        }
      }
      
      dragged() {
        if (locked && this.locked)
          this.isDragged = true;
      }
      
      released() {
        this.locked = false;
        locked = false;
        this.isDragged = false;
        this.isConnectingAWire = false;        
      }  
      
      connectingAWire() {
        if (this.isDragged) return true;
        else false;
    }

    updateConnectedTo(thing) {
        this.connectedTo = thing;
    }

    updateConnectedBy(thing) {
        this.connectedBy = thing;
    } 
    
}

/*
 * The UI element for the XLR output on a fixture
 */
class FixtureOut {

    constructor(parent) {
        this.parent = parent;
        this.x = this.parent.x+this.parent.size/2+this.size/2;
        this.y = this.parent.y;
        this.size = 15;
        this.radius = this.size/2;
        this.isDragged = false;
        this.isConnectingAWire = false;   
        this.type = 'out';     
        this.connectedTo = null;   
        this.connectedBy = null;  
    }

    display() {
        fill(100);
        if (this.isHovered()) stroke(255); 
        else stroke(0);         
        ellipse(this.parent.x+this.parent.size/2+this.size/2, this.parent.y, this.size, this.size);
    }

    isHovered() {
        this.x = this.parent.x+this.parent.size/2+this.size/2;
        this.y = this.parent.y;        
        if (mouseX > this.x-this.radius && mouseX < this.x+this.radius && 
          mouseY > this.y-this.radius && mouseY < this.y+this.radius) return true;
        else return false;
      }
    
      pressed() {
        if(this.isHovered() && (!locked || this.locked)) { 
          fill(255, 255, 255);
          locked = true;
          this.locked = true;
        }
      }
      
      dragged() {
        if (locked && this.locked)
            this.isDragged = true;
      }
      
      released() {
        this.locked = false;
        locked = false;
        this.isDragged = false;
        this.isConnectingAWire = false;        
      }  
      
      connectingAWire() {
        if (this.isDragged) return true;
        else false;
    } 

    updateConnectedTo(thing) {
        this.connectedTo = thing;
    }

    updateConnectedBy(thing) {
        this.connectedBy = thing;
    }   
     
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }