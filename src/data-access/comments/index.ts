import { db } from '@/db'
import { CommentInsertZodSchema, comments } from '@/db/schema'
import { CommentType } from '@/types/db/comment'
import { and, desc, eq } from 'drizzle-orm'

export const getCommentsForIssue = async (
	issueId: number,
	includeInternal?: boolean
) => {
	return await db
		.select()
		.from(comments)
		.where(
			includeInternal
				? eq(comments.issueId, issueId)
				: and(
						eq(comments.issueId, issueId),
						eq(comments.type, CommentType.Dialog)
				  )
		)
		.orderBy(desc(comments.createdAt))
}

export const createComment = async (comment: CommentInsertZodSchema) => {
	await db.insert(comments).values(comment)
}
