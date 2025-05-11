export class Prompt {
	private worker: Worker

	constructor(worker: Worker) {
		this.worker = worker
	}

	async listen(): Promise<void> {
		for await (const line of console) {
			const command = line.trim()
			this.worker.postMessage({ type: 'command', data: command })
		}
	}
}
