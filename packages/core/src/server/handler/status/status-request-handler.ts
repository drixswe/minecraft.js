import type { Client } from '@server/client'
import type { PacketHandler } from '../packet-handler'
import type { IPacket } from '@minecraft.js/protocol'

export class StatusRequestHandler implements PacketHandler {
	handle(client: Client, packet: IPacket): void {
		// ! Nothing to do here
	}
}
