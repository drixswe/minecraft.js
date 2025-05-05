import type { IPacket, Packet } from 'protocol'

export const encode = (packet: Packet): Buffer => {
	if (!packet.write) {
		throw new Error('Packet does not have a write method')
	}

	const data = packet.write()
	const length = data.length + 1

	const buffer = Buffer.alloc(length + 1)
	buffer.writeUInt8(length, 0)
	buffer.writeUInt8(packet.id, 1)
	data.copy(new Uint8Array(buffer), 2)

	return buffer
}

export const decode = (buffer: Buffer): IPacket => {
  const length = buffer.readUInt8(0)
  const packetId = buffer.readUInt8(1)
  const payload = buffer.slice(2, 2 + length - 1)

  return {
    id: packetId,
    length,
    data: payload
  }
}
