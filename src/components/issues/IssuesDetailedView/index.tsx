import { FC } from 'react'
import { db } from '@/db'
import { comments, issues, users } from '@/db/schema'
import {
	IssuePriority,
	issuePriorityLabels,
	IssueStatus,
	issueStatusLabels,
} from '@/types/db/issue'
import { and, desc, eq } from 'drizzle-orm'
import IssueComments from './IssueComments'
import UpdateIssueStatus from '../forms/UpdateIssueStatus'
import { CommentType } from '@/types/db/comment'
import UpdateIssuePriority from '../forms/UpdateIssuePriority'
import UpdateAssignedUser from '../forms/UpdateAssignedUser'
import Link from 'next/link'

type Props = {
	issueId: number
	isEmployee?: boolean
}

const IssuesDetailedView: FC<Props> = async ({ issueId, isEmployee }) => {
	const issue = (
		await db.select().from(issues).where(eq(issues.id, issueId))
	)[0]

	const issueComments = await db
		.select()
		.from(comments)
		.where(
			isEmployee
				? eq(comments.issueId, issueId)
				: and(
						eq(comments.issueId, issueId),
						eq(comments.type, CommentType.Dialog)
				  )
		)
		.orderBy(desc(comments.createdAt))

	const assignedUser = (
		await db
			.select()
			.from(users)
			.where(eq(users.id, issue.assignedUser || -1))
	)[0]

	return (
		<>
			<Link
				className='underline'
				href={`/portal/${isEmployee ? 'employee' : 'customer'}`}
			>
				Tilbake
			</Link>

			<div className='grid grid-cols-5 gap-12 mt-5'>
				<div className='col-span-4'>
					<main className='border-b pb-12'>
						<h2 className='font-semibold text-3xl border-b pb-2'>
							{issue.title}
						</h2>

						<div className='mt-8 whitespace-pre-line'>{issue.description}</div>
					</main>

					<IssueComments
						allowInternalNote={isEmployee}
						issueId={issueId}
						comments={issueComments.map(comment => ({
							message: comment.content,
							type: comment.type,
						}))}
					/>
				</div>

				<aside className='border-l flex flex-col gap-y-8 text-lg pl-4'>
					<div>Innmelder: {issue.fromEmail}</div>

					{isEmployee ? (
						<>
							<div>
								Tildelt:{' '}
								<UpdateAssignedUser
									issueId={issueId}
									defaultValue={assignedUser?.id || undefined}
								/>
							</div>

							<div>
								Status:{' '}
								<UpdateIssueStatus
									defaultValue={issue.status as IssueStatus}
									issueId={issueId}
								/>
							</div>

							<div>
								Prioritet:{' '}
								<UpdateIssuePriority
									defaultValue={issue.priority as IssuePriority}
									issueId={issueId}
								/>
							</div>
						</>
					) : (
						<>
							<div>
								Tildelt: <br />
								{assignedUser ? assignedUser.name : 'Ingen'}
							</div>

							<div>
								Status: <br />
								{issueStatusLabels[issue.status as IssueStatus]}
							</div>

							<div>
								Prioritet: <br />
								{issuePriorityLabels[issue.priority as IssuePriority]}
							</div>
						</>
					)}

					<div>
						Opprettet:
						<br />
						{new Intl.DateTimeFormat('nb', {
							hour: '2-digit',
							minute: '2-digit',
							day: '2-digit',
							month: '2-digit',
							year: '2-digit',
						}).format(new Date(issue.createdAt))}
					</div>

					<div>
						Sist oppdatert:
						<br />
						{new Intl.DateTimeFormat('nb', {
							hour: '2-digit',
							minute: '2-digit',
							day: '2-digit',
							month: '2-digit',
							year: '2-digit',
						}).format(new Date(issue.updatedAt))}
					</div>
				</aside>
			</div>
		</>
	)
}

export default IssuesDetailedView
