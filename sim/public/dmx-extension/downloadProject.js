function layoutToJson() {
  var layout = {dmxControllers: [{type: universe.dmxController.type, number: universe.dmxController.number,
                    positionX: universe.dmxController.x,  positionY: universe.dmxController.y, universes: []}],
                universes: [{name: universe.name, number: universe.number, fixtures: []}]};
  for (var f = 0; f < universe.fixtures.length; f++){
    fixture = universe.fixtures[f];
    fixtureJson = {name: fixture.name, number: fixture.number, startingAddress: fixture.startingAddress,channels:[], positionX: fixture.x, 
    positionY: fixture.y, color: fixture.color, brightness: fixture.brightness, size: fixture.size};
    for (var c = 0; c < fixture.channels.length; c++){
      channel = fixture.channels[c];
      fixtureJson['channels'].push( {name: channel.name, number: channel.number, value: channel.value} );
    }
    layout['universes'][0]['fixtures'].push(fixtureJson);
  }
  return layout;
}

function patternsToJson() {
  var patternsList = [];
  for (var p = 0; p < patterns.length; p++) { // patterns is a list of pattern objects
    var patternJson = {name: '', fixtureInfo: []};
    for (var s = 0; s < patterns[p]["scenes"].length; s++){
      console.log(patterns[p]["scenes"][s]);
      for (var f = 0; f < patterns[p]["scenes"][s]["fixtureInfo"].length; f++){
        var fixtureInfoJson = patterns[p]["scenes"][s]["fixtureInfo"][f];
        patternJson['fixtureInfo'].push(fixtureInfoJson);        
      }
    }
    patternsList.push(patternJson);
  }
  //usercode["patterns"] = patternsList; // usercode for generating blocks
  //console.log({patterns: patternsList});
  return {patterns: patternsList};
}

function patternsToOrderedChannelDataJson() {
  
}

function saveProject() {
  var project = {layout: layoutToJson(), patterns: patternsToJson()};
  var stringifiedProject = JSON.stringify(project);
  var d = new Date();
  var filename = 'dmxproject' + '_' + (d.getMonth()+1).toString() + '_' + d.getDate() + '_' + d.getFullYear() + '.json';
  download(stringifiedProject, filename, 'json');
}
  
function download(data, filename, type) {
  var file = new Blob([data], {type: type});
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
    var a = document.createElement("a");
    var url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);  
    }, 0); 
  }
}
