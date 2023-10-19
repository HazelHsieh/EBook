import api from '../js/http.js';


const userInfo = JSON.parse(localStorage.getItem('eBook'));
const js_SignOutBtn = document.querySelector(".js-signoutBtn");
const js_UserAvatar = document.querySelector('.js-userAvatar');
// token 不對就跳轉到首頁
if (userInfo.user.role !== "admin") {
  setTimeout(() => {
    window.location.href = `../frontendView/myBooks.html`
  }, 1000)
}
if (userInfo) {
  js_UserAvatar.innerHTML = `<div class="js-userAvatar w-10 rounded-full">
    <img src="${userInfo.user.avatarUrl}" />
  </div>`
}


// 把我的帳號改成登出功能 登出時也將localStorage刪除
function signOutEven() {
  const js_BackendView = document.querySelector(".js-backendView");
  js_BackendView.innerHTML = `<a href="../backendView/dashboard.html">後台管理</a> `
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
signOutEven();





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
    // const Toast = Swal.mixin({
    //   toast: true,
    //   position: 'top-end',
    //   showConfirmButton: false,
    //   timer: 3000,
    //   timerProgressBar: true,
    //   didOpen: (toast) => {
    //     toast.addEventListener('mouseenter', Swal.stopTimer)
    //     toast.addEventListener('mouseleave', Swal.resumeTimer)
    //   }
    // })

    // Toast.fire({
    //   icon: 'success',
    //   title: '新增成功'
    // })

  })
  .catch(error => {
    console.error(error);
  });

const formDOM = document.querySelector("form")
const getFormValue = (e) => {
  e.preventDefault();
  const obj = {
    "name": e.target[0].value,
    "author": e.target[1].value,
    "publish": e.target[2].value,
    "publishDate": e.target[3].value,
    "rate": e.target[4].value,
    "imgUrl": e.target[5].value,
    "tag": [
      e.target[6].value
    ],
    "ISBN": e.target[7].value,
    "language": e.target[8].value,
    "recommend": [

    ],
    "introduction": editor.getData()
  };
  console.log(obj);
  const url = `${api.url}books`
  console.log(obj);
  axios.post(url, obj)
}
formDOM.addEventListener('submit', getFormValue);



