var myFidget;
var spinning;
var instructions;

function setup(){
	
	createCanvas (150,150);
	angleMode(DEGREES);
	spinning = false;
	myFidget = new Fidget();
	instructions = false;
	setTimeout(showInstructions, 1000);
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
			text("Click or SPACE To Spin", 10 - width / 2, height / 2 - 5);
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
		ellipse (30*cos(0), -30*sin(0), 50, 50);
		ellipse (30*cos(120), -30*sin(120), 50, 50);
		ellipse (30*cos(240), -30*sin(240), 50, 50);
		ellipse (this.x, this.y, 50, 50);
		
		fill(0);
		ellipse (30*cos(0), -30*sin(0), 20, 20);
		ellipse (30*cos(120), -30*sin(120), 20, 20);
		ellipse (30*cos(240), -30*sin(240), 20, 20);
		ellipse (this.x, this.y, 20, 20);
	}
}