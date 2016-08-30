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




/************   SETS LOCATION OF NAVIGATION ACCORDING TO SCREEN SIZE   *******************/

var $navigationSelectorsContainer = $("<div class='navigation-selectors-container'></div>")

var $homeSelector = $("<li class='navigation-selector'><a href='#'>Home</a></li>");
var $musicSelector = $("<li class='navigation-selector'><a href='#'>Music</a></li>");
var $aboutSelector = $("<li class='navigation-selector'><a href='#'>About</a></li>");

$navigationSelectorsContainer.append($homeSelector);
$navigationSelectorsContainer.append($musicSelector);
$navigationSelectorsContainer.append($aboutSelector);

$(window).on("resize", function () {
    if ($("#keith-layout-picture").css("width") == "300px") {
        $("#keith-layout-picture").after($navigationSelectorsContainer);
    } else {
        $("#top-banner").after($navigationSelectorsContainer);
    }
}).resize();



/************   AJAX: SHOWS LYRIC SNIPPETS   **************************************************/

var snippetRequest = new XMLHttpRequest();
var $snippetContainer = $("#snippet-container");
var snippetIndex = 0;
var snippets;
var statusHTML;

snippetRequest.onreadystatechange = function () {

    if (snippetRequest.readyState === 4) {
        snippets = JSON.parse(snippetRequest.responseText);

        var loopSnippets = function () {

            $snippetContainer.fadeOut("slow", function () {
                $snippetContainer.empty();

                if (snippetIndex < snippets.length - 1) {
                    snippetIndex += 1;
                } else {
                    snippetIndex = 0;
                }

                statusHTML = snippets[snippetIndex].title;
                $snippetContainer.append("<p>" + statusHTML + "</p>");
                $snippetContainer.fadeIn("slow");
            })};

        loopSnippets();

        setInterval(function () { loopSnippets(); }, 3000);
    }
};

snippetRequest.open("GET", "json/lyric-snippets.json");
snippetRequest.send();