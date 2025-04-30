import type { Packet } from 'protocol'

export const encode = (packet: Packet): Buffer => {
	const header = Buffer.alloc(0)
	const view = new DataView(header.buffer, header.byteOffset, header.byteLength)
	view.setInt8(0, packet.length)
	view.setInt8(1, packet.id)
	return Buffer.from(Uint8Array.from([header.buffer, packet.data]))
}

export const decode = (buffer: Buffer): Packet => {
	const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength)
	const packetLength = view.getInt8(0)
	const packetId = view.getInt8(1)

	return {
		id: packetId,
		length: packetLength,
		data: view
	}
}
