function initCarousel() {
  // ваш код...
  const listRef = document.querySelector('.carousel__inner');
  const listElemsRef = document.querySelectorAll('.carousel__slide');
  const width = listRef.offsetWidth;

  const rightBtn = document.querySelector('.carousel__arrow_right');
  const leftBtn = document.querySelector('.carousel__arrow_left');
  
  let count = 1; 
  let sliderCount = 0;
  let position = 0;

  leftBtn.style.display = 'none';
  
  leftBtn.addEventListener('click', () => {
    position += width * count;
    position = Math.min(position, 0);
    listRef.style.transform = `translateX(${position}px`;
    --sliderCount;
    if (sliderCount === 0) {leftBtn.style.display = 'none';}
    rightBtn.style.display = '';
  });

  rightBtn.addEventListener('click', () => {
    ++sliderCount;
    position -= width * count;
    position = Math.max(position, -width * (listElemsRef.length - count));
    listRef.style.transform = `translateX(${position}px`;
    leftBtn.style.display = '';
    if (sliderCount === 3) {
      rightBtn.style.display = 'none';} else {rightBtn.style.display = '';}
  });
}
