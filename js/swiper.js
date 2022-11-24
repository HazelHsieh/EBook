const swiper = new Swiper(".jsMySwiper", {
  freeMode: true,//可以不一次只滑一個
  // slidesPerView: 5,
  // spaceBetween: 10,
  // initialSlide: 1,
  // loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 35,
    },
    1400: {
      slidesPerView: 5,
      spaceBetween: 35,
    },

  },
});

export default {
  swiper
}