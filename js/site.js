//site.js

$(document).ready(function(){
	$('.sidebar nav a').on('click', function(){
		$('.sidebar nav a').removeClass('active');
		$(this).addClass('active');
	});
});