import 'pixi'
import 'config'
import Entity from './Entity'
import {toRad} from '../utils/math'

export default class Tank extends PIXI.Sprite {
  bulletManager: any;
  vx: number
  vy: number
  dx: number
  dy: number
  speed: number
  size: number
  dir: PIXI.Point

  constructor(x: number, y: number, texture: PIXI.Texture) {
    super(texture)
    this.x = x
    this.y = y
    this.width = config.tile.width
    this.height = config.tile.height
    this.size = config.tile.size

    // Rotate around the center
    this.anchor.set(0.5)

    this.speed = 5
    this.dx = 0
    this.dy = 0
    this.vx = 0
    this.vy = 0
    this.dir = new PIXI.Point(0, -1)
  }

  go(dir: PIXI.Point, keyState) {
    this.dir = dir
    this.dx = dir.x * keyState
    this.dy = dir.y * keyState
    this.rotate(dir)
  }
  
  rotate(dir: PIXI.Point) {
    let angle = 0
  
    if (dir.x === 1) {
      angle = 90
    } else if (dir.x === -1) {
      angle = 270
    } else if (dir.y === 1) {
      angle = 180
    } else if (dir.y === -1) {
      angle = 0
    }
    
    this.rotation = toRad(angle)
  }

  setupFire(bulletManager) {
    this.bulletManager = bulletManager
  }

  fire() {
    const pos = new PIXI.Point(
      this.x + Math.cos(this.rotation) * 20 + this.dir.y * 24 + this.dir.x * 16,
      this.y + Math.sin(this.rotation) * 20 - this.dir.x * 24 + this.dir.y * 16
    )
    this.bulletManager.shoot(this.rotation, pos)
  }

  update(deltaTime: number) {
    this.vx = this.dx * this.speed * deltaTime
    this.vy = this.dy * this.speed * deltaTime
  }
}
