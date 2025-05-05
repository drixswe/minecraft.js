import type { Socket } from 'bun'
import { type Packet, State } from 'protocol'
import { encode } from './codec'

export class Client {
	socket: Socket<Packet>
  state: State

	constructor(socket: Socket<Packet>) {
		this.socket = socket
    this.state = State.HANDSHAKE
	}

	public sendPacket(packet: Packet): void {
		const packetBuf = encode(packet)
		this.socket.write(packetBuf.buffer)
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
