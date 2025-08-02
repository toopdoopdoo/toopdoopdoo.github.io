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
var menuOpen = false;

menuBtn.addEventListener("click", () => {
  const dropdown = document.querySelector(".dropdown-content");
  dropdown.classList.toggle("menuShow");
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

// Page 4 quiz
const btnSubmit=document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click",CheckAns);
const scorebox=document.querySelector("#scorebox");
var q1,q2,score=0;
function CheckAns(){
    //read the value of the selected radio button for q1
    q1=document.querySelector("input[name='q1']:checked").value;
    console.log(q1); //check q1 value retrieved
    if (q1=="Watermelon") scorebox.innerHTML= "Correct!";
    else scorebox.innerHTML= "Wrong... Try again!";
}

// Minigame
var score = 0;
var timeLeft = 30;
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

var xPos = 50;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") xPos -= 5;
  if (e.key === "ArrowRight") xPos += 5;

  // Clamp x position between 5 and 95 so part of player doesn't go off-screen
  if (xPos < 5) xPos = 5;
  if (xPos > 95) xPos = 95;

  // Set player position
  player.style.left = `${xPos}%`; 
});

function spawnFood() {
  const food = document.createElement("div");
  food.classList.add("food");

  // Randomly choose a food
  const types = ["watermelon", "candy"];
  const goodFoods = ["watermelon"];
  const type = types[Math.floor(Math.random() * types.length)];

  food.classList.add(type);
  food.dataset.type = goodFoods.includes(type) ? "good" : "bad"; // add datatype for good and bad

  food.style.left = Math.random() * 90 + "%"; // randomise food position, between 0-90

  document.getElementById("game").appendChild(food); // add the newly created food as a child of the game container

  // Remove food after fall ends
  food.addEventListener("animationend", () => {
    food.remove();
  });

  // Collision check
  const interval = setInterval(() => {

    // Get the position and size of food and player as rectangles
    const foodBox = food.getBoundingClientRect();
    const playerBox = player.getBoundingClientRect();

    // AABB Collision
    const collision = foodBox.bottom >= playerBox.top
    && foodBox.left < playerBox.right 
    && foodBox.right > playerBox.left;

    // On collision
    if (collision) {
        // Good food
         if (food.dataset.type === "good") {
            score += 10;
        } 
        else {
            score -= 5;
        }

        // Update score and remove food
        scoreDisplay.textContent = `Score: ${score}`;
        food.remove();
        clearInterval(interval); // Stop checking collision for this food that got destroyed
    }
}, 100); // checks every 0.1s
}

// Below is for starting the game
var foodInterval;
var gameTimer;

function startGame() {
  score = 0;
  timeLeft = 30;
  xPos = 50;
  player.style.left = `${xPos}%`;
  scoreDisplay.textContent = "Score: 0";
  timerDisplay.textContent = "Time: 30s";

  // Hide start screen and show game
  document.getElementById("startScreen").style.display = "none";

  // Start timer and spawn food
  foodInterval = setInterval(spawnFood, 2000);
  gameTimer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;

    // When timer is 0, game ends
    if (timeLeft <= 0) {
      clearInterval(gameTimer);
      clearInterval(foodInterval);
      alert("Game Over! Final Score: " + score);
      document.getElementById("startScreen").style.display = "flex";
      document.getElementById("startBtn").textContent = "Restart Game";

      // Destroy remaining food
      document.querySelectorAll(".food").forEach(f => f.remove());

      // Reset player position
      xPos = 50;
      player.style.left = `${xPos}%`;
    }
  }, 1000);
}

// Left and right buttons for mobile
document.getElementById("btnLeft").addEventListener("click", () => {
  xPos -= 5;
  if (xPos < 5) xPos = 5;
  player.style.left = `${xPos}%`;
});

document.getElementById("btnRight").addEventListener("click", () => {
  xPos += 5;
  if (xPos > 95) xPos = 95;
  player.style.left = `${xPos}%`;
});


document.getElementById("startBtn").addEventListener("click", startGame);