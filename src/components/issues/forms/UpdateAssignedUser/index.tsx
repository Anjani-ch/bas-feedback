import { FC } from 'react'
import UpdateAssignedUserClient, {
	Props as UpdateAssignedUserClientProps,
} from './UpdateAssignedUserClient'
import { getUsersUseCase } from '@/use-cases/user'
import { getUsers } from '@/data-access/users'

const UpdateAssignedUser: FC<UpdateAssignedUserClientProps> = async ({
	defaultValue,
	issueId,
}) => {
	const users = await getUsersUseCase({ getUsers })

	return (
		<UpdateAssignedUserClient
			defaultValue={defaultValue}
			issueId={issueId}
			users={users.map(user => ({
				id: user.id,
				name: user.name,
			}))}
		/>
	)
}

export default UpdateAssignedUser
