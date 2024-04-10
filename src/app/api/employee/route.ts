import { db } from '@/db'
import { users } from '@/db/schema'
import { NextRequest, NextResponse } from 'next/server'
import { z, ZodError } from 'zod'
import bcrypt from 'bcrypt'

const zodSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(1),
})

export const POST = async (req: NextRequest) => {
	const body = await req.json()

	let result

	try {
		result = await zodSchema.parseAsync(body)
	} catch (err) {
		return NextResponse.json((err as ZodError).errors)
	}

	try {
		const salt = await bcrypt.genSalt()

		const hash = await bcrypt.hash(result.password, salt)

		await db.insert(users).values({
			email: result.email,
			name: result.name,
			passwordHash: hash,
		})
	} catch (err) {
		return NextResponse.json(err)
	}

	return new NextResponse(null, {
		status: 200,
	})
}
