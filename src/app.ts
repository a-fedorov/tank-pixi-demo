import 'pixi'
import 'config'

import * as atlasImage from '../assets/sprites/battle-city.png'
import * as atlasData from './../assets/sprites/battle-city.json'

import GameMap from './objects/GameMap'
import Tank from './objects/Tank'
import {setupKeyboard} from './input/setupKeyboard'


// Init app
const app = new PIXI.Application(config.game.width, config.game.height, {transparent: true});
document.body.appendChild(app.view);

// Create atlas texture from image 
const baseTexture = PIXI.BaseTexture.fromImage(atlasImage)
const atlas = new PIXI.Spritesheet(baseTexture, atlasData)
const center = new PIXI.Point(app.renderer.width / 2, app.renderer.height / 2)

atlas.parse(() => {
  startGame()
})

function startGame() {
  const map = new GameMap(app, {
    groud: atlas.textures['ground.png'],
    wall: atlas.textures['wall.png']
  })
  app.stage.addChild(map)

  const tank = new Tank(center.x, center.y, atlas.textures['tank-red.png'])
  app.stage.addChild(tank)
  
  const input = setupKeyboard(tank)
  input.listenTo(window)
  
  app.ticker.add((deltaTime) => {
    tank.update(deltaTime)
    
    updateCamera(map, tank)
  });
}

function updateCamera(map, entity) {
    // Camera implementation

  if (entity.x > center.x && entity.x < map.width - center.x) {
    app.stage.pivot.x = entity.x
    app.stage.position.x = center.x
  } 

  if (entity.y > center.y && entity.y < map.height - center.y) {
    app.stage.pivot.y = entity.y
    app.stage.position.y = center.y
  }

}