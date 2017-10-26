import 'pixi'

export default class Entity extends PIXI.Sprite {  
  size: number;
  vy: number;
  vx: number;

  constructor(x, y, rotation, size, texture) {
    super(texture)
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.size = size
    this.rotation = rotation

    // Rotate around the center
    this.anchor.set(0.5)
  }

  update(deltaTime: number) {
    
  }
}