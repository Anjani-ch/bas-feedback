import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CreateIssueForm from './_components/CreateIssueForm'

export default function Home() {
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
				All
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
