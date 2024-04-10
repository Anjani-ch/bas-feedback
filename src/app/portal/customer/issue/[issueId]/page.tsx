import { notFound } from 'next/navigation'
import { FC } from 'react'
import IssuesDetailedView from "@/components/issues/IssuesDetailedView"

type Props = {
	params: {
		issueId: string
	}
}

const Page: FC<Props> = async ({ params }) => {
	let issueId: string | number = params.issueId

	if (!issueId || isNaN(parseInt(issueId))) notFound()

	issueId = parseInt(issueId) as number

	return <IssuesDetailedView issueId={issueId} />
}

export default Page
