class DMXConnector {
  constructor(parent, direction) {
      this.parent = parent;
      this.direction = direction;
      if (this.direction == 'in') {
        this.x = this.parent.x-this.parent.size/2-this.size/2; // in
        this.y = this.parent.y;
      }
      else if (this.parent.constructor.name == 'DMXController') {
        this.x = this.parent.x+this.parent.size+this.size/2;
        this.y = this.parent.y+this.parent.size/2;
      }
      else {
        this.x = this.parent.x+this.parent.size/2+this.size/2; // out
        this.y = this.parent.y;
      }
      this.size = 15;
      this.radius = this.size/2;
      this.isDragged = false;
      this.isConnectingAWire = false;
      this.connectedTo = null;  
      this.connectedBy = null;       
  }

  display() {
    fill(100);
    if (this.isHovered()) stroke(255); 
    else stroke(0);  
    if (this.direction == 'in') ellipse(this.parent.x-this.parent.size/2-this.size/2, this.parent.y, this.size, this.size);  
    else if (this.parent.constructor.name == 'DMXController') ellipse(this.parent.x+this.parent.size+this.size/2, this.parent.y+this.parent.size/2, this.size, this.size);  
    else ellipse(this.parent.x+this.parent.size/2+this.size/2, this.parent.y, this.size, this.size);  
  }

  isHovered() {
      if (this.direction == 'in') {
        this.x = this.parent.x-this.parent.size/2-this.size/2;
        this.y = this.parent.y;        

      }
      else if (this.parent.constructor.name == 'DMXController') {
        this.x = this.parent.x+this.parent.size+this.size/2;
        this.y = this.parent.y+this.parent.size/2;           
      }
      else { // out connector of a standard fixture
        this.x = this.parent.x+this.parent.size/2+this.size/2;
        this.y = this.parent.y;        
      }
      if (mouseX > this.x-this.radius && mouseX < this.x+this.radius && 
        mouseY > this.y-this.radius && mouseY < this.y+this.radius) {
          return true;
      } 
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
      saveUserCode("test", "test");
  }

  updateConnectedBy(thing) {
      this.connectedBy = thing;
      saveUserCode("test", "test");
  }   
}