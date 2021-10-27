// Greg Chan
// Creative Coding/Interface lab

let serial;          // variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem3101';  // fill in your serial port name here
let inData;                             // for incoming serial data
let diameter = 10;
let options = { baudrate: 9600}; // change the data rate to whatever you wish
let portSelector;




 
function setup() {

  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports

  createCanvas(700, 500);
  resetSketch();
  var button = createButton ('Reset');
  button.mousePressed(resetSketch);
  var button = createButton ('Save');
  button.mousePressed(saveSketch);
} 

function resetSketch () {
  background(204);
  colorMode(HSB);
  noStroke();
  
}
function saveSketch () {
  saveCanvas('myPortrait', 'jpg');
  
}
function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}
 
function serialEvent() {
  inData = Number(serial.read());
  serial.println(inData);
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}
 
// make a serial port selector object:
function printList(portList) {
  // create a select object:
  portSelector = createSelect();
  portSelector.position(10, 10);
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // add this port name to the select object:
    portSelector.option(portList[i]);
  }
  // set an event listener for when the port is changed:
  portSelector.changed(mySelectEvent);
  }

  function mySelectEvent() {
  let item = portSelector.value();
   // if there's a port open, close it:
  if (serial.serialport != null) {
    serial.close();
  }
  // open the new port:
  serial.open(item);
}
function draw() {
  fill (0);
  text("sensor value: " + inData, 30, 50);

  let hue = map(mouseX, 0, width, 0, 360);
  if(mouseIsPressed == true ){
    noFill();
    strokeWeight(3);
    stroke(RGB, 255, mouseX/2, mouseY/2, 1);
          circle(mouseX, mouseY, diameter);
  }else{
    noStroke();
    fill(hue, 70, 80, 0.8); 

    
  }
  
  // set the diameter of the circle based on the distance
  // between the previous mouse points and current mouse points
  diameter = dist(mouseX, mouseY, pmouseX, pmouseY);
    
  square(mouseX, mouseY, diameter);
}

function keyPressed(){
  // Any key but space barss resets the screen
  if(key != ' '){
    colorMode(RGB, inData, inData, 255);
    background(204);
    colorMode(HSL);
  }
}

