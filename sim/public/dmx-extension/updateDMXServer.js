/*
 Eventually I will implement functions to take the layout and animations and turn them into makecode blocks,
 then the makecode pi will take care of the node-dmx updating
*/

function runAnimation(dmxInfo) {
    socket.emit('run-animation', dmxInfo);
}

function loopAnimation(dmxInfo) {
  socket.emit('loop-animation', dmxInfo);
}

function updateServer(dmxInfo) {  // send the server the updated rig information
    socket.emit('dmx-updated', dmxInfo);
}

function updateLayout() {
    var channelsList = generateOrderedChannelsList();
    var dmxInfo = dmxInfoToJson(channelsList);
    updateServer(dmxInfo);
}

function dmxInfoToJson(allChannels) {
    return {dmxControllerType: universe.dmxController.type, universeName: universe.name, channels: allChannels};
}

function dmxInfoToJson(allChannels) {
    return {dmxControllerType: universe.dmxController.type, universeName: universe.name, channels: allChannels};
}

function generateOrderedChannelsList() {
    var channelsList = {};
    var startingAddress = 1; // starting address of dmx controllers begin at 1, not 0
    var node = universe.dmxController.out.connectedTo.parent;
    while (node) {
        node.startingAddress = startingAddress;
        for (var c = 0; c < node.channels.length; c++) {
            channelsList[startingAddress + c] = node.channels[c].value;
        }
        startingAddress = startingAddress + node.channels.length;
        if (node.out && node.out.connectedTo && node.out.connectedTo.parent) {
            node = node.out.connectedTo.parent;
        } else {
            node = null;
        }
    }
    //console.log(channelsList);
    return channelsList;
}

function playPatternDMX(pattern) {
  updateLayout();
  var patternJson = getAnimationJson(pattern);
  runAnimation(patternJson);  
}

function loopPatternDMX(pattern) {
  updateLayout();
  var patternJson = getAnimationJson(pattern);
  loopAnimation(patternJson);  
}

function getAnimationJson(activePattern) {
  var patternJson = [];
  var node = universe.dmxController.out.connectedTo.parent;
  while (node) {
    var nodeName = node.name;
    for (var s = 0; s < activePattern.scenes.length; s++) {
      var startingAddress = 1;
      node.startingAddress = startingAddress;
      var scene = activePattern.scenes[s];
      channels = {};
      for (var f = 0; f < scene.fixtureInfo.length; f++) {
        var fixture = scene.fixtureInfo[f];
        if (nodeName == fixture.name) { // need to fix later for arbitrary channel values
          for (var c = 0; c < fixture['channels'].length; c++) { // get channel info per fixture per scene
            channels[c + startingAddress] = fixture['channels'][c].value;
          }
          startingAddress += fixture['channels'].length;
        }
      }
      patternJson.push({channelData: channels, time: scene.length});
    }
    if (node.out && node.out.connectedTo && node.out.connectedTo.parent) {
        node = node.out.connectedTo.parent;
    } else {
        node = null;
    }
  }  
  console.log(patternJson);
  return patternJson;
}

function stopLoopingPatternDMX() {
  socket.emit('stop-all-animations', {});
}