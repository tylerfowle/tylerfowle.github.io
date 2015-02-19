//site.js

$(document).ready(function(){

	$('.sidebar nav a').on('click', function(e){
		e.preventDefault;

		$('.sidebar nav a').removeClass('active');
		$(this).addClass('active');

		$('.page').hide();
		var x = $(this).attr('href');
		$(x).slideToggle();
	});

});