$(document).ready(function() {
    $('.c-menu__ul').addClass('js');
    var cmenu = $('.c-menu'),
        menutoggle = $('.c-menu-toggle'),
        menuSelector;

    menutoggle.on("click", function(e) {
        var menuSelect = getMenuSelector(this);
        var menuFound = $(".c-menu").find("[data-menu-selector='" + menuSelect + "']");
        $(menuFound[0]).toggleClass('active');
        menutoggle.toggleClass('active');
        return false;
    });

    var getMenuSelector = function(e) {
        return $(e).data("menu-selector");
    };
});