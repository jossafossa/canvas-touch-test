import PointerFormatter from "./PointerFormatter.ts";

/**
 * Listens to pointer events and triggers the update event with a list of pointers.
 */
export default class PointerListener extends PointerFormatter {
  constructor( root ) {
    super( {
      defaultRadius: 10,
    } );
    this.root = root; 
    this.down = false;   

    this.root.addEventListener( "pointerdown", ( e ) => this.start( e ) );
    this.root.addEventListener( "pointermove", ( e ) => this.move( e ) );
    this.root.addEventListener( "pointerup", ( e ) => this.end( e ) );
  }

  start( e ) {
    this.down = true;
    e.preventDefault();

    // capture the pointer
    this.root.setPointerCapture( e.pointerId );

    this.pointers.set( e.pointerId, e );
    this.update();
  }

  move( e ) {
    if ( !this.down ) return;
    e.preventDefault();

    const down = e.buttons === 1;
    if ( !down ) {
      this.end( e );
      return;
    }

    this.pointers.set( e.pointerId, e );
    this.update();
  }

  end( e ) {
    this.down = false;
    e.preventDefault();

    // release the pointer
    this.root.releasePointerCapture( e.pointerId );

    this.pointers.delete( e.pointerId );
    this.update();
  }
}
