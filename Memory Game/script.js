let emojis = ['🍿', '🌐', '⚠️', '🐵', '🧁', '🚗', '🖼️', '❤️'];
emojis = emojis.concat(emojis);

function shuffle() {
  for (let i = emojis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
  }
}

let clicked = [];
let matched = [];
let cards = [];
let noOfMoves = 0;

function generateLayout() {
  const container = document.querySelector('.cards');
  container.innerHTML = '';

  cards = [];
  clicked = [];
  matched = [];
  noOfMoves = 0;
  updateMoves();
  // shuffle();
  // shuffle();
  for (let i = 0; i < 4; i++) {
    cards[i] = [];
    for (let j = 0; j < 4; j++) {
      cards[i][j] = emojis[i * 4 + j];
    }
  }

  function createBox(i, j) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', '' + i + j);
    const front = document.createElement('div');
    front.classList.add('card-front');

    const back = document.createElement('div');
    back.classList.add('card-back');

    const emoji = document.createElement('span');
    emoji.classList.add('emoji');
    emoji.innerText = cards[i][j];

    back.appendChild(emoji);

    card.appendChild(front);
    card.appendChild(back);

    container.appendChild(card);
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      createBox(i, j);
    }
  }
}

generateLayout();
listenForEvents();

function listenForEvents() {
  const cardsList = document.querySelectorAll('.card');
  cardsList.forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (!e.currentTarget.classList.contains('flipped')) {
        clicked.push(e.currentTarget.getAttribute('data-id'));
        if (clicked.length === 2) {
          noOfMoves++;
          updateMoves();
          checkForMatch();
        }
        e.currentTarget.classList.toggle('flipped');
      }
    });
  });
}

function updateMoves() {
  const moves = document.querySelector('.moves');
  moves.innerText = `No of moves = ${noOfMoves}`;
}
function checkForMatch() {
  // first card
  const [i, j] = clicked[0]
    .toString()
    .split('')
    .map((e) => Number(e));

  // second card
  const [x, y] = clicked[1]
    .toString()
    .split('')
    .map((e) => Number(e));

  if (cards[i][j] === cards[x][y]) {
    //if matched
    const box1 = document.querySelector(
      `div[data-id="${clicked[0]}"] > .card-back`
    );
    const box2 = document.querySelector(
      `div[data-id="${clicked[1]}"] > .card-back`
    );

    box1.classList.add('shake');
    box2.classList.add('shake');

    setTimeout(() => {
      box1.classList.add('transparent-bg');
      box2.classList.add('transparent-bg');
    }, 1000);

    matched.push(cards[i][j]);

    if (matched.length === emojis.length / 2) {
      setTimeout(() => {
        alert('Game over');
      }, 500);
    }
  } else {
    setTimeout(
      (clicked) => {
        const box1 = document.querySelector(`div[data-id="${clicked[0]}"]`);
        box1.classList.toggle('flipped');
        const box2 = document.querySelector(`div[data-id="${clicked[1]}"]`);
        box2.classList.toggle('flipped');
      },
      500,
      [...clicked]
    );
  }
  clicked = [];
}

const resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', () => {
  generateLayout();
  listenForEvents();
});
