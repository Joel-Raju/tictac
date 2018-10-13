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

const playerType = 1;
const computerType = 2;

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
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");

    let winner = isGameWonAlready(); 

    if (winner == playerType || winner == computerType) {
      showWinner(winner);
      return;
    } else if (isGameEnded()) {
      showGameEnded();
      return;
    }

    if (grid[colIdx][rowIdx] == 0) {
      let newValue = 1;
      grid[colIdx][rowIdx] = newValue;
      renderMainGrid();
      addClickHandlers();
      playNextComputerMove();
    }
}


resetGame();


function showWinner(type) {
  let winnerElement = document.getElementById('winner');
  document.getElementById('computer-thinking').innerText = '';
  if (type == playerType) {
    winnerElement.innerText = 'The humans won...';
  } else {
    winnerElement.innerText = 'The bots won...';
  }
}

function playNextComputerMove() {
  let winner = isGameWonAlready(); 
  if (winner == playerType || winner == computerType) {
    showWinner(winner);
    return;
  } else if (isGameEnded()) {
    showGameEnded();
    return;
  }

  showComputerThinking();
  let currentConfig = grid[0].toString() +',' + grid[1].toString() + ',' + grid[2].toString();
  currentConfig = currentConfig.split(',');
  let testConfig = currentConfig;
  let movesToMake = [];
  for (let i = 0; i < 9; i++) {
    if (testConfig[i] == 0) {
      testConfig[i] = 2;
      if (!hasWon(playerType, testConfig)) {
        movesToMake.push(i);
      }
    }
  }

  let randomIndex = getRandomNumber(0, movesToMake.length);
  let moveToMake = movesToMake[randomIndex];

  if (moveToMake >= 0) {
    let rowIndex = parseInt(moveToMake /3);
    let columnIndex = parseInt(moveToMake % 3);
    grid[rowIndex][columnIndex] = computerType;
    renderMainGrid();
    addClickHandlers();
  }
}

function showComputerThinking() {
  let thinkingElement = document.getElementById('computer-thinking');
  thinkingElement.innerText = 'The bot is thinking ...';
  var randomTime = getRandomNumber(0, 700);
  setTimeout(() => {
    thinkingElement.innerText = 'Humans turn';  
  }, randomTime);
  
}


function getRandomNumber(lowerLimit, upperLimit) {
  return Math.floor(Math.random() * upperLimit) + lowerLimit;
}

function isGameWonAlready() {
  let currentConfig = grid[0].toString() +',' + grid[1].toString() + ',' + grid[2].toString();
  currentConfig = currentConfig.split(',');
  if (hasWon(playerType, currentConfig)) {
    return playerType;
  } else if (hasWon(computerType, currentConfig)) {
    return computerType;
  } else {
    return 0;
  }
}


function resetGame() {
  grid = [];
  initializeGrid();
  renderMainGrid();
  addClickHandlers();
  document.getElementById('winner').innerText = '';
  document.getElementById('computer-thinking').innerText = '';
  document.getElementById('game-end').innerText = '';
}


function isGameEnded() {
  let currentConfig = grid[0].toString() +',' + grid[1].toString() + ',' + grid[2].toString();
  currentConfig = currentConfig.split(',');
  var isEnded = true;
  for (let i=0; i<9; i++) {
    if (currentConfig[i] != playerType && currentConfig[i] != computerType) {
      isEnded = false;
    }
  }
  return isEnded;
}

function showGameEnded() {
  let gameEndElement = document.getElementById('game-end');
  gameEndElement.innerText = 'Game Ended, please reset';
  document.getElementById('computer-thinking').innerText = '';
}


function hasWon(playerType, config) {
  const winningConfig = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i=0; i<9; i++) {
    if (winningConfig[i]) {
      if (config[winningConfig[i][0]] == playerType && 
        config[winningConfig[i][1]] == playerType && 
        config[winningConfig[i][2]] == playerType) {
        return true;
      } 
    }
  }
  return false;
}
