export class Matrix {
  grid: any[];

  constructor() {
    this.grid = [];
  }

  forEach(callback: Function) {
    this.grid.forEach((column, x) => {
      column.forEach((value, y) => {
        callback(value, x, y);
      });
    });
  }

  get(row: number, col: number) {
    if (this.grid[row]) {
      return this.grid[row][col];
    }
    return undefined;
  }

  set(x: number, y: number, value: string) {
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