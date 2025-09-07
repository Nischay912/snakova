// step17: lets define some variables and constants to be used here now below ; keep direction as variable as it will be changing , but keep the sounds as constants as we wont be changing them later ahead.
let inputDir = {
    // step18: lets make the snake to not be moving when the game starts initially.
    x:0,
    y:0
}

// step19: lets now initialize the audios to be used.
const foodSound = new Audio("/assets/eat.mp3");
const gameOverSound = new Audio("/assets/game-over.mp3")
const moveSound = new Audio("/assets/move.mp3")
const musicSound = new Audio("/assets/music.mp3")
// ADDED THIS LINE to loop the music
musicSound.loop = true;

// step27: lets create a variable speed to control the speed of the game & also to define the last paint time.

// step28: lastpaint contains the time when the last frame was painted/rendered ; keep it initially 0 and will update it everytime a frame is painted/rendered.
let lastPaintTime = 0;
// let speed = 2; //can increase and decrease this value to control the speed of the game whenever needed.
// let speed = 16;

// to add difficulty feature
let speed = 16; // Default speed
let difficulty = prompt("Choose difficulty level: 'easy', 'medium', or 'hard'").toLowerCase();

switch(difficulty) {
    case 'easy':
        speed = 8;
        break;
    case 'medium':
        speed = 16; // This is your current default speed
        break;
    case 'hard':
        speed = 24;
        break;
    default:
        alert("Invalid choice. Setting difficulty to medium.");
        speed = 16;
}

let score = 0;

// step36: lets craete the snake array variable to store the location of the body parts of the snake.
let snakeArr = [

    // step37: in javascript we have origin on top left of our container box there & we have the positive x in its right and positive y in downward direction from there.

    // step38: let this be initial head of nake in the board when rendered initially.
    {x:13 , y:15}
]

// step47: lets now define the food variable to store the location of the food.
let food = {x:6 , y:7}

// step22: lets define the main function here below ; which takes parameters as the current time.
function main(ctime){
    // step23: creating a game loop by keep calling the main function again and again so that everytime like the snake moves , the game loops again and again to show different frames of the game that shows the snake moving.

    // step24: https://stackoverflow.com/questions/38709923/why-is-requestanimationframe-better-than-setinterval-or-settimeout : can read this for confusions if any : it gives best fps when rendering based on the hardware system.
    window.requestAnimationFrame(main);

    // step26: we saw by previous console log that the frame is rendering very fast , so how will we able to play game so fast ; for that we can control the fps(frames per second) using a check condition here below.

    // step29: we divide by 1000 as ctime is in milliseconds ; and here we calculate difference in them and check if it is less than 1/2 = 0.5 seconds , then we will return from the function and will not render the next frame ; this helps to control the speed of the game so that the snake does not move too fast ; so 0.5 means 2 frames per second ; if speed was 10 ; 10fps means snake moves 10 times per second ; thus moves faster.

    // step30: This skips drawing extra frames , effectively slows down the loop to your desired FPS.
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }

    // step31: so here when the function was called firts time the "window.requestAnimation" code runs but doesn't calls main immediately like recursive functions , it schedules its call for next time frame is rendered ; so it vontinues to check next lines of code i.e. these if else below it and when the browser base on refresh rate of pc or monitor refreshes the screen , it calls main function again and again to show different frames of the game that shows the snake moving ; so the function gets scheduled for next frame render in browser and gets called at every time the frame renders.

    // step32: so the console log we saw that ctime was running there , we check if that time has passed 0.5 seconds , if it has not passed 0.5 seconds then we just return and calls the main function again by the code top of where the calling of function starts and windows of browser re-renders the frame and again checks if the time has reached 0.5s and if yes now it will render the next frame.

    // step33: now if 0.5s reached we update the lastpaintime so that the next time the function is called , it can check if the time has passed 0.5s or not ; as if lastpaintime is not updated it remains 0s and will next time check for 4 -0 = 4 , then later 6 - 0 .... so on ; but we want to render after every 0.5s , so better to increase lastpainttime too so that the difference is always 0.5s ; thus snake moves smoothly every 0.5s.
    lastPaintTime=ctime;
    gameEngine();

    // step34: now lets make the gameEngine function to run the game.

