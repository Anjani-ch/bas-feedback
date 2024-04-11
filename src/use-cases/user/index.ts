import { CreateUser, GetUserByEmail, GetUsers } from './types'
import bcrypt from 'bcrypt'

export const registerUserUseCase = async (
	context: {
		createUser: CreateUser
	},
	data: {
		name: string
		email: string
		password: string
	}
) => {
	const salt = await bcrypt.genSalt()

	const hash = await bcrypt.hash(data.password, salt)

	await context.createUser({
		email: data.email,
		name: data.name,
		passwordHash: hash,
	})
}

export const getUserByEmailUseCase = async (
	context: {
		getUserByEmail: GetUserByEmail
	},
	data: {
		email: string
	}
) => {
	return await context.getUserByEmail(data.email)
}

export const getUsersUseCase = async (context: { getUsers: GetUsers }) => {
	return await context.getUsers()
}
