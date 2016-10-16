﻿

/***********************************   VARIABLES   ***************************************************************/

var
    youTubeLinks,
    currentYouTubeLink,
    interval,
    songListShowing = false;

/***********************************************************************************/
//$lyricAndControlsContainer.hide();
/************************************   AJAX   ********************************************/

/**********   GetLoopSongs()   *********************/

function GetLoopSongs() {
    $.ajax({
        async: true,
        type: "GET",
        url: "/Data/GetLoopSongs",
        data: "{}",
        dataType: "json",
        success: OnSuccessLoopSongs,
        error: OnErrorLoopSongs
    });
}

function OnSuccessLoopSongs(data) {
    songsDB = data.sort(function (a, b) { return a.title.localeCompare(b.title); });
    LoopSnippets(true);
}

function OnErrorLoopSongs(data) {

}


/**********   GetYouTubeLinks()   ******************/

function GetYouTubeLinks() {
    $.ajax({
        async: true,
        type: "GET",
        url: "/Data/GetYouTubeLinks",
        data: "{}",
        dataType: "json",
        success: OnSuccessYouTubeLinks,
        error: OnErrorYouTubeLinks
    });
}

function OnSuccessYouTubeLinks(data) {
    youTubeLinks = data;
    FillYouTubeContainer(0);
    currentYouTubeLink = 0;
}

function OnErrorYouTubeLinks(data) {

}

$(document).ready(function () {
    GetLoopSongs();
    GetYouTubeLinks();
});



/***********************************   LYRIC AND SONG FUNCTIONS   **********************************************/

function LoopSnippets(loop) {
    var index = 0;
    var $snippetContainer = $("#snippet-container");

    var loopSnippets = function () {

        $snippetContainer.fadeOut("slow", function () {
            $snippetContainer.empty();
            $snippetContainer.css("max-height", "initial");
            $snippetContainer.css("-ms-overflow-style", "-ms-autohiding-scrollbar");
            var $lyric;
            var $title;
            var $newSnippet = $("<div></div>");

            if (index < songsDB.length - 1) {
                index += 1;
            } else {
                index = 0;
            }

            $lyric = $("<p id='snippet-lyric'>" + songsDB[index].snippet + "</p>");
            $title = $("<p id='snippet-title'>" + songsDB[index].title + "</p>");
            $newSnippet.append($lyric);
            $newSnippet.append($title);
            $newSnippet.attr("id", "snippet" + index);
            $newSnippet.click(ShowLyrics);
            $snippetContainer.append($newSnippet);
            $snippetContainer.fadeIn("slow");
        });
    };

    if (loop) {
        loopSnippets();
        interval = setInterval(loopSnippets, 8000);
    } else {
        clearInterval(interval);
    }
}

function ShowSongList() {
    var $snippetContainer = $("#snippet-container");
    var $songListContainer = $("<div id='song-list-container'></div>");
    var $songList = $("<ul></ul>");

    for (var index = 0; index < songsDB.length; index++) {
        var $newListItem = $("<li class='song-list-items' id='song" + index + "'>" + songsDB[index].title + "</li>");
        $newListItem.click(ShowLyrics);
        $songList.append($newListItem);
    }

    $songListContainer.append($songList);

    LoopSnippets(false);

    $snippetContainer.fadeOut("fast", function () {
        $snippetContainer.empty();
        $snippetContainer.css("max-height", "300px");
        $snippetContainer.css("overflow-y", "auto");
        $snippetContainer.append($songListContainer);
        $snippetContainer.fadeIn("fast");
    });

}

$("#lyric-button").click(function () {
    if ($("#snippet-container").css("opacity") < 1) {
        return;
    }

    if (!songListShowing) {
        ShowSongList();
        songListShowing = true;
        $(this).text("Hide Song List");
    } else {
        $("#snippet-container").fadeOut("fast", function () {
            LoopSnippets(true);
            songListShowing = false;
        });
        $(this).text("Show Song List");
    }
});

