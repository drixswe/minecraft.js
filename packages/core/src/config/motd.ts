import { z } from 'zod'

const versionSchema = z.object({
	name: z.string().default('1.21.5'),
	protocol: z.number().default(770)
})

const playersSchema = z.object({
	max: z.number().default(20),
	online: z.number().default(0)
})

const descriptionSchema = z.object({
	text: z.string().default('A Minecraft.JS server!')
})

export const motdSchema = z.object({
	version: versionSchema.default({}),
	players: playersSchema.default({}),
	description: descriptionSchema.default({})
})

export type Motd = z.infer<typeof motdSchema>
