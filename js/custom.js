$(function () {
    $(".nav-button").click(function () {
        $("body").toggleClass("nav-open");
    });
});

$(function () {
    var nav = $("#header-pc, #header-mo");
        langBtn = $("button.dropdown");
        langBtnFont = $(".dropdown .dropdown-link");
        logo = $(".logo");
        navItem = $("#header-pc .nav-link");
        searchBtn = $(".icofont-search-1");
        menuBtn = $("#header-mo .nav-button>span");

    $(window).on('scroll', function () {

        if ($(window).scrollTop() >= 50) {
            nav.addClass("nav-scroll");
            langBtn.css("background-color", "#fff");
            langBtnFont.css("color", "#005cb9");
            navItem.css("color", "#fff");
            searchBtn.css("color", "#fff");
            menuBtn.css("background-color", "#fff");
            logo.css("fill", "#fff");

        } else {
            nav.removeClass("nav-scroll");
            langBtn.css("background-color", "#005cb9");
            langBtnFont.css("color", "#fff");
            navItem.css("color", "#fff");
            searchBtn.css("color", "#fff");
            menuBtn.css("background-color", "#222");
            logo.css("fill", "#222");
        }
    });
});

$(document).ready(function () {
    $('#Carousel').carousel({
        interval: 5000
    })
});


//드래그 스와이프

const carouselList = document.querySelector('#carousel-list');
// carousel item 너비
const width = document.querySelector('.carousel-item').clientWidth;
// carousel item 전체 갯수
const carouselItemCount = document.querySelectorAll('.carousel-item').length / 3;

// drag에 의해 움직인 X값
let moveTranslateX = 0;
// 현재 X값
let currentTranslateX = 0;
// drag에 의해 변경될 X값
let nextTranslateX = 0;
// drag 시작여부
let isMove = false;
// drag 시작위치 X값
let moveStartX = 0;
// item 이동을 위한 gap 기준값
const moveGap = 22;
// drag 종료시간
let dragEndTime = new Date().getTime();
// interval
let interval;
// timeout
let timeout;

// drag 시작 이벤트
const dragStart = (clientX) => {
  isMove = true;
  moveStartX = clientX
  clearInterval(interval);
  clearTimeout(timeout);

  // carousel list transition 제거
  carouselList.classList.remove('carousel-list-transition');

  // drag 종료시점으로부터 transition 시간이 지났는지 확인
  const dragEndStartGapTime = new Date().getTime() - dragEndTime; // drag 종료부터 다시 시작하기까지 걸린 시간 (단위 ms)
  let dragEndStartGapTranslateX = 0; // drag 종료부터 다시 시작하기까지 이동하지 못한 translateX
  if(dragEndStartGapTime <= 600) { // transition 시간보다 적은 경우
    dragEndStartGapTranslateX = (nextTranslateX - currentTranslateX) * ((600 - dragEndStartGapTime) / 600 / 1.5);
  }

  // 두번째 carousel-item 위치로 변경
  currentTranslateX = -(((-currentTranslateX / width) % carouselItemCount) + carouselItemCount) * width + dragEndStartGapTranslateX;
  nextTranslateX = currentTranslateX;
  carouselList.style.transform = `translateX(${currentTranslateX}px)`;
}

// drag 중 이벤트
const dragging = (clientX) => {
  if(isMove) {
    moveTranslateX = clientX - moveStartX;
    nextTranslateX = currentTranslateX + moveTranslateX;

    // 오른쪽으로 최대 이동한 경우
    if(nextTranslateX < -width * (carouselItemCount * 3 - 1)) {
      nextTranslateX = -width * (carouselItemCount * 3 - 1);
    } 

    // 왼쪽으로 최대 이동한 경우
    else if(nextTranslateX > 0) {
      nextTranslateX = 0;
    }

    carouselList.style.transform = `translateX(${nextTranslateX}px)`;
  }
}

// drag 종료 이벤트
const dragEnd = () => {
  if(isMove) {
    // 초기화
    isMove = false;
    moveStartX = 0;
    carouselList.classList.add('carousel-list-transition');
    dragEndTime = new Date().getTime();
    timerConfig();

    // 오른쪽으로 이동한 경우
    if(currentTranslateX > nextTranslateX) {
      if((currentTranslateX - nextTranslateX) % width > moveGap) {
        currentTranslateX = -(Math.floor(-nextTranslateX / width) + 1) * width;
      } else {
        currentTranslateX = -(Math.floor(-nextTranslateX / width)) * width;
      }
    }

    // 왼쪽으로 이동한 경우
    else if(currentTranslateX < nextTranslateX) {
      if((nextTranslateX - currentTranslateX) % width > moveGap) {
        currentTranslateX = -(Math.floor(-nextTranslateX / width)) * width;
      } else {
        currentTranslateX = -(Math.floor(-nextTranslateX / width) + 1) * width;
      }
    }

    // 동일한 위치인 경우
    else {
      // item 중간을 기준으로 오른쪽에 더 치우친 경우
      if(Math.abs(currentTranslateX) % width >= width / 2) {
        currentTranslateX = -(Math.floor(-currentTranslateX / width) + 1) * width;
      } 

      // item 중간을 기준으로 왼쪽에 더 치우친 경우
      else {
        currentTranslateX = -(Math.floor(-currentTranslateX / width)) * width;
      }
    }

    carouselList.style.transform = `translateX(${currentTranslateX}px)`;
  }
}

// carousel 자동이동 timer
const timer = () => {
  timeout = setTimeout(() => {
    // 두번째 carousel-item 위치로 변경
    carouselList.classList.remove('carousel-list-transition');
    currentTranslateX = -(((-currentTranslateX / width) % carouselItemCount) + carouselItemCount) * width;
    carouselList.style.transform = `translateX(${currentTranslateX}px)`;
  }, 1500)

  // 다음 item으로 이동
  carouselList.classList.add('carousel-list-transition');
  currentTranslateX -= width;
  carouselList.style.transform = `translateX(${currentTranslateX}px)`;

  // 초기화
  dragEndTime = new Date().getTime();
}

// timer 설정
const timerConfig = () => {
  interval = setInterval(() => {
    timer();
  }, 3000)
}

// timer 동작
timerConfig();

// PC
carouselList.addEventListener('mousedown', (e) => dragStart(e.clientX));
window.addEventListener('mousemove', (e) => dragging(e.clientX));
window.addEventListener('mouseup', dragEnd);

// Mobile
carouselList.addEventListener('touchstart', (e) => dragStart(e.targetTouches[0].clientX));
window.addEventListener('touchmove', (e) => dragging(e.targetTouches[0].clientX));
window.addEventListener('touchend', dragEnd);