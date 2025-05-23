import { Serverbound } from '@minecraft.js/protocol'
import { StatusPingHandler } from './status-ping-handler'
import { StatusRequestHandler } from './status-request-handler'

export const statusHandlers = {
	[Serverbound.StatusStatusRequest]: new StatusRequestHandler(),
	[Serverbound.StatusPingRequest]: new StatusPingHandler()
}
