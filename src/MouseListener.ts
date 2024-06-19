
import CustomPointerEvent from "./CustomPointerEvent";

export default class MouseListener extends EventTarget {
  private root: HTMLElement;
  private isDragging: boolean;

  constructor(root) {
    super();

    this.root = root;
    this.isDragging = false;

    this.root.addEventListener('pointerdown', (event) => {
      this.isDragging = true;
    });

    this.root.addEventListener('pointerup', (event) => {
      this.isDragging = false;
    });

    this.root.addEventListener('pointermove', (event) => {
      if (!this.isDragging) return;
      this.dispatchEvent(new CustomPointerEvent('pointerdrag', event));
    });




  }
}