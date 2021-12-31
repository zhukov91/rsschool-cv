"use strict"
//!===проверка мобильный ли телефон=====*/
var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};
/*=========проверка моб или нет======*/
if (isMobile.any()) {
  document.body.classList.add('_touch');
//*=========внизу код вычисления всех стрелок=======
  let menuArrows = document.querySelectorAll('.menu__arrow');
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", function (e) {
        menuArrow.parentElement.classList.toggle('_active');
      });
    }
  }
  /*================================================ */
  //=================================================*/
} else {
  document.body.classList.add('_pc');
}
//!================меню бургер===========================
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}

//!================прокрутка при клике по меню===========
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');//поиск по атрибуду dat-goto
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);//обьект на который вешаем событие клик
  });

  function onMenuLinkClick(e) { //функция получить обьект на который кликаем
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
      /*чтобы меню закрывалось*/
      if (iconMenu.classList.contains('_active')) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
      }
      /*---------------------*/
      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}
//====================================================*/