// step57: now we will define the isCollide function to check if the snake collides with itself or not.
function isCollide(snake){
    // return false; //done for now testing to make the game work by making snake not colliding with anything for now here : will uncomment this later.

    // step71: now lets define when to say that the snake has collided in order to stop the game.

    // step72: write condition when snake collides with itself.

    // step73: start from 1st index not 0th as head can't collide with itself obviously.
    for(let i=1;i<snakeArr.length;i++){

        // step74: now when x and y coordinates of head at 0th index collides with any other body part of snake then return true to indicate that the snake has collided with itself.
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }

    }

    // step75: also if snake coollides with the boundary then also consider it as collided with itself and ends the game ; since we have 18 rows columns in grid so if snake collides with any of the boundary then it will end the game.
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}

    function gameEngine(){
        // step35: we will first update the food and the snake variable first , which will be an array having the location of different body parts of the snake & then we will render the food and the snake on the screen.

        // step53: now lets write the function to update the food and snake on the screen here below.

        // step54: when the snake collides with itself then we want to stop the game , so we will write a function to check if the snake collides with itself or not and then play the game over sound and stop the music sound.
        if(isCollide(snakeArr)){
            gameOverSound.play();
            musicSound.pause();

            // step55: we then reset the snakeArr and the score to 0 and alert the user that the game is over and ask them to press any key to restart the game ; also we setback inputDir to 0,0 to indicate that the snake is not moving in any direction now ; i.e. to make the snake stop moving.
            inputDir = {x:0 , y:0};

            // shifted here so that gets reset to 0 immediately there.
            score=0;
            scoreBox.innerHTML = "Score: " + score;


            // alert("Game Over! Wanna play again ?");

            // Use confirm() instead of alert()
            if (confirm("Game Over! Press OK to restart or Cancel to stop.")) {
                // If user presses OK
                snakeArr = [{x: 13, y: 15}];
                musicSound.play();
            } else {
                // If user presses Cancel
                // You can add code here to stop the game completely if needed,
                // for example, by not allowing window.requestAnimationFrame(main) to be called again.
                // For now, it will just stay on the Game Over screen.
                alert("Thanks for playing!");
            }

            // step56: after key pressed by user score reset to 0 and reset the head of snake at the originla position and also start the music sound again.

            // score = 0;
            snakeArr = [{x:13 , y:15}];
            musicSound.play();
        }

        // step58: now lets write the logic to update the game when snake eats the food.

        // step59: so now we check when the x,y coordinates of food and the head of snake are same then we will update the score and increment the score by 1 and also add a new body part to the snake array and also we will generate a new food and display it on the screen.
        if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){

            // step70: add food sound whenever snake eats a food.
            foodSound.play();

            // step76: lets increment the score whenever snake eats a food.
            score += 1;

            // step89: if the score scored > highscore then update the highscore in local storage.
            if(score > highscoreval){
                highscoreval = score;
                localStorage.setItem("highScore", JSON.stringify(highscoreval));
                highscoreBox.innerHTML = "High Score: " + highscoreval;
            }

            // step82: now we show the score after snake eats a food and keep increasing it by 1 whenever snake eats a food.

            // step83: see the next step in index.html now
            scoreBox.innerHTML = "Score: " + score;

            // step77: see next step in index.html there.

            // step60: "unshift" adds element at the beginning in an array ; so we are adding this object in the array of objet at its beginning to move the head of the snake in the direction of key pressed ; and the old head becomes snakeBody now.
            snakeArr.unshift({x : snakeArr[0].x + inputDir.x , y : snakeArr[0].y + inputDir.y});

            // step61: now we want to put food at random place inside the container after snake eats a food.

            // step63: we can set the value of a and b to be somewhat between 1 and 18 as our grid has 18 rows and 18 columns.
            let a = 2;
            let b = 16;

            // step62: the below code generates a food between a and b randomly for the random x and y coordinates of the food.
            food = {x : Math.round(a + (b-a) * Math.random()) , y : Math.round(a + (b-a) * Math.random())};
        }

            // step63: now lets write the logic to move the snake on the screen.

            // step64: imagine the snake as cubes joined together or imagine its body as array boxes ; we are starting from the second last box and going upto the head at 0th index ; we will be shifting them and replacing them with the boxes infront of them and finally move the head in the direction of the key pressed.
            for(let i=snakeArr.length-2 ; i>=0 ; i--){

                // step65: we need to use the "..." spread operator to achieve this because if we just do snakeArr[i+1] = snakeArr[i] then : like lets say we have snakeArr = [{x:5,y:5},{x:5,y:6},{x:5,y:7}] , then if we do snakeArr[2]=snakeArr[1] ; and then snakeArr[1]=snakeArr[0] ; then it makes the snakeArr[2] points to same {x:5,y:6} and then snakeArr[1] points to same {x:5,y:5} and then snakeArr[0] points to same {x:5,y:5} ; so the snake will be stuck in a loop and won't move forward ; its because : Objects are stored by reference (like a pointer) in JavaScript.

                // step66: thats why we use spread operator so that the value is copied but that object remains independent now and not affected by other objects there in that array of object.
                snakeArr[i+1] = {...snakeArr[i]};
            }

            // step67: now we started from 2nd last index and did +1 so that its now the last index and thus we made last index box to come at position of 2nd last box , then the second last index box to come at position of 3rd last box and so on and finally the 1st index box to come at the 0th index box , which is the head of the snake now,

            // step68: and finally we will move the head based on key pressed and inputDir variable assigned based on that pressed key there.

            // step69: so update the x and y coordinates of the head of the snake based on the inputDir variable.
            snakeArr[0].x += inputDir.x;
            snakeArr[0].y += inputDir.y;

        // step39: we now when displaying snakes don't want to display a snake then inside that snake overlap with another snake and all , so clear the innerHTML of the board first everytime we run the gameEngine function and when the website renders we ensure that the snake keeps changing the location of the body parts of it on every re-render there.
        board.innerHTML = "";

        // step40: then we run a foreach loop which takes parameters as current element of the snake array and index of the current element of the snake array.
        snakeArr.forEach((e , index) => {

            // step41: for the small blocks being added to snake as it eats food lets create a new div to update the snake array below.
            snakeElement = document.createElement("div");

            // step42: and then lets add CSS to this element using JavaScript below  , to set the row number and column number of the element in the grid.

            // step43: for row the row number is told from top of box below on y axis so for row keep "y" and vice-versa for column.
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;

            // step48: also check if the index of the snake element is 0 , which means the head of the snake and if it is 0 , then add the class of "head" to the element.
            if(index === 0){
                snakeElement.classList.add("head");
            }
            else{

            // step45: lets now give a class to the element being appended to the snake array , so that it takes up the css wedeined for that class in the css file , and no need to give height width as its a grid , so it will take up the size of the grid blocks there.
            snakeElement.classList.add("snake");
            }

            // step44: now we will append this element as a child of the snake in the board at the assigned x and y coordinates.
            board.append(snakeElement);
        });
            
            // step46: similarly we will now render the food below.
            foodElement = document.createElement("div");
            foodElement.style.gridRowStart = food.y;
            foodElement.style.gridColumnStart = food.x;
            foodElement.classList.add("food");
            board.append(foodElement);
    }

    // step25: can log this time to see whats happening in the console of the browser.
    // console.log(ctime);

}

