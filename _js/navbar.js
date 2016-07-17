$(function(){
	'use strict';

	/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
		var navbarIcon = document.getElementById('nav--icon');
		navbarIcon.onclick = function() {
	    	document.getElementsByClassName("nav")[0].classList.toggle("responsive");
		};

});