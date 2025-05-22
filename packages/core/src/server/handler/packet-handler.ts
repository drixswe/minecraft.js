import type { IPacket } from '@minecraft.js/protocol'
import type { Client } from '../client'

export interface PacketHandler {
	handle: (client: Client, packet: IPacket) => void
}
