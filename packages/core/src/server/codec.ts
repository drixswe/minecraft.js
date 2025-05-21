import { PacketData, type IPacket, type Packet } from 'protocol'

export const decode = (buffer: Buffer): IPacket => {
	const data = new PacketData(buffer)
	const length = data.readVarInt()
	const id = data.readVarInt()
	const packetData = buffer.subarray(data.offset, data.offset + length)

	return {
		id,
		length,
		data: packetData
	}
}

export const encode = (packet: Packet): Buffer => {
	if (!packet.write) {
		throw new Error('Packet does not have a write method')
	}

	const idBuffer = new PacketData()
	idBuffer.writeVarInt(packet.id)

	const body = Buffer.concat([idBuffer.buffer, packet.write()])

	const lengthBuffer = new PacketData()
	lengthBuffer.writeVarInt(body.length)

	return Buffer.concat([lengthBuffer.buffer, body])
}
