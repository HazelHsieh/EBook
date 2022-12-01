const signIn_Account = document.querySelector('#signInAccount')
const signIn_Password = document.querySelector('#signInPassword')
const signIn_Send = document.querySelector('.signInSend')

signIn_Send.addEventListener("click", function (e) {
  //console.log(signIn_Password, signIn_Account);
  callSingIn();
})




let data;
// 登入
function callSingIn() {
  if (signIn_Account.value == '' || signIn_Password.value == '') {
    alert('請輸入帳號密碼');
    return;
  }
  let obj = {};
  obj.email = signIn_Account.value;
  obj.password = signIn_Password.value;
  console.log(obj);
  axios
    .get("https://json-server-vercel-gamma.vercel.app/users/")
    .then(function (res) {
      data = res.data
      userAccount = data[0].account
      userPassword = data[0].password
      console.log(data[0].password);
    })
}
