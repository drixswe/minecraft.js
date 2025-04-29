import type { DataBuf } from '@buffer/buffer'
import type { InboundPacket } from 'src/packet'

export class IntentionPacket implements InboundPacket {
	id = 0

	protocolVersion: number
	serverAdress: string
	serverPort: number
	nextState: number

	constructor(
		protocolVersion: number,
		serverAdress: string,
		serverPort: number,
		nextState: number
	) {
		this.protocolVersion = protocolVersion
		this.serverAdress = serverAdress
		this.serverPort = serverPort
		this.nextState = nextState
	}

	public read(data: DataBuf): void {
		this.protocolVersion = data.readVarInt()
		this.serverAdress = data.readString()
		this.serverPort = data.readShort()
		this.nextState = data.readVarInt()
	}
}
