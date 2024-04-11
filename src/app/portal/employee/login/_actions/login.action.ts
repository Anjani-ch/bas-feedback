'use server'

import { LoginAuthZodSchema } from '@/zod/auth'
import bcrypt from 'bcrypt'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { SessionData, sessionOptions } from '@/config/iron-session'
import { redirect } from 'next/navigation'
import { getUserByEmailUseCase } from '@/use-cases/user'
import { getUserByEmail } from '@/data-access/users'

export const login = async (data: LoginAuthZodSchema) => {
	const user = await getUserByEmailUseCase(
		{ getUserByEmail },
		{
			email: data.email,
		}
	)

	if (!user)
		return {
			errors: {
				email: `Ansatt med e-post "${data.email}" har ikke tilgang`,
			},
		}

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
