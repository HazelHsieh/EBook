import api from '../js/http.js';

const signUp_Form = document.querySelector('.signUp-form')
const signUp_Name = document.querySelector('#signUpName')
const signUp_Account = document.querySelector('#signUpAccount')
const signUp_Password = document.querySelector('#signUpPassword')
const signUp_Send = document.querySelector('.signUpSend')

//*** validate 驗證規則 ***// 
const constraints = {
  name: {
    presence: {
      message: "^姓名必填",
    },
    length: {
      minimum: 3,
      message: "^姓名至少三個字元"
    },
  },
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

//let data;
// 註冊
const callSingUp = async (event) => {
  //阻止預設跳轉
  event.preventDefault();
  // 輸入後格式
  const signUpInfo = {
    name: "",
    email: "",
    password: "",
  };
  const signUpInfoMessage = document.querySelectorAll('.signUp_inputs');
  signUpInfoMessage.forEach(item => {
    signUpInfo[item.name] = item.value;
  })
  console.log(signUpInfo);
  //驗證是否錯誤
  const errors = validate(signUpInfo, constraints);
  const signUpInfoMessageAll = document.querySelectorAll('.userInfo-message');
  if (errors === undefined) {
    //沒有errors 就沒有紅字
    signUpInfoMessageAll.forEach(item => {
      item.innerHTML = "";
      item.classList.add("hidden");
    })
    //try..裡面有錯誤就會進入 catch... 
    try {
      await axios.post(`${api.url}signup/`, signUpInfo);
      signUpInfoMessage.forEach(item => {
        item.value = '';
      });
      Swal.fire({
        confirmButtonColor: '#8CA187',
        icon: 'success',
        title: '⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾',
        text: "註冊成功"
      });

    } catch (error) {
      //抓錯誤資訊 去對應值
      //console.log(error);
      if (error.response.data === 'Email already exists') {
        Swal.fire({
          confirmButtonColor: '#8CA187',
          icon: 'error',
          title: '(๑•́ ₃ •̀๑)',
          text: "有人比你早一步哦"
        });
      } else if (error.response.data === 'Email and password are required') {
        Swal.fire({
          confirmButtonColor: '#8CA187',
          icon: 'error',
          title: 'ヽ(`Д´)ノ',
          text: "484 漏填什麼了"
        });
      } else {
        Swal.fire({
          confirmButtonColor: '#8CA187',
          icon: 'error',
          title: '٩(ŏ﹏ŏ、)۶',
          text: "我不確定哪裡錯了"
        });
      }
    }
  } else {
    //
    //console.log(errors);
    // 更改輸入時更新錯誤資訊
    signUpInfoMessageAll.forEach(item => {
      if (errors[item.dataset.message] === undefined) {
        item.innerHTML = "";
        item.classList.add("hidden");
      } else {
        item.innerHTML = errors[item.dataset.message][0];
        item.classList.remove('hidden');
      }
    })
  };
}

const init = () => {
  signUp_Form.addEventListener("submit", callSingUp);
}
init();