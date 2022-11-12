const swiper = new Swiper(".jsMySwiper", {
  freeMode: true,
  slidesPerView: 1,
  spaceBetween: 10,
  //loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
    1400: {
      slidesPerView: 5,
      spaceBetween: 50,
    },

  },
});
