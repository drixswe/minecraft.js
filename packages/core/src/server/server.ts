import type { Config } from '@config/config.js'
import type { TCPSocketListener } from 'bun'

export class Server {
	private listener: TCPSocketListener | null = null
  config: Config

  constructor(config?: Partial<Config>) {
    this.config = {
      address: config?.address ?? 'localhost',
      port: config?.port ?? 25565
    }
  }

	start() {
		this.listener = Bun.listen({
			hostname: this.config.address,
			port: this.config.port,
			socket: {
				data(socket, data) {},
				open(socket) {},
				close(socket, error) {},
				drain(socket) {},
				error(socket, error) {},

				// client-specific handlers
				connectError(socket, error) {},
				end(socket) {},
				timeout(socket) {}
			}
		})

		console.log(`Server running at ${this.config.address}:${this.config.port}`)
	}

	stop() {
		if (this.listener) {
			this.listener.stop(true)
			this.listener = null
		}

		console.log('Server stopped')
	}
}
