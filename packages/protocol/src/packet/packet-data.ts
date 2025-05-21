const SEGMENT_BITS = 0x7f
const CONTINUE_BIT = 0x80

export class PacketData {
	offset = 0
	buffer: Buffer

	constructor(buffer?: Buffer) {
		this.buffer = buffer || Buffer.alloc(0)
	}

	readVarInt(): number {
		let numRead = 0
		let result = 0
		let read: number

		do {
			read = this.buffer.readUInt8(this.offset++)
			const value = read & SEGMENT_BITS
			result |= value << (7 * numRead)

			numRead++
			if (numRead > 5) throw new Error('VarInt is too big')
		} while ((read & CONTINUE_BIT) !== 0)

		return result
	}

	writeVarInt(value: number): void {
		let temp = value
		const bytes: number[] = []

		while (temp !== 0) {
			let byte = temp & SEGMENT_BITS
			temp >>>= 7
			if (temp !== 0) byte |= CONTINUE_BIT
			bytes.push(byte)
		}

		this.buffer = Buffer.concat([this.buffer, Buffer.from(bytes)])
		this.offset += bytes.length
	}

	readInt(): number {
		const value = this.buffer.readUInt8(this.offset)
		this.offset += 1
		return value
	}

	writeInt(value: number): void {
		this.buffer = Buffer.concat([this.buffer, Buffer.from([value])])

		this.offset += 1
	}

	readShort(): number {
		const value = this.buffer.readUInt16BE(this.offset)
		this.offset += 2
		return value
	}

	writeShort(value: number): void {
		this.buffer = Buffer.concat([
			this.buffer,
			Buffer.from([value >> 8, value & 0xff])
		])

		this.offset += 2
	}

	readLong(): number {
		const value = this.buffer.readUInt32BE(this.offset)
		this.offset += 4
		return value
	}

	writeLong(value: number): void {
		this.buffer = Buffer.concat([
			this.buffer,
			Buffer.from([
				(value >> 24) & 0xff,
				(value >> 16) & 0xff,
				(value >> 8) & 0xff,
				value & 0xff
			])
		])

		this.offset += 4
	}

	readString(): string {
		const length = this.readVarInt()
		const value = this.buffer.toString(
			'utf8',
			this.offset,
			this.offset + length
		)
		this.offset += length
		return value
	}

	writeString(value: string): void {
		const length = Buffer.byteLength(value, 'utf8')
		this.writeVarInt(length)
		this.buffer = Buffer.concat([this.buffer, Buffer.from(value, 'utf8')])
		this.offset += length
	}
}
