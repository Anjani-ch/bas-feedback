import { datetime, int, mysqlTable, text } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
	id: int('id').primaryKey().autoincrement(),
	name: text('name'),
	email: text('email'),
	passwordHash: text('passwordHash'),
})

export const issues = mysqlTable('issues', {
	id: int('id').primaryKey().autoincrement(),
	createdAt: datetime('createdAt', {
		mode: 'date',
	}),
	updatedAt: datetime('createdAt', {
		mode: 'date',
	}),
	title: text('title'),
	description: text('description'),
	fromEmail: text('fromEmail'),
	priority: int('priority'),
	status: int('priority'),
	assignedUser: int('assignedUser').references(() => users.id),
})

export const comments = mysqlTable('comments', {
	id: int('id').primaryKey().autoincrement(),
	issueId: int('issueId').references(() => issues.id),
	createdAt: datetime('createdAt', {
		mode: 'date',
	}),
	updatedAt: datetime('createdAt', {
		mode: 'date',
	}),
	content: text('content'),
	type: int('type'),
})
