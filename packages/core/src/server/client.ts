import { type Packet, State } from '@minecraft.js/protocol'
import type { Socket } from 'bun'
import { encode } from './codec'

export class Client {
	socket: Socket
	state: State
	buffer: Buffer

	constructor(socket: Socket) {
		this.socket = socket
		this.state = State.Handshake
		this.buffer = Buffer.alloc(0)
	}

	sendPacket(packet: Packet): void {
		const buffer = encode(packet)
		this.socket.write(buffer)
		this.socket.flush()
	}

	sendPackets(packets: Packet[]): void {
		for (const packet of packets) {
			this.sendPacket(packet)
		}
	}

	disconnect(): void {
		this.socket.end()
	}
}
