var mainNav = document.querySelector(".main-nav");
var closeLink = document.querySelector(".main-nav__close");
var openLink = document.querySelector(".menu-toggle");
mainNav.classList.remove("main-nav--nojs");
  openLink.addEventListener("click", function () {
  mainNav.classList.add("main-nav--opened");
  mainNav.classList.remove("main-nav--closed");
  openLink.style.opacity = "0";
}
);
  closeLink.addEventListener("click", function () {
  mainNav.classList.remove("main-nav--opened");
  mainNav.classList.add("main-nav--closed");
  openLink.style.opacity = "1";
  }
);
var popupError  = document.querySelector(".popup--error");
var popupSuc = document.querySelector(".popup--success");
var popupOverlay = document.querySelector(".popup--overlay");
var formSubmit = document.querySelector(".form-js");
var popupErrorBtn = document.querySelector(".popup--error__button");
var popupSucBtn = document.querySelector(".popup--success__button");
formSubmit.addEventListener("submit", function (event) {
  var name = document.getElementById("name");
  var tel = formSubmit.querySelector("[name=tel]");
  var secName = formSubmit.querySelector("[name=second-name]");
  var email = formSubmit.querySelector("[name=email]");
  if (!name.value || !secName.value || !tel.value || !email.value  ){
    event.preventDefault();
    popupError.classList.add("popup-show");
    document.getElementById("name").style.border = "1px solid red";
    document.getElementById("tel").style.border = "1px solid red";
    document.getElementById("email").style.border = "1px solid red";
    document.getElementById("second-name").style.border = "1px solid red";
  }
  else {
    event.preventDefault();
    popupSuc.classList.add("popup-show");
  }
  popupOverlay.classList.add("popup-show");
});
popupErrorBtn.addEventListener("click", function (event){
  popupError.classList.remove("popup-show");
  popupOverlay.classList.remove("popup-show");
});
popupSucBtn.addEventListener("click", function (event){
  popupSuc.classList.remove("popup-show");
  popupOverlay.classList.remove("popup-show");
  formSubmit.submit();
});
