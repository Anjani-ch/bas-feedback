'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { FC } from 'react'
import { updateIssue } from '../_actions/updateIssue.action'

export type Props = {
	issueId: number
	defaultValue?: number
	users?: {
		id: number
		name: string
	}[]
	isTableUpdate?: boolean
}

const UpdateAssignedUserClient: FC<Props> = ({
	issueId,
	users = [],
	defaultValue,
	isTableUpdate,
}) => {
	return (
		<Select
			onValueChange={async (val: string | null) => {
				await updateIssue(
					issueId,
					{ assignedUser: typeof val === 'string' ? parseInt(val) : val },
					isTableUpdate
				)
			}}
			defaultValue={defaultValue ? defaultValue.toString() : null}
		>
			<SelectTrigger>
				<SelectValue placeholder='Tildel' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={null}>Ingen</SelectItem>

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

export default UpdateAssignedUserClient
