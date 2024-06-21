import TouchListener from './TouchListener.ts';
import MouseListener from './MouseListener.ts';
import CustomPointerEvent from './CustomPointerEvent';
import {SmoothVectorBuffer} from './SmoothBuffer';


type PointerListenerSettings = {
  smooth?: number;
}
export default class PointerListener extends EventTarget {
  private touchListener: TouchListener;
  private mouseListener: MouseListener;
  private root: HTMLElement;
  private buffers: Map<number, SmoothVectorBuffer>;
  private event: CustomPointerEvent;
  
  constructor(root, settings: PointerListenerSettings = {}) {
    super();

    this.settings = {
      smooth: 30,
      ...settings
    }

    this.buffers = new Map();
    this.event = new CustomPointerEvent('drag', {pointers: []});
    this.pointers = [];

    this.buffer = new SmoothVectorBuffer(this.settings.smooth);

    this.root = root;
    this.touchListener = new TouchListener(this.root);
    this.mouseListener = new MouseListener(this.root);

    [
      this.mouseListener,
      this.touchListener
    ].forEach(listener => {
      listener.addEventListener('drag', (event) => {
        this.event = event;
      });

      listener.addEventListener('dragend', () => {
        this.buffers.clear();
        this.event = new CustomPointerEvent('dragend', {pointers: []});
        this.dispatchEvent(this.event);
      });
    });

   
    

    
    this.loop();
  }

  loop() {
    let pointers = this.event?.pointers ?? [];
    let newPoiners = [];
    for (let pointer of pointers) {

      let buffer = this.buffers.get(pointer.id);
      if (!buffer) {
        buffer = new SmoothVectorBuffer(this.settings.smooth, ["x", "y", "size"]);
        this.buffers.set(pointer.id, buffer);
      }

      let smoothEvent = buffer.smooth(pointer);

      newPoiners.push(smoothEvent);

    }

    this.dispatchEvent(new CustomPointerEvent('drag', {pointers: newPoiners}));


    window.requestAnimationFrame( () => {
      this.loop();
    });
  }
}