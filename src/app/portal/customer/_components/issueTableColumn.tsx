'use client'

import { ColumnDef } from '@tanstack/react-table'

export type IssueColumn = {
	referanse: string
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
