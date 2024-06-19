import EventHandler from './EventHandler';

function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

type Pointer = {
  identifier: number;
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  rotation: number;
};

export default class PointerFormatter extends EventHandler {
  defaultRadius: number = 10;
  pointers: Map<number, Touch | MouseEvent>;

  constructor(settings: { [key: string]: any } = {}) {
    super();
    this.defaultRadius = settings.defaultRadius || 0;
    this.pointers = new Map();
  }

  formatAll(pointers) {
    return pointers.map((e) => {
      return this.format(e);
    });
  }

  update() {
    let pointers = this.formatAll(Array.from(this.pointers.values()));
    this.trigger('update', pointers);
  }

  /**
   * Formats a touch or mouse event into a Pointer object
   * @param touch Touch | MouseEvent
   */
  format(touch: Touch | MouseEvent): Pointer {
    const floor = Math.floor;
    const round = (num, decimals: number) => {
      return parseFloat(num.toFixed(decimals));
    };

    if (touch instanceof Touch) {
      return {
        identifier: floor(touch.identifier),
        x: floor(touch.clientX),
        y: floor(touch.clientY),
        radiusX: floor(touch.radiusX),
        radiusY: floor(touch.radiusY),
        rotation: round(degreesToRadians(touch.rotationAngle), 2),
      };
    }

    return {
      identifier: 0,
      x: floor(touch.clientX),
      y: floor(touch.clientY),
      radiusX: this.defaultRadius,
      radiusY: this.defaultRadius,
      rotation: 0,
    };
  }
}
