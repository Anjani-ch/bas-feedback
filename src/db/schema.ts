import { int, mysqlTable, text, timestamp } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
	id: int('id').primaryKey().autoincrement(),
	name: text('name'),
	email: text('email'),
	passwordHash: text('passwordHash'),
})

export const issues = mysqlTable('issues', {
	id: int('id').primaryKey().autoincrement(),
	createdAt: timestamp('createdAt').defaultNow(),
	updatedAt: timestamp('updatedAt').defaultNow(),
	title: text('title'),
	description: text('description'),
	fromEmail: text('fromEmail'),
	priority: int('priority'),
	status: int('status').default(0),
	assignedUser: int('assignedUser').references(() => users.id),
})

export const comments = mysqlTable('comments', {
	id: int('id').primaryKey().autoincrement(),
	issueId: int('issueId').references(() => issues.id),
	createdAt: timestamp('createdAt').defaultNow(),
	updatedAt: timestamp('updatedAt').defaultNow(),
	content: text('content'),
	type: int('type'),
})
