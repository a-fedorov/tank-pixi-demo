import Keyboard from './KeyboardState'

export function setupKeyboard(entity) {
  const input = new Keyboard()

  input.addMapping('ArrowUp', keyState => {
    entity.go(setDirection(0, -1), keyState)
  })

  input.addMapping('ArrowDown', keyState => {
    entity.go(setDirection(0, 1), keyState)
  })

  input.addMapping('ArrowLeft', keyState => {
    entity.go(setDirection(-1, 0), keyState)
  })

  input.addMapping('ArrowRight', keyState => {
    entity.go(setDirection(1, 0), keyState)
  })
  
  return input
}

function setDirection(x: number = 0, y: number = 0) {
  return { x, y }  
}