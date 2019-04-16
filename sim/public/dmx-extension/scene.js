class Scene {

  constructor(parent, number) {
    this.parent = parent;
    this.number = number;
    this.fixtureInfo = [];
    this.length = -1; // -1 is infinite
    this.length = 500; // ms that a scene should show for
    this.fade = false;
    this.createUIElements();
    this.addUIElements();
  }

  selected() {
    this.selectButton.style('background-color', '#00ff00');
  }

  deselected() {
    this.selectButton.style('background-color', '#ffffff');
  }

  show() {
    for (var i = 0; i < this.parent.scenes.length; i++) {
      this.parent.scenes[i].deselected();
    }
    this.selected();
    for (var f = 0; f < this.fixtureInfo.length; f++) { 
      var fixtureSavedState = this.fixtureInfo[f];
      for (var i = 0; i < universe.fixtures.length; i++) {
        var fixture = universe.fixtures[i];
        if (fixture.number == fixtureSavedState['number']) {
          fixture.updateColorToShowScene(fixtureSavedState['color']);
          fixture.animationcolorpicker.value(fixtureSavedState['color']); // update color picker to match updated color
        }
      }
    }
  }

  waitAndShow(wait) { 
    setTimeout(() => {this.show();}, wait);
  }

  createUIElements() {
    this.linebreakElement = document.createElement("br");
    this.selectButton = createButton('Scene ' + (this.number+1).toString());
    this.selectButton.style('border', '1px solid #000000');
    this.selectButton.mousePressed(() => this.show());

    this.deleteButton = createButton('X');
    this.deleteButton.style('border', '1px solid #000000');
    this.deleteButton.mousePressed(() => this.parent.removeScene(this.number));

    this.timeInput = createInput('500');
    this.timeInput.size(50);
    this.timeInput.changed(() => {this.length = parseInt(this.timeInput.value())});

    this.msTextElement = document.createTextNode("ms ");

    this.fadeCheckbox = createCheckbox('fade?', false);
    this.fadeCheckbox.changed(this.fadeBoxToggled);
  }

  addUIElements() {
    this.parent.scenesListElement['elt'].appendChild(this.selectButton['elt']);   
    this.deleteButton['elt'].style.color = 'red';
    this.parent.scenesListElement['elt'].appendChild(this.deleteButton['elt']);  
    this.parent.scenesListElement['elt'].appendChild(this.timeInput['elt']);   
    this.parent.scenesListElement['elt'].appendChild(this.msTextElement);     
    this.parent.scenesListElement['elt'].appendChild(this.linebreakElement);
    this.parent.scenesListElement['elt'].appendChild(this.fadeCheckbox['elt']);     
  }

  removeUIElements() {
    this.parent.scenesListElement['elt'].removeChild(this.linebreakElement);
    this.parent.scenesListElement['elt'].removeChild(this.selectButton['elt']);   
    this.parent.scenesListElement['elt'].removeChild(this.deleteButton['elt']);  
    this.parent.scenesListElement['elt'].removeChild(this.timeInput['elt']);   
    this.parent.scenesListElement['elt'].removeChild(this.msTextElement);     
    this.parent.scenesListElement['elt'].removeChild(this.fadeCheckbox['elt']);     
  }

  fadeBoxToggled() {
    if (this.checked()) {
      this.fade = true;
    } else {
      this.fade = false;
    }    
  }

}
