const board = document.querySelector('.board');
const selectors = document.querySelector('.selectors');
const resetBtn = document.querySelector('.reset');
const winner = document.querySelector('.winner');
resetBtn.addEventListener('click', () => {
  this.createBoard();
});

CURRENT_COLOR = 'red';
isGameOver = false;
let arr = [];

function createBoard() {
  resetBtn.classList.add('d-none');
  winner.classList.add('d-none');
  selectors.classList.remove('d-none');
  isGameOver = false;
  arr = [];
  for (let i = 0; i < 6; i++) {
    arr.push(Array(7).fill(null));
  }
  board.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const id = '' + i + j;
      const box = document.createElement('div');
      box.classList.add('box');
      box.setAttribute('id', 'box-' + id);
      board.appendChild(box);
    }
  }
}
createBoard();

selectors.addEventListener('click', (e) => {
  if (isGameOver) return;
  if (Number(e.target.id)) {
    const index = e.target.id - 1;
    fillColor(index);
    if (checkForWinner()) {
      isGameOver = true;
      selectors.classList.add('d-none');
      resetBtn.classList.remove('d-none');
      winner.classList.remove('d-none');
      document.querySelector('.winner-box').style.background = CURRENT_COLOR;
    } else {
      CURRENT_COLOR = CURRENT_COLOR === 'red' ? 'yellow' : 'red';
      changeColor(CURRENT_COLOR);
    }
  }
});

function checkForWinner() {
  return (
    checkHorizontalWinner() ||
    checkVerticalWinner() ||
    checkDiagonalWinner() ||
    checkAntiDiagonalWinner()
  );
}

function checkHorizontalWinner() {
  let colorToCheck = '';
  isMatchFound = false;
  for (let i = 5; i >= 0; i--) {
    if (arr[i][3]) {
      colorToCheck = arr[i][3];
      for (let j = 0; j < 4; j++) {
        if (arr[i][j]) {
          let b1 = arr[i][j];
          let b2 = arr[i][j + 1];
          let b3 = arr[i][j + 2];
          let b4 = arr[i][j + 3];
          if (
            b1 == colorToCheck &&
            b2 == colorToCheck &&
            b3 == colorToCheck &&
            b4 == colorToCheck
          ) {
            isMatchFound = true;
            break;
          }
        }
      }
      if (isMatchFound) {
        break;
      }
    }
  }
  return isMatchFound;
}

function checkVerticalWinner() {
  let colorToCheck = '';
  isMatchFound = false;
  for (let i = 0; i < 7; i++) {
    if (arr[2][i]) {
      colorToCheck = arr[2][i];
      for (let j = 5; j >= 3; j--) {
        if (arr[j][i]) {
          let b1 = arr[j][i];
          let b2 = arr[j - 1][i];
          let b3 = arr[j - 2][i];
          let b4 = arr[j - 3][i];
          if (
            b1 == colorToCheck &&
            b2 == colorToCheck &&
            b3 == colorToCheck &&
            b4 == colorToCheck
          ) {
            isMatchFound = true;
            break;
          }
        }
      }
      if (isMatchFound) {
        break;
      }
    }
  }
  return isMatchFound;
}

function checkDiagonalWinner() {
  isMatchFound = false;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 7; j++) {
      let x = i * 10 + j;
      if ((+x + 33) % 10 <= 6) {
        if (arr[i][j]) {
          let colorToCheck = arr[i][j];
          let b1 = arr[i][j];
          let b2 = arr[i + 1][j + 1];
          let b3 = arr[i + 2][j + 2];
          let b4 = arr[i + 3][j + 3];
          if (
            b1 == colorToCheck &&
            b2 == colorToCheck &&
            b3 == colorToCheck &&
            b4 == colorToCheck
          ) {
            isMatchFound = true;
            break;
          }
        }
      }
    }
    if (isMatchFound) {
      break;
    }
  }
  return isMatchFound;
}

function checkAntiDiagonalWinner() {
  isMatchFound = false;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 7; j++) {
      let x = i * 10 + j;
      if ((+x + 27) % 10 <= 6) {
        if (arr[i][j]) {
          let colorToCheck = arr[i][j];
          let b1 = arr[i][j];
          let b2 = arr[i + 1][j - 1];
          let b3 = arr[i + 2][j - 2];
          let b4 = arr[i + 3][j - 3];
          if (
            b1 == colorToCheck &&
            b2 == colorToCheck &&
            b3 == colorToCheck &&
            b4 == colorToCheck
          ) {
            isMatchFound = true;
            break;
          }
        }
      }
    }
    if (isMatchFound) {
      break;
    }
  }
  return isMatchFound;
}

function fillColor(index) {
  for (let i = 5; i >= 0; i--) {
    if (!arr[i][index]) {
      arr[i][index] = CURRENT_COLOR;
      let id = '#box-' + i + index;
      const box = document.querySelector(id);
      box.style.background = CURRENT_COLOR;
      break;
    }
  }
}

function changeColor(color) {
  const root = document.querySelector(':root');
  root.style.setProperty('--boxColor', color);
}
