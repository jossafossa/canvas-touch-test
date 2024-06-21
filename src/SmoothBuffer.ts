export class SmoothBuffer {
  buffer: number[];
  size: number;
  constructor(size) {
    this.buffer = [];
    this.size = size;
  }
  smooth(value) {
    this.buffer.push(value);
    if (this.buffer.length > this.size) {
      this.buffer.shift();
    }
    let sum = this.buffer.reduce((a, c) => a + c);
    return sum / this.buffer.length;
  }
}


/**
 * SmoothVectorBuffer
 * Same as SmoothBuffer but for vectors
 */
export class SmoothVectorBuffer {
  constructor(size, attributes = ["x", "y"]) {
    this.buffers = new Map();

    this.size = size;
    this.attributes = attributes;
    
    for (let attribute of attributes) {
      this.buffers.set(attribute, new SmoothBuffer(size));
    }


  }
  smooth(all) {
    const copy = {...all};

    for (let attribute of this.attributes) {
      copy[attribute] = this.buffers.get(attribute).smooth(all[attribute]);
    }

    console.log({
      copy, 
      all, 
      attribute: this.attributes,
      buffers : this.buffers
    });
    

    return copy;
  }
}