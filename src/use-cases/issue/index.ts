import { InsertIssueSchema } from '@/zod/db/issue'
import {
	CreateIssue,
	GetIssueAssignedUser,
	GetIssueById,
	GetIssuesWithAssignedUser,
	UpdateIssue,
} from './types'
import { IssueInsertZodSchema } from '@/db/schema'

export const createIssueUseCase = async (
	context: {
		createIssue: CreateIssue
	},
	data: InsertIssueSchema
) => {
	await context.createIssue({
		...data,
		assignedUser: null,
		priority: parseInt(data.priority),
	})
}

export const getIssuesWithAssignedUserUseCase = async (context: {
	getIssuesWithAssignedUser: GetIssuesWithAssignedUser
}) => {
	return await context.getIssuesWithAssignedUser()
}

export const updateIssueUseCase = async (
	context: {
		updateIssue: UpdateIssue
	},
	data: Partial<Omit<IssueInsertZodSchema, 'id'>> & { id: number }
) => {
	await context.updateIssue(
		{
			...data,
			id: undefined,
		},
		data.id
	)
}

export const getIssueByIdUseCase = async (
	context: {
		getIssueById: GetIssueById
	},
	data: {
		id: number
	}
) => {
	return await context.getIssueById(data.id)
}

export const getIssueAssignedUserUseCase = async (
	context: {
		getIssueAssignedUser: GetIssueAssignedUser
	},
	data: {
		assignedUserId: number | null
	}
) => {
	return await context.getIssueAssignedUser(data.assignedUserId)
}
