'use client'

import { IssuePriority, issuePriorityLabels } from '@/types/db/issue'
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
	defaultValue: IssuePriority
	issueId: number
}

const UpdateIssuePriority: FC<Props> = ({ defaultValue, issueId }) => {
	return (
		<Select
			onValueChange={async (val: string) => {
				await updateIssue(issueId, { priority: parseInt(val) })
			}}
			defaultValue={defaultValue.toString()}
		>
			<SelectTrigger>
				<SelectValue placeholder='Prioritet' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={IssuePriority.Low.toString()}>
					{issuePriorityLabels[IssuePriority.Low]}
				</SelectItem>
				<SelectItem value={IssuePriority.Medium.toString()}>
					{issuePriorityLabels[IssuePriority.Medium]}
				</SelectItem>
				<SelectItem value={IssuePriority.High.toString()}>
					{issuePriorityLabels[IssuePriority.High]}
				</SelectItem>
			</SelectContent>
		</Select>
	)
}

export default UpdateIssuePriority
