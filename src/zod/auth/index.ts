import { z } from 'zod'

export const loginAuthZodSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
})

export type LoginAuthZodSchema = z.infer<typeof loginAuthZodSchema>
