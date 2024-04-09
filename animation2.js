var draw_asteroid = function (ctx, radius, shape, options) {
	options = options || {};
	ctx.strokeStyle = options.stroke || "white";
	ctx.fillStyle = options.fill || "black";
	ctx.save();
	ctx.translate(200,200);
	ctx.beginPath();
	for(var i = 0; i< shape.length; i++) {
		ctx.rotate(2* Math.PI/ shape.length);
		ctx.lineTo(radius+ radius*options.noise* shape[i],0);
	}
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	if (options.bimbing) {
		ctx.lineWidth = 0.5;
		ctx.beginPath();
		ctx.arc(0,0,radius,0,2*Math.PI);
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 0.2;
		ctx.arc(0,0, radius + radius * options.noise,0,2 *Math.PI);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0,0, radius - radius * options.noise,0 , 2*Math.PI);
		ctx.stroke();
		
	}
	ctx.restore();
};


function draw_ship1(ctx, radius, options) {
 options = options || {};
 var angle = (options.angle || 0.5 * Math.PI) / 2;
 ctx.save();
 ctx.translate(200, 200);
 if(options.guide) {
 ctx.strokeStyle = "white";
 ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
 ctx.lineWidth = 0.5;
 ctx.beginPath();
 ctx.arc(0, 0, radius, 0, 2 * Math.PI);
 ctx.stroke();
 ctx.fill();
 }
 if(options.thruster) {
	 ctx.strokeStyle = "yellow";
	 ctx.fillStyle = "red";
	 ctx.lineWidth = 3;
	 ctx.beginPath();
	 ctx.moveTo(
	 Math.cos(Math.PI + angle * 0.8) * radius/2,
	 Math.sin(Math.PI + angle * 0.8) * radius/2);
	 ctx.quadraticCurveTo(-radius *2, 0, 
	 Math.cos(Math.PI - angle * 0.8) * radius/2,
	 Math.sin(Math.PI - angle * 0.8) * radius/2);
	 ctx.stroke();
	 ctx.fill();
 }
 ctx.lineWidth = options.lineWidth || 2;
 ctx.strokeStyle = options.stroke || "white";
 ctx.fillStyle = options.fill || "black";
 ctx.beginPath();
 ctx.moveTo(radius, 0);
 ctx.lineTo(
 Math.cos(Math.PI - angle) * radius,
 Math.sin(Math.PI - angle) * radius
 );
 ctx.lineTo(
 Math.cos(Math.PI + angle) * radius,
 Math.sin(Math.PI + angle) * radius
 );
 ctx.closePath();
 ctx.fill();
 ctx.stroke();
 ctx.restore();
}

var draw_grid = function (ctx, minor, major, stroke, fill) {
	minor = minor || 10;
	major = major || minor * 5;
	stroke = stroke || "#00FF00";
	fill = fill || "#009900";
	ctx.save();
	ctx.strokeStyle = stroke;
	ctx.fillStyle = fill;
	var width = ctx.canvas.width, height = ctx.canvas.height
	for (var x= 0; x < width; x += minor) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, height);
		ctx.lineWidth = (x % major == 0) ? 0.5 : 0.25;
		ctx.stroke();
		if (x % major == 0) {ctx.fillText(x,x,10);}
	}
	for (var y = 0; y< height; y += minor) {
		ctx.beginPath();
		ctx.moveTo(0,y);
		ctx.lineTo(width, y);
		ctx.lineWidth = (y % major ==0) ? 0.5 : 0.25;
		ctx.stroke();
		if (y % major == 0) {ctx.fillText(y,0,y+10);}
	}
	ctx.restore();
};

var polo = document.getElementById("pacman").getContext("2d");
draw_grid(polo);

