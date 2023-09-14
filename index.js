const players = document.querySelectorAll("section div img");
const button = document.querySelector("header button");
const winText = document.querySelector("#win-text p");

let playerScores = [];
let winningPlayers = [];

//When the button is clicked : 
button.addEventListener("click" , function() {
    diceRolling();
    findingWinningPlayers();
    printWinningPlayer();

    //Cleaning up to arrays : 
    playerScores = [];
    winningPlayers = [];
})


//All functions : 

function diceRolling() {
    for (let i = 0; i < players.length; i++) {
        let randomNum = Math.floor(1 + Math.random() * 6);      //1 - 6
        playerScores[i] = randomNum;
        players[i].setAttribute("src", `./images/dice${randomNum}.png`);
    }
}

function findingWinningPlayers() {
    let biggestNum;

    //Finding the highest score : 

    for (let i = 0; i < playerScores.length; i++) {
        if (i === 0) {
            biggestNum = playerScores[i];
            continue;
        }

        else if (playerScores[i] > biggestNum) {
            biggestNum = playerScores[i];
        }
    }

    //We add all players with this score to a array : 

    for (let i = 0; i < playerScores.length; i++) {
        if (playerScores[i] === biggestNum)
            winningPlayers.push(i);
    }
}

function printWinningPlayer() {

    if (winningPlayers.length === 1) {
        winText.textContent = `player - ${winningPlayers[0] + 1} win !`;
    }

    else {
        winText.textContent = `Draw !`;
    }
}