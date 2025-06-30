let turn = 0;
const resultDiv = document.getElementById("result");
const resultRestartDiv = document.getElementById("result-restart");

function Gameboard(onTileClick) {
    const rows = 3;
    const cols = 3;
    let board = [];
    let tileElements = [];
    let gameContainer = document.getElementById("game-container");

    // Get/Set
    const getBoard = () => board;
    
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        tileElements[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
            let tile = document.createElement("button");
            tile.classList.add("tile");
            tile.dataset.coords = `${i} ${j}`;
            tile.textContent = "";
            tile.addEventListener("click", e => {
                let coordsArray = e.target.dataset.coords.split(" ");
                onTileClick(parseInt(coordsArray[0]), parseInt(coordsArray[1]), board);
            });
            gameContainer.appendChild(tile);
            tileElements[i][j] = tile;
        }
    }

    const renderBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const value = board[i][j].getValue();
                tileElements[i][j].textContent = value !== 0 ? value : "";
            }
        }
    };

    const playCell = (x, y, player) => {
        const cell = board[x][y];
        cell.setValue(player);
    }

    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                board[i][j].setValue(0);
                tileElements[i][j].textContent = "";
            }
        }
        turn = 0;
        result.textContent = "";
        resultRestartDiv.style.opacity = 0;
    }

    const restartBtn = document.getElementById("restart");
    restartBtn.addEventListener("click", () => resetBoard());

    return { getBoard, renderBoard, playCell }
}

function Cell() {
    let value = 0;
    
    // Get/Set
    const setValue = (player) => value = player;
    const getValue = () => value;

    return { setValue, getValue }
}

function Game() {
    const playRound = (x, y, gameboard) => {
        if (turn >= 9 || gameboard[x][y].getValue() !== 0) return;
        board.playCell(x, y, activePlayer.sign);
        turn++;
        renderRound();
        let result = checkWinner(x, y, activePlayer.sign);
        if (result !== "N") {
            resultRestartDiv.style.opacity = "1";
            if (result === "W") resultDiv.textContent = `${activePlayer.sign} Wins!`;
            else if (result === "D") resultDiv.textContent = "Draw!";

            return;
        }
        switchActivePlayer();
    }

    const board = Gameboard(playRound);
    const players = [
        {name: "Player One", sign: "X"}, 
        {name: "Player Two", sign: "O"}
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
    const renderRound = () => board.renderBoard();

    const checkWinner = (x, y, sign) => {
        const gameboard = board.getBoard();
        if (gameboard.every(el => el[y].getValue() === sign)) {
            turn = 9;
            return "W";
        };
        if (gameboard[x].every(el => el.getValue() === sign)) {
            turn = 9;
            return "W";
        };
        if (x === y && [0, 1, 2].every(i => gameboard[i][i].getValue() === sign)) {
            turn = 9;
            return "W";
        };
        if (x + y === 2 && [0, 1, 2].every(i => gameboard[i][2 - i].getValue() === sign)) {
            turn = 9;
            return "W";
        };
        if (turn === 9) {
            return "D";
        }
        return "N";
    }

    renderRound();
    switchActivePlayerUI();
    return { playRound, getActivePlayer }
}

const game = Game();
