import { Clientbound } from '@clientbound/index'
import { Packet } from '@packet/packet'
import { PacketData } from '@packet/packet-data'

export class StatusPongResponsePacket extends Packet {
	id = Clientbound.StatusPongResponse

	timestamp: number

	constructor(timestamp: number) {
		super()
		this.timestamp = timestamp
	}

	write(): Buffer {
		const data = new PacketData()
		data.writeLong(this.timestamp)
		return data.buffer
	}
}
