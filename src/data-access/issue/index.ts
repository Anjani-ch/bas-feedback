import { db } from '@/db'
import { IssueInsertZodSchema, issues, users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const createIssue = async (issue: IssueInsertZodSchema) => {
	await db.insert(issues).values(issue)
}

export const getIssuesWithAssignedUser = async () => {
	return await db
		.select({
			issue: issues,
			user: {
				name: users.name,
			},
		})
		.from(issues)
		.leftJoin(users, eq(issues.assignedUser, users.id))
}

export const updateIssue = async (
	issue: Partial<IssueInsertZodSchema>,
	issueId: number
) => {
	await db.update(issues).set(issue).where(eq(issues.id, issueId))
}

export const getIssueById = async (id: number) => {
	const results = await db.select().from(issues).where(eq(issues.id, id))

	if (results.length === 0) return null

	return results[0]
}

export const getIssueAssignedUser = async (assignedUserId: number | null) => {
	if (assignedUserId) {
		return (
			await db.select().from(users).where(eq(users.id, assignedUserId))
		)[0]
	}
	return null
}
