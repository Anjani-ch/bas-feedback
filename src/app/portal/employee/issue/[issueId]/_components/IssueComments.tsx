'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { CommentType } from '@/types/db/comment'
import { FC, useState } from 'react'
import { addComment } from './_actions/addComment.action'

type Comment = {
	message: string | null
	type: CommentType
}

type Props = {
	comments: Comment[]
	issueId: number
}

const IssueComments: FC<Props> = ({ comments, issueId }) => {
	const [showAddCommentForm, setShowAddCommentForm] = useState(false)
	const [commentType, setCommentType] = useState<CommentType>()

	return (
		<>
			<div className='mt-5'>
				<div className='flex gap-6 mb-3'>
					<button
						className={cn({
							underline:
								commentType === CommentType.Internal && showAddCommentForm,
						})}
						onClick={() => {
							setShowAddCommentForm(true)
							setCommentType(CommentType.Internal)
						}}
					>
						Legg til intern kommentar
					</button>
					<button
						className={cn({
							underline:
								commentType === CommentType.Dialog && showAddCommentForm,
						})}
						onClick={() => {
							setShowAddCommentForm(true)
							setCommentType(CommentType.Dialog)
						}}
					>
						Legg til kommentar
					</button>
				</div>

				{showAddCommentForm && (
					<form
						action={async (formData: FormData) => {
							const content = formData.get('content') as string | null

							setShowAddCommentForm(false)

							if (!content?.trim()) return

							await addComment({
								content: content,
								type: commentType!,
								issueId,
							})
						}}
					>
						<Textarea
							rows={7}
							className='resize-none'
							placeholder='Legg til kommentar...'
							name='content'
						/>

						<div className='flex gap-3 mt-3'>
							<Button type='submit'>Send</Button>
							<Button
								variant='secondary'
								onClick={() => setShowAddCommentForm(false)}
							>
								Avbryt
							</Button>
						</div>
					</form>
				)}
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
