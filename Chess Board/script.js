const board = document.querySelector(".board");

function createChessBoard() {
  let noOfDiagnols = 8;
  for (let rowNum = 1; rowNum <= noOfDiagnols; rowNum++) {
    const row = document.createElement("div");
    row.setAttribute("id", `row_${rowNum}`);
    for (let colNum = 1; colNum <= noOfDiagnols; colNum++) {
      const box = document.createElement("span");
      box.style.display = "inline-block";
      box.style.height = "80px";
      box.style.width = "80px";
      box.style.border = "1px solid black";
      box.style.margin = "5px";
      box.setAttribute("id", `${rowNum}${colNum}`);
      if (rowNum % 2 !== 0 && colNum % 2 == 0) {
        box.style.backgroundColor = "black";
      } else if (rowNum % 2 == 0 && colNum % 2 !== 0) {
        box.style.backgroundColor = "black";
      }
      row.appendChild(box);
    }
    board.appendChild(row);
  }
}

createChessBoard();

board.addEventListener("click", (e) => {
  if (+e.target.id) {
    board.innerHTML = "";
    createChessBoard();
    changeColor(+e.target.id);
  }
});

function changeColor(boxNo) {
  document.getElementById(boxNo).style.backgroundColor = "red";
  let operations = [-11, -9, 9, 11];
  for (let i = 0; i < operations.length; i++) {
    let selectedBoxNum = boxNo + operations[i];
    while (selectedBoxNum >= 1 && selectedBoxNum <= 88) {
      let selectedBox = document.getElementById(selectedBoxNum);
      if (selectedBox) {
        selectedBox.style.backgroundColor = "red";
        selectedBoxNum = selectedBoxNum + operations[i];
      } else {
        break;
      }
    }
  }
}
