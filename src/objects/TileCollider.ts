import 'config'

export default class TileCollider {
  halfSize: number;
  level: any
  tileSize: number
  
  constructor(level, tileSize: number) {
    this.level = level
    this.tileSize = tileSize
    this.halfSize = this.tileSize / 2
  }

  checkX(entity) {
    const match = this.getByPosition(entity.x, entity.y)

    if (!match) {
      return
    }

    if (match.type === 'ground') {
      return
    }

    if (entity.vx > 0) {
      if (entity.x > match.x1) {
        entity.x = match.x1
        entity.vx = 0
      }
    } else if (entity.vx < 0) {
      if (entity.x < match.x2) {
        entity.x = match.x2
        entity.vx = 0
      }
    }    
  }

  checkY(entity) {
    const match = this.getByPosition(entity.x, entity.y)

    if (!match) {
      return
    }

    if (match.type === 'ground') {
      return
    }

    if (entity.vy > 0) {
      if (entity.y > match.y1) {
        entity.y = match.y1
        entity.vy = -entity.vy
      }
    } else if (entity.vy < 0) {
      if (entity.y < match.y2) {
        entity.y = match.y2
        entity.vy = 0
      }
    }
  }

  checkBounds(entity) {
    if (entity.x < 0) {
      entity.vx = -entity.vx
      entity.x = 0
    } else if (entity.x > config.map.cols * config.tile.width) {
      entity.vx = -entity.vx
      entity.x = config.map.cols * config.tile.width - entity.width
    }

    if (entity.y < 0) {
      entity.vy = -entity.vy
      entity.y = 0
    } else if (entity.y > config.map.rows * config.tile.height) {
      entity.vy = -entity.vy
      entity.y = config.map.rows * config.tile.height - entity.height
    }
  }

  toIndex(pos: number) {
    return Math.floor(pos / this.tileSize)
  }

  getByIndex(row: number, col: number) {
    const type = this.level.grid.get(row, col)
    const x1 = row * this.tileSize
    const x2 = x1 + this.tileSize
    const y1 = col * this.tileSize
    const y2 = y1 + this.tileSize
    
    return { type, x1, x2, y1, y2 }
  }
  
  getByPosition(x: number, y: number) {
    return this.getByIndex(
      this.toIndex(x),
      this.toIndex(y)
    )
  }
}