'use client'

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
	issueId: number
	defaultValue?: number
	users: {
		id: number
		name: string
	}[]
}

const UpdateAssignedUser: FC<Props> = ({ defaultValue, users, issueId }) => {
	return (
		<Select
			onValueChange={async (val: string) => {
				await updateIssue(issueId, { assignedUser: parseInt(val) })
			}}
			defaultValue={defaultValue?.toString()}
		>
			<SelectTrigger>
				<SelectValue placeholder='Tildel' />
			</SelectTrigger>
			<SelectContent>
				{users.map(user => (
					<SelectItem
						key={user.id}
						value={user.id.toString()}
					>
						{user.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export default UpdateAssignedUser
