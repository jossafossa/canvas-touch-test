
import CustomPointerEvent from "./CustomPointerEvent";

export default class MouseListener extends EventTarget {
  private root: HTMLElement;
  private isDragging: boolean;

  constructor(root) {
    super();

    this.root = root;
    this.isDragging = false;

  

    this.root.addEventListener('pointermove', (event) => {
      if (!this.isDragging) return;
      this.dispatchEvent(new CustomPointerEvent('drag', event));
    });

    this.root.addEventListener('pointerdown', (event) => {
      this.isDragging = true;
      this.dispatchEvent(new CustomPointerEvent('dragstart', event));
    });

    this.root.addEventListener('pointerup', (event) => {
      this.dispatchEvent(new CustomPointerEvent('dragend', {pointers: []}));
      this.isDragging = false;
    });

  }
}