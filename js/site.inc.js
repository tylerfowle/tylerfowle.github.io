//site.js
//functions
$(window).load(function(){
  $('body').addClass('window_load');
}); //end window load



$(document).ready(function(){


  $(window).scroll(function() {
    if( $(window).scrollTop() >= 400 ) {
      $('body').addClass('sticky_logo');
    } else {
      $('body').removeClass('sticky_logo');
    }

    if( $(window).scrollTop() >= 100 ) {
      $('body').addClass('fixed_header');
    } else {
      $('body').removeClass('fixed_header');
    }
  });


}); //end document ready