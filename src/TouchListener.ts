import CustomPointerEvent from './CustomPointerEvent.ts';

export default class TouchListener extends EventTarget {
  private root: HTMLElement;
  constructor(root) {
    super();

    this.root = root;

    this.root.addEventListener( 'touchmove', (event) => {
      this.dispatchEvent(new CustomPointerEvent('drag', event));
    });

    this.root.addEventListener( 'touchend', (event) => {
      this.dispatchEvent(new CustomPointerEvent('dragend', event));
    });
  }
}