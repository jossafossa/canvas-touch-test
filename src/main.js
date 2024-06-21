import "./style.scss"

import PointerListener from "./PointerListener.ts";

let root = document.querySelector( "#root" );
 root.width = window.innerWidth;
 root.height = window.innerHeight;
let listener = new PointerListener( root, {
  smooth: 10
} );
const ctx = root.getContext( "2d" );


const getColor = ( str, opacity = 1 ) => {
  let colors = [
    `rgba( 255, 0, 0, ${opacity} )`,
    `rgba( 0, 255, 0, ${opacity} )`,
    `rgba( 0, 0, 255, ${opacity} )`,
    `rgba( 255, 255, 0, ${opacity} )`,
    `rgba( 0, 255, 255, ${opacity} )`,
    `rgba( 255, 0, 255, ${opacity} )`,

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

let colorOffset = 0;
let lastPoints = new Map();

listener.addEventListener( "dragend", ( event ) => {
  console.log( "dragend" );
  lastPoints = new Map();

  colorOffset++;
} );

listener.addEventListener( "drag", ( event ) => {

  // ctx.fillStyle = "rgba( 255,255,255, 0.1 )";
  
  // clear the canvas
  // ctx.fillRect( 0, 0, root.width, root.height );


  let pointers = event.pointers ?? [];

  for ( let pointer of pointers ) {

let color = getColor( pointer.id + colorOffset );
    ctx.fillStyle = color

    ctx.beginPath();
    ctx.arc( pointer.x, pointer.y, pointer.size, 0, Math.PI * 2 );
    ctx.fill();
    ctx.closePath();

    let lastPoint = lastPoints.get( pointer.id );

    if ( lastPoint ) {
      ctx.strokeStyle = color;
      ctx.lineWidth = pointer.size * 2;
      ctx.beginPath();
      ctx.moveTo( lastPoint.x, lastPoint.y );
      ctx.lineTo( pointer.x, pointer.y );
      ctx.stroke();
      ctx.closePath();
    }
    
    lastPoints.set( pointer.id, pointer );
  }
  
} );