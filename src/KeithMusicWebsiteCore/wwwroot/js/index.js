var $lyricAndControlsContainer = $("#lyric-and-controls-container");
$lyricAndControlsContainer.hide();


/***********************************   LYRIC AND SONG FUNCTIONS   **********************************************/

function LoopSnippets() {
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
    var song = songsDB[index].audioFile.toString();

    var $exitIcon = $("<p id='exit-icon'>X</p>");
    $exitIcon.click(CloseLyricContainer);
    var $audioAndExitDiv = $("<div id='audio-and-exit'><audio controls><source id='snippet-song' src='" + song + "'/></audio></div>");
    $audioAndExitDiv.append($exitIcon);

    var $titleInLyrics = $("<p id='title-in-lyrics'>" + songsDB[index].title + "</p>");
    var $lyrics = $("<p>" + songsDB[index].lyrics + "</p>");
    $lyricContainer.append($titleInLyrics);
    $lyricContainer.append($lyrics);

    $lyricAndControlsContainer.empty();
    $lyricAndControlsContainer.append($audioAndExitDiv);
    $lyricAndControlsContainer.append($lyricContainer);

    if (pageSize == 1) {
        //$snippetContainer.after($lyricAndControlsContainer);
        $lyricAndControlsContainer.fadeIn("fast");
    }

    if (pageSize >= 2) {
        $keithLayoutPicture.fadeOut("fast", function () {
            $viewAndKeithPictureContainer.prepend($lyricAndControlsContainer);
            $lyricAndControlsContainer.fadeIn("fast");
        });
    }

    lyricsShowing = true;
}

function CloseLyricContainer() {
    var $keithLayoutPicture = $("#keith-layout-picture");

    if (pageSize == 1) {
        $lyricAndControlsContainer.empty().fadeOut("fast");
    }

    if (pageSize >= 2) {
        $lyricAndControlsContainer.empty().fadeOut("fast", function () {
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

    if (pageSize == 1) {
        $snippetContainer.after($lyricAndControlsContainer);
    }

    if (pageSize >= 2) {
        $keithLayoutPicture.hide();
            $viewAndKeithPictureContainer.prepend($lyricAndControlsContainer);
    }
}