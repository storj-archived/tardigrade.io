$(document).ready(function(){
    //grab first four articles of currently active year
    $(".current-year .press-kit__news__article").slice(0, 4).css("display", "flex");

    $("#loadMore").click(function(e){ // click event for load more
        e.preventDefault();
        if($(".current-year .press-kit__news__article:hidden").length !== 0){ // check if any hidden divs still exist
            $(".current-year .press-kit__news__article:hidden").slice(0, 4).css("display", "flex");
        } else if($(".current-year .press-kit__news__article:hidden").length === 0){
            $("#loadMore").hide()
        }
    });

    // active timeline year logic
    $(".press-kit__news__ear").click(function(e){

        e.preventDefault();
        // grabbing year of clicked element
        var year = $(event.target).text()

        $(".active").removeClass('active')
        $(e.target).addClass('active')
        $(".current-year").removeClass('current-year')
        $("." + year).addClass('current-year')
        $(".current-year .press-kit__news__article").slice(0, 4).css("display", "flex");

        if($(".current-year .press-kit__news__article:hidden").length > 0){
            $("#loadMore").show()
        } else if($(".current-year .press-kit__news__article:hidden").length === 0){
            $("#loadMore").hide()
        }
    });

    // if there're no more articles, hide load more btn
    if($(".current-year .press-kit__news__article:hidden").length === 0){
        $("#loadMore").hide()
    }

    // mobile load more logic
    $(".press-kit__news__mobile-article-group .press-kit__news__article").slice(0, 4).css("display", "flex");

    $("#loadMore").click(function(e){ // click event for load more
        e.preventDefault();
        if($(".press-kit__news__mobile-article-group .press-kit__news__article:hidden").length !== 0){ // check if any hidden divs still exist
            $(".press-kit__news__mobile-article-group .press-kit__news__article:hidden").slice(0, 4).css("display", "flex");
        } else if($(".press-kit__news__mobile-article-group .press-kit__news__article:hidden").length === 0){
            $("#loadMore").hide()
        }
    });
})
