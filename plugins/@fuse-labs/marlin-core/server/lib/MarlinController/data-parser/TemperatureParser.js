import { DataParser } from "@fuse-labs/core/server"

export default class TemperatureParser extends DataParser {
  
  match(data) {
    return data.startsWith('ok T') || data.startsWith(' T')
  }

  parse(data) {
    // Remove spaces between /
    let temperatureParts = data
      .replaceAll(' /', '/')
      .split(' ')
      .map(p => p.trim().split(':'))

    let item = {
      extruders: {},
      bed: {},
      bedPower: {},
      hotend: {},
      chamber: {},
      pindaV2: {},
      ambient: {}
    }
    
    // Parse temperature

    temperatureParts.forEach(part => {
      
      let key = part[0]
      let value = part[1]

      if (key.slice(0, 1) === 'T') {
        // Parse temperature
        let extruderId = parseInt(key.length > 1 ? key.slice(1) : 0)
        item.extruders[extruderId] = this._getCurrentAndTarget(value)
      } else {
        switch (key) {
          // Bed temperature
          case 'B':
            item.bed = this._getCurrentAndTarget(value)
            break
          // Bed power
          case 'B@':
            item.bedPower = this._getCurrentAndTarget(value)
            break
          // Chamber temperature
          case 'C':
            item.chamber = this._getCurrentAndTarget(value)
            break
          // Hotend
          case '@':
            item.hotend = this._getCurrentAndTarget(value)
            break
          // PINDAV2
          case 'P':
            item.pindaV2 = this._getCurrentAndTarget(value)
            break
          // Ambient
          case 'A':
            item.ambient = this._getCurrentAndTarget(value)
            break
          case 'T':
            // Ignore, we parse it before
            break
          default:
            console.warn(`Unsupported key "${key}" in ${this.constructor.name}`)
            break
        }
      }
    })

    return item
  }

  _getCurrentAndTarget(value) {
    let values = value.split('/')
    let current = values[0]
    let target = values.length > 1 ? values[1] : null
    return {
      current,
      target
    }
  }
}