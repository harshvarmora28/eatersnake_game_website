// Author: Harsh Varmora


// Game Constants and Variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio("aud/food.mp3");
const gameOverSound = new Audio("aud/gameover.mp3");
const moveSound = new Audio("aud/move.mp3");
const bcgSound = new Audio("aud/bcg.mp3");
let speed = 9;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 12}
];

let food = {x: 5, y: 8};

// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    // Controlling the fps
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // If snake bumps in his body
    for(let i = 1; i < snakeArr.length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            return true;
        }
    }
    // If snake bumps in the walls
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    return false;
}


function gameEngine(){
    // Updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        bcgSound.pause();
        inputDir = {x: 0, y: 0};
        score = 0;
        alert("GAME OVER! Press Enter or OK to play Again!");
        snakeArr = [{x: 13, y: 12}];
        bcgSound.play();
    }


    // If snake eats the food, increment the score and regenerate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        score += 1;
        // hiscore
        if (score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }


        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 15;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};


    }


    // Moving the snake
    for(let i = snakeArr.length -2; i>=0; i--){
        snakeArr[i + 1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    
    // Display the snake and food
    // Display the snake   
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}



// Main logic


// Adding a Hiscore functionality
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;

}


window.requestAnimationFrame(main);
// Adding controls to move the snake
window.addEventListener("keydown", e =>{
    inputDir = {x: 0, y: 1}     // Game will start
    bcgSound.play();  
    moveSound.play();
    switch (e.key){
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        
        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        
        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break; 
    }
});