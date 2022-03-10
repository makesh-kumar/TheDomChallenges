const board = document.querySelector(".board");
let noOfDiagnols = 4;

let x;
let y;
function generateBoxes(num) {
  let color = getRandomColors();
  let noOfDiagnols = num;
  for (let rowNum = 1; rowNum <= noOfDiagnols; rowNum++) {
    const row = document.createElement("div");
    row.setAttribute("id", `row_${rowNum}`);
    for (let colNum = 1; colNum <= noOfDiagnols; colNum++) {
      const box = document.createElement("span");
      box.style.display = "inline-block";
      box.style.height = "50px";
      box.style.width = "50px";
      box.style.border = "1px solid black";
      box.style.margin = "5px";
      box.setAttribute("id", `${rowNum}${colNum}`);
      box.style.backgroundColor = color.color;
      row.appendChild(box);
    }
    board.appendChild(row);
  }

  x = getRndInteger(1, noOfDiagnols + 1);
  y = getRndInteger(1, noOfDiagnols + 1);
  const ele = document.getElementById(`${x}${y}`);
  ele.style.backgroundColor = color.oddColor;
}

generateBoxes(noOfDiagnols);

board.addEventListener("click", (e) => {
  if (+e.target.id) {
    let indArr = e.target.id.toString().split("");
    if (+indArr[0] === x && +indArr[1] === y) {
      board.innerHTML = "";
      generateBoxes(++noOfDiagnols);
    } else {
      board.classList.add("shake");
      setTimeout(() => {
        board.classList.remove("shake");
        board.innerHTML = "";
        generateBoxes((noOfDiagnols = 4));
      }, 1000);
    }
  }
});

function getRandomColors() {
  let ratio = 0.618033988749895;

  let hue = (Math.random() + ratio) % 1;
  let saturation = Math.round(Math.random() * 100) % 85;
  let lightness = Math.round(Math.random() * 100) % 85;

  let color =
    "hsl(" + Math.round(360 * hue) + "," + saturation + "%," + lightness + "%)";
  let oddColor =
    "hsl(" +
    Math.round(360 * hue) +
    "," +
    saturation +
    "%," +
    (lightness + 5) +
    "%)";

  return {
    color,
    oddColor,
  };
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
