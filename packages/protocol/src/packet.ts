import type { PacketData } from './packet-data'

export class Packet {
	id: number
  length: number
	data: PacketData

	constructor(id: number, length: number, data: PacketData) {
		this.id = id
    this.length = length
		this.data = data
	}
}

export interface OutboundPacket extends Packet {
	write: () => Buffer
}

export interface InboundPacket extends Packet {
	read: (data: PacketData) => void
}
