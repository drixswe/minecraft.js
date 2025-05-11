declare const self: Worker

self.onmessage = (event: MessageEvent) => {
	const { type, data } = event.data
	console.log('Worker received message:', type, data)
}
