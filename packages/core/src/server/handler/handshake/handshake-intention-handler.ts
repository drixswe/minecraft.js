import { motdSchema } from '@config/motd'
import {
	HandshakeIntentionPacket,
	type IPacket,
	State,
	StatusResponsePacket
} from '@minecraft.js/protocol'
import type { Client } from '@server/client'
import type { PacketHandler } from '../packet-handler'

enum NextState {
	Status = 1,
	Login = 2,
	Transfer = 3
}

export class HandshakeIntentionHandler implements PacketHandler {
	handle(client: Client, packet: IPacket): void {
		const handshakePacket = new HandshakeIntentionPacket()
		handshakePacket.read(packet.data)

		const motd = JSON.stringify(motdSchema.parse({}))
		const statusResponsePacket = new StatusResponsePacket(motd)
		client.sendPacket(statusResponsePacket)

		switch (handshakePacket.nextState) {
			case NextState.Status:
				client.state = State.Status
				break
			case NextState.Login:
				client.state = State.Login
				break
			case NextState.Transfer:
				// TODO: Handle transfer
				break
			default:
				throw new Error(`Invalid next state: ${handshakePacket.nextState}`)
		}
	}
}
