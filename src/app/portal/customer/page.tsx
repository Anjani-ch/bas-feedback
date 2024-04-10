import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CreateIssueForm from './_components/CreateIssueForm'
import IssuesTable from '@/components/issues/IssuesTable'

const Home = async () => {
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
					<IssuesTable type='customer' />
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
