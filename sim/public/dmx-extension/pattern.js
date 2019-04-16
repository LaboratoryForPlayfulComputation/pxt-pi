class Pattern {

  constructor(number) {
      this.number = number;
      this.scenes = [];
      this.isLooping = false;
      this.timeIntervalID = null;
      this.button = createButton('Pattern #' + this.number);
      this.button.style('border', '1px solid #000000');
      this.linebreak = document.createElement("br");
      this.playButton = createButton('play');
      this.loopButton = createButton('loop');
      this.stopButton = createButton('stop');
      this.playButton.style('border', '1px solid #000000');
      this.loopButton.style('border', '1px solid #000000');
      this.stopButton.style('border', '1px solid #000000');
      this.button.mousePressed(() => this.selected());
      this.playButton.mousePressed(() => this.play());   
      this.loopButton.mousePressed(() => this.loop());   
      this.stopButton.mousePressed(() => this.stopLooping());    
      patternsListElement['elt'].append(this.button['elt']);
      patternsListElement['elt'].append(this.playButton['elt']);
      patternsListElement['elt'].append(this.loopButton['elt']);
      patternsListElement['elt'].append(this.stopButton['elt']);
      patternsListElement['elt'].append(this.linebreak);

      this.saveSceneButton   = createButton('Save scene');
      this.saveSceneButton.style('border', '1px solid #000000');
      this.saveSceneButton.mousePressed(() => this.saveScene());      
      this.linebreak2 = document.createElement("br");
      this.scenesElement = createDiv('Pattern #' + this.number + ' scenes');
      this.scenesElement.size(250, height/3);
      this.scenesElement.position(width-250, 30+height/3);
      this.scenesElement.style('background-color', '#ffffff');
      this.scenesElement.style('overflow', 'auto');
      this.scenesElement.style('overflow-x', 'hidden');
      this.scenesElement.attribute('id', 'scenes-div');
      this.scenesElement.attribute('font-family', 'Arial, Helvetica, sans-serif');

      this.scenesListElement = createDiv('');
      this.scenesListElement.style('width', '95%');
      this.scenesListElement.style('height', '75%');
      this.scenesListElement.style('background-color', '#ffffff');
      this.scenesListElement.style('border-width', '1px');
      this.scenesListElement.style('border-color', '#000000');
      this.scenesListElement.style('border-style', 'solid');
      this.scenesListElement.style('margin', '3px');
      this.scenesListElement.style('overflow-y', 'auto');

      this.scenesElement['elt'].appendChild(this.linebreak2);  
      this.scenesElement['elt'].appendChild(this.saveSceneButton['elt']);    
      this.scenesElement['elt'].appendChild(this.scenesListElement['elt']);

      this.scenesElement.hide();


  }

  /* to do: need to check and make sure rig is consistently connected and set up */
  saveScene() {
    if (!universe.dmxController.out.connectedTo) {
      alert("You must have at least one connected in your fixture to save a scene");
      return;
    }

    var scene = new Scene(this, this.scenes.length);
    for (var f = 0; f < universe.fixtures.length; f++) {
      var fixture = universe.fixtures[f];
      var fixtureJson = {name: fixture.name, number: fixture.number, startingAddress: fixture.startingAddress,channels:[], positionX: fixture.x, 
        positionY: fixture.y, color: fixture.color, brightness: fixture.brightness, size: fixture.size, connectedTo: fixture.connectedTo,
            connectedBy: fixture.connectedBy};
        for (var c = 0; c < fixture.channels.length; c++) {
            var channel = fixture.channels[c];
            fixtureJson['channels'].push({name: channel.name, number: channel.number, value: channel.value});
        }
      scene.fixtureInfo.push(fixtureJson);
    }
    this.scenes.push(scene);
  }
    
  removeScene(sceneNumber) {
    if (confirm("Are you sure you want to delete scene #" + parseInt(sceneNumber+1) + "?")) {
      // delete 
      console.log("deleting shit");
      for (var s = 0; s < this.scenes.length; s++) {
        if (sceneNumber == s) {
          this.scenes[s].removeUIElements();
          this.scenes.splice(s, 1);
        }
      }
      this.renumberScenes();
    } else {
      // do nothing
    }   
  }

  renumberScenes() {
    for (var i = 0; i < this.scenes.length; i++) {
      //console.log ("old: " + this.scenes[i].number + " new: " + i);
      this.scenes[i].number = i;
      this.scenes[i].deleteButton.mousePressed(() => this.removeScene(i));
      //console.log(this.scenes[i].selectButton['elt'].value);
      this.scenes[i].selectButton['elt'].value = 'Scene ' + parseInt(i+1);
    }
  }

  selected() {
    for (var i = 0; i < patterns.length; i++) {
      patterns[i].deselected();
    }
    this.button.style('background-color', '#00ff00');
    this.scenesElement.show();
  }

  deselected() {
    for (var i = 0; i < this.scenes.length; i++) {
      this.scenes[i].deselected();
    }    
    this.button.style('background-color', '#ffffff');
    this.scenesElement.hide();
  }

  play() {
    if (live)
      playPatternDMX(this);
    var waittime = 0;
    for (var s = 0; s < this.scenes.length; s++) {
      var scene = this.scenes[s];
      scene.waitAndShow(waittime);
      waittime += scene.length;
    }
    return waittime;
  }    

  loop() {
    if (live)
      loopPatternDMX(this);    
    for (var i = 0; i < patterns.length; i++) {
      patterns[i].stopLooping();
    }
    var totalwaittime = this.play();
    this.timeIntervalID = setInterval(() => {
      this.play();
    }, totalwaittime); 
  }

  stopLooping() {
    if (live)
      stopLoopingPatternDMX();       
    clearInterval(this.timeIntervalID);
    this.timeIntervalID = null; 
  }

}

