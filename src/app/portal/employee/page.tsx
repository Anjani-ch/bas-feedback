import IssuesTable from '@/components/issues/IssuesTable'

const Home = async () => {
	return (
		<main className='mt-8'>
			<IssuesTable isEmployee />
		</main>
	)
}

export default Home
