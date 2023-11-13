export default class Game {
    players = [];
    temp = [];
    winTxt = document.getElementById("win-text");
    shakeBtn = document.querySelector(".game header button");
    value = true;

    constructor(playerNames) {
        for (let i = 0; i < playerNames.length; i++) {
            this.players.push({
                id: i + 1,
                name: playerNames[i],
                score: 0,
                url: "",
                div: document.getElementById(`p-${i + 1}`),
                win: false
            });
        }

        this.temp = this.players;
    }

    createGameArea() {
        //Create game area : 
        const mainMenu = document.querySelector(".main-menu");;
        const game = document.querySelector(".game");

        this.players.forEach((item) => {
            item.div.classList.remove("display-none");
            item.div.firstElementChild.textContent = item.name;
        });

        game.classList.remove("display-none");
        mainMenu.classList.add("display-none");

        //Dice rolling : 
        this.shake();
    }

    shake() {

        this.shakeBtn.addEventListener("click", () => {
            if (this.value) {
                this.value = false;

                if (this.winTxt.textContent === "Draw !") {
                    this.clear();
                }

                else if (this.winTxt.textContent.includes("win")) {
                    this.clear();
                    this.players = this.temp;
                }

                //Dice rolling : 
                this.diceRolling();

                setTimeout(() => {
                    //Finding winning players : 
                    this.findingWinningPlayers();

                    this.printWinningPlayers();

                }, 400);
            }
        });

    }

    diceRolling() {
        this.players.forEach((item) => {
            item.div.lastElementChild.classList.add("dice-anim");

            setTimeout(() => {
                item.score = Math.floor(6 * Math.random() + 1);     //1 - 6
                item.url = `./images/dice${item.score}.png`;
                item.div.lastElementChild.setAttribute("src", item.url);
                item.div.lastElementChild.classList.remove("dice-anim");
                this.value = true;
            }, 400);

        });
    }

    findingWinningPlayers() {
        let highestScore = 0;

        //Finding the highest score :
        this.players.forEach((item) => {
            if (item.score > highestScore)
                highestScore = item.score;
        });

        //We make the win variable true for winning players :
        this.players.forEach((item) => {
            if (item.score === highestScore)
                item.win = true;
        });
    }

    printWinningPlayers() {
        this.winTxt.classList.remove("display-none");

        //We assign the winning players to a object arrays :
        this.players = this.players.filter(player => player.win === true);

        this.players.forEach((item) => {
            item.div.firstElementChild.classList.add("win-color");
        });

        if (this.players.length === 1) {
            this.winTxt.textContent = this.players[0].name + " won !";
        }

        else {
            this.winTxt.textContent = "Draw !";
        }
    }

    clear() {
        this.players.forEach((item) => {
            item.score = 0;
            item.win = false;
            item.div.firstElementChild.classList.remove("win-color");
        });
    }
}