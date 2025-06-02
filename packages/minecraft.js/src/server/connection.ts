import { State, type Packet } from '@minecraft.js/protocol'
import type { Socket } from 'node:net'

export class Connection {
  socket: Socket
  state: State

  constructor(socket: Socket) {
    this.socket = socket
    this.state = State.Handshake
  }

  sendPacket(packet: Packet) {
    const buffer = packet.serialize()
    this.socket.write(buffer)
  }

  sendPackets(...packets: Packet[]) {
    for (const packet of packets) {
      this.sendPacket(packet)
    }
  }
}
