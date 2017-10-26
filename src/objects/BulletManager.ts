import 'pixi'
import 'config'

import Tank from './Tank'
import TileCollider from './TileCollider'

const GAME_WIDTH = config.map.cols * config.tile.size
const GAME_HEIGHT = config.map.rows * config.tile.size

const SHOT_DELAY = config.bullet.delay
const BULLET_SPEED = config.bullet.speed
const NUMBER_OF_BULLETS  = config.bullet.total
const RELOAD_DELAY = config.bullet.reloadDelay

export default class BulletManager extends PIXI.Container {
  collider: TileCollider;
  app: PIXI.Application
  texture: PIXI.Texture
  tank: Tank
  bullets: any[]
  bulletSpeed: number
  lastBulletShotAt: number;
  lastReloadShotAt: number;
  NUMBER_OF_BULLETS: number;
  bulletCounter: number;

  constructor(app: PIXI.Application, texture: PIXI.Texture, tank: Tank, collider: TileCollider) {
    super()
    this.app = app
    this.bulletSpeed = config.bullet.speed
    this.bullets = []
    this.texture = texture
    this.NUMBER_OF_BULLETS = config.tank[tank.type].pool
    
    this.bulletCounter = 0
    this.lastBulletShotAt = 0
    this.lastReloadShotAt = 0
    this.collider = collider
  }

  shoot(rotation: number, pos: PIXI.Point) {
    // Add some delay for each shot
    if (performance.now() - this.lastBulletShotAt < SHOT_DELAY) return
    this.lastBulletShotAt = performance.now()

    // Queue delay
    if (this.bulletCounter % this.NUMBER_OF_BULLETS === 0) {
      if (performance.now() - this.lastReloadShotAt < RELOAD_DELAY) return
      this.lastReloadShotAt = performance.now()
    }

    this.bulletCounter++
    this.addBullet(rotation, pos)
  }
  
  addBullet(rotation: number, pos: PIXI.Point) {
    const bullet = new PIXI.Sprite(this.texture)
    bullet.x = pos.x
    bullet.y = pos.y
    bullet.anchor.set(0.5, 0.5)
    bullet.rotation = (rotation)
    bullet['size'] = 4
    this.app.stage.addChild(bullet)
    this.bullets.push(bullet)
  }

  checkCollision() {
    
  }

  update(deltaTime) {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      let bullet: PIXI.Sprite = this.bullets[i]
      bullet.x += Math.cos(bullet.rotation - Math.PI / 2) * this.bulletSpeed
      bullet.y += Math.sin(bullet.rotation - Math.PI / 2) * this.bulletSpeed

      if (bullet.x < 0 || bullet.x > GAME_WIDTH || bullet.y < 0 || bullet.y > GAME_HEIGHT) {
        bullet.destroy()
        this.bullets.splice(i, 1)
        continue
      }      
      
      if (this.collider.checkBulletCollision(bullet.x, bullet.y)) {
        bullet.destroy()
        this.bullets.splice(i, 1)
      }
    }
  }
}