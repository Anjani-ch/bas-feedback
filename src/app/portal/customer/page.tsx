import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CreateIssueForm from './_components/CreateIssueForm'
import { db } from '@/db'
import { issues } from '@/db/schema'
import IssuesTable from './_components/IssuesTable'
import { columns } from './_components/issueTableColumn'
import {
	IssuePriority,
	IssueStatus,
	issuePriorityLabels,
	issueStatusLabels,
} from '@/types/db/issue'

const Home = async () => {
	const issuesResult = await db.select().from(issues)

	return (
		<main>
			<Tabs defaultValue='all-requests'>
				<TabsList>
					<TabsTrigger value='all-requests'>Alle hendvendelser</TabsTrigger>
					<TabsTrigger value='create-request'>
						Opprett hendvendelser
					</TabsTrigger>
				</TabsList>
				<TabsContent
					value='all-requests'
					className='mt-8'
				>
					<IssuesTable
						data={issuesResult.map(issue => ({
							referanse: issue.id,
							emne: issue.title,
							innmelder: issue.fromEmail,
							status: issueStatusLabels[issue.status as IssueStatus],
							prioritet: issuePriorityLabels[issue.priority as IssuePriority],
							opprettet: new Intl.DateTimeFormat('nb', {
								day: '2-digit',
								month: '2-digit',
								year: '2-digit',
							}).format(new Date(issue.createdAt)),
						}))}
						columns={columns}
					/>
				</TabsContent>
				<TabsContent
					value='create-request'
					className='mt-8 max-w-xl'
				>
					<CreateIssueForm />
				</TabsContent>
			</Tabs>
		</main>
	)
}

export default Home
