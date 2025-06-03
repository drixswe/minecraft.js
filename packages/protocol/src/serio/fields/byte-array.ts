import {
  SerializableWrapper,
  type DeserializeOptions,
  type SerializeOptions
} from 'serio'

export class ByteArray extends SerializableWrapper<Buffer> {
  value: Buffer = Buffer.alloc(0)

  override deserialize(buffer: Buffer, opts?: DeserializeOptions): number {
    throw new Error('Method not implemented.')
  }

  override serialize(opts?: SerializeOptions): Buffer {
    throw new Error('Method not implemented.')
  }

  override getSerializedLength(opts?: SerializeOptions): number {
    throw new Error('Method not implemented.')
  }
}
