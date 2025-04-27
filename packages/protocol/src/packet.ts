import { DataBuf } from '@buffer/buffer'

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

export interface ClientPacket {
  id: number
  read: (data: DataBuf) => void
  toPacket: () => Packet
}

export interface ServerPacket {
  id: number
  write: () => Buffer
}
