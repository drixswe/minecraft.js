export interface IPacket {
  id: number
  length: number
  data: Buffer
}

export abstract class Packet {
	abstract id: number

	write?(): Buffer
	read?(data: Buffer): void
}
