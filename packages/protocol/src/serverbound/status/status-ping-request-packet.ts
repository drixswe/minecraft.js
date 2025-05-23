import { Packet } from '@packet/packet'
import { PacketData } from '@packet/packet-data'
import { Serverbound } from '@serverbound/index'

export class StatusPingRequestPacket extends Packet {
	id = Serverbound.StatusPingRequest

	timestamp!: number

	read(data: Buffer): void {
		const buffer = new PacketData(data)
		this.timestamp = buffer.readLong()
	}
}
