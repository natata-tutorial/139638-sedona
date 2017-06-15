var mainNav = document.querySelector('.main-nav');
var closeLink = document.querySelector('.main-nav__close');
var openLink = document.querySelector('.menu-toggle');
mainNav.classList.remove('main-nav--nojs');
  openLink.addEventListener('click', function () {
  mainNav.classList.add('main-nav--opened');
  openLink.style.opacity = '0';
}
);
  closeLink.addEventListener('click', function () {
  mainNav.classList.remove('main-nav--opened');
  openLink.style.opacity = '1';
  }
);
