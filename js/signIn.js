import api from '../js/http.js';

const signIn_Form = document.querySelector('.signIn-form')
const signIn_Account = document.querySelector('#signInAccount')
const signIn_Password = document.querySelector('#signInPassword')
const signIn_Send = document.querySelector('.signInSend')



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
    console.log(item);
    signInInfo[item.name] = item.value;
  })
  // console.log(signInInfo);
  const errors = validate(signInInfo, constraints);
  const signInInfoMessageAll = document.querySelectorAll('.userInfo-message');
  // console.log(errors);
  if (errors === undefined) {
    signInInfoMessageAll.forEach(item => {
      item.innerHTML = '';
      item.classList.add("hidden");
    })
    try {
      await axios.post(`${api.url}signin/`, signInInfo);
      signInInfoMessage.forEach(item => {
        item.value = '';
      });
      Swal.fire({
        confirmButtonColor: '#8CA187',
        icon: 'success',
        title: '⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾',
        text: "登入成功",
        footer: '<a href="../backendView/dashboard.html">點我進去後台</a>'
      });
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
  // if (signIn_Account.value == '' || signIn_Password.value == '') {
  //   Swal.fire({
  //     confirmButtonColor: '#8CA187',
  //     icon: 'error',
  //     title: '٩(ŏ﹏ŏ、)۶',
  //     text: "帳號密碼沒有填到拉"
  //   });
  //   return;
  // }
  // let obj = {};
  // obj.email = signIn_Account.value;
  // obj.password = signIn_Password.value;
  // console.log(obj);
  // axios
  //   .post(`${api.url}signin/`, obj)
  //   .then(function (res) {
  //     //把值取出來 
  //     console.log(res);
  //     // data = res.data
  //     // userAccount = data[0].account
  //     // userPassword = data[0].password
  //     // console.log(data[0].password);
  //   }).catch((res) => {
  //     console.log(res);
  //   })
}
const init = () => {
  signIn_Form.addEventListener("submit", callSingIn);
}
init();