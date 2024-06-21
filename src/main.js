import "./style.scss"

import PointerListener from "./PointerListener.ts";
import CustomPointerEvent from "./CustomPointerEvent.ts";


const setValues = ( params ) => {
  params = Object.fromEntries( params.entries() );
  for ( let key in params ) {
    let input = document.querySelector( `[name="${key}"]` );
    console.log( { key, input } )
    if ( input ) {
      input.value = params[ key ];
    }
  }
};

let root = document.querySelector( "#root" );
let ratio = window.devicePixelRatio ?? 1;

 root.width = window.innerWidth * ratio;
 root.height = window.innerHeight * ratio;
 root.style.height = window.innerHeight + "px";
  root.style.width = window.innerWidth + "px";
  let params = new URLSearchParams( window.location.search );
  setValues( params );
  
  let smooth = params.get( "smoothing" )  ?? 5;
  let dots =  params.get( "dots" )  ?? 2;
  dots = parseInt( dots );
  smooth = parseInt( smooth );



let listener = new PointerListener( root, {
  smooth
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

/**
 * 
 * @param {CustomPointerEvent} p1 
 * @param {CustomPointerEvent} p2 
 * @param {number} space Space between the points in px
 * @returns {CustomPointerEvent[]}
 */
const getIntermediatePoints = ( p1, p2, space = 10 ) => {
  let points = [];
  let dx = p2.x - p1.x;
  let dy = p2.y - p1.y;
  let distance = Math.sqrt( dx ** 2 + dy ** 2 );
  let angle = Math.atan2( dy, dx );

  let steps = Math.round( distance / space );
  console.log( { steps } );

  for ( let i = 0; i < steps; i++ ) {
    let x = p1.x + Math.cos( angle ) * i * space;
    let y = p1.y + Math.sin( angle ) * i * space;
    let size = p1.size + ( p2.size - p1.size ) * ( i / steps );

    points.push( {
      x, y, size
    } );
  }

  return points;
}

const draw = ( event )  => {

  

    // ctx.fillStyle = "rgba( 255,255,255, 0.1 )";
    
    // clear the canvas
    // ctx.fillRect( 0, 0, root.width, root.height );
  
  
    let pointers = event.pointers ?? [];
  
    for ( let pointer of pointers ) {

      // pointer capture
      root.setPointerCapture( pointer.id );
  
  let color = getColor( pointer.id + colorOffset );
      ctx.fillStyle = color

      console.log( pointer.size, pointer.speed ); 
      // pointer.size = pointer.size + pointer.speed / 3;

      let lastPoint = lastPoints.get( pointer.id );

      let pointers = [ pointer ];
      if ( lastPoint ) {
        pointers = getIntermediatePoints( lastPoint, pointer, dots );
      }
  
      for ( let p of pointers ) {
        ctx.beginPath();
        ctx.arc( p.x * ratio, p.y * ratio, p.size * ratio, 0, Math.PI * 2 );
        ctx.fill();
        ctx.closePath();
      }

      lastPoints.set( pointer.id, pointer );
    }
    
}


[ "drag", "dragstart" ].forEach( event => listener.addEventListener( event, draw ) );


// outputs update their value with the value of the input they are connected to
const outputs = document.querySelectorAll( "output" );
for ( let output of outputs ) {
  let input = document.querySelector( "#" + output.htmlFor );
  let suffix = output.getAttribute( "suffix" ) ?? "";
  output.value = input.value + suffix;
  input.addEventListener( "input", () => {
    output.value = input.value + suffix;
  } );
}
