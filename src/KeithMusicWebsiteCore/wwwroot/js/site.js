/// <reference path="../../views/app/news.cshtml" />
/// <reference path="../../views/app/news.cshtml" />
/************************   GLOBAL VARIABLES   *********************************/
var pageSize = $("#page-size").css("z-index");
var songsDB;
var lyricsShowing = false;
var initialViewContainerHeight;
var page;
var currentSong;
var $lyricAndControlsContainer = $("#lyric-and-controls-container");
var $audioControls = $("<div id='audio-container'><div id='progress-container'><div id='progress-label'><p id='song-time-played'>0:00</p><p id='song-length'>1:23</p></div><div id='progress-bar'><span id='progress'></span></div></div><div id='volume-container'><div id='volume-icon' class='fa fa-volume-up' aria-hidden='true'></div><input id='volume-bar' type='range' min='0' max='10'/></div><div id='audio-buttons-container'><div id='play-pause-button' class='audio-buttons'><p class='fa fa-play' aria-hidden='true'></p></div><div id='stop-button' class='audio-buttons'><p class='fa fa-stop' aria-hidden='true'></p></div><div id='back-button' class='audio-buttons'><p class='fa fa-step-backward' aria-hidden='true'></p></div><div id='forward-button' class='audio-buttons'><p class='fa fa-step-forward' aria-hidden='true'></p></div><div id='exit-button' class='audio-buttons'><p class='fa fa-times-circle' aria-hidden='true'></p></div></div></div>");


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


/**************************    AUDIO CONTROLS   *********************************/


$("body").on("click", "#play-pause-button", function () {
    var audioControl = document.getElementById("audio");
    if (audioControl.paused) {
        audioControl.play();
        ShowDuration();
        $("#play-pause-button p").addClass("fa-pause");
        $("#play-pause-button p").removeClass("fa-play");
    } else {
        audioControl.pause();
        $("#play-pause-button p").addClass("fa-play");
        $("#play-pause-button p").removeClass("fa-pause");
    }
});

$("body").on("click", "#stop-button", function () {
    var audioControl = document.getElementById("audio");

    audioControl.pause();
    audioControl.currentTime = 0;
    ResetPlayButton();
    ResetProgressBar();
});

$("body").on("click", "#back-button", function () {
    $("#song-time-played").text("0:00");
    ChangeSong("back");
    ResetProgressBar();
});

$("body").on("click", "#forward-button", function () {
    $("#song-time-played").text("0:00");
    ChangeSong("forward");
    ResetProgressBar();
});

$("body").on("click", "#exit-button", function () {
    ResetPlayButton();
    ResetProgressBar();
    CloseLyricContainer();
});

$("body").on("click", "#progress-bar", function (e) {
    var audioElement = document.getElementById("audio");
    var leftOffset = e.pageX - $(this).offset().left;
    var songPercents = leftOffset / $("#progress-bar").width();
    audioElement.currentTime = songPercents * audioElement.duration;
    
});

$("body").on("input", "#volume-bar", function () {
    console.log("changing");
    var audioElement = document.getElementById("audio");
    audio.volume = parseFloat(this.value / 10);
});

function ShowDuration() {
    var $audioControl = $("#audio");
    
    $audioControl.bind("timeupdate", function () {
        var s = parseInt(this.currentTime % 60);
        var m = parseInt((this.currentTime) / 60) % 60;
        if (s < 10) {
            s = "0" + s;
        }
        $("#song-time-played").text(m + ":" + s);
        var value = 0;
        if (this.currentTime > 0) {
            value = Math.floor((100 / this.duration) * this.currentTime);
        }
        $("#progress").css("width", value + "%");
    });
}

function ResetPlayButton() {
    $("#play-pause-button p").addClass("fa-play");
    $("#play-pause-button p").removeClass("fa-pause");
}

function ResetProgressBar() {
    $("#progress").css("width", "0");
}

function ChangeSong(direction) {
    var audioControl = document.getElementById("audio");

    if (direction == "back") {
        if (currentSong == 0) {
            currentSong = (songsDB.length - 1);
        } else {
            currentSong--;
        }
    } else if (direction == "forward") {
        if (currentSong == (songsDB.length - 1)) {
            currentSong = 0;
        } else {
            currentSong++;
        }
    }

    var songMP3 = songsDB[currentSong].audioFileMP3.toString();
    var songOGG = songsDB[currentSong].audioFileOGG.toString();

    audioControl.pause();
    ResetPlayButton();
    
    $("#mp3-src").attr("src", songMP3);
    $("#ogg-src").attr("src", songOGG);
    $("#title-in-lyrics").html(songsDB[currentSong].title);
    $("#lyrics-of-song").html(songsDB[currentSong].lyrics);

    audioControl.load();
}