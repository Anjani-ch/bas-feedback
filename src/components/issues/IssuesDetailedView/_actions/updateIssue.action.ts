'use server'

import { db } from '@/db'
import { issueInsertZodSchema, issues } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const updateIssue = async (
	issueId: number,
	data: Partial<z.infer<typeof issueInsertZodSchema>>
) => {
	await db.update(issues).set(data).where(eq(issues.id, issueId))

	revalidatePath(`/portal/employee/issue/${issueId}`)
}
