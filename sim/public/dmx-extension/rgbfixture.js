class RGBFixture extends Fixture {
  
  constructor(number) {
      super(number);

      /* set default color attributes */
      this.r = 255;
      this.g = 0;
      this.b = 0;
      this.w = 0;
      this.color = '#ff0000';
      this.brightness = 255;         

      /* sets default channel attributes */
      this.type = rgbFixtureDeviceTypes[0]; // channels below should match specs for default light
      this.numChannels       = this.type['channels'];
      this.brightnessChannel = this.type['brightnessChannel'];
      this.redChannel        = this.type['redChannel'];
      this.greenChannel      = this.type['greenChannel'];
      this.blueChannel       = this.type['blueChannel'];
      this.whiteChannel      = this.type['whiteChannel'];

      this.initializeChannels();
      this.createUIControls();     
      this.createAnimationUIControls();   
      this.updateBrightness();
      this.updateColor();
  }

  /* Methods for updating RGB fixture parameters */
  updateColor() {
      this.color = this.animationcolorpicker.value();
      this.updateRGBColorChannelValues();
    }
    
  updateBrightness() { 
    if (mode == 1)
      this.brightness = this.animationbrightnesspicker.value();    
    this.updateChannel(this.brightnessChannel-1, this.brightness);
  }

  updateRGBColorChannelValues() {
    var rgbColor = hexToRgb(this.color);
    this.r = rgbColor['r'];
    this.g = rgbColor['g'];
    this.b = rgbColor['b'];
    this.updateChannel(this.redChannel-1, this.r);
    this.updateChannel(this.greenChannel-1, this.g);
    this.updateChannel(this.blueChannel-1, this.b);
  }

  /* Methods for displaying RGB fixture and its components */
  displayComponents() {
      if (mode == 0) fill('#aaaaaa');
      else fill(this.r, this.g, this.b, this.brightness);
      ellipse(this.x, this.y, this.size, this.size);
      this.displayText();
      this.updateComponentPositions();
      
      if (mode == 0) this.displayLayoutEditorComponents();             
      else this.displayAnimationEditorComponents();            
    }   

  updateComponentPositions() {
    this.nameInput.position(this.x-this.size/4+65, this.y+this.size-20);    
    this.presetDevicePicker.position(this.x-this.size/4+65, this.y+this.size);    
    this.animationcolorpicker.position(this.x-this.size/4, this.y+this.size+24);      
    this.animationbrightnesspicker.position(this.x-this.size/4, this.y+this.size+54);                 
  }
          
  displayText() {
    fill(255);
    stroke(0);
    textSize(12);
    text('name:', this.x-this.size/4, this.y+this.size-16);  
    text('device:', this.x-this.size/4, this.y+this.size+2);  
  }

  displayLayoutEditorComponents() {
    this.animationcolorpicker.hide();      
    this.animationbrightnesspicker.hide();      
    this.presetDevicePicker.show();
    this.nameInput['elt'].disabled = false;
    this.presetDevicePicker['elt'].disabled = false;
  }

  displayAnimationEditorComponents() {
    this.animationcolorpicker.show();      
    this.animationbrightnesspicker.show();    
    this.nameInput['elt'].disabled = true;
    this.presetDevicePicker['elt'].disabled = true;
  }
         
  /* Methods for initializing the UI components of the RGB fixture */
  createUIControls() {   
    this.presetDevicePicker = createSelect();
    this.presetDevicePicker.changed( () => this.updateDevicePreset( this.presetDevicePicker['elt'].selectedIndex ));

    for (var key in rgbFixtureDeviceTypes) {
      if (rgbFixtureDeviceTypes.hasOwnProperty(key)){
        this.presetDevicePicker.option(rgbFixtureDeviceTypes[key]['name']);
      }
    }
  }

  createAnimationUIControls() {
    this.animationcolorpicker = createColorPicker(this.color);
    this.animationcolorpicker.changed(() => this.updateColor());      
    this.animationbrightnesspicker = createSlider(0, 255, this.brightness);
    this.animationbrightnesspicker.changed(() => this.updateBrightness(this.brightnesspicker.value()));      
  }  

  updateColorToShowScene(color) {
    this.color = color;
    var rgbColor = hexToRgb(this.color);
    this.r = rgbColor['r'];
    this.g = rgbColor['g'];
    this.b = rgbColor['b'];        
  }  

  updateDevicePreset(optionIndex) {
    this.type = rgbFixtureDeviceTypes[optionIndex];
    if (this.type['name'] == 'custom') {
      // have popup channel editor here
    }
    else {
      this.brightnessChannel = this.type['brightnessChannel'];
      this.redChannel = this.type['redChannel'];
      this.greenChannel = this.type['greenChannel'];
      this.blueChannel = this.type['blueChannel'];
      this.whiteChannel = this.type['whiteChannel'];
      this.blackoutChannels(); // reset all channels to 0
      this.updateColor();
      this.updateBrightness();
    }
  }

}
