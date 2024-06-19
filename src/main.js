import "./style.scss"

import PointerListener from "./PointerListener.ts";

let root = document.querySelector( "#root" );
 root.width = window.innerWidth;
 root.height = window.innerHeight;
let listener = new PointerListener( root );
const ctx = root.getContext( "2d" );


const getColor = ( str ) => {
  let colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
  ];

  str = str.toString();

  // convert str to a number between 0 and colors.length
  let index = 0;
  for ( let i = 0; i < str.length; i++ ) {
    index += str.charCodeAt( i );
  }

  index = index % colors.length;
  
  return colors[ index ];
}

listener.addEventListener( "pointerdrag", ( event ) => {
  
  // clear the canvas
  ctx.clearRect( 0, 0, root.width, root.height );

  for ( let pointer of event.pointers ) {

    ctx.fillStyle = getColor( pointer.id );

    ctx.beginPath();
    ctx.arc( pointer.x, pointer.y, 10, 0, Math.PI * 2 );
    ctx.fill();
    ctx.closePath();
  }
  
} );