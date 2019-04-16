var locked = false; 
var layoutObjects;
var inProgressLineStartPointX = inProgressLineStartPointY = 0;
var inProgressLineEndPointX   = inProgressLineEndPointY   = 0;
var lineDrawingInProgress = false;
var firstConnectionInLine = null;
var cables = [];

/* 
 * Update fixture layout based on current state,
 * this includes positions, colors, hovering, etc
 */
function displayObjects() {
  layoutObjects = [universe.dmxController, universe.dmxController.out];
  // at some point universes should be children of dmx controllers
    for (let f = 0; f < universe.fixtures.length; f++){
      var fixture = universe.fixtures[f];
      layoutObjects.push(fixture);
      layoutObjects.push(fixture.in);
      layoutObjects.push(fixture.out);
    }
  for (let i = 0; i < layoutObjects.length; i++) layoutObjects[i].display();
  for (var c = 0; c < cables.length; c++) cables[c].display();
  stroke(255);
  if (lineDrawingInProgress) line(inProgressLineStartPointX, inProgressLineStartPointY, mouseX, mouseY);
}

function mousePressedLayoutEditingMode() {
  for (let i = 0; i < layoutObjects.length; i++) {
    var thing = layoutObjects[i];
    if (thing.isHovered && thing.isHovered()) {
      if (thing.pressed) thing.pressed();
    }
  }
}

function mouseDraggedLayoutEditingMode() {
  if (lineDrawingInProgress) {
    inProgressLineEndPointX = mouseX;
    inProgressLineEndPointY = mouseY;
  } else {
    for (let i = 0; i < layoutObjects.length; i++) {
      var thing = layoutObjects[i];
      if (thing.isHovered()) {
        thing.dragged();
        if (thing.connectingAWire && thing.connectingAWire() && thing.type == 'out'){
          if (!thing.connectedTo) { // the thing is not currently connected to anything
            if (!lineDrawingInProgress){
              firstConnectionInLine = thing;
              inProgressLineStartPointX = thing.x;
              inProgressLineStartPointY = thing.y;
              lineDrawingInProgress = true;
            }
          }
          else {
            for (var c = 0; c < cables.length; c++) {
              if (cables[c].firstObject == thing) {
                cables[c].firstObject.connectedTo = null;
                cables[c].secondObject.connectedBy = null;
                delete cables[c];
                cables.splice(c, 1);
                return;
              }
            }
          }
        }
      }
    }
  }
}

function mouseReleasedLayoutEditingMode() {
  if (lineDrawingInProgress){
    for (let i = 0; i < layoutObjects.length; i++) {
      var thing = layoutObjects[i];
      if (thing.isHovered() && thing.connectingAWire && // we are hovering an attachable node
         (thing.parent != firstConnectionInLine.parent && // don't connect with a cable if part of same fixture
            (thing.type != firstConnectionInLine.type))) { // don't connect with cable unless it's an in and out connection
              var cable = new Cable(firstConnectionInLine, thing);
              cables.push(cable);
              firstConnectionInLine.connectedTo = thing;
              thing.connectedBy = firstConnectionInLine;
              if (firstConnectionInLine.type) {
                thing.startingAddress = 0;
              }
            }
    }
  }
  lineDrawingInProgress = false;
  for (let i = 0; i < layoutObjects.length; i++) {
      var thing = layoutObjects[i];
      if (thing.released) thing.released();
  }
}

function addFixture(universeNumber, fixtureType) {
  if (fixtureType == 'RGB Light') {
    universe.addFixture(new RGBFixture(universe.fixtures.length));
  }
}

