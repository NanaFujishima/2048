const gridContainer = document.getElementById("grid-container");
const SIZE = 4;
let grid = Array(SIZE)
  .fill(null)
  .map(() => Array(SIZE).fill(0));

function generateTile() {
  let emptyTiles = [];
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (grid[i][j] === 0) {
        emptyTiles.push({ x: i, y: j });
      }
    }
  }
  if (emptyTiles.length > 0) {
    const { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    grid[x][y] = Math.random() < 0.9 ? 2 : 4;
  }
}

function drawGrid() {
  gridContainer.innerHTML = "";
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const tileValue = grid[i][j];
      const tileDiv = document.createElement("div");
      tileDiv.className = `tile tile-${tileValue}`;
      tileDiv.textContent = tileValue > 0 ? tileValue : "";
      gridContainer.appendChild(tileDiv);
    }
  }
}

function moveTiles(direction) {
  for (let i = 0; i < SIZE; i++) {
    let currentRow = grid[i].filter((v) => v !== 0);
    if (direction === "right") currentRow.reverse();
    let newRow = [];
    for (let j = 0; j < currentRow.length; j++) {
      if (currentRow[j] === currentRow[j + 1]) {
        newRow.push(currentRow[j] * 2);
        j++;
      } else {
        newRow.push(currentRow[j]);
      }
    }
    while (newRow.length < SIZE) newRow.push(0);
    if (direction === "right") newRow.reverse();
    grid[i] = newRow;
  }
}

function rotateGrid() {
  const newGrid = Array(SIZE)
    .fill(null)
    .map(() => Array(SIZE).fill(0));
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      newGrid[j][SIZE - i - 1] = grid[i][j];
    }
  }
  grid = newGrid;
}

function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowLeft":
      moveTiles("left");
      break;
    case "ArrowRight":
      moveTiles("right");
      break;
    case "ArrowUp":
      rotateGrid();
      rotateGrid();
      rotateGrid();
      moveTiles("left");
      rotateGrid();
      break;
    case "ArrowDown":
      rotateGrid();
      moveTiles("left");
      rotateGrid();
      rotateGrid();
      rotateGrid();
      break;
    default:
      return;
  }
  generateTile();
  drawGrid();
}

document.addEventListener("keydown", handleKeyPress);
generateTile();
generateTile();
drawGrid();
