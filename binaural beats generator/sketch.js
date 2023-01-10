//reference: https://tonejs.github.io/
//reference: https://codeblock.at/2018/01/binaural-beat-generator-wave-visualisation/
//reference: https://github.com/dataarts/dat.gui
//initialise the variables
//left and right channel
var waveL;
var waveR;
let aduioIsOn = false; 
let msg = false;
//oscillators for sound adjustment
let oscL;  
let oscR;
//for visualization
let waveformL; 
let waveformR; 
//for user interface
let gui; 
let sinimg;
let trimg;
let squimg;
let sawimg;
let sliderL, sliderR;
let volumeL, volumeR;
//effects
let delayL;
let delayR;
//just intonation
//reference:http://www.silkqin.com/08anal/intn.htm
// var pitchL = [182, 316, 204, 182, 316];
// var pitchR = [182, 316, 204, 182, 316];

function preload(){
  //load the image for waveform selection button
  sinimg = loadImage("assets/sin.jpg");
  trimg = loadImage("assets/tri.jpg");
  squimg = loadImage("assets/squa.jpg");
  sawimg = loadImage("assets/saw.jpg");
}

function setup() { 
  createCanvas(windowWidth, windowHeight);
  //set up the sliders 
  //for pitch
  //set the frequency range between 80 - 550hz
  sliderL = new Slider(80, 550, 182, 1);
  sliderL.position(60, height/1.22, 150);
  sliderR = new Slider(80, 550, 190, 1);
  sliderR.position(width/1.4, height/1.22, 150);
  //for volume
  //set the volume range between -64 to 0dB
  volumeL = new Slider(-64, 0, -9, 1);
  volumeL.position(60, height/1.22+30, 150);
  volumeR = new Slider(-64, 0, -9, 1);
  volumeR.position(width/1.4, height/1.22+30, 150);
}

function initializeAudio() {
  //left channel
  //volume and panning
  //set the volume to -9 decibels 
  volL = new Tone.Volume(-9).toDestination();
  waveL = new Tone.Panner(-1).connect(volL);
  delayL = new Tone.Delay(0.1).connect(waveL);
  //build an amplitude modulated oscillator and pan it to the left
  oscL = new Tone.AMOscillator();
  oscL.type = "sine";
  oscL.modulationType = "sine";
  oscL.connect(delayL);
  oscL.start();

  //right channel
  //volume and panning
  volR = new Tone.Volume(-9).toDestination();
  waveR = new Tone.Panner(1).connect(volR);
  delayR = new Tone.Delay(0.1).connect(waveR);
  //build an amplitude modulated oscillator and pan it to the left
  oscR = new Tone.AMOscillator(204, "sine", "sine");
  oscR.connect(delayR);
  oscR.start();

  //using waveform to visualize the waves
  //left channel 
  waveformL = new Tone.Waveform();
  oscL.connect(waveformL);

  //right channel
  waveformR = new Tone.Waveform();
  oscR.connect(waveformR);

   
  //testing parameters below
  //----------------------------------------------------
  //set four different oscillator types
  // let oscType = ["sine", "triangle", "square", "sawtooth"];
  // let modulationType = ["sine", "triangle", "square", "sawtooth"];
  
  //fast gui for adjusting the sound 
  //for left channel
  // const gui = new dat.GUI();
  // gui.add(oscL.frequency, "value", 80, 550).step(0.1).name("frequency");
  // gui.add(oscL, "type", oscType).name("type");
  // gui.add(oscL, "modulationType", modulationType).name("type");
  //for right channel
  // gui.add(oscR.frequency, "value", 80, 550).step(0.1).name("frequency");
  // gui.add(oscR, "type", oscType).name("type");
  // gui.add(oscR, "modulationType", modulationType).name("type");
}

