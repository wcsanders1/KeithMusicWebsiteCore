/************************   GLOBAL VARIABLES   *********************************/
var pageSize = $("#page-size").css("z-index");
var songsDB;
var lyricsShowing = false;


/************   SETS HEIGHT OF #view-and-keith-picture-container IN LAYOUT   ******************************/

function SetHeightViewaAndPicture() {
    var $topBannerHeight;
    var $bodyHeight;
    var $viewAndKeithPictureContainer = $("#view-and-keith-picture-container");
    var $keithLayoutPicture = $("#keith-layout-picture");
    var $containerHeight;

    if (pageSize >= 2) {
        $bodyHeight = $("body").height();
        $topBannerHeight = $("#top-banner").height();
        $containerHeight = $bodyHeight - ($topBannerHeight);
        $viewAndKeithPictureContainer.height($containerHeight);

        if (!lyricsShowing) {
            $keithLayoutPicture.show();
        }
    } else {
        $viewAndKeithPictureContainer.css("height", "initial");
    }
}




/******************   SETS PAGE-SIZE VARIABLE and CALLS DATABASE  **************************/
$(document).ready(function () {
    pageSize = $("#page-size").css("z-index");
    SetHeightViewaAndPicture();
    CallDatabase();
});

$(window).resize(function () {
    pageSize = $("#page-size").css("z-index");
    SetHeightViewaAndPicture();

    if (lyricsShowing) {
        PositionLyrics();
    }
});



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

function OnSuccess(data) {
    songsDB = data;
    LoopSnippets();
}

function OnError(data) {

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