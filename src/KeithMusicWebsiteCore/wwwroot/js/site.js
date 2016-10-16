/// <reference path="../../views/app/news.cshtml" />
/// <reference path="../../views/app/news.cshtml" />
/************************   GLOBAL VARIABLES   *********************************/
var pageSize = $("#page-size").css("z-index");
var songsDB;
var lyricsShowing = false;
var initialViewContainerHeight;
var page;
var $lyricAndControlsContainer = $("#lyric-and-controls-container");


/************   SETS HEIGHT OF #view-and-keith-picture-container IN LAYOUT   ******************************/

function SetHeightViewaAndPicture() {
    var $topBannerHeight;
    var $windowHeight;
    var $viewAndKeithPictureContainer = $("#view-and-keith-picture-container");
    var $keithLayoutPicture = $("#keith-layout-picture");
    var $lyricContainer = $("#lyric-container");
    var $audioAndExit = $("#audio-and-exit");
    var $containerHeight;

    if (pageSize >= 2) {
        $windowHeight = $(window).height();
        $topBannerHeight = $("#top-banner").height();
        $containerHeight = $windowHeight - ($topBannerHeight);
        $viewAndKeithPictureContainer.height($containerHeight);

        if (!lyricsShowing) {
            $keithLayoutPicture.show();
        } else {           
            $lyricContainer.height($viewAndKeithPictureContainer.height() - $audioAndExit.height());
        }
    } else {
        if (lyricsShowing) {
            $lyricContainer.height(350);
        }
        $viewAndKeithPictureContainer.height("auto");
        $("#not-footer-container").height("auto");
        $("#snippet-container").height("auto");
        $viewAndKeithPictureContainer.height("initial");
        $("#not-footer-container").height("initial");
        $("#snippet-container").height("initial");
    }
}




/******************   SETS PAGE-SIZE VARIABLE and CALLS DATABASE  **************************/
$(document).ready(function () {
    pageSize = $("#page-size").css("z-index");
    SetHeightViewaAndPicture();

    if (page == "index") {
        $("#index").addClass("current-page");
    } else if (page == "news") {
        $("#news").addClass("current-page");
    } else if (page == "about") {
        $("#about").addClass("current-page");
    }
});

$(window).resize(function () {
    pageSize = $("#page-size").css("z-index");

    if (lyricsShowing) {
        PositionLyrics();
    }

    SetHeightViewaAndPicture();
});

$("#index").click(function () {
    console.log("onindex" + lyricsShowing);
    if (lyricsShowing && pageSize == 1) {
        //var $lyricAndControlsContainer = $("#lyric-and-controls-container");
        var audio = document.getElementById("audio");
        var isPlaying = false;

        if (audio.duration > 0 && !audio.paused) {
            isPlaying = true;
        }


        $("body").prepend($lyricAndControlsContainer);
        $("#view-container").empty();
        $("#view-container").load("/App/PartialIndex", function () {
            $("#lyric-button").after($lyricAndControlsContainer);
            if (isPlaying) {
                audio.play();
            }
        });
    } else {
        $("#view-container").empty();
        $("#view-container").load("/App/PartialIndex", function () {
            window.resizeBy(-1, 1);
        });
    }
    if (lyricsShowing) {
        PositionLyrics();
    }
    page = "index";
    HighlightNavigation(page);
    //SetHeightViewaAndPicture();
});

$("#news").click(function () {
    if (lyricsShowing && pageSize == 1) {
        //var $lyricAndControlsContainer = $("#lyric-and-controls-container");
        var audio = document.getElementById("audio");
        var isPlaying = false;

        if (audio.duration > 0 && !audio.paused) {
            isPlaying = true;
        }

        $("body").append($lyricAndControlsContainer);
        $("#view-container").empty();
        $("#view-container").load("/App/News", function () {
            $("#view-container").append($lyricAndControlsContainer);
            if (isPlaying) {
                audio.play();
            }
        });
    } else {
        $("#view-container").empty();
        $("#view-container").load("/App/News");
    }
    page = "news";
    HighlightNavigation(page);
    //SetHeightViewaAndPicture();
});

$("#about").click(function () {
    if (lyricsShowing && pageSize == 1) {
        //var $lyricAndControlsContainer = $("#lyric-and-controls-container");
        var audio = document.getElementById("audio");
        var isPlaying = false;

        if (audio.duration > 0 && !audio.paused) {
            isPlaying = true;
        }

        $("body").append($lyricAndControlsContainer);
        $("#view-container").empty();
        $("#view-container").load("/App/About", function () {
            $("#about-container").after($lyricAndControlsContainer);
            $lyricAndControlsContainer.css("margin-bottom", 100 + "px");
            if (isPlaying) {
                audio.play();
            }
        });
    } else {
        $("#view-container").empty();
        $("#view-container").load("/App/About", function () {
            window.resizeBy(-1, 1);
        });
    }
    if (lyricsShowing) {
        PositionLyrics();
    }
    page = "about";
    HighlightNavigation(page);
    //SetHeightViewaAndPicture();
});

function HighlightNavigation(currentPage) {
    if (currentPage == "index") {
        $("#index").addClass("current-page");
        $("#news").removeClass("current-page");
        $("#about").removeClass("current-page");
    } else if (page == "news") {
        $("#index").removeClass("current-page");
        $("#news").addClass("current-page");
        $("#about").removeClass("current-page");
    } else if (page == "about") {
        $("#index").removeClass("current-page");
        $("#news").removeClass("current-page");
        $("#about").addClass("current-page");
    }
}