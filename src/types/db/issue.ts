export enum IssuePriority {
	Low,
	Medium,
	High,
}

export enum IssueStatus {
	Open,
	InProgress,
	Pending,
	Resolved,
}

export const issueStatusLabels: Record<IssueStatus, string> = {
	[IssueStatus.Open]: 'Åpen',
	[IssueStatus.InProgress]: 'Pågår',
	[IssueStatus.Pending]: 'På vent',
	[IssueStatus.Resolved]: 'Løst',
}

export const issuePriorityLabels: Record<IssuePriority, string> = {
	[IssuePriority.Low]: 'Lav',
	[IssuePriority.Medium]: 'Middels',
	[IssuePriority.High]: 'Høy',
}
