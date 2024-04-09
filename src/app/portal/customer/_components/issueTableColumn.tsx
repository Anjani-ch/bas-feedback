'use client'

import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

export type IssueColumn = {
	referanse: number
	emne: string
	innmelder: string
	status: string
	prioritet: string
	opprettet: string
}

export const columns: ColumnDef<IssueColumn>[] = [
	{
		accessorKey: 'referanse',
		header: 'Referanse',
		cell: ({ row }) => (
			<Link
				href={`/portal/customer/issue/${row.getValue('referanse')}`}
				className='underline'
			>
				UD-{row.getValue('referanse')}
			</Link>
		),
	},
	{
		accessorKey: 'emne',
		header: 'Emne',
	},
	{
		accessorKey: 'innmelder',
		header: 'Innmelder',
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'prioritet',
		header: 'Prioritet',
	},
	{
		accessorKey: 'opprettet',
		header: 'Opprettet',
	},
]
