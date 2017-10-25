import 'pixi'
import 'config'

export default class Tile extends PIXI.Sprite {
  size: number 

  constructor(x: number, y: number, texture: PIXI.Texture) {
    super(texture)
    this.x = x
    this.y = y
    this.width = config.tile.width
    this.height = config.tile.height
    this.size = config.tile.size
  }

  // getBounds() {
  //   const x1 = this.x
  //   const x2 = x1 + this.size
  //   const y1 = this.y
  //   const y2 = y1 + this.size
  //   return {}
  // }
}