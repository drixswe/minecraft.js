import { field, SObject } from 'serio'
import { VarInt } from './wrapper/var-int'

export class Packet extends SObject {
  @field(VarInt)
  lenght: number

  @field(VarInt)
  id: number
}
