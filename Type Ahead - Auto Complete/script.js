import { suggestionsList } from './suggestions.js';
const maxSuggestions = 5;
let noOfSuggestionsRendered = 0;
let highlightIndex = -1;

const debounce = (fn, delay) => {
  let timer;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(context, ...args);
    }, delay);
  };
};

const handleInput = (e) => {
  suggestionEle.innerHTML = '';
  if (e.target.value) {
    let suggestions = getSuggestions(
      e.target.value.toLowerCase(),
      maxSuggestions
    );
    console.log(suggestions);

    suggestions = modifySuggestions(suggestions, e.target.value.toLowerCase());

    renderSuggestions(suggestions);
  }
};

const modifySuggestions = (suggestions, txt) => {
  return suggestions.map((s) => {
    let regex = new RegExp(`(${txt})`, 'gi');

    s = s.replace(regex, '<b>$1</b>');
    console.log('REP - ', s);
    return s;
  });
};

const renderSuggestions = (suggestions) => {
  noOfSuggestionsRendered = suggestions.length;
  highlightIndex = -1;
  const ul = document.createElement('ul');
  for (let i = 0; i < suggestions.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = suggestions[i]; //
    ul.appendChild(li);
  }
  suggestionEle.appendChild(ul);
};

const getSuggestions = (input, max) => {
  const startSuggestion = suggestionsList.filter((suggestion) =>
    suggestion.toLowerCase().startsWith(input)
  );
  const includeSuggestion = suggestionsList.filter((suggestion) =>
    suggestion.toLowerCase().includes(input)
  );
  const suggestions = new Set([...startSuggestion, ...includeSuggestion]);
  return Array.from(suggestions).splice(0, max);
};

const searchText = document.querySelector('#search-text');
searchText.addEventListener('input', debounce(handleInput, 1000));

const suggestionEle = document.querySelector('.suggestions');

document.addEventListener('keydown', (e) => {
  console.log(e.key);
  if (e.key === 'ArrowDown') {
    onDownArrowPress();
  } else if (e.key === 'ArrowUp') {
    onUpArrowPress();
  } else if (e.key === 'Enter') {
    if (suggestionEle.children.length && highlightIndex >= 0) {
      const ul = suggestionEle.querySelector('ul');
      let ele = Array.from(ul.children)[highlightIndex];
      onOptionSelect(ele);
    }
  }
});

const onDownArrowPress = () => {
  if (suggestionEle.children.length) {
    highlightIndex++;
    if (highlightIndex > noOfSuggestionsRendered - 1) {
      highlightIndex = 0;
    }
    const ul = suggestionEle.querySelector('ul');
    let ele = Array.from(ul.children)[highlightIndex];
    highlight(ele);

    console.log('DOWN = ', ele.textContent);
  }
};

const onUpArrowPress = () => {
  if (suggestionEle.children.length) {
    const ul = suggestionEle.querySelector('ul');
    highlightIndex--;
    if (highlightIndex < 0) {
      highlightIndex = noOfSuggestionsRendered - 1;
    }
    let ele = Array.from(ul.children)[highlightIndex];
    console.log('UP = ', ele.textContent);
    highlight(ele);
  }
};

const highlight = (ele) => {
  unHighlightOthers(ele);
  ele.style.backgroundColor = 'grey';
};

const unHighlightOthers = (except) => {
  const ul = suggestionEle.querySelector('ul');
  Array.from(ul.children).forEach((ele) => {
    if (ele !== except) {
      ele.style.backgroundColor = 'beige';
    }
  });
};

const onOptionSelect = (ele) => {
  console.log('Selected -> ', ele.textContent);
  searchText.value = ele.textContent;
  suggestionEle.innerHTML = '';
};

suggestionEle.addEventListener('click', (e) => {
  if (e.target.nodeName === 'LI') {
    onOptionSelect(e.target);
  }
});
