import IssuesTable from '@/components/issues/IssuesTable'

const Home = async () => {
	return (
		<main className='mt-8'>
			<IssuesTable type='employee' />
		</main>
	)
}

export default Home
