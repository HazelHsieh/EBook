//初始
let data;
const eBook = {
  //最新熱門
  newPublish: [],
}




// 最新熱門的畫面渲染
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


// 按鈕觸發的值
const searchFilter = {
  publish: "",
  tag: "",
  name: ""
};
function TypeData() {

  // 可以不用取兩次，直接用網址字串去搜尋
  // axios
  //   .get("http://localhost:3000/books/")
  //   .then(function (res) {
  //     let booksData = res.data;
  //     console.log(booksData);
  //     booksData.forEach(item => {
  //     })
  //   })

  // api 串接的值 如果有值就跑 按鈕觸發的值，沒有就跑空值（不然會報錯）
  const apiUrlFilter = {
    publish: searchFilter.publish ? `&publish=${searchFilter.publish}` : "",
    tag: searchFilter.tag ? `&tag=${searchFilter.tag}` : "",
    name: searchFilter.name ? `&name_like=${searchFilter.name}` : "",
  }
  axios.get(`http://localhost:3000/books?${apiUrlFilter.publish}${apiUrlFilter.tag}${apiUrlFilter.name}`).then(res => {
    // 確認可以取道撈出來的資料
    // console.log(res.data);
    // console.log(`http://localhost:3000/books?${apiUrlFilter.publish}${apiUrlFilter.tag}${apiUrlFilter.name}`);
    // 可以不用在製造陣列 推上去，不然會無法重新得到新的值
    // eBookTypeData.push(...res.data)
    // const js_UserBooks = document.querySelector('.js-userBooks');
    // stringData(eBookTypeData)


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
//////////////////////////
// NAV 篩選 
// user search
const js_NavInputGroup = document.querySelector('.js-navInputGroup');
const js_NavInput = document.querySelector('.js-navInput');
const js_NavInputBtn = document.querySelector('.js-navInputBtn');


// const searchFilter = {
//   name: ""
// };
js_NavInputBtn.addEventListener('click', function (e) {
  e = js_NavInput.value

  console.log(e);

  const apiUrlFilter = {
    name: e ? `&name_like=${e}` : "",
  }
  console.log(apiUrlFilter.name);

  axios.get(`http://localhost:3000/books?${apiUrlFilter.name}`).then(res => {

    // 直接把取到值渲染出來 就可以了
    js_SearchBook.innerHTML = stringData(res.data);
    // console.log(searchFilter);
    js_SearchType.innerHTML = `<p class="js-searchType text-lg ml-6 py-6 text-brown font-bold">您想看的可能是 ..</p>`
    //重新渲染VanillaTilt.init 上面的圖片
    VanillaTilt.init(document.querySelectorAll(".your-element"));
  })
})

// 按鈕觸發的值
// news.html?search=你搜尋的東西
{/* <a href="./frontendView/products.html?id=${item.id}" */ }


// 組字字串的函示
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

