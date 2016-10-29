/// <reference path="../../views/app/news.cshtml" />
/// <reference path="../../views/app/news.cshtml" />
/************************   GLOBAL VARIABLES   *********************************/
var pageSize = $("#page-size").css("z-index");
var songsDB;
var lyricsShowing = false;
var initialViewContainerHeight;
var page;
var currentSong;
var songListShowing = false;
//var interval;
var $lyricAndControlsContainer = $("#lyric-and-controls-container");
var $audioControls = $("<div id='audio-container'><div id='progress-container'><div id='progress-label'><p id='song-time-played'>0:00</p><p id='song-length'>0:00</p></div><div id='progress-bar'><span id='progress'></span></div></div><div id='volume-container'><div id='volume-icon' class='fa fa-volume-down' aria-hidden='true'></div><input id='volume-bar' type='range' min='0' max='10'/></div><div id='audio-buttons-container'><div id='play-pause-button' class='audio-buttons'><p class='fa fa-play' aria-hidden='true'></p></div><div id='stop-button' class='audio-buttons'><p class='fa fa-stop' aria-hidden='true'></p></div><div id='back-button' class='audio-buttons'><p class='fa fa-step-backward' aria-hidden='true'></p></div><div id='forward-button' class='audio-buttons'><p class='fa fa-step-forward' aria-hidden='true'></p></div><div id='exit-button' class='audio-buttons'><p class='fa fa-times-circle' aria-hidden='true'></p></div></div></div>");


/************   SETS HEIGHT OF #view-and-keith-picture-container IN LAYOUT   ******************************/

function SetHeightViewaAndPicture() {
    pageSize = $("#page-size").css("z-index");
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
    $("#volume-bar").focus();   //this is to hack EDGE oddity
});

$("#index").click(function () {
    ClearAllIntervals();
    songListShowing = false;
    document.title = "Keith Sanders - Music";
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
            GetLoopSongs();
            GetYouTubeLinks();
            $("#lyric-button").after($lyricAndControlsContainer);
            if (isPlaying) {
                audio.play();
            }
        });
    } else {
        $("#view-container").empty();
        $("#view-container").load("/App/PartialIndex", function () {
            GetLoopSongs();
            GetYouTubeLinks();
            window.clearInterval(interval);
            IEHack();
        });
        
            /***********  IE Hack; otherwise, IE won't size the view correctly  *****************/
            //window.clearInterval(interval);
            //$("#view-container").empty();
            //$("#view-container").load("/App/PartialIndex");
            //window.clearInterval(interval);
            //$("#view-container").empty();
            //$("#view-container").load("/App/PartialIndex", function () {

            //});

    }
    if (lyricsShowing) {
        PositionLyrics();
    }
    page = "index";
    HighlightNavigation(page);
});

$("#news").click(function () {
    ClearAllIntervals();
    songListShowing = false;
    document.title = "Keith Sanders - News";
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
            $("#past-news").after($lyricAndControlsContainer);
            $lyricAndControlsContainer.css("margin-bottom", 100 + "px");
            if (isPlaying) {
                audio.play();
            }
        });
    } else {
        $("#view-container").empty();
        $("#view-container").load("/App/News", function () {
            IEHack();
        });
    }
    page = "news";
    HighlightNavigation(page);
    
    //SetHeightViewaAndPicture();
});

$("#about").click(function () {
    ClearAllIntervals();
    songListShowing = false;
    document.title = "Keith Sanders - About";
    if (lyricsShowing && pageSize == 1) {
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
            IEHack();
        });
    }
    if (lyricsShowing) {
        PositionLyrics();
    }
    page = "about";
    HighlightNavigation(page);
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


