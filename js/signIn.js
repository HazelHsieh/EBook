import api from '../js/http.js';

const signIn_Form = document.querySelector('.signIn-form')
const signIn_Account = document.querySelector('#signInAccount')
const signIn_Password = document.querySelector('#signInPassword')
// const signIn_Send = document.querySelector('.signInSend')



//*** validate 驗證規則 ***// 
const constraints = {
  email: {
    presence: {
      message: "^Email 為必填",
    },
    email: {
      message: "^Email 格式錯誤",
    },
  },
  password: {
    presence: {
      message: "^密碼為必填",
    },
    length: {
      minimum: 8,
      message: "^密碼至少長度8個以上"
    },
  },

};

// DEMO
const js_Admin = document.querySelector('.js-admin');
js_Admin.addEventListener('click', (e) => {
  e.preventDefault();
  signIn_Account.value = 'admin@gmail.com';
  signIn_Password.value = '12345678';
})

const js_User = document.querySelector('.js-user');
js_User.addEventListener('click', (e) => {
  e.preventDefault();
  signIn_Account.value = 'user@gmail.com';
  signIn_Password.value = '12345678';
})



// 登入
const callSingIn = async (event) => {
  //阻止預設跳轉
  event.preventDefault();
  // 輸入後格式
  const signInInfo = {
    email: "",
    password: "",
  };
  const signInInfoMessage = document.querySelectorAll('.signIn_inputs');
  signInInfoMessage.forEach(item => {
    signInInfo[item.name] = item.value;
  })
  const errors = validate(signInInfo, constraints);
  const signInInfoMessageAll = document.querySelectorAll('.userInfo-message');
  if (errors === undefined) {
    signInInfoMessageAll.forEach(item => {
      item.innerHTML = '';
      item.classList.add("hidden");
    })
    try {
      // 資料存取
      const userInfo = await axios.post(`${api.url}signin/`, signInInfo);
      signInInfoMessage.forEach(item => {
        item.value = '';
      });

      //存進去                                      const userInfo要的值
      localStorage.setItem("eBook", JSON.stringify(userInfo.data));

      // 頁面跳轉 "admin"可以進去後台
      if (userInfo.data.user.role === "admin") {
        Swal.fire({
          confirmButtonColor: '#8CA187',
          icon: 'success',
          title: '⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾',
          text: '登入成功',
          confirmButtonText: '<a href="../backendView/dashboard.html">GO!</a>'
        });
      } else if (userInfo.data.user.role === "user") {
        Swal.fire({
          confirmButtonColor: '#8CA187',
          icon: 'success',
          title: '⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾',
          text: '登入成功',
          confirmButtonText: '<a href="../frontendView/myBooks.html">GO!</a>'
        });
      }
    } catch (error) {
      console.log(error.response);
      Swal.fire({
        confirmButtonColor: '#8CA187',
        icon: 'error',
        title: '٩(ŏ﹏ŏ、)۶',
        text: "我不確定哪裡錯了"
      });
    }
  } else {
    signInInfoMessageAll.forEach(item => {
      if (errors[item.dataset.message] === undefined) {
        item.innerHTML = "";
        item.classList.add("hidden");
      } else {
        item.innerHTML = errors[item.dataset.message][0];
        item.classList.remove("hidden");
      }
    })
  };
}



const init = () => {
  signIn_Form.addEventListener("submit", callSingIn);
}
init();