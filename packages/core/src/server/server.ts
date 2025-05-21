import { type Config, configSchema } from '@config/config'
import type { Socket, TCPSocketListener } from 'bun'
import { Prompt } from './console/prompt'
import type { Client } from './client'
import { decode } from './codec'

export class Server {
	private listener?: TCPSocketListener
	private clients: Set<Client>
	config: Config
	prompt: Prompt

	constructor(config: Partial<Config> = {}) {
		this.config = configSchema.parse(config)
		this.prompt = new Prompt()
		this.clients = new Set()
	}

	start(): void {
		this.listener = Bun.listen({
			hostname: this.config.address,
			port: this.config.port,
			socket: {
				data: (socket, data) => {
					const packet = decode(data)
					console.log(packet)
				},
				open: (socket) => {},
				close: (socket, error) => {},
				drain: (socket) => {},
				error: (socket, error) => {}
			}
		})

		this.prompt.info(
			`Server started at ${this.config.address}:${this.config.port}`
		)
	}

	stop(): void {
		if (!this.listener) {
			throw new Error('There is no server instance running!')
		}

		this.listener.stop(true)
		this.listener.unref()
		this.prompt.info('Server stopped')
		process.exit(0)
	}

	private getClient(socket: Socket): Client | null {
		for (const client of this.clients) {
			if (client.socket !== socket) continue
			return client
		}
		return null
	}
}
