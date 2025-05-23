import { Serverbound } from '@minecraft.js/protocol'
import { HandshakeIntentionHandler } from './handshake-intention-handler'

export const handshakeHandlers = {
	[Serverbound.HandshakeIntention]: new HandshakeIntentionHandler()
}
