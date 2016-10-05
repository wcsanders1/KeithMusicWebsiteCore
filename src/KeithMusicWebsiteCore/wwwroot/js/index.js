var $lyricAndControlsContainer = $("#lyric-and-controls-container");
$lyricAndControlsContainer.hide();


/***********************************   LYRIC AND SONG FUNCTIONS   **********************************************/

function LoopSnippets() {
    var index = 0;
    var $snippetContainer = $("#snippet-container");

    var loopSnippets = function () {

        $snippetContainer.fadeOut("slow", function () {
            $snippetContainer.empty();
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

    loopSnippets();

    setInterval(function () { loopSnippets(); }, 8000);
}

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
        $snippetContainer.after($lyricAndControlsContainer);
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

    console.log(pageSize);
    lyricsShowing = false;
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
        $snippetContainer.after($lyricAndControlsContainer);
    }

    if (pageSize >= 2) {
        $keithLayoutPicture.hide();
            $viewAndKeithPictureContainer.prepend($lyricAndControlsContainer);
    }

    if (isPlaying) {
        audio.play();
    }
}