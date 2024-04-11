import { CommentType } from '@/types/db/comment'
import { CreateComment, GetCommentForIssue } from './types'

export const getCommentsForIssueUseCase = async (
	context: {
		getCommentsForIssue: GetCommentForIssue
	},
	data: {
		issueId: number
		includeInternal?: boolean
	}
) => {
	return await context.getCommentsForIssue(data.issueId, data.includeInternal)
}

export const createCommentUseCase = async (
	context: {
		createComment: CreateComment
	},
	data: {
		content: string | null
		type: CommentType
		issueId: number
	}
) => {
	await context.createComment({
		content: data.content!,
		type: data.type,
		issueId: data.issueId,
	})
}
