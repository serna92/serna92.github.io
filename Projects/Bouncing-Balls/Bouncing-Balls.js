var balls;
var nballs;

function setup(){

	createCanvas (300, 300);
	frameRate(60);
	balls = [];
	nballs = 50;
	
	for(var i = 0; i < nballs; i++)
		balls.push(new Ball());
}

function draw(){
	
	background(0,30);

	for(var i = 0; i < nballs; i++){
		
		balls[i].display();
		balls[i].update();
	}

}

function Ball() {
	
	this.c = color(random(50, 255), random(50, 255), random(50, 255));
	this.x = random((width / 150) * 5,width - (width / 150) * 5);
	this.y = - 50;
	this.speedY = 0;
	this.bouncePower = random(3,8);
	
	this.update = function(){
		
		this.speedY += 0.1;
		
		if((this.y + (width / 150) * 5) < height){
			
			this.y += this.speedY;
		}else{
			
			this.speedY = - this.bouncePower;
			this.y -= (width / 150) * 5;
		}
	
	}
	
	this.display = function(){
		
		fill(this.c);
		ellipse (this.x, this.y, (width / 150) * 10, (height / 150) * 10);
	}
}