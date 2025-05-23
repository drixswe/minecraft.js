import { Clientbound } from '@clientbound/index'
import { Packet } from '@packet/packet'
import { PacketData } from '@packet/packet-data'

export class StatusResponsePacket extends Packet {
	id = Clientbound.StatusStatusResponse

	json: string

	constructor(json: string) {
		super()
		this.json = json
	}

	write(): Buffer {
		const data = new PacketData()
		data.writeString(this.json)
		return data.buffer
	}
}
