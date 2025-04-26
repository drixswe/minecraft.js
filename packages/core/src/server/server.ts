import { type Config, configSchema } from '@config/config.js'
import type { TCPSocketListener } from 'bun'

export class Server {
	private listener: TCPSocketListener | null = null
	config: Config

	constructor(config?: Config) {
		this.config = configSchema.parse(config)
	}

	public start() {
		this.listener = Bun.listen({
			hostname: this.config.address,
			port: this.config.port,
			socket: {
				data: (socket, data) => {
					console.log(`Received data from ${socket.remoteAddress}:${socket.remotePort}`)
				},
				open: (socket) => {
					console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`)
				},
			}
		})

		console.log(`Server running at ${this.config.address}:${this.config.port}`)
	}

	public stop() {
		if (this.listener) {
			this.listener.stop(true)
			this.listener.unref()
			this.listener = null
		}

		console.log('Server stopped')
	}
}
