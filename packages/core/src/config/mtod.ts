import { z } from 'zod'

const Version = z.object({
	name: z.string().optional().default('1.21.5'),
	protocol: z.number().optional().default(770)
})

const Sample = z.object({
	name: z.string(),
	id: z.string()
})

const Players = z.object({
	max: z.number().optional().default(10),
	online: z.number().optional().default(0),
	sample: z.array(Sample).optional().default([])
})

const Description = z.object({
	text: z.string().optional().default('A minecraft.js server!')
})

export const mtodSchema = z.object({
	version: Version,
	players: Players,
	description: Description,
  favicon: z.string(),
  enforceSecureChat: z.boolean().optional().default(false)
})

export type Mtod = z.infer<typeof mtodSchema>
