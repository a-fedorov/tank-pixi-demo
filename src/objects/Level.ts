import 'config'
import {Matrix} from '../utils/math'

export default class Level {
  grid: Matrix;
  tileSize: number
  wallChance: number
  tileTypes: string[]
  
  constructor(tileSize = config.tile.size) {
    this.grid = new Matrix()
    this.wallChance = 0.1
    this.tileTypes = ['ground', 'wall', 'block']
    this.tileSize = tileSize
  }

  createCollisionGrid(rows: number, cols: number) {
    for (let row = 0; row < config.map.rows; row++) {
      for (let col = 0; col < config.map.cols; col++) {
        let index = 0
        let rnd = Math.random()
        if (rnd < config.map.blockChance) {
          index = 2
        } else if (rnd < config.map.wallChance) {
          index = 1
        }

        this.grid.set(row, col, this.tileTypes[index])
      }
    }
  }
 
  check(entity) {
    
  }

  checkX(entity) {

  }

  checkY(entity) {

  }

  toIndex(pos: number) {
    return Math.floor(pos / this.tileSize)
  }

  getByIndex(row: number, col: number) {
    const type = this.grid.get(row, col)
    const x1 = row * this.tileSize
    const x2 = x1 + this.tileSize
    const y1 = col * this.tileSize
    const y2 = y1 + this.tileSize

    return { type, x1, x2, y1, y2 }
  }
}
