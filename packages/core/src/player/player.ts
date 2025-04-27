import type { Client } from '@server/client'

export interface Player {
	uuid: string
	name: string
  disconnect(): void
}

export class PlayerImpl implements Player {
	private client: Client
	uuid: string
	name: string

	constructor(client: Client, name: string, uuid: string) {
		this.client = client
		this.uuid = uuid
		this.name = name
	}

	public disconnect(): void {
		this.client.disconnect()
	}
}
