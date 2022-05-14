let boardArray = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

let score = 0;

const numRows = 6;
const numCols = 5;
function setupBoard() {
  const numRows = 6;
  const numCols = 5;
  const container = document.createElement("div");

  container.className = "container";

  const colourPicker = document.createElement("div");
  colourPicker.className = "test";
  colourPicker.id = "colourPicker";
  container.appendChild(colourPicker);

  for (let i = 0; i < numRows; i++) {
    const rowElem = document.createElement("div");
    // rowElem.id = i;
    rowElem.className = "row";
    for (let j = 0; j < numCols; j++) {
      const elem = document.createElement("div");
      elem.id = `r${i}-c${j}`;
      elem.className = "col";
      elem.addEventListener("click", () => {
        fillCell(i, j, elem);
      });
      rowElem.appendChild(elem);
    }
    container.appendChild(rowElem);
  }

  const scoreElem = document.createElement("div");
  scoreElem.id = "score";
  scoreElem.innerText = `score:${score}`;
  container.appendChild(scoreElem);
  document.body.appendChild(container);
}

let colour;
let colorNum;
setupBoard();

function fillCell(x, y, elem) {
  if (boardArray[x][y] !== 0) {
    console.log(`can't click`);
    return;
  }
  elem.style = `background-color: ${colour}`;
  boardArray[x][y] = colorNum;
  setTimeout(checkForMatches, 250, x, y, colorNum);
  colorNum = colourPick();
}

colourPick();

function colourPick() {
  const colours = ["blank", "red", "blue", "green", "yellow"];
  colorNum = Math.ceil(Math.random() * (colours.length - 1));
  colour = colours[colorNum];
  const colourPicker = document.getElementById("colourPicker");
  colourPicker.style = `background-color: ${colour}`;
  colourPicker.innerText = `next colour: ${colour}`;
  return colorNum;
}

function checkForMatches(x, y, colorNum) {
  // take the x & y of the clicked one - check - lets do row 1st
  const inARow = 3;
  let horizontalInARow = 0;
  let horizontalMatches = [];
  // check horizontal;
  for (let i = 0; i < numCols; i++) {
    if (boardArray[x][i] === colorNum) {
      horizontalInARow++;
      horizontalMatches.push({ x, y: i });
    } else if (horizontalInARow < inARow) {
      horizontalInARow = 0;
      horizontalMatches = [];
    } else if (horizontalInARow >= inARow) {
      break;
    }
  }
  // check vertical

  let verticalInARow = 0;
  let verticalMatches = [];
  for (let i = 0; i < numRows; i++) {
    if (boardArray[i][y] === colorNum) {
      verticalInARow++;
      verticalMatches.push({ x: i, y });
    } else if (verticalInARow < inARow) {
      verticalInARow = 0;
      verticalMatches = [];
    } else if (verticalInARow >= inARow) {
      break;
    }
  }

  let points = 0;
  let horizaontalMatch = false;
  let vertMatch = false;
  if (horizontalInARow >= inARow) {
    clearCells(horizontalMatches);
    // points += horizontalMatches.length
    // horizontalHatch = true;
    updateScore(horizontalMatches.length);
  }
  if (verticalInARow >= inARow) {
    clearCells(verticalMatches);
    // points += verticalMatches.length
    // vertMatch = true;
    updateScore(verticalMatches.length);
  }
  if (
    horizontalInARow < inARow &&
    verticalInARow < inARow
    // !vertMatch && !horizontalMatch
  ) {
    rollPlaceRandom();
  }
  // if(horizontalMatch && vertMatch) {
  // points ++
  // this way we can add a bonus if there's a vert & horizontal.

  // updateScore(points)
  // }
}

function rollPlaceRandom() {
  const chance = Math.random();
  console.log(chance);
  const times = chance > 0.75 ? 2 : 1;
  for (let i = 0; i < times; i++) {
    placeRandom();
  }
}

function clearCells(cells) {
  cells.forEach((cell) => {
    document.getElementById(`r${cell.x}-c${cell.y}`).style = "";
    boardArray[cell.x][cell.y] = 0;
  });
}

function updateScore(num) {
  score += num;
  document.getElementById("score").innerText = `score:${score}`;
}

function checkForRandom(x, y, colorNum) {
  const inARow = 3;
  let horizontalInARow = 0;
  let horizontalMatches = [];
  for (let i = 0; i < numCols; i++) {
    if (boardArray[x][i] === colorNum) {
      horizontalInARow++;
      horizontalMatches.push({ x, y: i });
    } else if (horizontalInARow < inARow) {
      horizontalInARow = 0;
      horizontalMatches = [];
    } else if (horizontalInARow >= inARow) {
      break;
    }
  }

  let verticalInARow = 0;
  let verticalMatches = [];
  for (let i = 0; i < numRows; i++) {
    if (boardArray[i][y] === colorNum) {
      verticalInARow++;
      verticalMatches.push({ x: i, y });
    } else if (verticalInARow < inARow) {
      verticalInARow = 0;
      verticalMatches = [];
    } else if (verticalInARow >= inARow) {
      break;
    }
  }

  if (horizontalInARow >= inARow || verticalInARow >= inARow) {
    console.log("bin!");
    return true;
  }
}

function isGameOver() {
  const blankCells = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (boardArray[i][j] === 0) {
        blankCells.push({ x: i, y: j });
      }
    }
  }
  if (blankCells.length === 0) {
    console.warn("GAME OVER");
    const scoreBoard = document.getElementById("score");
    scoreBoard.innerText = `GAMEOVER\rscore:${score}\nclick to reload`;
    scoreBoard.addEventListener("click", () => {
      location.reload();
    });
    return;
  }
}

function placeRandom() {
  // get empty cells;
  const blankCells = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (boardArray[i][j] === 0) {
        blankCells.push({ x: i, y: j });
      }
    }
  }

  // get randomBlankCellCoords
  if (blankCells.length === 0) {
    console.warn("GAME OVER");
    document.getElementById("score").innerText = `GAMEOVER\rscore:${score}`;
    return;
  }
  const { x, y } = blankCells[Math.floor(Math.random() * blankCells.length)];
  const colours = ["blank", "red", "blue", "green", "yellow"];
  const randomColorNum = Math.ceil(Math.random() * (colours.length - 1));
  const randomColor = colours[randomColorNum];
  boardArray[x][y] = randomColorNum;
  const isMatch = checkForRandom(x, y, randomColorNum);
  if (isMatch) {
    console.log("random create match - replacing and trying again");
    boardArray[x][y] = 0;
    placeRandom();
    return;
  }
  document.getElementById(
    `r${x}-c${y}`
  ).style = `background-color:${randomColor}`;
  isGameOver();
}

function startOfGame() {
  placeRandom();
  placeRandom();
  placeRandom();
  placeRandom();
  placeRandom();
  placeRandom();
}

startOfGame();
