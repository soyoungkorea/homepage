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


  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);

const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientX(e.clientX);
    setMouseUpClientY(e.clientY);
  };
  useEffect(() => {
    const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);
    const dragSpaceY = Math.abs(mouseDownClientY - mouseUpClientY);
    const vector = dragSpaceX / dragSpaceY;

    if (mouseDownClientX !== 0 && dragSpaceX > 100 && vector > 2) {
      if (mouseUpClientX < mouseDownClientX) {
        handleNextBtn();
      } else if (mouseUpClientX > mouseDownClientX) {
        handlePrevBtn();
      }
    }
  }, [mouseUpClientX]);
