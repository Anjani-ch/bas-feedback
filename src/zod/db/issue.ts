import { z } from 'zod'

export const insertIssueSchema = z.object({
	fromEmail: z.string().email(),
	title: z.string().min(1),
	description: z.string().min(1),
	priority: z.string().min(1),
})

export type InsertIssueSchema = z.infer<typeof insertIssueSchema>
