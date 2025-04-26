import { z } from 'zod'

export const configSchema = z.object({
	address: z.string().optional().default('0.0.0.0'),
	port: z.number().optional().default(25565),
}).default({})

export type Config = z.infer<typeof configSchema>
