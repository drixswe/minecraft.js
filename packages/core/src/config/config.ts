import { z } from 'zod'

export const configSchema = z.object({
	address: z.string().default('127.0.0.1'),
	port: z.number().default(25565)
})

export type Config = z.infer<typeof configSchema>
