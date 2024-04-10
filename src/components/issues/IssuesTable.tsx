import { db } from '@/db'
import { issues, users } from '@/db/schema'
import { unstable_noStore as noStore } from 'next/cache'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'
import {
	IssuePriority,
	issuePriorityLabels,
	IssueStatus,
	issueStatusLabels,
} from '@/types/db/issue'
import Link from 'next/link'
import { FC } from 'react'
import { eq } from 'drizzle-orm'
import UpdateAssignedUser from './forms/UpdateAssignedUser'
import UpdateIssueStatus from './forms/UpdateIssueStatus'
import UpdateIssuePriority from './forms/UpdateIssuePriority'

type Props = {
	isEmployee?: boolean
}

const IssuesTable: FC<Props> = async ({ isEmployee }) => {
	noStore()

	const issuesResult = await db
		.select({
			issue: issues,
			user: {
				name: users.name,
			},
		})
		.from(issues)
		.leftJoin(users, eq(issues.assignedUser, users.id))

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Referanse</TableHead>
					<TableHead>Emne</TableHead>
					<TableHead>Innmelder</TableHead>
					<TableHead>Tildelt</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Prioritet</TableHead>
					<TableHead>Opprettet</TableHead>
					<TableHead>Sist oppdatert</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{issuesResult.length !== 0 ? (
					issuesResult.map(({ issue, user }) => (
						<TableRow key={issue.id}>
							<TableCell>
								<Link
									href={`/portal/${
										isEmployee ? 'employee' : 'customer'
									}/issue/${issue.id}`}
									className='underline'
								>
									UD-{issue.id}
								</Link>
							</TableCell>
							<TableCell>
								<Link
									href={`/portal/${
										isEmployee ? 'employee' : 'customer'
									}/issue/${issue.id}`}
									className='underline'
								>
									{issue.title}
								</Link>
							</TableCell>
							<TableCell>{issue.fromEmail}</TableCell>
							<TableCell>
								{isEmployee ? (
									<UpdateAssignedUser
										isTableUpdate
										issueId={issue.id}
										defaultValue={issue.assignedUser || undefined}
									/>
								) : user ? (
									user.name
								) : (
									'Ingen'
								)}
							</TableCell>
							<TableCell>
								{isEmployee ? (
									<UpdateIssueStatus
										defaultValue={issue.status as IssueStatus}
										issueId={issue.id}
									/>
								) : (
									issueStatusLabels[issue.status as IssueStatus]
								)}
							</TableCell>
							<TableCell>
								{isEmployee ? (
									<UpdateIssuePriority
										defaultValue={issue.priority as IssuePriority}
										issueId={issue.id}
									/>
								) : (
									issuePriorityLabels[issue.priority as IssuePriority]
								)}
							</TableCell>
							<TableCell>
								{new Intl.DateTimeFormat('nb', {
									day: '2-digit',
									month: '2-digit',
									year: '2-digit',
								}).format(new Date(issue.createdAt))}
							</TableCell>
							<TableCell>
								{new Intl.DateTimeFormat('nb', {
									day: '2-digit',
									month: '2-digit',
									year: '2-digit',
								}).format(new Date(issue.updatedAt))}
							</TableCell>
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell
							colSpan={8}
							className='h-24 text-center'
						>
							Ingen hendvendelser
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}

export default IssuesTable