$("body").on("click touchstart", "#play-pause-button", function () {  //touchstart for iOS
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

$("body").on("click touchstart", "#stop-button", function () {
    var audioControl = document.getElementById("audio");

    audioControl.pause();
    audioControl.currentTime = 0;
    ResetPlayButton();
    ResetProgressBar();
});

$("body").on("click touchstart", "#back-button", function () {
    $("#song-time-played").text("0:00");
    ChangeSong("back");
    ResetProgressBar();
    ResetPlayButton();
});

$("body").on("click touchstart", "#forward-button", function () {
    $("#song-time-played").text("0:00");
    ChangeSong("forward");
    ResetProgressBar();
    ResetPlayButton();
});

$("body").on("click touchstart", "#exit-button", function () {
    ResetPlayButton();
    ResetProgressBar();
    CloseLyricContainer();
});

$("body").on("click touchstart", "#progress-bar", function (e) {
    var audioElement = document.getElementById("audio");
    var leftOffset = e.pageX - $(this).offset().left;
    var songPercents = leftOffset / $("#progress-bar").width();
    audioElement.currentTime = songPercents * audioElement.duration;
    value = Math.floor((100 / audioElement.duration) * audioElement.currentTime);
    $("#progress").css("width", value + "%");
    ShowCurrentTime(audioElement);
});

$("body").on("input change", "#volume-bar", function () {    //ie doesn't support input, so change too
    var audioElement = document.getElementById("audio");
    var icon = $("#volume-icon");
    audio.volume = parseFloat(this.value / 10);

    if (this.value == 0) {
        icon.addClass("fa-volume-off");
        icon.removeClass("fa-volume-down fa-volume-up");
    } else if (this.value > 0 && this.value <= 5) {
        icon.addClass("fa-volume-down");
        icon.removeClass("fa-volume-off fa-volume-up");
    } else if (this.value > 5) {
        icon.addClass("fa-volume-up");
        icon.removeClass("fa-volume-off fa-volume-down");
    }
});

var $tip = $("<p id='tooltip'></p>");

$("body").on("mouseenter", "#progress-bar", function (e) {
    $("body").append($tip);
    $tip.fadeIn("slow");
    $tip.text(GetSongTime($tip, e.pageX));
}).on("mousemove", "#progress-bar", function (e) {
    var mousex = e.pageX - 25;
    var mousey = e.pageY - 50;
    $tip.css({ top: mousey, left: mousex });
    $tip.text(GetSongTime($tip, e.pageX));
}).on("mouseleave", "#progress-bar", function () {
    $tip.remove();
});

function GetSongTime(element, offset) {
    var audioElement = document.getElementById("audio");
    var songDuration = audioElement.duration;

    var leftOffset = offset - $("#progress-bar").offset().left;
    var songPercents = leftOffset / $("#progress-bar").width();
    var songTime = songPercents * songDuration;

    var s = parseInt(songTime % 60);
    var m = parseInt((songTime) / 60) % 60;
    if (s < 10) {
        s = "0" + s;
    }
    return (m + ":" + s);
}

function OnEndSong() {
    var audioElement = document.getElementById("audio");
    
    ChangeSong("forward");
    $("#song-time-played").text("0:00");
    ResetProgressBar();
    audioElement.play();
}

function ShowDuration() {
    $("#audio").bind("timeupdate", function () {
        ShowCurrentTime(this);
        var value = 0;
        if (this.currentTime > 0) {
            value = Math.floor((100 / this.duration) * this.currentTime);
        }
        $("#progress").css("width", value + "%");
    });
}

function ShowCurrentTime(audioElement) {
    var s = parseInt(audioElement.currentTime % 60);
    var m = parseInt((audioElement.currentTime) / 60) % 60;
    if (s < 10) {
        s = "0" + s;
    }
    $("#song-time-played").text(m + ":" + s);
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
    
    $("#mp3-src").attr("src", songMP3);
    $("#ogg-src").attr("src", songOGG);
    $("#title-in-lyrics").html(songsDB[currentSong].title);
    $("#lyrics-of-song").html(songsDB[currentSong].lyrics);

    audioControl.load();
}

function ClearAllIntervals() {
    for (var i = 1; i < 10000; i++) {
        window.clearInterval(i);
    }
}

$("body").on("click dbclick touchstart", "#youtube-link-left-button", function () {
    SlideYouTubeLinks("left");
});

$("body").on("click dbclick touchstart", "#youtube-link-right-button", function () {
    SlideYouTubeLinks("right");
});