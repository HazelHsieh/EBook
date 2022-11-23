//初始
let data;
const eBook = {
  //最新熱門
  nesPublishDate: [],
  //中文文學
  literature: [],
  //心理勵志
  inspiration: [],
  //電腦資訊
  IT: [],
  //世界旅遊
  travel: [],
  //居家料理
  cooking: [],
  //藝術設計
  design: []
}


function init() {
  axios
    .get("http://localhost:3000/books/")
    .then(function (res) {
      // data = res.data;
      // data.forEach(function (res, i) {
      //   console.log(i, res)
      // })
      data = res.data;
      //eBook.nesPublishDate.push(data.filter(item => item.publishDate.indexOf('最新熱門') !== -1));

      //                    ...解構賦值，如果不加會多一層 arr   為什麼要加!== -1，因為 indexOf 拿到反向的值
      eBook.literature.push(...data.filter(item => item.tag.indexOf('中文文學') !== -1));
      eBook.inspiration.push(...data.filter(item => item.tag.indexOf('心理勵志') !== -1));
      eBook.IT.push(...data.filter(item => item.tag.indexOf('電腦資訊') !== -1));
      eBook.travel.push(...data.filter(item => item.tag.indexOf('世界旅遊') !== -1));
      eBook.cooking.push(...data.filter(item => item.tag.indexOf('居家料理') !== -1));
      eBook.design.push(...data.filter(item => item.tag.indexOf('藝術設計') !== -1));

      //console.log(eBook.literature['imgUrl']);
      console.log(eBook.literature[0]['imgUrl']);


      // swiper class 綁定
      const js_Literature = document.querySelector('.js-literature');
      const js_Inspiration = document.querySelector('.js-inspiration');
      const js_IT = document.querySelector('.js-IT');
      //console.log(swiper_Wrapper);

      const stringData = (data) => {
        let str = ""
        data.forEach(function (item, i) {
          str += `<div class="swiper-slide">
          <a href="./frontendView/products.html"
          class="card w-[280px] h-[280px] rounded-sm  hover:scale-125 transition-all">
          <img class="" src=${item.imgUrl} alt="book1" />
          </a>
          </div>`
        })
        // console.log(str);
        return str;
      }
      stringData(eBook.literature);
      stringData(eBook.inspiration);
      stringData(eBook.IT);
      js_Literature.innerHTML = stringData(eBook.literature);
      js_Inspiration.innerHTML = stringData(eBook.inspiration);
      js_IT.innerHTML = stringData(eBook.IT);

    })

}
init();

// eBook.literature.forEach(item => {
//   console.log(item)
// })

// const stringData = (data) => {
//   let str = ""
//   data.forEach(item => {
//     str += `
//           <div class="swiper-slide text-center">
//             <a href="./frontendView/products.html"
//               class="card w-[280px] h-[280px] rounded-sm  hover:scale-125 transition-all">
//               <img class="" src="./imgs/temp/book1.webp" alt="book1" />
//             </a>
//           </div>`
//   })
//   return str;
// }





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
