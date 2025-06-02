import { configSchema, type Config } from '@config/config'
import net, { type Server as Listener } from 'node:net'
import { Connection } from './connection'

export class Server {
  private listener?: Listener
  config: Config

  constructor(config: Partial<Config> = {}) {
    this.config = configSchema.parse(config)
  }

  start(): void {
    if (this.listener) {
      throw new Error('Server is already running!')
    }

    this.listener = net
      .createServer((socket) => {
        const connection = new Connection(socket)

        socket
          .on('data', (data) => console.log(data.buffer))
          .on('error', () => {})
          .on('close', () => {})
      })
      .listen(this.config.port, this.config.address)

    console.log(`Server started at ${this.config.address}:${this.config.port}`)
  }

  stop(): void {
    if (!this.listener) {
      throw new Error('Server is not running!')
    }

    this.listener.close()
    this.listener.unref()
  }
}
