import readline, { type Interface } from 'node:readline'
import colors from 'picocolors'

export class Prompt {
	private interface: Interface

	constructor() {
		this.interface = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			prompt: colors.green('> ')
		})
		this.handleInput()
	}

	info(message: string): void {
		this.promptLog(colors.green(`${colors.bold('[INFO]')} ${message}`))
	}

	warning(message: string): void {
		this.promptLog(colors.yellow(`${colors.bold('[WARNING]')} ${message}`))
	}

	error(message: string): void {
		this.promptLog(colors.red(`${colors.bold('[ERROR]')} ${message}`))
	}

	private promptLog(message: string): void {
		process.stdout.clearLine(0)
		process.stdout.cursorTo(0)
		console.log(colors.gray(`[${this.getTime()}]`), message)
		this.interface.prompt()
	}

	private getTime(): string {
		const date = new Date()
		const h = String(date.getHours()).padStart(2, '0')
		const m = String(date.getMinutes()).padStart(2, '0')
		const s = String(date.getSeconds()).padStart(2, '0')
		return `${h}:${m}:${s}`
	}

	private handleInput(): void {
		this.interface.prompt()
		this.interface.on('line', (line) => {
			// TODO: Handle input (commands)
			this.interface.prompt()
		})
	}
}
