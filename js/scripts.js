console.log('hello, world');

var hello = "hello you";
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
$(function() {
    'use strict';
    /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
    var navbar = document.getElementsByClassName("c-nav")[0];
    $('#js-icon').on("click", function() {
        navbar.classList.toggle("responsive");
    });

});