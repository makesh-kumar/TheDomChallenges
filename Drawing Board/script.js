const board = document.querySelector('#board');
const context = board.getContext('2d');

const colorPicker = document.querySelector('#color-picker');
const toolSize = document.querySelector('#tool-size');
const toolSizeVal = document.querySelector('#tool-size-val');

const clearBtn = document.querySelector('#clear-btn');
const pen = document.querySelector('.tool-pen');
const eraser = document.querySelector('.tool-eraser');

let isMousePressed = false;
let selectedTool = 'Pen';

const updateToolSizeText = () => {
  toolSizeVal.textContent = `${selectedTool} Size : ${toolSize.value}`;
};

updateToolSizeText();

toolSize.addEventListener('input', updateToolSizeText);

pen.addEventListener('click', () => {
  selectedTool = 'Pen';
  board.style.cursor = 'crosshair';
  pen.classList.add('selected-tool');
  eraser.classList.remove('selected-tool');
  updateToolSizeText();
});

eraser.addEventListener('click', () => {
  selectedTool = 'Eraser';
  board.style.cursor = 'not-allowed';
  eraser.classList.add('selected-tool');
  pen.classList.remove('selected-tool');
  updateToolSizeText();
});

board.addEventListener('mousedown', (e) => {
  isMousePressed = true;
  context.beginPath();
  const x = e.clientX - board.getBoundingClientRect().left;
  const y = e.clientY - board.getBoundingClientRect().top;
  context.moveTo(x, y);
});

document.addEventListener('mouseup', (e) => {
  isMousePressed = false;
});

board.addEventListener('mousemove', (e) => {
  if (isMousePressed) {
    if (selectedTool == 'Pen') {
      const x = e.clientX - board.getBoundingClientRect().left;
      const y = e.clientY - board.getBoundingClientRect().top;
      context.lineTo(x, y);
      context.lineWidth = toolSize.value;
      context.strokeStyle = colorPicker.value;
      context.lineCap = 'square';
      context.stroke();
    } else {
      const x = e.clientX - board.getBoundingClientRect().left;
      const y = e.clientY - board.getBoundingClientRect().top;
      context.lineTo(x, y);
      context.lineWidth = toolSize.value;
      context.strokeStyle = 'white';
      context.lineCap = 'square';
      context.stroke();
    }
  }
});

clearBtn.addEventListener('click', () => {
  context.clearRect(0, 0, board.width, board.height);
});
