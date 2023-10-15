const drag = (event) => {
  event.dataTransfer.setData('text/plain', event.target.id);
  console.log(event.target.id);
};

const allowDrop = (event) => {
  event.preventDefault();
};

const drop = (event) => {
  event.preventDefault();
  const data = event.dataTransfer.getData('text/plain');
  const target = event.target;

  // Swap the content of the two boxes
  // const temp = target.innerText;
  // target.innerText = document.getElementById(data).innerText;
  // document.getElementById(data).innerText = temp;

  const temp = target.src;
  target.src = document.getElementById(data).src;
  document.getElementById(data).src = temp;
};

Array.from(document.getElementById('boxes').children).forEach((box) => {
  // console.log(box);
  box.addEventListener('dragstart', drag);
  box.addEventListener('dragover', allowDrop);
  box.addEventListener('drop', drop);
});
