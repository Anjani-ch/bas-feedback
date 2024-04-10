'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { FC, useState } from 'react'
import { CommentType } from '@/types/db/comment'
import { cn } from '@/lib/utils'

type CommentPayload = { content: string; type: CommentType }

export type Props = {
	allowInternalNote?: boolean
	onChange?: (payload: CommentPayload) => void
	onSubmit?: (payload: CommentPayload & { close: () => void }) => Promise<void>
	hideActionButtons?: boolean
}

const AddIssueComment: FC<Props> = ({
	allowInternalNote,
	onChange,
	onSubmit,
	hideActionButtons,
}) => {
	const [showAddCommentForm, setShowAddCommentForm] = useState(false)
	const [commentType, setCommentType] = useState<CommentType>()
	const [commentContent, setCommentContent] = useState<string>()

	return (
		<>
			<div className='flex gap-6 mb-3'>
				{allowInternalNote && (
					<button
						className={cn({
							underline:
								commentType === CommentType.Internal && showAddCommentForm,
						})}
						onClick={() => {
							setShowAddCommentForm(true)
							setCommentType(CommentType.Internal)

							if (onChange) {
								onChange({
									type: CommentType.Internal,
									content: commentContent!,
								})
							}
						}}
					>
						Legg til intern kommentar
					</button>
				)}
				<button
					className={cn({
						underline: commentType === CommentType.Dialog && showAddCommentForm,
					})}
					onClick={() => {
						setShowAddCommentForm(true)
						setCommentType(CommentType.Dialog)

						if (onChange) {
							onChange({
								type: CommentType.Dialog,
								content: commentContent!,
							})
						}
					}}
				>
					Legg til kommentar
				</button>
			</div>

			{showAddCommentForm && (
				<>
					<Textarea
						rows={7}
						className='resize-none'
						placeholder='Legg til kommentar...'
						onChange={e => {
							const value = (e.target as HTMLTextAreaElement).value
							setCommentContent(value)

							if (onChange) {
								onChange({
									type: commentType!,
									content: value,
								})
							}
						}}
					/>

					{!hideActionButtons && (
						<div className='flex gap-3 mt-3'>
							<Button
								onClick={() => {
									if (onSubmit) {
										onSubmit({
											type: commentType!,
											content: commentContent!,
											close: () => setShowAddCommentForm(false),
										})
									}
								}}
							>
								Send
							</Button>
							<Button
								variant='secondary'
								onClick={() => setShowAddCommentForm(false)}
							>
								Avbryt
							</Button>
						</div>
					)}
				</>
			)}
		</>
	)
}
export default AddIssueComment
