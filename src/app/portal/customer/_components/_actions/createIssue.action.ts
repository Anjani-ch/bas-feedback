'use server'

import { db } from '@/db'
import { issues } from '@/db/schema'
import { insertIssueSchema, InsertIssueSchema } from '@/zod/db/issue'

export const createIssue = async (data: InsertIssueSchema) => {
	try {
		await insertIssueSchema.parseAsync(data)

		await db.insert(issues).values({
			assignedUser: null,
			description: data.description,
			fromEmail: data.fromEmail,
			priority: parseInt(data.priority),
			title: data.title,
		})
	} catch (err) {
		console.log(err)
	}
}
