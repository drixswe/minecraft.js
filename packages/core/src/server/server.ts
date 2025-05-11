import { configSchema, type Config } from '@config/config'
import { Prompt } from './prompt'

export class Server {
	private socket?: Worker
	private prompt?: Prompt
	config: Config

	constructor(config: Partial<Config> = {}) {
		this.config = configSchema.parse(config)
	}

	start(): void {
		if (this.socket) {
			throw new Error('An instance of a server is already running!')
		}

		this.socket = new Worker('./workers/socket.ts')

		this.socket?.postMessage({ type: 'start', data: this.config })
		this.prompt = new Prompt(this.socket)
		this.prompt.listen()
	}
}
