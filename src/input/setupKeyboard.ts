import Keyboard from './KeyboardState'

export function setupKeyboard(entity, callback) {
  const input = new Keyboard()

  input.addMapping(['ArrowUp', 'KeyW'], keyState => {
    entity.go(setDirection(0, -1), keyState)
  })

  input.addMapping(['ArrowDown', 'KeyS'], keyState => {
    entity.go(setDirection(0, 1), keyState)
  })

  input.addMapping(['ArrowLeft', 'KeyA'], keyState => {
    entity.go(setDirection(-1, 0), keyState)
  })

  input.addMapping(['ArrowRight', 'KeyD'], keyState => {
    entity.go(setDirection(1, 0), keyState)
  })

  input.addMapping('Space', callback)
  
  return input
}

function setDirection(x: number = 0, y: number = 0) {
  return { x, y }  
}