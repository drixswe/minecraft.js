import { SObject, field } from 'serio'
import { ByteArray } from './fields/byte-array'
import { VarInt } from './fields/var-int'

export class Packet extends SObject {
  @field(VarInt)
  length: number

  @field(VarInt)
  id: number

  @field(ByteArray)
  data: Buffer
}
