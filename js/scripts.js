console.log('hello, world');
$(function(){
	'use strict';

	/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
		var navbarIcon = document.getElementById('nav--icon');
		var navbar = document.getElementsByClassName("nav")[0];
		navbarIcon.onclick = function() {
	    	navbar.classList.toggle("responsive");
		};

});