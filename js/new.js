import api from '../js/http.js';
//初始
let data;
const eBook = {
  //最新熱門
  newPublish: [],
}


// 最新熱門的畫面渲染
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
      // console.log(booksArray);
      // 最新熱門 全部的書本出版日期去排序，取從第三筆開始的九筆資料
      eBook.newPublish.push(...booksArray.slice(3, 22));
      // console.log(eBook.newPublish);
      // class 綁定
      const js_NewPublish = document.querySelector('.js-newPublish');
      stringData(eBook.newPublish);
      js_NewPublish.innerHTML = stringData(eBook.newPublish);
      //重新渲染VanillaTilt.init 上面的圖片
      VanillaTilt.init(document.querySelectorAll(".your-element"));
    })

}
init();


const js_PublishType = document.querySelector('.js-publishType');
const js_NameInput = document.querySelector('#js-nameInput');
const js_TagType = document.querySelector('.js-tagType');
const js_TypeBtn = document.querySelector('.js-typeBtn');
const js_SearchBook = document.querySelector('.js-searchBook');
const js_SearchType = document.querySelector('.js-searchType');

// user search
// const js_NavInputGroup = document.querySelector('.js-navInputGroup');
// const js_NavInput = document.querySelector('.js-navInput');
// const js_NavInputBtn = document.querySelector('.js-navInputBtn');

// user search input
function searchStart() {
  // postman get 的網址，對應 index.js 的組字串
  const newsURL = `${api.url}books`;
  let params = (new URL(document.location)).searchParams;
  let name_like = params.get('name_like'); // 取得 name_like 值
  // console.log(name_like);
  // console.log(`${newsURL}?name_like=${name_like}`);//http://localhost:3000/books/實戰
  // 如果沒有值就不打api
  if (name_like === null) return;


  axios
    // api 要對應模糊搜尋
    .get(`${newsURL}?name_like=${name_like}`)
    .then(function (res) {

      data = res.data;
      //這裡的 data.id 等於資料的id
      //console.log(data.id);
      js_SearchBook.innerHTML = stringData(res.data);
      // console.log(searchFilter);
      js_SearchType.innerHTML = `<p class="js-searchType text-lg ml-6 py-6 text-brown font-bold">您想看的可能是 ..</p>`
      //重新渲染VanillaTilt.init 上面的圖片
      VanillaTilt.init(document.querySelectorAll(".your-element"));
    })
}
searchStart();


// 按鈕觸發的值
const searchFilter = {
  publish: "",
  tag: "",
  name: ""
};
function TypeData() {
  // api 串接的值 如果有值就跑 按鈕觸發的值，沒有就跑空值（不然會報錯）
  const apiUrlFilter = {
    publish: searchFilter.publish ? `&publish=${searchFilter.publish}` : "",
    tag: searchFilter.tag ? `&tag=${searchFilter.tag}` : "",
    name: searchFilter.name ? `&name_like=${searchFilter.name}` : "",
  }
  axios.get(`${api.url}books?${apiUrlFilter.publish}${apiUrlFilter.tag}${apiUrlFilter.name}`).then(res => {
    // 直接把取到值渲染出來 就可以了
    js_SearchBook.innerHTML = stringData(res.data);
    // console.log(searchFilter);
    js_SearchType.innerHTML = `<p class="js-searchType text-lg ml-6 py-6 text-brown font-bold">您想看的可能是 ..</p>`
    //重新渲染VanillaTilt.init 上面的圖片
    VanillaTilt.init(document.querySelectorAll(".your-element"));
  })
}

// 點擊按鈕取得值 中間篩選的值
js_TypeBtn.addEventListener('click', function (e) {
  searchFilter.publish = js_PublishType.value
  searchFilter.tag = js_TagType.value
  searchFilter.name = js_NameInput.value


  TypeData()

  // if (
  //   js_PublishType.value == "" ||
  //   js_TagType.value == "" ||
  //   js_NameInput.value == ""
  // ) {
  //   return alert("你想找什麼書呢？");
  // } else {
  //   searchFilter.publish = js_PublishType.value
  //   searchFilter.tag = js_TagType.value
  //   searchFilter.name = js_NameInput.value
  // }
  // TypeData()
  // js_SearchType.reset();

})


// 組字字串的函式
const stringData = (data) => {
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

