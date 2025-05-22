import { type Config, configSchema } from '@config/config'
import type { Socket, TCPSocketListener } from 'bun'
import { Prompt } from './console/prompt'
import { Client } from './client'
import { decode } from './codec'
import { handlePacket } from './handler/handler'

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
					const client = this.getClient(socket as Socket)
					if (!client) return

					// TODO: rework this, rn works
					while (client.buffer.length < data.length) {
						const packet = decode(data)
						if (!packet) break
						handlePacket(client, packet)
					}
				},
				open: (socket) => {
					const client = new Client(socket as Socket)
					this.clients.add(client)
				},
				close: (socket) => {
					const client = this.getClient(socket as Socket)
					if (client) this.clients.delete(client)
				},
				error: (socket, error) => {
					const client = this.getClient(socket as Socket)
					if (client) this.clients.delete(client)
					this.prompt.error(error.message)
				}
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
