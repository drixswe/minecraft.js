import{ schema, type Config } from '@config/config.js'
import type { TCPSocketListener } from 'bun'

export class Server {
	private listener: TCPSocketListener | null = null
	config: Config

	constructor(config?: Config) {
		this.config = schema.parse(config)
	}

	start() {
		this.listener = Bun.listen({
			hostname: this.config.address,
			port: this.config.port,
			socket: {
				data(socket) {
					console.log(
						`Socket drained: ${socket.remoteAddress}:${socket.remotePort}`
					)
				},
				open(socket) {
					console.log(
						`Socket opened: ${socket.remoteAddress}:${socket.remotePort}`
					)
				}
			}
		})

		console.log(`Server running at ${this.config.address}:${this.config.port}`)
	}

	stop() {
		if (this.listener) {
			this.listener.stop(true)
			this.listener.unref()
			this.listener = null
		}

		console.log('Server stopped')
	}
}
