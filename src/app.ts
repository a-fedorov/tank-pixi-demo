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

  const tank = new Tank(center.x, center.y, atlas.textures['tank-red.png'])
  app.stage.addChild(tank)
  
  const input = setupKeyboard(tank)
  input.listenTo(window)
  
  app.ticker.add((deltaTime) => {
    tank.update(deltaTime)
  });
}