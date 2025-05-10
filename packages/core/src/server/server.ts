import { configSchema, type Config } from '@config/config'

export class Server {
	config: Config

	constructor(config: Partial<Config> = {}) {
		this.config = configSchema.parse(config)
	}
}
