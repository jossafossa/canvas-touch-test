export class SmoothBuffer {
  constructor(size) {
    this.size = size;
    this.buffer = new Array(size).fill(0);
    this.index = 0;
    this.count = 0;
    this.sum = 0;
  }
  
  smooth(value) {
    // Subtract the oldest value from the sum
    this.sum -= this.buffer[this.index];
    
    // Add the new value to the buffer and sum
    this.buffer[this.index] = value;
    this.sum += value;
    
    // Increment the index and wrap around if necessary
    this.index = (this.index + 1) % this.size;
    
    // Increment the count until it reaches the size
    this.count = Math.min(this.count + 1, this.size);
    
    // Return the average
    return this.sum / this.count;
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
    const copy = { ...all };

    for (let attribute of this.attributes) {
      copy[attribute] = this.buffers.get(attribute).smooth(all[attribute]);
    }

    return copy;
  }
}