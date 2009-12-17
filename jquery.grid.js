/**

Activate the grid by calling it on a jquery object:

  $('body').grid({col: 50, gutter: 10});

Then use shift+h and shift+v to toggle it on and off.

author: Myles Byrne (myles.id.au)
version: 0.9 (2009-12-17)
latest source at: http://github.com/quackingduck/jquery.grid.js

**/

(function($) {
  
$.fn.grid = function(settings) {
  var container = this;
  var settings = settings || {};
  
  var colWidth = settings.col || 60, 
      gutterWidth = settings.gutter || 20,
      lineHeight = settings.line || 20;

  var gridAttribs = {
    position: 'absolute',
    top: 0, right: 0, bottom: 0, left: 0,
    zIndex: 1, 
    opacity: 0.6
  }
  
  // grid containers are forcibly re-drawn when the shorcut key is pressed
  
  function hGrid(toggle) {
    container.find('> .hGrid').remove();
    if (!toggle) return false;

    var hGrid = 
      $('<div class="hGrid">').css(gridAttribs).appendTo(container);

    var pos = 0,
        containerHeight = container.height(),
        alt = false;
    while (pos < containerHeight) {
      $('<div class="hRow">').css({
        position: 'absolute', left: 0, right: 0, top: pos,
        height: lineHeight,
        background: (alt ? '#eee' : '#ddd')
      }).appendTo(hGrid);
      pos += lineHeight;
      alt = !alt;
    }

    return true;
  }

  function vGrid(toggle) {
    container.find('> .vGrid').remove();
    if (!toggle) return false;
      
    var vGrid = 
      $('<div class="vGrid">').css(gridAttribs).appendTo(container);
      
    var pos = 0,
        containerWidth = container.width(),
        drawCol = false;
    while (pos < containerWidth) {
      if (drawCol) {
        $('<div class="vColumn">').css({
          position: 'absolute', background: '#ddd',
          top: 0, bottom: 0, left: pos, width: colWidth
        }).appendTo(vGrid);
        pos += colWidth;
      } else {
        $('<div class="vGutter">').css({
          position: 'absolute', background: '#eee',
          top: 0, bottom: 0, left: pos, width: gutterWidth
        }).appendTo(vGrid);
        pos += gutterWidth;
      }
      drawCol = !drawCol;
    }
    return true;
  }
  
  hGrid(eval(cookieVal('hGrid')));
  vGrid(eval(cookieVal('vGrid')));
  
  function cookieVal(name) { 
    return document.cookie.indexOf(name+'=true') >= 0;
  }
  
  function toggleCookie(name) {
    var val = !cookieVal(name);
    document.cookie = name+'='+val;
    return val;
  }
  
  // detect if the container height has changed and re-draw the horiz grid
  var currentContainerHeight = container.height();
  setInterval(function() {
    if (currentContainerHeight === container.height() ||
        !cookieVal('hGrid')) return;
    currentContainerHeight = container.height();
    hGrid(true);
  }, 500);

  $(document).keydown(function(event){
    var hKey = 72, vKey = 86;
    if (event.shiftKey) switch(event.keyCode) {
      case hKey: 
        hGrid(toggleCookie('hGrid')); break;
      case vKey:
        vGrid(toggleCookie('vGrid')); break;
    }
  });
}

})(jQuery);