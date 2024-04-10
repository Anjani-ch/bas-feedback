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

type Props = {
	type: 'customer' | 'employee'
}

const IssuesTable: FC<Props> = async ({ type }) => {
	noStore()

	const issuesResult = await db.select().from(issues)

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
					issuesResult.map(async issue => {
						const assignedUser = issue.assignedUser
							? (
									await db
										.select()
										.from(users)
										.where(eq(users.id, issue.assignedUser))
							  )[0].name
							: 'Ingen'

						return (
							<TableRow key={issue.id}>
								<TableCell>
									<Link
										href={`/portal/${type}/issue/${issue.id}`}
										className='underline'
									>
										UD-{issue.id}
									</Link>
								</TableCell>
								<TableCell>{issue.title}</TableCell>
								<TableCell>{issue.fromEmail}</TableCell>
								<TableCell>{assignedUser}</TableCell>
								<TableCell>
									{issueStatusLabels[issue.status as IssueStatus]}
								</TableCell>
								<TableCell>
									{issuePriorityLabels[issue.priority as IssuePriority]}
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
						)
					})
				) : (
					<TableRow>
						<TableCell
							colSpan={6}
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
