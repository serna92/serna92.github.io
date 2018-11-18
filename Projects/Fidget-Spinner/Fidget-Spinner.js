var myFidget;
var spinning;
var instructions;

function setup(){

	createCanvas (300, 300);
	angleMode(DEGREES);
	spinning = false;
	myFidget = new Fidget();
	instructions = false;
	setTimeout(showInstructions, 1000);
	//var inp = createInput('');
    //inp.input(myInputEvent);
}

function myInputEvent() {
	
  width = this.value();
  height = this.value();
  deleteCanvas();
  createCanvas(width,height);
}

function draw(){
	
	background(0);
	myFidget.display();
	

	if(spinning || myFidget.rotSpeed != 0){
			myFidget.spin();
	}

	if (myFidget.rotSpeed == 0){
		
		setTimeout(showInstructions, 1000);
		if(instructions){
		
			fill('white');
			textSize(12 * (width / 150));
			text("Click or SPACE To Spin", (width / 150) * 10 - width / 2, -5 * (height / 150) + height / 2);
		}
		myFidget.resetPosition();
	}
}

function showInstructions(){

		instructions = true;
}

function keyPressed()
{
	if (keyCode === 32 && myFidget.rotSpeed == 0) {
		spinning = true;
	}
}

function touchStarted() {

	if(myFidget.rotSpeed == 0)
		spinning = true;

	return false;
}

function Fidget() {
	
	this.c = color(random(50, 255), random(50, 255), random(50, 255));
	this.rotSpeed = 0;
	this.x = 0;
	this.y = 0;
	this.angle = 0;
	
	this.resetPosition = function(){
		
		this.rotSpeed = 0;
		this.angle = 0;
	}
	
	this.spin = function (){
		
		if(this.rotSpeed > 50){
			spinning = false;
		}
		
		if(this.rotSpeed < 0){
			
			instructions = false;
			this.c = color(random(50, 255), random(50, 255), random(50, 255));
			this.rotSpeed = 0;
		}
		
		if(this.rotSpeed == 0){
			this.rotSpeed += 0.2;
		}
		
		this.angle += this.rotSpeed;
		
		if(spinning){
			this.rotSpeed += 0.2;
		}else{
			this.rotSpeed -= 0.2;
		}
	}
	
	this.display = function(){
		
		fill(this.c);
		translate(width / 2, height / 2);
		rotate(this.angle);
		ellipse ((width / 150) * 30*cos(0), (height / 150) * -30*sin(0), (width / 150) * 50, (height / 150) * 50);
		ellipse ((width / 150) * 30*cos(120), (height / 150) * -30*sin(120), (width / 150) * 50, (height / 150) * 50);
		ellipse ((width / 150) * 30*cos(240), (height / 150) * -30*sin(240), (width / 150) * 50, (height / 150) * 50);
		ellipse (this.x, this.y, (width / 150) * 50, (height / 150) * 50);
		
		fill(0);
		ellipse ((width / 150) * 30*cos(0), (height / 150) * -30*sin(0), (width / 150) * 20, (height / 150) * 20);
		ellipse ((width / 150) * 30*cos(120), (height / 150) * -30*sin(120), (width / 150) * 20, (height / 150) * 20);
		ellipse ((width / 150) * 30*cos(240), (height / 150) * -30*sin(240), (width / 150) * 20, (height / 150) * 20);
		ellipse (this.x, this.y, (width / 150) * 20, (height / 150) * 20);
	}
}