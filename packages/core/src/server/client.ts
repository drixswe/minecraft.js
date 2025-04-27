import type { Socket } from 'bun'
import { type ClientPacket, type Packet, State } from 'protocol'
import { encode } from './codec'

export class Client {
	socket: Socket<Packet>
	state: State

	constructor(socket: Socket<Packet>) {
		this.socket = socket
		this.state = State.HANDSHAKE
	}

	public sendPacket(packet: ClientPacket): void {
		const buffer = encode(packet.toPacket())

		const view = new DataView(
			buffer.buffer,
			buffer.byteOffset,
			buffer.byteLength
		)

		this.socket.write(view.buffer)
		this.socket.flush()
	}

	public sendPackets(packets: ClientPacket[]): void {
		for (const packet of packets) {
			this.sendPacket(packet)
		}
	}

	public disconnect(): void {
		this.socket.end()
	}
}
