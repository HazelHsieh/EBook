//import Swiper from "../js/swiper.js";
import api from '../js/http.js';

//初始
let data;

const userBooks = [];

const userInfo = JSON.parse(localStorage.getItem('eBook'));

const js_UserAvatar = document.querySelector('.js-userAvatar');

// token 不對就跳轉到首頁
if (!userInfo) {
  Swal.fire({
    confirmButtonColor: '#8CA187',
    icon: 'info',
    title: '( ˘•ω•˘ )',
    text: '註冊個會員吧',
    confirmButtonText: '<a href="./signIn.html">GO!</a>'
  });
} else {
  js_UserAvatar.innerHTML = `<div class="js-userAvatar w-10 rounded-full">
    <img src="${userInfo.user.avatarUrl}" />
  </div>`
  signOutEven();
  usersInit()
}

//console.log(userInfo.user.role);
if (userInfo.user.role === "admin") {
  const js_BackendView = document.querySelector(".js-backendView");
  js_BackendView.classList.remove('hidden');
  js_BackendView.innerHTML = `<a href="../backendView/dashboard.html">後台管理</a> `
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
      // 1.取得 data 使用者購買的書籍
      let userHistoryOrders = res.data[userId].historyOrders;

      // 2.把清單裡的 ISBN 取出並且跑 forEach 
      userHistoryOrders.forEach(item => {
        // 3. 再 axios 一次，取出書籍資料為 使用者購物書籍的 ISBN
        axios.get(`${api.url}books?ISBN=${item.ISBN}`).then(res => {
          // 4. 取到的資料丟到上面的 userBooks 陣列裡
          userBooks.push(...res.data)
          // 5. 對應 HTML 的標籤
          const js_UserBooks = document.querySelector('.js-userBooks');
          // 6. 組字串
          stringData(userBooks)
          // 7. 寫進 HTML
          js_UserBooks.innerHTML = stringData(userBooks);

          //渲染swiper 上面的圖片
          renderSwiper()
        })

      })
    })
}


// 把我的帳號改成登出功能 登出時也將localStorage刪除
function signOutEven() {
  const js_SignOutBtn = document.querySelector(".js-signoutBtn");
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
const js_NavInput = document.querySelector('.js-navInput');
const js_NavInputBtn = document.querySelector('.js-navInputBtn');

// input 值 改變 就更改裡面的網址
js_NavInput.addEventListener('change', () => {
  // 對應的路由
  js_NavInputBtn.href = `./news.html?name_like=${js_NavInput.value}`;
  let name_like = js_NavInput.value
  const apiUrlFilter = {
    name: name_like ? `&name_like=${js_NavInput.value}` : "",
  }

  axios.get(`${api.url}books?${apiUrlFilter.name}`).then(res => {

    // 直接把取到值渲染出來 就可以了
    js_SearchBook.innerHTML = stringInputData(res.data);
    // console.log(searchFilter);
    js_SearchType.innerHTML = `< p class="js-searchType text-lg ml-6 py-6 text-brown font-bold" > 您想看的可能是..</ > `
    //重新渲染VanillaTilt.init 上面的圖片
    VanillaTilt.init(document.querySelectorAll(".your-element"));
  })
})

//

// 組字字串的函示
const stringData = (data) => {
  let str = ""
  data.forEach(function (item, i) {
    str += `<div class="swiper-slide">
    <a href="../frontendView/products.html?id=${item.id}"
    class="card w-[280px] h-[280px] rounded-sm  hover:scale-125 transition-all">
    <img class="" src=${item.imgUrl} alt="book1" />
    </a>
    </div>`
  })
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