// step86: now lets try to access the high score from the localStorage there.
let highscore = localStorage.getItem("highScore");
if(highscore === null){
    highscoreval = 0;
    // step87: stored as string in localStorage as it only stores strings.
    localStorage.setItem("highScore" , JSON.stringify(highscoreval));
}
else{
    // step88: converted back to int below and then displayed below.
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "High Score : " + highscoreval;
}

// step20: whenever we render animations , its recommended to use requestAnimationFrame because its used for smoother animations which tells browser that before you render or paint the next frame of the game , run this function first and then paint the next frame ; paint frame means in game every time new frame is added to the screen , thats what we are talking about here.

// step21: we pass the function to the requestAnimationFrame here below to be run everytime the screen is refreshed.
window.requestAnimationFrame(main);

/*
// step49: now lets create event to be listened for key press event and run the function written below on each key press there.
window.addEventListener("keydown" , e => {

    // step50: lets make the direction initially to make the snake to move downwards when any key is pressed initially.
    inputDir = {x:0 , y:1};

    // step51: now when user clicks on any key we play the move sound to play and starts the game.
    moveSound.play();

    if (musicSound.paused) {  // ensures it doesn't restart on every key press
        musicSound.play();
    }

    // step52: now lets use the switch key to see which key is pressed and what to do then ; liek for both wasd and arrow keys ; and also change the direction of the snake accordingly : we have in js origin on top left of container and positive x in its right and positive y in downward direction from there , so for up we will make x=0 and y=-1 , for down we will make x=0 and y=1 , for left we will make x=-1 and y=0 and for right we will make x=1 and y=0.
    switch(e.key) {
    case "ArrowUp":
    case "w":
    case "W":
        console.log("up");
        inputDir.x = 0;
        inputDir.y = -1;
        break;
    
    case "ArrowDown":
    case "s":
    case "S":
        console.log("down");
        inputDir.x = 0;
        inputDir.y = 1;
        break;
    case "ArrowLeft":
    case "a":
    case "A":
        console.log("left");
        inputDir.x = -1;
        inputDir.y = 0;
        break;
    
    case "ArrowRight":
    case "d":
    case "D":
        console.log("right");
        inputDir.x = 1;
        inputDir.y = 0;
        break;
}
*/

