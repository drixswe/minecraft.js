import { State, type IPacket } from '@minecraft.js/protocol'
import type { Client } from '../client'
import type { PacketHandler } from './packet-handler'

const packetHandlers: Record<State, Record<number, PacketHandler>> = {
	[State.Handshake]: {},
	[State.Status]: {},
	[State.Login]: {},
	[State.Configuration]: {},
	[State.Play]: {}
}

export const handlePacket = (client: Client, packet: IPacket) => {
	const handlers = packetHandlers[client.state]

	if (!handlers) {
		throw new Error(`No handler for state: ${client.state}`)
	}

	const handler = handlers[packet.id]

	if (!handler) {
		throw new Error(
			`No handler for packet: ${packet.id} in state: ${client.state}`
		)
	}

	handler.handle(client, packet)
}
