
$(".nav-button").click(function () {
    $("body").toggleClass("nav-open");
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
            navItem.css("color", "#222");
            searchBtn.css("color", "#222");
            menuBtn.css("background-color", "#222");
            logo.css("fill", "#222");
        }
    });
});


$(".filter-button").click(function () {
    var value = $(this).attr('data-filter');

    if (value == "all") {
        //$('.filter').removeClass('hidden');
        $('.filter').show('1000');
    } else {
        //            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
        //            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
        $(".filter").not('.' + value).hide('3000');
        $('.filter').filter('.' + value).show('3000');
    }
});

$('.thumbnail').click(function(){
  	$('.modal-body').empty();
  	var title = $(this).parent('a').attr("title");
  	$('.modal-title').html(title);
  	$($(this).parents('div').html()).appendTo('.modal-body');
    $('#photoModal').modal({ show: true });
});


// Email Button Form
$(".support-link").click(function () {
    $(".email_template").not("#emailForm" + $(this).attr("target")).hide();
    $("#emailForm" + $(this).attr("target")).toggle();
});


// const req = new XMLHttpRequest();
// req.open("GET", "/json/photo_list.json");
// req.onreadystatechange = function () {
//     if (this.readyState == 4) {
//         // console.log(this.response);
//         const data = JSON.parse(this.response);
//         for (let i = 0; i < data.length; i++) {
//             const div = document.createElement("div");
//             div.setAttribute("class", "image");
//             const img = document.createElement("img");
//             img.src = data[i];
//             div.appendChild(img);
//             document.querySelector(".photo-img").appendChild(div);
//         }
//     }
// }
// req.send();




// Javascript to enable link to tab
var hash = location.hash.replace(/^#/, '');  // ^ means starting, meaning only match the first hash
if (hash) {
    $('.nav-tabs a[href="#' + hash + '"]').tab('show');
} 

// Change hash for page-reload
$('.nav-tabs a').on('shown.bs.tab', function (e) {
    window.location.hash = e.target.hash;
})

