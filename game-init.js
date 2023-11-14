import Game from "./game.js";

class Initialize {
    playerCount;
    playerNames = [];
    mainMenuContainer = document.querySelector(".main-menu .container");
    numberArr = [];
    isStartBtnClicked = false;
    isBackBtnClicked = false;
    isRandNameBtnClicked = false;

    initialize() {
        const button = document.querySelector(".main-menu .container .left button");
        const input = document.getElementById("player-count");

        button.addEventListener("click", (e) => {
            e.preventDefault();

            //Player count detection : 
            if (this.numberControl(input.value)) {
                this.playerCount = parseInt(input.value);
                input.value = "";

                //Transition animation : 
                this.transition();

                //Create player name input area : 
                this.createPlayerNameForm();

                //Player names detection : 
                this.playerNamesDetection();
            }

        });
    }

    createPlayerNameForm() {
        const formItem = document.querySelectorAll(".main-menu .right .form-item");

        for (let i = 0; i < this.playerCount; i++)
            formItem[i].classList.remove("display-none");
    }

    playerNamesDetection() {
        const rightDiv = document.querySelector(".main-menu .container .right");
        const formItem = document.querySelectorAll(".main-menu .right .form-item");
        const buttons = rightDiv.lastElementChild;
        const backBtn = buttons.firstElementChild;
        const startBtn = buttons.lastElementChild

        if (!this.isRandNameBtnClicked) {
            this.isRandNameBtnClicked = true;

            //For random name : 
            rightDiv.firstElementChild.addEventListener("click", (e) => {
                if (e.target.classList.contains("fa-shuffle")) {
                    const input = e.target.parentElement.parentElement.lastElementChild;
                    input.value = this.randomNameGenertor();
                }
            });
        }


        if (!this.isBackBtnClicked) {
            this.isBackBtnClicked = true;

            //When clicking the back button : 
            backBtn.addEventListener("click", (e) => {
                e.preventDefault();

                //Transition animation : 
                this.transition();

                //Form and buttons deleted : 
                setTimeout(() => {
                    for (let i = 0; i < this.playerCount; i++) {
                        formItem[i].classList.add("display-none");
                        formItem[i].lastElementChild.value = "";
                    }
                }, 500);

                this.numberArr = [];
            });

        }

        if (!this.isStartBtnClicked) {
            this.isStartBtnClicked = true;

            //When clicking the start game  button : 
            startBtn.addEventListener("click", (e) => {
                e.preventDefault();

                const input = document.querySelectorAll(".main-menu .container .right form .form-item input");
                let errorInput = 0;

                //Initial value assigment to player names array :
                for (let i = 0; i < this.playerCount; i++) {
                    if (!this.textControl(input[i].value)) {
                        errorInput++;
                        continue;
                    }

                    this.playerNames.push(input[i].value);
                }

                if (errorInput > 0) {
                    this.playerNames = [];
                }

                else {
                    console.log(this.playerNames.length);
                    //Create game : 
                    let game = new Game(this.playerNames);
                    game.createGameArea();
                }

                this.numberArr = [];
            });
        }


    }

    numberControl(num) {
        if (num >= 2 && num <= 6)
            return true

        return false;
    }

    textControl(text) {
        //If it`s empty : 
        if (text.length === 0)
            return false;

        //If all characters are spaces : 
        let space = 0;

        for (let i = 0; i < text.length; i++) {
            if (text[i] === " ")
                space++;
        }

        if (space === text.length)
            return false;

        return true;
    }

    transition() {
        this.mainMenuContainer.classList.toggle("transition");
    }

    randomNameGenertor() {
        let num;

        do {
            num = Math.floor(900 * Math.random() + 100);    //100 - 999
        } while (this.numberArr.includes(num));

        this.numberArr.push(num);

        return `User - ${num}`;
    }
}

let gameInit = new Initialize();
gameInit.initialize();