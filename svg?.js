/* 

In theroy, all the col/row divs are unessecary. The same effect could be achieved by dynamically generating an svg background image, urlencoding it, the setting it as the background of a single div using the css background attribute. I can't make that work. Weird rendering issues.

*/

// No worky:
  
var svg = [
  '<?xml version="1.0" standalone="no"?>',
  '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
  '<svg width="20px" height="40px" xmlns="http://www.w3.org/2000/svg" version="1.1">',
  '<rect width="100%" height="50%" style="fill:red" />',
  '</svg>'].join('')

hGrid.css('background', 
  'url(data:image/svg+xml;charset=utf-8,'+ escape(svg) +') repeat-y 100%');
hGrid.css('background-repeat', 'repeat-x');