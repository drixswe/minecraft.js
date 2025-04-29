import type { DataBuf } from '@buffer/buffer'

export abstract class Packet {
  id: number
  length: number
  data: DataBuf

  constructor(id: number, length: number, data: DataBuf) {
    this.id = id
    this.length = length
    this.data = data
  }
}

export interface InboundPacket {
  id: number
  read: (data: DataBuf) => void
}

export interface OutboundPacket {
  id: number
  build: () => Packet
}
