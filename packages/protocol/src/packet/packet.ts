export interface IPacket {
	id: number
	length: number
	data: Buffer
}

export abstract class Packet {
	abstract id: number

	read?(data: Buffer): void
	write?(): Buffer
}
