import { type Config, configSchema } from '@config/config.js'
import type { TCPSocketListener } from 'bun'
import type { Packet } from 'protocol'
import { Client } from './client'
import { decode } from './codec'

export class Server {
	private listener: TCPSocketListener | null = null
	private clients: Set<Client> = new Set()
	config: Config

	constructor(config?: Config) {
		this.config = configSchema.parse(config)
	}

	public start(): void {
		this.listener = Bun.listen<Packet>({
			hostname: this.config.address,
			port: this.config.port,
			socket: {
				data: (socket, data) => {
					const client = this.clients
						.values()
						.find((client) => client.socket === socket)

					if (client) {
						const buffer = Buffer.from(data.buffer)
						const packet = decode(buffer)
						socket.data = { ...packet }

						console.log(`Received packet with id: ${socket.data.id}`)
					}
				},
				open: (socket) => {
					const client = new Client(socket)
					this.clients.add(client)
				},
				error: (socket, error) => {
					console.error(`Error on socket: ${error.message}`)

					const client = this.clients
						.values()
						.find((client) => client.socket === socket)

					if (client) this.clients.delete(client)
				}
			}
		})

		console.log(`Server running at ${this.config.address}:${this.config.port}`)
	}

	public stop(): void {
		if (this.listener) {
			this.listener.stop(true)
			this.listener.unref()
			this.listener = null
		}

		this.clients.clear()
		console.log('Server stopped')
	}
}
