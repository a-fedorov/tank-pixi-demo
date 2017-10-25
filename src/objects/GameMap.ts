import 'pixi'
import 'config'
import Tile from './Tile'

export default class GameMap {
  app: PIXI.Application
  groudTexture: PIXI.Texture
  wallTexture: PIXI.Texture
  tiles: PIXI.Sprite[][]

  constructor(app, textures) {
    this.app = app
    this.groudTexture = textures.groud
    this.wallTexture = textures.wall
    this.tiles = []

    this.initGrid()
  }
  
  initGrid() {
    let totalWalls = 5
    let wallChance = 0.1

    for (let row = 0; row < config.map.rows; row++) {
      for (let col = 0; col < config.map.cols; col++) {
        let value = 0
        if (totalWalls > 0 && Math.random() < wallChance) {
          value = 1
        }
        this.set(row, col, value)
      }
    }
  }

  get(row, col) {
    
  }
  
  set(row, col, value) {
    if (!this.tiles[row]) {
      this.tiles[row] = []
    }

    let texture

    if (value === 0) {
      texture = this.groudTexture
    } else if (value === 1) {
      texture = this.wallTexture
    }
    
    let tile = new Tile(
      row * config.tile.width, 
      col * config.tile.height, 
      value,
      texture
    )
    this.tiles[row][col] = tile
    this.app.stage.addChild(tile)
  }  
}
