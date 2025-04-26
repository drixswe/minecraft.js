import type { PacketData } from './packet-data'

export class Packet {
	id: number
	data: PacketData

	constructor(id: number, data: PacketData) {
		this.id = id
		this.data = data
	}
}

export interface OutboundPacket {
	id: number
	write: () => Buffer
}

export interface InboundPacket {
	read: (data: PacketData) => void
}
