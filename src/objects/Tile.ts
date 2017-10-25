import 'pixi'
import 'config'

export default class Tile extends PIXI.Sprite {
  constructor(x: number, y: number, type: number, texture: PIXI.Texture) {
    super(texture)
    this.x = x
    this.y = y
    this.width = config.tile.width
    this.height = config.tile.height
  }
}