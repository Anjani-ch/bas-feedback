import { UserInsertZodSchema, UserSelectZodSchema } from '@/db/schema'

export type CreateUser = (user: UserInsertZodSchema) => Promise<void>
export type GetUserByEmail = (
	email: string
) => Promise<UserSelectZodSchema | null>
export type GetUsers = () => Promise<UserSelectZodSchema[]>
