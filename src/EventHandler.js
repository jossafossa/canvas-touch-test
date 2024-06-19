export default class EventHandler {
  constructor() {
    this.events = {};
  }

  on( event, callback ) {
    this.events[ event ] = this.events[ event ] || [];
    this.events[ event ].push( callback );
    
  }

  off( event, callback ) {
    if ( this.events[ event ] ) {
      this.events[ event ] = this.events[ event ].filter( ( c ) => c !== callback );
    } 
  }

  trigger( event, ...args ) {
    if ( this.events[ event ] ) {
      this.events[ event ].forEach( ( c ) => c( ...args ) );
    }
  }
}
