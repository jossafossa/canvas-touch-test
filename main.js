import "./style.css";

class PointerTester {
  constructor(root) {
    this.root = root;
    this.ctx = root.getContext("2d");
    this.setWindowSize();
    this.pointers = new Map();
    this.frame = 0;

    this.root.addEventListener("pointerdown", (e) => this.onPointerDown(e));
    this.root.addEventListener("pointermove", (e) => this.onPointerMove(e));
    this.root.addEventListener("pointerup", (e) => this.onPointerUp(e));

    // start loop
    this.loop();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.root.width, this.root.height);
  }

  loop() {
    // clear canvas
    this.clear();

    this.pointers.forEach((e) => {
      this.drawPointer(e);
    });

    this.debug();

    this.frame++;
    requestAnimationFrame((e) => this.loop());
  }

  drawText(text, x, y, size = 32) {
    this.ctx.fillStyle = "black";
    this.ctx.font = `${size}px sans-serif`;
    let lineheight = size;
    let lines = text.split("\n");

    for (let i = 0; i < lines.length; i++) {
      this.ctx.fillText(lines[i], x, y + i * lineheight);
    }
  }

  debug() {
    // draw frame on the top left.
    this.drawText(`Frame: ${this.frame}`, 32, 32);

    // draw the pointer locations on the top right
    let pointers = Array.from(this.pointers.values());
    pointers = pointers.map((e) => {
      let x = Math.floor(e.clientX);
      let y = Math.floor(e.clientY);
      let width = Math.floor(e.width);
      let twist = Math.floor(e.twist * 10) / 10;
      let pressure = Math.floor(e.pressure * 10) / 10;
      let tiltX = Math.floor(e.tiltX * 10) / 10;
      let tiltY = Math.floor(e.tiltY * 10) / 10;

      e.pos = `${x}, ${y} (${width}) t: ${twist} p: ${pressure} tx: ${tiltX} ty: ${tiltY}`;
      return e;
    });

    const pointerText = pointers
      .map((e) => `${e.pointerId}: ${e.pos}`)
      .join("\n");
    this.drawText(pointerText, this.root.width - 600, 32);
  }

  onPointerDown(e) {
    console.log("pointer down", e);
    // capture pointer
    e.target.setPointerCapture(e.pointerId);

    this.pointers = this.pointers || [];
    this.pointers.set(e.pointerId, e);
  }

  onPointerMove(e) {
    this.pointers.set(e.pointerId, e);
  }

  onPointerUp(e) {
    // release pointer
    e.target.releasePointerCapture(e.pointerId);

    this.pointers.delete(e.pointerId);
  }

  getColor(e) {
    const pressure = e.pressure || 0;
    const r = Math.floor(pressure * 255);
    const g = Math.floor((1 - pressure) * 255);
    const b = 0;
    return `rgb(${r}, ${g}, ${b})`;
  }

  drawPointer(e) {
    const dpr = window.devicePixelRatio || 1;
    const x = e.clientX * dpr;
    const y = e.clientY * dpr;
    const size = e.pressure * 100 || 10;

    const centerX = x - size / 2;
    const centerY = y - size / 2;

    // const twist = e.twist || 0;
    // const tiltX = e.tiltX || 0;
    // const tiltY = e.tiltY || 0;

    // draw a circle
    this.ctx.fillStyle = this.getColor(e);
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  // draw a rectangle on x, y with width and height
  // twist, tiltX, tiltY are not implemented
  drawRect(x, y, width, height) {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(x, y, width, height);
  }

  setWindowSize() {
    window.addEventListener("resize", () => {
      this.setSize(window.innerWidth, window.innerHeight);
    });
    this.setSize(window.innerWidth, window.innerHeight);
  }

  setSize(width, height) {
    // set size
    this.root.style.width = `${width}px`;
    this.root.style.height = `${height}px`;

    // get device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    // set canvas size
    this.root.width = width * dpr;
    this.root.height = height * dpr;
  }
}

const root = document.querySelector("#root");
new PointerTester(root);
