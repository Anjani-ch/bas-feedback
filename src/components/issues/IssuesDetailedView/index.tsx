import { FC } from 'react'
import {
	IssuePriority,
	issuePriorityLabels,
	IssueStatus,
	issueStatusLabels,
} from '@/types/db/issue'
import IssueComments from './IssueComments'
import UpdateIssueStatus from '../forms/UpdateIssueStatus'
import UpdateIssuePriority from '../forms/UpdateIssuePriority'
import UpdateAssignedUser from '../forms/UpdateAssignedUser'
import Link from 'next/link'
import {
	getIssueAssignedUserUseCase,
	getIssueByIdUseCase,
} from '@/use-cases/issue'
import { getIssueAssignedUser, getIssueById } from '@/data-access/issue'
import { notFound } from 'next/navigation'
import { getCommentsForIssueUseCase } from '@/use-cases/comments'
import { getCommentsForIssue } from '@/data-access/comments'

type Props = {
	issueId: number
	isEmployee?: boolean
}

const IssuesDetailedView: FC<Props> = async ({ issueId, isEmployee }) => {
	const issue = await getIssueByIdUseCase({ getIssueById }, { id: issueId })

	if (!issue) notFound()

	const issueComments = await getCommentsForIssueUseCase(
		{ getCommentsForIssue },
		{ issueId, includeInternal: isEmployee }
	)

	const assignedUser = await getIssueAssignedUserUseCase(
		{ getIssueAssignedUser },
		{ assignedUserId: issue.assignedUser! }
	)

	return (
		<>
			<Link
				className='underline'
				href={`/portal/${isEmployee ? 'employee' : 'customer'}`}
			>
				Tilbake
			</Link>

			<div className='grid grid-cols-1 lg:grid-cols-5 gap-12 mt-5'>
				<div className='lg:col-span-4 order-2 lg:order-1'>
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

				<aside className='lg:border-l flex flex-col gap-y-8 text-lg lg:pl-4 order-1 lg:order-2'>
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
						}).format(new Date(issue.createdAt!))}
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
						}).format(new Date(issue.updatedAt!))}
					</div>
				</aside>
			</div>
		</>
	)
}

export default IssuesDetailedView