function ShowLyrics() {
    var index = parseInt($(this).attr("id").replace(/[^\d.]/g, ''));
    var $snippetContainer = $("#snippet-container");
    var $viewAndKeithPictureContainer = $("#view-and-keith-picture-container");
    var $keithLayoutPicture = $("#keith-layout-picture");
    var $lyricContainer = $("<div id='lyric-container'></div>");
    var songMP3 = songsDB[index].audioFileMP3.toString();
    var songOGG = songsDB[index].audioFileOGG.toString();

    var $exitIcon = $("<p id='exit-icon'>X</p>");
    $exitIcon.click(CloseLyricContainer);
    var $audioAndExitDiv = $("<div id='audio-and-exit'><audio id='audio' controls><source src='" + songMP3 + "' type='audio/mpeg'/><source src='" + songOGG + "' type='audio/ogg'/><p>Your browser does not support HTML5 audio.</p></audio></div>");
    $audioAndExitDiv.append($exitIcon);

    var $titleInLyrics = $("<p id='title-in-lyrics'>" + songsDB[index].title + "</p>");
    var $lyrics = $("<p>" + songsDB[index].lyrics + "</p>");
    $lyricContainer.append($titleInLyrics);
    $lyricContainer.append($lyrics);

    $lyricAndControlsContainer.empty();
    $lyricAndControlsContainer.append($audioAndExitDiv);
    $lyricAndControlsContainer.append($lyricContainer);

    if (pageSize == 1) {
        $("#lyric-button").after($lyricAndControlsContainer);
        $lyricAndControlsContainer.fadeIn("fast");
    }

    if (pageSize >= 2) {
        $keithLayoutPicture.fadeOut("fast", function () {
            $viewAndKeithPictureContainer.prepend($lyricAndControlsContainer);
            $lyricAndControlsContainer.fadeIn("fast");
            SetHeightViewaAndPicture();
        });
    }

    lyricsShowing = true;
}

function CloseLyricContainer() {
    var $keithLayoutPicture = $("#keith-layout-picture");
    lyricsShowing = false;

    if (pageSize == 1) {
        $lyricAndControlsContainer.fadeOut("fast", function () {
            $lyricAndControlsContainer.empty();
            console.log(lyricsShowing);
        });
    }

    if (pageSize >= 2) {
        $lyricAndControlsContainer.fadeOut("fast", function () {
            $lyricAndControlsContainer.empty();
            $keithLayoutPicture.fadeIn("fast");
        });
    }
}


/*****************   POSITION LYRICS ON RESIZE  *****************************/

function PositionLyrics() {
    var $snippetContainer = $("#snippet-container");
    var $viewAndKeithPictureContainer = $("#view-and-keith-picture-container");
    var $keithLayoutPicture = $("#keith-layout-picture");

    var audio = document.getElementById("audio");
    var isPlaying = false;

    if (audio.duration > 0 && !audio.paused) {
        isPlaying = true;
    }

    if (pageSize == 1) {
        if (page == "index") {
            $("#lyric-button").after($lyricAndControlsContainer);
        } else if (page == "about") {
            $("#about-container").after($lyricAndControlsContainer);
            $lyricAndControlsContainer.css("margin-bottom", 100 + "px");
        }
    }

    if (pageSize >= 2) {
        $keithLayoutPicture.hide();
        $viewAndKeithPictureContainer.prepend($lyricAndControlsContainer);
    }

    if (isPlaying) {
        audio.play();
    }
}



/****************************   FillYouTubeContainer()   ***********************************/

function FillYouTubeContainer(index) {
    var $youtTubeLinkHeadline = $("#youtube-link-headline");
    var $youTubeLinkUrl = $("#youtube-link-url");
    var $youTubeLinkCaption = $("#youtube-link-caption");

    $youtTubeLinkHeadline.html(youTubeLinks[index].headline);
    $youTubeLinkUrl.attr("src", youTubeLinks[index].url);
    $youTubeLinkCaption.html(youTubeLinks[index].caption);
}


/************************   SLIDE YOUTUBE LINKS   ******************************************/
$("#youtube-link-left-button").click(function () {
    SlideYouTubeLinks("left");    
});

$("#youtube-link-right-button").click(function () {
    SlideYouTubeLinks("right");
});

function SlideYouTubeLinks(direction) {
    var $youTubeSlider = $("#youtube-slider");



    if (direction == "left") {
        if (currentYouTubeLink == 0) {
            currentYouTubeLink = youTubeLinks.length - 1;
        } else {
            currentYouTubeLink--;
        }

        $youTubeSlider.animate({ left: "-500px" }, function () {
            $youTubeSlider.css("visibility", "hidden");
            FillYouTubeContainer(currentYouTubeLink);
        });

        $youTubeSlider.animate({ left: "500px" }, "fast", function () {
            $youTubeSlider.css("visibility", "visible");
            $("#youtube-slider").animate({ left: "-=500px" });
        });
    } else {
        if (currentYouTubeLink >= (youTubeLinks.length - 1)) {
            currentYouTubeLink = 0;
        } else {
            currentYouTubeLink++;
        }

        $youTubeSlider.animate({ left: "500px" }, function () {
            $youTubeSlider.css("visibility", "hidden");
            FillYouTubeContainer(currentYouTubeLink);
        });

        $youTubeSlider.animate({ left: "-500px" }, "fast", function () {
            $youTubeSlider.css("visibility", "visible");
            $("#youtube-slider").animate({ left: "+=500px" });
        });
    }
}


/***********************   ON PAGE UNLOAD   ************************************/
//$(window).unload(function () {
//    //bring up popup window with audio to continue playing song if playing and new page loading
//});