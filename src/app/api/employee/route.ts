import { NextRequest, NextResponse } from 'next/server'
import { z, ZodError } from 'zod'
import { registerUserUseCase } from '@/use-cases/user'
import { createUser } from '@/data-access/users'

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
		await registerUserUseCase({ createUser }, result)
	} catch (err) {
		return NextResponse.json(err)
	}

	return new NextResponse(null, {
		status: 200,
	})
}
