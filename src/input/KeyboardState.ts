const PRESSED = 1
const RELEASED = 0

export default class KeyboardState {
  keyMap: {};
  keyStates: {};

  constructor() {
    // Holds the current state of a given key
    this.keyStates = {}

    // Holds the callback functions fro a key code
    this.keyMap = {}
  }

  addMapping(keyCodes: string | string[], callback: Function) {
    let codes: string[] = (typeof keyCodes === 'string') ? [keyCodes] : keyCodes

    codes.forEach(code => {
      this.keyMap[code] = callback
    })
  }

  handleEvent(event) {
    const {code} = event

    if (!this.keyMap[code]) {
      // Did not have key mapped
      return
    }

    event.preventDefault()

    const keyState = (event.type === 'keydown') ? PRESSED : RELEASED

    // if (this.keyStates[code] === keyState) {
    //   return
    // }

    this.keyStates[code] = keyState
    this.keyMap[code](keyState)
  }

  listenTo(window) {
    ['keydown', 'keyup'].forEach(eventName => {
      window.addEventListener(eventName, event => {
        this.handleEvent(event)
      })
    })
  }
}
