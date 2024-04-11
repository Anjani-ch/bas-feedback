'use server'

import { createIssueUseCase } from '@/use-cases/issue'
import { insertIssueSchema, InsertIssueSchema } from '@/zod/db/issue'
import { createIssue as createIssueData } from '@/data-access/issue'

export const createIssue = async (data: InsertIssueSchema) => {
	try {
		const parsed = await insertIssueSchema.parseAsync(data)

		await createIssueUseCase({ createIssue: createIssueData }, parsed)
	} catch (err) {
		console.log(err)
	}
}
