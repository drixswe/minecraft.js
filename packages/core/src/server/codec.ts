import { type Packet, PacketData } from 'protocol'

export const encode = (packet: Packet): Buffer => {
  // TODO: encode packets to a buffer
}

export const decode = (buffer: Buffer): Packet => {
	const packetData = new PacketData(buffer, buffer.byteOffset)
	const packetLength = packetData.readVarInt()
	const packetId = packetData.readVarInt()

	return {
		id: packetId,
		length: packetLength,
		data: packetData
	}
}