var draw_ghost = function (ctx, radius, options) {
  options = options || {};
  var feet = options.feet || 4;
  var head_radius = radius * 0.9;
  var foot_radius = head_radius / feet;
  ctx.save();
  ctx.translate(200,200);
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "red";
  ctx.lineWidth = options.lineWidth || radius * 0.05;
  ctx.beginPath();
  for (var foot= 0; foot< feet; foot++) {
    ctx.arc((2 * foot_radius *(feet - foot))- head_radius-foot_radius, radius - foot_radius, foot_radius, 0, Math.PI);
  }
  ctx.lineTo(-head_radius, radius - foot_radius);
  ctx.arc(0, head_radius - radius, head_radius, Math.PI, 2* Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(40,-50, 25,0, 2*Math.PI);
  ctx.arc(-40, -50, 25,0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(30, -40, 10,0, 2*Math.PI);
  ctx.arc(-50, -40, 10,0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};
draw_ghost(polo, 100, {feet: 8, stroke: "white", fill: "red", lineWidth : 0.5 });

var draw_pacman = function (ctx, radius, mouth) {
 var angle = 0.2 * Math.PI * mouth;
  ctx.save();
  ctx.translate(50,50);
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(0,0, radius, angle, -angle);
  ctx.lineTo(0,0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};
draw_pacman(polo, 50, 0.9);

var polonia = document.getElementById("pacman2").getContext("2d");
draw_grid(polonia);

var pacman = new PacMan(150, 150, 50, 120);
function draw(ctx, guide) {
draw_grid(ctx);
 pacman.draw(ctx);
 }
function update(elapsed) {
 pacman.update(elapsed, 300, 300);
 }
 var previous, elapsed;
function frame(timestamp) {
polonia.clearRect(0, 0, polonia.canvas.width, polonia.
canvas.height);
 if (!previous) previous = timestamp;
 elapsed = timestamp - previous;
 update(elapsed / 1000);
 draw(polonia, true);
previous = timestamp;
 window.requestAnimationFrame(frame);
 }
 window.requestAnimationFrame(frame);
 
 function PacMan(x, y, radius, speed) {
 this.x = x;
 this.y = y;
 this.radius = radius;
 this.speed = speed;
 this.angle = 0;
 this.x_speed = speed;
 this.y_speed = 0;
 this.time = 0;
 this.mouth = 0;
};
PacMan.prototype.draw = function(ctx) {
 ctx.save();
 ctx.translate(this.x, this.y);
 ctx.rotate(this.angle);
 draw_pacman(ctx, this.radius, this.mouth);
 ctx.restore();
}
PacMan.prototype.turn = function(direction) {
 if(this.y_speed) {
 // if we are travelling vertically
 // set the horizontal speed and apply the direction
 this.x_speed = -direction * this.y_speed;
 // clear the vertical speed and rotate
 this.y_speed = 0;
 this.angle = this.x_speed > 0 ? 0 : Math.PI;
 } else {
 // if we are travelling horizontally
 // set the vertical speed and apply the direction
 this.y_speed = direction * this.x_speed;
		
	this.x_speed = 0;
 this.angle = this.y_speed > 0 ? 0.5 * Math.PI : 1.5 * Math.
PI;
 }
}
PacMan.prototype.turn_left = function() {
 this.turn(-1);
}
PacMan.prototype.turn_right = function() {
 this.turn(1);
}
PacMan.prototype.update = function(elapsed, width, height) {
 // an average of once per 100 frames
 if(Math.random() <= 0.0001) {
 if(Math.random() < 0.10) {
 this.turn_left();
 } else {
 this.turn_right();
 }
 }
 if(this.x - this.radius + elapsed * this.x_speed > width) {
 this.x = -this.radius;
 }
 if(this.x + this.radius + elapsed * this.x_speed < 0) {
 this.x = width + this.radius;
 }
 if(this.y - this.radius + elapsed * this.y_speed > height) {
 this.y = -this.radius;
 }
 if(this.y + this.radius + elapsed * this.y_speed < 0) {
 this.y = height + this.radius;
 }
 this.x += this.x_speed * elapsed;
 this.y += this.y_speed * elapsed;
 this.time += elapsed;
 this.mouth = Math.abs(Math.sin(2 * Math.PI * this.time));
}

PacMan.prototype.move_right = function () {
  this.x_speed = this.speed;
  this.y_speed = 0;
  this.angle = 0;
}
PacMan.prototype.move_down = function () {
  this.x_speed = 0;
  this.Y_speed = this.speed;
  this.angle = 0.5 * Math.PI;
}
PacMan.prototype.move_left = function () {
  this.x_speed = -this.speed;
  this.y_speed = 0;
  this.angle = Math.PI;
}
PacMan.prototype.move_up = function () {
  this.x_speed = 0;
  this.y_speed = -this.speed;
  this.angle = 1.5 * Math.PI;
}

window.onkeydown = function (e) {
  var key = e.key || e.keyCode;
  var nothing_handled = false;
  switch(key) {
    case "ArrowLeft" :
    case 37 :
    pacman.move_left();
    break;
    case "ArrowUp" :
    case 38 :
    pacman.move_up();
     break;
    case "ArrowRight" :
    case 39 :
    pacman.move_right();
     break;
    case "ArrowDown" :
    case 40 :
    pacman.move_down();
     break;
    default:
      nothing_handled : true; 
  }
  
}

//animation ghost {pacman}
var draw_ghost_2 = function (ctx, radius, options) {
  options = options || {};
  var feet = options.feet || 4;
  var head_radius = radius * 0.9;
  var foot_radius = head_radius / feet;
  ctx.save();
  //ctx.translate(200,200);
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "red";
  ctx.lineWidth = options.lineWidth || radius * 0.05;
  ctx.beginPath();
  for (var foot= 0; foot< feet; foot++) {
    ctx.arc((2 * foot_radius *(feet - foot))- head_radius-foot_radius, radius - foot_radius, foot_radius, 0, Math.PI);
  }
  ctx.lineTo(-head_radius, radius - foot_radius);
  ctx.arc(0, head_radius - radius, head_radius, Math.PI, 2* Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(7,-5, 5,0, 2*Math.PI);
  ctx.arc(-7, -5, 5,0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(6, -4, 3,0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.arc(-8, -4, 3,0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};
 var Ghost = function (x, y, radius, speed, colour) {
 this.x = x;
 this.y = y;
 this.radius = radius;
 this.speed = speed;
 this.colour = colour;
}
Ghost.prototype.draw = function(ctx) {
 ctx.save();
 ctx.translate(this.x, this.y);
 draw_ghost_2(ctx, this.radius, {
 fill: this.colour, feet: 7
 });
 ctx.restore();
}
var pacman = new PacMan(150, 300, 20, 100);
 var ghosts = [
 new Ghost(Math.random() * 300, Math.random() * 300, 20,
120, 'red'),
 new Ghost(Math.random() * 300, Math.random() * 300, 20,
60, 'pink'),
 new Ghost(Math.random() * 300, Math.random() * 300, 20,
50, 'cyan'),
 new Ghost(Math.random() * 300, Math.random() * 300, 20,
40, 'orange')
 ]
 function draw(ctx, guide) {
 draw_grid(ctx);
 pacman.draw(ctx);
 ghosts.forEach(function(ghost) {
 ghost.draw(polonia, guide);
 });
 }
 function update(elapsed) {
 pacman.update(elapsed, 300, 300);
 ghosts.forEach(function(ghost) {
 ghost.update(pacman, elapsed);
 });
 }
Ghost.prototype.update = function(target, elapsed) {
 var angle = Math.atan2(target.y - this.y, target.x - this.x);
 var x_speed = Math.cos(angle) * this.speed;
 var y_speed = Math.sin(angle) * this.speed;
 this.x += x_speed * elapsed;
 this.y += y_speed * elapsed;
}
var previous, elapsed;
 /*function frame(timestamp) {
 polonia.clearRect(0, 0, polonia.canvas.width, polonia.
canvas.height);
 if (!previous) previous = timestamp;
 elapsed = timestamp - previous;
 update(elapsed / 100000);
 draw(polonia, true);
 previous = timestamp;
 window.requestAnimationFrame(frame);
 }
 window.requestAnimationFrame(frame);*/
 
 
 //canvas newton law 
 var ambon = document.getElementById("pacman3").getContext("2d");
 //draw_grid(ambon);
 
 var Mass = function(x, y, mass, radius, angle, x_speed, y_speed, rotation_speed) {
  this.x = x;
  this.y = y;
  this.mass = mass || 1;
  this.radius = radius || 50;
  this.angle = angle || 0;
  this.x_speed = x_speed || 0;
  this.y_speed = y_speed || 0;
  this.rotation_speed = rotation_speed || 0;
}  

Mass.prototype.update_2 = function (elapsed, ctx) {
  this.x += this.x_speed * elapsed;
  this.y += this.y_speed * elapsed;
  this.angle += this.rotation_speed * elapsed;
  this.angle % (2 * Math.PI);
  if (this.x - this.radius > ctx.canvas.width) {
    this.x = -this.radius;
  }
  if (this.x + this.radius < 0) {
    this.x = this.cxt.canvas.width + this.radius;
  }
  if (this.y - this.radius > ctx.canvas.height) {
    this.y = -this.radius;
  }
  if (this.y + this.radius < 0) {
    this.y = this.ctx.canvas.height + this.radius;
  }
}

Mass.prototype.push = function (angle, force, elapsed) {
 this.x_speed += elapsed * (Math.cos(angle)* force)/this.mass;
this.y_speed += elapsed * (Math.sin(angle)* force)/this.mass;
}
Mass.prototype.twist = function (force, elapsed) {
  this.rotation_speed += elapsed * force/ this.mass;
}
Mass.prototype.speed = function() {
  return Math.sqrt(Math.pow(this.x_speed, 0.02)+ Math.pow(this.y_speed, 0.02));
}
Mass.prototype.movement_angle = function() {
  return Math.atan2(this.y_speed, this.x_speed);
}
Mass.prototype.draw_2 = function (c) {
  c.save();
  c.translate(this.x, this.y);
  c.rotate(this.angle);
  c.beginPath();
  c.arc(0,0, this.radius, 0, 2*Math.PI);
  c.lineTo(0,0);
  c.strokeStyle = "#FFFFFF";
  c.stroke();
  c.restore();
}
var mass = new Mass (ambon.canvas.width/2, ambon.canvas.height/2, 10, 20);
function draw_2(ctx) {
  ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
   draw_grid(ctx);
  mass.draw_2(ambon);
  //mass.push(0.75 * Math.PI, 0.5, 0.5);
  mass.twist(Math.PI, 0.001);
  mass.speed(-10,-10);
}
function update_2(elapsed) {
  mass.update_2(elapsed, ambon);
}

/*var previous1;
function bingkai(timestamp) {
  if (!previous1) previous1 = timestamp;
  var elapsed1 = timestamp - previous1;
  ambon.clearRect(0,0, ambon.canvas.width, ambon.canvas.height);
  update_2(elapsed1/10000, ambon);
  draw_2(ambon);
  previous = timestamp;
  window.requestAnimationFrame(bingkai);
}
window.requestAnimationFrame(bingkai);*/

//asteroid mass

function extend (ChildClass, ParentClass) {
  var parents = new ParentClass();
  ChildClass.prototype = parents;
  ChildClass.prototype.super = parents.constructor;
  ChildClass.prototype.constructor = ChildClass;
}
 var ambon = document.getElementById("pacman3").getContext("2d");
 
function Asteroid(mass, x, y, x_speed, y_speed, rotation_speed) {
  var density = 1;
  var radius_0 = Math.sqrt((mass / density) / Math.PI);
  this.super(mass, radius_0, x, y, 0, x_speed, y_speed, rotation_speed);
  this.circumference = 2 * Math.PI * this.radius;
  this.segments = Math.ceil(this.circumference / 15);
  this.segments = Math.min(25 , Math.max(5, this.segments));
  this.noise = 0.2;
  this.shape = [];
  for(var i= 0; i< this.segments; i++) {
   this.shape.push(2 * (Math.random - 0.5));
  }
}
extend(Asteroid, Mass);

Asteroid.prototype.draw_0 = function (ctx, guide) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);
  draw_asteroid(ctx, this.radius, this.shape, {noise : this.noise, guide : guide});
  ctx.restore();
}
var asteroid = new Asteroid (10000,Math.random() * ambon.canvas.width,Math.random() * ambon.canvas.height);

//this section 2 
var asteroids = [];
for(var i=0; i<4; i++) {
	                var asteroid = new Asteroid(
	                Math.random() * ambon.canvas.width,
	                Math.random() * ambon.canvas.height,
	                2000 + Math.random() * 8000
	                 );
}
function update_0(elapsed) {
	asteroid.update_2(elapsed, ambon);
}
function draw_0(ctx) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	draw_grid(ambon);
	asteroid.draw_0(ambon, true);
	asteroid.twist(Math.PI, 0.001);
}

var previous1;
function bingkai(timestamp) {
  if (!previous1) previous1 = timestamp;
  var elapsed1 = timestamp - previous1;
  ambon.clearRect(0,0, ambon.canvas.width, ambon.canvas.height);
  update_0(elapsed/100000);
  draw_0(ambon);
  previous1 = timestamp;
  window.requestAnimationFrame(bingkai);
}
window.requestAnimationFrame(bingkai);    

/*var ship = function (x, y) {
	this.super(x, y, 10, 20, 1.5 * Math.PI);
}
extend(ship, Mass);
ship.prototype.draw_3 = function (c, guide) {
	c.save();
	c.translate(this.x, this.y);
	c.rotate(this.angle);
	c.strokeStyle = "white";
	c.lineWidth =  2;
	c.fillStyle = "black";
	draw_ship1(c, this.radius, {guide: guide});
	c.restore();
}*/
//i am now so tired with my life i don't know again principle to success i am now so confious, what the hell life is who is control my mind, and what path i want to continue and go every day until now i am hopeless my life is suck so boring what life is, internally and externally what the hell such life is, i don't like this forever i want to discover of my own life and to find meaning of porpose of withiin life who is you rahud, why you don't go to some college why you recuiret soldiers in medan who is you rahud, are you want this the same place and not want to discover of your meaning life and why now so fuck and nothing what are doing you just hear noise you neigbhor you tune the musics them every day, what the fucking up with your life rahud, what meaning your life to you rahud, i want to back my energy, i want to go ahead i want to continue my life i dont want give up until i found my turning points with what the hell life is like this, what the of all my belief and identity, my personality, my energy, my hobby of all, swimming, learn coding, mathematic, learn phycholgil running every day, what you pay off you effort to this all you doing now? this big question to me and my personality


