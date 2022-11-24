import "../js/vanilla.js";
//初始
let data;
const eBook = {
  //最新熱門
  newPublish: [],
}

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
      console.log(booksArray);

      // 最新熱門 全部的書本出版日期去排序，取從第三筆開始的九筆資料
      eBook.newPublish.push(...booksArray.slice(3, 22));
      console.log(eBook.newPublish);

      // class 綁定
      const js_NewPublish = document.querySelector('.js-newPublish');

      stringData(eBook.newPublish);
      js_NewPublish.innerHTML = stringData(eBook.newPublish);
      //渲染swiper 上面的圖片
      VanillaTilt.init(document.querySelectorAll(".your-element"));
    })

}
init();


//放大 data-tilt-scale="1.1"
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


