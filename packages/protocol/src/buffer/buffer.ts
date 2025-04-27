import { DataSize, varInt, varLong, string } from './data-size'

const SEGMENT_BITS = 0x7f
const CONTINUE_BIT = 0x80

export class DataBuf {
  private view: DataView
  private offset: number
  buffer: Buffer

  constructor(buffer = Buffer.alloc(0), offset = 0) {
    this.buffer = buffer
    this.view = new DataView(buffer.buffer, offset, buffer.byteLength)
    this.offset = offset
  }

  public readByte(): number {
    if (this.offset + DataSize.Byte > this.buffer.byteLength) {
      throw new Error('Buffer underflow')
    }

    return this.view.getUint8(this.offset++)
  }

  public writeByte(value: number): void {
    if (this.offset + DataSize.Byte > this.buffer.byteLength) {
      throw new Error('Buffer overflow')
    }

    this.view.setUint8(this.offset++, value)
  }

  public readBytes(length: number): Buffer {
    if (this.offset + length > this.buffer.byteLength) {
      throw new Error('Buffer underflow')
    }

    const result = this.buffer.slice(this.offset, this.offset + length)
    this.offset += length
    return result
  }

  public writeBytes(value: Buffer): void {
    if (this.offset + value.length > this.buffer.byteLength) {
      throw new Error('Buffer overflow')
    }

    const uintArray = new Uint8Array(this.buffer)
    value.copy(uintArray, this.offset)
    this.offset += value.length
  }

  public readBoolean(): boolean {
    return this.readByte() !== 0
  }

  public writeBoolean(value: boolean): void {
    this.writeByte(value ? 1 : 0)
  }

  public readInt(): number {
    if (this.offset + DataSize.Int > this.buffer.byteLength) {
      throw new Error('Buffer underflow')
    }

    const result = this.view.getInt32(this.offset, true)
    this.offset += DataSize.Int
    return result
  }

  public writeInt(value: number): void {
    if (this.offset + DataSize.Int > this.buffer.byteLength) {
      throw new Error('Buffer overflow')
    }

    this.view.setInt32(this.offset, value, true)
    this.offset += DataSize.Int
  }

  public readShort(): number {
    if (this.offset + DataSize.Short > this.buffer.byteLength) {
      throw new Error('Buffer underflow')
    }

    const result = this.view.getInt16(this.offset, true)
    this.offset += DataSize.Short
    return result
  }

  public writeShort(value: number): void {
    if (this.offset + DataSize.Short > this.buffer.byteLength) {
      throw new Error('Buffer overflow')
    }

    this.view.setInt16(this.offset, value, true)
    this.offset += DataSize.Short
  }

  public readLong(): bigint {
    if (this.offset + DataSize.Long > this.buffer.byteLength) {
      throw new Error('Buffer underflow')
    }

    const result = this.view.getBigInt64(this.offset, true)
    this.offset += DataSize.Long
    return result
  }

  public writeLong(value: bigint): void {
    if (this.offset + DataSize.Long > this.buffer.byteLength) {
      throw new Error('Buffer overflow')
    }

    this.view.setBigInt64(this.offset, value, true)
    this.offset += DataSize.Long
  }

  public readFloat(): number {
    if (this.offset + DataSize.Float > this.buffer.byteLength) {
      throw new Error('Buffer underflow')
    }

    const result = this.view.getFloat32(this.offset, true)
    this.offset += DataSize.Float
    return result
  }

  public writeFloat(value: number): void {
    if (this.offset + DataSize.Float > this.buffer.byteLength) {
      throw new Error('Buffer overflow')
    }

    this.view.setFloat32(this.offset, value, true)
    this.offset += DataSize.Float
  }

  public readDouble(): number {
    if (this.offset + DataSize.Double > this.buffer.byteLength) {
      throw new Error('Buffer underflow')
    }

    const result = this.view.getFloat64(this.offset, true)
    this.offset += DataSize.Double
    return result
  }

  public writeDouble(value: number): void {
    if (this.offset + DataSize.Double > this.buffer.byteLength) {
      throw new Error('Buffer overflow')
    }

    this.view.setFloat64(this.offset, value, true)
    this.offset += DataSize.Double
  }

  public readChar(): string {
    return String.fromCharCode(this.readShort())
  }

  public writeChar(value: string): void {
    if (value.length !== 1) {
      throw new Error('Only single characters are allowed')
    }

    this.writeShort(value.charCodeAt(0))
  }

  public readString(): string {
    const length = this.readVarInt()
    const bytes = this.readBytes(length)
    return bytes.toString('utf-8')
  }

  public writeString(value: string): void {
    const bytes = Buffer.from(value, 'utf-8')
    const size = string(value)
    if (this.offset + size > this.buffer.byteLength) {
      throw new Error('Buffer overflow')
    }

    this.writeVarInt(bytes.length)
    this.writeBytes(bytes)
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

  public writeVarInt(value: number): void {
    const size = varInt(value)
    if (this.offset + size > this.buffer.byteLength) {
      throw new Error('Buffer overflow')
    }

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

  public writeVarLong(value: bigint): void {
    const size = varLong(value)
    if (this.offset + size > this.buffer.byteLength) {
      throw new Error('Buffer overflow')
    }

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
