import { SessionOptions } from 'iron-session'

export type SessionData = {
	user: {
		id: number
		email: string
		name: string
	}
}

export const sessionOptions: SessionOptions = {
	password: process.env.COOKIE_PASSWORD!,
	cookieName: 'Bas feedback',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
}
