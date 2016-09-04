$(function(){
	'use strict';

	/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
		var navbar = document.getElementsByClassName("navi")[0];
		$('#nav--icon').on( "click", function() {
	    	navbar.classList.toggle("responsive");
		});

});