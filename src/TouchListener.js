import PointerFormatter from "./PointerFormatter.ts";
/**
 * Listens to touch events and triggers the update event with a list of touches.
 */
export default class TouchListener extends PointerFormatter {
  constructor( root ) {
    super();
    this.root = root;
    this.touches = new Map();
    this.formatter = new PointerFormatter();

    this.root.addEventListener( "touchstart", ( e ) => this.start( e ) );
    this.root.addEventListener( "touchmove", ( e ) => this.move( e ) );
    this.root.addEventListener( "touchend", ( e ) => this.end( e ) );
  }

  start( e ) {
    e.preventDefault();
    for ( const touch of e.changedTouches ) {
      this.touches.set( touch.identifier, touch );
    }
    this.update();
  }

  move( e ) {
    e.preventDefault();
    for ( const touch of e.changedTouches ) {
      this.touches.set( touch.identifier, touch );
    }
    this.update();
  }

  end( e ) {
    e.preventDefault();
    for ( const touch of e.changedTouches ) {
      this.touches.delete( touch.identifier );
    }
    this.update();
  }
}
