//site.js
//functions
//page controls 

var posx = 0;
var posy = 0;
function pageController(e) {
  switch(e.which) {

      case 37: // left
        posx= posx-1;
      break;

      case 38: // up
        posy= posy+1;
      break;

      case 39: // right
        posx= posx+1;
      break;

      case 40: // down
        posy= posy-1;
      break;

      default: return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)

  if (posx<0) {posx=0}
  if (posx>5) {posx=5}

    if (posy>0) {posy=0}
    if (posy<-2) {posy=-2}

  x=posx*100;
  y=posy*100;



  $('.site-container').css({
   transform: 'translate('+-x+'% ,'+y+'% )',
   MozTransform: 'translate('+-x+'% ,'+y+'% )',
   WebkitTransform: 'translate('+-x+'% ,'+y+'% )',
   msTransform: 'translate('+-x+'% ,'+y+'% )'
 })
}


$(window).load(function(){
  $('body').addClass('window_load');
}); //end window load


$(document).keydown(function(e){

  pageController(e);

});

$(document).ready(function(){






}); //end document ready