const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const newGameBtn = document.getElementById("newgame");

let turnX = true; // X starts
let count = 0;
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize event listeners
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleClick(cell, index));
});

function handleClick(cell, index) {
  if (!gameActive || cell.textContent !== "") return;

  cell.textContent = turnX ? "X" : "O";
  cell.disabled = true;
  count++;

  if (checkWinner()) {
    statusText.textContent = `Player ${turnX ? "X" : "O"} wins!`;
    gameActive = false;
    disableAllCells();
    return;
  }

  if (count === 9) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  turnX = !turnX;
  statusText.textContent = `Player ${turnX ? "X" : "O"}'s turn`;
}

function checkWinner() {
  return winningCombinations.some(pattern => {
    const [a, b, c] = pattern;
    const valA = cells[a].textContent;
    const valB = cells[b].textContent;
    const valC = cells[c].textContent;

    return valA !== "" && valA === valB && valB === valC;
  });
}

function disableAllCells() {
  cells.forEach(cell => cell.disabled = true);
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
  });
  turnX = true;
  count = 0;
  gameActive = true;
  statusText.textContent = "Player X's turn";
}

function newGame() {
  resetGame(); // Same as reset in this case
}
