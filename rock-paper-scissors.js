
// Print welcome Message
let welcomeMessage = "Welcome to Rock, Paper, Scissors!";
console.log(welcomeMessage);

//const rock = document.querySelector(".button")
//rock.addEventListener("click",getPlayerChoice)
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', playRound))

// Main Game

// Initialize Player Score
let playerScore = 0;

// Initialize CPU Score
let cpuScore = 0;

// Initialize Round #
let round = 1;

// DOM objects
const playerScoreLabel = document.querySelector('.p1-score');
const cpuScoreLabel = document.querySelector('.p2-score');
const roundLabel = document.querySelector('.round-number');
const roundResultsLabel = document.querySelector('.round-results');
const scoreboardLabel = document.querySelector('.scoreboard');


//TODO: disable buttons at the end of the game
//TODO: change console.log to DOM objects
//    player score
//    cpu score
//    Round
//    who won the round
//    scoreboard dom

//TODO: make result round text bold


function getPlayerChoice(e) {
    //playerChoice = prompt("Rock, Paper, or Scissors? (case insensitive): ");
    //depending on where you click, buttons can be the
    // the div itself, the icon or the p text.
    // use the following button HOTFIX
    // add the css button hotfix
    result = e.srcElement.className
    result = result.slice(7,result.length);
    //console.log(`click registered ${e}`)
    playerChoice = result;
    playerChoice = playerChoice.toLowerCase();
    console.log(playerChoice)
    return playerChoice
}   

function computerPlay(){
    cpuChoice = ""
    let choices = ["rock", "paper", "scissors"]
    cpuChoice = choices[Math.floor(Math.random()*3)]
    return cpuChoice
}

function playRound(e) {
    // If Player and CPU choose same option, have both players choose again and increment round by 1
    
    playerSelection = getPlayerChoice(e);
    cpuSelection = computerPlay();
    console.log(`player: ${playerSelection}, cpu: ${cpuSelection}`)
    roundLabel.textContent = round;
    roundResultsLabel.classList.add('show-results');
    if (playerSelection === cpuSelection) {
        console.log("Tie!");
        roundResultsLabel.textContent = "Tie!";
        round += 1;
        return "tie!"
    }
    // Player wins if
        // p = Rock, C = Scissors
        // p = Paper, c = Rock
        // p = Scissors C = Paper
    // If the player wins, return "You Win! [player.choice] beats [CPU.choice]" and increment player score by 1
    // If the CPU wins, return "You Lose! [cpu.choice] beats [player.choice]" and increment cpu score by 1
    else if((playerSelection === "rock" && cpuSelection === "scissors") || (playerSelection === "paper" && cpuSelection === "rock") || (playerSelection === "scissors" && cpuSelection === "paper")){
        console.log(`You Win! ${playerSelection} beats ${cpuSelection}`)
        playerScore += 1;
        round += 1;
        //console.log(`playerScore: ${playerScore}`);
        playerScoreLabel.textContent = playerScore;
        roundResultsLabel.textContent = `  ${playerSelection} beats ${cpuSelection}`;
        let winLabel = document.createElement('b');
        winLabel.textContent = "You Win!";
        roundResultsLabel.prepend(winLabel);
        // will add bolded YOU WIN after the sentence
        //roundResultsLabel.append(winLabel);
        // will add bolded YOU WIN BEFORE the sentence
        // for verification of where the new child node is
        //console.log(roundResultsLabel.childNodes);
        //roundResultsLabel.setAttribute('style', 'visibility: visible');
        //roundResultsLabel.classList.add('show-results');
        scoreboard(playerScore,cpuScore);
        return `You Win! ${playerSelection} beats ${cpuSelection}` 
    } else {
        cpuScore += 1;
        round += 1;
        let loseLabel = document.createElement('b');
        loseLabel.textContent = "You Lose!";
        //console.log(`cpuScore: ${cpuScore}`);
        cpuScoreLabel.textContent = cpuScore;
        roundResultsLabel.textContent = `${cpuSelection} beats ${playerSelection}`;
        roundResultsLabel.prepend(loseLabel);
        //roundResultsLabel.classList.add('show-results');
        console.log(`You Lose! ${cpuSelection} beats ${playerSelection}`)
        scoreboard(playerScore,cpuScore);
        return `You Lose! ${cpuSelection} beats ${playerSelection}`
    }
    
}

