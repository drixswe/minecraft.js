import type { Socket } from 'bun'
import type { Packet } from 'protocol'
import { encode } from './codec'

export class Client {
	socket: Socket<Packet>

	constructor(socket: Socket<Packet>) {
		this.socket = socket
	}

	public sendPacket(packet: Packet): void {
		const buffer = encode(packet)

		const view = new DataView(
			buffer.buffer,
			buffer.byteOffset,
			buffer.byteLength
		)

		this.socket.write(view.buffer)
		this.socket.flush()
	}

	public sendPackets(packets: Packet[]): void {
		for (const packet of packets) {
			this.sendPacket(packet)
		}
	}

	public disconnect(): void {
		this.socket.end()
	}
}