//----------------------------------------------------
function draw() {  

  strokeWeight(5);
  if (aduioIsOn) {
    // our main sketch
    background(255);
    noStroke();
    fill(195, 28, 0);
    ellipse(width/6.5, height/5, height/8);
    
    //get the value to draw the visual waveform
    let buffer = waveformL.getValue(); 
    let bufferR = waveformR.getValue();


    //----------------------------------------------------
    //render the sliders for pitch and volume control
    //slider for left channel
    //pitch
    mouseHovered();
    sliderL.render();
    fill(1, 48, 132);
    noStroke();
    textSize(16);
    text(sliderL.value + "hz", 235, height/1.22);
    //volume
    mouseHovered();
    volumeL.render();
    fill(1, 48, 132);
    noStroke();
    textSize(16);
    text(volumeL.value + "dB", 235, height/1.22+35);

    //slider for right channel
    //pitch
    mouseHovered();
    sliderR.render();
    fill(1, 48, 132);
    noStroke();
    textSize(16);
    text(sliderR.value + "hz", width/1.4 + 175, height/1.22);
    //volume
    mouseHovered();
    volumeR.render();
    fill(1, 48, 132);
    noStroke();
    textSize(16);
    text(volumeR.value + "dB",  width/1.4 + 175, height/1.22+35);

    //----------------------------------------------------
    //button for left channel
    image(sinimg, 60, height/1.5, 40, 40);
    image(trimg, 110, height/1.5, 40, 40);
    image(squimg, 160, height/1.5, 40, 40);
    image(sawimg, 210, height/1.5, 40, 40);
    image(sinimg, 60, height/1.35, 40, 40);
    image(trimg, 110, height/1.35, 40, 40);
    image(squimg, 160, height/1.35, 40, 40);
    image(sawimg, 210, height/1.35, 40, 40);
    //button for right channel
    image(sinimg, width/1.4, height/1.5, 40, 40);
    image(trimg, width/1.4+50, height/1.5, 40, 40);
    image(squimg, width/1.4+100, height/1.5, 40, 40);
    image(sawimg, width/1.4+150, height/1.5, 40, 40);
    image(sinimg, width/1.4, height/1.35, 40, 40);
    image(trimg, width/1.4+50, height/1.35, 40, 40);
    image(squimg, width/1.4+100, height/1.35, 40, 40);
    image(sawimg, width/1.4+150, height/1.35, 40, 40);

    //----------------------------------------------------
    //left channel 1
    noFill();
    stroke(193, 226, 255);
    let start1 = 0; 
    for (let i=1; i < buffer.length; i++) {
      if (buffer[i-1] < 0 && buffer[i] >= 0) {
        start1 = i;
        // interrupts the for loop
        break;  
      }
    }
    //length for the waveform
    let end1 = buffer.length/2 + start1; 
    
    beginShape();
    for (let i=start1; i < end1; i++) {      
      let x = map(i, start1, end1, 0, width);
      let y = map(buffer[i], -1, 1, height*0.23, height*0.43);      
      vertex(x, y);
    }
    endShape();
    
    //----------------------------------------------------
    //right channel 1
    noFill();
    stroke(77, 178, 254);
    let startR = 0; 
    for (let i=1; i < bufferR.length; i++) {
      if (bufferR[i-1] < 0 && bufferR[i] >= 0) {
        startR = i;
        // interrupts the for loop 
        break; 
      }
    }
    //length for the waveform
    let endR = bufferR.length/2 + startR; 

    beginShape();
    for (let i=startR; i < endR; i++) {      
      let x = map(i, startR, endR, 0, width);
      let y = map(bufferR[i], -1, 1, height*0.27, height*0.47);      
      vertex(x, y);
    }
    endShape();

    //----------------------------------------------------
    //left channel 2
    noFill();
    stroke(65, 160, 238);
    let start2 = 0; 
    for (let i=1; i < buffer.length; i++) {
      if (buffer[i-1] < 0 && buffer[i] >= 0) {
        start2 = i;
        // interrupts the for loop
        break;  
      }
    }
    //length for the waveform
    let end2 = buffer.length/2 + start2; 
    
    beginShape();
    for (let i=start2; i < end2; i++) {      
      let x = map(i, start2, end2, 0, width);
      let y = map(buffer[i], -1, 1, height*0.31, height*0.51);      
      vertex(x, y);
    }
    endShape();

    //----------------------------------------------------
    //left channel 3
    noFill();
    stroke(26, 124, 209);
    let start3 = 0; 
    for (let i=1; i < buffer.length; i++) {
      if (buffer[i-1] < 0 && buffer[i] >= 0) {
        start3 = i;
        // interrupts the for loop
        break;  
      }
    }
    //length for the waveform
    let end3 = buffer.length/2 + start3; 
    
    beginShape();
    for (let i=start3; i < end3; i++) {      
      let x = map(i, start3, end3, 0, width);
      let y = map(buffer[i], -1, 1, height*0.35, height*0.55);      
      vertex(x, y);
    }
    endShape();
    
    //----------------------------------------------------
    //right channel 2
    let startR1 = 0; 
    noFill();
    stroke(5, 82, 166);
    for (let i=1; i < bufferR.length; i++) {
      if (bufferR[i-1] < 0 && bufferR[i] >= 0) {
        startR1 = i;
        // interrupts the for loop 
        break; 
      }
    }
    //length for the waveform
    let endR1 = bufferR.length/2 + startR1; 

    beginShape();
    for (let i=startR1; i < endR1; i++) {      
      let x = map(i, startR1, endR1, 0, width);
      let y = map(bufferR[i], -1, 1, height*0.39, height*0.59);      
      vertex(x, y);
    }
    endShape();

    //----------------------------------------------------
    //right channel 3
    noFill();
    stroke(1, 48, 132);
    let startR2 = 0; 
    for (let i=1; i < bufferR.length; i++) {
      if (bufferR[i-1] < 0 && bufferR[i] >= 0) {
        startR2 = i;
        // interrupts the for loop 
        break; 
      }
    }
    //length for the waveform
    let endR2 = bufferR.length/2 + startR2; 
    beginShape();
    for (let i=startR2; i < endR2; i++) {      
      let x = map(i, startR2, endR2, 0, width);
      let y = map(bufferR[i], -1, 1, height*0.43, height*0.63);      
      vertex(x, y);
    }
    endShape();
    
    
        
  }
  else {
    //draw the enter screen visual
    background(255); 
    fill(1, 48, 132);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("click to start binaural beats generator", width/2, height/2);
    text("please use headphones", width/2+30, height/2+30);
  }  
}

