'use client'

import { IssueStatus, issueStatusLabels } from '@/types/db/issue'
import { FC, useCallback, useState } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { updateIssue } from './_actions/updateIssue.action'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import AddIssueComment from './AddIssueComment'
import { Button } from '@/components/ui/button'
import { CommentType } from '@/types/db/comment'
import { addComment } from '../_actions/addComment.action'

type Props = {
	defaultValue: IssueStatus
	issueId: number
	isTableUpdate?: boolean
}

type NumericString = `${number}`

const UpdateIssueStatus: FC<Props> = ({
	defaultValue,
	issueId,
	isTableUpdate,
}) => {
	const [dialogOpen, setDialogOpen] = useState(false)
	const [selectValue, setSelectValue] = useState<NumericString>(
		defaultValue.toString() as NumericString
	)
	const [comment, setComment] = useState<{
		content: string
		type: CommentType
	}>()

	return (
		<>
			<Dialog
				open={dialogOpen}
				onOpenChange={val => {
					if (!val) setSelectValue(defaultValue.toString() as NumericString)
					setDialogOpen(val)
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{issueStatusLabels[IssueStatus.Resolved]}</DialogTitle>
						<DialogDescription>
							Her kan du legge med en siste kommentar mens du løser.
						</DialogDescription>
					</DialogHeader>

					<div>
						<AddIssueComment
							onChange={setComment}
							allowInternalNote
							hideActionButtons
						/>
						<div className='flex gap-3 mt-4'>
							<Button
								onClick={async () => {
									setDialogOpen(false)

									if (comment && comment.content.trim().length !== 0) {
										await addComment({
											...comment,
											issueId,
										})
									}

									await updateIssue(
										issueId,
										{ status: IssueStatus.Resolved },
										isTableUpdate
									)
								}}
							>
								Lagre
							</Button>
							<Button
								variant='secondary'
								onClick={() => {
									setSelectValue(defaultValue.toString() as NumericString)
									setDialogOpen(false)
								}}
							>
								Lukk
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			<Select
				value={selectValue}
				onValueChange={async (val: NumericString) => {
					setSelectValue(val)
					if (val === IssueStatus.Resolved.toString()) {
						setDialogOpen(true)
						return
					}

					await updateIssue(issueId, { status: parseInt(val) }, isTableUpdate)
				}}
			>
				<SelectTrigger>
					<SelectValue placeholder='Status' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={IssueStatus.Open.toString()}>
						{issueStatusLabels[IssueStatus.Open]}
					</SelectItem>
					<SelectItem value={IssueStatus.InProgress.toString()}>
						{issueStatusLabels[IssueStatus.InProgress]}
					</SelectItem>
					<SelectItem value={IssueStatus.Pending.toString()}>
						{issueStatusLabels[IssueStatus.Pending]}
					</SelectItem>
					<SelectItem value={IssueStatus.Resolved.toString()}>
						{issueStatusLabels[IssueStatus.Resolved]}
					</SelectItem>
				</SelectContent>
			</Select>
		</>
	)
}

export default UpdateIssueStatus
