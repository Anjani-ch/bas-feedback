'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from './_actions/login.action'
import { SubmitHandler, useForm } from 'react-hook-form'
import { loginAuthZodSchema, LoginAuthZodSchema } from '@/zod/auth'
import { zodResolver } from '@hookform/resolvers/zod'

const Page = () => {
	const {
		register,
		handleSubmit,
		formState: { isValid, isSubmitting, isDirty, errors },
		setError,
	} = useForm<LoginAuthZodSchema>({
		resolver: zodResolver(loginAuthZodSchema),
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<LoginAuthZodSchema> = async values => {
		const res = await login(values)

		if (res?.errors) {
			if (res.errors.email) {
				setError('email', {
					message: res.errors.email,
				})
			}

			if (res.errors.password) {
				setError('password', {
					message: res.errors.password,
				})
			}
		}
	}

	return (
		<Card className='max-w-xl mx-auto mt-44'>
			<CardHeader>
				<CardTitle>Login</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-y-7'
				>
					<div>
						<Label htmlFor='email'>E-post:</Label>
						<Input
							className='mt-1.5'
							type='text'
							{...register('email')}
							id='email'
							placeholder='E-post'
							required
						/>

						{errors.email?.message && (
							<p
								className='text-red-500 mt-1.5'
								role='alert'
							>
								{errors.email.message}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor='password'>Passord:</Label>
						<Input
							className='mt-1.5'
							type='password'
							{...register('password')}
							id='password'
							placeholder='Passord'
							required
						/>

						{errors.password?.message && (
							<p
								className='text-red-500 mt-1.5'
								role='alert'
							>
								{errors.password.message}
							</p>
						)}
					</div>

					<div>
						<Button
							type='submit'
							disabled={!isValid || isSubmitting || !isDirty}
						>
							Login
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	)
}

export default Page
