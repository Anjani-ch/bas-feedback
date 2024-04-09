'use server'

import { db } from '@/db'
import { issues } from '@/db/schema'
import { insertIssueSchema, InsertIssueSchema } from '@/zod/db/issue'

export const createIssue = async (data: InsertIssueSchema) => {
	try {
		await insertIssueSchema.parseAsync(data)

		await db.insert(issues).values({
			...data,
			assignedUser: null,
			priority: parseInt(data.priority),
		})
	} catch (err) {
		console.log(err)
	}
}
