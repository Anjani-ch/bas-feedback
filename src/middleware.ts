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

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
}
