import 'pixi'
import 'config'
import Tank from './Tank'

const GAME_WIDTH = config.map.cols * config.tile.size
const GAME_HEIGHT = config.map.rows * config.tile.size

export default class BulletManager {
  app: PIXI.Application
  texture: PIXI.Texture
  bullets: any[]
  bulletSpeed: number

  constructor(app: PIXI.Application, texture: PIXI.Texture) {
    this.app = app
    this.bulletSpeed = 7
    this.bullets = []
    this.texture = texture
  }

  shoot(rotation: number, pos: PIXI.Point) {
    const bullet = new PIXI.Sprite(this.texture)
    bullet.x = pos.x
    bullet.y = pos.y
    bullet.rotation = (rotation)
    this.app.stage.addChild(bullet)
    this.bullets.push(bullet)
  }

  update(deltaTime) {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      let bullet: PIXI.Sprite = this.bullets[i]
      bullet.x += Math.cos(bullet.rotation - Math.PI / 2) * this.bulletSpeed
      bullet.y += Math.sin(bullet.rotation - Math.PI / 2) * this.bulletSpeed

      if (bullet.x < 0 || bullet.x > GAME_WIDTH ||
          bullet.y < 0 || bullet.y > GAME_HEIGHT) {
        bullet.destroy()
        this.bullets.splice(i, 1)
      }
    }
  }
}