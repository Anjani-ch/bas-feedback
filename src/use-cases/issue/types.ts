import {
	IssueInsertZodSchema,
	IssueSelectZodSchema,
	UserSelectZodSchema,
} from '@/db/schema'

export type CreateIssue = (issue: IssueInsertZodSchema) => Promise<void>
export type GetIssuesWithAssignedUser = () => Promise<
	{
		issue: IssueSelectZodSchema
		user: { name: string } | null
	}[]
>
export type UpdateIssue = (
	issue: Partial<IssueInsertZodSchema>,
	issueId: number
) => Promise<void>
export type GetIssueById = (id: number) => Promise<IssueSelectZodSchema | null>
export type GetIssueAssignedUser = (
	id: number | null
) => Promise<UserSelectZodSchema | null>
