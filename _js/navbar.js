$(function() {
    'use strict';
    /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
    var navbar = document.getElementsByClassName("c-nav")[0];
    $('#js-icon').on("click", function() {
        navbar.classList.toggle("responsive");
    });

});