import {
  SerializableWrapper,
  type DeserializeOptions,
  type SerializeOptions
} from 'serio'

export class VarLong extends SerializableWrapper<number> {
  value = 0

  deserialize(buffer: Buffer, opts?: DeserializeOptions): number {
    throw new Error('Method not implemented.')
  }

  serialize(opts?: SerializeOptions): Buffer {
    throw new Error('Method not implemented.')
  }

  getSerializedLength(opts?: SerializeOptions): number {
    throw new Error('Method not implemented.')
  }
}
