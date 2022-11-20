let data = [];
//初始
function init() {

}

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
// 文字編輯器
function CustomizationPlugin(editor) {

}

ClassicEditor
  .create(document.querySelector('#editor'), {
    extraPlugins: [CustomizationPlugin]
  })
  .then(newEditor => {
    window.editor = newEditor;
    // The following line adds CKEditor 5 inspector.
    CKEditorInspector.attach(newEditor, {
      isCollapsed: true
    });
  })
  .catch(error => {
    console.error(error);
  });
