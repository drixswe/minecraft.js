import {
	StatusPingRequestPacket,
	StatusPongResponsePacket,
	type IPacket
} from '@minecraft.js/protocol'
import type { Client } from '@server/client'
import type { PacketHandler } from '../packet-handler'

export class StatusPingHandler implements PacketHandler {
	handle(client: Client, packet: IPacket): void {
		const pingPacket = new StatusPingRequestPacket()
		pingPacket.read(packet.data)

		const pongPacket = new StatusPongResponsePacket(pingPacket.timestamp)
		client.sendPacket(pongPacket)
	}
}
