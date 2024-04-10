'use server'

import { db } from '@/db'
import { comments } from '@/db/schema'
import { CommentType } from '@/types/db/comment'
import { revalidatePath } from 'next/cache'

type Data = {
	content: string | null
	type: CommentType
	issueId: number
}

export const addComment = async (data: Data) => {
	await db.insert(comments).values({
		content: data.content!,
		type: data.type,
		issueId: data.issueId,
	})

	revalidatePath(`/portal/customers/issue/${data.issueId}`)
}
