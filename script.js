var loginPopup = document.getElementById("loginPopup");
var signupPopup = document.getElementById("signupPopup");

let loginBtn = document.getElementById("login");
const submitBtn = document.getElementById("submit");
const closeBtn = document.getElementById("close");

loginBtn.addEventListener(onclick, onClickOpen);

function onClickOpen() {
  loginPopup.fadeIn(350);
  console.log("pop");
}

function onClickClose() {
  popup.fadeOut(350);
  console.log("out");
}
