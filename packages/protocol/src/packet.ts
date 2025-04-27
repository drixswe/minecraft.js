import type { DataBuf } from '@buffer/buffer'

export class Packet {
	id: number
  length: number
	data: DataBuf

	constructor(id: number, length: number, data: DataBuf) {
		this.id = id
    this.length = length
		this.data = data
	}
}

export interface OutboundPacket extends Packet {
	write: () => Buffer
}

export interface InboundPacket extends Packet {
	read: (data: DataBuf) => void
}
