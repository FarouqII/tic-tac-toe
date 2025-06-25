let turn = 0;

function Gameboard() {
    const rows = 3;
    const cols = 3;
    let board = [];
    let gameContainer = document.getElementById("game-container");

    // Get/Set
    const getBoard = () => board;
    
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
        }
    }

    const renderBoard = () => {
        gameContainer.innerHTML = "";
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                gameContainer.innerHTML += `<button class="tile" coords="${i} ${j}"></button>`
            }
        }
    }

    const playCell = (x, y, player) => {
        const cell = board[x][y];
        cell.setValue(player);
    }

    const printBoard = () => {
        console.log(board.map(row => row.map(cell => cell.getValue())));
    }

    return { getBoard, renderBoard, playCell, printBoard }
}

function Cell() {
    let value = 0;
    
    // Get/Set
    const setValue = (player) => value = player;
    const getValue = () => value;

    return { setValue, getValue }
}

function Game() {
    const board = Gameboard();
    const players = [
        {
            name: "Player One",
            sign: "X"
        },
        {
            name: "Player Two",
            sign: "O"
        }
    ]
    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        switchActivePlayerUI();
    }
    const switchActivePlayerUI = () => {
        const xPlayer = document.getElementById("x-p");
        const oPlayer = document.getElementById("o-p");

        if (activePlayer.sign === "X") {
            xPlayer.classList.add("active");
            oPlayer.classList.remove("active");
        } else {
            oPlayer.classList.add("active");
            xPlayer.classList.remove("active");
        }
    }
    const printRound = () => board.printBoard();
    const renderRound = () => board.renderBoard();

    const userInput = () => {
        let coords = prompt("Where do you want to put your sign: ");
        let coordsArray = coords.split(" ");
        playRound(coordsArray[0], coordsArray[1]);
    }

    const playRound = (x, y) => {
        board.playCell(x, y, activePlayer.sign);
        console.log(checkWinner(x, y, activePlayer.sign));
        turn++;
        console.log(turn);
        switchActivePlayer();
        printRound();
        renderRound();
        if (turn >= 9) {
            console.log("Round Over!")
            return;
        }
        console.log(`${activePlayer.name}'s turn`);
        userInput();
    }

    const checkWinner = (x, y, sign) => {
        const gameboard = board.getBoard();
        if (gameboard.every(el => el[y].getValue() === sign)) {
            turn = 9;
            return "W"
        };
        if (gameboard[x].every(el => el.getValue() === sign)) {
            turn = 9;
            return "W"
        };
        if (x === y && [0, 1, 2].every(i => gameboard[i][i].getValue() === sign)) {
            turn = 9;
            return "W"
        };
        if (x + y === 2 && [0, 1, 2].every(i => gameboard[i][2 - i].getValue() === sign)) {
            turn = 9;
            return "W"
        };
        return "N";
    }

    printRound();
    renderRound();
    switchActivePlayerUI();
    return { userInput, playRound, getActivePlayer }
}

const game = Game();
game.userInput();
