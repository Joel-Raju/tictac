/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
let grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

const humanPlayer = 1;
const computerType = 2;
let humanWinMoves = [];
let computerWinMoves = [];
let isResetNeeded = false;


function initializeGrid() {
  for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
    const tempArray = [];
    for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
      tempArray.push(0);
    }
    grid.push(tempArray);
  }
}

function getRowBoxes(colIdx) {
  let rowDivs = '';
  
  for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
    let additionalClass = 'darkBackground';
    let content = '';
    const sum = colIdx + rowIdx;
    if (sum%2 === 0) {
      additionalClass = 'lightBackground'
    }
    const gridValue = grid[colIdx][rowIdx];
    if(gridValue === 1) {
      content = '<span class="cross">X</span>';
    }
    else if (gridValue === 2) {
      content = '<span class="cross">O</span>';
    }
    rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
      additionalClass + '">' + content + '</div>';
  }
  return rowDivs;
}

function getColumns() {
  let columnDivs = '';
  for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
    let coldiv = getRowBoxes(colIdx);
    coldiv = '<div class="rowStyle">' + coldiv + '</div>';
    columnDivs = columnDivs + coldiv;
  }
  return columnDivs;
}

function renderMainGrid() {
  const parent = document.getElementById("grid");
  const columnDivs = getColumns();
  parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function addClickHandlers() {
  var boxes = document.getElementsByClassName("box");
  for (var idx = 0; idx < boxes.length; idx++) {
    boxes[idx].addEventListener('click', onBoxClick, false);
  }
}

function onBoxClick() {
  if (isResetNeeded) {
    return;
  }
  var rowIdx = this.getAttribute("rowIdx");
  var colIdx = this.getAttribute("colIdx");

  if (grid[colIdx][rowIdx] == 0) {
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
  }

  if (!isEndOfGame()) {
    playNextComputerMove();
  }
}


resetGame();


function isEndOfGame() {
  let winner = isGameWonAlready();
  if (winner == humanPlayer || winner == computerType) {
    showWinner(winner);
    isResetNeeded = true;
    return true;
  } else if (isBoardFull()) {
    showGameEnded();
    isResetNeeded = true;
    return true;
  } else {
    isResetNeeded = false;
    return false;
  }
}


function showWinner(type) {
  let winnerElement = document.getElementById('winner');
  document.getElementById('computer-thinking').innerText = '';
  if (type == humanPlayer) {
    winnerElement.innerText = 'The humans won...';
  } else {
    winnerElement.innerText = 'The bots won...';
  }
}

function playNextComputerMove() {
  showComputerThinking();
  let movesToMake = [];

  for (let i = 0; i < GRID_LENGTH; i++) {
    for (let j = 0; j < GRID_LENGTH; j++) {
      if (grid[i][j] == 0) {
        movesToMake.push({rowIndex: i, colIndex: j});
      }
    }
  }

  let randomIndex = getRandomNumber(0, movesToMake.length);
  let moveToMake = movesToMake[randomIndex];

  if (computerWinMoves.length > 0) {
    randomIndex = getRandomNumber(0, computerWinMoves.length);
    moveToMake = computerWinMoves[randomIndex];
  } else if (humanWinMoves.length > 0) {
    randomIndex = getRandomNumber(0, humanWinMoves.length);
    moveToMake = humanWinMoves[randomIndex];
  }

  grid[moveToMake.rowIndex][moveToMake.colIndex] = computerType;
  renderMainGrid();
  addClickHandlers();
  isEndOfGame();
}

function showComputerThinking() {
  let thinkingElement = document.getElementById('computer-thinking');
  thinkingElement.innerText = 'The bot is thinking ...';
  var randomTime = getRandomNumber(0, 700);
  setTimeout(() => {
    if (!isEndOfGame()) {
      thinkingElement.innerText = 'Humans turn';    
    }
  }, randomTime);
  
}


function getRandomNumber(lowerLimit, upperLimit) {
  return Math.floor(Math.random() * upperLimit) + lowerLimit;
}

function isGameWonAlready() {
  if (hasWon(humanPlayer)) {
    return humanPlayer;
  } else if (hasWon(computerType)) {
    return computerType;
  } else {
    return 0;
  }
}


function resetGame() {
  isResetNeeded = false;
  grid = [];
  initializeGrid();
  renderMainGrid();
  addClickHandlers();
  document.getElementById('winner').innerText = '';
  document.getElementById('computer-thinking').innerText = '';
  document.getElementById('game-end').innerText = '';
}


function isBoardFull() {
  for (let i = 0; i < GRID_LENGTH; i++) {
    for (let j = 0; j < GRID_LENGTH; j++) {
      if (grid[i][j] == 0) {
        return false;
      }
    }
  }
  return true;
}

function showGameEnded() {
  let gameEndElement = document.getElementById('game-end');
  gameEndElement.innerText = 'Game Ended, please reset';
  document.getElementById('computer-thinking').innerText = '';
}


function hasWon(player) {
  let counter = 0;

  if (player == humanPlayer) {
    humanWinMoves = [];  
  } else if (player == computerType) {
    computerWinMoves = [];
  }

  // check rows
  for (let i = 0; (i < GRID_LENGTH); i++) {
    counter = 0;
    for (let j = 0; (j < GRID_LENGTH); j++) {
      if (grid[i][j] == player) {
        counter++;
      }
    }

    if (counter == GRID_LENGTH) {
      return true;
    } else if (counter == GRID_LENGTH - 1) {
      for (let j = 0; j < GRID_LENGTH; j++) {
        if (grid[i][j] == 0) {
          if (player == humanPlayer) {
            humanWinMoves.push({rowIndex: i, colIndex: j});  
          } else {
            humanWinMoves.push({rowIndex: i, colIndex: j});
          }
        }
      }
    }
  }


  // check columns
  for (let i = 0; (i < GRID_LENGTH); i++) {
    counter = 0;
    for (let j = 0; (j < GRID_LENGTH); j++) {
      if (grid[j][i] == player) {
        counter++;
      }
    }
    if (counter == GRID_LENGTH) {
      return true;
    } else if (counter == GRID_LENGTH -1) {
      for (let j = 0; (j < GRID_LENGTH); j++) {
        if (grid[j][i] == 0) {
          if (player == humanPlayer) {
            humanWinMoves.push({rowIndex: j, colIndex: i});  
          } else {
            computerWinMoves.push({rowIndex: j, colIndex: i});
          }
        }
      }
    }
  }

  // L-R diagonal
  counter = 0;
  for (let i = 0; i < GRID_LENGTH; i++) {
    if (grid[i][i] == player) {
      counter++;
    }
  }

  if (counter == GRID_LENGTH) {
    return true;
  } else if (counter == GRID_LENGTH -1) {
    for (let i = 0; i < GRID_LENGTH; i++) {
      if (grid[i][i] == 0) {
        if (player == humanPlayer) {
          humanWinMoves.push({rowIndex: i, colIndex: i});
        } else {
          computerWinMoves.push({rowIndex: i, colIndex: i});
        }
      }
    }
  }

  counter = 0;
  // R-L diagonal
  for (let i = 0; (i < GRID_LENGTH) ; i++) {
    if (grid[i][GRID_LENGTH - (i+1)] == player) {
      counter++;
    }
  }

  if (counter == GRID_LENGTH) {
    return true;
  } else if (counter == GRID_LENGTH - 1) {
    for (let i = 0; (i < GRID_LENGTH) ; i++) {
      if (grid[i][GRID_LENGTH - (i+1)] == 0) {
        if (player == humanPlayer) {
          humanWinMoves.push({rowIndex: i, colIndex: (GRID_LENGTH - (i+1)) });
        } else {
          computerWinMoves.push({rowIndex: i, colIndex: (GRID_LENGTH - (i+1)) });
        }
      }
    }
  }

  return false;
}