//----------------------------------------------------
function mouseHovered(){
  sliderL.mouseHovered();
  sliderR.mouseHovered();
  volumeL.mouseHovered();
  volumeR.mouseHovered();
}

//----------------------------------------------------
function mouseDragged(){
 sliderL.mouseDragged(); 
 //map the frequency of the left oscillator to the mouseX position
 //when dragging the slider
 if(mouseX > 60 && mouseX < 215 && mouseY > height/1.22 && mouseY < height/1.22 + 20){
  oscL.frequency.rampTo(map(mouseX, 60, 210, 80, 550, true), 0.1);
 }
 sliderR.mouseDragged(); 
 //map the frequency of the right oscillator to the mouseX position
 //when dragging the slider
 if(mouseX > width/1.4 && mouseX < width/1.4 + 150 && mouseY > height/1.22 && mouseY < height/1.22 + 20){
  oscR.frequency.rampTo(map(mouseX, width/1.4, width/1.4 + 150, 80, 550, true), 0.1);
 }
 //map the volume of the left oscillator to the mouseX position
 //when dragging the slider
 volumeL.mouseDragged(); 
 if(mouseX > 60 && mouseX < 215 && mouseY > height/1.22+35 && mouseY < height/1.22 + 55){
  volL.volume.rampTo(map(mouseX, 60, 210, -64, 0, true), 0.1);
 }
 //map the volume of the right oscillator to the mouseX position
 //when dragging the slider
 volumeR.mouseDragged(); 
 if(mouseX > width/1.4 && mouseX < width/1.4 + 150 && mouseY > height/1.22+35 && mouseY < height/1.22 + 55){
  volL.volume.rampTo(map(mouseX, 60, 210, -64, 0, true), 0.1);
 }
}

