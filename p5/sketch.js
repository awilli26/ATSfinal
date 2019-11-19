//number of particles
var particles = [];
var clicked = false;

function setup() {
  var canvas = createCanvas(innerWidth,innerHeight);
  noStroke();
 

//number of particles
  for ( let i = 0; i < 300; i++) {
    //particle size is 4
    particles.push(new Particle(4));
  }
}


function draw() {
  
  //frameRate(30);
  //fill(0,50);
  //rect(0,0,width,height);
  background(0);
   
  
    //create particles
    for (let i = 0; i < particles.length; i++) {

      particles[i].display();
      particles[i].move();
      particles[i].edges();
      
      if (clicked){
        attract(particles[i]);
      }else{
  
        particles[i].mouse.setMag(0.001);
      }
    }
  
  }

function attract(particle) {

         
         particle.mouse.set(mouseX, mouseY);
         particle.mouse.sub(particle.location);
         particle.mouse.setMag(0.08);
         //acceleration = mouse;
         particle.location.add(particle.mouse); 
      
  
}


///// class stuff ///////////////////////////////////

function mousePressed() {
  
      print("i'm pressed");
  clicked = true;
      
}

function mouseReleased() {
 
  clicked = false;
}

function keyPressed() {
  if (key == 'f') {
    let fs = fullscreen();
    fullscreen(!fs);
    
  }
}
function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}



 class Particle {
   
  

  constructor(radius) {

    //initial x location starts at width, y starts at random height
    this.location = createVector(random(0, width), random(height));
    this.waveLayer = createVector(0, 0);
    this.noiseLayer = createVector(0,0);
    this.mouse = createVector(mouseX,mouseY);
    
    this.r = radius;
    this.noiseGain = 0.10;
    this.noiseMove = 0;
  }


display() {

    //fill changes as location changes
    fill(230-(this.location.x *0.4), 100+(this.location.x *0.2), 250-(this.location.y *0.04));
    ellipse(this.location.x, this.location.y, this.r*2, this.r*2);

}

move() {

    //makes particles gravitate towards mouse location when mouse is pressed
   

    //acceleration gets added to velocity, velocity gets added to location
    //velocity.add(acceleration);
    //location.add(velocity);
    
    //this.velocity.limit(2);
    //acceleration.limit(.005);
    
    //initial speed
    this.location.x = this.location.x - 0.005;
    
    //change in direction based on noise
    let noise1 = noise(this.location.x/600,this.location.y/400,this.noiseMove)* TWO_PI;
    this.noiseLayer = p5.Vector.fromAngle(noise1);
    this.noiseMove += 0.008;
    
    //offset/translate noise by 500
    let noise2 = noise((this.location.x + 500)/500,this.location.y/500);
    
    //min and max mag
    this.noiseLayer.setMag((0.08 + noise2 * 5) * this.noiseGain);
    
    this.location.add(this.noiseLayer);
    
  }
  
edges() {

    // if it hits edge go to opposite side 
    if (this.location.x > width) this.location.x = 0;
    if (this.location.x < 0) this.location.x = width;
    if (this.location.y > height) this.location.y = 0;
    if (this.location.y < 0) this.location.y = height;
  }
  
}   