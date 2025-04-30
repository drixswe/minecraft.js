export abstract class Packet {
  id: number
  length: number
  data: DataView

  constructor(id: number, length: number, data: DataView) {
    this.id = id
    this.length = length
    this.data = data
  }
}
