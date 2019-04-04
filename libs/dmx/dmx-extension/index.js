/* 
 * This file sets up our p5.js canvas and initializes
 * the UI elements of the editor
 * Author: Annie Kelly
 */

//var socket = io();                // creates web socket connection to server

var universe;                     // for now you can edit one DMX512 universe at a time
var patterns = [];                // keeps track of patterns (animations) users have created
var pattern;                      // change this later

var mode = 0;                     // application starts out in layout editing mode
var selectedModeHighlightX = 0;   // position of highlighted segment in nav bar

var fixtureButton, saveRigButton, // references to UI elements
  animationButton, liveModeButton,
  uploadLayoutButton, layoutEditModeButton,
  fixtureSelect, patternsElement, liveButton;

var live;

/* 
 * initializes our dmx universe & sets up our editor, p5.js function that runs once
 */
function setup() {
  live = 0;
  universe = new Universe(0);
  var canvas = createCanvas((windowWidth) / 1.02, (windowHeight) / 1.02);
  canvas.style('display', 'block');
  canvas.parent('fixture-editor'); 
  createAndShowUIButtons();
  createAndShowLayoutUIButtons();
  createAndShowAnimationUIButtons();
  hideAnimationUIButtons();
}

/*
 * p5.js loop that updates our canvas and makes calls to render our objects
 */
function draw() { 
  background(0);
  displayObjects();
  fill(255);
  stroke(255);
  rect(0, 0, windowWidth, 20);
  fill(0);
  stroke(255);
  textSize(12);
  text('upload project', 760, 15);  
  fill(167, 0, 255);
  stroke(0);
  rect(selectedModeHighlightX, 20, 250, 5); 
}

function layoutEditingMode() {
  mode = 0;
  selectedModeHighlightX = 0;
  showLayoutUIButtons();
  hideAnimationUIButtons();
}

function animationMode() {
  mode = 1;
  selectedModeHighlightX = 500;
  showAnimationUIButtons();
  hideLayoutUIButtons();
}

function liveControlMode() {
  mode = 2;
  selectedModeHighlightX = 250;
  hideLayoutUIButtons();
  hideAnimationUIButtons();
}

/*
 * helper functions to show or hide relevant UI elements
 */
function showLayoutUIButtons() {
  fixtureSelect.show();
  fixtureButton.show();
  saveRigButton.show();  
}

function hideLayoutUIButtons() {
  fixtureSelect.hide();
  fixtureButton.hide();
  saveRigButton.hide();
}

function showAnimationUIButtons() {
  patternsElement.show();
  liveButton.show();
}

function hideAnimationUIButtons() {
  for (var i = 0; i < patterns.length; i++) {
    patterns[i].deselected();
  }
  patternsElement.hide();
  liveButton.hide();
}

/*
 * helper functions that actually initialize the UI elements in the DOM
 */
function createAndShowLayoutUIButtons() {
  fixtureSelect = createSelect();
  fixtureSelect.position(10, 40);
  for (var f = 0; f < fixtureOptions.length; f++) {
    fixtureSelect.option(fixtureOptions[f]);
  }
  fixtureButton = createButton('Add fixture');
  saveRigButton = createButton('Download project');
  fixtureButton.position(100, 40);
  fixtureButton.style('border', '1px solid #000000');
  saveRigButton.position(10, 60);
  saveRigButton.style('border', '1px solid #000000');
  fixtureButton.mousePressed(() => addFixture(0, fixtureSelect.value()));    
  saveRigButton.mousePressed(saveProject);    
}

function createAndShowAnimationUIButtons() {
  patternsElement = createDiv('Patterns');
  patternsElement.size(250, height/3);
  patternsElement.position(width-250, 28);
  patternsElement.style('background-color', '#ffffff');
  patternsElement.style('overflow', 'auto');
  patternsElement.style('overflow-x', 'hidden');
  patternsElement.attribute('id', 'scenes-div');
  patternsElement.attribute('font-family', 'Arial, Helvetica, sans-serif');
  patternsListElement = createDiv('');
  patternsListElement.style('width', '95%');
  patternsListElement.style('height', '75%');
  patternsListElement.style('background-color', '#ffffff');
  patternsListElement.style('border-width', '1px');
  patternsListElement.style('border-color', '#000000');
  patternsListElement.style('border-style', 'solid');
  patternsListElement.style('margin', '3px');
  patternsListElement.style('overflow-y', 'auto');
  makeNewPatternButton = createButton('Make new pattern');
  makeNewPatternButton.style('border', '1px solid #000000');
  makeNewPatternButton.mousePressed(() => makeNewPattern());
  liveButton = createButton("LIVE");
  liveButton.style('border', '1px solid #000000');
  liveButton.mousePressed(() => toggleLive());
  var linebreak = document.createElement("br");
  patternsElement['elt'].appendChild(liveButton["elt"]);  
  //patternsElement['elt'].appendChild(linebreak);  
  patternsElement['elt'].appendChild(makeNewPatternButton['elt']);  
  patternsElement['elt'].appendChild(patternsListElement['elt']);
  //pattern = new Pattern(patterns.length);
  //patterns.push(pattern);
}

function createAndShowUIButtons() {
  animationButton      = createButton('Animation editor');
  liveModeButton       = createButton('LIVE MODE');
  layoutEditModeButton = createButton('Layout editor');
  uploadLayoutButton = createFileInput(handleFile);
  animationButton.position(510, 10);
  liveModeButton.position(260, 10);
  layoutEditModeButton.position(10, 10);
  uploadLayoutButton.position(850, 10);  
  animationButton.mousePressed(animationMode); 
  liveModeButton.mousePressed(liveControlMode);
  layoutEditModeButton.mousePressed(layoutEditingMode);  
  animationButton.size(250);
  liveModeButton.size(250);
  layoutEditModeButton.size(250);
}

function makeNewPattern() {
  patterns.push(new Pattern(patterns.length));
}

function toggleLive() {
  live = !live;
}

/* 
 * p5.js mouse event handlers
 */
function mousePressed() {
  if (mode == 0)
    mousePressedLayoutEditingMode();
}

function mouseDragged() {
  if (mode == 0)
    mouseDraggedLayoutEditingMode();
}

function mouseReleased() {
  if (mode == 0)
    mouseReleasedLayoutEditingMode();
}

//function windowResized() { resizeCanvas(windowWidth, windowHeight); }