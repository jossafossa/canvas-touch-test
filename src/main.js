import "./style.css";

import TouchListener from "./TouchListener";
import PointerListener from "./PointerListener";

function getColor( e ) {
  const pressure = e.pressure || 0;
  const r = Math.floor( pressure * 255 );
  const g = Math.floor( ( 1 - pressure ) * 255 );
  const b = 0;
  return `rgb(${r}, ${g}, ${b})`;
}

class PointerTester {
  constructor( root ) {
    this.root = root;
    this.ctx = root.getContext( "2d" );
    this.setWindowSize();
    this.pointers = new Map();
    this.frame = 0;
    this.touchListener = new TouchListener( root );
    this.pointerListener = new PointerListener( root );

    this.pointerListener.on( "update", ( pointers ) => {
      this.pointers = pointers;
    } );

    this.touchListener.on( "update", ( touches ) => {
      this.pointers = touches;
    } );

    // start loop
    this.loop();
  }

  clear() {
    const color = "rgba(255, 255, 255, 0.2)";
    this.ctx.fillStyle = color;
    this.ctx.fillRect( 0, 0, this.root.width, this.root.height );
  }

  loop() {
    // clear canvas
    this.clear();

    this.pointers.forEach( ( e ) => {
      this.drawPointer( e );
    } );

    this.debug();

    this.frame++;
    requestAnimationFrame( () => this.loop() );
  }

  drawText( text, x, y, size = 32 ) {
    this.ctx.fillStyle = "black";
    this.ctx.font = `${size}px sans-serif`;
    const lineheight = size;
    const lines = text.split( "\n" );

    for ( let i = 0; i < lines.length; i++ ) {
      this.ctx.fillText( lines[ i ], x, y + i * lineheight );
    }
  }

  debug() {
    // draw frame on the top left.
    this.drawText( `Frame: ${this.frame}`, 32, 32 );

    // draw the pointer locations on the top right
    let pointers = Array.from( this.pointers.values() );
    pointers = pointers.map( ( e ) => {
      e.pos = `${e.x}, ${e.y} (${e.radiusX}, ${e.radiusY}) ${e.rotation}deg `;
      return e;
    } );

    const pointerText = pointers
      .map( ( e ) => `${e.pointerId}: ${e.pos}` )
      .join( "\n" );
    this.drawText( pointerText, this.root.width - 600, 32 );
  }

  drawPointer( e ) {
    const dpr = window.devicePixelRatio || 1;
    const x = e.x * dpr;
    const y = e.y * dpr;
    const radiusX = e.radiusX * dpr;
    const radiusY = e.radiusY * dpr;
    const rotation = e.rotation || 0;

    // const twist = e.twist || 0;
    // const tiltX = e.tiltX || 0;
    // const tiltY = e.tiltY || 0;

    // draw a circle
    this.ctx.fillStyle = getColor( e );
    this.ctx.beginPath();
    this.ctx.ellipse( x, y, radiusX, radiusY, rotation, 0, Math.PI * 2 );
    this.ctx.fill();
  }

  // draw a rectangle on x, y with width and height
  // twist, tiltX, tiltY are not implemented
  drawRect( x, y, width, height ) {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect( x, y, width, height );
  }

  setWindowSize() {
    window.addEventListener( "resize", () => {
      this.setSize( window.innerWidth, window.innerHeight );
    } );
    this.setSize( window.innerWidth, window.innerHeight );
  }

  setSize( width, height ) {
    // set size
    this.root.style.width = `${width}px`;
    this.root.style.height = `${height}px`;

    // get device pixel ratio
    let dpr = window.devicePixelRatio || 1;
    // set canvas size
    this.root.width = width * dpr;
    this.root.height = height * dpr;
  }
}

const root = document.querySelector( "#root" );
new PointerTester( root );
