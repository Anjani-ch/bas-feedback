'use server'

import { db } from '@/db'
import { users } from '@/db/schema'
import { LoginAuthZodSchema } from '@/zod/auth'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { SessionData, sessionOptions } from '@/config/iron-session'
import { redirect } from 'next/navigation'

export const login = async (data: LoginAuthZodSchema) => {
	const usersWithEmail = await db
		.select()
		.from(users)
		.where(eq(users.email, data.email))

	if (usersWithEmail.length !== 1)
		return {
			errors: {
				email: `Ansatt med e-post "${data.email}" har ikke tilgang`,
			},
		}

	const user = usersWithEmail[0]

	if (!(await bcrypt.compare(data.password, user.passwordHash)))
		return {
			errors: {
				password: 'Feil passord',
			},
		}

	const session = await getIronSession<SessionData>(cookies(), sessionOptions)

	session.user = {
		id: user.id,
		name: user.name,
		email: user.email,
	}

	await session.save()

	redirect('/portal/employee')
}
