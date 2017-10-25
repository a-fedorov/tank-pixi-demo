export class Matrix {
  grid: any[];

  constructor() {
    this.grid = [];
  }

  forEach(callback) {
    this.grid.forEach((column, x) => {
      column.forEach((value, y) => {
        callback(value, x, y);
      });
    });
  }

  get(x, y) {
    const col = this.grid[x];
    if (col) {
      return col[y];
    }
    return undefined;
  }

  set(x, y, value) {
    if (!this.grid[x]) {
      this.grid[x] = [];
    }

    this.grid[x][y] = value;
  }
}

export function toRad(valueInDegrees: number): number {
  return valueInDegrees * (Math.PI / 180)
}

export function toDeg(valueInRadians: number): number {
  return valueInRadians * (180 / Math.PI)
}