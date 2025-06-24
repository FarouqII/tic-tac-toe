let turn = 0;

function Gameboard() {
    const rows = 3;
    const cols = 3;
    let board = [];

    // Get/Set
    const getBoard = () => board;
    
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
        }
    }

    const playCell = (x, y, player) => {
        const cell = board[x][y];
        cell.setValue(player);
    }

    const printBoard = () => {
        console.log(board.map(row => row.map(cell => cell.getValue())));
    }

    return { getBoard, playCell, printBoard }
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

    const switchActivePlayer = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];
    const printRound = () => board.printBoard();

    const playRound = (x, y) => {
        board.playCell(x, y, activePlayer.sign);
        console.log(checkWinner(x, y, activePlayer.sign));
        turn++;
        console.log(turn);
        switchActivePlayer();
        printRound();
        if (turn > 9) {
            console.log("Round Over!")
            return;
        }
        console.log(`${activePlayer.name}'s turn`)
    }

    const checkWinner = (x, y, sign) => {
        const gameboard = board.getBoard();
        if (gameboard.every(el => el[y].getValue === sign)) {
            turn = 9;
            return "W"
        };
        if (gameboard[x].every(el => el.getValue === sign)) {
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
    return { playRound, getActivePlayer }
}

const game = Game();
