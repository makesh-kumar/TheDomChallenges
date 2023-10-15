const inputs = [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam veniam repellendus consequatur aliquam dolore accusamus deserunt perspiciatis quidem aspernatur, voluptatibus, exercitationem ratione deleniti id ab impedit eum dolorum saepe. Doloribus, dolor aspernatur sequi magni deleniti delectus rerum eaque temporibus, consequuntur eligendi fugit sint beatae itaque veritatis assumenda esse hic! Nisi atque quis quae odio omnis tempore culpa odit assumenda vero dolorem, a nemo, officiis dolor non dolores reiciendis laborum ducimus possimus obcaecati eum harum? Quas provident sunt quidem officia dicta fugit nostrum, quos sit saepe. Fugit aut placeat hic, maiores earum molestias iure laudantium delectus, repellat amet, vitae aspernatur esse.',
  'A paralegal is a person trained in legal matters who performs tasks requiring knowledge of the law and legal procedures A paralegal is not a lawyer but can be employed by a law office or work freelance at a company or law office Paralegals are not allowed to offer legal services directly to the public on their own and must perform their legal work under an attorney or law firm',
  'Self confidence is a tricky subject for many people its impossible to feel good about themselves without outside validation When you are in a situation where the people in your life are not helping you to feel better about yourself this can become a problem in your day to day life Most insecurity stems from feelings of not being attractive or feelings of loneliness If your insecurity does not necessarily stem from a lack of interaction but more a lack of feeling attractive there are other options that will help you',
];

let timeLimit = 60;
let inp = inputs[Math.floor(Math.random() * 3)];
let noOfLettersTyped = 0;
let seconds = timeLimit;
let timerId = null;
let isTimeOver = false;

const keyboard = document.querySelector('.keyboard');
const timerEle = document.querySelector('.timer');
const resetBtn = document.querySelector('#resetBtn');

function generateKeyboardLayout() {
  const keys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];
  for (const row of keys) {
    const div = document.createElement('div');
    div.classList.add('row');
    for (const key of row) {
      const span = document.createElement('span');
      span.classList.add('key');
      span.setAttribute('data-key', key);
      span.textContent = key;
      div.appendChild(span);
    }
    keyboard.appendChild(div);
  }
  timerEle.textContent = `Time left : ${seconds} Second`;
}

document.addEventListener('keydown', (e) => {
  const key = e.key;
  const attr = `span[data-key="${key.toUpperCase()}"]`;
  const element = document.querySelector(attr);
  if (element) {
    element.click();
  }
});

keyboard.addEventListener('click', (e) => {
  if (e.target.classList.contains('key')) {
    onKeyClick(e.target.innerHTML);
    e.target.classList.add('clicked');
    setTimeout(() => {
      e.target.classList.remove('clicked');
    }, 200);
  }
});

function onKeyClick(key) {
  if (isTimeOver) return;
  if (!timerId) {
    noOfLettersTyped = 0;
    startTimer();
  }
  if (key.toLowerCase().trim() === inp[0].toLowerCase().trim()) {
    noOfLettersTyped++;
    inp = inp.slice(1).trim();
    setInput(inp);
  }
}

function startTimer() {
  timerId = setInterval(() => {
    seconds = seconds - 1;
    timerEle.textContent = `Time left : ${seconds} Second${
      seconds > 1 ? 's' : ''
    }`;
    if (seconds <= 0) {
      isTimeOver = true;
      stopTimer();
      timerEle.textContent = `You have typed ${noOfLettersTyped} letter ${
        noOfLettersTyped > 1 ? 's' : ''
      } in ${timeLimit} seconds`;
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
  seconds = timeLimit;
}

resetBtn.addEventListener('click', () => {
  stopTimer();
  isTimeOver = false;
  noOfLettersTyped = 0;
  timerEle.textContent = `Time left  : ${timeLimit} Seconds`;
  inp = inputs[Math.floor(Math.random() * 3)];
  setInput(inp);
});

function setInput(inp) {
  const first = document.createElement('span');
  first.innerHTML = inp[0];
  first.classList.add('bold');
  const remaining = document.createElement('span');
  remaining.innerHTML = inp.slice(1);
  document.querySelector('.input').innerHTML = '';
  document.querySelector('.input').appendChild(first);
  document.querySelector('.input').appendChild(remaining);
}

setInput(inp);
generateKeyboardLayout();
