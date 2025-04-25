import { z } from 'zod'

export const schema = z.object({
	address: z.string().optional().default('0.0.0.0'),
	port: z.number().optional().default(3000)
}).default({})

export type Config = z.infer<typeof schema>
