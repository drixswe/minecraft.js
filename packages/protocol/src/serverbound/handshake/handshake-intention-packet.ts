import { PacketData } from '@packet/packet-data'
import { Packet } from '@packet/packet'
import { Serverbound } from '@serverbound/index'

export class HandshakeIntentionPacket extends Packet {
	id = Serverbound.HandshakeIntention

	protocolVersion!: number
	serverAddress!: string
	serverPort!: number
	nextState!: number

	read(data: Buffer): void {
		const buffer = new PacketData(data)
		this.protocolVersion = buffer.readVarInt()
		this.serverAddress = buffer.readString()
		this.serverPort = buffer.readShort()
		this.nextState = buffer.readVarInt()
	}
}
