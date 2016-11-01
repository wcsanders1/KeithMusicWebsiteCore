/***********************************   VARIABLES   ***************************************************************/

var
    youTubeLinks,
    currentYouTubeLink,
    interval;

songListShowing = false;

/*******************  audio controls  ******************************/

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

$(window).resize(function () {
    IEHack();
});



/***********************************   LYRIC AND SONG FUNCTIONS   **********************************************/

function LoopSnippets(loop) {
    var max = Math.floor(songsDB.length - 1);
    var index = Math.floor((Math.random() * max));

    var $snippetContainer = $("#snippet-container");

    var loopSnippets = function () {

        if (songListShowing) {
            return;
        } else {
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
        }
    };

    if (loop) {
        loopSnippets();
        for (var i = 0; i < 100; i++) {
            window.clearInterval(i);
        }
        interval = setInterval(loopSnippets, 8000);
    } else {
        for (var i = 0; i < 100; i++) {
            window.clearInterval(i);
        }
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

    //LoopSnippets(false);

    $snippetContainer.fadeOut("fast", function () {
        $snippetContainer.empty();
        $snippetContainer.css("max-height", "275px");
        $snippetContainer.css("overflow-y", "auto");
        $snippetContainer.append($songListContainer);
        $snippetContainer.fadeIn("fast");
    });

}

$("body").on("click", "#lyric-button", function () {
    if ($("#snippet-container").css("opacity") < 1) {
        return;
    }

    if (!songListShowing) {
        ClearAllIntervals();
        ShowSongList();
        songListShowing = true;
        $("#lyric-button").text("Hide Song List");
    } else {
        $("#snippet-container").fadeOut("fast", function () {
            ClearAllIntervals();
            songListShowing = false;
            LoopSnippets(true);
        });
        $("#lyric-button").text("Show Song List");
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
    var $audioAndExitDiv = $("<div id='audio-and-exit'><audio id='audio' onended='OnEndSong()'><source id='mp3-src' src='" + songMP3 + "' type='audio/mpeg'/><source id='ogg-src' src='" + songOGG + "' type='audio/ogg'/><p>Your browser does not support HTML5 audio.</p></audio></div>");
    $audioAndExitDiv.append($audioControls);

    //$audioAndExitDiv.append($exitIcon);

    var $titleInLyrics = $("<p id='title-in-lyrics'>" + songsDB[index].title + "</p>");
    var $lyrics = $("<p id='lyrics-of-song'>" + songsDB[index].lyrics + "</p>");
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
    currentSong = index;

    $("#song-time-played").text("0:00");
    $("#audio").bind("loadedmetadata", function () {
        var s = parseInt(this.duration % 60);
        var m = parseInt((this.duration) / 60) % 60;
        if (s < 10) {
            s = "0" + s;
        }
        this.volume = parseFloat(($("#volume-bar").val()) / 10)
        $("#song-length").text(m + ":" + s);
    });

    ResetProgressBar();
    ResetPlayButton();
}

function CloseLyricContainer() {
    var $keithLayoutPicture = $("#keith-layout-picture");
    lyricsShowing = false;

    if (pageSize == 1) {
        $lyricAndControlsContainer.fadeOut("fast", function () {
            $lyricAndControlsContainer.empty();
        });
    }

    if (pageSize >= 2) {
        $lyricAndControlsContainer.fadeOut("fast", function () {
            $lyricAndControlsContainer.empty();
            $keithLayoutPicture.fadeIn("fast");
        });
    }

    var volumeBar = document.getElementById("volume-bar");
    var volumeIcon = $("#volume-icon");
    volumeBar.value = 5;
    volumeIcon.removeClass("fa-volume-off fa-volume-up");
    volumeIcon.addClass("fa-volume-down");
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
        } else if (page == "news") {
            $("#past-news").after($lyricAndControlsContainer);
            $lyricAndControlsContainer.css("margin-bottom", 100 + "px");
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

function IEHack() {
    //var $youtTubeLinkHeadline = $("#youtube-link-headline");
    //var $youTubeLinkUrl = $("#youtube-link-url");
    //var $youTubeLinkCaption = $("#youtube-link-caption");

    //if (pageSize > 2) {
    //    $youtTubeLinkHeadline.width(500);
    //    $youTubeLinkUrl.width(500);
    //    $youTubeLinkCaption.width(500);
    //} else {
    //    $youtTubeLinkHeadline.width(300);
    //    $youTubeLinkUrl.width(300);
    //    $youTubeLinkCaption.width(300);
    //}
    $ieHackDiv = $("<div></div>");
    $ieHackDiv.height(100).width(100);
    $("#view-container").append($ieHackDiv);
    $ieHackDiv.fadeOut("fast");
}


/************************   SLIDE YOUTUBE LINKS   ******************************************/


var sliding = false;

function SlideYouTubeLinks(direction) {
    var $youTubeSlider = $("#youtube-slider");

    if (sliding) {
        return;
    }

    if (direction == "left") {
        sliding = true;
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
            sliding = false;
        });
    } else {
        sliding = true;
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
            sliding = false;
        });
    }
}