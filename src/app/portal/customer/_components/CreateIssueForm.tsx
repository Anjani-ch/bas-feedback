'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { IssuePriority } from '@/types/db/issue'
import { createIssue } from './_actions/createIssue.action'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { insertIssueSchema, InsertIssueSchema } from '@/zod/db/issue'
import { useToast } from '@/components/ui/use-toast'

const CreateIssueForm = () => {
	const form = useForm<InsertIssueSchema>({
		resolver: zodResolver(insertIssueSchema),
		mode: 'all',
	})

	const { toast } = useToast()

	const handleOnSubmit: SubmitHandler<InsertIssueSchema> = async values => {
		try {
			await createIssue(values)

			form.setValue('fromEmail', '')
			form.setValue('title', '')
			form.setValue('description', '')
			toast({
				title: 'Hendvendelse opprettet',
			})
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleOnSubmit)}>
				<FormField
					control={form.control}
					name='fromEmail'
					render={({ field }) => (
						<div>
							<FormLabel>E-post:</FormLabel>
							<Input
								type='text'
								{...field}
								value={field.value || ''}
								id='fromEmail'
								placeholder='E-post'
								className='mt-2'
							/>
						</div>
					)}
				/>

				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<div className='mt-7'>
							<FormLabel>Oppsummering/Emne:</FormLabel>
							<Input
								type='text'
								{...field}
								value={field.value || ''}
								id='title'
								placeholder='Emne'
								className='mt-2'
							/>
						</div>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<div className='mt-7'>
							<FormLabel>Beskrivelse:</FormLabel>
							<Textarea
								{...field}
								value={field.value || ''}
								id='description'
								placeholder='Beskrivelse'
								className='mt-2 resize-none'
								rows={10}
							/>
						</div>
					)}
				/>

				<FormField
					control={form.control}
					name='priority'
					render={({ field }) => (
						<div className='mt-7'>
							<FormItem>
								<FormLabel className='mb-2'>Prioritet:</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Prioritet' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value={IssuePriority.Low.toString()}>
											Lav
										</SelectItem>
										<SelectItem value={IssuePriority.Medium.toString()}>
											Middels
										</SelectItem>
										<SelectItem value={IssuePriority.High.toString()}>
											Høy
										</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						</div>
					)}
				/>

				<div className='mt-7'>
					<Button
						type='submit'
						disabled={
							!form.formState.isDirty ||
							form.formState.isSubmitting ||
							!form.formState.isValid
						}
					>
						Send inn
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default CreateIssueForm
