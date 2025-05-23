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

		do {
			let byte = temp & SEGMENT_BITS
			temp >>>= 7
			if (temp !== 0) byte |= CONTINUE_BIT
			bytes.push(byte)
		} while (temp !== 0)

		this.buffer = Buffer.concat([this.buffer, Buffer.from(bytes)])
		this.offset += bytes.length
	}

	readVarLong(): number {
		let numRead = 0
		let result = 0
		let read: number
		let shift = 0

		do {
			read = this.buffer.readUInt8(this.offset++)
			const value = read & SEGMENT_BITS
			result |= value << shift

			shift += 7
			numRead++
			if (numRead > 10) throw new Error('VarLong is too big')
		} while ((read & CONTINUE_BIT) !== 0)

		return result
	}

	writeVarLong(value: number): void {
		let temp = value
		const bytes: number[] = []

		do {
			let byte = temp & SEGMENT_BITS
			temp = Math.floor(temp / 128)
			if (temp !== 0) byte |= CONTINUE_BIT
			bytes.push(byte)
		} while (temp !== 0)

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
		const value = this.buffer.readBigInt64BE(this.offset)
		this.offset += 8
		return Number(value)
	}

	writeLong(value: number): void {
		const buf = Buffer.alloc(8)
		buf.writeBigInt64BE(BigInt(value))
		this.buffer = Buffer.concat([this.buffer, buf])
		this.offset += 8
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