function scoreboard(playerScore, cpuScore) {
    if (playerScore < 5 & cpuScore < 5){
        //console.log("still playing...")
        return;
    }

    buttons.forEach(button => button.classList.add('disabled'));
    let scoreboardWinLabel =  document.createElement('div');
    scoreboardWinLabel.classList.add('winner');
    scoreboardWinLabel.textContent = "You Win!";

    let scoreboardLoseLabel = document.createElement('div');
    scoreboardLoseLabel.classList.add('loser');
    scoreboardLoseLabel.textContent = "You Lose!";

    let scoreboardResult1 = document.createElement('div');

    let resultName = document.createElement('span');
    resultName.textContent = "Player Scored..."
    resultName.classList.add('item');

    let resultScore = document.createElement('span');
    resultScore.textContent = playerScore;
    resultScore.classList.add('item');

    scoreboardResult1.appendChild(resultName);
    scoreboardResult1.appendChild(resultScore);
    scoreboardLabel.appendChild(scoreboardResult1);

    let scoreboardResult2 = document.createElement('div');
    
    resultName = document.createElement('span');
    resultName.textContent = "CPU Scored..."
    resultName.classList.add('item');

    resultScore = document.createElement('span');
    resultScore.textContent = cpuScore;
    resultScore.classList.add('item');

    scoreboardResult2.appendChild(resultName);
    scoreboardResult2.appendChild(resultScore);
    scoreboardLabel.appendChild(scoreboardResult2);



    console.log("--- Final Results ---");
    if (playerScore === cpuScore) {
        console.log("It's a tie!");
        console.log(`Player Scored... ${playerScore}`);
        console.log(`CPU Scored... ${cpuScore}`);
    } else if (playerScore > cpuScore) {
        scoreboardLabel.appendChild(scoreboardWinLabel);
        // player 1 score
        scoreboardLabel.appendChild(scoreboardResult1);
        // cpu score
        scoreboardLabel.appendChild(scoreboardResult2);

        console.log("Player Wins!");
        console.log(`Player Scored... ${playerScore}`);
        console.log(`CPU Scored... ${cpuScore}`);
        scoreboardLabel.classList.add('show-results');
    } else {
        scoreboardLabel.appendChild(scoreboardLoseLabel);
        // cpu score
        scoreboardLabel.appendChild(scoreboardResult2);
        // player 1 score
        scoreboardLabel.appendChild(scoreboardResult1);
        
        console.log("CPU Wins");
        console.log(`CPU Scored... ${cpuScore}`);
        console.log(`Player Scored... ${playerScore}`);
        scoreboardLabel.classList.add('show-results');
    }
}

/*


// Ask User for Rock, Paper or Scissors
// Ensure only Rock, Paper or Scissors is selected
function getPlayerChoice() {
    playerChoice = prompt("Rock, Paper, or Scissors? (case insensitive): ");
    //Player quits
    if (playerChoice === null) {
        return;
    } 
    playerChoice = playerChoice.toLowerCase();
    let keepGoing = true;
    while (keepGoing) {
        if (playerChoice === "rock") {
            return "rock"
        } else if (playerChoice === "paper") {
            return "paper"
        } else if (playerChoice === "scissors") {
            return "scissors"
        } 
        playerChoice = prompt("Try again!\nRock, Paper, or Scissors? (case insensitive): ")
        if (playerChoice === null){
            return;
        }
        playerChoice = playerChoice.toLowerCase();
    } 
    return playerChoice
}   

// Have the CPU randomly choose rock, paper or scissors
function computerPlay(){
    cpuChoice = ""
    let choices = ["rock", "paper", "scissors"]
    cpuChoice = choices[Math.floor(Math.random()*3)]
    return cpuChoice
}



// Compare Player choice with CPU Choice
function playRound(playerSelection, cpuSelection) {
    // If Player and CPU choose same option, have both players choose again and increment round by 1
    if (playerSelection === cpuSelection) {
        return "tie!"
    }
    // Player wins if
        // p = Rock, C = Scissors
        // p = Paper, c = Rock
        // p = Scissors C = Paper
    // If the player wins, return "You Win! [player.choice] beats [CPU.choice]" and increment player score by 1
    // If the CPU wins, return "You Lose! [cpu.choice] beats [player.choice]" and increment cpu score by 1
    else if((playerSelection === "rock" && cpuSelection === "scissors") || (playerSelection === "paper" && cpuSelection === "rock") || (playerSelection === "scissors" && cpuSelection === "paper")){
        return `You Win! ${playerSelection} beats ${cpuSelection}` 
    } else {
        return `You Lose! ${cpuSelection} beats ${playerSelection}`
    }
}

function game() {
    // Initialize Player Score
    let playerScore = 0;

    // Initialize CPU Score
    let cpuScore = 0;

    // Initialize Round #
    let round = 1;

    
    

    
    // increase the round loop by 1 and start again by asking user for their choice
    for (round = 1; round <= 5; round++){
        // Print the Current Round
        console.log("Round: " + round);
        playerSelection = getPlayerChoice();
        if (playerSelection === undefined){
            return;
        }
        console.log(`You chose ${playerChoice}`);
        cpuSelection = computerPlay();
        console.log(`CPU chose ${cpuChoice}`);
        result = playRound(playerSelection,cpuSelection)
        if (result.includes("Win")) {
            playerScore += 1;
        } else if (result.includes("Lose")) {
            cpuScore += 1;
        }
        console.log(result);

    }
    
            
    scoreboard(playerScore, cpuScore);
}

function scoreboard(playerScore, cpuScore) {
    console.log("--- Final Results ---");
    if (playerScore === cpuScore) {
        console.log("It's a tie!");
        console.log(`Player Scored... ${playerScore}`);
        console.log(`CPU Scored... ${cpuScore}`);
    } else if (playerScore > cpuScore) {
        console.log("Player Wins!");
        console.log(`Player Scored... ${playerScore}`);
        console.log(`CPU Scored... ${cpuScore}`);
    } else {
        console.log("CPU Wins");
        console.log(`CPU Scored... ${cpuScore}`);
        console.log(`Player Scored... ${playerScore}`);
    }
}

game();
    // Once the 5th round is complete, Say who won, then a scoreboard of the name and score of all players should show with player with highest score should be displayed first
// End the script.

/*
playerSelection = getPlayerChoice();
console.log(`You chose ${playerChoice}`);
cpuSelection = computerPlay();
console.log(`CPU chose ${cpuChoice}`);
console.log(playRound(playerSelection, cpuSelection));
*/