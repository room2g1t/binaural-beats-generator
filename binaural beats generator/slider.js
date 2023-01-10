//reference:https://editor.p5js.org/Kubi/sketches/03ncj5D9J

class Slider{
  //initialize the min, max, default value of the slider
    constructor(minValue, maxValue, defaultValue, step){
      this.minValue = minValue;
      this.maxValue = maxValue;
      this.value = defaultValue;
      this.tempValue = this.value;
      this.step = step;
      
      //set the x and y position and the width of the slider
      this.x = 0;
      this.y = 0;
      this.w = 100;
      
      //initialize the tumb position
      this.rThumb = 6;
      this.xTrack = this.x + this.rThumb;
      this.wTrack = this.w - 2 * this.rThumb;
      
      //initialize the event of the slider
      this.dragged = false;
      this.hovered = false;
      this.prevX = null;
      
      this.updateThumbPosition();
    }
    
    position(x, y, w){
      //update the thumb position
      this.x = x;
      this.y = y;
      this.w = w;
      this.xTrack = this.x + this.rThumb;
      this.wTrack = this.w - 2 * this.rThumb;
      this.updateThumbPosition();
    }
    
    mouseOnThumb(){
      //detect if the mouse is on the tumb
      let dist = p5.Vector.sub(createVector(this.xThumb, this.y), createVector(mouseX, mouseY)).mag();
      if(dist <= this.rThumb) return true
      return false
    }
    
    mouseHovered(){
      //detect if mouse is hovering on the thumb
      this.hovered = false;
      if(this.mouseOnThumb()){
        this.hovered = true;
      }
    }
    
    mousePressed() {
      //detect if mouse is dragged in the area
      this.dragged = false;
      
      if(this.mouseOnThumb()){
        this.prevX = mouseX;
        this.dragged = true;
      }
    }
    
    mouseDragged(){
      //if mouse is dragged
      if(this.dragged){
      let dX;
      let mouseTooLow = false;
      let mouseTooHigh = false;
      if(mouseX <= this.xTrack){
        if(this.prevX > this.xTrack) {
          dX = this.xTrack - this.prevX;
        }
        else dX = 0;
        this.prevX = this.xTrack;
        mouseTooLow = true;
      }
      else if(mouseX > this.xTrack && mouseX < this.xTrack + this.wTrack){
        dX = mouseX - this.prevX;
        this.prevX = mouseX;
      }
      else {
        if(this.prevX < this.xTrack + this.wTrack) {
          dX = this.xTrack + this.wTrack - this.prevX;
        }
        else dX = 0;
        this.prevX = this.xTrack + this.wTrack;
        mouseTooHigh = true;
      }
      
      //draw the track
      let valuePerPixel = (this.maxValue - this.minValue) / this.wTrack;
      let dValue = dX * valuePerPixel;
      
      this.tempValue += dValue;
      let deltaTempActual = this.tempValue - this.value;
      let steppedDeltaTempActual = round(deltaTempActual * (1 / this.step)) / (1 / this.step);
  
      if (abs(steppedDeltaTempActual) >= this.step){
        this.value += steppedDeltaTempActual;
      }
      
      if(this.value < this.minValue || mouseTooLow) this.value = this.minValue
      if(this.value > this.maxValue || mouseTooHigh) this.value = this.maxValue
      this.updateThumbPosition();
      }
    }
    
    mouseReleased(){
      this.dragged = false;
      this.tempValue = this.value;
    }
    
    updateThumbPosition(){
      this.xThumb = this.xTrack + map(this.value, this.minValue, this.maxValue, 0, this.wTrack);
    }
    
    //render the slider
    render(){
      // track
      // noStroke();
     // fill(219, 219, 218);
     //color of the slider
      stroke(219, 219, 218);
      strokeWeight(15);
      line(this.xTrack, this.y, this.xTrack + this.wTrack, this.y);
      
      // thumb
      if(this.hovered || this.dragged) stroke(5, 82, 166)
      else stroke(195, 28, 0)
      strokeWeight(this.rThumb * 2.5);
      point(this.xThumb, this.y);
    }
  }