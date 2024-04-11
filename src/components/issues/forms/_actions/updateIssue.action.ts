'use server'

import { issueInsertZodSchema } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { updateIssue as updateIssueData } from '@/data-access/issue'
import { updateIssueUseCase } from '@/use-cases/issue'

export const updateIssue = async (
	issueId: number,
	data: Partial<z.infer<typeof issueInsertZodSchema>>,
	isTableUpdate?: boolean
) => {
	await updateIssueUseCase(
		{ updateIssue: updateIssueData },
		{
			...data,
			id: issueId,
		}
	)

	revalidatePath(
		isTableUpdate ? '/portal/employee' : `/portal/employee/issue/${issueId}`
	)
}
