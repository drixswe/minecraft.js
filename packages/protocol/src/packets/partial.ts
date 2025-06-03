import { VarInt } from '@serio/fields/var-int'
import { Packet } from '@serio/packet'
import { SObject } from 'serio'

export abstract class Partial extends SObject {
  abstract id: number

  toPacket(): Packet {
    const idLength = VarInt.of(this.id).getSerializedLength()
    const packetLength = this.getSerializedLength() + idLength

    return Packet.with({
      id: this.id,
      length: packetLength,
      data: this.serialize()
    })
  }
}
