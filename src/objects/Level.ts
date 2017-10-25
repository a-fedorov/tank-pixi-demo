import 'config'
import {Matrix} from '../utils/math'
import TileCollider from './TileCollider'

export default class Level {
  grid: Matrix;
  entities: any[]
  wallChance: number
  tileTypes: string[]
  collider: TileCollider
  
  constructor(tileSize = config.tile.size) {
    this.grid = new Matrix()
    this.wallChance = 0.1
    this.tileTypes = ['ground', 'wall', 'block']
    this.entities = []
    this.collider = new TileCollider(this, tileSize)
  }

  addEntity(entity) {
    this.entities.push(entity)
  }

  createCollisionGrid(rows: number, cols: number) {
    for (let row = 0; row < config.map.rows; row++) {
      for (let col = 0; col < config.map.cols; col++) {
        let index = 0

        // Randomly create walls and blocks
        let rnd = Math.random()
        if (rnd < config.map.blockChance) {
          index = 2
        } else if (rnd < config.map.wallChance) {
          index = 1
        }

        // Create map border
        // if (row === 0 || row === config.map.rows - 1 || col === 0 || col === config.map.cols - 1) {
        //   index = 2
        // }

        this.grid.set(row, col, this.tileTypes[index])
      }
    }
  }

  update(deltaTime) {
    this.entities.forEach(entity => {
      entity.update(deltaTime)

      entity.x += entity.vx
      this.collider.checkX(entity)
      
      entity.y += entity.vy
      this.collider.checkY(entity)

      this.collider.checkBounds(entity)
    })
  }
}
