//初始
let data;
const eBook = {
  //最新熱門
  newPublishDate: [],
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

const userBooks = [];

// 初始書籍資料
function init() {
  axios
    .get("http://localhost:3000/books/")
    .then(function (res) {
      data = res.data;

      // 新書本的陣列，用時間排序
      let booksArray = data;
      booksArray.sort((a, b) => {
        return b.publishDate > a.publishDate ? 1 : -1
      })

      // 最新熱門 全部的書本出版日期去排序，取從第三筆開始的九筆資料
      eBook.newPublishDate.push(...booksArray.slice(3, 12));

      // console.log(eBook.newPublishDate);
      //                    ...解構賦值，如果不加會多一層 arr   為什麼要加!== -1，因為 indexOf 拿到反向的值
      eBook.literature.push(...data.filter(item => item.tag.indexOf('中文文學') !== -1));
      eBook.inspiration.push(...data.filter(item => item.tag.indexOf('心理勵志') !== -1));
      eBook.IT.push(...data.filter(item => item.tag.indexOf('電腦資訊') !== -1));
      eBook.travel.push(...data.filter(item => item.tag.indexOf('旅遊') !== -1));
      eBook.cooking.push(...data.filter(item => item.tag.indexOf('居家料理') !== -1));
      eBook.design.push(...data.filter(item => item.tag.indexOf('藝術設計') !== -1));


      // swiper class 綁定
      const js_NewPublishDate = document.querySelector('.js-newPublishDate');
      const js_Literature = document.querySelector('.js-literature');
      const js_Inspiration = document.querySelector('.js-inspiration');
      const js_IT = document.querySelector('.js-IT');
      const js_Travel = document.querySelector('.js-travel');
      const js_Cooking = document.querySelector('.js-cooking');
      const js_Design = document.querySelector('.js-design');
      //const js_UserBooks = document.querySelector('.js-userBooks');
      //console.log(swiper_Wrapper);



      newPublishStringData(eBook.newPublishDate);
      stringData(eBook.literature);
      stringData(eBook.inspiration);
      stringData(eBook.IT);
      stringData(eBook.travel);
      stringData(eBook.cooking);
      stringData(eBook.design);
      //stringData(eBook.userBooks);
      js_NewPublishDate.innerHTML = newPublishStringData(eBook.newPublishDate);
      js_Literature.innerHTML = stringData(eBook.literature);
      js_Inspiration.innerHTML = stringData(eBook.inspiration);
      js_IT.innerHTML = stringData(eBook.IT);
      js_Travel.innerHTML = stringData(eBook.travel);
      js_Cooking.innerHTML = stringData(eBook.cooking);
      js_Design.innerHTML = stringData(eBook.design);

      //渲染swiper 上面的圖片
      renderSwiper()
    })

}
init();

function usersInit() {
  axios
    .get("http://localhost:3000/users/")
    .then(function (res) {
      userHistoryOrders = res.data[0].historyOrders;
      // console.log(userHistoryOrders);
      userHistoryOrders.forEach(item => {
        // console.log(item.ISBN);
        axios.get(`http://localhost:3000/books?ISBN=${item.ISBN}`).then(res => {
          userBooks.push(...res.data)
          // swiper class 綁定
          const js_UserBooks = document.querySelector('.js-userBooks');
          // console.log(js_UserBooks);
          stringData(userBooks)

          // console.log(userBooks);

          js_UserBooks.innerHTML = stringData(userBooks);

          //渲染swiper 上面的圖片
          renderSwiper()
        })
      })
    })
}
usersInit();


// 最新書單組字串
const newPublishStringData = (data) => {
  let str = ""
  data.forEach(function (item, i) {
    str += `<div class="swiper-slide">
    <div class="w-[80px] h-[220px] overflow-hidden flex items-end">
      <p class="text-9xl"><i class="fa-solid fa-${i + 1}"></i></p>
    </div>
    <a href="./frontendView/products.html?id=${item.id}"
    class="card w-[200px] h-[220px] rounded-sm  hover:scale-125 transition-all">
    <img class="" src=${item.imgUrl} alt="book1" />
    </a>
    </div>`
  })
  // console.log(str);
  return str;
}

// Swiper組字字串的函式
// 組字字串的函示
const stringData = (data) => {
  let str = ""
  data.forEach(function (item, i) {
    str += `<div class="swiper-slide">
    <a href="./frontendView/products.html?id=${item.id}"
    class="card w-[280px] h-[280px] rounded-sm  hover:scale-125 transition-all">
    <img class="" src=${item.imgUrl} alt="book1" />
    </a>
    </div>`
  })
  // console.log(str);
  return str;
}

// Swiper
function renderSwiper() {
  const swiper = new Swiper(".jsMySwiper", {
    freeMode: true,//可以不一次只滑一個
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
}



