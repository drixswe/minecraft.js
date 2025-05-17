import { type Config, configSchema } from '@config/config'
import { Prompt } from './prompt'

export class Server {
	config: Config
	prompt: Prompt

	constructor(config: Partial<Config> = {}) {
		this.config = configSchema.parse(config)
		this.prompt = new Prompt()
	}

	start(): void {
		Bun.listen({
			hostname: this.config.address,
			port: this.config.port,
			socket: {
				data(socket, data) {},
				open(socket) {},
				close(socket, error) {},
				drain(socket) {},
				error(socket, error) {}
			}
		})

		this.prompt.info(
			`Server started at ${this.config.address}:${this.config.port}`
		)
	}
}
