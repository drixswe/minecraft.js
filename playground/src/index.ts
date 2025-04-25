import { Server } from 'minecraft.js'

const server = new Server()
server.start()

setTimeout(() => {
  server.stop()
}, 20 * 1000)
