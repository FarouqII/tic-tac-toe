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
        switchActivePlayer();
        printRound();
        console.log(`${activePlayer.name}'s turn`)
    }

    printRound();
    return { playRound, getActivePlayer }
}

const game = Game();
game.playRound(0, 0); // Player One plays X in top-left
game.playRound(1, 1); // Player Two plays O in center
game.playRound(2, 2); // Player One plays X in bottom-right