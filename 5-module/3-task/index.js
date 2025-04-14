function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');

  const slideWidth = carouselInner.offsetWidth;

  let currentSlide = 0;
  const totalSlides = 4;

  function updateCarousel() {
    carouselInner.style.transform = `translateX(${-currentSlide * slideWidth}px)`;

    arrowLeft.style.display = currentSlide === 0 ? 'none' : '';
    arrowRight.style.display = currentSlide === totalSlides - 1 ? 'none' : '';
  }

  arrowRight.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateCarousel();
    }
  });

  arrowLeft.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  });

  updateCarousel();
}