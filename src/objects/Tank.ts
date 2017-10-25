import 'pixi'
import 'config'
import Entity from './Entity'

export default class Tank extends PIXI.Sprite {
  vx: number
  vy: number
  dx: number
  dy: number
  speed: number

  constructor(x: number, y: number, texture: PIXI.Texture) {
    super(texture)
    this.x = x
    this.y = y
    this.width = config.tile.width
    this.height = config.tile.height

    // Rotate around the center
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    this.speed = 5
    this.dx = 0
    this.dy = 0
    this.vx = 0
    this.vy = 0
  }

  go(dir: PIXI.Point, keyState) {
    this.dx = dir.x * keyState
    this.dy = dir.y * keyState
  }

  checkBounds() {
    if (this.x < 0) {
      this.vx = -this.vx
      this.x = 0
    } else if (this.x > config.map.cols * config.tile.width) {
      this.vx = -this.vx
      this.x = config.map.cols * config.tile.width - this.width
    }

    if (this.y < 0) {
      this.vy = -this.vy
      this.y = 0
    } else if (this.y > config.map.rows * config.tile.height) {
      this.vy = -this.vy
      this.y = config.map.rows * config.tile.height - this.height
    }
  }
  
  update(deltaTime: number) {
    this.vx = this.dx * this.speed * deltaTime
    this.vy = this.dy * this.speed * deltaTime

    this.x += this.vx
    this.y += this.vy

    this.checkBounds()
  }
}
