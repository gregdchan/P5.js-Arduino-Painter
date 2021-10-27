
//Greg Chan
//Creative coding + Interface lab


//00 - set up variables
let serial; // Variable for serial controller
let sensors = [0, 0, 0, 0]; // array to hold data from arduino
let aX, aY, dPot, resetBtn; //set up variables for each sensors data being read
let options = { baudrate: 9600}; // change the data rate to whatever you wish
let portSelector; //set up a port selector for easy switching
let easing = 0.01; //set up easing/lerp to stablize brush
let x = 1; //variable for easing x
let y = 1; //variable for easing y
let colors = [];
let bg;


//01 setup()
function setup() {
  //serial port check and configuration
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();      // list the serial ports
                

  //start set up process
  createCanvas(1000, 700);  //create canvas
  resetSketch();     //reset sketch function upon button press


  var button = createButton ('Reset');    //set up and place reset buttons, button location and action
  button.position (10, 710)
  button.mousePressed(resetSketch);

  var button = createButton ('Save');  //set up and place save buttons, button location and action
  button.position (70, 710)
  button.mousePressed(saveSketch);


let baseHue = random(0, 300);    //set up complementary colors

  for (let i = 0; i < 6; i++) {   //create array of 6 colors
    let h = baseHue + (i * 40);   //40 degrees from each other
    let s = 80;     //set saturation
    let b = 85;     //set brightness
    let a = 0.5     //set opacity
    colors.push([h, s, b, a]); //generate color array
  }
bg=colors[4];
  background(bg);  //make first color bg


 
  aX = width;       //place sensor points
  aY = height;
  dPot = height / 2;

}

//02 Set up additional functions for serial controllers and button actions
function resetSketch () {     //Reset sketch function
  background(210);
  colorMode(HSB, 360, 100, 100, 1);
  noStroke();
;
}

function saveSketch () {    //savesketch function
  saveCanvas('myPortrait', 'jpg');  //screenshot of canvas is saved.
resetSketch();
}

function serverConnected() {   //console alert
  console.log('connected to server.');
}

function serialEvent() {    //read serial event, separate and print string
  let currentString = serial.readLine(); // store the data in a variable
  trim(currentString); // get rid of whitespace
  if (!currentString) return; // if there's nothing in there, ignore it
  sensors = split(currentString, ',');
  console.log(sensors);
  serial.write('A');
}

function portOpen() {  //serial port open alert
  print("Serial Port is Open");
  serial.clear(); // clears the buffer of any outstanding data
  serial.write('A'); // send a byte to the Arduino
}

 
function serialError(err) {  //serialport error alert
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {  //serialport closed alert
  console.log('The serial port closed.');
}
 
// make a serial port selector
function printList(portList) {
  // create a select object:
  portSelector = createSelect();
  portSelector.position(10, 670);
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

//03 draw and movements and interactions
function draw() {
//show axis info on sensors
  noStroke();  
  fill(255);
  rect(0, 0, 240, 30);
  fill(0);
  text('X-Axis: ' + sensors[0] + ', Y-Axis: ' + sensors[1] + ', Diameter: ' + sensors[2], 10, 10);  //sensor array is shown in the group
  

  let aX = sensors[0];    //I already mapped x axis in arduino, so I can us it across the canvas 1000px
  let aY = sensors[1];    //also mapped Y axis already
  let dPot = sensors[2];    //potentiometer already mapped 0 to 255 on arduino, now attached to dPot variable
  let dPotmap = map(dPot,10, 255, 0, .5);
  let mappedHue = map(dPot, 0, 255, 0,330); //set up color selector
  let hue = map(dPot, 0, 255, 0, 330);    //set up hue

  let resetBtn = sensors[3];
  let saveBtn = sensors[4];
  let aXmap = map(aX, 0,1000,0,330);
  let dPotmap2 = map(dPot, 0, 255, 0, 330)


  //easing to stablize the paintbrush - from week 2 or 3 hw!
  let targetX = aX;
  let dx = targetX - x;
  x += dx * easing;
  
  let targetY = aY;
  let dy = targetY - y
  y += dy* easing;


  for (let i = 0; i <40; i+=1) {
    let fg1 = i*i;
frameRate(40);
      strokeWeight(i/20);
      stroke(mappedHue+i*2, 80, 80,dPotmap*3)
  
      fill(mappedHue, 80, 80,dPotmap );
      circle (x, y, dPot, dPotmap/1.5);
     //circle(x, y,dPot,dPotmap);
    
   
  }
  


 if (resetBtn>=100) {
   resetSketch();
 }
 if (saveBtn>=100) {
  saveSketch();
  resetSketch();

}

}

