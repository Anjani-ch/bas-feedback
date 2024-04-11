import { CommentInsertZodSchema, CommentSelectZodSchema } from '@/db/schema'

export type GetCommentForIssue = (
	issueId: number,
	includeInternal?: boolean
) => Promise<CommentSelectZodSchema[]>
export type CreateComment = (comment: CommentInsertZodSchema) => Promise<void>
