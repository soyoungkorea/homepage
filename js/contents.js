$(function () {
    var $container = $('.gallery'),
        $loadMoreBtn = $('.load-more'),
        $addItemCount = 4,
        $added = 0,
        $allData = [];
    
    $.getJSON('./json/photo_list.json', initGallery);
    
    function initGallery(data) {
        $allData = data;
        console.log($allData);

        addItem(); //열자 마자 아이템 추가

        $loadMoreBtn.click($addItem);
    }//initGallery

    function addItem() {
        var slicedData;
        var elements = [];
        /*
        var $allData = [0, 1, 2, 3, 4]
        var slicedData = $allData.slice(0, $addItemCount) $allData배열에서 0번째 4번째 전까지의 값을 가져온다.
        */
        slicedData = $allData.slice($added, $added + $addItemCount);
        console.log(slicedData);
        /*
            $('li').each(function () {}); >> jqeury object
            $.each('배열', function (i, item)) >> json, array value 
        */
        $.each(slicedData, function (idx, item) {
            var itemHTML =
                '<li class="gallery-item"><a href="#">'
                + item.title +
                '</a></li>';
            elements.push($(itemHTML).get(0));
            
        });
        console.log(elements);
        $container.append(elements);

        //$added 값 업데이트
        // var i = 2; i += 2;
        $added += slicedData.length;

    }//addItem
    
    /*

    $.getJSON('파일경로', function(){
        initGallery();
    });

    function initGallery () { }

    */
    
});//ready function