'use client'

import { cn } from '@/lib/utils'
import { CommentType } from '@/types/db/comment'
import { FC } from 'react'
import AddIssueComment, {
	Props as AddIssueCommentProps,
} from '../forms/AddIssueComment'
import { addComment } from '../_actions/addComment.action'

type Comment = {
	message: string | null
	type: CommentType
}

type Props = Pick<AddIssueCommentProps, 'allowInternalNote'> & {
	comments: Comment[]
	issueId: number
}

const IssueComments: FC<Props> = ({ comments, issueId, allowInternalNote }) => {
	return (
		<>
			<div className='mt-5 border-b pb-2'>
				<AddIssueComment
					onSubmit={async ({ type, content, close }) => {
						close()

						if (!content?.trim()) return

						await addComment({
							content,
							type,
							issueId,
						})
					}}
					allowInternalNote={allowInternalNote}
				/>
			</div>

			<div className='mt-6'>
				{comments.length !== 0
					? comments.map((comment, idx) => (
							<div
								key={idx}
								className={cn(
									'border-y py-5 px-3 mb-7 text-prose whitespace-pre-line',
									{
										'bg-yellow-200': comment.type === CommentType.Internal,
									}
								)}
							>
								{comment.message}
							</div>
					  ))
					: 'Ingen kommentarer'}
			</div>
		</>
	)
}

export default IssueComments
