import { getIronSession } from 'iron-session'
import { NextRequest, NextResponse } from 'next/server'
import { SessionData, sessionOptions } from './config/iron-session'

export const middleware = async (req: NextRequest) => {
	const res = NextResponse.next()
	const session = await getIronSession<SessionData>(req, res, sessionOptions)

	const {
		url,
		nextUrl: { pathname },
	} = req

	if (
		pathname.startsWith('/portal/employee') &&
		pathname !== '/portal/employee/login' &&
		!session.user
	) {
		return NextResponse.redirect(new URL('/portal/employee/login', url))
	}

	return res
}
