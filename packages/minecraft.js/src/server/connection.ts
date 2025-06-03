import { State, type Partial } from '@minecraft.js/protocol'
import type { Socket } from 'node:net'

export class Connection {
  socket: Socket
  state: State

  constructor(socket: Socket) {
    this.socket = socket
    this.state = State.Handshake
  }

  sendPacket(partial: Partial) {
    const buffer = partial.toPacket().serialize()
    this.socket.write(buffer)
  }

  sendPackets(...partials: Partial[]) {
    for (const partial of partials) {
      this.sendPacket(partial)
    }
  }
}
