const controls = document.querySelectorAll('.accordion-arrow');
controls.forEach((control) =>
  control.addEventListener('click', (e) => {
    e.stopPropagation();
    control.classList.toggle('arrow-open');
    control
      .closest('.accordion')
      .querySelector('.accordion-body')
      .classList.toggle('accordion-open');
    control
      .closest('.accordion')
      .querySelector('.accordion-header')
      .classList.toggle('accordion-header-open');
  })
);

const headers = document.querySelectorAll('.accordion-header');
headers.forEach((header) => {
  header.addEventListener('click', () => {
    const control = header
      .closest('.accordion')
      .querySelector('.accordion-arrow');
    control.dispatchEvent(new Event('click'));
  });
});
