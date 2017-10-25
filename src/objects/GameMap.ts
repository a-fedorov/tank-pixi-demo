import 'pixi'
import 'config'
import Tile from './Tile'
import Level from './Level'

export default class GameMap extends PIXI.Container {
  app: PIXI.Application
  tiles: PIXI.Sprite[][]
  level: Level
  width: number
  height: number
  textures: PIXI.Texture[]

  constructor(app, textures) {
    super()
    this.app = app
    this.tiles = []
    this.level = new Level()
    this.textures = textures

    this.width = config.map.cols * config.tile.width
    this.height = config.map.rows * config.tile.height
  }

  fill() {
    this.level.createCollisionGrid(config.map.rows, config.map.cols)

    for (let row = 0; row < config.map.rows; row++) {
      for (let col = 0; col < config.map.cols; col++) {
        this.set(row, col, this.level.grid.get(row, col))
      }
    }
  }

  get(row, col) {
    
  }
  
  set(row, col, value: string) {
    const tile = new Tile(
      row * config.tile.width, 
      col * config.tile.height, 
      this.textures[value]
    )

    this.addChild(tile)
  }  
}
