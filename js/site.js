//site.js
function remover() {
  $('body').removeClass('home_page work_page social_page contact_page');
}

$(document).ready(function(){


  $('nav.main_nav a').on('click', function(e){

    if ( $(window).outerWidth() <= 640 ) {

      e.preventDefault;

      if ( $('body').hasClass('nav_is_visible') ) {

        remover();
        var className = $(this).parent('li').attr('class');
        $('body').addClass(className + '_page');
        $('body').toggleClass('nav_is_visible');

      }
      else {

        $('body').toggleClass('nav_is_visible');

      }

    }
    else {

      remover();
      var className = $(this).parent('li').attr('class');
      $('body').addClass(className + '_page');

    }
  });


}); //end document