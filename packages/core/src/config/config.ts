import { z } from 'zod'

const schema = z.object({
	address: z.string().optional().default('localhost'),
	port: z.number().optional().default(25565)
})

export type Config = z.infer<typeof schema>
