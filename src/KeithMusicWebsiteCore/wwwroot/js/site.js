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

snippetRequest.onreadystatechange = function () {
    if (snippetRequest.readyState === 4) {
        var snippets = JSON.parse(snippetRequest.responseText);
        var statusHTML = "<ul>";

        for (var i = 0; i < snippets.length; i += 1) {
            console.log(snippets[i].title);
            statusHTML += "<li>" + snippets[i].title + "</li>";
        }
        statusHTML += "</ul>";
        document.getElementById("snippet-container").innerHTML = statusHTML;
    }
};

snippetRequest.open("GET", "json/lyric-snippets.json");
snippetRequest.send();