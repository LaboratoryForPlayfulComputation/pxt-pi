class DMXController {
    constructor(controllerType) {
      this.type = controllerType;
      this.locked = false;
      this.size = 80;
      this.x = 5+this.size;      
      this.y = 100+this.size;
      this.hovered = false;   
      this.beingDragged = false;
      this.xOffset = 0; 
      this.yOffset = 0;     
      this.out = new DMXConnector(this, 'out');
      this.createUIControls();
    }
  
    display() {
      fill(180);
      if (this.isHovered()) stroke(255); 
      else stroke(0);
      rect(this.x, this.y, this.size, this.size);
      this.displayComponents();
    }

    displayComponents() {
      this.displayText();
      this.controllerTypeSelector.position(this.x, this.y+this.size+10);
      this.out.display();      
    }

    displayText() {
      fill(0);
      stroke(0);
      text('DMX', this.x+this.size/2, this.y+this.size/2);
    }
  
    isHovered() {
      if (mouseX > this.x-this.size && mouseX < this.x+this.size && 
        mouseY > this.y-this.size && mouseY < this.y+this.size) {
          return true;
      } else {
        return false;
      }    
    }
  
    pressed() {
      if(this.isHovered() && (!locked || this.locked)) { 
        fill(255, 255, 255);
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
      this.locked = locked = false;
    }  

    updateControllerType(controllerType) {
        this.type = controllerType;
    }   
    
    getControllerType() {
        return this.type;
    }
  
    createUIControls() {
      this.controllerTypeSelector = createSelect();
      this.controllerTypeSelector.position(this.x, this.y+this.size+10);
      for (var c = 0; c < DMXControllerOptions.length; c++) { // add drop down selection options for all supported controllers
        this.controllerTypeSelector.option(DMXControllerOptions[c]);
      }
      this.controllerTypeSelector.changed(() => this.updateControllerType(this.controllerTypeSelector.value()));
    }

}


