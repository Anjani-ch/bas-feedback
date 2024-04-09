import { db } from '@/db'
import { issues } from '@/db/schema'
import {
	IssuePriority,
	issuePriorityLabels,
	IssueStatus,
	issueStatusLabels,
} from '@/types/db/issue'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { FC } from 'react'

type Props = {
	params: {
		issueId?: string
	}
}

const Page: FC<Props> = async ({ params }) => {
	const issueId = params.issueId

	if (!issueId || isNaN(parseInt(issueId))) notFound()

	const issue = (
		await db
			.select()
			.from(issues)
			.where(eq(issues.id, parseInt(issueId)))
	)[0]

	return (
		<div className='grid grid-cols-5 gap-12'>
			<div className='col-span-4'>
				<main className='border-b pb-12'>
					<h2 className='font-semibold text-3xl'>{issue.title}</h2>

					<div className='mt-8'>{issue.description}</div>
				</main>

				{/* <div className='mt-5'>
				<Tabs defaultValue='internal-comment'>
					<TabsList>
						<TabsTrigger value='internal-comment'>
							Legg til intern kommentar
						</TabsTrigger>
						<TabsTrigger value='comment'>Legg till kommentar</TabsTrigger>
					</TabsList>
					<TabsContent>Internal</TabsContent>
					<TabsContent>Comment</TabsContent>
				</Tabs>
			</div> */}
			</div>

			<nav className='border-l flex flex-col gap-y-8 text-xl pl-4'>
				<div>Innmelder: {issue.fromEmail}</div>

				<div>Status: {issueStatusLabels[issue.status as IssueStatus]}</div>

				<div>
					Prioritet: {issuePriorityLabels[issue.priority as IssuePriority]}
				</div>

				<div>
					Opprettet:
					<br />
					{new Intl.DateTimeFormat('nb', {
						dateStyle: 'short',
					}).format(new Date(issue.createdAt))}
				</div>

				<div>
					Sist oppdatert:
					<br />
					{new Intl.DateTimeFormat('nb', {
						dateStyle: 'short',
					}).format(new Date(issue.updatedAt))}
				</div>
			</nav>
		</div>
	)
}

export default Page
