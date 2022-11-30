// import { Swiper } from "./swiper.js";

//初始
let data;

const userBooks = [];

// 使用者有的書籍
function usersInit() {
  axios
    .get("https://json-server-vercel-gamma.vercel.app/users/")
    .then(function (res) {
      // 1.取得 data 使用者購買的書籍
      userHistoryOrders = res.data[0].historyOrders;
      // 2.把清單裡的 ISBN 取出並且跑 forEach 
      userHistoryOrders.forEach(item => {
        // 3. 再 axios 一次，取出書籍資料為 使用者購物書籍的 ISBN
        axios.get(`https://json-server-vercel-gamma.vercel.app/books?ISBN=${item.ISBN}`).then(res => {
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
usersInit()

// user search
const js_NavInputGroup = document.querySelector('.js-navInputGroup');
const js_NavInput = document.querySelector('.js-navInput');
const js_NavInputBtn = document.querySelector('.js-navInputBtn');

// input 值 改變 就更改裡面的網址
js_NavInput.addEventListener('change', () => {
  //console.log(e.target.value);
  // console.log(e);
  // console.log(e.target.value);
  console.log(js_NavInput.value);
  // 對應的路由
  js_NavInputBtn.href = `./news.html?name_like=${js_NavInput.value}`;
  let name_like = js_NavInput.value

  console.log(name_like);

  const apiUrlFilter = {
    name: name_like ? `&name_like=${js_NavInput.value}` : "",
  }
  //console.log(apiUrlFilter.name);

  axios.get(`https://json-server-vercel-gamma.vercel.app/books?${apiUrlFilter.name}`).then(res => {

    // 直接把取到值渲染出來 就可以了
    js_SearchBook.innerHTML = stringInputData(res.data);
    // console.log(searchFilter);
    js_SearchType.innerHTML = `< p class="js-searchType text-lg ml-6 py-6 text-brown font-bold" > 您想看的可能是..</ > `
    //重新渲染VanillaTilt.init 上面的圖片
    VanillaTilt.init(document.querySelectorAll(".your-element"));
  })
})

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

