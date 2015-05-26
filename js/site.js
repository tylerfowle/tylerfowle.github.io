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

  $('.skills a').on('click',function(e){
    e.preventDefault();
  });

  $('.has-bg').each(function(){
    $(this).find('img').hide();
    var bgsrc = $(this).find('img').attr('src');
    $(this).css('background', 'url("' + bgsrc + '") 50% 50% / cover no-repeat');
  });

  $('.has-bg-screen').each(function(){
    $(this).find('img').hide();
    var bgsrc = $(this).find('img').attr('src');
    $(this).addClass('screen').css('background', 'url("' + bgsrc + '") 50% 50% / cover no-repeat');
  });

  $('.has-bg-collection li').each(function(){
    $(this).find('img').hide();
    var bgsrc = $(this).find('img').attr('src');
    $(this).addClass('screen').css('background', 'url("' + bgsrc + '") 50% 50% / cover no-repeat');
  });

}); //end document ready