// to prevent 180 degrees turn 
window.addEventListener("keydown" , e => {

    // Prevent immediate 180-degree turns
    // If the snake is moving horizontally (x-axis), it can't turn back on the x-axis.
    // If the snake is moving vertically (y-axis), it can't turn back on the y-axis.

    let currentDir = {...inputDir}; // Create a copy of the current direction

    switch(e.key) {
        case "ArrowUp":
        case "w":
        case "W":
            if (currentDir.y !== 1) { // Not moving down, so a turn to up is valid
                inputDir.x = 0;
                inputDir.y = -1;
                moveSound.play();
                if (musicSound.paused) {
                    musicSound.play();
                }
            }
            break;
        
        case "ArrowDown":
        case "s":
        case "S":
            if (currentDir.y !== -1) { // Not moving up, so a turn to down is valid
                inputDir.x = 0;
                inputDir.y = 1;
                moveSound.play();
                if (musicSound.paused) {
                    musicSound.play();
                }
            }
            break;

        case "ArrowLeft":
        case "a":
        case "A":
            if (currentDir.x !== 1) { // Not moving right, so a turn to left is valid
                inputDir.x = -1;
                inputDir.y = 0;
                moveSound.play();
                if (musicSound.paused) {
                    musicSound.play();
                }
            }
            break;
        
        case "ArrowRight":
        case "d":
        case "D":
            if (currentDir.x !== -1) { // Not moving left, so a turn to right is valid
                inputDir.x = 1;
                inputDir.y = 0;
                moveSound.play();
                if (musicSound.paused) {
                    musicSound.play();
                }
            }
            break;
    }

    
});