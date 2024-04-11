import { db } from '@/db'
import { UserInsertZodSchema, users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const createUser = async (user: UserInsertZodSchema) => {
	await db.insert(users).values(user)
}

export const getUserByEmail = async (email: string) => {
	const results = await db.select().from(users).where(eq(users.email, email))

	if (results.length === 0) return null
	return results[0]
}

export const getUsers = async () => {
	return await db.select().from(users)
}
