'use server'

import { createComment } from '@/data-access/comments'
import { CommentType } from '@/types/db/comment'
import { createCommentUseCase } from '@/use-cases/comments'
import { revalidatePath } from 'next/cache'

type Data = {
	content: string | null
	type: CommentType
	issueId: number
}

export const addComment = async (data: Data) => {
	await createCommentUseCase({ createComment }, data)

	revalidatePath(`/portal/customers/issue/${data.issueId}`)
}
