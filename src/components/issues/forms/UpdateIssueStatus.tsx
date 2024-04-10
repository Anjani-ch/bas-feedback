'use client'

import { IssueStatus, issueStatusLabels } from '@/types/db/issue'
import { FC } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { updateIssue } from './_actions/updateIssue.action'

type Props = {
	defaultValue: IssueStatus
	issueId: number
	isTableUpdate?: boolean
}

const UpdateIssueStatus: FC<Props> = ({
	defaultValue,
	issueId,
	isTableUpdate,
}) => {
	return (
		<Select
			onValueChange={async (val: string) => {
				await updateIssue(issueId, { status: parseInt(val) }, isTableUpdate)
			}}
			defaultValue={defaultValue.toString()}
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
	)
}

export default UpdateIssueStatus
