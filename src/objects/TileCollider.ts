import 'config'
import Level from './Level'

export default class TileCollider {
  halfSize: number
  level: Level
  size: number

  constructor(level: Level, tileSize: number) {
    this.level = level
    this.size = tileSize
    this.halfSize = this.size / 2
  }

  checkX(entity) {
    let x
    if (entity.vx > 0) {
      x = entity.x + entity.size
    } else if (entity.vx < 0) {
      x = entity.x
    } else {
      return
    }

    // Get all tiles overlaped by entity
    const matches = this.searchByRange(
      x, x,
      entity.y, entity.y + entity.size
    )

    matches.forEach(match => {
      if (!match || !match.type) {
        return
      }

      // Skip collision detection for background tiles
      if (match.type === 'ground') {
        return
      }

      if (entity.vx > 0) {
        // Check left side of an obstacle
        if (entity.x + entity.size > match.x1) {
          entity.x = match.x1 - entity.size
          entity.vx = 0
        }
      } else if (entity.vx < 0) {
        // Check right side
        if (entity.x < match.x2) {
          entity.x = match.x2
          entity.vx = 0
        }
      }
    })
  }

  checkY(entity) {
    let y
    if (entity.vy > 0) {
      y = entity.y + entity.size
    } else if (entity.vy < 0) {
      y = entity.y
    } else {
      return
    }

    // Get all tiles overlaped by entity
    const matches = this.searchByRange(
      entity.x, entity.x + entity.size,
      y, y
    )

    matches.forEach(match => {
      if (!match) {
        return
      }

      if (match.type === 'ground') {
        return
      }

      if (entity.vy > 0) {
        // Check top side of an obstacle
        if (entity.y + entity.size > match.y1) {
          entity.y = match.y1 - entity.size
          entity.vy = 0
        }
      } else if (entity.vy < 0) {
        // Check bottom side
        if (entity.y < match.y2) {
          entity.y = match.y2
          entity.vy = 0
        }
      }
    })
  }

  checkBounds(entity) {
    if (entity.x < 0) {
      // Check left bound of the map
      entity.vx = 0
      entity.x = 0
    } else if (entity.x + this.size > config.map.cols * this.size) {
      // Check right bound of the map
      entity.vx = 0
      entity.x = config.map.cols * this.size - entity.size
    }

    if (entity.y < 0) {
      // Check top bound 
      entity.vy = 0
      entity.y = 0
    } else if (entity.y > config.map.rows * this.size) {
      // Check bottom bound
      entity.vy = 0
      entity.y = config.map.rows * this.size - entity.size
    }
  }

  checkBulletCollision(x: number, y: number): boolean {
    // Here half size is a bit of a dirty hack but it's works correcly )
    const row = this.toIndex(x + this.halfSize)
    const col = this.toIndex(y + this.halfSize)

    const tileType = this.level.grid.get(row, col)
    
    if (!tileType || tileType === 'ground') {
      return false
    }

    return true
  }

  toIndex(pos: number, size: number = this.size) {
    return Math.floor(pos / size)
  }

  toIndexRange(pos1, pos2) {
    const pMax = Math.ceil(pos2 / this.size) * this.size
    const range = []
    let pos = pos1
    do {
      range.push(this.toIndex(pos))
      pos += this.size
    } while (pos < pMax)
    return range
  }

  getByIndex(row: number, col: number) {
    const type = this.level.grid.get(row, col)
    const x1 = row * this.size
    const x2 = x1 + this.size
    const y1 = col * this.size
    const y2 = y1 + this.size

    return { type, x1, x2, y1, y2 }
  }

  searchByPosition(x: number, y: number) {
    return this.getByIndex(
      this.toIndex(x),
      this.toIndex(y)
    )
  }

  searchByRange(x1, x2, y1, y2) {
    const matches = []
    this.toIndexRange(x1, x2).forEach(indexX => {
      this.toIndexRange(y1, y2).forEach(indexY => {
        const match = this.getByIndex(indexX, indexY)
        if (match) {
          matches.push(match)
        }
      })
    })
    return matches
  }
}