//----------------------------------------------------
function mouseReleased(){
 sliderL.mouseReleased(); 
 sliderR.mouseReleased();
 volumeL.mouseReleased(); 
 volumeR.mouseReleased(); 
}

//----------------------------------------------------
function mousePressed() {
  sliderL.mousePressed();
  sliderR.mousePressed();
  volumeL.mousePressed();
  volumeR.mousePressed();
  if (aduioIsOn == false) {
    aduioIsOn = true;
    initializeAudio();
  }  
  //left channel
  //main oscillator
  if(mouseX > 60 && mouseX < 100 && mouseY > height/1.5
  && mouseY < height/ 1.5 + 40){
    oscL.type = "sine";
  }
  if(mouseX > 110 && mouseX < 150 && mouseY > height/1.5 
  && mouseY < height/ 1.5 + 40){
    oscL.type = "triangle";
  }
  if(mouseX > 160 && mouseX < 200 && mouseY > height/1.5 
  && mouseY < height/ 1.5 + 40){
    oscL.type = "square";
  }
  if(mouseX > 210 && mouseX < 250 && mouseY > height/1.5 
  && mouseY < height/ 1.5 + 40){
    oscL.type = "sawtooth";
  }
  //modulation oscillator
  if(mouseX > 60 && mouseX < 100 && mouseY > height/1.35 
  && mouseY < height/ 1.35 + 40){
    oscL.modulationType = "sine";
  }
  if(mouseX > 110 && mouseX < 150 && mouseY > height/1.35 
  && mouseY < height/ 1.35 + 40){
    oscL.modulationType = "triangle";
  }
  if(mouseX > 160 && mouseX < 200 && mouseY > height/1.35 
  && mouseY < height/ 1.35 + 40){
    oscL.modulationType = "square";
  }
  if(mouseX > 210 && mouseX < 250 && mouseY > height/1.35 
  && mouseY < height/ 1.35 + 40){
    oscL.modulationType = "sawtooth";
  }
  //----------------------------------------------------
  //right channel
  //main oscillator
  if(mouseX >  width/1.4 && mouseX <  width/1.4+ 40 && mouseY > height/1.5 
  && mouseY < height/ 1.5 + 40){
    oscR.type = "sine";
  }
  if(mouseX > width/1.4+50 && mouseX < width/1.4+90 && mouseY > height/1.5 
  && mouseY < height/ 1.5 + 40){
    oscR.type = "triangle";
  }
  if(mouseX > width/1.4+100 && mouseX < width/1.4+140 && mouseY > height/1.5 
  && mouseY < height/ 1.5 + 40){
    oscR.type = "square";
  }
  if(mouseX > width/1.4+150 && mouseX < width/1.4+190 && mouseY > height/1.5 
  && mouseY < height/ 1.5 + 40){
    oscR.type = "sawtooth";
  }
  //modulation oscillator
  if(mouseX > width/1.4 && mouseX < width/1.4 + 40 && mouseY > height/1.35 
  && mouseY < height/ 1.35 + 40){
    oscR.modulationType = "sine";
  }
  if(mouseX > width/1.4 + 50 && mouseX < width/1.4 + 90 && mouseY > height/1.35 
  && mouseY < height/ 1.35 + 40){
    oscR.modulationType = "triangle";
  }
  if(mouseX > width/1.4 + 100 && mouseX < width/1.4 + 140 && mouseY > height/1.35 
  && mouseY < height/ 1.35 + 40){
    oscR.modulationType = "square";
  }
  if(mouseX > width/1.4 + 150 && mouseX < width/1.4 + 190 && mouseY > height/1.35 
  && mouseY < height/ 1.35 + 40){
    oscR.modulationType = "sawtooth";
  }
  }
