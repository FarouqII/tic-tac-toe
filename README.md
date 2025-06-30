# Tic Tac Toe — Factory Function Practice

This project is a browser-based Tic Tac Toe game built using HTML, CSS, and JavaScript. It was developed as a way to practice and demonstrate understanding of JavaScript **factory functions** and related programming concepts.

## What This Project Covers

- JavaScript **factory functions** and closure-based encapsulation
- Clean code structure with separation of concerns
- Handling user input and updating the DOM
- Game state management (turns, active player, win/draw logic)
- Basic responsive styling using CSS Grid and Flexbox

## How It Works

- The game board is dynamically generated using JavaScript.
- Each tile is represented by a `Cell` object created through a factory function.
- The `Gameboard` factory manages board state and rendering.
- The `Game` function controls turn order, active player, and checks for win/draw conditions.
- The UI updates in real time, and a result message appears when the game ends.

## Why I Built This

This project was designed as an exercise to solidify my understanding of:

- Writing and organizing JavaScript using factory functions
- Avoiding global state by using closures
- Structuring modular, maintainable front-end code

It also helped me gain more comfort with DOM manipulation and user interface logic in a small but complete project.

## Technologies Used

- HTML
- CSS (Flexbox and Grid)
- Vanilla JavaScript