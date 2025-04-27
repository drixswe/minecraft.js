import { type Packet, DataBuf } from 'protocol'

export const encode = (packet: Packet): Buffer => {
	const header = new DataBuf()
	header.writeVarInt(packet.length)
	header.writeVarInt(packet.id)

	return Buffer.from(Uint8Array.from([header.buffer, packet.data]))
}

export const decode = (buffer: Buffer): Packet => {
	const packetData = new DataBuf(buffer, buffer.byteOffset)
	const packetLength = packetData.readVarInt()
	const packetId = packetData.readVarInt()

	return {
		id: packetId,
		length: packetLength,
		data: packetData
	}
}
