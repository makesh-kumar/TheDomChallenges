const range = document.querySelector('.range');
const selectedRange = document.querySelector('#selected-range');

range.addEventListener('input', (e) => {
  const rating = Number(e.target.value);

  selectedRange.innerText = rating;

  const fullRating = Math.floor(rating);
  const halfRating = (rating - fullRating) * 100;

  resetRating();
  setFullRating(fullRating);
  if (fullRating < 5) {
    setPartialRating(fullRating + 1, halfRating);
  }
});

const setFullRating = (num) => {
  for (let i = 1; i <= num; i++) {
    const selector = `[data-index="${i}"]`;
    const star = document.querySelector(selector);
    star.querySelector('.rated-star').style.width = '100%';
  }
};

const resetRating = () => {
  for (let i = 1; i <= 5; i++) {
    const selector = `[data-index="${i}"]`;
    const star = document.querySelector(selector);
    star.querySelector('.rated-star').style.width = '0%';
  }
};

const setPartialRating = (starIndex, rating) => {
  const selector = `[data-index="${starIndex}"]`;
  const star = document.querySelector(selector);
  star.querySelector('.rated-star').style.width = rating + '%';
};

range.value = '2';
range.dispatchEvent(new Event('input'));
