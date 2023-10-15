const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slide = document.querySelectorAll('.slide');
const slides = document.querySelector('.slides');

prevBtn.addEventListener('click', () => {
  let activeIndex = getActiveSlideIndex();
  let nextIndex = activeIndex - 1;
  slides.children[activeIndex].classList.remove('active-slide');

  if (nextIndex < 0) {
    nextIndex = slides.children.length - 1;
  }

  slides.children[nextIndex].classList.add('active-slide');
});

nextBtn.addEventListener('click', () => {
  let activeIndex = getActiveSlideIndex();
  let nextIndex = activeIndex + 1;

  slides.children[activeIndex].classList.remove('active-slide');

  if (nextIndex > slides.children.length - 1) {
    nextIndex = 0;
  }

  slides.children[nextIndex].classList.add('active-slide');
});

const getActiveSlideIndex = () => {
  for (let i = 0; i < slide.length; i++) {
    if (slide[i].classList.contains('active-slide')) {
      return i;
    }
  }
};
