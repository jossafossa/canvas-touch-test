import TouchListener from './TouchListener.ts';
import MouseListener from './MouseListener.ts';
import CustomPointerEvent from './CustomPointerEvent';

export default class PointerListener extends EventTarget {
  private touchListener: TouchListener;
  private mouseListener: MouseListener;
  private root: HTMLElement;

  
  constructor(root) {
    super();

    this.root = root;
    this.touchListener = new TouchListener(this.root);
    this.mouseListener = new MouseListener(this.root);

    this.touchListener.addEventListener('pointerdrag', (event) => {      
      this.dispatchEvent(new CustomPointerEvent('pointerdrag', event));
    });

    this.mouseListener.addEventListener('pointerdrag', (event) => {
      this.dispatchEvent(new CustomPointerEvent('pointerdrag', event));
    });
  }


}