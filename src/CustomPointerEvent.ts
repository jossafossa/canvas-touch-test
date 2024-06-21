type CustomPointer = {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default class CustomPointerEvent extends Event {
  pointers: CustomPointer[];

  constructor(type, event) {
    super(type);

    this.pointers = [];

    let eventType = event.type ?? 'drag';


    if ([ 'drag', 'dragstart', 'dragend'].includes(eventType)) {
      this.drag(event);
    }

    if (['pointermove', 'pointerdown', 'pointerup'].includes(eventType)) {
      this.pointerMove(event);
    }

    if (['touchmove', 'touchstart', 'touchend'].includes(eventType)){
      this.touchMove(event);
    }
  }

  private drag(event) {
    this.pointers = event.pointers;
  }

  private pointerMove(event) {

    this.pointers.push({
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      size: 10
    })
  }

  private touchMove(event) {
    
    for (let i = 0; i < event.touches.length; i++) {
      let pointer = event.touches[i];
      console.log(pointer);
      this.pointers.push({
        id: pointer.identifier,
        x: pointer.clientX,
        y: pointer.clientY,
        size: pointer.force  * 20 ,
      });
    }
  }
}