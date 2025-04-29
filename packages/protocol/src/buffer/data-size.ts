export enum DataSize {
	Byte = 1,
	Short = 2,
	Int = 4,
	Long = 8,
	Float = 4,
	Double = 8
}

export const varInt = (value: number): number => {
	if (value < 0) {
		return 5
	}

	if (value < 1 << 7) return 1
	if (value < 1 << 14) return 2
	if (value < 1 << 21) return 3
	if (value < 1 << 28) return 4
	return 5
}

export const varLong = (value: bigint): number => {
	if (value < 0n) {
		return 10
	}

	if (value < 1n << 7n) return 1
	if (value < 1n << 14n) return 2
	if (value < 1n << 21n) return 3
	if (value < 1n << 28n) return 4
	if (value < 1n << 35n) return 5
	if (value < 1n << 42n) return 6
	if (value < 1n << 49n) return 7
	if (value < 1n << 56n) return 8
	if (value < 1n << 63n) return 9
	return 10
}

export const string = (value: string): number => {
	const length = Buffer.byteLength(value, 'utf8')
	return varInt(length) + length
}

export const stringArray = (array: string[]): number => {
	let size = varInt(array.length)

	for (const value of array) {
		size += string(value)
	}

	return size
}

