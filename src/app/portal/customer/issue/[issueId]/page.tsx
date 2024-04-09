import { db } from '@/db'
import { comments, issues } from '@/db/schema'
import {
	IssuePriority,
	issuePriorityLabels,
	IssueStatus,
	issueStatusLabels,
} from '@/types/db/issue'
import { desc, eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import IssueComments from './_components/IssueComments'

type Props = {
	params: {
		issueId: string
	}
}

const Page: FC<Props> = async ({ params }) => {
	let issueId: string | number = params.issueId

	if (!issueId || isNaN(parseInt(issueId))) notFound()

	issueId = parseInt(issueId) as number

	const issue = (
		await db.select().from(issues).where(eq(issues.id, issueId))
	)[0]

	const issueComments = await db
		.select()
		.from(comments)
		.where(eq(comments.issueId, issueId))
		.orderBy(desc(comments.createdAt))

	return (
		<div className='grid grid-cols-5 gap-12'>
			<div className='col-span-4'>
				<main className='border-b pb-12'>
					<h2 className='font-semibold text-3xl'>{issue.title}</h2>

					<div className='mt-8'>{issue.description}</div>
				</main>

				<IssueComments
					issueId={issueId}
					comments={issueComments.map(comment => ({
						message: comment.content,
						type: comment.type,
					}))}
				/>
			</div>

			<aside className='border-l flex flex-col gap-y-8 text-xl pl-4'>
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
			</aside>
		</div>
	)
}

export default Page
