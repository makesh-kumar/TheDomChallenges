const designBoard = () => {
  const container = document.querySelector('.container');
  for (let i = 0; i < TOTAL_NO_OF_CHANCES; i++) {
    const wordDiv = document.createElement('div');
    wordDiv.setAttribute('id', 'word-' + (i + 1));
    for (let j = 0; j < TOTAL_NO_OF_LETTER; j++) {
      const inpEle = document.createElement('input');
      inpEle.setAttribute('type', 'text');
      inpEle.setAttribute('tabindex', '-1');
      inpEle.setAttribute('maxlength', '1');
      inpEle.setAttribute('id', 'char-' + (j + 1));
      inpEle.classList.add('inp-box');
      inpEle.classList.add('outfit-font');
      inpEle.setAttribute('pattern', '[a-zA-Z]+');
      wordDiv.appendChild(inpEle);
    }
    container.appendChild(wordDiv);
  }
};

const setDefaultFocus = () => {
  // bydefault focus on first word and it's first lettr
  document.querySelector('#word-1').classList.remove('pointer-events-none');
  document
    .querySelector('#word-1')
    .querySelector('#char-1')
    .classList.remove('pointer-events-none');
  document.querySelector('#word-1').querySelector('#char-1').focus();
};

const listenForEvents = () => {
  document.querySelectorAll('input').forEach((ele) => {
    ele.classList.add('pointer-events-none');

    ele.parentElement.classList.add('pointer-events-none');
    //to handle input
    ele.addEventListener('input', (event) => {
      const typedChar = event.target.value;

      if (!typedChar?.trim() || !/[a-zA-Z]/.test(typedChar)) {
        // empty space and non-alphabet check
        event.target.value = '';

        return;
      }
      event.target.value = typedChar.toUpperCase(); // always transform it to uppercase

      const parentEle = event.target.parentElement;
      const char = event.target.getAttribute('id').split('-')[1];

      if (char !== TOTAL_NO_OF_LETTER) {
        // if not last letter, move the foucus the next letter
        parentEle
          .querySelector('#char-' + (+char + 1))
          .classList.remove('pointer-events-none');
        parentEle.querySelector('#char-' + (+char + 1)).focus();
      }

      if (typedChar) {
        event.target.classList.add('input-white-border');
      }
    });

    //to handle backspace
    ele.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace') {
        const parentEle = event.target.parentElement;
        const word = parentEle.getAttribute('id').split('-')[1];
        const char = event.target.getAttribute('id').split('-')[1];

        if (char !== '1') {
          const inpEle = parentEle.querySelector('#char-' + (+char - 1));
          inpEle.value = '';
          const event = new Event('input', { bubbles: true });
          inpEle.dispatchEvent(event);
          setTimeout(() => {
            parentEle.querySelector('#char-' + (+char - 1)).focus();
          });
        }
      }
    });

    //to handle enter
    ele.addEventListener('keydown', (event) => {
      const typedChar = event.target.value;

      if (event.key === 'Enter' && typedChar) {
        const parentEle = event.target.parentElement;
        const word = parentEle.getAttribute('id').split('-')[1];
        const char = event.target.getAttribute('id').split('-')[1];

        if (char === TOTAL_NO_OF_LETTER) {
          event.target.blur();
          parentEle.classList.add('pointer-events-none'); //once all 5 letters entered, make that word readonly
          const lettersOfCurrentWord = [];

          parentEle.querySelectorAll('input').forEach((inpEle) => {
            lettersOfCurrentWord.push(inpEle.value);
            inpEle.value = '';
          });

          parentEle.querySelectorAll('input').forEach((inpEle, index) => {
            setTimeout(() => {
              const currentLetter = lettersOfCurrentWord[index];
              inpEle.value = currentLetter;
              if (TARGET_WORD.includes(currentLetter)) {
                inpEle.classList.add('inp-box-bg-yellow');
              }

              if (TARGET_WORD.at(index) === currentLetter) {
                inpEle.classList.add('inp-box-bg-green');
              }

              setTimeout(() => {
                if (index === Number(TOTAL_NO_OF_LETTER) - 1) {
                  // to check the winning during last character
                  if (TARGET_WORD === lettersOfCurrentWord.join('')) {
                    // won
                    setTimeout(() => {
                      alert('Great 😎 !');
                    }, 100);
                  } else {
                    //  not won
                    if (word !== TOTAL_NO_OF_CHANCES) {
                      // not last word
                      document
                        .querySelector('#word-' + (+word + 1))
                        .classList.remove('pointer-events-none');
                      document
                        .querySelector('#word-' + (+word + 1))
                        .querySelector('#char-1')
                        .classList.remove('pointer-events-none');

                      document
                        .querySelector('#word-' + (+word + 1))
                        .querySelector('#char-1')
                        .focus(); // auto focus the next word fist char
                    } else {
                      //not won and last word
                      setTimeout(() => {
                        alert(TARGET_WORD);
                      }, 100);
                    }
                  }
                }
              });
            }, index * 300);
          });
        }
      }
    });
  });
};

const updateTargetWord = () => {
  TARGET_WORD =
    WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)] ?? 'TENOR';
  TARGET_WORD = TARGET_WORD.toUpperCase();
  console.log('TARGET_WORD : ', TARGET_WORD);
};

WORD_LIST = [];
TARGET_WORD = '';
TOTAL_NO_OF_LETTER = '5';
TOTAL_NO_OF_CHANCES = '6';

async function init() {
  const response = await fetch('words.json');
  const data = await response.json();

  WORD_LIST = [...data.fiveLetterWords];
  updateTargetWord();
  designBoard();
  listenForEvents();
  setDefaultFocus();
}

init();
