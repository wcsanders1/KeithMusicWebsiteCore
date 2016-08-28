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