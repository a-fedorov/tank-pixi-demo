import 'pixi'

export default class Entity extends PIXI.Sprite {  
  constructor(x, y, texture) {
    super(texture)
    this.x = x
    this.y = y

    // Rotate around the center
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;    
  }

  update(deltaTime: number) {

  }
}