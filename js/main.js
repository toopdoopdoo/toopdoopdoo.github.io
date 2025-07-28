//target all elements to save to constants
const homebtn=document.querySelector("#homebtn");
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
const page5btn=document.querySelector("#page5btn");

var allpages=document.querySelectorAll(".page");

// Select the menu list (there is only one hence querySelector)
const menuItemsList=document.querySelector("ul");
// Select the Menu Button
const menuBtn=document.querySelector("#menuBtn");
// Link Button to hide and unhide menu
menuBtn.addEventListener("click", function () {
    toggleMenus();
});

// Select all subtopic pages
function hideall() { // Function to hide all pages
 for(let onepage of allpages){ // Go through all subtopic pages
  onepage.style.display= "none"; // Hide it
  }

  deselectButtons();
}

// Select all buttons
function deselectButtons () {
    // Set all buttons to be deselected colour
    homebtn.style.backgroundColor = "rgb(185, 151, 122)";
    page1btn.style.backgroundColor = "rgb(185, 151, 122)";
    page2btn.style.backgroundColor = "rgb(185, 151, 122)";
    page3btn.style.backgroundColor = "rgb(185, 151, 122)";
    page4btn.style.backgroundColor = "rgb(185, 151, 122)";
    page5btn.style.backgroundColor = "rgb(185, 151, 122)";
}

function show(pgno) { // Function to show selected page number
    hideall();
    // Select the page based on the parameter passed in
    let onepage=document.querySelector("#page"+ pgno);
    onepage.style.display="block"; // Show the page
}

/* Listen for clicks on the buttons, assign anonymous eventhandler functions to call show function */
homebtn.addEventListener("click", function () {
    hideall();
    homebtn.style.backgroundColor = "rgb(143, 124, 84)";
})

page1btn.addEventListener("click", function () {
    show(1);
    page1btn.style.backgroundColor = "rgb(143, 124, 84)";
});
page2btn.addEventListener("click", function () {
    show(2);
    page2btn.style.backgroundColor = "rgb(143, 124, 84)";
});
page3btn.addEventListener("click", function () {
    show(3);
    page3btn.style.backgroundColor = "rgb(143, 124, 84)";
});
page4btn.addEventListener("click", function () {
    show(4);
    page4btn.style.backgroundColor = "rgb(143, 124, 84)";
});
page5btn.addEventListener("click", function () {
    show(5);
    page5btn.style.backgroundColor = "rgb(143, 124, 84)";
});

// All pages should be hidden by default
hideall();

// Set home button to be selected by default
homebtn.style.backgroundColor = "rgb(143, 124, 84)";

// Page 3 events
const capybaraBtn=document.querySelector("#capybaraSpeak")
const capybaraAudio = new Audio("audio/capybara.mp3");

capybaraBtn.addEventListener("click", function () {
    capybaraAudio.play();
});

/* Find references to all the buttons and ball */
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
const resetBtn = document.querySelector("#resetBtn");
const ball = document.querySelector("#ball");
var ballX = ballY = 0; // Assign initial position of ball
// Functions to update variables to control ball position
function ResetPos() {
    ballX=ballY=0; //reset to zero
    // UpdateBallStyle();
}
function MovePos(leftInc, topInc) {
    ballX += leftInc;
    ballY += topInc;
    UpdateBallStyle();
}
//function to update ball css as well as display text
function UpdateBallStyle(){
    ball.style.left = ballX+"px"; //set left property to ball x variable
    ball.style.top = ballY+"px"; //set top property to ball x variable
    ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
}

// Function just to move left (decrease left style)
function MoveLeft(){
    const screenWidth = screen.width;
    if (ballX != screenWidth || ballX != -screenWidth)
        MovePos(-10,0);
}
//eventlisteners to activate MovePos
leftBtn.addEventListener("click", MoveLeft);
//leftBtn.addEventListener("click", MoveLeft(-10,0)); //wrong
//cannot do like this. MoveLeft(-10,0) will execute immediately
//using anonymous function to pass in arguments from eventlistener
rightBtn.addEventListener("click", function () {
    const screenWidth = screen.width;
    if (ballX != screenWidth || ballX != -screenWidth)
        MovePos(10, 0)
});
upBtn.addEventListener("click", function () {
    const screenHeight = screen.height;
    if (ballX != screenHeight || ballX != -screenHeight)
        MovePos(0, -10)
});
downBtn.addEventListener("click", function () {
    const screenHeight = screen.height;
    if (ballX != screenHeight || ballX != -screenHeight)
        MovePos(0, 10)
});
resetBtn.addEventListener("click", ResetPos);

// Keyboard movements
document.addEventListener('keydown', (e) => {
    console.log(e);
    
    if (e.code === "ArrowRight"){
        MovePos(10,0)
    }
    if (e.code === "ArrowLeft"){
        MoveLeft();
    }
    if (e.code === "ArrowDown"){
        MovePos(0, 10);
    }
    if (e.code === "ArrowUp"){
        MovePos(0, -10);
    }
    // Need to inform user what keys to press. Better option: use switch case instead
});

// Define more variables and constants
var velX,velY;
const minLeft=minTop=0;
const maxTop=maxLeft=300;
//function to pick random number from a min-max range
function RandomRange(min,max){
return Math.round(Math.random()*(max-min)+min);
}

/* Move Pos function with collision check and reaction*/
function MovePosWifCollision(){
ballX += velX;
ballY += velY;
/*check if reach min/max left/top and flip velocity*/
if(ballX>maxLeft){
velX=-velX; //reverse the X velocity
ballX=maxLeft; //snap ballX to maxLeft
}
if(ballY>maxTop){
velY=-velY;
ballY=maxTop; //snap ballY to maxTop
}
if(ballX<minLeft){
velX=-velX;
ballX=minLeft;
}
if(ballY<minTop){
velY=-velY;
ballY=minTop;
}
UpdateBallStyle();
}

//Modify StartAutoMove function
function StartAutoMove(){
velX=RandomRange(-10,10);
velY=RandomRange(-10,30);
//setInterval(MoveIt,100); don't use this anymore
setInterval(MovePosWifCollision,100); //use this instead
}
//callback function for setInterval
function MoveIt(){
MovePos(velX,velY); //move at random velocity picked earlier
}
StartAutoMove(); //invoke the function to activate automove