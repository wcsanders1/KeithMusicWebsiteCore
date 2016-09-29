var songsDB;

/************   SETS HEIGHT OF #view-and-keith-picture-container IN LAYOUT   ******************************/

var $topBannerHeight;
var $footerHeight = $("footer").height();  /* not sure will use this var */
var $bodyHeight;
var $viewAndKeithPictureContainer = $("#view-and-keith-picture-container");
var $containerHeight;

$(window).on("resize", function () {
    $bodyHeight = $("body").height();
    $topBannerHeight = $("#top-banner").height();
    $containerHeight = $bodyHeight - ($topBannerHeight);
    $viewAndKeithPictureContainer.height($containerHeight);
}).resize();

/***********************   AJAX   *****************************/

function CallDatabase() {
    $.ajax({
        async: false,
        type: "GET",
        url: "/Data/GetAllSongs",
        data: "{}",
        dataType: "json",
        success: OnSuccess,
        error: OnError
    });
}

$(document).ready(function () {
    CallDatabase();
});

function OnSuccess(data) {
    songsDB = data;

    var index = 0;
    var $snippetContainer = $("#snippet-container");

    var loopSnippets = function () {

        $snippetContainer.fadeOut("slow", function () {
            $snippetContainer.empty();
            var $newSnippet;

            if (index < songsDB.length - 1) {
                index += 1;
            } else {
                index = 0;
            }

            $newSnippet = $("<p>" + songsDB[index].title + "</p>");
            $newSnippet.attr("id", "snippet" + index);
            $newSnippet.click(ShowLyrics);
            $snippetContainer.append($newSnippet);
            $snippetContainer.fadeIn("slow");
        })
    };

    loopSnippets();

    setInterval(function () { loopSnippets(); }, 3000);
}

function OnError(data) {

}

function ShowLyrics() {
    var index = parseInt($(this).attr("id").replace(/[^\d.]/g, ''));
    var $keithLayoutPicture = $("#keith-layout-picture");
    var $lyrics = $("<p>" + songsDB[index].lyrics + "</p>");

    $keithLayoutPicture.css("background", "none");
    $keithLayoutPicture.css("background-color", "brown");
    $keithLayoutPicture.append($lyrics);

}

/************   AJAX: SHOWS LYRIC SNIPPETS   **************************************************/

//var snippetRequest = new XMLHttpRequest();
//var $snippetContainer = $("#snippet-container");
//var snippetIndex = 0;
//var snippets;
//var statusHTML;

//snippetRequest.onreadystatechange = function () {

    //if (snippetRequest.readyState === 4) {
    //    snippets = JSON.parse(snippetRequest.responseText);

        //var loopSnippets = function () {

        //    $snippetContainer.fadeOut("slow", function () {
        //        $snippetContainer.empty();

        //        if (snippetIndex < songsDB.length - 1) {
        //            snippetIndex += 1;
        //        } else {
        //            snippetIndex = 0;
        //        }

        //        //statusHTML = songsDB.Title;
        //        $snippetContainer.append("<p>" + songsDB[snippetIndex].Title + "</p>");
        //        $snippetContainer.fadeIn("slow");
        //    })};

        //loopSnippets();

        //setInterval(function () { loopSnippets(); }, 3000);
    //}
//};

//snippetRequest.open("GET", "json/lyric-snippets.json");
//snippetRequest.send();