import type { PacketData } from './packet-data'

export interface IPacket {
	id: number
	length: number
	data: Buffer
}

export abstract class Packet {
	abstract id: number

	read?(data: PacketData): void
	write?(): Buffer
}
