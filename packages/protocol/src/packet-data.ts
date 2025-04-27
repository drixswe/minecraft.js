const SEGMENT_BITS = 0x7f
const CONTINUE_BIT = 0x80

export class PacketData {
	private data: Buffer
	private view: DataView
	private offset: number

	constructor(data: Buffer, offset = 0) {
		this.data = data
		this.view = new DataView(data.buffer, offset, data.byteLength)
		this.offset = offset
	}

	private readByte(): number {
		if (this.offset >= this.data.byteLength) {
			throw new Error('Buffer underflow')
		}

		return this.view.getUint8(this.offset++)
	}

	private writeByte(value: number): void {
		if (this.offset >= this.data.byteLength) {
			throw new Error('Buffer overflow')
		}

		this.view.setUint8(this.offset++, value)
	}

	public readVarInt(): number {
		let value = 0
		let position = 0
		let currentByte: number

		while (true) {
			currentByte = this.readByte()
			value |= (currentByte & SEGMENT_BITS) << position

			if ((currentByte & CONTINUE_BIT) === 0) break
			position += 7

			if (position >= 32) throw new Error('VarInt is too big')
		}

		return value
	}

	public readVarLong(): bigint {
		let value = 0n
		let position = 0
		let currentByte: number

		while (true) {
			currentByte = this.readByte()
			value |= BigInt(currentByte & SEGMENT_BITS) << BigInt(position)

			if ((currentByte & CONTINUE_BIT) === 0) break
			position += 7

			if (position >= 64) throw new Error('VarLong is too big')
		}

		return value
	}

	public writeVarInt(value: number): void {
		let currentValue = value

		while (true) {
			if ((currentValue & ~SEGMENT_BITS) === 0) {
				this.writeByte(currentValue)
				return
			}

			this.writeByte((currentValue & SEGMENT_BITS) | CONTINUE_BIT)
			currentValue >>>= 7
		}
	}

	public writeVarLong(value: bigint): void {
		let currentValue = value

		while (true) {
			if ((currentValue & ~BigInt(SEGMENT_BITS)) === 0n) {
				this.writeByte(Number(currentValue))
				return
			}

			this.writeByte(Number(currentValue & BigInt(SEGMENT_BITS)) | CONTINUE_BIT)
			currentValue /= 128n
		}
	}
}
