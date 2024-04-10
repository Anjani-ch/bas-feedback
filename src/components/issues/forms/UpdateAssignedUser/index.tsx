import { FC } from 'react'
import UpdateAssignedUserClient, {
	Props as UpdateAssignedUserClientProps,
} from './UpdateAssignedUserClient'
import { db } from '@/db'
import { users } from '@/db/schema'

const UpdateAssignedUser: FC<UpdateAssignedUserClientProps> = async ({
	defaultValue,
	issueId,
}) => {
	const usersResult = await db.select().from(users)
	return (
		<UpdateAssignedUserClient
			defaultValue={defaultValue}
			issueId={issueId}
			users={usersResult.map(user => ({
				id: user.id,
				name: user.name,
			}))}
		/>
	)
}

export default UpdateAssignedUser
