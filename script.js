// UI Variables
var canvas;
var gameScreen;
var scoreDisplay;
// Game Variables
var gameRunning;
var shipShooting;
var alienShooting;
var score;
// Ship Variables
var shipDiameter;
var shipX;
var shipY;
var shipSpeed;
var shipColor;
// Bullet Variables
var bulletDiameter;
var bulletX;
var bulletY;
// Alien Variables
var alienDiameter;
var alienX;
var alienY;
var alienVelocity;
// Alien Bullet Variables
var alienBulletDiameter;
var alienBulletX;
var alienBulletY;

/*
 * setup()
 * This function is called once. Sets up the canvas, accesses HTML elements with
 * select(), and adds event listeners to those elements. Sets initial values of
 * variables by calling resetGame().
 */
function setup(){
	canvas = createCanvas(500,400);
	background(30,30,30); 
	//gameScreen = select('#game-screen');
	shipDiameter=80;
	shipSpeed=2;
	shipX=250;
	shipY=315;
	bulletDiameter=50;
	alienDiameter=60;
	alienVelocity=10;
	alienX=60;
	alienY=100;
	alienBulletDiameter=10;
	alienShooting=false;
	shipShooting=false;
	canvas.parent(gameScreen);
	scoreDisplay = select("#score-display");
	shipColor = "00ff00";
	score = 0;
	scoreDisplay.html(score)
	resetGame();
}
/*
 * gameOver()
 * This function stops the game from running and shows an alert telling the
 * player what their final score is. Finally it resets the game by calling
 * resetGame()
 */
function gameOver(){
	gameRunning=false;
	alert(score);
	alert("Game over");
}
/*
 * resetGame()
 * This function "resets the game" by initializing ship, alien, and game
 * variables.
 */
function resetGame(){
	score = 0;
	scoreDisplay.html(score);
	resetGame();
	gameRunning =  true;
}
/*
 * draw()
 * This function animates the ship, alien, and both kinds of bullets, but only
 * if the game is running.
 */
function draw(){
	background(30,30,30);
	drawShip();
	drawAlien();
	drawAlienBullet();
if(shipShooting==true){
		drawBullet();
	}
	bulletDiameter=40;
	alienBulletDiameter=20;
	if(alienShooting==true){
		//drawAlienBullet();
	}
shipShooting;
	alienShooting=false;	
}
/*
 * drawShip()
 * This function draws the player's ship. It also controls the ship's
 * x value by checking if the player is holding down the left or right keys.
 */
function drawShip(){
	fill(14, 61, 249);
	ellipse(shipX,shipY,shipDiameter);
	if(keyIsDown(LEFT_ARROW) && shipX>75){
		shipX=shipX-shipSpeed;
			}
		else if(keyIsDown(RIGHT_ARROW)&& shipX<425){
		shipX=shipX+shipSpeed;
	}
}
/*
 * keyPressed()
 * This function runs automatically when the player presses the spacebar
 * (keyCode === 32). If they do, and a bullet is not currently being fired
 * ("shipShooting" variable is false), it positions the bullet relative to the
 * ship. Then it sets the "shipShooting" variable to "true", indicating a ship
 * bullet is currently being fired.
 */
function keyPressed(){
	if((keyCode === 32) && shipShooting == false){
		//&& gameRunning
		bulletX=shipX;   
		bulletY=shipY;
		shipShooting = true;
	}
} 
//if((keyCode === 32) && shipShooting==false){
/*
 * drawBullet()
 * This function draws a bullet. It also checks to see if the bullet has hit
 * the alien. If it has, the alien is reset to the top-left of the screen
 * and the player earns a point. The alien aslo becomes faster (i.e., harder
 * to hit) each time it is hit by a bullet.
 */
function drawBullet(){
 hitAlien = checkCollision(alienX, alienY, alienDiameter, bulletX, bulletY, bulletDiameter);
	if(bulletY>0){
		fill(66, 244, 128);
		bulletY -= 10;
		ellipse(bulletX,bulletY,bulletDiameter);
	}
	else{
		shipShooting=false;	 
	}
	if(bulletY > 0 && !hitAlien){
	}
	else if(hitAlien){
		//resetAlien();
		alienVelocity++;
		shipShooting = false;
	}
	else{
		shipShooting = false;
	}
	score++;
	scoreDisplay=score;
}

/*
 * drawAlien()
 * This function draws an alien. It also checks to see if the alien has touched
 * the player's ship. If it has, the function calls gameOver().
 */
function drawAlien(){
	alienX+=alienVelocity;
	ellipse(alienX,alienY,alienDiameter,alienDiameter);
	if(alienX>=500 || alienX<=0){
		alienVelocity*= -1;
	}
	if(random(4) < 1 && !alienShooting){
		alienBulletY=alienY;
		alienBulletX=alienX;
		alienShooting=true;
	}
}
/*
 * drawAlienBullet()
 * This function behaves much like drawBullet(), only it fires from the alien
 * and not the player's ship. If the bullet hits the player, it's game over.
 */
function drawAlienBullet(){
	hitAlien = checkCollision(alienX, alienY, alienDiameter, bulletX, bulletY, bulletDiameter);
	if(alienBulletY<400){
		ellipse(alienBulletX,alienBulletY,alienBulletDiameter,alienBulletDiameter);
		alienBulletY += 10;
	}
	else{
		alienShooting=false;
	}

}
/*
 * resetAlien()
 * This function sets the alien to its original position at the top-left of
 * the screen. It also sets its velocity to its absolute value (so, if the
 * velocity was negative when it died, it becomes positive upon reset, making
 * it always start by moving to the right).
 */
function resetAlien(){
	alienVelocity = 10;
	resetAlien();
	alienVelocity++;
	//abs(-3);
}

/*
 * checkCollision(aX, aY, aD, bX, bY, bD)
 * This function first calculates the distance between two circles based on
 * their X and Y values. Based on the distance value, the function returns
 * "true" if the circles are touching, and false otherwise.
 * Circles are considered touching if
 * (distance <= (circle1Diameter + circle2Diameter) / 2)
 */
function checkCollision(aX,aY, aD, bX, bY, bD){
	distance = dist(aX, aY, bX, bY);
		if(distance=aD / 2 + bD / 2){
			return true;
		}
		else{
			return false;
		}
}