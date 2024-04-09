import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CreateIssueForm from './_components/CreateIssueForm'
import { db } from '@/db'
import { issues } from '@/db/schema'
import IssuesTable from './_components/IssuesTable'
import { columns } from './_components/issueTableColumn'
import { IssuePriority, IssueStatus } from '@/types/db/issue'

const statusLabels: Record<IssueStatus, string> = {
	[IssueStatus.Open]: 'Åpen',
	[IssueStatus.InProgress]: 'Pågår',
	[IssueStatus.Pending]: 'På vent',
	[IssueStatus.Resolved]: 'Løst',
}

const priorityLabels: Record<IssuePriority, string> = {
	[IssuePriority.Low]: 'Lav',
	[IssuePriority.Medium]: 'Middels',
	[IssuePriority.High]: 'Høy',
}

const Home = async () => {
	const issuesResult = await db.select().from(issues)

	return (
		<Tabs
			defaultValue='all-requests'
			className='mt-10'
		>
			<TabsList>
				<TabsTrigger value='all-requests'>Alle hendvendelser</TabsTrigger>
				<TabsTrigger value='create-request'>Opprett hendvendelser</TabsTrigger>
			</TabsList>
			<TabsContent
				value='all-requests'
				className='mt-8'
			>
				<IssuesTable
					data={issuesResult.map(issue => ({
						referanse: `UD-${issue.id}`,
						emne: issue.title,
						innmelder: issue.fromEmail,
						status: statusLabels[issue.status as IssueStatus],
						prioritet: priorityLabels[issue.priority as IssuePriority],
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
	)
}

export default Home
