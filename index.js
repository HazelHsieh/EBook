import api from './js/http.js';
//初始
let data;

// 首頁推上來的書本陣列
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
// 使用者推上來有的書籍
const userBooks = [];

const userInfo = JSON.parse(localStorage.getItem('eBook'));
let js_SignOutBtn = document.querySelector(".js-signoutBtn");
const js_UserAvatar = document.querySelector('.js-userAvatar');

// token 不對 就顯示我的帳號
if (!userInfo) {
  js_SignOutBtn.innerHTML = `<a href="./frontendView/signIn.html">我的帳號</a>`;
} else if (userInfo) {
  js_UserAvatar.innerHTML = `<div class="js-userAvatar w-10 rounded-full">
    <img src="${userInfo.user.avatarUrl}" />
  </div>`
  usersInit();
  signOutEven();
}

// 初始書籍資料
function init() {
  axios
    .get(`${api.url}books`)
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

// 把我的帳號改成登出功能 登出時也將localStorage刪除
function signOutEven() {
  // const js_BackendView = document.querySelector(".js-backendView");

  // js_BackendView.innerHTML = `<a href="../backendView/dashboard.html">後台管理</a> `
  js_SignOutBtn.innerHTML = `<a href="../index.html"
  class="btn btn-outline btn-sm mt-2 p-0 border-primary  text-primary rounded-sm hover:bg-primary1 hover:border-none hover:text-white">
  登出帳號
  </a>`;
  js_SignOutBtn.addEventListener('click', () => {
    localStorage.clear();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '88 你登出了~',
      showConfirmButton: false,
      timer: 5000
    })
  });

}

// user search
const js_NavInputGroup = document.querySelector('.js-navInputGroup');
const js_NavInput = document.querySelector('.js-navInput');
const js_NavInputBtn = document.querySelector('.js-navInputBtn');

// input 值 改變 就更改裡面的網址
js_NavInput.addEventListener('change', () => {
  //console.log(e.target.value);
  // console.log(e);
  // console.log(e.target.value);
  //console.log(js_NavInput.value);
  // 對應的路由
  js_NavInputBtn.href = `./frontendView/news.html?name_like=${js_NavInput.value}`;
  let name_like = js_NavInput.value

  console.log(name_like);

  const apiUrlFilter = {
    name: name_like ? `&name_like=${js_NavInput.value}` : "",
  }
  //console.log(apiUrlFilter.name);

  axios.get(`${api.url}books?${apiUrlFilter.name}`).then(res => {

    // 直接把取到值渲染出來 就可以了
    js_SearchBook.innerHTML = stringInputData(res.data);
    // console.log(searchFilter);
    js_SearchType.innerHTML = `< p class="js-searchType text-lg ml-6 py-6 text-brown font-bold" > 您想看的可能是..</ > `
    //重新渲染VanillaTilt.init 上面的圖片
    VanillaTilt.init(document.querySelectorAll(".your-element"));
  })
})

// 組字字串的函示
const stringInputData = (data) => {
  let str = ""
  data.forEach(function (item, i) {
    str += `<li class="w-full md:w-1/3 lg:w-1/5 xl:w-1/6">
    <div class="max-w-md mx-auto overflow-hidden">
      <div class="card md:flex ">
        <div data-tilt data-tilt-glare data-tilt-max-glare="0.8" class="your-element md:flex-shrink-0 shadow-xl flex justify-center mx-auto">
          <a href="../frontendView/products.html?id=${item.id}">
            <img class=" w-[300px] object-cover" src="${item.imgUrl}"
              alt="Man looking at item at a store">
              </a>
        </div>
        <div class="h-[80px] mt-2 pt-6 flex items-center justify-center border-t-0 border-stone-300">
          <p class="text-xl card-title truncate mx-1">${item.name}</p>

        </div>
      </div>
    </div>
  </li>`
  })
  // console.log(str);
  return str;
}

// 使用者有的書籍
function usersInit() {
  const userId = userInfo.user.id - 1;
  const js_User = document.querySelector('.js-user');

  js_User.innerHTML = `<p class="text-xl">請繼續閱讀 <span class="text-xl pr-2 " data-aos="fade-up" data-aos-duration="1000"></span>
  </p>`;

  axios
    .get(`${api.url}users/`)
    .then(function (res) {
      let userHistoryOrders = res.data[userId].historyOrders;
      userHistoryOrders.forEach(item => {
        // console.log(item.ISBN);
        axios.get(`${api.url}books?ISBN=${item.ISBN}`).then(res => {
          userBooks.push(...res.data)
          // class 綁定

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

// TOP 排行的組字串
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



