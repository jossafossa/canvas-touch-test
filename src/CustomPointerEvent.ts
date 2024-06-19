type CustomPointer = {
  id: number;
  x: number;
  y: number;
}

export default class CustomPointerEvent extends Event {
  pointers: CustomPointer[];

  constructor(type, event) {
    super(type);

    this.pointers = [];

    if (event.type === 'pointerdrag') {
      this.pointerDrag(event);
    }

    if (event.type === 'pointermove') {
      this.pointerMove(event);
    }

    if (event.type === 'touchmove') {
      this.touchMove(event);
    }
  }

  private pointerDrag(event) {
    this.pointers = event.pointers;
  }

  private pointerMove(event) {

    this.pointers.push({
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY
    })
  }

  private touchMove(event) {
    
    for (let i = 0; i < event.touches.length; i++) {
      let pointer = event.touches[i];
      console.log(pointer)
      this.pointers.push({
        id: pointer.identifier,
        x: pointer.clientX,
        y: pointer.clientY
      });
    }
  }
}