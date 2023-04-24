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




console.clear();

function dragSlide__init() {
  var $slideDrag = $('.carousel').find(' > .carousel-inner');
  var slideDuration = parseInt($slideDrag.parent().attr('data-slide-duration'));
  
  $slideDrag.data("data-slide-index", 0)
  var slideIndex = $slideDrag.data("data-slide-index");
  var dragAmount = 0;

  // slide setting
  function slideSet() {
    var $this = $slideDrag;
    var $parent = $this.parent();
    var slideWidth = $parent.width();
    
    var duration = slideDuration / 1000;
    
    $this.css('transition', 'transform ' + duration + 's');
    $this.css({ transform: "translateX(" + slideIndex * -slideWidth + "px)" });
  }
  
  //drag slide
  function dragSlide() {
    var $this = $(this);
    
    // drag prevent
    if ($this.hasClass('prevent')) {
      return ;
    }
    $this.addClass('prevent');
    
    // slide
    var $slide = $this.parent();
    
    var slideWidth = $slide.width();
    var minDistance = (slideWidth / 2) / 2;

    var dragPosition = parseInt($this.css("left"));
    slideDuration = parseInt($slide.attr('data-slide-duration'));
    var slideLimit = $this.find(" > .carousel-img").length - 1;
    
    //drag reset
    $this.stop().animate({ left: 0 }, {duration: slideDuration, complete: function(){
      $this.removeClass('prevent');
    }});
    
    
    // drag direction
    if (dragPosition < 0) {
      console.log("right");
      if (dragPosition > -minDistance || slideIndex >= slideLimit) return ;
      
      $this.data("data-slide-index", ++slideIndex);
      dragAmount += -slideWidth;
    }
    else {
      console.log("left");
      if (dragPosition < minDistance || slideIndex <= 0) return ;

      $this.data("data-slide-index", --slideIndex);
      dragAmount += slideWidth;
    }
    $this.css({ transform: "translateX(" + dragAmount + "px)" });
  }

  // draggable
  slideSet();
  $(".carousel .carousel-inner").draggable({ axis: "x", stop: dragSlide });
  $(window).resize(_.throttle(slideSet, 100));
}

$(function () {
  dragSlide__init();
});
