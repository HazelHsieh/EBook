import api from '../js/http.js';

let data;
function init() {
  // postman get 的網址，對應 all.js 的組字串
  const booksURL = `${api.url}books`;
  let params = (new URL(document.location)).searchParams;
  let id = parseInt(params.get('id')); // 取得 api id number

  //這裡的 id 等於 postman get 的網址的 id
  //console.log(id);
  axios
    .get(`${booksURL}/${id}`)
    .then(function (res) {
      data = res.data;
      //console.log(data);
      //這裡的 data.id 等於資料的id
      //console.log(data.id);
      renderBook();
    })
}
init();

// 寫一個函式 渲染數字的星星
function readerRating(rate) {
  // console.log(rate);
  let str = "";
  // 不能用 forEach 因為他沒有吃數字轉自串的型別
  // $的樣版字串值
  for (let x = 0; x < rate; x++) {
    str += `<input type="radio" name="rating-3" class="mask mask-heart bg-red-400" />`
  }
  // console.log(str);
  return str;
}


function renderBook() {
  // 書籍產生的介紹
  const book_Introduction = document.querySelector('.bookIntroduction');
  let introduction = `<section class="py-12">
        <div class="bookIntroduction container mx-auto p-4 md:p-0">
          <div class="shadow-lg xl:shadow-none flex flex-wrap xl:w-4/5 mx-auto">
            <div class="imgUrl bg-contain bg-no-repeat bg-center w-full lg:w-1/3 h-64 lg:h-auto relative"
              style="height: 380px; background-image:url('${data.imgUrl}')">
              <div class="absolute text-xl">
                <i class="fa fa-heart text-white mt-10 ml-28 sm:ml-48 md:ml-64 lg:ml-16 xl:ml-24  hover:text-red-400 cursor-pointer"></i>
              </div>
            </div>

            <div class="bg-white w-full lg:w-2/3">
              <div class="h-full mx-auto px-6 lg:px-0 lg:pt-6 lg:-ml-6 relative">
                <div class="bg-creamWhite2 lg:h-full p-6 -mt-6 lg:mt-0 relative mb-4 lg:mb-0  lg:flex-wrap items-center">
                  <div class="w-full  lg:border-right lg:border-solid text-center md:text-left">
                    <p class="name text-2xl">${data.name}</p>
                    <div class="flex items-center justify-center md:justify-start ">
                      <p class="rating gap-1 py-2">
                        ${readerRating(data.rate)}
                      </p>
                      <p class="text-info text-lg  font-bold pl-3"> 98% 適合您</p>
                    </div>
                    <p class="author mb-0 mt-2">作者：${data.author}</p>
                    <p class="publish mb-0 mt-2">出版社：${data.publish}</p>
                    <p class="publishData mb-0 mt-2">出版日期：${data.publishDate}</p>
                    <p class="language mb-0 mt-2">語言：${data.language}</p>
                    <p class="ISBN mb-0 mt-2">ISBN：${data.ISBN}</p>
                    <hr class="w-1/4 md:ml-0 mt-4  border lg:hidden">
                    <a href=""
                      class="js-addBookBtn btn btn-outline border-primary mt-4 text-primary rounded-sm hover:bg-secondary hover:border-none hover:text-white">
                      <span class="material-icons mr-2">library_books</span>加入書單
                    </a>
                  </div>
                </div>
                <!-- ./Card body - inner wrapper -->
              </div>
              <!-- ./Card body - outer wrapper -->
            </div>
            <!-- ./Card body -->
          </div>
          <!-- ./Card wrapper -->
        </div>
      </section>`;
  book_Introduction.innerHTML = introduction;

  //編輯器產生的文字區塊
  const book_Content = document.querySelector('.bookContent');
  let content = '';
  content = `<section>${data.introduction}</section>`;
  book_Content.innerHTML = content;

  //在文字裡的 Btn 增加監聽事件
  const js_AddBookBtn = document.querySelector(".js-addBookBtn");
  js_AddBookBtn.addEventListener('click', updateNewBook);
}

const userInfo = JSON.parse(localStorage.getItem('eBook'));
const userBookAry = userInfo.user.historyOrders;
// console.log(userBook);
const js_SignOutBtn = document.querySelector(".js-signoutBtn");
const js_UserAvatar = document.querySelector('.js-userAvatar');
// token 不對就跳轉到首頁
if (!userInfo) {
  js_SignOutBtn.innerHTML = `<a href="./signIn.html">我的帳號</a>`
} else {
  js_UserAvatar.innerHTML = `<div class="js-userAvatar w-10 rounded-full">
    <img src="${userInfo.user.avatarUrl}" />
  </div>`
  signOutEven();
}


// 加入書本
function updateNewBook(e) {
  // js_AddBookBtn 的新增事件
  e.preventDefault();
  // if (e === data.ISBN) {
  //   Swal.fire({
  //     confirmButtonColor: '#8CA187',
  //     icon: 'info',
  //     title: '(´ΘωΘ`)',
  //     text: "開始閱讀吧，你有這本書了"
  //   });
  //   return;
  // } else {

  // }
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: '加入成功',
    showConfirmButton: false,
    timer: 1500
  })
  console.log(data.ISBN);
  //  userBookAry.forEach(item =>{

  //  })
  console.log(Object.values(userBookAry));
  //userBookAry.push({ ISBN: data.ISBN })
  //console.log(userInfo);

  //存進去                                      const userInfo要的值
  //localStorage.setItem("eBook", JSON.stringify(userInfo.data));
  console.log(userBookAry);
  //const userId = userInfo.user.id;
  //axios.patch(`${api.url}users/${userId}`, { historyOrders: userBookAry })
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





